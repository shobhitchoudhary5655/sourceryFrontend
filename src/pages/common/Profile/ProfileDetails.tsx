import { useState } from 'react';
import type { User } from '@/types/auth.types';

const ProfileDetails = ({
  user,
}: {
  user: User | null;
}) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-500">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7F26FD]"
        />
      </div>

      <div>
        <label className="text-sm text-gray-500">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7F26FD]"
        />
      </div>

      <button className="bg-[#7F26FD] text-white px-6 py-2 rounded-xl">
        Save Changes
      </button>
    </div>
  );
};

export default ProfileDetails;