# Development Log

## Current Snapshot

RunPilot은 러닝 기록 CRUD, Dashboard MVP, Rule-Based 훈련 계획 생성까지 연결된 상태입니다.

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

## Verification Notes

- `pnpm -r lint` 기준 Web/API TypeScript check는 통과한다.
- 이전에 기록된 API `@runpilot/shared` workspace module resolution 문제는 현재 재현되지 않는다.
- Windows 환경에서 pnpm/Corepack과 node_modules 권한 문제가 있어 일부 검증은 승인 권한으로 수행했다.

## Known Follow-ups

- RunningRecord UX 개선
- Dashboard 차트 추가
- docs에 시연 이미지 추가
