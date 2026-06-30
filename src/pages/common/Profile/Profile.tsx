import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import ProfileDetails from './ProfileDetails';
import SecuritySettings from './SecuritySettings';
import RoleInfo from './RoleInfo';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
      <ProfileHeader user={user} />

      <div className="overflow-x-auto">
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div
        className="
          w-full
          rounded-xl
          border
          bg-white
          p-4
          shadow-sm
          sm:rounded-2xl
          sm:p-6
          lg:p-8
        "
      >
        {activeTab === 'profile' && (
          <ProfileDetails user={user} />
        )}

        {activeTab === 'security' && (
          <SecuritySettings />
        )}

        {activeTab === 'role' && (
          <RoleInfo user={user} />
        )}
      </div>
    </div>
  );
};

export default Profile;