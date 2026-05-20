# Architecture

RunPilot은 러닝 기록 기반 훈련 계획 생성 서비스입니다.

포트폴리오 목적의 개인 프로젝트이며, NestJS + Next.js 기반 TypeScript 모노레포 구조로 개발 중입니다.

현재 목표는 다음과 같습니다.

```text
러닝 기록 저장
→ 사용자 데이터 분석
→ 규칙 기반 훈련 계획 생성
→ 향후 AI/LLM 기반 추천 구조 확장
```

## Workspace Structure

```text
apps/
├─ api/          # NestJS Backend API
├─ web/          # Next.js Frontend

packages/
├─ shared/       # 공통 타입 / 상수

infra/
├─ docker/       # PostgreSQL 로컬 개발 환경

docs/
├─ api-spec.md
├─ architecture.md
├─ project-context.md
├─ tech-decisions.md
├─ roadmap.md
```

## Tech Stack

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS (예정)

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger

### Infra

- Docker Compose
- PostgreSQL 16

### Monorepo

- pnpm workspace 기반 monorepo

## Runtime Environment

| Service | URL |
| --- | --- |
| Web | `http://localhost:3000` |
| API | `http://localhost:3001` |
| Swagger | `http://localhost:3001/docs` |
| PostgreSQL | `localhost:15432` |

## Backend Architecture

현재 백엔드는 NestJS의 계층 구조를 기반으로 구성되어 있습니다.

```text
Controller
→ Request 처리

Service
→ 비즈니스 로직

PrismaService
→ DB 접근

Prisma ORM
→ PostgreSQL
```

## API Structure

현재 API는 다음과 같은 도메인 구조로 분리되어 있습니다.

```text
src/
├─ auth/
├─ users/
├─ running-records/
├─ training-plans/
├─ prisma/
└─ common/
```

## Authentication Architecture

JWT 기반 인증 구조를 사용합니다.

인증 흐름:

```text
회원가입
→ 로그인
→ JWT 발급
→ Bearer 인증
→ 보호 API 접근
```

현재 인증 관련 구성:

```text
auth/
├─ dto/
├─ guards/
├─ strategies/
├─ types/
├─ auth.controller.ts
├─ auth.service.ts
└─ auth.module.ts
```

구성 요소 역할:

| Component | Role |
| --- | --- |
| `JwtStrategy` | JWT 해석 및 `Request.user` 구성 |
| `JwtAuthGuard` | 인증 필요 API 보호 |
| `Passport` | 인증 전략 기반 처리 |

현재 `Request.user` 구조:

```ts
{
  userId: number;
  email: string;
}
```

## Validation Strategy

Global `ValidationPipe`를 사용하여 DTO 기반 요청 검증을 수행합니다.

적용 옵션:

```ts
whitelist: true;
forbidNonWhitelisted: true;
transform: true;
```

검증 흐름:

```text
Request
→ DTO Validation
→ Controller 진입
```

사용 라이브러리:

- `class-validator`
- `class-transformer`

## Response Architecture

Prisma Model을 직접 반환하지 않고, Response DTO + mapper 구조를 사용합니다.

현재 방향:

```text
Prisma Model
→ mapper
→ Response DTO
```

목적:

- 민감 정보(`passwordHash`) 노출 방지
- API Response / DB Model 분리
- 유지보수성 향상

## Database Architecture

### ORM

- Prisma 7.x 사용
- `prisma.config.ts` 기반 구성
- PrismaPg Adapter 사용

현재 Prisma Client는 `generated/prisma` 경로를 통해 관리됩니다.

### Current Domain Model

```text
User
└─ RunningRecord (1:N)

User
└─ TrainingPlan (1:N)

TrainingPlan
└─ TrainingPlanItem (1:N)
```

## RunningRecord Domain

사용자의 러닝 기록 저장 도메인입니다.

현재 기능:

- 러닝 기록 생성
- 내 기록 조회
- 기록 수정
- 기록 삭제

