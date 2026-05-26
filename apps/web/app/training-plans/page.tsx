'use client';

import { ProtectedRoute } from '@components';
import { api } from '@utils';
import { useEffect, useState } from 'react';


type TrainingPlan = {
  id: number;
  level: string;
  title: string;
  createdAt: string;
};

export default function TrainingPlansPage() {
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const response = await api.get('/training-plans/me');
      setPlans(response.data.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    await api.post('/training-plans/generate');
    await fetchPlans();
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <section className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-400">RunPilot</p>
              <h1 className="mt-2 text-4xl font-bold">훈련 계획</h1>
              <p className="mt-3 text-slate-400">
                러닝 기록을 기반으로 훈련 계획을 생성하세요.
              </p>
            </div>

            <button
              onClick={handleGeneratePlan}
              className="rounded-xl bg-blue-500 px-5 py-3 font-semibold hover:bg-blue-400"
            >
              계획 생성
            </button>
          </div>

          {isLoading ? (
            <p className="text-slate-400">불러오는 중...</p>
          ) : plans.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
              <p className="text-lg font-semibold">
                아직 생성된 훈련 계획이 없습니다
              </p>
              <p className="mt-2 text-sm text-slate-400">
                러닝 기록을 기반으로 첫 훈련 계획을 만들어보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                >
                  <p className="text-sm text-blue-400">{plan.level}</p>
                  <h2 className="mt-2 text-2xl font-bold">{plan.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {new Date(plan.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}