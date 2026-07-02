import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { getEmployees } from '@/services/admin.service';
import { FiEye, } from 'react-icons/fi';
import { formatISTTime } from '@/utils/dateTime';
import PageLoader from '@/components/common/Loader/PageLoader';

interface EmployeeAttendanceRow {
  id: number;
  name: string;
  designation: string;
  status: string;
  checkIn: string;
  checkOut: string;
  checkInRaw: string | null;
  checkOutRaw: string | null;
  workingHours: number;
}

const formatStatus = (status?: string) => {
  const labels: Record<string, string> = {
    present: 'Present',
    absent: 'Absent',
    halfday: 'Half Day',
    leave: 'Leave',
    'auto-punch-out': 'Auto Punch Out',
    holiday: 'Holiday',
    'weekly-off': 'Weekly Off',
    'work-from-home': 'Work From Home',
  };

  return labels[status || 'absent'] || 'Absent';
};

const formatDuration = (totalSeconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].join(':');
};

const getWorkingTime = (checkIn: string | null, checkOut: string | null, savedWorkingHours: number) => {
  if (!checkIn) return '-';

  if (checkOut) {
    return formatDuration(savedWorkingHours * 60 * 60);
  }

  const checkInTime = new Date(checkIn).getTime();
  if (Number.isNaN(checkInTime)) return '-';
  const currentTime = Date.now();
  const seconds = (currentTime - checkInTime) / 1000;
  return formatDuration(seconds);
};

const Attendance = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<EmployeeAttendanceRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [, setCurrentTime] = useState(Date.now());
  const pageSize = 10;

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees(search, '', page, 10);
      const formattedEmployees = response.users.map((employee: any) => {
        const todayAttendance = employee.attendances?.[0];

        return {
          id: employee.id,
          name: employee.name,
          designation: employee.designation || '-',
          status: todayAttendance?.status || '-',
          checkIn: formatISTTime(todayAttendance?.checkIn),
          checkOut: formatISTTime(todayAttendance?.checkOut),
          checkInRaw: todayAttendance?.checkIn || null,
          checkOutRaw: todayAttendance?.checkOut || null,
          workingHours: Number(todayAttendance?.workingHours || 0),
        };
      });

      setEmployees(formattedEmployees);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, page]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const columns = [
    {
      key: "sno",
      title: "S No.",
      render: (_value: unknown, _row: EmployeeAttendanceRow, index: number) => (page - 1) * pageSize + index + 1,
    },
    { key: 'name', title: 'Employee Name' },
    { key: 'designation', title: 'Designation' },
    {
      key: 'status',
      title: 'Today Status',
      render: (value: unknown) => (
        <StatusBadge status={formatStatus(value as string)} />
      ),
    },
    { key: 'checkIn', title: 'Check In' },
    { key: 'checkOut', title: 'Check Out' },
    {
      key: 'workingHours',
      title: 'Working Hours',
      render: (_: unknown, row: EmployeeAttendanceRow) => (
        <span>
          {getWorkingTime(
            row.checkInRaw,
            row.checkOutRaw,
            row.workingHours
          )}
        </span>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_: unknown, row: EmployeeAttendanceRow) => (
        <button
          onClick={() => navigate(`/attendance/${row.id}`)}
          className="text-blue-600 hover:text-blue-800"
          title="View"
        >
          <FiEye size={18} />
        </button>
      ),
    },
  ];

  if (loading) {
    return <PageLoader text='Loading Attendance List...' />
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <PageHeader title="Attendance" />
        <Breadcrumb />
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <TableSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />

          <button
            className="rounded-xl bg-[#7F26FD] px-4 py-2 text-white hover:opacity-90"
          >
            Add Attendance
          </button>
        </div>

        <DataTable
          columns={columns}
          data={employees}
          loading={loading}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Attendance;
