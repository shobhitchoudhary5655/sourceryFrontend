import api from './api';
import type { LoginResponse } from '@/types/login.type';

export interface LoginPayload {
  email: string;
  password: string;
  fcmToken?: string;
}

export const loginUser = async (
  data: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    '/auth/login',
    data
  );

  return response.data;
};