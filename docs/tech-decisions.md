# Tech Decisions

RunPilot 프로젝트의 주요 기술 선택과 설계 결정을 기록합니다.

## Monorepo Structure

### 결정

pnpm workspace 기반 monorepo 구조를 사용합니다.

```text
apps/
  api/
  web/

packages/
  shared/
```

### 이유

- Frontend / Backend 통합 관리
- TypeScript 기반 공통 타입 공유 가능
- 의존성 관리 단순화
- 향후 서비스 확장 대응

## Backend Framework

### 결정

Backend Framework로 NestJS를 사용합니다.

### 이유

- Module / Controller / Service 구조가 명확함
- DI 기반 설계가 가능함
- Guard, Pipe, Interceptor, Filter를 표준 방식으로 적용할 수 있음
- 실무형 API 구조 학습에 적합함

## Frontend Framework

### 결정

Frontend Framework로 Next.js App Router를 사용합니다.

### 이유

- React 기반 최신 구조 경험
- 파일 기반 라우팅
- Client Component 중심 MVP 구현이 쉬움
- 향후 Vercel 배포와 궁합이 좋음

## ORM Selection

### 결정

ORM으로 Prisma를 사용합니다.

현재 방향:

- Prisma 7.x
- `prisma.config.ts` 기반 설정
- PrismaPg Adapter 사용
- generated client는 `apps/api/generated/prisma`에 분리

### 이유

- Type-safe DB 접근
- migration 관리
- NestJS Service 계층과 연결이 단순함

## Database Selection

### 결정

개발 DB로 PostgreSQL 16을 사용하고 Docker Compose로 실행합니다.

### 이유

- 실무 사용 빈도가 높음
- Prisma와 호환성이 좋음
- 로컬 개발 환경 재현이 쉬움

## Authentication Strategy

### 결정

JWT 기반 인증 구조를 사용합니다.

```text
POST /auth/login
→ JWT accessToken 발급
→ Bearer Token
→ JwtAuthGuard
→ 보호 API 접근
```

### 이유

- REST API 구조와 잘 맞음
- Stateless 인증 흐름
- Swagger Authorize 테스트 가능

## Frontend Authentication Strategy

### 결정

Frontend 인증은 `sessionStorage` + Axios Interceptor + Context API로 관리합니다.

```text
Login
→ accessToken sessionStorage 저장
→ Axios Authorization Header 자동 설정
→ /auth/me로 user 상태 복구
```

### 이유

- MVP 단계에서 단순하고 명확함
- 새로고침 이후 로그인 상태 복구 가능
- 외부 상태관리 라이브러리를 도입하지 않아도 충분함

## Protected Route Strategy

### 결정

보호 페이지는 `ProtectedRoute` 컴포넌트로 감쌉니다.

현재 보호 페이지:

```text
/dashboard
/running-records
/training-plans
/training-plans/:id
```

### 이유

- 페이지 단위 접근 제어가 명확함
- 인증 초기화 상태와 redirect 처리를 재사용할 수 있음

## API Design Strategy

### 결정

REST API 기반 구조를 사용합니다.

현재 API:

```http
POST /auth/login
GET  /auth/me

POST   /running-records
GET    /running-records/me
PATCH  /running-records/:id
DELETE /running-records/:id

POST /training-plans/generate
GET  /training-plans/me
GET  /training-plans/:id
```

### 추가 결정

공개 테스트용 Users API는 제거했습니다. `users` 코드 자체는 남아 있지만 `UsersModule`을 앱에 등록하지 않아 라우트로 노출하지 않습니다.

### 이유

- 현재 서비스 플로우에서 공개 사용자 조회/수정/삭제 API는 불필요함
- 사용자 데이터 보호 방향과 충돌할 수 있음
- 추후 회원가입/관리자 기능으로 재구성할 수 있도록 코드 삭제는 보류함

## Validation Strategy

### 결정

Global `ValidationPipe`와 DTO 기반 validation을 사용합니다.

```ts
whitelist: true;
forbidNonWhitelisted: true;
transform: true;
```

### 이유

- Controller 진입 전 요청 검증 가능
- DTO와 Swagger 문서화를 함께 활용 가능
- 예측 가능한 API 입력 구조 유지

## Response DTO / Mapper Strategy

### 결정

Prisma Model을 직접 반환하지 않고 Response DTO + mapper를 사용합니다.

```text
Prisma Model
→ mapper
→ Response DTO
→ ResponseInterceptor
→ Common API Response
```

