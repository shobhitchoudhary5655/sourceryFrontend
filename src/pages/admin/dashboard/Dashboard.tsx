import PageHeader from '@/components/common/Header/PageHeader';
import StatCard from '@/components/common/StatCard/StatCard';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { Users, UserCheck, UserX, Calendar, } from 'lucide-react';
import DataTable from '@/components/ui/Table/DataTable';
import AttendanceChart from './widgets/AttendanceChart';
import LeaveChart from './widgets/LeaveChart';

const Dashboard = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems = [ ...pathnames];
  const columns = [
    { key: 'name', title: 'Employee' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' },
  ];
  const data = [
    { name: 'John Doe', email: 'john@gmail.com', status: 'Active' },
    { name: 'Aman Sharma', email: 'aman@gmail.com', status: 'Inactive' },
  ];
  return (
    <div className="space-y-6">

      <div className="flex items-start justify-between">
        <PageHeader
          title="Dashboard"
          // subtitle="HRMS Overview Analytics"
        />

        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value="120"
          icon={<Users />}
        />

        <StatCard
          title="Present Today"
          value="98"
          icon={<UserCheck />}
        />

        <StatCard
          title="Absent Today"
          value="12"
          icon={<UserX />}
        />

        <StatCard
          title="Holidays"
          value="8"
          icon={<Calendar />}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">
        <AttendanceChart />
        <LeaveChart />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Dashboard;