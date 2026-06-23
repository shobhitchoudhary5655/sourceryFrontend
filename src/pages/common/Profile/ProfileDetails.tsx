import { useEffect, useState } from 'react';
import type { User } from '@/types/auth.types';

const ProfileDetails = ({ user, }: { user: User | null; }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="min-w-0">
          <label className="mb-1.5 block text-sm font-medium text-gray-600">
            Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-[#7F26FD]
              focus:ring-2
              focus:ring-[#7F26FD]/20
              sm:text-base
            "
          />
        </div>

        <div className="min-w-0">
          <label className="mb-1.5 block text-sm font-medium text-gray-600">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-[#7F26FD]
              focus:ring-2
              focus:ring-[#7F26FD]/20
              sm:text-base
            "
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="
            w-full
            rounded-xl
            bg-[#7F26FD]
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
            sm:w-auto
            sm:text-base
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;