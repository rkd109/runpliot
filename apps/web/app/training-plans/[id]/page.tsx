'use client';

import { ProtectedPageLayout, StatusMessage, TrainingPlanItemCard } from '@components';
import { formatDate, getApiErrorMessage, getTrainingPlan, TrainingPlanDetail } from '@utils';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TrainingPlanDetailPage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<TrainingPlanDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setErrorMessage('');
        const planId = Number(params.id);

        if (Number.isNaN(planId)) {
          setPlan(null);
          setErrorMessage('훈련 계획을 찾을 수 없습니다.');
          return;
        }

        const nextPlan = await getTrainingPlan(planId);
        setPlan(nextPlan);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, '훈련 계획 상세를 불러오지 못했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlan();
  }, [params.id]);

  return (
    <ProtectedPageLayout
      title="훈련 계획 상세"
      description="생성된 훈련 계획의 일정과 실제 이행 기록을 확인하세요."
    >
      {isLoading ? (
        <p className="text-slate-400">불러오는 중...</p>
      ) : errorMessage ? (
        <StatusMessage message={errorMessage} />
      ) : !plan ? (
        <p className="text-slate-400">훈련 계획을 찾을 수 없습니다.</p>
      ) : (
        <>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-blue-400">{plan.level}</p>
            <h1 className="mt-2 text-3xl font-bold">{plan.title}</h1>
            <p className="mt-3 text-sm text-slate-400">
              {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {plan.items.map((item) => (
              <TrainingPlanItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </ProtectedPageLayout>
  );
}
