import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { getEmployees } from '@/services/admin.service';
import { FiEye, } from 'react-icons/fi';

interface EmployeeAttendanceRow {
  id: number;
  name: string;
  designation: string;
  status: string;
  checkIn: string;
  checkOut: string;
}

const formatTime = (time?: string | null) => {
  if (!time) return '-';
  const date = new Date(`1970-01-01T${time}`);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const Attendance = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<EmployeeAttendanceRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);

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
          status: todayAttendance?.status || 'Absent',
          checkIn: formatTime(todayAttendance?.checkIn),
          checkOut: formatTime(todayAttendance?.checkOut),
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

  const columns = [
    { key: 'name', title: 'Employee Name' },
    { key: 'designation', title: 'Designation' },
    {
      key: 'status',
      title: 'Today Status',
      render: (value: unknown) => (
        <StatusBadge status={value as string} />
      ),
    },
    { key: 'checkIn', title: 'Check In' },
    { key: 'checkOut', title: 'Check Out' },
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

  return (
    <div>
      <div className="flex items-start justify-between">
        <PageHeader title="Attendance" />
        <Breadcrumb/>
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
