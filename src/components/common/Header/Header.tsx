import { Menu, Search } from 'lucide-react';

import NotificationDropdown from '@/components/common/NotificationDropdown/NotificationDropdown';
import ProfileDropdown from '@/components/common/ProfileDropdown/ProfileDropdown';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16 items-center justify-between
        border-b border-black/10
        bg-white px-4 shadow-sm
        sm:h-20 sm:px-6
        lg:px-8
      "
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-lg border border-gray-200
          text-gray-700
          hover:bg-gray-100
          lg:hidden
        "
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Empty desktop left area */}
      <div className="hidden lg:block" />

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search Input */}
        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="
              h-10 w-48 rounded-xl
              border border-gray-200
              py-2 pl-10 pr-4
              text-sm outline-none
              focus:border-[#7F26FD]
              focus:ring-2 focus:ring-[#7F26FD]/30
              md:w-64
              lg:h-11 lg:w-72
            "
          />
        </div>

        <NotificationDropdown />

        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;

// import NotificationDropdown from '@/components/common/NotificationDropdown/NotificationDropdown';

// import ProfileDropdown from '@/components/common/ProfileDropdown/ProfileDropdown';

// const Header = () => {
//   return (
//     <header
//       className="
//     h-20
//     bg-white
//     border-b
//     border-black/10
//     flex
//     items-center
//     justify-between
//     px-8
//     shadow-sm
//     sticky
//     top-0
//     z-50
//   "
//     >
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">
//           {/* Dashboard */}
//         </h2>
//       </div>

//       <div className="flex items-center gap-4">
//         <input
//           placeholder="Search..."
//           className="
//             h-11
//             w-72
//             border
//             border-gray-200
//             rounded-xl
//             px-4
//             outline-none
//             focus:ring-2
//             focus:ring-[#7F26FD]/30
//             focus:border-[#7F26FD]
//           "
//         />

//         <NotificationDropdown />

//         <ProfileDropdown />
//       </div>
//     </header>
//   );
// };

// export default Header;