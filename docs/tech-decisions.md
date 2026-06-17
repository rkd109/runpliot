# Tech Decisions

RunPilot 프로젝트의 주요 기술 선택, 설계 결정, 배포 전략을 기록한다.

## Monorepo Structure

### Decision

pnpm workspace 기반 monorepo 구조를 사용한다.

```text
apps/
  api/
  web/

packages/
  shared/
```

### Reason

- Frontend와 Backend를 한 저장소에서 통합 관리한다.
- TypeScript 기반 공통 타입과 상수를 공유할 수 있다.
- 의존성 관리와 빌드 흐름을 단순하게 유지한다.
- 추후 서비스가 확장되어도 앱 단위로 분리하기 쉽다.

## Backend Framework

### Decision

Backend Framework로 NestJS를 사용한다.

### Reason

- Module, Controller, Service 구조가 명확하다.
- DI 기반 설계가 가능하다.
- Guard, Pipe, Interceptor, Filter를 표준 방식으로 적용할 수 있다.
- 실무형 API 구조 학습과 포트폴리오 목적에 적합하다.

## Frontend Framework

### Decision

Frontend Framework로 Next.js App Router를 사용한다.

### Reason

- React 기반 최신 구조를 경험할 수 있다.
- 파일 기반 라우팅으로 화면 구성이 명확하다.
- MVP 단계에서는 Client Component 중심 구현이 단순하다.
- 추후 Vercel 배포와 잘 맞는다.

## ORM Selection

### Decision

ORM으로 Prisma를 사용한다.

현재 방향:

- Prisma 7.x
- `prisma.config.ts` 기반 설정
- PrismaPg Adapter 사용
- generated client는 `apps/api/generated/prisma`에 분리

### Reason

- Type-safe DB 접근이 가능하다.
- migration 관리가 쉽다.
- NestJS Service 계층과 연결하기 단순하다.

## Database Selection

### Decision

개발 DB는 PostgreSQL 16을 Docker Compose로 실행한다.

초기 배포 DB는 Supabase PostgreSQL을 사용한다.

### Reason

- PostgreSQL은 실무 사용 빈도가 높다.
- Prisma와 호환성이 좋다.
- 로컬 개발 환경을 재현하기 쉽다.
- Supabase를 사용하면 초기 운영 부담을 줄일 수 있다.

## Authentication Strategy

### Decision

JWT 기반 인증 구조를 사용한다.

```text
POST /auth/login
-> JWT accessToken 발급
-> Bearer Token
-> JwtAuthGuard
-> 보호 API 접근
```

### Reason

- REST API 구조와 잘 맞는다.
- Stateless 인증 흐름을 유지할 수 있다.
- Swagger Authorize 테스트가 가능하다.

## Frontend Authentication Strategy

### Decision

Frontend 인증은 `sessionStorage` + Axios Interceptor + Context API로 관리한다.

```text
Login
-> accessToken sessionStorage 저장
-> Axios Authorization Header 자동 설정
-> /auth/me로 user 상태 복구
```

### Reason

- MVP 단계에서 단순하고 명확하다.
- 새로고침 이후 로그인 상태를 복구할 수 있다.
- 별도 상태관리 라이브러리를 도입하지 않아도 충분하다.

## Protected Route Strategy

### Decision

보호 페이지는 `ProtectedRoute` 컴포넌트로 감싼다.

현재 보호 페이지:

```text
/dashboard
/running-records
/training-plans
/training-plans/:id
```

### Reason

- 페이지 단위 접근 제어가 명확하다.
- 인증 초기화 상태와 redirect 처리를 한 곳에서 다룰 수 있다.

## API Design Strategy

### Decision

REST API 기반 구조를 사용한다.

현재 API:

```http
POST /auth/signup
POST /auth/login
GET  /auth/me

GET /runner-profile/me
PUT /runner-profile/me

POST   /running-records
GET    /running-records/me?page=1&limit=20
PATCH  /running-records/:id
DELETE /running-records/:id

POST /training-plans/generate
GET  /training-plans/me?page=1&limit=20
GET  /training-plans/today
GET  /training-plans/:id
```

