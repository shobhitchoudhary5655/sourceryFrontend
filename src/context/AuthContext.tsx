import { createContext, useContext, useEffect, useState, } from 'react';
import type { ReactNode, } from 'react';
import type { AuthContextType, User, UserRole, } from '@/types/auth.types';

const AuthContext = createContext<AuthContextType | null>(null);

interface Props { children: ReactNode; }

export const AuthProvider = ({ children, }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
            setToken(null);
        }

        setLoading(false);
    }, []);

    const login = (token: string, user: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const hasRole = (roles: UserRole[]) => {
        if (!user) return false;

        return roles.includes(user.role);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, hasRole, isAuthenticated: !!token && !!user, loading }} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
};