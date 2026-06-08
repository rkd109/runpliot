# Tech Decisions

RunPilot 프로젝트에서 사용한 주요 기술 선택과 설계 방향을 기록합니다.

## Monorepo Structure

### 결정

pnpm workspace 기반 monorepo 구조를 사용합니다.

구조:

```text
apps/
├─ api/
├─ web/

packages/
├─ shared/
```

### 이유

- Frontend / Backend 통합 관리
- TypeScript 기반 공통 타입 공유 가능
- 의존성 관리 단순화
- 향후 서비스 확장 대응

### 결과

- 프로젝트 구조 일관성 확보
- 공통 코드 분리 기반 마련
- frontend/backend 동시 개발 환경 구성 가능

## Backend Framework

### 결정

Backend Framework로 NestJS를 사용합니다.

### 이유

- 구조화된 아키텍처 제공
- DI 기반 설계
- Guard / Module / Service 구조 지원
- 실무형 API 구조 학습 목적

### 결과

현재 구조:

```text
Controller
→ Service
→ PrismaService
→ Database
```

구조를 일관성 있게 유지 가능해졌습니다.

## ORM Selection

### 결정

ORM으로 Prisma를 사용합니다.

현재 버전:

- Prisma 7.x

### 이유

- Type-safe ORM
- Prisma Client 기반 자동 타입 생성
- NestJS와 궁합 우수
- migration 관리 가능

### 추가 결정

Prisma 7 기준으로 `prisma.config.ts` 기반 설정을 사용합니다.

또한 `generated/prisma` 경로를 `src` 외부로 분리합니다.

### 결과

- Prisma Client 타입 안정성 확보
- migration 기반 DB 관리 가능
- `PrismaService` 기반 DI 구조 구성 완료

## Database Selection

### 결정

개발 DB로 PostgreSQL을 사용합니다.

로컬 환경은 Docker Compose 기반으로 구성합니다.

### 이유

- 실무 사용 빈도 높음
- Prisma와 궁합 우수
- Docker 기반 로컬 환경 구성 용이

### 결과

현재 구성:

- PostgreSQL 16
- Docker Compose 기반 실행

## Authentication Strategy

### 결정

JWT 기반 인증 구조를 사용합니다.

### 이유

- Stateless 인증 구조
- REST API 구조와 궁합 우수
- Swagger 테스트 연동 가능

### 구현 구성

- `passport`
- `passport-jwt`
- `@nestjs/jwt`
- `@nestjs/passport`

### 결과

현재 인증 흐름:

```text
로그인
→ JWT 발급
→ Bearer 인증
→ Guard 통과
→ 보호 API 접근
```

## Authorization Strategy

### 결정

NestJS Guard 기반 인증 보호 구조를 사용합니다.

### 이유

- Controller 단위 인증 적용 가능
- ASP.NET Authorize Attribute와 유사한 구조
- NestJS 표준 인증 방식

### 구현 방식

```ts
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
```

### 결과

- 인증 필요 API 명확화
- Swagger와 인증 흐름 연동 가능

## Password Strategy

### 결정

비밀번호는 bcrypt 기반 hash 저장 방식을 사용합니다.

### 이유

- 원본 비밀번호 저장 방지
- 표준적인 password hashing 방식

### 구현 흐름

```text
Client
→ password 전달
→ bcrypt.hash()
→ passwordHash 저장
```

### 결과

- DB에는 hash만 저장
- `passwordHash` 응답 노출 방지

## Validation Strategy

### 결정

DTO 기반 `ValidationPipe` 구조를 사용합니다.

### 이유

- Controller 진입 전 요청 검증 가능
- DTO 기반 API schema 자동화 가능
- Swagger와 연동 가능

### 적용 옵션

```ts
whitelist: true;
forbidNonWhitelisted: true;
transform: true;
```

### 결과

```text
Request
→ DTO Validation
→ Controller
```

구조를 확립했습니다.

## Response DTO / Mapper Strategy

### 결정

Prisma Model을 직접 반환하지 않고, Response DTO + mapper 구조를 사용합니다.

성공 응답은 Global Response Interceptor를 통해 공통 응답 형식으로 변환합니다.

### 이유

- `passwordHash` 노출 방지
- API Response / DB Model 분리
- 유지보수성 향상
- Frontend 응답 처리 단순화

### 구조

```text
Prisma Model
→ mapper
→ Response DTO
→ ResponseInterceptor
→ Common API Response
```

### 결과

