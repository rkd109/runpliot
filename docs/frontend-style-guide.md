# Frontend Style Guide

## UI Direction

RunPilot Frontend는 Tailwind CSS 기반 다크 테마 러닝 앱 스타일을 유지한다.

## Base Style

- Background: `bg-slate-950`
- Card: `bg-slate-900 border border-slate-800 rounded-lg`
- Primary Color: `blue-500 / blue-400`
- Text Primary: `text-white`
- Text Secondary: `text-slate-400`
- Input: `bg-slate-950 border border-slate-700 rounded-lg`
- Button: `rounded-lg` 또는 pill navigation은 `rounded-full`

## Layout

- Page wrapper: `min-h-screen bg-slate-950 px-5 pt-5 text-white sm:px-6 sm:pt-6`
- Main content width: `mx-auto max-w-4xl`
- Dashboard content width: `mx-auto max-w-5xl`
- Card spacing: `space-y-4`
- Form card: `rounded-lg border border-slate-800 bg-slate-900 p-6`

## Typography

- Protected page title: 현재 GNB 활성 상태로 대체하며 별도 `h1`은 노출하지 않는다.
- Section title: `text-xl font-bold`
- Description: `text-slate-400`
- Small label: `text-sm font-semibold text-blue-400`

## Interaction

- hover transition 사용
- hover:border-blue-500 사용
- 버튼 hover brightness 유지

## Spacing Rules

- Card 내부 기본 padding: `p-5` 또는 `p-6`
- Section 간격: `mb-8`
- Input 간격: `gap-4`

## Empty State

```text
border-dashed
text-center
설명 문구 포함
```

## UI Pattern

- 보호 페이지 상단에는 `RunPilot` label + 로그인 사용자 인사/로그아웃 + pill GNB + 설명 문구
- GNB는 모바일에서도 한 줄 유지가 우선이며, 현재 라벨은 `대시보드 / 기록 / 계획 / 프로필`
- Footer는 `footer > div > p` 구조로 분리하고, footer 위 여백과 내부 여백을 별도로 제어한다.
- 주요 데이터는 카드 형태로 표시
- Empty state는 dashed border 카드 사용
- 입력 폼은 카드 형태로 상단에 배치
- 삭제 버튼은 red 계열
- 주요 액션 버튼은 blue 계열

## Current Pages

- `/dashboard`: 요약 카드 + 오늘 훈련 + 최근 7일/pace 추세 + 최근 러닝 기록 + 이행률/훈련 계획 CTA
- `/running-records`: 입력 폼 + 기록 카드 리스트 + inline edit
- `/training-plans`: 목표 입력 폼 + 계획 카드 리스트
- `/training-plans/[id]`: 계획 헤더 + TrainingPlanItem 카드 리스트
- `/runner-profile/setup`: 러너 프로필 입력 폼

## Shared Formatting

표시용 formatting은 `apps/web/src/utils/format.ts`의 함수를 우선 사용한다.

- `formatDate`
- `formatDistance`
- `formatDuration`
- `formatPace`
