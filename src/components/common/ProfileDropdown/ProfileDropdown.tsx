import { LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import Profile from '@/pages/admin/profile/Profile';

const ProfileDropdown = () => {
   const navigate = useNavigate(); 
  const [open, setOpen] =
    useState(false);

  const {
    user,
    logout,
  } = useAuth();

  const goToProfile = () => {
    setOpen(false);
    navigate('/profile');
  };

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
          h-10
          w-10
          rounded-full
          bg-[#7F26FD]
          text-white
          flex
          items-center
          justify-center
        "
        >
          {user?.name?.[0] || 'U'}
        </div>

        <div className="text-left">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            {user?.role}
          </p>
        </div>
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          top-14
          bg-white
          border
          rounded-xl
          shadow-lg
          w-52
          overflow-hidden
          z-50
        "
        >
          <button
          onClick={goToProfile}
            className="
            w-full
            px-4
            py-3
            flex
            items-center
            gap-2
            hover:bg-gray-50
          "
          >
            <User size={16} />
            Profile
          </button>

          <button
            onClick={logout}
            className="
            w-full
            px-4
            py-3
            flex
            items-center
            gap-2
            hover:bg-red-50
            text-red-500
          "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;