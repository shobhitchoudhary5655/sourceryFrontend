import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import Login from '@/pages/auth/Login';
import { ROUTES } from './routes';
import MainLayout from '@/components/common/MainLayout/MainLayout';
import Dashboard from '@/pages/admin/dashboard/Dashboard';
// import Employees from '@/pages/employees/EmployeeList';
// import Attendance from '@/pages/attendance/AttendanceList';
// import Holidays from '@/pages/holidays/HolidayList';
// import Roles from '@/pages/roles/RoleList';
import Unauthorized from '@/pages/common/Unauthorized';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { ROLES } from '@/utils/permissions';
import Employees from '@/pages/admin/employees/EmployeeList';
import Attendance from '@/pages/admin/attendance/AttendanceList';
import LeaveRequests from '@/pages/admin/leaves/LeaveRequests';
import { Settings } from 'lucide-react';
import Profile from '@/pages/common/Profile/Profile';
import Holidays from '@/pages/admin/holidays/HolidayList';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public Routes */}
                <Route element={<PublicRoute />}   >
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                </Route>

                {/* Dashboard */}
                <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN,]} />} >
                    <Route element={<MainLayout />}>
                        <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
                        <Route path={ROUTES.ADMIN.EMPLOYEES} element={<Employees />} />
                        <Route path={ROUTES.ADMIN.ATTENDANCE} element={<Attendance />} />
                        <Route path={ROUTES.ADMIN.LEAVEREQUESTS} element={<LeaveRequests />} />
                        <Route path={ROUTES.ADMIN.HOLIDAYS} element={<Holidays />} />
                         <Route path={ROUTES.PROFILE} element={<Profile />} />
                        <Route path={ROUTES.ADMIN.SETTINGS} element={<Settings />} />
                    </Route>
                </Route>

                {/* Admin + HR */}
                {/* <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.HR,]} />} >
                    <Route element={<MainLayout />}>
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/holidays" element={<Holidays />} />
                    </Route>
                </Route> */}

                {/* Admin Only */}
                {/* <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN,]} />}  >
                    <Route element={<MainLayout />}>
                        <Route path="/roles" element={<Roles />} />
                    </Route>
                </Route> */}

                <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;