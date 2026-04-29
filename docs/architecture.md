# Architecture

RunPilot은 pnpm workspace 기반 모노레포입니다.

## Workspace

- `apps/web`: 사용자 화면을 담당하는 Next.js App Router 애플리케이션입니다.
- `apps/api`: 백엔드 API를 담당하는 NestJS 애플리케이션입니다.
- `packages/shared`: 앱 사이에서 공유하는 타입과 상수를 제공합니다.
- `infra/docker`: 로컬 개발용 PostgreSQL 인프라 설정을 보관합니다.
- `docs`: 설계와 포트폴리오 설명 문서를 보관합니다.

## Current Scope

현재 범위는 실행 가능한 기본 껍데기입니다. Prisma, 인증, 배포 자동화는 이후 단계에서 추가합니다.

## Runtime

- Web: `localhost:3000`
- API: `localhost:3001`
- PostgreSQL: `localhost:15432`