### Additional Decision

공개 테스트용 Users API는 제거했다. `users` 코드 자체는 남아 있지만 `UsersModule`은 `AppModule`에 등록하지 않아 `/users` 라우트로 노출되지 않는다.

### Reason

- 현재 서비스 플로우에서 공개 사용자 조회, 수정, 삭제 API는 불필요하다.
- 사용자 데이터 보호 방향과 충돌할 수 있다.
- 추후 회원가입이나 관리자 기능으로 재구성할 여지는 남긴다.

## Validation Strategy

### Decision

Global `ValidationPipe`와 DTO 기반 validation을 사용한다.

```ts
whitelist: true;
forbidNonWhitelisted: true;
transform: true;
```

### Reason

- Controller 진입 전 요청 검증이 가능하다.
- DTO와 Swagger 문서화를 함께 사용할 수 있다.
- 예측 가능한 API 입력 구조를 유지한다.

## Response DTO / Mapper Strategy

### Decision

Prisma Model을 직접 반환하지 않고 Response DTO + Mapper를 사용한다.

```text
Prisma Model
-> mapper
-> Response DTO
-> ResponseInterceptor
-> Common API Response
```

### Reason

- `passwordHash` 같은 민감 정보 노출을 방지한다.
- DB 구조와 API 응답 구조를 분리한다.
- Frontend 응답 처리를 일관되게 유지한다.

## Common Response Strategy

### Decision

성공 응답은 Global Response Interceptor로 감싼다.

```json
{
  "success": true,
  "data": {}
}
```

실패 응답은 Global HttpExceptionFilter로 변환한다.

```json
{
  "success": false,
  "statusCode": 400,
  "message": "..."
}
```

### Reason

- 성공과 실패 응답 형식을 일관되게 유지한다.
- Frontend API 처리를 단순화한다.
- validation, HttpException 응답 구조를 통일한다.

## User Data Protection Strategy

### Decision

사용자 데이터는 JWT `userId` 기반으로 보호한다.

```ts
where: {
  id,
  userId,
}
```

### Reason

- 다른 사용자의 RunningRecord, TrainingPlan 접근을 방지한다.
- 수정, 삭제, 상세 조회에서 소유권 검증이 가능하다.

## RunningRecord Pace Strategy

### Decision

러닝 시간은 `durationSeconds` 입력으로 받고 DB에는 `durationSec`로 저장한다.

`paceSecPerKm`는 서버에서 계산해 저장하고 응답에 포함한다.

```text
Math.floor(durationSeconds / distanceKm)
```

### Reason

- pace 계산 기준을 서버로 통일한다.
- Dashboard, RunningRecord UI, 추후 분석 기능에서 같은 값을 재사용할 수 있다.
- Frontend 중복 계산을 줄인다.

## Dashboard MVP Strategy

### Decision

Dashboard MVP는 별도 통계 API 없이 `GET /running-records/me` 응답의 프론트 집계로 구현한다.

현재 지원:

- 총 러닝 거리
- 러닝 횟수
- 평균 페이스
- 이번 달 거리
- 최근 7일 거리 차트
- 최근 pace 추세
- 최근 러닝 기록
- 오늘의 훈련
- 이번 주 훈련 이행률

### Reason

- MVP 단계에서 API 추가 없이 빠르게 검증할 수 있다.
- 통계 요구사항이 안정화된 뒤 API 분리 여부를 결정한다.

### Current Limitation

`GET /running-records/me`는 pagination 응답이다. 현재 Dashboard 집계는 기본 page/limit 응답 20개 기준으로 계산되므로, 기록이 20개를 넘으면 전체 통계와 차이가 날 수 있다.

추후 통계 전용 API 또는 Dashboard 전용 데이터 조회 전략을 분리해야 한다.

## TrainingPlan Generation Strategy

### Decision

