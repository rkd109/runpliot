'use client';

import { ProtectedPageLayout, StatusMessage } from '@components';
import { useAuth } from '@contexts';
import Link from 'next/link';
import {
  formatDate,
  formatDistance,
  formatDuration,
  formatPace,
  getApiErrorMessage,
  getMyRunningRecords,
  getMyTrainingPlans,
  getTodayTraining,
  RunningRecord,
  TodayTraining,
  TrainingPlanDetail,
} from '@utils';
import { useEffect, useMemo, useState } from 'react';

type DashboardStats = {
  totalDistanceKm: number;
  recordCount: number;
  averagePaceSecPerKm: number | null;
  monthlyDistanceKm: number;
};

type DailyDistance = {
  date: string;
  label: string;
  distanceKm: number;
};

type PaceTrendItem = {
  id: number;
  label: string;
  paceSecPerKm: number;
};

type WeeklyTrainingSummary = {
  totalCount: number;
  completedCount: number;
  missedCount: number;
  plannedCount: number;
};

const workoutTypeLabels: Record<string, string> = {
  REST: '휴식',
  EASY_RUN: '이지런',
  TEMPO_RUN: '템포런',
  LONG_RUN: '롱런',
  RECOVERY_RUN: '회복주',
};

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8" aria-label="대시보드 로딩 중">
      <div className="grid gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-32 rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="h-4 w-20 rounded bg-slate-800" />
            <div className="mt-5 h-8 w-28 rounded bg-slate-800" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-28 rounded-lg border border-slate-800 bg-slate-900 p-5">
              <div className="h-4 w-28 rounded bg-slate-800" />
              <div className="mt-4 h-7 w-36 rounded bg-slate-800" />
            </div>
          ))}
        </div>

        <div className="h-64 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="h-4 w-24 rounded bg-slate-800" />
          <div className="mt-4 h-6 w-36 rounded bg-slate-800" />
          <div className="mt-6 space-y-2">
            <div className="h-3 rounded bg-slate-800" />
            <div className="h-3 w-5/6 rounded bg-slate-800" />
            <div className="h-3 w-3/4 rounded bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
};

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getStartOfWeek = (date: Date) => {
  const startDate = new Date(date);
  const dayIndex = startDate.getDay();
  const daysFromMonday = (dayIndex + 6) % 7;

  startDate.setDate(startDate.getDate() - daysFromMonday);
  startDate.setHours(0, 0, 0, 0);

  return startDate;
};

const getEndOfWeek = (date: Date) => {
  const endDate = getStartOfWeek(date);

  endDate.setDate(endDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return endDate;
};

const getWeeklyTrainingSummary = (plans: TrainingPlanDetail[]): WeeklyTrainingSummary => {
  const weekStart = getStartOfWeek(new Date());
  const weekEnd = getEndOfWeek(new Date());
  const weeklyItems = plans.flatMap((plan) =>
    plan.items.filter((item) => {
      const planDate = new Date(item.planDate);

      return planDate >= weekStart && planDate <= weekEnd;
    }),
  );

  return weeklyItems.reduce(
    (summary, item) => ({
      totalCount: summary.totalCount + 1,
      completedCount: summary.completedCount + (item.executionStatus === 'COMPLETED' ? 1 : 0),
      missedCount: summary.missedCount + (item.executionStatus === 'MISSED' ? 1 : 0),
      plannedCount: summary.plannedCount + (item.executionStatus === 'PLANNED' ? 1 : 0),
    }),
    {
      totalCount: 0,
      completedCount: 0,
      missedCount: 0,
      plannedCount: 0,
    },
  );
};

const getTodayTrainingRecordUrl = (todayTraining: TodayTraining) => {
  const params = new URLSearchParams({
    source: 'training',
    planId: String(todayTraining.planId),
    itemId: String(todayTraining.item.id),
    workoutType: todayTraining.item.workoutType,
    runDate: getDateKey(new Date(todayTraining.item.planDate)),
  });

  if (todayTraining.item.distanceKm !== null) {
    params.set('distanceKm', String(todayTraining.item.distanceKm));
  }

  if (todayTraining.item.description) {
    params.set('memo', todayTraining.item.description);
  }

  return `/running-records?${params.toString()}`;
};

const getSevenDayDistances = (records: RunningRecord[]) => {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index): DailyDistance => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    date.setHours(0, 0, 0, 0);

    const dateKey = getDateKey(date);
    const distanceKm = records
      .filter((record) => getDateKey(new Date(record.runDate)) === dateKey)
      .reduce((sum, record) => sum + record.distanceKm, 0);

    return {
      date: dateKey,
      label: date.toLocaleDateString('ko-KR', { weekday: 'short' }),
      distanceKm,
    };
  });
};