보호 방식:

- JWT `userId` 기반 사용자 데이터 보호

현재 API:

```http
POST /running-records
GET /running-records/me
PATCH /running-records/:id
DELETE /running-records/:id
```

## TrainingPlan Domain

러닝 기록 기반 훈련 계획 생성 도메인입니다.

현재 방식은 Rule-Based 생성 로직입니다.

생성 흐름:

```text
최근 RunningRecord 조회
→ 평균 거리 계산
→ 러닝 레벨 분류
→ 주간 훈련 계획 생성
→ TrainingPlan 저장
→ TrainingPlanItem 저장
```

현재 지원 기능:

- 훈련 계획 생성
- 내 훈련 계획 목록 조회
- 훈련 계획 상세 조회

현재 API:

```http
POST /training-plans/generate
GET /training-plans/me
GET /training-plans/:id
```

## TrainingPlan Generation Strategy

현재 생성 로직은 Rule-Based 방식입니다.

예시 기준:

| 평균 거리 | Level |
| --- | --- |
| 3km 미만 | `BEGINNER` |
| 3~7km | `INTERMEDIATE` |
| 7km 이상 | `ADVANCED` |

향후 확장 예정:

- 주간 거리 분석
- 평균 pace 계산
- 과훈련 감지
- 러닝 패턴 분석
- AI/LLM 기반 추천

## Security Strategy

현재 적용 중인 보안 전략:

- bcrypt password hashing
- JWT 인증
- 사용자별 데이터 접근 제한
- Prisma unique constraint 활용
- `ValidationPipe` 기반 요청 검증

현재 사용자 데이터 보호 방식:

```ts
where: {
  id,
  userId,
}
```

사용자 본인 데이터만 접근 가능하도록 구현 중입니다.

## Development Strategy

현재 개발 방향:

```text
실무형 API 구조 학습
+
포트폴리오 목적 서비스 개발
```

현재 중점:

- DTO 분리
- Mapper 구조
- 인증/인가
- Swagger 문서화
- Prisma 기반 CRUD
- 사용자 데이터 보호
- Rule 기반 도메인 로직

## Current Development Status

현재 완료:

- pnpm monorepo 구성
- NestJS API 구성
- PostgreSQL Docker 환경 구성
- Prisma ORM 연결
- 회원가입 / 로그인
- JWT 인증
- RunningRecord CRUD
- TrainingPlan 생성 / 조회
- Swagger 연동

다음 예정 작업:

1. API 완성도 향상
   - mapper / response dto 정리
   - pagination
   - exception handling 정리
2. Frontend 연동
   - 로그인 페이지
   - accessToken 저장
   - 러닝 기록 입력 화면
   - 훈련 계획 조회 화면
3. 러닝 도메인 강화
   - pace 계산
   - 거리 분석
   - 추천 로직 고도화

## Swagger Documentation

현재 Swagger 기반 API 문서화를 적용하였습니다.

설정:

```ts
const config = new DocumentBuilder()
  .setTitle('RunPilot API')
  .setDescription('RunPilot API 문서')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
```

현재 지원:

- DTO 기반 schema 자동 생성
- Validation decorator 반영
- JWT Bearer 인증 테스트
- Swagger Authorize 연동

현재 Swagger를 통해 회원가입, 로그인, RunningRecord CRUD, TrainingPlan 생성 및 조회 테스트가 가능합니다.

## Error Handling Strategy

현재 예외 처리 방향:

```text
사전 검증(pre-check)
+
DB constraint 기반 보호
```

예시:

```text
email 중복 검사
→ nickname 중복 검사
→ create 실행
```

추가적으로 Prisma unique constraint 에러(`P2002`)를 처리하여 Race Condition 상황 일부를 방어합니다.

현재 적용 중인 방식:

```text
Service validation
+
DB unique constraint
```

## Authorization Strategy

현재 보호 API는 모두 JWT Guard 기반으로 동작합니다.

