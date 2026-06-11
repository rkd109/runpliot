# RunPilot Project Context

## Overview

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | RunPilot |
| 설명 | 러닝 기록 기반 상태 확인 및 훈련 계획 생성 서비스 |
| 구조 | Next.js + NestJS 기반 TypeScript 모노레포 |
| 목적 | 실무형 API/프론트 흐름을 담은 포트폴리오 프로젝트 |

현재 방향:

```text
러닝 기록 저장
→ 러닝 상태 요약
→ Rule-Based 훈련 계획 생성
→ 향후 분석/AI 추천 구조 확장
```

## Current Development Status

현재 완료:

- pnpm workspace 기반 monorepo 구성
- Docker PostgreSQL 16 로컬 환경 구성
- Prisma ORM 및 migration 구성
- JWT 로그인 및 `/auth/me` 기반 사용자 상태 복구
- `POST /auth/signup` 기반 회원가입 API 및 프론트 회원가입 화면
- 로그아웃 및 보호 페이지 내 로그아웃 버튼
- sessionStorage 기반 accessToken 저장
- Axios Interceptor 기반 Authorization Header 처리
- ProtectedRoute 기반 보호 페이지
- RunningRecord CRUD
- RunningRecord `paceSecPerKm` 계산 및 응답 제공
- Dashboard MVP
- Dashboard loading/empty 상태 개선
- Dashboard 최근 7일 거리 차트, 이번 달 거리, 최근 pace 추세
- TrainingPlan Rule-Based 생성
- TrainingPlan 목록/상세 조회
- TrainingPlan 목록 내 아코디언 상세 조회
- 목표 입력 기반 TrainingPlan 생성 UX
- RunningRecord / TrainingPlan 목록 pagination
- Swagger 연동
- Response DTO / mapper 적용
- Global Response Interceptor 적용
- Global HttpExceptionFilter 적용
- Frontend format utility 분리

현재 제외/정리:

- 공개 테스트용 Users API는 `AppModule`에서 제거되어 라우트로 노출되지 않는다.
- `apps/api/src/users` 코드는 추후 회원가입/관리자 기능 재구성을 위해 남겨둔다.

## Frontend Status

현재 구현 페이지:

```text
/                  Login entry / authenticated redirect
/login             Login
/signup            Signup
/runner-profile/setup Runner profile setup
/dashboard         Running summary dashboard
/running-records   RunningRecord CRUD
/training-plans    TrainingPlan list/generate
/training-plans/:id TrainingPlan direct detail route
```

`/`는 비로그인 상태에서 회원가입/로그인 버튼을 노출하고, 로그인 상태에서는 `/dashboard`로 이동한다.
회원가입 성공 후에는 `/runner-profile/setup`으로 이동해 기본 운동 능력과 선호 훈련 요일을 입력받는다.

현재 Dashboard MVP:

- 총 러닝 거리
- 러닝 횟수
- 평균 페이스
- 이번 달 거리
- 최근 7일 거리 차트
- 최근 pace 추세
- 최근 러닝 기록 5개
- 훈련 계획 CTA
- loading skeleton
- empty state

현재 RunningRecord UI:

- 러닝 기록 조회
- 러닝 기록 생성
- 러닝 기록 수정
- 러닝 기록 삭제
- API 응답의 `paceSecPerKm` 기반 pace 표시
- 생성/수정/삭제 중 상태 표시
- 생성/수정 form validation message
- 공통 에러 메시지 UI
- 대시보드 이동 및 로그아웃 버튼

현재 TrainingPlan UI:

- 훈련 계획 목록 조회
- 목표 입력 후 훈련 계획 생성
- 생성 중 상태 표시
- 생성 실패 메시지 표시
- 생성 성공 후 목록 갱신 및 생성된 계획 아코디언 펼침
- 상세 보기 클릭 시 목록 안에서 아코디언으로 상세 조회
- 한 번에 하나의 훈련 계획 상세만 펼침
- 직접 URL 접근용 `/training-plans/:id` 상세 route 유지
- 대시보드 이동 및 로그아웃 버튼

현재 남은 UX/설계 이슈:

- 홈 화면은 로그인 진입만 제공하며, 신규 사용자를 위한 회원가입 흐름이 없다.
- 회원가입 이후 훈련 계획을 생성하기 전에 사용자의 기본 운동 능력/러너 프로필을 입력받는 onboarding 흐름이 필요하다.
- RunningRecord, Dashboard, TrainingPlan 기능은 구현되어 있지만 "기록 입력 → 상태 확인 → 계획 생성 → 훈련 이행 → 실제 기록 반영" 흐름이 아직 하나의 시나리오로 연결되지 않는다.
- TrainingPlan 생성 시 같은 기간에 중복 계획이 만들어지지 않도록 기간 겹침 검증이 필요하다.
- 생성된 TrainingPlanItem에 대해 완료/건너뜀 등 이행 여부와 실제 수행 기록을 관리할 수 있어야 한다.
- pagination 도입 후 Dashboard 통계가 기본 목록 응답 20개 기준으로 계산될 수 있다.
- RunningRecord / TrainingPlan 목록 UI에는 아직 다음/이전 페이지 조작이 없다.
- 통계 전용 API 또는 프론트의 전체 데이터 fetch 전략을 정해야 한다.
- 계획 생성 시작일은 아직 오늘 기준 7일이며, 향후 local LLM 추천 구조와 함께 재검토한다.

## Target User Flow

RunPilot은 기능별 CRUD 화면보다 다음 사용자 흐름을 우선한다.

```text
홈
→ 회원가입
→ 기본 운동 능력 입력
→ 대시보드 진입
→ 러닝 기록 입력 또는 훈련 계획 생성
→ 훈련 계획 확인
→ 훈련 이행 여부/실제 기록 입력
→ 대시보드와 다음 계획 생성에 반영
```

