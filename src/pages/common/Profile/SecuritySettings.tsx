const SecuritySettings = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">
        Change Password
      </h3>

      <input
        type="password"
        placeholder="Current Password"
        className="w-full border rounded-xl px-4 py-3"
      />

      <input
        type="password"
        placeholder="New Password"
        className="w-full border rounded-xl px-4 py-3"
      />

      <button className="bg-red-500 text-white px-6 py-2 rounded-xl">
        Update Password
      </button>
    </div>
  );
};

export default SecuritySettings;