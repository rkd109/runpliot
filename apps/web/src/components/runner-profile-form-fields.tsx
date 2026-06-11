'use client';

import { ExperienceLevel, TrainingDay } from '@utils';

export type RunnerProfileFormState = {
  experienceLevel: ExperienceLevel;
  weeklyRunCount: string;
  comfortableDistanceKm: string;
  goal: string;
  planStartDate: string;
  preferredTrainingDays: TrainingDay[];
};

type RunnerProfileFormFieldsProps = {
  value: RunnerProfileFormState;
  onChange: (value: RunnerProfileFormState) => void;
  disabled?: boolean;
};

const experienceLevelOptions: Array<{ value: ExperienceLevel; label: string; description: string }> = [
  { value: 'BEGINNER', label: '입문', description: '최근 러닝이 익숙하지 않아요.' },
  { value: 'INTERMEDIATE', label: '중급', description: '주기적으로 달리고 있어요.' },
  { value: 'ADVANCED', label: '상급', description: '강도 있는 훈련도 소화할 수 있어요.' },
];

const trainingDayOptions: Array<{ value: TrainingDay; label: string }> = [
  { value: 'MONDAY', label: '월' },
  { value: 'TUESDAY', label: '화' },
  { value: 'WEDNESDAY', label: '수' },
  { value: 'THURSDAY', label: '목' },
  { value: 'FRIDAY', label: '금' },
  { value: 'SATURDAY', label: '토' },
  { value: 'SUNDAY', label: '일' },
];

export const getDefaultRunnerProfileForm = (): RunnerProfileFormState => ({
  experienceLevel: 'BEGINNER',
  weeklyRunCount: '3',
  comfortableDistanceKm: '5',
  goal: '',
  planStartDate: '',
  preferredTrainingDays: ['MONDAY', 'WEDNESDAY', 'SATURDAY'],
});

export const RunnerProfileFormFields = ({
  value,
  onChange,
  disabled = false,
}: RunnerProfileFormFieldsProps) => {
  const updateField = <TField extends keyof RunnerProfileFormState>(
    field: TField,
    nextValue: RunnerProfileFormState[TField],
  ) => {
    onChange({
      ...value,
      [field]: nextValue,
    });
  };

  const toggleTrainingDay = (day: TrainingDay) => {
    const nextDays = value.preferredTrainingDays.includes(day)
      ? value.preferredTrainingDays.filter((currentDay) => currentDay !== day)
      : [...value.preferredTrainingDays, day];

    updateField('preferredTrainingDays', nextDays);
  };

  return (
    <div className="space-y-6">
      <fieldset disabled={disabled}>
        <legend className="mb-3 text-sm font-semibold text-slate-300">러닝 경험</legend>
        <div className="grid gap-3 md:grid-cols-3">
          {experienceLevelOptions.map((option) => {
            const isSelected = value.experienceLevel === option.value;

            return (
              <label
                key={option.value}
                className={
                  isSelected
                    ? 'cursor-pointer rounded-lg border border-blue-500 bg-blue-500/10 p-4'
                    : 'cursor-pointer rounded-lg border border-slate-700 bg-slate-950 p-4 hover:border-blue-500'
                }
              >
                <input
                  type="radio"
                  name="experienceLevel"
                  value={option.value}
                  checked={isSelected}
                  onChange={() => updateField('experienceLevel', option.value)}
                  className="sr-only"
                />
                <span className="block font-semibold text-white">{option.label}</span>
                <span className="mt-2 block text-sm leading-5 text-slate-400">{option.description}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">주간 러닝 횟수</label>
          <input
            type="number"
            min="0"
            max="14"
            value={value.weeklyRunCount}
            onChange={(event) => updateField('weeklyRunCount', event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">편하게 뛸 수 있는 거리 (km)</label>
          <input
            type="number"
            min="0.1"
            max="100"
            step="0.1"
            value={value.comfortableDistanceKm}
            onChange={(event) => updateField('comfortableDistanceKm', event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">목표</label>
          <input
            type="text"
            maxLength={100}
            value={value.goal}
            onChange={(event) => updateField('goal', event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="10km 완주"
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">계획 시작 희망일</label>
          <input
            type="date"
            value={value.planStartDate}
            onChange={(event) => updateField('planStartDate', event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled}
          />
        </div>
      </div>

      <fieldset disabled={disabled}>
        <legend className="mb-3 text-sm font-semibold text-slate-300">선호 훈련 요일</legend>
        <div className="grid grid-cols-7 gap-2">
          {trainingDayOptions.map((option) => {
            const isSelected = value.preferredTrainingDays.includes(option.value);

            return (
              <label
                key={option.value}
                className={
                  isSelected
                    ? 'cursor-pointer rounded-lg bg-blue-500 px-3 py-3 text-center text-sm font-semibold text-white'
                    : 'cursor-pointer rounded-lg border border-slate-700 px-3 py-3 text-center text-sm font-semibold text-slate-300 hover:border-blue-500'
                }
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleTrainingDay(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};
