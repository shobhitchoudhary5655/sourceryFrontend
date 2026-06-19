import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  path: string;
  icon: LucideIcon;
}

const SidebarItem = ({
  title,
  path,
  icon: Icon,
}: Props) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all

        ${
          isActive
            ? 'bg-[#7F26FD] text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }
      `
      }
    >
      <Icon size={18} />
      <span>{title}</span>
    </NavLink>
  );
};

export default SidebarItem;