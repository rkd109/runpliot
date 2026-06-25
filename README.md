# RunPilot

RunPilot은 러닝 기록을 기반으로 현재 러닝 상태를 확인하고, 개인 러닝 프로필과 실제 기록을 반영해 Rule-Based 훈련 계획을 생성하는 포트폴리오 프로젝트입니다.

Next.js 프론트엔드와 NestJS 백엔드를 분리한 TypeScript 모노레포로 구성되어 있으며, 인증/인가, 사용자별 데이터 보호, Prisma 기반 도메인 모델링, Swagger 문서화, 대시보드 MVP까지 구현되어 있습니다.

## 주요 기능

- JWT 기반 회원가입, 로그인 및 로그인 상태 복구
- 보호 페이지 접근 제어
- 회원가입 후 러너 프로필 입력 온보딩
- 러닝 기록 생성, 조회, 수정, 삭제
- 러닝 기록 기반 pace 계산 및 응답 제공
- 대시보드 MVP
  - 총 러닝 거리
  - 러닝 횟수
  - 평균 페이스
  - 이번 달 거리
  - 최근 7일 거리
  - 최근 페이스 추세
  - 최근 러닝 기록
- 오늘의 훈련 카드 및 이번 주 이행률 표시
- RunnerProfile과 최근 기록 기반 Rule-Based 훈련 계획 생성
- 훈련 계획 목록 및 상세 조회
- 훈련 계획 항목별 이행 상태 표시(`PLANNED`, `COMPLETED`, `MISSED`)
- 같은 날짜 러닝 기록 기반 실제 수행 기록 연결
- 목표 입력 기반 훈련 계획 생성 UX
- 데모 사용자/러닝 기록/훈련 계획 seed script
- Swagger 기반 API 확인
- 공통 성공/실패 응답 구조

## Stack

- `apps/web`: Next.js App Router, React, TypeScript, Tailwind CSS, Axios
- `apps/api`: NestJS, TypeScript, Prisma, PostgreSQL, JWT, Swagger
- `packages/shared`: 공통 타입과 상수
- `infra/docker`: PostgreSQL 16 Docker Compose
- `docs`: 아키텍처, API 명세, 기술 결정, 로드맵 문서

## Workspace Structure

```text
apps/
  api/                NestJS Backend API
  web/                Next.js Frontend

packages/
  shared/             shared constants/types

infra/
  docker/             local PostgreSQL docker compose

docs/
  api-spec.md
  architecture.md
  tech-decisions.md
  roadmap.md
  project-context.md
```

## Local URLs

- Web: http://localhost:3000
- API: http://localhost:3001
- API Health: http://localhost:3001/health
- Swagger: http://localhost:3001/docs
- PostgreSQL: `localhost:15432`

## Environment Variables

API는 `apps/api/.env`를 사용합니다.

```env
DATABASE_URL="postgresql://runpilot:runpilot1234@localhost:15432/runpilot"
FRONT_BASE_URL="http://localhost:3000"
```

Web은 `apps/web/.env.local`을 사용합니다.

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

## Getting Started

```bash
pnpm install
pnpm db:up
pnpm --filter @runpilot/api prisma generate
pnpm --filter @runpilot/api prisma migrate dev
```
⚠️ Prisma CLI는 .env.local을 읽지 않을 수 있으므로
apps/api/.env 파일 생성이 필요합니다.

데모 데이터를 넣으려면 다음 명령을 실행합니다.

```bash
pnpm db:seed
```

기본 데모 계정:

```text
demo@example.com / password123
```

웹과 API를 각각 실행합니다.

```bash
pnpm dev:web
pnpm dev:api
```

또는 workspace dev script로 함께 실행합니다.

```bash
pnpm dev
```

## Local Containers

기존 로컬 PostgreSQL 컨테이너는 그대로 두고 NestJS API만 컨테이너로 실행할 수 있습니다.

사전 준비:

```text
apps/api/.env.local
```

최소 환경변수:

```env
JWT_SECRET="replace-with-a-local-secret"
FRONT_BASE_URL="http://localhost:3000"
```

`DATABASE_URL`과 `PORT`는 Docker Compose가 컨테이너 환경에 맞게 덮어씁니다. API 컨테이너는 호스트에 노출된 PostgreSQL `15432` 포트로 연결합니다.

```text
postgresql://runpilot:runpilot1234@host.docker.internal:15432/runpilot
```

실행:

```bash
pnpm local:up
```

확인:

```text
API: http://localhost:3001
Health: http://localhost:3001/health
Swagger: http://localhost:3001/docs
PostgreSQL from host: localhost:15432
```

API 로그:

```bash
pnpm local:logs
```

API 컨테이너만 종료:

```bash
pnpm local:down
```

API 컨테이너는 시작 시 shared build, Prisma Client 생성, `prisma migrate deploy`를 실행한 뒤 Nest watch 모드로 시작합니다.

## Production Container

같은 `apps/api/Dockerfile`에서 개발용과 운영용 이미지를 각각 빌드합니다.

```text
development → Nest watch + source bind mount
migration   → prisma migrate deploy 전용
production  → production dependency + dist/generated만 포함
```

운영 이미지 로컬 빌드:

```bash
pnpm prod:image:build
```

운영 구성을 로컬에서 실행:

```bash
pnpm prod:local:up
```

확인:

```text
Production API: http://localhost:3002
Health: http://localhost:3002/health
Swagger: http://localhost:3002/docs
```

