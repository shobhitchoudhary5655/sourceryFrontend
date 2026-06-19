export type UserRole =
  | 'admin'
  | 'hr'
  | 'employee';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (token: string, user: User) => void;

  logout: () => void;

  hasRole: (roles: UserRole[]) => boolean;

  loading: boolean;
}