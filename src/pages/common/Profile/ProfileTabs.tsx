interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs = ({
  activeTab,
  setActiveTab,
}: Props) => {
  const tabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'security', label: 'Security' },
    { key: 'role', label: 'Role Info' },
  ];

  return (
    <div className="flex gap-3 border-b pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            activeTab === tab.key
              ? 'bg-[#7F26FD] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;