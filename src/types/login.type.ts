import type { User } from "./auth.types";

export type UserRole =
    | 'admin'
    | 'hr'
    | 'employee';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    user: User;
}