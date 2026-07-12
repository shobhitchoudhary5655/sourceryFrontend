import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { sidebarMenus } from '@/constants/menu';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };
  const role = user?.role?.toUpperCase();

  const menuItems =
    sidebarMenus[role as keyof typeof sidebarMenus] || [];

  return (
    <aside
      className="
        flex h-screen w-72 flex-col
        border-r border-gray-200
        bg-white shadow-sm
      "
    >
      {/* Logo */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-[#7F26FD]">
          Sourcery IT
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menuItems.map((item: any) => {
          const Icon = item.icon;

          if (item.children) {
            return (
              <div key={item.name}>
                <button
                  type="button"
                  onClick={() => toggleMenu(item.name)}
                  className="
            flex w-full items-center justify-between
            rounded-xl border border-transparent
            px-4 py-3 text-gray-600
            transition hover:bg-[#F4EDFF]
            hover:text-[#7F26FD]
          "
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </div>

                  {openMenu === item.name ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {openMenu === item.name && (
                  <div className="mt-2 ml-6 space-y-1 border-l border-gray-200 pl-4">
                    {item.children.map((child: any) => {
                      const ChildIcon = child.icon;

                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `
                      flex items-center gap-3 rounded-lg
                      px-3 py-2 transition

                      ${isActive
                              ? "bg-[#7F26FD] text-white"
                              : "text-gray-600 hover:bg-[#F4EDFF] hover:text-[#7F26FD]"
                            }
                    `
                          }
                        >
                          <ChildIcon size={18} />
                          <span>{child.name}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
          flex items-center gap-3 rounded-xl border
          px-4 py-3 transition-all

          ${isActive
                  ? "border-[#7F26FD] bg-[#7F26FD] text-white shadow-md"
                  : "border-transparent text-gray-600 hover:border-[#E9DDFF] hover:bg-[#F4EDFF] hover:text-[#7F26FD]"
                }
        `
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

// import { NavLink } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
// import { sidebarMenus } from '@/constants/menu';

// const Sidebar = () => {
//   const { user } = useAuth();

//   const role = user?.role?.toUpperCase();

//   const menuItems =
//     sidebarMenus[role as keyof typeof sidebarMenus] || [];

//   return (
//     <aside
//       className="
//         w-72
//         bg-white
//         h-screen
//         fixed
//         left-0
//         top-0
//         border-r
//         border-gray-200
//         shadow-sm
//         flex
//         flex-col
//       "
//     >
//       {/* Logo Section */}
//       <div
//         className="
//           p-6
//           border-b
//           border-gray-200
//         "
//       >
//         <h1 className="text-2xl font-bold text-[#7F26FD]">
//           Sourcery IT
//         </h1>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 p-4 space-y-2">
//         {menuItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `
//                 flex items-center gap-3
//                 px-4 py-3
//                 rounded-xl
//                 transition-all
//                 duration-200
//                 border

//                 ${
//                   isActive
//                     ? 'bg-[#7F26FD] text-white border-[#7F26FD] shadow-md'
//                     : 'text-gray-600 border-transparent hover:bg-[#F4EDFF] hover:text-[#7F26FD] hover:border-[#E9DDFF]'
//                 }
//               `
//               }
//             >
//               <Icon size={20} />
//               <span>{item.name}</span>
//             </NavLink>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;