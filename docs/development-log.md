# Development Log

## Current Snapshot

RunPilot은 인증/인가, 러닝 기록 CRUD, Dashboard 분석 MVP, Rule-Based 훈련 계획 생성/목록 아코디언 상세까지 연결된 상태입니다.

## Recent Changes

- RunningRecord 생성/수정 시 `paceSecPerKm` 계산 추가
- RunningRecord 응답 DTO와 mapper에 `paceSecPerKm` 추가
- RunningRecord 프론트 표시를 API 응답 pace 기반으로 변경
- TrainingPlan 상세 페이지를 실제 API 응답 필드에 맞게 수정
- API spec 최신화
- Dashboard MVP 추가
- format utility 분리
- TrainingPlan 생성 UX 개선
- 공개 테스트용 Users API 라우트 제거
- README 최신화
- RunningRecord 생성/수정/삭제 UX 개선
- 공통 `StatusMessage` 추가
- RunningRecord API utility 분리
- Dashboard loading/empty 상태 개선
- Dashboard 최근 7일 거리 차트, 이번 달 거리, 최근 pace 추세 추가
- RunningRecord / TrainingPlan 목록 pagination 도입
- TrainingPlan API utility 분리
- 홈 화면을 로그인 진입 중심으로 정리
- 로그아웃 기능 및 보호 페이지 로그아웃 버튼 추가
- TrainingPlan 상세 보기를 목록 내 아코디언으로 변경
- 주요 내부 이동을 Next `Link` 기반으로 변경

## Verification Notes

- `pnpm -r lint` 기준 Web/API TypeScript check는 통과한다.
- 최근 검증에서 `pnpm build:api`, `pnpm build:web`도 통과했다.
- 이전에 기록된 API `@runpilot/shared` workspace module resolution 문제는 현재 재현되지 않는다.
- Windows 환경에서 pnpm/Corepack과 node_modules 권한 문제가 있어 일부 검증은 승인 권한으로 수행했다.

## Known Follow-ups

- demo user / seed data 추가
- pagination UI 추가
- Dashboard 통계가 paginated 목록 20개 기준으로 계산될 수 있는 문제 해결
- 통계 전용 API 검토
- TrainingPlan 생성 시작일/기간 정책은 local LLM 연동 방향과 함께 재검토
- docs에 시연 이미지 추가