- 응답 구조 통일 가능
- DB 변경과 API 응답 분리 가능
- Controller 응답 코드 단순화

## Response Interceptor Strategy

### 결정

Global Response Interceptor 기반 공통 성공 응답 구조를 사용합니다.

### 이유

- API 응답 구조 통일
- Frontend 응답 처리 단순화
- 성공/실패 응답 패턴 일관성 확보

### 현재 구조

```text
Controller Response
→ ResponseInterceptor
→ 공통 응답 변환
```

현재 응답 형식:

```json
{
  "success": true,
  "data": {}
}
```

### 결과

- API 응답 구조 일관성 확보
- Controller 응답 코드 단순화

## Exception Filter Strategy

### 결정

Global `HttpExceptionFilter` 기반 공통 실패 응답 구조를 사용합니다.

### 이유

- 에러 응답 구조 통일
- Validation / HttpException 일관 처리
- Frontend 에러 처리 단순화

### 현재 구조

```text
Exception 발생
→ HttpExceptionFilter
→ 공통 에러 응답 변환
```

현재 응답 형식:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "..."
}
```

### 결과

- `ValidationPipe` 에러 응답 통일 가능
- `HttpException` 기반 응답 일관성 확보

## User Data Protection Strategy

### 결정

모든 사용자 데이터는 JWT `userId` 기반으로 보호합니다.

### 이유

- 다른 사용자의 데이터 접근 방지

### 구현 방식

```ts
where: {
  id,
  userId,
}
```

### 결과

- 사용자별 데이터 보호 가능
- RunningRecord / TrainingPlan 접근 제어 가능

## RunningRecord Domain Strategy

### 결정

러닝 기록은 사용자별 CRUD 구조로 구현합니다.

### 이유

- 러닝 기록 기반 분석 및 훈련 계획 생성 목적

### 현재 기능

- 생성
- 조회
- 수정
- 삭제

### 결과

TrainingPlan 생성 기반 데이터를 확보할 수 있습니다.

## TrainingPlan Generation Strategy

### 결정

초기 버전은 Rule-Based 생성 로직을 사용합니다.

### 이유

- AI/LLM 이전 단계의 안정적 도메인 로직 확보
- 추천 흐름 MVP 빠른 구현 가능

### 현재 기준

```text
평균 거리 기반
→ BEGINNER
→ INTERMEDIATE
→ ADVANCED
```

### 결과

현재 흐름:

```text
RunningRecord 분석
→ TrainingPlan 생성
→ TrainingPlanItem 생성
```

구조 구현을 완료했습니다.

## Swagger Documentation Strategy

### 결정

Swagger 기반 API 문서화를 적용합니다.

### 이유

- API 테스트 단순화
- DTO 기반 문서 자동 생성
- JWT 인증 테스트 가능

### 결과

현재 Swagger에서 다음 기능을 테스트할 수 있습니다.

- 회원가입
- 로그인
- RunningRecord CRUD
- TrainingPlan 생성/조회

## Controller Style Strategy

### 결정

NestJS Controller는 method 방식으로 작성합니다.

### 이유

Nest decorator는 prototype method 기반으로 동작하므로, arrow function보다 안정적인 동작 보장을 목적으로 합니다.

### 권장 방식

```ts
async login() {}
```

### 비권장 방식

```ts
login = async () => {}
```

## Request Type Strategy

### 결정

JWT 인증 이후 `Request.user` 타입 재사용을 위해 공통 타입 분리를 적용합니다.

### 예정 구조

```text
auth/
├─ types/
│  ├─ authenticated-request.type.ts
│  └─ jwt-user.type.ts
```

### 이유

- 타입 재사용
- JWT payload 구조 통일
- 인증 관련 타입 관리

## Future Expansion Strategy

### 결정

초기에는 Rule-Based 기반 구조를 우선 구축하고, 향후 AI/LLM 기반 구조로 확장합니다.

### 예정 기능

- 평균 pace 계산
- 주간 거리 분석
- 과훈련 감지
- 사용자 패턴 분석
- 개인화 훈련 추천

### 장기 방향

```text
Running Data
→ Domain Analysis
→ Personalized Recommendation
→ AI/LLM Expansion
```

## Current Philosophy

현재 RunPilot의 핵심 방향은 다음과 같습니다.

> 단순 CRUD 튜토리얼이 아닌 실무형 API 구조와 도메인 흐름 경험

현재 중점:

- 인증/인가
- DTO 기반 설계
- 사용자 데이터 보호
- Swagger 문서화
- Prisma ORM
- Rule-Based 도메인 로직
- 확장 가능한 구조

## API Design Strategy

### 결정

REST API 기반 구조를 사용합니다.

### 이유

- Frontend 연동 용이
- Swagger 문서화 용이
- NestJS 구조와 자연스럽게 연결 가능

### 현재 API 스타일

```http
POST   /auth/login

