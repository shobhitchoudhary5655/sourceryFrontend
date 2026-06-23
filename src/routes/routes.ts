import { ROLES } from '@/utils/permissions';

export const ROUTES = {
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  PROFILE: '/profile',

  ADMIN: {
    DASHBOARD: '/dashboard',
    EMPLOYEES: '/employees',
    ADDEMPLOYEE: "/employees/add",
    EDITEMPLOYEE: "/employees/edit/:id",
    DETAILSEMPLOYEE: "/employees/:id",
    ATTENDANCE: '/attendance',
    EMPLOYEEATTENDANCEDETAILS: '/attendance/:employeeId',
    LEAVEREQUESTS: '/requests',
    REQUESTSDETAILS:'/requests/:id',
    ROLES: '/roles',
    HOLIDAYS: '/holidays',
    ADDHOLIDAY: "/holidays/add",
    EDITHOLIDAY: "/holidays/edit/:id",
    SETTINGS: '/setting',
  },

  HR: {
    DASHBOARD: '/dashboard',
    EMPLOYEES: '/employees',
    ATTENDANCE: '/attendance',
    HOLIDAYS: '/holidays',
  },

  EMPLOYEE: {
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    ATTENDANCE: '/attendance',
    HOLIDAYS: '/holidays',
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