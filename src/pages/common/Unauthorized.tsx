import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getHomeRoute } from '@/routes/routes';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">403</h1>

        <p className="mt-3 text-gray-600">
          You don't have permission to access this page.
        </p>

        <button
          onClick={() =>
            navigate(getHomeRoute(user?.role), {
              replace: true,
            })
          }
          className="mt-5 px-5 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;