import NotificationDropdown from '@/components/common/NotificationDropdown/NotificationDropdown';

import ProfileDropdown from '@/components/common/ProfileDropdown/ProfileDropdown';

const Header = () => {
  return (
    <header
      className="
    h-20
    bg-white
    border-b
    border-black/10
    flex
    items-center
    justify-between
    px-8
    shadow-sm
    sticky
    top-0
    z-50
  "
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {/* Dashboard */}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="
            h-11
            w-72
            border
            border-gray-200
            rounded-xl
            px-4
            outline-none
            focus:ring-2
            focus:ring-[#7F26FD]/30
            focus:border-[#7F26FD]
          "
        />

        <NotificationDropdown />

        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;