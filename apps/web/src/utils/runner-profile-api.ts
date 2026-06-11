import { ApiResponse, api } from './api';

export type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type TrainingDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type RunnerProfile = {
  id: number;
  experienceLevel: ExperienceLevel;
  weeklyRunCount: number;
  comfortableDistanceKm: number;
  goal: string | null;
  planStartDate: string | null;
  preferredTrainingDays: TrainingDay[];
  createdAt: string;
  updatedAt: string;
};

export type UpsertRunnerProfilePayload = {
  experienceLevel: ExperienceLevel;
  weeklyRunCount: number;
  comfortableDistanceKm: number;
  goal?: string;
  planStartDate?: string;
  preferredTrainingDays: TrainingDay[];
};

export const getMyRunnerProfile = async () => {
  const response = await api.get<ApiResponse<RunnerProfile | null>>('/runner-profile/me');

  return response.data.data;
};

export const upsertMyRunnerProfile = async (payload: UpsertRunnerProfilePayload) => {
  const response = await api.put<ApiResponse<RunnerProfile>>('/runner-profile/me', payload);

  return response.data.data;
};
