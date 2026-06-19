import { ROLES } from '@/utils/permissions';

export const ROUTES = {
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  PROFILE: '/profile',

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EMPLOYEES: '/admin/employees',
    ATTENDANCE: '/admin/attendance',
    LEAVEREQUESTS: '/admin/leave-requests',
    ROLES: '/admin/roles',
    HOLIDAYS: '/admin/holidays',
    SETTINGS: '/admin/setting',
  },

  HR: {
    DASHBOARD: '/hr/dashboard',
    EMPLOYEES: '/hr/employees',
    ATTENDANCE: '/hr/attendance',
    HOLIDAYS: '/hr/holidays',
  },

  EMPLOYEE: {
    DASHBOARD: '/employee/dashboard',
    PROFILE: '/employee/profile',
    ATTENDANCE: '/employee/attendance',
    HOLIDAYS: '/employee/holidays',
  },
};

export const getHomeRoute = (role?: string) => {
  switch (role) {
    case ROLES.ADMIN:
      return ROUTES.ADMIN.DASHBOARD;

    // case ROLES.HR:
    //   return ROUTES.HR.DASHBOARD;

    // case ROLES.EMPLOYEE:
    //   return ROUTES.EMPLOYEE.DASHBOARD;

    default:
      return ROUTES.LOGIN;
  }
};