초기 버전은 RunnerProfile과 최근 RunningRecord 요약 기반 Rule-Based 생성 로직을 사용한다.

```text
RunnerProfile 조회
-> 최근 러닝 기록 조회
-> 요약 데이터 생성
-> 다음 주 월요일~일요일 기간 산정
-> 기존 계획 기간 중복 검증
-> 주간 TrainingPlanItem 생성
-> nested create 저장
```

### Reason

- AI/LLM 도입 전 도메인 규칙을 먼저 검증한다.
- 추천 흐름 MVP 구현 속도를 확보한다.
- 데이터 구조를 안정화할 수 있다.
- 향후 local LLM 연동 시 요약 데이터 생성과 item 생성 함수를 교체하기 쉽다.

## Training Execution Strategy

### Decision

TrainingPlanItem에 별도 status 컬럼을 추가하지 않고, 같은 날짜의 RunningRecord를 기준으로 이행 상태를 계산한다.

```text
same date RunningRecord exists -> COMPLETED
past plan date without record -> MISSED
today/future plan date without record -> PLANNED
```

같은 날짜에 RunningRecord가 여러 개 있으면 가장 긴 거리의 기록을 대표 `actualRecord`로 사용한다.

### Reason

- MVP 단계에서는 실제 러닝 기록을 단일 진실 공급원으로 유지할 수 있다.
- 훈련 완료 여부가 기록 입력과 자연스럽게 연결된다.
- 별도 완료 API 없이도 Dashboard와 TrainingPlan 상세에서 이행 상태를 보여줄 수 있다.

### Current Limitation

명시적인 건너뜀, 부분 완료, 계획 항목과 특정 기록의 수동 연결은 아직 지원하지 않는다.

## TrainingPlan UX Strategy

### Decision

훈련 계획 생성 화면에서 목표 입력, 생성 중 상태, 실패 메시지를 제공한다.

생성 성공 후 별도 상세 페이지로 이동하지 않고 목록을 갱신한 뒤, 생성된 계획의 아코디언 상세를 바로 연다.

목록에서 `상세 보기`를 누르면 `GET /training-plans/:id`를 호출하고, 한 번에 하나의 계획 상세만 목록 안에서 연다.

### Reason

- 버튼만 누르는 흐름보다 서비스 사용 맥락이 분명하다.
- 목록 맥락을 유지하면서 생성 결과를 즉시 확인할 수 있다.
- 추후 목표 유형, 거리, 기간 입력으로 확장하기 쉽다.

## List Pagination Strategy

### Decision

RunningRecord와 TrainingPlan 목록 API는 `page`, `limit` query를 받는 pagination 응답을 사용한다.

```text
GET /running-records/me?page=1&limit=20
GET /training-plans/me?page=1&limit=20
```

응답 data:

```ts
{
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
```

### Reason

- 기록과 계획이 많아졌을 때 목록 응답 크기를 제어한다.
- Frontend pagination UI 확장 기반을 마련한다.
- Swagger DTO로 목록 응답 구조를 명확하게 표현한다.

## Frontend Format Utility Strategy

### Decision

날짜, 거리, 시간, pace 표시 함수는 `apps/web/src/utils/format.ts`로 분리한다.

현재 함수:

```ts
formatDate()
formatDistance()
formatDuration()
formatPace()
```

### Reason

- Dashboard, RunningRecord, TrainingPlan Detail에서 표시 규칙을 재사용한다.
- 현재 단계에서는 컴포넌트 분리보다 utility 함수가 가볍고 충분하다.
- 추후 UI 컴포넌트가 필요해지면 별도 컴포넌트로 확장할 수 있다.

## Demo Seed Strategy

### Decision

`pnpm db:seed`로 데모 사용자, RunnerProfile, RunningRecord, TrainingPlan 데이터를 생성한다.

기본 계정:

```text
demo@example.com / password123
```

### Reason

