import { Bell } from 'lucide-react';
import { useState } from 'react';

const NotificationDropdown = () => {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          p-2
          rounded-xl
          bg-gray-100
        "
      >
        <Bell size={18} />
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          top-12
          w-80
          bg-white
          rounded-xl
          border
          shadow-lg
          z-50
        "
        >
          <div className="p-4 border-b">
            <h3 className="font-semibold">
              Notifications
            </h3>
          </div>

          <div className="p-4 text-gray-500">
            No notifications
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;