### 이유

- `passwordHash` 등 민감 정보 노출 방지
- DB 구조와 API 응답 구조 분리
- Frontend 응답 처리 일관성 확보

## Common Response Strategy

### 결정

성공 응답은 Global Response Interceptor로 감쌉니다.

```json
{
  "success": true,
  "data": {}
}
```

실패 응답은 Global HttpExceptionFilter로 변환합니다.

```json
{
  "success": false,
  "statusCode": 400,
  "message": "..."
}
```

### 이유

- 성공/실패 응답 형태 일관화
- Frontend API 처리 단순화
- Validation/HttpException 응답 구조 통일

## User Data Protection Strategy

### 결정

사용자 데이터는 JWT `userId` 기반으로 보호합니다.

```ts
where: {
  id,
  userId,
}
```

### 이유

- 다른 사용자의 RunningRecord / TrainingPlan 접근 방지
- 수정/삭제/상세 조회에서 소유권 검증 가능

## RunningRecord Pace Strategy

### 결정

러닝 시간은 `durationSeconds` 입력으로 받고 DB에는 `durationSec`로 저장합니다.

`paceSecPerKm`는 서버에서 계산해 저장하고 응답에 포함합니다.

```text
Math.floor(durationSeconds / distanceKm)
```

### 이유

- pace 계산 기준을 서버로 통일
- Dashboard, RunningRecord UI, 향후 분석 기능에서 같은 값을 재사용 가능
- Frontend의 중복 계산 제거

## Dashboard MVP Strategy

### 결정

Dashboard MVP는 별도 통계 API 없이 `GET /running-records/me` 응답을 프론트에서 집계합니다.

현재 지표:

- 총 러닝 거리
- 러닝 횟수
- 평균 페이스
- 최근 7일 거리
- 최근 러닝 기록

### 이유

- MVP 단계에서 API 추가 없이 빠르게 검증 가능
- 통계 요구사항이 안정화된 뒤 API 분리 여부를 결정할 수 있음

## TrainingPlan Generation Strategy

### 결정

초기 버전은 Rule-Based 생성 로직을 사용합니다.

```text
최근 러닝 평균 거리
→ BEGINNER / INTERMEDIATE / ADVANCED
→ 주간 훈련 계획 생성
→ nested create 저장
```

### 이유

- AI/LLM 도입 전 도메인 규칙을 먼저 검증
- 추천 흐름 MVP 구현 속도 확보
- 데이터 구조 안정화 가능

## TrainingPlan UX Strategy

### 결정

훈련 계획 생성 화면에서 목표 입력, 생성 중 상태, 실패 메시지, 생성 후 상세 이동을 제공합니다.

### 이유

- 버튼만 누르는 흐름보다 서비스 사용 맥락이 분명해짐
- 생성 결과를 즉시 확인할 수 있음
- 추후 목표 유형/거리/기간 입력으로 확장 가능

## Frontend Format Utility Strategy

### 결정

날짜, 거리, 시간, pace 표시 함수는 `apps/web/src/utils/format.ts`로 분리합니다.

현재 함수:

```ts
formatDate()
formatDistance()
formatDuration()
formatPace()
```

### 이유

- Dashboard, RunningRecord, TrainingPlan Detail에서 표현 규칙 재사용
- 컴포넌트 분리보다 현재 단계에서는 함수 유틸이 더 가볍고 충분함
- 향후 UI 컴포넌트가 필요해질 때 별도 컴포넌트로 확장 가능

## Swagger Documentation Strategy

### 결정

Swagger 기반 API 문서화를 유지합니다.

### 이유

- Frontend 없이 API 테스트 가능
- JWT Bearer 인증 테스트 가능
- DTO 기반 스키마 확인 가능

## Controller Style Strategy

### 결정

NestJS Controller는 method 방식으로 작성합니다.

권장:

```ts
async login() {}
```

비권장:

```ts
login = async () => {}
```

### 이유

Nest decorator는 prototype method 기반으로 동작하므로 method 방식이 더 안정적입니다.

## Future Expansion Strategy

### 방향

```text
Running Data
→ Dashboard Analytics
→ Personalized Rule-Based Recommendation
→ AI/LLM Expansion
```

예정:

- RunningRecord pagination
- Dashboard chart
- 월간 거리 분석
- pace 추세 분석
- 과훈련 감지
- AI/LLM 기반 훈련 계획 추천
