'use client';

import { ProtectedRoute, StatusMessage } from '@components';
import { useAuth } from '@contexts';
import {
  formatDate,
  formatDistance,
  formatDuration,
  formatPace,
  getApiErrorMessage,
  getMyRunningRecords,
  RunningRecord,
} from '@utils';
import { useEffect, useMemo, useState } from 'react';

type DashboardStats = {
  totalDistanceKm: number;
  recordCount: number;
  averagePaceSecPerKm: number | null;
  recentSevenDaysDistanceKm: number;
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

const EmptyDashboard = () => {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
      <p className="text-lg font-semibold">아직 러닝 기록이 없습니다</p>
      <p className="mt-2 text-sm text-slate-400">
        첫 기록을 추가하면 총 거리, 평균 페이스, 최근 7일 거리 요약이 채워집니다.
      </p>
      <a
        href="/running-records"
        className="mt-6 inline-flex rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400"
      >
        첫 기록 추가
      </a>
    </div>
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

      <a
        href={hasRecords ? '/training-plans' : '/running-records'}
        className="mt-6 block rounded-lg bg-blue-500 px-5 py-3 text-center font-semibold text-white hover:bg-blue-400"
      >
        {hasRecords ? '훈련 계획 보기' : '러닝 기록 추가'}
      </a>
    </aside>
  );
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<RunningRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setErrorMessage('');
        const nextRecords = await getMyRunningRecords();
        setRecords(nextRecords);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, '대시보드 데이터를 불러오지 못했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchRecords();
    }
  }, [user]);

  const stats = useMemo<DashboardStats>(() => {
    const totalDistanceKm = records.reduce((sum, record) => sum + record.distanceKm, 0);
    const totalDurationSeconds = records.reduce((sum, record) => sum + record.durationSeconds, 0);
    const averagePaceSecPerKm = totalDistanceKm === 0 ? null : Math.floor(totalDurationSeconds / totalDistanceKm);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const recentSevenDaysDistanceKm = records
      .filter((record) => new Date(record.runDate) >= sevenDaysAgo)
      .reduce((sum, record) => sum + record.distanceKm, 0);

    return {
      totalDistanceKm,
      recordCount: records.length,
      averagePaceSecPerKm,
      recentSevenDaysDistanceKm,
    };
  }, [records]);

  const recentRecords = records.slice(0, 5);
  const hasRecords = records.length > 0;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-400">RunPilot</p>
              <h1 className="mt-2 text-4xl font-bold">대시보드</h1>
              <p className="mt-3 text-slate-400">최근 러닝 기록을 기반으로 현재 상태를 확인하세요.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/running-records"
                className="rounded-lg border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:bg-slate-900"
              >
                러닝 기록
              </a>
              <a
                href="/training-plans"
                className="rounded-lg bg-blue-500 px-5 py-3 text-center font-semibold text-white hover:bg-blue-400"
              >
                훈련 계획
              </a>
            </div>
          </div>

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <div className="space-y-8">
              {errorMessage && <StatusMessage message={errorMessage} />}

              <div className="grid gap-4 md:grid-cols-4">
                <StatCard label="총 거리" value={formatDistance(stats.totalDistanceKm)} />
                <StatCard label="러닝 횟수" value={`${stats.recordCount}회`} />
                <StatCard label="평균 페이스" value={formatPace(stats.averagePaceSecPerKm)} />
                <StatCard label="최근 7일 거리" value={formatDistance(stats.recentSevenDaysDistanceKm)} />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">최근 러닝 기록</h2>
                    {hasRecords && (
                      <a href="/running-records" className="text-sm font-semibold text-blue-400 hover:text-blue-300">
                        전체 보기
                      </a>
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

                <TrainingPlanCta hasRecords={hasRecords} />
              </div>
            </div>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}