const getMonthlyDistance = (records: RunningRecord[]) => {
  const now = new Date();

  return records
    .filter((record) => {
      const runDate = new Date(record.runDate);

      return runDate.getFullYear() === now.getFullYear() && runDate.getMonth() === now.getMonth();
    })
    .reduce((sum, record) => sum + record.distanceKm, 0);
};

const getPaceTrendItems = (records: RunningRecord[]) => {
  return [...records]
    .sort((firstRecord, secondRecord) => new Date(firstRecord.runDate).getTime() - new Date(secondRecord.runDate).getTime())
    .slice(-5)
    .map((record): PaceTrendItem => {
      const date = new Date(record.runDate);

      return {
        id: record.id,
        label: date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }),
        paceSecPerKm: record.paceSecPerKm,
      };
    });
};

const SevenDayDistanceChart = ({ data }: { data: DailyDistance[] }) => {
  const maxDistanceKm = Math.max(...data.map((item) => item.distanceKm), 1);

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-400">7-Day Distance</p>
          <h2 className="mt-2 text-xl font-bold">최근 7일 거리</h2>
        </div>
        <p className="text-sm text-slate-400">일별 러닝 거리 합계</p>
      </div>

      <div className="mt-6 grid h-48 grid-cols-7 items-end gap-2">
        {data.map((item) => {
          const hasDistance = item.distanceKm > 0;
          const barHeight = item.distanceKm === 0 ? 8 : Math.max((item.distanceKm / maxDistanceKm) * 100, 12);

          return (
            <div key={item.date} className="flex h-full min-w-0 flex-col justify-end">
              <div className="mb-2 h-4 truncate text-center text-xs text-slate-400">
                {hasDistance ? formatDistance(item.distanceKm) : ''}
              </div>
              <div
                className={hasDistance ? 'rounded-t bg-blue-500' : 'rounded-t border border-dashed border-slate-700 bg-slate-900'}
                style={{ height: `${barHeight}%` }}
                aria-label={hasDistance ? `${item.date} ${formatDistance(item.distanceKm)}` : `${item.date} 기록 없음`}
              />
              <div className={hasDistance ? 'mt-2 text-center text-xs text-slate-500' : 'mt-2 text-center text-xs text-slate-700'}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const PaceTrend = ({ items }: { items: PaceTrendItem[] }) => {
  if (items.length === 0) {
    return (
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm font-semibold text-blue-400">Pace Trend</p>
        <h2 className="mt-2 text-xl font-bold">최근 페이스 추세</h2>
        <p className="mt-4 text-sm text-slate-400">러닝 기록을 추가하면 최근 페이스 변화가 표시됩니다.</p>
      </section>
    );
  }

  const fastestPace = Math.min(...items.map((item) => item.paceSecPerKm));
  const slowestPace = Math.max(...items.map((item) => item.paceSecPerKm));
  const paceRange = Math.max(slowestPace - fastestPace, 1);
  const latestPace = items[items.length - 1]?.paceSecPerKm ?? null;
  const previousPace = items[items.length - 2]?.paceSecPerKm ?? null;
  const trendMessage =
    latestPace === null || previousPace === null
      ? '페이스 비교를 위해 기록을 하나 더 추가해보세요.'
      : latestPace < previousPace
        ? '최근 기록의 페이스가 이전보다 빨라졌습니다.'
        : latestPace > previousPace
          ? '최근 기록의 페이스가 이전보다 느려졌습니다.'
          : '최근 페이스가 이전 기록과 같습니다.';

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm font-semibold text-blue-400">Pace Trend</p>
      <h2 className="mt-2 text-xl font-bold">최근 페이스 추세</h2>
      <p className="mt-3 text-sm text-slate-400">{trendMessage}</p>

      <div className="mt-5 space-y-3">
        {items.map((item) => {
          const progress = 100 - ((item.paceSecPerKm - fastestPace) / paceRange) * 70;

          return (
            <div key={item.id}>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                <span>{item.label}</span>
                <span>{formatPace(item.paceSecPerKm)}</span>
              </div>
              <div className="h-2 rounded bg-slate-800">
                <div className="h-2 rounded bg-emerald-400" style={{ width: `${progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const EmptyDashboard = () => {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
      <p className="text-lg font-semibold">아직 러닝 기록이 없습니다</p>
      <p className="mt-2 text-sm text-slate-400">
        첫 기록을 추가하면 총 거리, 평균 페이스, 최근 7일 거리 요약이 채워집니다.
      </p>
      <Link
        href="/running-records"
        className="mt-6 inline-flex rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400"
      >
        첫 기록 추가
      </Link>
    </div>
  );
};

const getActualRecordForPlanDate = (records: RunningRecord[], planDate: string) => {
  const planDateKey = getDateKey(new Date(planDate));
  const sameDayRecords = records.filter((record) => getDateKey(new Date(record.runDate)) === planDateKey);

  if (sameDayRecords.length === 0) {
    return null;
  }

  return sameDayRecords.reduce((longestRecord, record) =>
    record.distanceKm > longestRecord.distanceKm ? record : longestRecord,
  );
};

const TodayTrainingCard = ({
  records,
  todayTraining,
}: {
  records: RunningRecord[];
  todayTraining: TodayTraining | null;
}) => {
  if (!todayTraining) {
    return (
      <aside className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm font-semibold text-emerald-400">Today</p>
        <h2 className="mt-2 text-xl font-bold">오늘 예정된 훈련이 없습니다</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          오늘은 기록을 쉬어가거나, 자유 러닝을 추가해 컨디션을 남겨둘 수 있습니다.
        </p>
        <Link
          href="/running-records"
          className="mt-6 block rounded-lg border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:bg-slate-800"
        >
          러닝 기록 추가
        </Link>
      </aside>
    );
  }

  const item = todayTraining.item;
  const actualRecord = item.actualRecord ?? getActualRecordForPlanDate(records, item.planDate);
  const targetPace = item.targetPaceSecPerKm === null ? null : formatPace(item.targetPaceSecPerKm);
  const isCompleted = item.executionStatus === 'COMPLETED' || Boolean(actualRecord);
  const statusLabel =
    isCompleted
      ? '완료'
      : item.executionStatus === 'MISSED'
        ? '놓친 훈련'
        : '예정';

  return (
    <aside className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-400">Today</p>
          <h2 className="mt-2 text-xl font-bold">
            {isCompleted ? '오늘 러닝 완료' : (workoutTypeLabels[item.workoutType] ?? item.workoutType)}
          </h2>
        </div>
        <span className="rounded-full border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-300">
          {statusLabel}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-400">{todayTraining.title}</p>
      {item.description && <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>}

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-slate-950 p-3">
          <p className="text-slate-500">목표 거리</p>
          <p className="mt-1 font-semibold text-white">{item.distanceKm === null ? '-' : formatDistance(item.distanceKm)}</p>
        </div>
        <div className="rounded-lg bg-slate-950 p-3">
          <p className="text-slate-500">목표 페이스</p>
          <p className="mt-1 font-semibold text-white">{targetPace ?? '-'}</p>
        </div>
      </div>

      {actualRecord ? (
        <div className="mt-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
          <p className="font-semibold">실제 러닝 기록</p>
          <p className="mt-2">
            {formatDistance(actualRecord.distanceKm)} · {formatDuration(actualRecord.durationSeconds)} · {formatPace(actualRecord.paceSecPerKm)}
          </p>
        </div>
      ) : (
        <Link
          href={getTodayTrainingRecordUrl(todayTraining)}
          className="mt-6 block rounded-lg bg-emerald-500 px-5 py-3 text-center font-semibold text-slate-950 hover:bg-emerald-400"
        >
          오늘 훈련 기록하기
        </Link>
      )}
    </aside>
  );
};

const WeeklyTrainingSummaryCard = ({ summary }: { summary: WeeklyTrainingSummary }) => {
  const completionRate =
    summary.totalCount === 0 ? 0 : Math.round((summary.completedCount / summary.totalCount) * 100);

  return (
    <aside className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm font-semibold text-violet-300">This Week</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <h2 className="text-xl font-bold">이번 주 이행률</h2>
        <p className="text-3xl font-bold text-white">{completionRate}%</p>
      </div>

      <div className="mt-5 h-2 rounded bg-slate-800">
        <div className="h-2 rounded bg-violet-400" style={{ width: `${completionRate}%` }} />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-lg bg-slate-950 p-3">
          <p className="text-slate-500">완료</p>
          <p className="mt-1 font-semibold text-emerald-300">{summary.completedCount}</p>
        </div>
        <div className="rounded-lg bg-slate-950 p-3">
          <p className="text-slate-500">예정</p>
          <p className="mt-1 font-semibold text-blue-300">{summary.plannedCount}</p>
        </div>
        <div className="rounded-lg bg-slate-950 p-3">
          <p className="text-slate-500">놓침</p>
          <p className="mt-1 font-semibold text-red-300">{summary.missedCount}</p>
        </div>
      </div>

      {summary.totalCount === 0 && (
        <p className="mt-4 text-sm leading-6 text-slate-400">
          이번 주에 해당하는 훈련 계획이 아직 없습니다.
        </p>
      )}
    </aside>
  );
};

const TrainingPlanCta = ({ hasRecords }: { hasRecords: boolean }) => {
  return (
    <aside className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm font-semibold text-blue-400">Training Plan</p>
      <h2 className="mt-2 text-xl font-bold">다음 훈련 계획</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {hasRecords
          ? '러닝 기록을 기반으로 이번 주 훈련 계획을 생성하고 강도를 조절해보세요.'
          : '러닝 기록을 먼저 쌓으면 훈련 계획을 더 자연스럽게 생성할 수 있습니다.'}
      </p>

      <Link
        href={hasRecords ? '/training-plans' : '/running-records'}
        className="mt-6 block rounded-lg bg-blue-500 px-5 py-3 text-center font-semibold text-white hover:bg-blue-400"
      >
        {hasRecords ? '훈련 계획 보기' : '러닝 기록 추가'}
      </Link>
    </aside>
  );
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<RunningRecord[]>([]);
  const [todayTraining, setTodayTraining] = useState<TodayTraining | null>(null);
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlanDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setErrorMessage('');
        const [nextRecords, nextTodayTraining, nextTrainingPlans] = await Promise.all([
          getMyRunningRecords(),
          getTodayTraining(),
          getMyTrainingPlans(),
        ]);
        setRecords(nextRecords);
        setTodayTraining(nextTodayTraining);
        setTrainingPlans(nextTrainingPlans);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, '대시보드 데이터를 불러오지 못했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboard();
    }
  }, [user]);

  const stats = useMemo<DashboardStats>(() => {
    const totalDistanceKm = records.reduce((sum, record) => sum + record.distanceKm, 0);
    const totalDurationSeconds = records.reduce((sum, record) => sum + record.durationSeconds, 0);
    const averagePaceSecPerKm = totalDistanceKm === 0 ? null : Math.floor(totalDurationSeconds / totalDistanceKm);
    const monthlyDistanceKm = getMonthlyDistance(records);
    return {
      totalDistanceKm,
      recordCount: records.length,
      averagePaceSecPerKm,
      monthlyDistanceKm,
    };
  }, [records]);

  const sortedRecords = useMemo(() => {
    return [...records].sort(
      (firstRecord, secondRecord) => new Date(secondRecord.runDate).getTime() - new Date(firstRecord.runDate).getTime(),
    );
  }, [records]);
  const recentRecords = sortedRecords.slice(0, 5);
  const sevenDayDistances = useMemo(() => getSevenDayDistances(records), [records]);
  const paceTrendItems = useMemo(() => getPaceTrendItems(records), [records]);
  const weeklyTrainingSummary = useMemo(
    () => getWeeklyTrainingSummary(trainingPlans),
    [trainingPlans],
  );
  const hasRecords = records.length > 0;

  return (
    <ProtectedPageLayout
      title="대시보드"
      description="최근 러닝 기록을 기반으로 현재 상태를 확인하세요."
    >
          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <div className="space-y-8">
              {errorMessage && <StatusMessage message={errorMessage} />}

              <div className="grid gap-4 md:grid-cols-4">
                <StatCard label="총 거리" value={formatDistance(stats.totalDistanceKm)} />
                <StatCard label="러닝 횟수" value={`${stats.recordCount}회`} />
                <StatCard label="평균 페이스" value={formatPace(stats.averagePaceSecPerKm)} />
                <StatCard label="이번 달 거리" value={formatDistance(stats.monthlyDistanceKm)} />
              </div>

              <TodayTrainingCard records={records} todayTraining={todayTraining} />

              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <SevenDayDistanceChart data={sevenDayDistances} />
                <PaceTrend items={paceTrendItems} />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">최근 러닝 기록</h2>
                    {hasRecords && (
                      <Link href="/running-records" className="text-sm font-semibold text-blue-400 hover:text-blue-300">
                        전체 보기
                      </Link>
                    )}
                  </div>

                  {recentRecords.length === 0 ? (
                    <EmptyDashboard />
                  ) : (
                    <div className="space-y-4">
                      {recentRecords.map((record) => (
                        <div key={record.id} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-sm text-slate-400">{formatDate(record.runDate)}</p>
                              <p className="mt-1 text-2xl font-bold">{formatDistance(record.distanceKm)}</p>
                            </div>

                            <div className="text-sm text-slate-300 sm:text-right">
                              <p>{formatDuration(record.durationSeconds)}</p>
                              <p className="mt-1 text-blue-400">{formatPace(record.paceSecPerKm)}</p>
                            </div>
                          </div>

                          {record.memo && (
                            <p className="mt-4 rounded-lg bg-slate-950 p-4 text-sm text-slate-300">{record.memo}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <div className="space-y-6">
                  <WeeklyTrainingSummaryCard summary={weeklyTrainingSummary} />
                  <TrainingPlanCta hasRecords={hasRecords} />
                </div>
              </div>
            </div>
          )}
    </ProtectedPageLayout>
  );
}
