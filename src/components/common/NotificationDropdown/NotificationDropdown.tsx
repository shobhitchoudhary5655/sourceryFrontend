import { Bell, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl bg-gray-100 text-gray-700
          transition hover:bg-[#F4EDFF] hover:text-[#7F26FD]
          focus:outline-none focus:ring-2 focus:ring-[#7F26FD]/30
        "
        aria-label="Open notifications"
        aria-expanded={open}
      >
        <Bell size={19} />
      </button>

      {open && (
        <div
          className="
            fixed left-3 right-3 top-[76px]
            z-[60] overflow-hidden
            rounded-xl border bg-white shadow-lg
            sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-80
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold text-gray-800">
              Notifications
            </h3>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 sm:hidden"
              aria-label="Close notifications"
            >
              <X size={18} />
            </button>
          </div>

          {/* NOTIFICATION LIST */}
          <div className="max-h-[60vh] overflow-y-auto p-4 text-sm text-gray-500 sm:max-h-80">
            No notifications
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;