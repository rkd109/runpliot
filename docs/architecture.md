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
    protected-route.tsx
  contexts/
    auth-context.tsx
  utils/
    api.ts
    format.ts
    session-storage.ts
```

역할:

```text
AuthProvider
→ 로그인 사용자 상태와 초기화 상태 관리

ProtectedRoute
→ 보호 페이지 접근 제어

Axios instance
→ Authorization Header 자동 주입

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

### Dashboard

Dashboard MVP는 별도 통계 API 없이 `GET /running-records/me` 응답을 프론트에서 집계합니다.

현재 지표:

- 총 러닝 거리
- 러닝 횟수
- 평균 페이스
- 최근 7일 거리
- 최근 러닝 기록 5개

### Running Records

```text
GET /running-records/me
POST /running-records
PATCH /running-records/:id
DELETE /running-records/:id
```

Frontend는 `durationSeconds`를 시/분/초 입력으로 변환해 다룹니다. pace 표시는 API 응답의 `paceSecPerKm`를 사용합니다.

### Training Plans

```text
GET /training-plans/me
POST /training-plans/generate
GET /training-plans/:id
```

생성 UX:

```text
goal 입력
→ 생성 중 상태 표시
→ POST /training-plans/generate
→ 생성 성공 시 상세 페이지 이동
→ 실패 시 에러 메시지 표시
```

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
GET /running-records/me
PATCH /running-records/:id
DELETE /running-records/:id

POST /training-plans/generate
GET /training-plans/me
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
