# Portfolio Summary

RunPilot은 러닝 기록을 저장하고, 기록을 기반으로 현재 러닝 상태와 훈련 계획을 제공하는 포트폴리오 프로젝트입니다.

## Highlights

- pnpm workspace 기반 TypeScript 모노레포
- Next.js App Router 프론트엔드
- NestJS 백엔드 API
- PostgreSQL 16 + Prisma ORM
- JWT 기반 인증 흐름
- 사용자별 RunningRecord / TrainingPlan 데이터 보호
- Response DTO + mapper 기반 응답 분리
- Global Response Interceptor / HttpExceptionFilter
- RunningRecord pace 계산 및 응답 제공
- Dashboard 분석 MVP
- 최근 7일 거리 차트 / 이번 달 거리 / pace 추세
- Rule-Based TrainingPlan 생성
- TrainingPlan 목록 아코디언 상세 UX
- RunningRecord / TrainingPlan pagination
- Swagger 기반 API 문서화

## Portfolio Value

- 단순 CRUD를 넘어 인증, 인가, 데이터 보호, 도메인 로직 흐름을 포함한다.
- 러닝 기록 → 요약 지표 → 훈련 계획 생성으로 이어지는 서비스 흐름이 있다.
- AI/LLM 추천으로 확장하기 전 Rule-Based 도메인 로직을 먼저 구축했다.
- 프론트와 백엔드를 분리해 API 기반 애플리케이션 구조를 경험한다.

## Current Demo Flow

```text
Login
→ Dashboard 확인
→ RunningRecord 생성/수정
→ TrainingPlan 목표 입력 후 생성
→ TrainingPlan 목록에서 아코디언 상세 확인
```

## Next Steps

- demo account / seed data 추가
- Dashboard 통계 전용 API 검토
- RunningRecord / TrainingPlan pagination UI 추가
- Prisma 예외 처리 보강
- README/docs에 스크린샷과 시연 가이드 추가
