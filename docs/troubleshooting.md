# Troubleshooting

## Git dubious ownership

Windows 환경에서 저장소 소유자와 현재 실행 사용자가 다르면 Git이 저장소를 신뢰하지 않을 수 있다.

```bash
git config --global --add safe.directory C:/Lab/project/runpliot
```

## pnpm is not recognized

`pnpm`이 PATH에 없으면 Corepack 또는 로컬 실행 파일을 확인한다.

```bash
corepack pnpm --version
```

일반 cmd 기준으로 seed를 실행할 때도 Corepack을 사용할 수 있다.

```bat
cd C:\Lab\project\runpliot
corepack pnpm db:seed
```

이 환경에서는 Corepack 네트워크/서명 검증 문제가 발생할 수 있었다. `node_modules`가 이미 설치되어 있으면 `.bin` 아래 실행 파일을 직접 사용할 수 있다.

```powershell
.\apps\web\node_modules\.bin\tsc.CMD -p apps\web\tsconfig.json --noEmit
```

## pnpm-managed node_modules permission error

Windows sandbox 환경에서 `node_modules/.pnpm` 하위 파일 읽기가 `EPERM`으로 실패할 수 있다.

증상:

```text
EPERM: operation not permitted, open '...node_modules\.pnpm\...'
```

해결:

- 로컬에서는 일반 터미널에서 다시 실행한다.
- Codex 환경에서는 승인 권한으로 타입 검사 또는 dev server 실행이 필요할 수 있다.

## API TypeScript check fails with @runpilot/shared

현재 API 타입 검사에서 다음 오류가 발생할 수 있다.

```text
Cannot find module '@runpilot/shared'
```

확인할 항목:

- `apps/api/node_modules/@runpilot/shared` workspace link 존재 여부
- `packages/shared/package.json`의 `name`, `main`, `types`
- API `tsconfig.json`의 path/moduleResolution 설정
- 루트 workspace install 상태

## Next dev server on Windows

PowerShell `Start-Process`에서 `Path`와 `PATH` 환경 변수가 동시에 존재하면 중복 키 오류가 날 수 있다.

우회:

```powershell
[Environment]::SetEnvironmentVariable('PATH', $null, 'Process')
```

그 후 dev server를 다시 실행한다.

## Render cold start vs Supabase delay

배포 환경에서 첫 API 호출이 특히 느리면 Render Web Service cold start 가능성이 크다.

확인 기준:

- 첫 요청만 오래 걸리고 이후 빨라지면 Render cold start 가능성이 높다.
- 탭 이동마다 API가 꾸준히 느리면 API 호출 수, Render와 Supabase 리전 거리, DB connection/pooling을 확인한다.
- Dashboard는 현재 여러 API를 병렬 호출한다.
  - `GET /running-records/me`
  - `GET /training-plans/today`
  - `GET /training-plans/me`

## Today training still shows record button

오늘 훈련 날짜에 RunningRecord를 입력했는데도 `오늘 훈련 기록하기` 버튼이 보이면 다음을 확인한다.

- Render API가 `GET /training-plans/today`와 `actualRecord` 계산 로직이 포함된 최신 커밋으로 배포되었는지 확인한다.
- RunningRecord `runDate`와 TrainingPlanItem `planDate`가 같은 날짜인지 확인한다.
- 현재 프론트 Dashboard는 API `actualRecord`가 비어 있어도 이미 가져온 RunningRecord 목록에서 같은 날짜 기록을 찾아 완료 상태로 보정한다.
