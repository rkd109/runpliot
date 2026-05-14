# RunPilot Project Context

프로젝트명: RunPilot

러닝 기록 기반 훈련 계획 생성 서비스.
포트폴리오 목적의 개인 프로젝트이며,
NestJS + Next.js 기반 모노레포 구조로 개발 중이다.

---

# 현재 상태

## 기술 스택

- pnpm workspace 기반 monorepo
- apps/api: NestJS
- apps/web: Next.js App Router
- PostgreSQL
- Prisma 7.x
- Docker Compose
- Swagger

## 현재 구조

```txt
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
├─ roadmap.md
└─ project-context.md
```

## Prisma 구성

- Prisma 7 사용 중
- prisma.config.ts 사용
- generated/prisma 경로를 src 밖으로 분리
- Prisma Client import 경로:
  `../../generated/prisma`

## Prisma Runtime 구성

- @prisma/adapter-pg 사용
- PrismaPg adapter 사용 중
- PrismaService에서 adapter 주입 방식 사용

## 현재 DB 구조

### User

```prisma
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  nickname     String?  @unique
  passwordHash String
}
```

관련 테이블:
- running_records
- training_plans
- training_plan_items

현재 FK는 User.id(Int) 기준으로 구성됨.

---

# 최근 변경

## DTO / Mapper 구조 적용

현재 방향:

```txt
Prisma Model
→ mapper
→ Response DTO
```

목적:
- passwordHash 노출 방지
- API Response / DB Model 분리
- 유지보수성 향상

현재 User 구조:

```txt
users/
├─ dto/
├─ mapper/
├─ users.controller.ts
├─ users.service.ts
└─ users.module.ts
```

---

## Validation 적용 완료

적용 내용:
- class-validator
- class-transformer
- Global ValidationPipe 적용

main.ts:

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

DTO:
- validation decorator 적용
- Swagger decorator 적용

사용 예시:

```ts
@IsEmail()
@IsString()
@MinLength()
```

---

## Exception Handling 적용 완료

구현 내용:
- email unique 사전 체크
- nickname unique 사전 체크
- Prisma unique constraint(P2002) 대응

현재 방식:
- 사전 조회(pre-check)
- DB unique constraint 동시 사용

Prisma 타입가드 사용 중:

```ts
type PrismaKnownError = {
  code: string;
  meta?: unknown;
};

const isPrismaKnownError = (
  error: unknown,
): error is PrismaKnownError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error
  );
};
```

---

## bcrypt 적용 완료

현재 구조:

```txt
dto.password
→ bcrypt.hash()
→ passwordHash 저장
```

회원가입 시:
- password 입력
- 서버에서 hash 생성
- passwordHash 저장

---

## JWT 인증 구현 완료

설치 의존성:
- @nestjs/jwt
- @nestjs/passport
- passport
- passport-jwt

구현 완료:
- AuthModule
- AuthService
- AuthController
- LoginDto
- LoginResponseDto
- JwtStrategy
- JwtAuthGuard

현재 인증 흐름:

```txt
회원가입
→ 로그인
→ JWT 발급
→ Bearer 인증
→ 보호 API 접근
```

현재 테스트 완료:
- Swagger Authorize
- /auth/login
- /auth/me

---

# 다음 작업

## 1. RunningRecord CRUD

구현 예정:

```txt
running-records/
├─ dto/
├─ mapper/
├─ running-records.controller.ts
├─ running-records.service.ts
└─ running-records.module.ts
```

예정 API:
- POST /running-records
- GET /running-records/me
- PATCH /running-records/:id
- DELETE /running-records/:id

핵심 목표:

```txt
JWT user
→ userId 연결
→ 사용자별 데이터 보호
```

---

## 2. TrainingPlan 생성 로직

예정 기능:
- 러닝 기록 기반 훈련 계획 생성
- 룰 기반 생성 로직
- TrainingPlan / TrainingPlanItem 활용

---

# 학습 포인트 정리

## NestJS Guard

- ASP.NET Authorize Attribute 느낌
- Controller 진입 전 인증 검사 역할

## Passport

- 인증 전략(strategy) 기반 라이브러리
- NestJS는 Passport 기반 인증 구조 사용

## JwtStrategy 역할

- JWT 해석
- Request.user 구성

## JwtAuthGuard 역할

- 보호 API 지정

## Controller Method Style

Nest Controller는
arrow function보다 method 방식이 안정적임.

권장 방식:

```ts
async login() {}
```

---

## Swagger 구성 완료

현재 적용 내용:
- SwaggerModule 적용
- DTO 기반 API 문서 자동화
- Validation decorator 기반 request schema 반영
- Bearer Token 인증 연동

main.ts:

```ts
const config = new DocumentBuilder()
  .setTitle('RunPilot API')
  .setDescription('RunPilot API 문서')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
```

현재 Swagger 테스트 가능 항목:
- 회원가입
- 로그인
- JWT Bearer 인증
- 보호 API 호출

---

## Auth 구조 정리

현재 auth 구조:

```txt
auth/
├─ dto/
│  ├─ login.dto.ts
│  └─ login-response.dto.ts
├─ guards/
│  └─ jwt-auth.guard.ts
├─ strategies/
│  └─ jwt.strategy.ts
├─ auth.controller.ts
├─ auth.service.ts
└─ auth.module.ts
```

---

## 로그인 흐름 상세

현재 로그인 로직:

```txt
email 조회
→ bcrypt.compare()
→ JWT 생성
→ accessToken 반환
```

JWT payload:

```ts
{
  sub: user.id,
  email: user.email,
}
```

현재 Response:

```json
{
  "accessToken": "..."
}
```

---

## JwtStrategy 동작 방식

