'use client';

import {
  getDefaultRunnerProfileForm,
  ProtectedPageLayout,
  RunnerProfileFormFields,
  RunnerProfileFormState,
  StatusMessage,
} from '@components';
import {
  getApiErrorMessage,
  getMyRunnerProfile,
  RunnerProfile,
  upsertMyRunnerProfile,
} from '@utils';
import { useAuth } from '@contexts';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const toDateInputValue = (date: string | null) => {
  if (!date) {
    return '';
  }

  return date.split('T')[0];
};

const getFormFromProfile = (profile: RunnerProfile): RunnerProfileFormState => ({
  experienceLevel: profile.experienceLevel,
  weeklyRunCount: String(profile.weeklyRunCount),
  comfortableDistanceKm: String(profile.comfortableDistanceKm),
  goal: profile.goal ?? '',
  planStartDate: toDateInputValue(profile.planStartDate),
  preferredTrainingDays: profile.preferredTrainingDays,
});

export default function RunnerProfileSetupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<RunnerProfileFormState>(() => getDefaultRunnerProfileForm());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setErrorMessage('');
        const profile = await getMyRunnerProfile();

        if (profile) {
          setForm(getFormFromProfile(profile));
        }
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, '러닝 프로필을 불러오지 못했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const weeklyRunCount = Number(form.weeklyRunCount);
    const comfortableDistanceKm = Number(form.comfortableDistanceKm);

    if (Number.isNaN(weeklyRunCount) || weeklyRunCount < 0) {
      setErrorMessage('주간 러닝 횟수를 0 이상으로 입력해주세요.');
      return;
    }

    if (Number.isNaN(comfortableDistanceKm) || comfortableDistanceKm <= 0) {
      setErrorMessage('편하게 뛸 수 있는 거리를 0보다 크게 입력해주세요.');
      return;
    }

    if (form.preferredTrainingDays.length === 0) {
      setErrorMessage('선호 훈련 요일을 하나 이상 선택해주세요.');
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage('');

      await upsertMyRunnerProfile({
        experienceLevel: form.experienceLevel,
        weeklyRunCount,
        comfortableDistanceKm,
        ...(form.goal.trim() ? { goal: form.goal.trim() } : {}),
        ...(form.planStartDate ? { planStartDate: form.planStartDate } : {}),
        preferredTrainingDays: form.preferredTrainingDays,
      });

      router.push('/dashboard');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '러닝 프로필을 저장하지 못했습니다.'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedPageLayout
      title="러닝 프로필"
      description="훈련 계획을 만들기 전에 현재 운동 능력과 선호 요일을 알려주세요."
    >
      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        {isLoading ? (
          <p className="text-slate-400">러닝 프로필을 불러오는 중입니다...</p>
        ) : (
          <div className="space-y-6">
            <RunnerProfileFormFields value={form} onChange={setForm} disabled={isSaving} />

            {errorMessage && <StatusMessage message={errorMessage} />}

            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
              disabled={isSaving}
            >
              {isSaving ? '저장 중...' : '프로필 저장'}
            </button>
          </div>
        )}
      </form>
    </ProtectedPageLayout>
  );
}
