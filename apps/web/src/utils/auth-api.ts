import { ApiResponse, api } from './api';

export type AuthUser = {
  userId: number;
  email: string;
  nickname?: string;
};

export type AuthTokenResponse = {
  accessToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  email: string;
  password: string;
  nickname?: string;
};

export const login = async (payload: LoginPayload) => {
  const response = await api.post<ApiResponse<AuthTokenResponse>>('/auth/login', payload);

  return response.data.data;
};

export const signup = async (payload: SignupPayload) => {
  const response = await api.post<ApiResponse<AuthTokenResponse>>('/auth/signup', payload);

  return response.data.data;
};

export const getMe = async () => {
  const response = await api.get<ApiResponse<AuthUser>>('/auth/me');

  return response.data.data;
};
