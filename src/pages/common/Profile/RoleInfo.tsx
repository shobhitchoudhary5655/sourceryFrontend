import type { User } from '@/types/auth.types';

const RoleInfo = ({ user, }: { user: User | null; }) => {
  const role = user?.role?.toLowerCase() || 'employee';

  const roleDescription: Record<string, string> = {
    admin: 'Full system access',
    hr: 'HR management access',
    employee: 'Personal access only',
  };

  const roleTextColor: Record<string, string> = {
    admin: 'text-purple-600',
    hr: 'text-blue-600',
    employee: 'text-green-600',
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">
          Role Information
        </h3>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Your current system access level.
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 sm:text-base">
            Role
          </p>

          <span
            className="
              w-fit
              rounded-full
              bg-white
              px-3
              py-1
              text-sm
              font-semibold
              capitalize
              text-gray-800
              shadow-sm
            "
          >
            {role}
          </span>
        </div>

        <div className="mt-4 border-t pt-4">
          <p
            className={`text-sm font-medium sm:text-base ${roleTextColor[role] || 'text-gray-600'
              }`}
          >
            {roleDescription[role] || 'System access information'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleInfo;