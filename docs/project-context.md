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
/dashboard         Running summary dashboard
/running-records   RunningRecord CRUD
/training-plans    TrainingPlan list/generate
/training-plans/:id TrainingPlan direct detail route
```

`/`는 비로그인 상태에서 로그인 버튼만 노출하고, 로그인 상태에서는 `/dashboard`로 이동한다.

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

- pagination 도입 후 Dashboard 통계가 기본 목록 응답 20개 기준으로 계산될 수 있다.
- RunningRecord / TrainingPlan 목록 UI에는 아직 다음/이전 페이지 조작이 없다.
- 통계 전용 API 또는 프론트의 전체 데이터 fetch 전략을 정해야 한다.
- 계획 생성 시작일은 아직 오늘 기준 7일이며, 향후 local LLM 추천 구조와 함께 재검토한다.

## Backend Status

현재 공개 API:

```http
GET /
GET /health
POST /auth/login
```

현재 보호 API:

```http
GET /auth/me

POST /running-records
GET /running-records/me?page=1&limit=20
PATCH /running-records/:id
DELETE /running-records/:id

POST /training-plans/generate
GET /training-plans/me?page=1&limit=20
GET /training-plans/:id
```

## Current Priorities

### 1. 테스트/데모 데이터

- demo user seed
- 최근 7일 / 이번 달 / 이전 달 러닝 기록 seed
- pagination 확인용 20개 초과 러닝 기록 seed
- 훈련 계획 seed 또는 생성 시나리오 정리

### 2. Dashboard 통계 정확도

- 통계 전용 API 검토
- pagination과 Dashboard 집계 책임 분리
- 월간/최근 7일/pace 추세의 데이터 범위 명확화

### 3. API 완성도 향상

- pagination UI 연동
- Prisma 예외 처리 확장
- 공통 에러 메시지 정리
- Swagger response schema 고도화

### 4. 문서/포트폴리오 정리

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
