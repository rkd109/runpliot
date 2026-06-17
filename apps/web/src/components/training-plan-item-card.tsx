import { formatDate, formatDistance, formatDuration, formatPace, TrainingPlanItem } from '@utils';

const workoutTypeLabels: Record<string, string> = {
  REST: '휴식',
  EASY_RUN: '이지런',
  TEMPO_RUN: '템포런',
  LONG_RUN: '롱런',
  RECOVERY_RUN: '회복주',
};

const executionStatusLabels: Record<string, string> = {
  PLANNED: '예정',
  COMPLETED: '완료',
  MISSED: '놓친 훈련',
};

const executionStatusClassNames: Record<string, string> = {
  PLANNED: 'border-blue-400/30 bg-blue-500/10 text-blue-200',
  COMPLETED: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  MISSED: 'border-red-400/30 bg-red-500/10 text-red-200',
};

type TrainingPlanItemCardProps = {
  item: TrainingPlanItem;
  variant?: 'nested' | 'standalone';
};

export const TrainingPlanItemCard = ({ item, variant = 'standalone' }: TrainingPlanItemCardProps) => {
  const targetPace = item.targetPaceSecPerKm === null ? null : formatPace(item.targetPaceSecPerKm);
  const actualRecord = item.actualRecord;
  const statusClassName =
    executionStatusClassNames[item.executionStatus] ?? 'border-slate-700 bg-slate-800 text-slate-200';
  const containerClassName =
    variant === 'nested'
      ? 'rounded-lg bg-slate-950 p-4'
      : 'rounded-lg border border-slate-800 bg-slate-900 p-5';

  return (
    <div className={containerClassName}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-sm font-semibold text-blue-400">
          Day {item.sortOrder} · {formatDate(item.planDate)}
        </p>
        <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClassName}`}>
          {executionStatusLabels[item.executionStatus] ?? item.executionStatus}
        </span>
      </div>

      <h3 className="mt-2 text-lg font-bold">
        {workoutTypeLabels[item.workoutType] ?? item.workoutType}
      </h3>

      {item.description && <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>}

      <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
        <span>목표 거리: {item.distanceKm === null ? '-' : formatDistance(item.distanceKm)}</span>
        {targetPace && <span>목표 페이스: {targetPace}</span>}
      </div>

      {actualRecord && (
        <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
          <p className="font-semibold">실제 기록</p>
          <p className="mt-1">
            {formatDistance(actualRecord.distanceKm)} · {formatDuration(actualRecord.durationSeconds)} ·{' '}
            {formatPace(actualRecord.paceSecPerKm)}
          </p>
        </div>
      )}
    </div>
  );
};
