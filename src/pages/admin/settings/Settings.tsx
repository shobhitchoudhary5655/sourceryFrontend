import { Settings as SettingsIcon, ShieldCheck, Bell, ChevronRight, } from 'lucide-react';
import PageHeader from '@/components/common/Header/PageHeader';

const Settings = () => {
  const settingItems = [
    {
      title: 'General Settings',
      description: 'Manage company and application preferences.',
      icon: SettingsIcon,
    },
    {
      title: 'Security Settings',
      description: 'Manage passwords, access, and security options.',
      icon: ShieldCheck,
    },
    {
      title: 'Notification Settings',
      description: 'Manage email and system notification preferences.',
      icon: Bell,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6">
      <PageHeader
        title="Settings"
        subtitle="System configuration"
      />

      <div className="rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {settingItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                className="
                  group flex min-w-0 items-center gap-4
                  rounded-xl border border-gray-200
                  p-4 text-left transition
                  hover:border-[#7F26FD]/40 hover:bg-[#F8F4FF]
                  sm:p-5
                "
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F4EDFF] text-[#7F26FD]">
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-gray-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  size={19}
                  className="shrink-0 text-gray-400 transition group-hover:text-[#7F26FD]"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;