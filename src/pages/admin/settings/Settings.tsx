import PageHeader from '@/components/common/Header/PageHeader';

const Settings = () => {
  return (
    <div>
      <PageHeader title="Settings" subtitle="System configuration" />

      <div className="bg-white p-6 rounded-2xl border space-y-4">
        <p>⚙️ General Settings</p>
        <p>🔐 Security Settings</p>
        <p>🔔 Notification Settings</p>
      </div>
    </div>
  );
};

export default Settings;