POST   /running-records
GET    /running-records/me
PATCH  /running-records/:id
DELETE /running-records/:id

POST   /training-plans/generate
GET    /training-plans/me
GET    /training-plans/:id
```

### 결과

- 도메인 중심 API 구조 확보
- Frontend 연동 준비 가능

## Domain Separation Strategy

### 결정

도메인 기준으로 module/controller/service를 분리합니다.

### 이유

- 기능별 책임 분리
- 유지보수성 향상
- NestJS 표준 구조 활용

### 현재 구조

```text
src/
├─ auth/
├─ users/
├─ running-records/
├─ training-plans/
```

### 결과

- 도메인 단위 개발 가능
- 기능 추가 시 영향 범위 최소화

## Service Responsibility Strategy

### 결정

비즈니스 로직은 Service에 집중합니다.

### 이유

Controller는 Request 처리 역할만 담당하고, 비즈니스 로직 분리를 통해 구조 명확성을 유지합니다.

### 현재 흐름

```text
Controller
→ Request parsing

Service
→ validation
→ domain logic
→ prisma 호출
```

### 결과

- Controller 단순화
- 테스트 및 유지보수 용이성 향상

## Prisma Error Handling Strategy

### 결정

Prisma 에러는 타입 가드 기반으로 처리합니다.

### 이유

- `unknown` 기반 error 처리 안정성 확보

### 현재 방식

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

### 결과

- Prisma unique constraint 처리 가능
- TypeScript error narrowing 가능

## Nested Create Strategy

### 결정

TrainingPlan 생성 시 Prisma nested create를 사용합니다.

### 이유

TrainingPlan과 TrainingPlanItem을 동시에 생성해야 합니다.

### 현재 방식

```ts
items: {
  create: items,
}
```

### 결과

- 부모/자식 데이터 동시 생성 가능
- transaction 성격 처리 단순화

## Rule-Based First Strategy

### 결정

초기에는 AI보다 Rule-Based 로직을 우선 구현합니다.

### 이유

- 도메인 규칙 먼저 검증 가능
- MVP 구현 속도 확보
- 데이터 구조 안정화 가능

### 현재 Rule 예시

```text
최근 러닝 평균 거리
→ 러닝 레벨 분류
→ 훈련 강도 결정
```

### 결과

- TrainingPlan MVP 구현 가능
- 향후 AI 추천 기반 마련

## Swagger First Testing Strategy

### 결정

초기 개발 단계에서는 Swagger 기반 테스트를 우선 사용합니다.

### 이유

- Frontend 없이 API 검증 가능
- JWT 인증 테스트 가능
- 개발 속도 향상

### 현재 테스트 방식

```text
Swagger Authorize
→ JWT 입력
→ Protected API 테스트
```

### 결과

- Frontend 없이 인증 흐름 검증 가능
- 사용자 데이터 보호 검증 가능

## User Ownership Verification Strategy

### 결정

데이터 수정/삭제 시 항상 소유권 검사를 수행합니다.

### 이유

- 다른 사용자의 데이터 접근 방지

### 현재 방식

```ts
findFirst({
  where: {
    id,
    userId,
  },
})
```

### 결과

- 사용자별 데이터 격리 가능
- 수정/삭제 보호 가능

## API Response Separation Strategy

### 결정

Prisma Entity와 API Response를 분리합니다.

### 이유

- DB 구조와 API 응답 결합 방지

### 현재 방향

```text
Database Entity
→ mapper
→ Response DTO
```

### 결과

- API 변경 안정성 확보
- 민감 정보 노출 방지

## Type Reuse Strategy

### 결정

공통 타입은 분리하여 재사용합니다.

### 이유

- 중복 제거
- 타입 일관성 유지

### 현재 예정

```text
auth/types/
├─ authenticated-request.type.ts
├─ jwt-user.type.ts
```

### 결과

- Controller 코드 단순화
- JWT payload 타입 통일 가능

## Frontend Separation Strategy

### 결정

Frontend와 Backend를 명확히 분리합니다.

### 이유

- API 기반 구조 학습 목적
- Next.js / NestJS 역할 분리
- 독립 배포 가능성 확보

### 현재 방향

```text
apps/web
→ UI / Client

