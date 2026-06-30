import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">
          Change Password
        </h3>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Use a strong password to keep your account secure.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none focus:border-[#7F26FD] focus:ring-2 focus:ring-[#7F26FD]/20 sm:text-base "
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-lg
                p-1
                text-gray-500
                hover:bg-gray-100
              "
            >
              {showCurrentPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                pr-12
                text-sm
                outline-none
                focus:border-[#7F26FD]
                focus:ring-2
                focus:ring-[#7F26FD]/20
                sm:text-base
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-lg
                p-1
                text-gray-500
                hover:bg-gray-100
              "
            >
              {showNewPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="
            w-full
            rounded-xl
            bg-red-500
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-red-600
            sm:w-auto
            sm:text-base
          "
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;