현재 JwtStrategy:

```ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
```

동작 흐름:

```txt
Authorization: Bearer xxx
→ JWT 추출
→ secret 검증
→ payload decode
→ validate()
→ Request.user 구성
```

현재 validate 반환값:

```ts
{
  userId: payload.sub,
  email: payload.email,
}
```

---

## JwtAuthGuard 동작 방식

현재 Guard:

```ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

사용 방식:

```ts
@UseGuards(JwtAuthGuard)
```

역할:
- JWT 인증 필요 API 지정
- 인증 실패 시 401 반환

---

## 현재 API 상태

### Public API

```txt
POST /users
POST /auth/login
GET /health
GET /
```

### Protected API

```txt
GET /auth/me
```

---

## 현재 Response 구조 방향

현재 방향:

```txt
Controller
→ Service
→ mapper
→ Response DTO
```

원칙:
- Prisma Model 직접 반환 금지
- API Response와 DB 구조 분리 유지

---

## 현재 학습한 Prisma 개념 정리

### PrismaService

NestJS에서 PrismaClient를 DI로 사용하기 위한 wrapper.

EF Core DbContext 느낌으로 이해 중.

---

### Prisma migrate

현재 사용 흐름:

```bash
pnpm prisma migrate dev --name something
```

역할:
- migration 생성
- DB 반영
- Prisma Client 갱신

---

### Prisma generate

현재 이해:
- schema.prisma 변경 후
- Prisma Client 타입 재생성 필요

사용 명령어:

```bash
pnpm prisma generate
```

---

### Prisma reset

초기 개발 단계에서
스키마 변경 시 자주 사용.

사용 명령어:

```bash
pnpm prisma migrate reset
```

역할:
- DB 초기화
- migration 재적용
- 개발 환경 재구성

---

## NestJS Controller 스타일 정리

현재 학습 내용:
- Controller에서는 method 스타일 권장
- decorator와 함께 사용할 경우
  arrow function보다 안정적

권장 방식:

```ts
@Post('login')
async login() {}
```

비권장 방식:

```ts
login = async () => {}
```

현재 이유 이해:
- Nest decorator는 prototype method 기반으로 동작
- arrow function은 instance property 기반

---

## Validation 전략 정리

현재 Validation 방향:

```txt
Request
→ DTO Validation
→ Controller 진입
```

사용 중 옵션:

```ts
whitelist: true
```

역할:
- DTO에 없는 필드 제거

---

```ts
forbidNonWhitelisted: true
```

역할:
- DTO에 없는 필드 요청 시 400 반환

---

```ts
transform: true
```

역할:
- 요청 데이터를 DTO 타입 기준으로 변환

---

## Exception Handling 방향 정리

현재 방향:

```txt
사전 검증(pre-check)
+
DB unique constraint
```

예시:

```txt
email 중복 확인
→ nickname 중복 확인
→ create
```

추가로:
- Prisma P2002 에러 대응
- Race Condition 일부 방어 목적

현재 이해:
- Service validation만으로는 부족
- DB unique constraint도 반드시 필요

---

## Password 처리 방향 정리

현재 방향:

```txt
Client
→ password 전달
→ 서버에서 hash 생성
→ passwordHash 저장
```

원칙:
- Client는 hash 생성 책임 없음
- DB에는 hash만 저장
- API Response에는 passwordHash 미포함

---

## JWT 인증 흐름 정리

현재 인증 흐름:

```txt
POST /auth/login
→ email 조회
→ bcrypt.compare()
→ JWT 발급
→ accessToken 반환
```

Bearer 인증 흐름:

```txt
Authorization: Bearer xxx
→ JwtStrategy
→ validate()
→ Request.user 생성
→ Guard 통과
→ Controller 접근
```

---

## Request.user 현재 구조

현재 Request.user:

```ts
{
  userId: number;
  email: string;
}
```

향후 활용 예정:
- 사용자별 데이터 조회
- RunningRecord 소유권 검사
- 사용자 데이터 보호

---

## RunningRecord 구현 예정 방향

예정 구조:

```txt
running-records/
├─ dto/
├─ mapper/
├─ running-records.controller.ts
├─ running-records.service.ts
└─ running-records.module.ts
```

예정 기능:
- 러닝 기록 생성
- 내 기록 조회
- 기록 수정
- 기록 삭제

예정 인증 구조:

```ts
@UseGuards(JwtAuthGuard)
```

사용 예정:
- JWT 기반 사용자 연결
- Request.user.userId 활용

---

## 현재 개발 방향 정리

현재 목표:
- NestJS + Prisma 구조 학습
- 실무형 API 흐름 경험
- 포트폴리오 구성

현재 중점:
- DTO 분리
- Mapper 구조
- Validation
- 인증/인가
- Swagger 문서화
- Prisma 기반 CRUD 흐름 이해

---

## 현재 이해한 NestJS 구조

현재 이해:

```txt
Controller
→ Request 처리

Service
→ 비즈니스 로직

Module
→ 의존성 구성

Guard
→ 인증/인가 검사

Strategy
→ 인증 해석 처리
```

---

## 현재 이해한 인증 구조

현재 인증 구조:

```txt
Passport
→ 인증 엔진

passport-jwt
→ JWT 전략 구현체

JwtStrategy
→ JWT 해석

JwtAuthGuard
→ 보호 API 지정
```

---

## 다음 목표

단기 목표:
- RunningRecord CRUD 구현 완료
- 사용자별 데이터 접근 구현

중기 목표:
- TrainingPlan 생성 로직
- 러닝 기록 기반 추천 구조 설계

장기 목표:
- 실제 서비스 형태의 러닝 플랫폼 구축
- 포트폴리오 완성
- 프론트엔드 연동