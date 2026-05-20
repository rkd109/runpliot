# RunPilot Project Context

## Overview

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | RunPilot |
| 설명 | 러닝 기록 기반 훈련 계획 생성 서비스 |
| 구조 | NestJS + Next.js 기반 TypeScript 모노레포 |
| 목적 | 포트폴리오 목적의 개인 프로젝트 |

현재 목표:

```text
러닝 기록 저장
→ 사용자 데이터 분석
→ Rule-Based 훈련 계획 생성
→ 향후 AI/LLM 기반 추천 구조 확장
```

## Current Stack

### Frontend

- Next.js App Router
- TypeScript

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger

### Infra

- Docker Compose
- PostgreSQL 16

### Workspace

- pnpm workspace 기반 monorepo

## Workspace Structure

```text
apps/
├─ api/
├─ web/

packages/
├─ shared/

infra/
├─ docker/

docs/
├─ api-spec.md
├─ architecture.md
├─ project-context.md
├─ tech-decisions.md
├─ roadmap.md
```

## Current Backend Structure

```text
src/
├─ auth/
├─ users/
├─ running-records/
├─ training-plans/
├─ prisma/
└─ common/
```

## Current Authentication Flow

현재 JWT 기반 인증 구조를 사용합니다.

인증 흐름:

```text
회원가입
→ 로그인
→ JWT 발급
→ Bearer 인증
→ 보호 API 접근
```

현재 `Request.user` 구조:

```ts
{
  userId: number;
  email: string;
}
```

## Current API Status

### Public APIs

```http
POST /users
POST /auth/login
GET /
GET /health
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

## Current Domain Status

### RunningRecord

현재 구현 완료:

- 러닝 기록 생성
- 내 기록 조회
- 기록 수정
- 기록 삭제

현재 사용자 보호 방식:

```ts
where: {
  id,
  userId,
}
```

JWT `userId` 기반으로 사용자별 데이터 접근을 보호합니다.

### TrainingPlan

현재 구현 완료:

- Rule-Based TrainingPlan 생성
- TrainingPlan 목록 조회
- TrainingPlan 상세 조회

현재 생성 흐름:

```text
최근 RunningRecord 조회
→ 평균 거리 계산
→ 러닝 레벨 분류
→ TrainingPlan 생성
→ TrainingPlanItem 생성
```

현재 레벨 기준:

- `BEGINNER`
- `INTERMEDIATE`
- `ADVANCED`

## Current Response Structure

현재 방향:

```text
Prisma Model
→ mapper
→ Response DTO
```

원칙:

- Prisma Model 직접 반환 금지
- API Response / DB 구조 분리
- 민감 정보(`passwordHash`) 노출 방지

## Current Validation Strategy

현재 `ValidationPipe` 기반 DTO 검증을 사용합니다.

적용 옵션:

```ts
whitelist: true;
forbidNonWhitelisted: true;
transform: true;
```

현재 검증 흐름:

```text
Request
→ DTO Validation
→ Controller
```

## Current Swagger Status

현재 Swagger 기반 API 테스트 환경 구성을 완료했습니다.

현재 가능:

- 회원가입 테스트
- 로그인 테스트
- JWT Bearer 인증
- RunningRecord CRUD 테스트
- TrainingPlan 생성/조회 테스트

Swagger Authorize 기반으로 JWT 보호 API 테스트가 가능합니다.

## Current Prisma Status

현재 Prisma 7.x를 사용 중입니다.

현재 특징:

- `prisma.config.ts` 사용
- PrismaPg Adapter 사용
- `generated/prisma` 경로 분리

현재 `PrismaService` 기반으로 NestJS DI 구조 연결을 완료했습니다.

## Current Development Focus

현재 중점:

- DTO 기반 API 구조
- 인증/인가
- 사용자 데이터 보호
- Swagger 문서화
- Prisma 기반 CRUD
- Rule-Based 도메인 로직

## Current Development Status

현재 완료:

- pnpm monorepo 구성
- Docker PostgreSQL 환경 구성
- Prisma ORM 연결
- 회원가입 / 로그인
- JWT 인증
- RunningRecord CRUD
- TrainingPlan 생성
- TrainingPlan 조회
- Swagger 연동

## Next Priorities

### 1. API 완성도 향상

예정:

- mapper / response dto 정리
- pagination
- exception handling 정리
- 공통 response format 검토

### 2. Frontend 연동

예정:

- 로그인 화면
- accessToken 저장
- API 연동
- 러닝 기록 입력 화면
- 훈련 계획 조회 화면

### 3. 러닝 도메인 강화

예정:

- 평균 pace 계산
- 주간 거리 분석
- 과훈련 감지
- 추천 로직 고도화

## Current Direction

현재 RunPilot은 단순 CRUD 프로젝트보다 다음 경험을 목표로 합니다.

- 실무형 API 구조
- 인증/인가 흐름
- 사용자 데이터 보호
- Rule-Based 도메인 로직
- 확장 가능한 구조 설계

현재 목표:

> "실제 서비스 형태의 포트폴리오 구축"
