import type { User } from '@/types/auth.types';

const RoleInfo = ({
  user,
}: {
  user: User | null;
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">
        Role Information
      </h3>

      <div className="p-4 bg-gray-50 rounded-xl">
        <p>
          <b>Role:</b> {user?.role}
        </p>

        {user?.role === 'admin' && (
          <p className="text-purple-600 mt-2">
            Full system access
          </p>
        )}

        {user?.role === 'hr' && (
          <p className="text-blue-600 mt-2">
            HR management access
          </p>
        )}

        {user?.role === 'employee' && (
          <p className="text-green-600 mt-2">
            Personal access only
          </p>
        )}
      </div>
    </div>
  );
};

export default RoleInfo;