### Signup / Onboarding

- 홈 화면에서 로그인뿐 아니라 회원가입 진입을 제공한다.
- 공개 테스트용 Users API를 단순 노출하지 않고, 의도된 인증 흐름으로 `POST /auth/signup` 형태를 검토한다.
- 회원가입 후 기본 운동 능력 입력 화면으로 연결한다.
- 기본 운동 능력은 훈련 계획 생성을 위한 RunnerProfile 성격의 데이터로 관리한다.

초기 RunnerProfile 후보:

```text
experienceLevel
weeklyRunCount
comfortableDistanceKm
recentAveragePaceSecPerKm
preferredTrainingDays
injuryNote
```

MVP에서는 `experienceLevel`, `weeklyRunCount`, `comfortableDistanceKm`, `preferredTrainingDays` 정도로 시작하고, 실제 러닝 기록이 쌓이면 RunningRecord 기반 지표를 함께 반영한다.

### Training Plan Generation

- 훈련 계획 생성 시 목표뿐 아니라 시작일과 기간을 명시적으로 입력받는 방향을 검토한다.
- 생성 기준은 RunnerProfile과 최근 RunningRecord를 함께 사용한다.
- 새 계획 기간이 기존 계획 기간과 겹치면 생성하지 않는다.
- 기간 겹침 조건:

```text
existing.startDate <= newEndDate
AND existing.endDate >= newStartDate
```

- 중복 계획이 있으면 `409 Conflict` 성격의 에러를 반환하고, 프론트에서는 기존 계획 보기 또는 다른 시작일 선택을 유도한다.

### Training Execution

- TrainingPlanItem은 단순 조회 대상이 아니라 사용자가 이행 상태를 관리하는 대상이 되어야 한다.
- MVP에서는 TrainingPlanItem에 다음 상태를 우선 추가하는 방향을 검토한다.

```text
PLANNED
COMPLETED
SKIPPED
```

- 완료 처리 시 실제 거리, 실제 시간, 메모를 입력할 수 있게 한다.
- 실제 수행 기록은 RunningRecord와 연결하거나 RunningRecord 생성 흐름으로 이어지게 한다.
- Dashboard에는 향후 오늘의 훈련, 이번 주 이행률, 최근 완료 훈련을 표시한다.

## Backend Status

현재 공개 API:

```http
GET /
GET /health
POST /auth/signup
POST /auth/login
```

현재 보호 API:

```http
GET /auth/me

GET /runner-profile/me
PUT /runner-profile/me

POST /running-records
GET /running-records/me?page=1&limit=20
PATCH /running-records/:id
DELETE /running-records/:id

POST /training-plans/generate
GET /training-plans/me?page=1&limit=20
GET /training-plans/:id
```

## Current Priorities

### 1. 사용자 진입 흐름 정리

- 홈 화면에 회원가입 진입 추가
- `POST /auth/signup` API 기반 프론트 회원가입 흐름 연결 완료
- 회원가입 후 로그인/자동 로그인/온보딩 이동 흐름 결정
- 기존 `UsersModule` 공개 라우트는 의도 없이 노출하지 않는다.

### 2. RunnerProfile / 온보딩

- 기본 운동 능력 입력 화면 추가
- `GET /runner-profile/me`, `PUT /runner-profile/me` API 기반 프로필 조회/저장
- 훈련 계획 생성 전 프로필 미입력 사용자를 온보딩으로 유도하는 대시보드/계획 생성 분기 정리
- RunnerProfile DTO / mapper / ownership check 적용

### 3. 훈련 계획 생성 시나리오 개선

- 목표, 시작일, 기간 기반 TrainingPlan 생성 UX 정리
- RunnerProfile과 최근 RunningRecord를 함께 사용하는 rule-based 생성 로직 개선
- 같은 기간에 중복 계획이 생성되지 않도록 서버에서 기간 겹침 검증
- 중복 계획 발생 시 프론트에서 기존 계획 보기 또는 다른 시작일 선택 유도

### 4. 훈련 이행 관리

- TrainingPlanItem 이행 상태 추가
- 완료/건너뜀 처리 API 검토
- 완료 시 실제 거리/시간/메모 입력
- 실제 수행 기록과 RunningRecord 연결 또는 생성 흐름 정리
- Dashboard에 오늘의 훈련/이번 주 이행률 반영 검토

### 5. 테스트/데모 데이터

- demo user seed
- RunnerProfile seed
- 최근 7일 / 이번 달 / 이전 달 러닝 기록 seed
- pagination 확인용 20개 초과 러닝 기록 seed
- 훈련 계획 seed 또는 생성 시나리오 정리
- 훈련 이행 상태 seed

### 6. Dashboard 통계 정확도

- 통계 전용 API 검토
- pagination과 Dashboard 집계 책임 분리
- 월간/최근 7일/pace 추세의 데이터 범위 명확화

### 7. API 완성도 향상

- pagination UI 연동
- Prisma 예외 처리 확장
- 공통 에러 메시지 정리
- Swagger response schema 고도화

### 8. 문서/포트폴리오 정리

- README와 docs 최신 상태 유지
- 스크린샷/시연 플로우 추가
- 배포 전략 정리

## Current Direction

RunPilot은 단순 CRUD 프로젝트보다 다음 경험을 목표로 한다.

- 인증/인가가 있는 실제 서비스 형태
- 사용자별 데이터 보호
- 기록 기반 도메인 로직
- 프론트와 API가 분리된 실무형 구조
- Rule-Based 로직에서 분석/AI 추천으로 확장 가능한 기반
