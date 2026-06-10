# Roadmap

## Done

- pnpm workspace 기반 monorepo
- NestJS API 기본 구조
- Next.js App Router 프론트엔드
- PostgreSQL Docker 환경
- Prisma schema / migration / generated client
- JWT login / `/auth/me`
- ProtectedRoute
- 로그아웃
- 홈 화면 인증 상태별 진입 흐름
- RunningRecord CRUD
- `paceSecPerKm` 계산 및 응답
- TrainingPlan Rule-Based 생성
- TrainingPlan 목록/상세 UI
- TrainingPlan 목록 아코디언 상세 보기
- Dashboard MVP
- Dashboard loading/empty 상태 개선
- Dashboard 최근 7일 거리 차트
- Dashboard 이번 달 거리
- Dashboard 최근 pace 추세
- TrainingPlan 생성 UX 개선
- Users test API 라우트 제거
- RunningRecord pagination
- TrainingPlan pagination
- API spec / README 최신화

## Next

### Test / Demo Data

- demo user seed
- RunningRecord seed data
  - 최근 7일 데이터
  - 이번 달 데이터
  - 이전 달 데이터
  - pagination 확인용 20개 초과 데이터
- TrainingPlan 생성/상세 시연 데이터
- 로컬 테스트 시나리오 문서화

### Frontend UX

- RunningRecord / TrainingPlan pagination UI
- 보호 페이지 공통 레이아웃 검토
- AuthProvider 초기화 중 전체 앱 `loading...` 대체 방식 개선
- 내부 링크/라우팅 UX 추가 점검

### Analytics

- Dashboard 통계 전용 API 검토
- pagination과 Dashboard 집계 정확도 분리
- 최근 기록 기반 훈련 강도 판단

### API

- Prisma error handling 정리
- 통계 전용 API 도입 여부 검토
- Swagger response schema 고도화

### Portfolio

- README screenshot 추가
- demo account/seed data 정리
- 배포 방식 정리
- 시연 플로우 문서화

## Later

- 개인화 추천 로직 고도화
- 과훈련 감지
- AI/LLM 기반 훈련 계획 추천
- 훈련 계획 시작일/기간 정책 재설계
- 배포 환경 구성
