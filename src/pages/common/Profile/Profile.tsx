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
    <div className="space-y-6">
      <ProfileHeader user={user} />

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="bg-white rounded-2xl border p-6">
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

// import PageHeader from '@/components/common/Header/PageHeader';
// import { useAuth } from '@/context/AuthContext';

// const Profile = () => {
//     const { user } = useAuth();

//     return (
//         <div>
//             <PageHeader title="Profile" subtitle="Your account details" />
//             <h1>Profile</h1>

//             <p>Name: {user?.name}</p>
//             <p>Email: {user?.email}</p>
//             <p>Role: {user?.role}</p>

//             {user?.role === 'admin' && (
//                 <div>
//                     <p>Admin Controls</p>
//                 </div>
//             )}

//             {user?.role === 'hr' && (
//                 <div>
//                     <p>HR Dashboard Info</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;