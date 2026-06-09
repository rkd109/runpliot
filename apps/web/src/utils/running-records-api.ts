import { api } from './api';

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type RunningRecord = {
  id: number;
  runDate: string;
  distanceKm: number;
  durationSeconds: number;
  paceSecPerKm: number;
  createAt: string;
  updateAt: string;
  memo: string | null;
};

export type RunningRecordPayload = {
  runDate: string;
  distanceKm: number;
  durationSeconds: number;
  memo?: string;
};

export const getMyRunningRecords = async () => {
  const response = await api.get<ApiResponse<RunningRecord[]>>('/running-records/me');

  return response.data.data;
};

export const createRunningRecord = async (payload: RunningRecordPayload) => {
  const response = await api.post<ApiResponse<RunningRecord>>('/running-records', payload);

  return response.data.data;
};

export const updateRunningRecord = async (id: number, payload: RunningRecordPayload) => {
  const response = await api.patch<ApiResponse<RunningRecord>>(`/running-records/${id}`, payload);

  return response.data.data;
};

export const deleteRunningRecord = async (id: number) => {
  const response = await api.delete<ApiResponse<{ deleted: boolean }>>(`/running-records/${id}`);

  return response.data.data;
};
