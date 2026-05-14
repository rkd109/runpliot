# RunPilot

RunPilot은 포트폴리오용 모노레포입니다. 현재 단계의 목표는 Next.js, NestJS, PostgreSQL이 각각 실행되는 기본 껍데기를 구성하는 것입니다.

## Stack

- `apps/web`: Next.js App Router, TypeScript, Tailwind CSS
- `apps/api`: NestJS, TypeScript
- `packages/shared`: 공통 타입/상수 패키지
- `infra/docker`: PostgreSQL 16 Docker Compose
- `docs`: 아키텍처, API 명세, 포트폴리오 요약 문서

## Getting Started

```bash
pnpm install
pnpm db:up
pnpm dev:web
pnpm dev:api
```

또는 웹과 API를 함께 실행합니다.

```bash
pnpm dev
```

## Local URLs

- Web: http://localhost:3000
- API: http://localhost:3001
- API Health: http://localhost:3001/health
- PostgreSQL: `localhost:15432`

## Database

- Database: `runpilot`
- User: `runpilot`
- Password: `runpilot1234`
- Port: `15432:5432`

## Scripts

- `pnpm dev:web`: Next.js 개발 서버 실행
- `pnpm dev:api`: NestJS 개발 서버 실행
- `pnpm db:up`: PostgreSQL 컨테이너 실행
- `pnpm db:down`: PostgreSQL 컨테이너 종료
- `pnpm build`: 전체 workspace 빌드
- `pnpm lint`: 전체 workspace lint

## Created Files

- `package.json`
- `pnpm-workspace.yaml`
- `tsconfig.base.json`
- `.gitignore`
- `apps/web/package.json`
- `apps/web/next.config.mjs`
- `apps/web/postcss.config.mjs`
- `apps/web/tailwind.config.ts`
- `apps/web/tsconfig.json`
- `apps/web/next-env.d.ts`
- `apps/web/app/globals.css`
- `apps/web/app/layout.tsx`
- `apps/web/app/page.tsx`
- `apps/api/package.json`
- `apps/api/nest-cli.json`
- `apps/api/tsconfig.json`
- `apps/api/tsconfig.build.json`
- `apps/api/src/app.controller.ts`
- `apps/api/src/app.module.ts`
- `apps/api/src/app.service.ts`
- `apps/api/src/main.ts`
- `packages/shared/package.json`
- `packages/shared/tsconfig.json`
- `packages/shared/src/index.ts`
- `infra/docker/docker-compose.yml`
- `docs/architecture.md`
- `docs/api-spec.md`
- `docs/portfolio-summary.md`


------
# 1. prisma/schema.prisma 수정

# 2. migration 생성 + DB 반영
pnpm prisma migrate dev --name xx

# 3. Prisma Client 재생성
pnpm prisma generate

//필요에 따라 디비 리셋이 필요한 경우에만 사용
//pnpm prisma migrate reset

---
pnpm dlx @nestjs/cli generate module users
pnpm dlx @nestjs/cli g mo users

pnpm dlx @nestjs/cli generate controller users
pnpm dlx @nestjs/cli g co users

pnpm dlx @nestjs/cli generate service users
pnpm dlx @nestjs/cli g s users
**
pnpm dlx @nestjs/cli g resource users
----