예시:

```ts
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('running-records')
```

역할:

| Component | Role |
| --- | --- |
| `JwtAuthGuard` | 실제 인증 검사 |
| `ApiBearerAuth` | Swagger 인증 UI 연동 |

현재 인증 성공 시 `Request.user`에 JWT payload 기반 사용자 정보가 주입됩니다.

## Request Type Strategy

JWT 인증 이후 `Request.user` 타입 재사용을 위해 공통 타입 분리를 적용 중입니다.

예정 구조:

```text
auth/
├─ types/
│  ├─ authenticated-request.type.ts
│  └─ jwt-user.type.ts
```

예시:

```ts
export type JwtUser = {
  userId: number;
  email: string;
};

export type AuthenticatedRequest = Request & {
  user: JwtUser;
};
```

목적:

- Controller 타입 재사용
- JWT payload 구조 통일
- 인증 관련 타입 관리

## Prisma Usage Strategy

현재 Prisma는 NestJS의 `PrismaService`를 통해 사용됩니다.

구조:

```text
Controller
→ Service
→ PrismaService
→ Prisma Client
→ PostgreSQL
```

현재 Prisma 특징:

- Prisma 7.x
- `prisma.config.ts` 사용
- PrismaPg Adapter 사용
- `generated/prisma` 경로 분리

현재 개발 단계에서는 `Prisma migrate reset`을 활용하여 스키마 변경을 빠르게 반복 적용하고 있습니다.

## Monorepo Strategy

현재 프로젝트는 pnpm workspace 기반 monorepo 구조입니다.

목적:

- Frontend / Backend 통합 관리
- 공통 타입 공유
- 의존성 관리 단순화
- 추후 서비스 확장 대응

향후 예정:

```text
packages/shared
→ 공통 DTO
→ 공통 타입
→ 상수 분리
```

## Frontend Integration Plan

현재 프론트엔드는 아직 최소 구조 단계입니다.

예정 작업:

1. 로그인 화면
2. JWT accessToken 저장
3. API 연동
4. 러닝 기록 입력 화면
5. 훈련 계획 조회 화면

예정 인증 흐름:

```text
로그인
→ accessToken 저장
→ Authorization Header 설정
→ 보호 API 호출
```

현재 accessToken 저장 방식은 sessionStorage 기반을 고려 중입니다.

## Future Expansion

현재 Rule-Based 기반 생성 로직을 사용 중이지만, 향후 다음 방향으로 확장 예정입니다.

### 러닝 분석 기능

- 평균 pace 계산
- 최근 7일 거리 분석
- 훈련 강도 분석
- 과훈련 감지
- 회복 상태 분석

### AI / LLM 확장

```text
러닝 기록 분석
→ 사용자 패턴 분석
→ 개인화 훈련 계획 생성
```

현재 목표는 LLM 이전에 Rule-Based 기반 도메인 로직을 먼저 안정적으로 구축하는 것입니다.

## Current Design Philosophy

현재 프로젝트의 핵심 방향은 다음과 같습니다.

> 단순 CRUD 구현보다 "실제 서비스 형태의 구조 경험"

현재 중점 요소:

- DTO 기반 API 설계
- 인증/인가 구조
- 사용자 데이터 보호
- Swagger 문서화
- Prisma ORM 활용
- 도메인 기반 구조 분리
- Rule-Based 비즈니스 로직

## Summary

현재 RunPilot은 다음 상태까지 구현되었습니다.

- 사용자 인증 시스템
- JWT 기반 보호 API
- RunningRecord CRUD
- 사용자별 데이터 접근 제한
- Rule-Based TrainingPlan 생성
- TrainingPlan 조회
- Swagger 기반 API 테스트

현재 구조는 단순 CRUD 튜토리얼 수준을 넘어서, 실무형 API 구조와 사용자 데이터 보호 흐름을 학습/구현하는 방향으로 발전 중입니다.
