import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Users, UserCheck, UserX, Calendar, ClipboardList, RefreshCw, } from 'lucide-react';
import PageHeader from '@/components/common/Header/PageHeader';
import StatCard from '@/components/common/StatCard/StatCard';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import DataTable from '@/components/ui/Table/DataTable';
import AttendanceChart, { type AttendanceChartItem, } from './widgets/AttendanceChart';
import LeaveChart, { type LeaveChartItem, } from './widgets/LeaveChart';
import { getDashboardDetails, type DashboardData, } from '@/services/admin.service';

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
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [...pathnames];
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);
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

  // const handleRefresh = async () => {
  //   try {
  //     setRefreshing(true);
  //     await loadDashboardData();
  //   } finally {
  //     setRefreshing(false);
  //   }
  // };

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
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <RefreshCw size={20} className="animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>

        <button
          // onClick={handleRefresh}
          className="rounded-lg bg-[#7F26FD] px-4 py-2 text-sm font-medium text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader title="Dashboard" />

        <div className="flex items-center gap-3">
          {/* <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? 'animate-spin' : ''}
            />
            Refresh
          </button> */}

          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AttendanceChart data={attendanceData} />

        <LeaveChart data={leaveData} />
      </div>

      {/* HOLIDAYS TABLE */}
      <div className="rounded-2xl border bg-white p-6">
        <div className="mb-5 flex items-center gap-2">
          <Calendar size={20} className="text-[#7F26FD]" />

          <h2 className="text-lg font-semibold">
            Upcoming Holidays
          </h2>
        </div>

        {dashboardData?.upcomingHolidays?.length ? (
          <DataTable
            columns={holidayColumns}
            data={dashboardData.upcomingHolidays}
          />
        ) : (
          <div className="py-10 text-center text-sm text-gray-500">
            No upcoming holidays available.
          </div>
        )}
      </div>

      {/* PENDING REQUESTS */}
      <div className="rounded-2xl border bg-white p-6">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardList size={20} className="text-[#7F26FD]" />

          <h2 className="text-lg font-semibold">
            Pending Requests
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-5">
            <span className="font-medium">
              Leave Requests
            </span>

            <span className="text-2xl font-bold text-[#7F26FD]">
              {dashboardData?.pendingRequest?.leaveRequest ?? 0}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-5">
            <span className="font-medium">
              WFH Requests
            </span>

            <span className="text-2xl font-bold text-[#7F26FD]">
              {dashboardData?.pendingRequest?.wfhReqests ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import PageHeader from '@/components/common/Header/PageHeader';
// import StatCard from '@/components/common/StatCard/StatCard';
// import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
// import { useLocation } from 'react-router-dom';
// import { Users, UserCheck, UserX, Calendar, } from 'lucide-react';
// import DataTable from '@/components/ui/Table/DataTable';
// import AttendanceChart from './widgets/AttendanceChart';
// import LeaveChart from './widgets/LeaveChart';

// const Dashboard = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   const breadcrumbItems = [ ...pathnames];
//   const columns = [
//     { key: 'name', title: 'Employee' },
//     { key: 'email', title: 'Email' },
//     { key: 'status', title: 'Status' },
//   ];
//   const data = [
//     { name: 'John Doe', email: 'john@gmail.com', status: 'Active' },
//     { name: 'Aman Sharma', email: 'aman@gmail.com', status: 'Inactive' },
//   ];
//   return (
//     <div className="space-y-6">

//       <div className="flex items-start justify-between">
//         <PageHeader
//           title="Dashboard"
//           // subtitle="HRMS Overview Analytics"
//         />

//         <Breadcrumb items={breadcrumbItems} />
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-4 gap-6">
//         <StatCard
//           title="Total Employees"
//           value="120"
//           icon={<Users />}
//         />

//         <StatCard
//           title="Present Today"
//           value="98"
//           icon={<UserCheck />}
//         />

//         <StatCard
//           title="Absent Today"
//           value="12"
//           icon={<UserX />}
//         />

//         <StatCard
//           title="Holidays"
//           value="8"
//           icon={<Calendar />}
//         />
//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-2 gap-6">
//         <AttendanceChart />
//         <LeaveChart />
//       </div>
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// };

// export default Dashboard;