apps/api
→ API / Domain Logic
```

### 결과

- SPA 기반 구조 확장 가능
- API 재사용 가능

## Deployment Strategy

### 현재 방향

배포는 frontend/backend 분리 배포를 고려 중입니다.

### 예정 방향

```text
Frontend
→ Vercel

Backend
→ 별도 Node 환경/AWS 고려
```

### 이유

- Next.js와 Vercel 궁합 우수
- API 독립 운영 가능

## Development Philosophy

### 현재 방향

RunPilot은 단순 CRUD 프로젝트보다 다음 경험을 목표로 합니다.

- 실무형 API 구조
- 인증/인가 흐름
- 사용자 데이터 보호
- Rule-Based 도메인 로직
- 확장 가능한 구조 설계

### 핵심 목표

> "실제 서비스 형태의 포트폴리오" 구현 경험 확보

## Frontend Framework Selection

### 결정

Frontend Framework로 Next.js App Router를 사용합니다.

### 이유

- React 기반 최신 구조 경험 목적
- Server Component / Client Component 구조 학습
- Vercel 배포와 궁합 우수
- TypeScript 지원 우수

### 현재 방향

초기 MVP 단계에서는 단순 구조를 우선 유지합니다.

예시:

```text
page.tsx
→ 직접 구현

복잡도 증가 이후
→ component 분리
```

### 결과

- 빠른 MVP 개발 가능
- 점진적 구조 개선 가능

## Frontend Authentication Strategy

### 결정

Frontend 인증은 JWT accessToken + sessionStorage 기반으로 구현합니다.

### 이유

- 포트폴리오 MVP 단계에서 단순한 구조
- localStorage 대비 세션 단위 관리 가능
- Authorization Header 기반 API 인증 가능

### 현재 흐름

```text
로그인
→ accessToken 저장
→ Axios Interceptor Authorization Header 설정
→ 보호 API 호출

로그인 유지 흐름
앱 시작
→ sessionStorage accessToken 확인
→ /auth/me 호출
→ 사용자 상태 복구
```

### 결과

- 새로고침 이후 로그인 유지 가능
- Frontend 인증 흐름 단순화

## Frontend State Management Strategy

### 결정

Frontend 인증 상태 관리는 Context API 기반으로 구현합니다.

### 이유

- 현재 상태 규모가 크지 않음
- MVP 단계에서 단순한 구조 유지 목적
- 외부 상태관리 라이브러리 의존성 최소화

### 현재 관리 상태

- 로그인 사용자 정보
- 인증 초기화 상태

### 현재 구조

```text
AuthProvider
→ user 상태 관리

ProtectedRoute
→ 인증 보호
```

### 결과

- 인증 상태 전역 관리 가능
- 로그인 유지 흐름 구현 가능

## Protected Route Strategy

### 결정

보호 페이지 접근은 `ProtectedRoute` 컴포넌트 기반으로 구현합니다.

### 이유

- 페이지 단위 인증 보호 가능
- 인증 흐름 분리 가능
- App Router 구조와 자연스럽게 연결 가능

### 현재 흐름

```text
페이지 접근
→ user 상태 확인
→ 미인증 시 /login redirect

현재 적용 대상
→ RunningRecords Page
→ TrainingPlans Page
→ TrainingPlan Detail Page
```

### 결과

- 보호 페이지 접근 제어 가능
- 인증 흐름 재사용 가능

## Axios Client Strategy

### 결정

Frontend API 통신은 Axios 기반으로 구성합니다.

### 이유

- Interceptor 기반 공통 처리 가능
- Authorization Header 자동 설정 가능
- 공통 에러 처리 확장 가능

### 현재 구조

```text
Axios Instance
→ Interceptor
→ Authorization Header 설정
```

### 현재 처리
JWT Bearer Token 자동 주입

### 결과

- API 호출 코드 단순화
- 인증 처리 중복 제거

## Duration Storage Strategy

### 결정

러닝 시간은 `durationSeconds` 기반으로 저장합니다.

### 이유

- pace 계산 정확성 확보
- 시간 계산 단순화
- 향후 러닝 데이터 분석 대응

### Frontend 입력 구조

```text
시
분
초
```

```text
현재 계산 방식
(hours * 3600)
+ (minutes * 60)
+ seconds
```

### 결과

- 평균 pace 계산 가능
- 러닝 분석 로직 확장 가능
