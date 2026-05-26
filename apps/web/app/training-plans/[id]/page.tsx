'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { ProtectedRoute } from '@/components/protected-route';
import { api } from '@/utils/api';

type TrainingPlanItem = {
  id: number;
  day: number;
  title: string;
  description: string;
  distanceKm: number;
};

type TrainingPlanDetail = {
  id: number;
  title: string;
  level: string;
  createdAt: string;
  items: TrainingPlanItem[];
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
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <section className="mx-auto max-w-4xl">
          {isLoading ? (
            <p className="text-slate-400">불러오는 중...</p>
          ) : !plan ? (
            <p className="text-slate-400">훈련 계획을 찾을 수 없습니다.</p>
          ) : (
            <>
              <a href="/training-plans" className="text-sm text-blue-400">
                ← 목록으로
              </a>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm font-semibold text-blue-400">
                  {plan.level}
                </p>

                <h1 className="mt-2 text-4xl font-bold">{plan.title}</h1>

                <p className="mt-3 text-sm text-slate-400">
                  {new Date(plan.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {plan.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                  >
                    <p className="text-sm font-semibold text-blue-400">
                      Day {item.day}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-slate-300">
                      {item.description}
                    </p>

                    <p className="mt-3 text-sm text-slate-400">
                      목표 거리: {item.distanceKm}km
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}