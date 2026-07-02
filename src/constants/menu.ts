import { ROUTES } from '@/routes/routes';
import {LayoutDashboard,Users,Clock,Calendar,Shield,Settings,Currency} from 'lucide-react';

export const sidebarMenus = {
  ADMIN: [
    {
      name: 'Dashboard',
      path: ROUTES.ADMIN.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      name: 'Employees',
      path: ROUTES.ADMIN.EMPLOYEES,
      icon: Users,
    },
    {
      name: 'Attendance',
      path: ROUTES.ADMIN.ATTENDANCE,
      icon: Clock,
    },
    {
      name: 'Requests',
      path: ROUTES.ADMIN.LEAVEREQUESTS,
      icon: Shield,
    },
    {
      name: 'Holidays',
      path: ROUTES.ADMIN.HOLIDAYS,
      icon: Shield,
    },
    {
      name: 'Salary',
      path: ROUTES.ADMIN.SALARY,
      icon: Currency,
    },
    {
      name: 'Settings',
      path: ROUTES.ADMIN.SETTINGS,
      icon: Settings,
    },
  ],

  HR: [
    {
      name: 'Dashboard',
      path: ROUTES.HR.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      name: 'Employees',
      path: ROUTES.HR.EMPLOYEES,
      icon: Users,
    },
    {
      name: 'Attendance',
      path: ROUTES.HR.ATTENDANCE,
      icon: Clock,
    },
    {
      name: 'Holidays',
      path: ROUTES.HR.HOLIDAYS,
      icon: Calendar,
    },
  ],

  EMPLOYEE: [
    {
      name: 'Dashboard',
      path: ROUTES.EMPLOYEE.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      name: 'My Attendance',
      path: ROUTES.EMPLOYEE.ATTENDANCE,
      icon: Clock,
    },
    {
      name: 'Holidays',
      path: ROUTES.EMPLOYEE.HOLIDAYS,
      icon: Calendar,
    },
  ],
};