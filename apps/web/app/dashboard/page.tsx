'use client';

import { ProtectedRoute } from '@components';
import {
  api,
  formatDate,
  formatDistance,
  formatDuration,
  formatPace,
} from '@utils';
import { useEffect, useMemo, useState } from 'react';

type RunningRecord = {
  id: number;
  runDate: string;
  distanceKm: number;
  durationSeconds: number;
  paceSecPerKm: number;
  memo: string | null;
};

export default function DashboardPage() {
  const [records, setRecords] = useState<RunningRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get('/running-records/me');
        setRecords(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const stats = useMemo(() => {
    const totalDistanceKm = records.reduce(
      (sum, record) => sum + record.distanceKm,
      0,
    );
    const totalDurationSeconds = records.reduce(
      (sum, record) => sum + record.durationSeconds,
      0,
    );
    const averagePaceSecPerKm =
      totalDistanceKm === 0
        ? null
        : Math.floor(totalDurationSeconds / totalDistanceKm);
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

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-400">RunPilot</p>
              <h1 className="mt-2 text-4xl font-bold">대시보드</h1>
              <p className="mt-3 text-slate-400">
                최근 러닝 기록을 기반으로 현재 상태를 확인하세요.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/running-records"
                className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:bg-slate-900"
              >
                러닝 기록
              </a>
              <a
                href="/training-plans"
                className="rounded-xl bg-blue-500 px-5 py-3 text-center font-semibold text-white hover:bg-blue-400"
              >
                훈련 계획
              </a>
            </div>
          </div>

          {isLoading ? (
            <p className="text-slate-400">불러오는 중...</p>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">총 거리</p>
                  <p className="mt-3 text-3xl font-bold">
                    {formatDistance(stats.totalDistanceKm)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">러닝 횟수</p>
                  <p className="mt-3 text-3xl font-bold">
                    {stats.recordCount}회
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">평균 페이스</p>
                  <p className="mt-3 text-3xl font-bold">
                    {formatPace(stats.averagePaceSecPerKm)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">최근 7일 거리</p>
                  <p className="mt-3 text-3xl font-bold">
                    {formatDistance(stats.recentSevenDaysDistanceKm)}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">최근 러닝 기록</h2>
                    <a
                      href="/running-records"
                      className="text-sm font-semibold text-blue-400 hover:text-blue-300"
                    >
                      전체 보기
                    </a>
                  </div>

                  {recentRecords.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
                      <p className="text-lg font-semibold">
                        아직 러닝 기록이 없습니다
                      </p>
                      <p className="mt-2 text-sm text-slate-400">
                        첫 기록을 추가하면 대시보드가 채워집니다.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentRecords.map((record) => (
                        <div
                          key={record.id}
                          className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-sm text-slate-400">
                                {formatDate(record.runDate)}
                              </p>
                              <p className="mt-1 text-2xl font-bold">
                                {formatDistance(record.distanceKm)}
                              </p>
                            </div>

                            <div className="text-sm text-slate-300 sm:text-right">
                              <p>{formatDuration(record.durationSeconds)}</p>
                              <p className="mt-1 text-blue-400">
                                {formatPace(record.paceSecPerKm)}
                              </p>
                            </div>
                          </div>

                          {record.memo && (
                            <p className="mt-4 rounded-xl bg-slate-950 p-4 text-sm text-slate-300">
                              {record.memo}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <p className="text-sm font-semibold text-blue-400">
                    Training Plan
                  </p>
                  <h2 className="mt-2 text-xl font-bold">다음 훈련 계획</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    러닝 기록을 기반으로 이번 주 훈련 계획을 생성하고
                    강도를 조절해보세요.
                  </p>

                  <a
                    href="/training-plans"
                    className="mt-6 block rounded-xl bg-blue-500 px-5 py-3 text-center font-semibold text-white hover:bg-blue-400"
                  >
                    훈련 계획 보기
                  </a>
                </aside>
              </div>
            </>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}
