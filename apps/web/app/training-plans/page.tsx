'use client';

import { ProtectedRoute } from '@components';
import { api, formatDate } from '@utils';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';


type TrainingPlan = {
  id: number;
  level: string;
  title: string;
  createdAt: string;
};

export default function TrainingPlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [goal, setGoal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPlans = async () => {
    try {
      const response = await api.get('/training-plans/me');
      setPlans(response.data.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePlan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsGenerating(true);
      setErrorMessage('');

      const trimmedGoal = goal.trim();
      const response = await api.post('/training-plans/generate', {
        ...(trimmedGoal ? { goal: trimmedGoal } : {}),
      });

      const createdPlan = response.data.data as TrainingPlan;
      router.push(`/training-plans/${createdPlan.id}`);
    } catch (error) {
      console.error(error);
      setErrorMessage('훈련 계획을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <section className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div>
              <p className="text-sm font-semibold text-blue-400">RunPilot</p>
              <h1 className="mt-2 text-4xl font-bold">훈련 계획</h1>
              <p className="mt-3 text-slate-400">
                러닝 기록을 기반으로 훈련 계획을 생성하세요.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleGeneratePlan}
            className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-2 block text-sm text-slate-300">
                  목표
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="예: 10km 완주 준비"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                {isGenerating ? '생성 중...' : '계획 생성'}
              </button>
            </div>

            {errorMessage && (
              <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
            )}
          </form>

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
                    {formatDate(plan.createdAt)}
                  </p>
                  <a
                    href={`/training-plans/${plan.id}`}
                    className="mt-4 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    상세 보기
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}
