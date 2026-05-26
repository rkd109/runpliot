# Frontend Style Guide

## UI Direction

RunPilot Frontend는 Tailwind CSS 기반 다크 테마 러닝 앱 스타일을 유지한다.

## Base Style

- Background: `bg-slate-950`
- Card: `bg-slate-900 border border-slate-800 rounded-2xl`
- Primary Color: `blue-500 / blue-400`
- Text Primary: `text-white`
- Text Secondary: `text-slate-400`
- Input: `bg-slate-950 border border-slate-700 rounded-xl`
- Button: `rounded-xl font-semibold`

## Layout

- Page wrapper: `min-h-screen bg-slate-950 px-6 py-10 text-white`
- Main content width: `mx-auto max-w-4xl`
- Card spacing: `space-y-4`
- Form card: `rounded-2xl border border-slate-800 bg-slate-900 p-6`

## Typography

- Main title: `text-4xl font-bold`
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

- 상단에는 `RunPilot` label + 큰 제목 + 설명 문구
- 주요 데이터는 카드 형태로 표시
- Empty state는 dashed border 카드 사용
- 입력 폼은 카드 형태로 상단에 배치
- 삭제 버튼은 red 계열
- 주요 액션 버튼은 blue 계열