- 배포 후 수동 입력 없이 주요 화면을 확인할 수 있다.
- Dashboard 차트, 오늘 훈련, 이행 상태, 실제 기록 표시를 빠르게 검증할 수 있다.
- 포트폴리오 시연 시 반복 가능한 초기 상태를 제공한다.

## Swagger Documentation Strategy

### Decision

Swagger 기반 API 문서화를 유지한다.

### Reason

- Frontend 없이 API 테스트가 가능하다.
- JWT Bearer 인증 테스트가 가능하다.
- DTO 기반 schema 확인이 가능하다.

## Controller Style Strategy

### Decision

NestJS Controller는 method 방식으로 작성한다.

권장:

```ts
async login() {}
```

비권장:

```ts
login = async () => {}
```

### Reason

Nest decorator는 prototype method 기반으로 동작하므로 method 방식이 더 안정적이다.

## Deployment Strategy

## Current Deployment Decision

RunPilot 초기 배포는 다음 구조를 사용한다.

```text
Frontend
-> Vercel

Backend API
-> Render

Database
-> Supabase PostgreSQL
```

## Why This Structure?

현재 RunPilot은 포트폴리오 목적의 MVP 프로젝트이며, 실제 사용자 트래픽은 거의 없는 상태다.

초기 목표는 다음과 같다.

- 빠른 배포
- 운영 복잡도 최소화
- 실제 서비스 형태 경험
- 비용 최소화

따라서 직접 인프라를 운영하기보다 Managed Service 위주의 구성을 선택한다.

## Frontend Deployment

### Selected

```text
Vercel
```

### Reason

- Next.js와 궁합이 좋다.
- GitHub 연동 기반 자동 배포가 쉽다.
- 무료 플랜으로 시작할 수 있다.
- CDN과 Preview Deployment를 제공한다.
- 초기 운영 부담이 낮다.

### Build Setting

Vercel 프로젝트는 monorepo 안의 Web 앱을 배포한다.

권장 설정:

```text
Framework Preset: Next.js
Root Directory: apps/web
Build Command: pnpm --filter @runpilot/web build
Output Directory: .next
Install Command: pnpm install --frozen-lockfile
```

`apps/web/package.json`의 `build` 스크립트는 shared 패키지를 먼저 빌드한 뒤 Next.js 빌드를 실행한다.

```json
"build": "pnpm --filter @runpilot/shared build && next build"
```

### Environment Variables

```text
NEXT_PUBLIC_API_BASE_URL=https://<render-service-name>.onrender.com
```

Render 배포 URL이 확정된 뒤 Vercel 환경변수에 반영한다.

## Backend API Deployment

### Selected

```text
Render Web Service
```

### Reason

- NestJS API 배포가 단순하다.
- GitHub 연동을 지원한다.
- 초기 트래픽 규모에서는 무료 또는 저비용 플랜으로 시작할 수 있다.
- Docker 기반 배포로 확장할 여지가 있다.

### Runtime Decision

초기에는 Dockerfile 없이 Render Node runtime으로 배포한다.

Render Web Service는 HTTP 서버가 `PORT` 환경변수에 바인딩되는 것을 권장한다. 따라서 API bootstrap은 다음 방식으로 동작한다.

```ts
const port = Number(process.env.PORT ?? 3001);
await app.listen(port);
```

### Build Setting

권장 설정:

```text
Language: Node
Root Directory: repository root
Build Command: corepack enable && pnpm install --frozen-lockfile && pnpm --filter @runpilot/api db:migrate:deploy && pnpm --filter @runpilot/api build
Start Command: pnpm --filter @runpilot/api start
Health Check Path: /health
```

`apps/api/package.json`의 `build` 스크립트는 shared 빌드와 Prisma Client 생성을 포함한다.

```json
"build": "pnpm --filter @runpilot/shared build && prisma generate && nest build"
```

운영 DB migration은 다음 스크립트로 실행한다.

```json
"db:migrate:deploy": "prisma migrate deploy"
```

### Environment Variables

