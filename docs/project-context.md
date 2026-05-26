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
## Frontend Style Context

Frontend UI 스타일은 `docs/frontend-style-guide.md` 기준으로 유지한다.

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
- Response DTO / mapper 적용
- Global Response Interceptor 적용
- Swagger Response DTO 적용
- Global HttpExceptionFilter 적용

- Next.js Frontend 초기 구성
- Axios API Client 구성
- Axios Interceptor 적용
- Context API 기반 인증 상태 관리
- 로그인 유지 처리
- ProtectedRoute 기반 보호 페이지
- RunningRecord Frontend CRUD
- TrainingPlan Frontend 조회/생성
- TrainingPlan Detail 화면 구현


## Current Frontend Status

현재 Frontend MVP 구현 완료:

- 로그인 화면
- JWT 기반 인증 흐름
- sessionStorage accessToken 저장
- Axios Interceptor 기반 Authorization Header 처리
- 로그인 유지 처리
- Context API 기반 인증 상태 관리
- ProtectedRoute 기반 보호 페이지

현재 RunningRecord Frontend 기능:

- 러닝 기록 조회
- 러닝 기록 생성
- 러닝 기록 수정
- 러닝 기록 삭제

현재 TrainingPlan Frontend 기능:

- TrainingPlan 목록 조회
- TrainingPlan 생성
- TrainingPlan 상세 조회

현재 Frontend 스타일:

- Tailwind CSS 기반 다크 테마 UI
- 카드 기반 러닝 앱 스타일

## Next Priorities

### 1. API 완성도 향상

예정:

- pagination
- Prisma exception handling 확장
- Swagger 응답 문서 고도화
- logging/interceptor 확장

### 2. Dashboard / 분석 기능

예정:

- 총 러닝 거리
- 평균 pace
- 러닝 횟수
- 최근 러닝 기록
- 최근 7일 거리 분석
- 월간 러닝 거리
- 과훈련 감지
- 추천 로직 고도화

### 3. UI/UX 개선

예정:

- loading skeleton
- error handling UI
- form validation 강화
- 차트 기반 시각화

## Current Direction

현재 RunPilot은 단순 CRUD 프로젝트보다 다음 경험을 목표로 합니다.

- 실제 서비스 형태의 포트폴리오 구축
- 러닝 데이터 기반 도메인 분석 경험
- Rule-Based → AI/LLM 확장 구조 준비

현재 목표:

> "실제 서비스 형태의 포트폴리오 구축"
