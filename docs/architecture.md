# Architecture

RunPilot은 러닝 기록 기반 상태 확인 및 훈련 계획 생성 서비스입니다.

```text
RunningRecord
→ Dashboard summary
→ Rule-Based TrainingPlan
→ Future analytics / AI recommendation
```

## Workspace Structure

```text
apps/
  api/                NestJS Backend API
  web/                Next.js Frontend

packages/
  shared/             shared constants/types

infra/
  docker/             PostgreSQL local environment

docs/
  api-spec.md
  architecture.md
  project-context.md
  tech-decisions.md
  roadmap.md
```

## Tech Stack

### Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Axios
- Context API

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Passport
- Swagger

### Infra

- Docker Compose
- PostgreSQL 16
- pnpm workspace

## Runtime Environment

| Service | URL |
| --- | --- |
| Web | `http://localhost:3000` |
| API | `http://localhost:3001` |
| Swagger | `http://localhost:3001/docs` |
| PostgreSQL | `localhost:15432` |

## Frontend Architecture

현재 Frontend는 Next.js App Router 기반입니다.

```text
app/
  dashboard/
  login/
  running-records/
  training-plans/
    [id]/

src/
  components/
    logout-button.tsx
    protected-route.tsx
    status-message.tsx
  contexts/
    auth-context.tsx
  utils/
    api.ts
    format.ts
    running-records-api.ts
    session-storage.ts
    training-plans-api.ts
```

역할:

```text
AuthProvider
→ 로그인 사용자 상태, 초기화 상태, logout 관리

ProtectedRoute
→ 보호 페이지 접근 제어

Axios instance
→ Authorization Header 자동 주입

feature API utils
→ RunningRecord / TrainingPlan API 호출 분리

format utils
→ 날짜, 거리, 시간, pace 표현 통일
```

## Frontend Flow

### Authentication

```text
Login
→ POST /auth/login
→ accessToken sessionStorage 저장
→ GET /auth/me
→ AuthProvider user 상태 저장
→ /dashboard 이동
```

앱 시작 시:

```text
sessionStorage accessToken 확인
→ GET /auth/me
→ user 상태 복구
→ 실패 시 token 제거
```

로그아웃:

```text
LogoutButton
→ AuthProvider.logout()
→ sessionStorage accessToken 제거
→ user null
→ /login 이동
```

홈(`/`) 진입:

```text
AuthProvider user 확인
→ 로그인 상태면 /dashboard 이동
→ 비로그인 상태면 로그인 버튼만 노출
```

### Dashboard

Dashboard는 별도 통계 API 없이 `GET /running-records/me` 응답을 프론트에서 집계합니다.

현재 지표:

- 총 러닝 거리
- 러닝 횟수
- 평균 페이스
- 이번 달 거리
- 최근 7일 거리 차트
- 최근 pace 추세
- 최근 러닝 기록 5개

주의:

```text
GET /running-records/me는 pagination 응답이다.
현재 Dashboard 집계는 기본 page/limit 응답 기반이므로,
기록이 20개를 넘으면 전체 통계와 차이가 날 수 있다.
향후 통계 전용 API 도입이 우선 후보이다.
```

### Running Records

```text
GET /running-records/me?page=1&limit=20
POST /running-records
PATCH /running-records/:id
DELETE /running-records/:id
```

Frontend는 `durationSeconds`를 시/분/초 입력으로 변환해 다룹니다. pace 표시는 API 응답의 `paceSecPerKm`를 사용합니다.

목록 응답은 paginated shape입니다.

```ts
{
  items: RunningRecord[];
  meta: PaginationMeta;
}
```

### Training Plans

```text
GET /training-plans/me?page=1&limit=20
POST /training-plans/generate
GET /training-plans/:id
```

생성 UX:

```text
goal 입력
→ 생성 중 상태 표시
→ POST /training-plans/generate
→ 생성 성공 시 목록 갱신
→ 생성된 계획 아코디언 상세 펼침
→ 실패 시 에러 메시지 표시
```

상세 조회 UX:

```text
TrainingPlan 목록
→ 상세 보기 클릭
→ GET /training-plans/:id
→ 목록 안에서 아코디언 상세 노출
→ 한 계획이 열릴 때 다른 계획 상세는 숨김
```

`/training-plans/:id` 직접 상세 route는 남아 있지만, 기본 목록 UX는 아코디언 중심입니다.

## Backend Architecture

NestJS 계층 구조를 따릅니다.

```text
Controller
→ Request parsing / guard / DTO validation

Service
→ business logic / ownership validation

PrismaService
→ Prisma Client access

PostgreSQL
→ persisted domain data
```

현재 API 모듈:

```text
src/
  app.controller.ts
  app.service.ts
  auth/
  common/
  prisma/
  running-records/
  training-plans/
  users/              inactive test module code
```

`users` 코드는 남아 있지만 `UsersModule`은 `AppModule`에 등록하지 않아 `/users` 라우트는 노출되지 않습니다.

## API Status

### Public APIs

```http
GET /
GET /health
POST /auth/login
```

### Protected APIs

```http
GET /auth/me

POST /running-records
GET /running-records/me?page=1&limit=20
PATCH /running-records/:id
DELETE /running-records/:id

POST /training-plans/generate
GET /training-plans/me?page=1&limit=20
GET /training-plans/:id
```

## Authentication Architecture

JWT 기반 인증 구조입니다.

```text
POST /auth/login
→ JWT 발급
→ Bearer Token
→ JwtAuthGuard
→ JwtStrategy validate
→ Request.user 구성
```

현재 `Request.user`:

```ts
{
  userId: number;
  email: string;
}
```

## Validation Strategy

Global `ValidationPipe`를 사용합니다.

```ts
whitelist: true;
forbidNonWhitelisted: true;
transform: true;
```

## Response Architecture

성공 응답:

```text
Controller return
→ Response DTO / mapper
→ ResponseInterceptor
→ { success: true, data }
```

실패 응답:

```text
Exception
→ HttpExceptionFilter
→ { success: false, statusCode, message }
```

## Database Architecture

### Prisma

- Prisma 7.x
- `prisma.config.ts`
- PrismaPg Adapter
- generated client: `apps/api/generated/prisma`

### Domain Model

```text
User
  ├─ RunningRecord[]
  └─ TrainingPlan[]

TrainingPlan
  └─ TrainingPlanItem[]
```

## RunningRecord Domain

저장 필드 핵심:

```text
distanceKm
durationSec
paceSecPerKm
runDate
memo
userId
```

`paceSecPerKm`는 생성/수정 시 서버에서 계산합니다.

```text
Math.floor(durationSeconds / distanceKm)
```

사용자 데이터 보호:

```ts
where: {
  id,
  userId,
}
```

## TrainingPlan Domain

현재 생성 방식은 Rule-Based입니다.

```text
최근 RunningRecord 조회
→ 평균 거리 계산
→ level 분류
→ 주간 TrainingPlanItem 생성
→ nested create 저장
```

레벨:

```text
BEGINNER
INTERMEDIATE
ADVANCED
```

운동 타입:

```text
REST
EASY_RUN
TEMPO_RUN
LONG_RUN
RECOVERY_RUN
```

## Security Strategy

- bcrypt password hashing
- JWT Bearer 인증
- Guard 기반 보호 API
- 사용자별 `userId` 소유권 검증
- DTO validation
- Prisma unique constraint 활용
- Prisma Model 직접 반환 방지

## Future Expansion

- Dashboard chart
- 월간 러닝 거리
- pace 추세 분석
- 과훈련 감지
- TrainingPlan 추천 로직 고도화
- AI/LLM 기반 개인화 추천
