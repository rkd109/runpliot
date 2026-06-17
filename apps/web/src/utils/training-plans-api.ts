import { api, ApiResponse, PaginatedResponse } from './api';
import type { RunningRecord } from './running-records-api';

export type TrainingPlanItemExecutionStatus = 'PLANNED' | 'COMPLETED' | 'MISSED';

export type TrainingPlan = {
  id: number;
  title: string;
  goalType: string;
  level: string;
  startDate: string;
  endDate: string;
  sourceType: string;
  createdAt: string;
  updatedAt: string;
};

export type TrainingPlanItem = {
  id: number;
  planDate: string;
  workoutType: string;
  distanceKm: number | null;
  targetPaceSecPerKm: number | null;
  description: string | null;
  sortOrder: number;
  executionStatus: TrainingPlanItemExecutionStatus;
  actualRecord: RunningRecord | null;
};

export type TrainingPlanDetail = TrainingPlan & {
  items: TrainingPlanItem[];
};

export type TodayTraining = {
  planId: number;
  title: string;
  startDate: string;
  endDate: string;
  item: TrainingPlanItem;
};

export type GenerateTrainingPlanPayload = {
  goal?: string;
};

export const getMyTrainingPlans = async () => {
  const response = await api.get<ApiResponse<PaginatedResponse<TrainingPlan>>>('/training-plans/me');

  return response.data.data.items;
};

export const generateTrainingPlan = async (payload: GenerateTrainingPlanPayload) => {
  const response = await api.post<ApiResponse<TrainingPlan>>('/training-plans/generate', payload);

  return response.data.data;
};

export const getTrainingPlan = async (id: number) => {
  const response = await api.get<ApiResponse<TrainingPlanDetail>>(`/training-plans/${id}`);

  return response.data.data;
};

export const getTodayTraining = async () => {
  const response = await api.get<ApiResponse<TodayTraining | null>>('/training-plans/today');

  return response.data.data;
};
