import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { sidebarMenus } from '@/constants/menu';

const Sidebar = () => {
  const { user } = useAuth();

  const role = user?.role?.toUpperCase();

  const menuItems =
    sidebarMenus[role as keyof typeof sidebarMenus] || [];

  return (
    <aside
      className="
        w-72
        bg-white
        h-screen
        fixed
        left-0
        top-0
        border-r
        border-gray-200
        shadow-sm
        flex
        flex-col
      "
    >
      {/* Logo Section */}
      <div
        className="
          p-6
          border-b
          border-gray-200
        "
      >
        <h1 className="text-2xl font-bold text-[#7F26FD]">
          Sourcery IT
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition-all
                duration-200
                border

                ${
                  isActive
                    ? 'bg-[#7F26FD] text-white border-[#7F26FD] shadow-md'
                    : 'text-gray-600 border-transparent hover:bg-[#F4EDFF] hover:text-[#7F26FD] hover:border-[#E9DDFF]'
                }
              `
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;