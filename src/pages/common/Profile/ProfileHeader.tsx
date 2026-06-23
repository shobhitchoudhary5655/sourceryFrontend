import type { User } from '@/types/auth.types';

const ProfileHeader = ({ user, }: { user: User | null; }) => {
  const initial = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div
      className="
        rounded-xl
        bg-gradient-to-r
        from-[#7F26FD]
        to-purple-500
        p-4
        text-white
        shadow-sm
        sm:rounded-2xl
        sm:p-6
        lg:p-8
      "
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/20
            text-xl
            font-bold
            sm:h-16
            sm:w-16
            sm:text-2xl
          "
        >
          {initial}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold sm:text-2xl">
            {user?.name || 'User'}
          </h2>

          <p className="mt-1 truncate text-sm text-white/80 sm:text-base">
            {user?.email || '-'}
          </p>

          <span
            className="
              mt-3
              inline-flex
              max-w-full
              rounded-full
              bg-white
              px-3
              py-1
              text-xs
              font-medium
              capitalize
              text-purple-700
              sm:text-sm
            "
          >
            {user?.role || 'User'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;