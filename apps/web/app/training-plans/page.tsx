'use client';

import { ProtectedPageLayout, StatusMessage, TrainingPlanItemCard } from '@components';
import { useAuth } from '@contexts';
import {
  formatDate,
  generateTrainingPlan,
  getApiErrorMessage,
  getMyTrainingPlans,
  getTrainingPlan,
  TrainingPlan,
  TrainingPlanDetail,
} from '@utils';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const TrainingPlanAccordion = ({ plan }: { plan: TrainingPlanDetail }) => {
  return (
    <div className="mt-5 space-y-3 border-t border-slate-800 pt-5">
      <p className="text-sm text-slate-400">
        {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
      </p>

      <div className="space-y-3">
        {plan.items.map((item) => (
          <TrainingPlanItemCard key={item.id} item={item} variant="nested" />
        ))}
      </div>
    </div>
  );
};

export default function TrainingPlansPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [goal, setGoal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);
  const [expandedPlan, setExpandedPlan] = useState<TrainingPlanDetail | null>(null);
  const [detailLoadingId, setDetailLoadingId] = useState<number | null>(null);
  const [detailErrorMessage, setDetailErrorMessage] = useState('');

  const fetchPlans = async () => {
    try {
      setErrorMessage('');
      const nextPlans = await getMyTrainingPlans();
      setPlans(nextPlans);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '훈련 계획 목록을 불러오지 못했습니다.'));
    } finally {
      setIsLoading(false);
    }
  };

  const openPlanDetail = async (planId: number) => {
    if (expandedPlanId === planId) {
      setExpandedPlanId(null);
      setExpandedPlan(null);
      setDetailErrorMessage('');
      return;
    }

    try {
      setExpandedPlanId(planId);
      setExpandedPlan(null);
      setDetailErrorMessage('');
      setDetailLoadingId(planId);

      const detail = await getTrainingPlan(planId);
      setExpandedPlan(detail);
    } catch (error) {
      setDetailErrorMessage(getApiErrorMessage(error, '훈련 계획 상세를 불러오지 못했습니다.'));
    } finally {
      setDetailLoadingId(null);
    }
  };

  const handleGeneratePlan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsGenerating(true);
      setErrorMessage('');

      const trimmedGoal = goal.trim();
      const createdPlan = await generateTrainingPlan({
        ...(trimmedGoal ? { goal: trimmedGoal } : {}),
      });

      setGoal('');
      await fetchPlans();
      await openPlanDetail(createdPlan.id);
    } catch (error) {
      const message = getApiErrorMessage(error, '');

      if (message === 'RUNNER_PROFILE_REQUIRED') {
        setErrorMessage('훈련 계획을 만들기 전에 러닝 프로필을 먼저 입력해주세요.');
        router.push('/runner-profile/setup');
        return;
      }

      if (message === 'TRAINING_PLAN_ALREADY_EXISTS') {
        setErrorMessage('이미 다음 주 훈련 계획이 있습니다. 기존 계획을 확인해주세요.');
        return;
      }

      setErrorMessage(getApiErrorMessage(error, '훈련 계획을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.'));
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPlans();
    }
  }, [user]);

  return (
    <ProtectedPageLayout
      title="훈련 계획"
      description="러닝 기록을 기반으로 훈련 계획을 생성하고 이행 상태를 확인하세요."
    >
      <form
        onSubmit={handleGeneratePlan}
        className="mb-8 rounded-lg border border-slate-800 bg-slate-900 p-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm text-slate-300">목표</label>
            <input
              type="text"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              placeholder="예: 10km 완주 준비"
              disabled={isGenerating}
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {isGenerating ? '생성 중...' : '계획 생성'}
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4">
            <StatusMessage message={errorMessage} />
          </div>
        )}
      </form>

      {isLoading ? (
        <p className="text-slate-400">불러오는 중...</p>
      ) : plans.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
          <p className="text-lg font-semibold">아직 생성된 훈련 계획이 없습니다</p>
          <p className="mt-2 text-sm text-slate-400">
            러닝 기록과 러닝 프로필을 기반으로 첫 훈련 계획을 만들어보세요.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => {
            const isExpanded = expandedPlanId === plan.id;
            const isDetailLoading = detailLoadingId === plan.id;

            return (
              <div key={plan.id} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-blue-400">{plan.level}</p>
                    <h2 className="mt-2 text-2xl font-bold">{plan.title}</h2>
                    <p className="mt-2 text-sm text-slate-400">
                      {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openPlanDetail(plan.id)}
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isDetailLoading}
                  >
                    {isDetailLoading ? '불러오는 중...' : isExpanded ? '상세 닫기' : '상세 보기'}
                  </button>
                </div>

                {isExpanded && detailErrorMessage && (
                  <div className="mt-5">
                    <StatusMessage message={detailErrorMessage} />
                  </div>
                )}

                {isExpanded && expandedPlan && <TrainingPlanAccordion plan={expandedPlan} />}
              </div>
            );
          })}
        </div>
      )}
    </ProtectedPageLayout>
  );
}
