'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { ProtectedPageLayout } from '@components';
import { api, formatDate, formatPace } from '@/utils';

type TrainingPlanItem = {
  id: number;
  planDate: string;
  workoutType: string;
  distanceKm: number | null;
  targetPaceSecPerKm: number | null;
  description: string | null;
  sortOrder: number;
};

type TrainingPlanDetail = {
  id: number;
  title: string;
  level: string;
  startDate: string;
  endDate: string;
  items: TrainingPlanItem[];
};

const workoutTypeLabels: Record<string, string> = {
  REST: '휴식',
  EASY_RUN: '이지런',
  TEMPO_RUN: '템포런',
  LONG_RUN: '롱런',
  RECOVERY_RUN: '회복주',
};

export default function TrainingPlanDetailPage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<TrainingPlanDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await api.get(`/training-plans/${params.id}`);
        setPlan(response.data.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlan();
  }, [params.id]);

  return (
    <ProtectedPageLayout
      title="훈련 계획 상세"
      description="생성된 훈련 계획의 일자별 운동을 확인하세요."
    >
          {isLoading ? (
            <p className="text-slate-400">불러오는 중...</p>
          ) : !plan ? (
            <p className="text-slate-400">훈련 계획을 찾을 수 없습니다.</p>
          ) : (
            <>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm font-semibold text-blue-400">
                  {plan.level}
                </p>

                <h1 className="mt-2 text-4xl font-bold">{plan.title}</h1>

                <p className="mt-3 text-sm text-slate-400">
                  {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {plan.items.map((item) => {
                  const targetPace =
                    item.targetPaceSecPerKm === null
                      ? null
                      : formatPace(item.targetPaceSecPerKm);

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                    >
                      <p className="text-sm font-semibold text-blue-400">
                        Day {item.sortOrder} · {formatDate(item.planDate)}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold">
                        {workoutTypeLabels[item.workoutType] ??
                          item.workoutType}
                      </h2>

                      {item.description && (
                        <p className="mt-2 text-slate-300">
                          {item.description}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
                        <span>
                          목표 거리:{' '}
                          {item.distanceKm === null
                            ? '-'
                            : `${item.distanceKm}km`}
                        </span>

                        {targetPace && (
                          <span>
                            목표 페이스: {targetPace}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
    </ProtectedPageLayout>
  );
}
