import api from './api';
import type { LoginResponse } from '@/types/login.type';

export interface LoginPayload {
  email: string;
  password: string;
  fcmToken?: string;
  platform: "web" | "mobile";
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}


export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>("/auth/forgot-password",
    { email, }
  );
  return response.data;
};

export const resetPassword = async (data: ResetPasswordPayload): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>("/auth/reset-password", data);
  return response.data;
};