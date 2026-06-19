import type { User } from '@/types/auth.types';

const ProfileHeader = ({
  user,
}: {
  user: User | null;
}) => {
  return (
    <div className="bg-gradient-to-r from-[#7F26FD] to-purple-500 text-white p-6 rounded-2xl">
      <h2 className="text-2xl font-bold">
        {user?.name}
      </h2>

      <p className="opacity-80">
        {user?.email}
      </p>

      <span className="inline-block mt-3 px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-medium">
        {user?.role}
      </span>
    </div>
  );
};

export default ProfileHeader;