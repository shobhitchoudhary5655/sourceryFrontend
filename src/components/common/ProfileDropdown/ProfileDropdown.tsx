import { LogOut, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

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

  const goToProfile = () => {
    setOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      {/* PROFILE BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="
          flex items-center gap-2 rounded-xl
          p-1 transition hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-[#7F26FD]/30
          sm:gap-3 sm:p-2
        "
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-full bg-[#7F26FD]
            text-sm font-semibold text-white
          "
        >
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>

        {/* Hide user text on mobile */}
        <div className="hidden min-w-0 text-left sm:block">
          <p className="max-w-[150px] truncate font-semibold text-gray-800">
            {user?.name || 'User'}
          </p>

          <p className="max-w-[150px] truncate text-xs text-gray-500">
            {user?.role || '-'}
          </p>
        </div>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            fixed right-3 top-[76px] z-[60]
            w-[calc(100vw-24px)]
            overflow-hidden rounded-xl
            border bg-white shadow-lg
            sm:absolute sm:right-0 sm:top-14 sm:w-56
          "
        >
          {/* Mobile dropdown header */}
          <div className="flex items-center justify-between border-b p-4 sm:hidden">
            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-800">
                {user?.name || 'User'}
              </p>

              <p className="truncate text-xs text-gray-500">
                {user?.role || '-'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100"
              aria-label="Close profile menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-1.5">
            <button
              type="button"
              onClick={goToProfile}
              className="
                flex w-full items-center gap-3 rounded-lg
                px-3 py-3 text-left text-sm
                text-gray-700 transition hover:bg-gray-50
              "
            >
              <User size={18} />
              Profile
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex w-full items-center gap-3 rounded-lg
                px-3 py-3 text-left text-sm
                text-red-500 transition hover:bg-red-50
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;