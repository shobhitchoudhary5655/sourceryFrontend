import { useCallback, useEffect, useState } from 'react';
import { Users, UserCheck, UserX, Calendar, ClipboardList, } from 'lucide-react';
import PageHeader from '@/components/common/Header/PageHeader';
import StatCard from '@/components/common/StatCard/StatCard';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import DataTable from '@/components/ui/Table/DataTable';
import AttendanceChart, { type AttendanceChartItem, } from './widgets/AttendanceChart';
import LeaveChart, { type LeaveChartItem, } from './widgets/LeaveChart';
import { getDashboardDetails, type DashboardData, } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';

const DEFAULT_ATTENDANCE_DATA: AttendanceChartItem[] = [
  { day: 'Mon', present: 0 },
  { day: 'Tue', present: 0 },
  { day: 'Wed', present: 0 },
  { day: 'Thu', present: 0 },
  { day: 'Fri', present: 0 },
  { day: 'Sat', present: 0 },
  { day: 'Sun', present: 0 },
];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboardData = useCallback(async () => {
    try {
      setError('');
      const response = await getDashboardDetails();
      setDashboardData(response);
    } catch (err: any) {
      console.error('Dashboard API Error:', err);
      setError(err?.message || 'Failed to load dashboard details');
    }
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        await loadDashboardData();
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [loadDashboardData]);

  const stats = [
    {
      title: 'Total Employees',
      value: dashboardData?.stats?.totalEmployees ?? 0,
      icon: <Users />,
    },
    {
      title: 'Present Today',
      value: dashboardData?.stats?.presentToday ?? 0,
      icon: <UserCheck />,
    },
    {
      title: 'Absent Today',
      value: dashboardData?.stats?.absentToday ?? 0,
      icon: <UserX />,
    },
    {
      title: 'Upcoming Holidays',
      value: dashboardData?.upcomingHolidays?.length ?? 0,
      icon: <Calendar />,
    },
  ];

  const attendanceData: AttendanceChartItem[] = DEFAULT_ATTENDANCE_DATA;

  const leaveData: LeaveChartItem[] = [
    {
      name: 'Pending',
      value: dashboardData?.pendingRequest?.leaveRequest ?? 0,
    },
    {
      name: 'WFH Pending',
      value: dashboardData?.pendingRequest?.wfhReqests ?? 0,
    },
  ];

  const holidayColumns = [
    { key: 'holidayName', title: 'Holiday Name' },
    { key: 'date', title: 'Date' },
  ];

  if (loading) {
  return <PageLoader text="Loading dashboard details..." />;
}

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-red-500 sm:text-base">
          {error}
        </p>

        <button
          onClick={loadDashboardData}
          className="rounded-lg bg-[#7F26FD] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-3 pb-6 sm:space-y-6 sm:px-5 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Dashboard" />

        <div className="w-full sm:w-auto">
          <Breadcrumb />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:gap-6 xl:grid-cols-2">
        <div className="min-w-0 overflow-hidden rounded-2xl">
          <AttendanceChart data={attendanceData} />
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl">
          <LeaveChart data={leaveData} />
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex items-center gap-2 sm:mb-5">
          <Calendar
            size={20}
            className="shrink-0 text-[#7F26FD]"
          />

          <h2 className="text-base font-semibold sm:text-lg">
            Upcoming Holidays
          </h2>
        </div>

        {dashboardData?.upcomingHolidays?.length ? (
          <div className="w-full overflow-x-auto">
            <DataTable
              columns={holidayColumns}
              data={dashboardData.upcomingHolidays}
            />
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-gray-500 sm:py-10">
            No upcoming holidays available.
          </div>
        )}
      </div>

      <div className="rounded-xl border bg-white p-4 sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex items-center gap-2 sm:mb-5">
          <ClipboardList
            size={20}
            className="shrink-0 text-[#7F26FD]"
          />

          <h2 className="text-base font-semibold sm:text-lg">
            Pending Requests
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 sm:p-5">
            <span className="text-sm font-medium sm:text-base">
              Leave Requests
            </span>

            <span className="text-xl font-bold text-[#7F26FD] sm:text-2xl">
              {dashboardData?.pendingRequest?.leaveRequest ?? 0}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 sm:p-5">
            <span className="text-sm font-medium sm:text-base">
              WFH Requests
            </span>

            <span className="text-xl font-bold text-[#7F26FD] sm:text-2xl">
              {dashboardData?.pendingRequest?.wfhReqests ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