```text
DATABASE_URL=<supabase-postgres-connection-string>
JWT_SECRET=<strong-random-secret>
FRONT_BASE_URL=https://<vercel-project>.vercel.app
```

`FRONT_BASE_URL`은 CORS 허용 origin으로 사용한다. Vercel 배포 URL이 확정된 뒤 Render 환경변수에 반영한다.

### Known Limitation

Render Free Tier를 사용하면 일정 시간 요청이 없을 때 서비스가 sleep 상태로 전환될 수 있다.

첫 요청에서 cold start가 발생할 수 있지만, 현재 RunPilot MVP 단계에서는 허용 가능한 제약으로 판단한다.

## Database Deployment

### Selected

```text
Supabase PostgreSQL
```

### Reason

- PostgreSQL 관리 부담을 줄일 수 있다.
- 무료 플랜으로 시작할 수 있다.
- 백업과 관리 기능을 제공한다.
- Prisma와 함께 사용하기 좋다.

### Setup Notes

Supabase에서 프로젝트를 생성한 뒤 PostgreSQL connection string을 Render의 `DATABASE_URL`에 등록한다.

Prisma migration은 Render build 과정에서 다음 명령으로 반영한다.

```text
pnpm --filter @runpilot/api db:migrate:deploy
```

초기 배포 전에는 Supabase DB가 비어 있으므로 migration 적용 여부를 Render deploy log에서 반드시 확인한다.

## Deployment Order

초기 배포 순서는 다음과 같다.

```text
1. Supabase 프로젝트 생성
2. Supabase PostgreSQL connection string 확보
3. Render Web Service 생성
4. Render 환경변수 등록
5. Render deploy 성공 및 /health 확인
6. Vercel 프로젝트 생성
7. Vercel 환경변수 NEXT_PUBLIC_API_BASE_URL 등록
8. Vercel deploy 성공 확인
9. Render FRONT_BASE_URL을 최종 Vercel URL로 갱신
10. 로그인, /auth/me, 보호 페이지, 주요 CRUD 플로우 확인
```

## Deployment Smoke Test

배포 후 최소 확인 항목:

```text
GET https://<render-service>.onrender.com/health
GET https://<render-service>.onrender.com/docs
POST /auth/login
GET /auth/me
GET /running-records/me
POST /running-records
POST /training-plans/generate
```

Frontend에서는 다음 페이지를 확인한다.

```text
/
/login
/dashboard
/running-records
/training-plans
```

## Alternative Considered

```text
AWS RDS
Self-managed PostgreSQL
AWS EC2 Backend
```

초기 단계에서는 운영 복잡도가 커지므로 제외한다.

## Future Migration Plan

현재 구조는 MVP 초기 배포를 위한 구성이다.

서비스 규모가 증가하거나 운영 경험 확보가 필요해지는 시점에는 AWS 기반 구조로 이전할 수 있다.

예정 구조:

```text
Frontend
-> Vercel

Backend
-> AWS EC2
-> Docker

Database
-> Supabase 유지
or
-> AWS RDS PostgreSQL
```

## AWS Migration Reason

추후 다음 경험 확보를 목표로 한다.

- Docker 운영
- Linux 서버 관리
- Nginx Reverse Proxy
- SSL 인증서 관리
- CI/CD 구성
- AWS 인프라 경험

## Future Local LLM Architecture

Local LLM은 Backend 서버와 직접 통합하지 않는다.

예상 구조:

```text
Frontend
-> Vercel

Backend
-> Render
or
-> AWS

Database
-> Supabase

Local PC
-> LLM Worker
-> Ollama
```

Worker는 API 또는 Queue를 통해 작업을 수신한다.

## Current Philosophy

현재 단계에서는 다음 우선순위를 따른다.

```text
인프라 운영 경험
<
서비스 기능 구현
```

따라서 운영 복잡도를 최소화할 수 있는

```text
Vercel
+
Render
+
Supabase
```

구조를 채택한다.

추후 서비스가 성장하거나 운영 경험이 필요한 시점에 AWS 기반 구조로 확장한다.
