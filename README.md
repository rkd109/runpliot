# RunPilot

RunPilot은 러닝 기록을 기반으로 현재 러닝 상태를 확인하고, Rule-Based 훈련 계획을 생성하는 포트폴리오 프로젝트입니다.

Next.js 프론트엔드와 NestJS 백엔드를 분리한 TypeScript 모노레포로 구성되어 있으며, 인증/인가, 사용자별 데이터 보호, Prisma 기반 도메인 모델링, Swagger 문서화, 대시보드 MVP까지 구현되어 있습니다.

## 주요 기능

- JWT 기반 로그인 및 로그인 상태 복구
- 보호 페이지 접근 제어
- 러닝 기록 생성, 조회, 수정, 삭제
- 러닝 기록 기반 pace 계산 및 응답 제공
- 대시보드 MVP
  - 총 러닝 거리
  - 러닝 횟수
  - 평균 페이스
  - 최근 7일 거리
  - 최근 러닝 기록
- Rule-Based 훈련 계획 생성
- 훈련 계획 목록 및 상세 조회
- 목표 입력 기반 훈련 계획 생성 UX
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

웹과 API를 각각 실행합니다.

```bash
pnpm dev:web
pnpm dev:api
```

또는 workspace dev script로 함께 실행합니다.

```bash
pnpm dev
```

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
GET  /auth/me

POST   /running-records
GET    /running-records/me
PATCH  /running-records/:id
DELETE /running-records/:id

POST /training-plans/generate
GET  /training-plans/me
GET  /training-plans/:id
```

상세 명세는 [docs/api-spec.md](docs/api-spec.md)를 참고합니다.

## Frontend Routes

```text
/                  landing page
/login             login
/dashboard         running summary dashboard
/running-records   running record CRUD
/training-plans    training plan list/generate
/training-plans/:id training plan detail
```

## Current Notes

- 공개 테스트용 Users API는 앱 모듈에서 제거되어 현재 라우트로 노출되지 않습니다.
- 훈련 계획 생성은 현재 Rule-Based 방식입니다.
- Dashboard MVP는 별도 통계 API 없이 `GET /running-records/me` 응답을 프론트에서 집계합니다.
- 날짜, 거리, 시간, pace 표현은 `apps/web/src/utils/format.ts`에서 공통 관리합니다.

## Docs

- [Architecture](docs/architecture.md)
- [API Spec](docs/api-spec.md)
- [Tech Decisions](docs/tech-decisions.md)
- [Project Context](docs/project-context.md)
- [Roadmap](docs/roadmap.md)
- [Frontend Style Guide](docs/frontend-style-guide.md)
