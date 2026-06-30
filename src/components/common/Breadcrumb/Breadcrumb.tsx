import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const routeNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  employees: 'Employees',
  attendance: 'Attendance',
  profile: 'Profile',
};

const Breadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname
    .split('/')
    .filter(Boolean);

  const breadcrumbs = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    return {
      label: routeNameMap[value] || decodeURIComponent(value),
      path: to,
    };
  });

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {/* Home */}
      <Link to="/" className="hover:text-gray-900">
        Home
      </Link>

      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={item.path} className="flex items-center gap-2">
            <ChevronRight size={14} />

            {isLast ? (
              <span className="text-gray-900 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-gray-900"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;