interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs = ({ activeTab, setActiveTab, }: Props) => {
  const tabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'security', label: 'Security' },
    { key: 'role', label: 'Role Info' },
  ];

  return (
    <div
      className="
        flex
        w-full
        gap-2
        overflow-x-auto
        border-b
        pb-2
        scrollbar-hide
        sm:gap-3
      "
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setActiveTab(tab.key)}
          className={`
            shrink-0
            whitespace-nowrap
            rounded-xl
            px-4
            py-2.5
            text-sm
            font-medium
            transition
            sm:px-5
            sm:text-base
            ${activeTab === tab.key
              ? 'bg-[#7F26FD] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;