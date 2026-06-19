// import api from './api';
// import type { LoginRequest, LoginResponse } from '@/types/login.type';

// export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
//     try {
//         const response = await api.post<LoginResponse>('/auth/login', data);
//         return response.data;
//     } catch (error: any) {
//         throw error.response?.data ||
//         { success: false, message: 'Something went wrong', };
//     }
// };

import api from './api';
import type { LoginResponse } from '@/types/login.type';

export const loginUser = async (
  data: {
    email: string;
    password: string;
  }
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    '/auth/login',
    data
  );

  return response.data;
};