로그와 종료:

```bash
pnpm prod:local:logs
pnpm prod:local:down
```

`infra/docker/docker-compose.production.yml`은 AWS 배포 전에 production 이미지를 로컬 PostgreSQL로 검증하기 위한 구성입니다. AWS에서는 이미지에 `.env`를 포함하지 않고 `DATABASE_URL`, `JWT_SECRET`, `FRONT_BASE_URL`, `PORT`를 실행 환경에서 주입합니다.

## GHCR Images

`main` 브랜치에 API 관련 변경이 push되면 GitHub Actions가 다음 이미지를 GHCR에 게시합니다.

```text
ghcr.io/rkd109/runpliot-api:latest
ghcr.io/rkd109/runpliot-api:<commit-sha>

ghcr.io/rkd109/runpliot-api-migration:latest
ghcr.io/rkd109/runpliot-api-migration:<commit-sha>
```

workflow:

```text
.github/workflows/publish-api-images.yml
```

최초 게시된 GHCR 패키지는 기본적으로 private입니다. 공개 이미지로 운영하려면 GitHub package settings에서 visibility를 `Public`으로 변경합니다. Private으로 유지할 경우 EC2에서 `read:packages` 권한이 있는 GitHub PAT로 `docker login ghcr.io`가 필요합니다.

## Scripts

- `pnpm dev`: 전체 workspace 개발 서버 실행
- `pnpm dev:web`: Next.js 개발 서버 실행
- `pnpm dev:api`: NestJS 개발 서버 실행
- `pnpm build`: 전체 workspace 빌드
- `pnpm build:web`: 웹 빌드
- `pnpm build:api`: API 빌드
- `pnpm lint`: 전체 workspace 타입 검사(`pnpm -r lint`, 현재 ESLint가 아니라 `tsc --noEmit` 실행)
- `pnpm db:up`: PostgreSQL 컨테이너 실행
- `pnpm db:down`: PostgreSQL 컨테이너 종료
- `pnpm db:seed`: 데모 사용자, 러너 프로필, 러닝 기록, 훈련 계획 seed 생성
- `pnpm local:up`: 기존 PostgreSQL에 연결할 API 컨테이너 빌드/실행
- `pnpm local:down`: PostgreSQL은 유지하고 API 컨테이너만 종료
- `pnpm local:logs`: API 컨테이너 로그 확인
- `pnpm prod:image:build`: migration/production 이미지 빌드
- `pnpm prod:local:up`: migration 실행 후 production API를 로컬 3002 포트에 실행
- `pnpm prod:local:down`: 로컬 production 검증 컨테이너 종료
- `pnpm prod:local:logs`: 로컬 production API 로그 확인

## Database

로컬 DB는 Docker Compose 기반 PostgreSQL 16을 사용합니다.

- Database: `runpilot`
- User: `runpilot`
- Password: `runpilot1234`
- Port: `15432:5432`

Prisma schema 위치:

```text
apps/api/prisma/schema.prisma
```

Prisma Client 생성 위치:

```text
apps/api/generated/prisma
```

## API Overview

공통 성공 응답:

```json
{
  "success": true,
  "data": {}
}
```

공통 실패 응답:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "error message"
}
```

주요 API:

```http
POST /auth/login
POST /auth/signup
GET  /auth/me

GET  /runner-profile/me
PUT  /runner-profile/me

POST   /running-records
GET    /running-records/me?page=1&limit=20
PATCH  /running-records/:id
DELETE /running-records/:id

POST /training-plans/generate
GET  /training-plans/me?page=1&limit=20
GET  /training-plans/today
GET  /training-plans/:id
```

상세 명세는 [docs/api-spec.md](docs/api-spec.md)를 참고합니다.

## Frontend Routes

```text
/                  landing page
/login             login
/signup            signup
/runner-profile/setup runner profile onboarding
/dashboard         running summary dashboard
/running-records   running record CRUD
/training-plans    training plan list/generate
/training-plans/:id training plan detail
```

## User Flow

```text
회원가입
→ 러너 프로필 입력
→ 대시보드에서 현재 상태 확인
→ 러닝 기록 추가
→ 훈련 계획 생성
→ 오늘의 훈련 확인
→ 실제 러닝 기록 입력
→ 대시보드와 훈련 계획 이행 상태에 반영
```

## Current Notes

- 공개 테스트용 Users API는 앱 모듈에서 제거되어 현재 라우트로 노출되지 않습니다.
- 훈련 계획 생성은 현재 Rule-Based 방식이며, 향후 local LLM 추천 로직으로 교체하기 쉽도록 요약 데이터 생성과 item 생성 로직을 분리했습니다.
- Dashboard MVP는 별도 통계 API 없이 `GET /running-records/me` 응답을 프론트에서 집계합니다.
- Dashboard의 훈련 이행 상태는 API의 `actualRecord`를 우선 사용하고, 프론트가 이미 가진 같은 날짜 러닝 기록도 보조적으로 활용합니다.
- 날짜, 거리, 시간, pace 표현은 `apps/web/src/utils/format.ts`에서 공통 관리합니다.

## Docs

- [Architecture](docs/architecture.md)
- [API Spec](docs/api-spec.md)
- [Tech Decisions](docs/tech-decisions.md)
- [Project Context](docs/project-context.md)
- [Roadmap](docs/roadmap.md)
- [Frontend Style Guide](docs/frontend-style-guide.md)
