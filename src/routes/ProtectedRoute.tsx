import { Navigate, Outlet, } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserRole, } from '@/types/auth.types';

interface Props { allowedRoles?: UserRole[]; }

const ProtectedRoute = ({ allowedRoles, }: Props) => {
    const { isAuthenticated, user, loading,} = useAuth();

    if (loading) {
        return <div className="h-screen flex items-center justify-center">
            Loading...
        </div>;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)
    ) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;