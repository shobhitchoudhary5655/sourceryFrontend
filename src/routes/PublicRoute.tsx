import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getHomeRoute } from './routes';

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to={getHomeRoute(user?.role)}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;