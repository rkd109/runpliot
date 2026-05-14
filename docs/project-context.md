프로젝트명: RunPilot

프로젝트 목표:
러닝 기록 기반 훈련 계획 생성 서비스.
포트폴리오 목적의 개인 프로젝트이며,
초기 MVP 범위는 다음과 같다.

- 회원가입 / 로그인
- 러닝 기록 CRUD
- 룰 기반 훈련 계획 생성
- 루틴 조회

현재 기술 스택:
- pnpm workspace 기반 monorepo
- apps/api: NestJS
- apps/web: Next.js App Router
- PostgreSQL
- Prisma 7.x
- Docker Compose
- Swagger

현재 구조:
apps/
├─ api/
├─ web/

packages/
├─ shared/

infra/
├─ docker/

docs/
├─ architecture.md
├─ api-spec.md
├─ portfolio-summary.md
├─ troubleshooting.md
└─ roadmap.md

현재까지 완료된 작업:
- monorepo 구성 완료
- PostgreSQL docker-compose 구성 완료
- PostgreSQL 컨테이너 실행 및 접속 확인 완료
- Prisma 적용 완료
- prisma migrate dev --name init 완료
- users / running_records / training_plans / training_plan_items 테이블 생성 완료
- PrismaService / PrismaModule 구성 완료
- Swagger 설정 완료
- User CRUD 기본 구현 완료
- DTO 구조 적용 완료
- mapper 기반 Response DTO 변환 적용 중

현재 User 구조:
- CreateUserDto
- UpdateUserDto
- UserResponseDto
- user.mapper.ts

현재 mapper 방향:
- Prisma Model을 API 응답으로 직접 반환하지 않음
- mapper 함수로 Response DTO 변환
- passwordHash 노출 방지 목적
- DTO / DB Model 분리 유지

예시 구조:
users/
├─ dto/
├─ mapper/
├─ users.controller.ts
├─ users.service.ts
└─ users.module.ts

Prisma 관련 중요 사항:
- Prisma 7 사용 중
- prisma.config.ts 사용
- generated/prisma 경로를 src 밖으로 분리
- Prisma Client import 경로:
  ../../generated/prisma

Prisma 7 런타임 구성:
- @prisma/adapter-pg 사용
- PrismaPg adapter 사용 중
- PrismaService에서 adapter 주입 방식 사용

PrismaService 개념:
- NestJS에서 PrismaClient를 DI로 사용하기 위한 wrapper
- EF Core DbContext 느낌으로 이해 중

Swagger:
- @nestjs/swagger plugin 적용
- DTO 필드 자동 반영 동작 확인 완료

현재까지 겪은 주요 이슈:
1.
Prisma generated 경로를 src 내부에 둘 경우
Nest build(dist) 환경에서 import 경로 문제 발생

해결:
generated/prisma를 src 밖으로 이동

2.
Prisma 7 runtime adapter 관련 오류

해결:
@prisma/adapter-pg 적용 후
PrismaService constructor에서 adapter 주입

3.
mapper 함수에 PrismaPromise 전달 문제

원인:
await 누락

해결:
service 계층에서 await 후 mapper 전달

4.
DTO property initialization 에러

해결:
DTO property에 definite assignment (!) 사용

현재 docs 방향:
- architecture.md
  프로젝트 구조 및 런타임 구조

- api-spec.md
  API 명세 정리

- portfolio-summary.md
  포트폴리오 요약

- troubleshooting.md
  삽질 및 해결 기록

- roadmap.md
  다음 구현 단계 관리

다음 구현 예정 순서:
1.
Validation 적용

- class-validator
- class-transformer
- ValidationPipe global 적용
- DTO decorator 적용

2.
email unique 처리 및 exception handling

3.
bcrypt 적용
- password 입력
- 서버에서 hash 생성
- passwordHash 저장

4.
JWT 로그인 구현

5.
RunningRecord CRUD 구현

6.
TrainingPlan 생성 로직 구현

추가 참고:
- 사용자는 .NET / EF Core 경험이 많음
- NestJS / Prisma를 EF Core 관점으로 이해 중
- DTO / Entity / Response 분리에 익숙함
- mapper 필요성 및 계층 분리 중요성을 인지하고 있음