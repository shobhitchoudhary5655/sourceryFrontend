import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { getAttendanceStatus, getEmployeeAttendance, } from '@/services/admin.service';
import { formatISTTime } from '@/utils/dateTime';
interface AttendanceRecord {
  id: number;
  userId: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  workingHours: number;
  location: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AttendanceStatusSummary {
  present: number;
  absent: number;
  leave: number;
  wfh: number;
  holiday: number;
  weeklyOff: number;
  workingDays: number;
  attendancePercentage: string;
}
interface MonthlyAttendanceRow {
  id: number | string;
  date: string;
  status: string;
  checkIn: string;
  checkOut: string;
  workingHours: number;
}

const formatStatus = (status: string) => {
  const labels: Record<string, string> = {
    present: 'Present',
    absent: 'Absent',
    leave: 'Leave',
    wfh: 'WFH',
    holiday: 'Holiday',
    weeklyOff: 'Weekly Off',
  };

  return labels[status] || status;
};


const getMonthAttendanceRows = (
  month: number,
  year: number,
  attendance: AttendanceRecord[],
  weeklyOffDates: string[],
  holidayDates: string[]
): MonthlyAttendanceRow[] => {
  const daysInMonth = new Date(year, month, 0).getDate();

  const attendanceMap = new Map<string, AttendanceRecord>(
    attendance.map((item) => [item.date, item])
  );

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;

    const date = `${year}-${String(month).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;

    const attendanceItem = attendanceMap.get(date);

    if (attendanceItem) {
      return {
        id: attendanceItem.id,
        date,
        status: attendanceItem.status,
        checkIn: formatISTTime(attendanceItem.checkIn),
        checkOut: formatISTTime(attendanceItem.checkOut),
        workingHours: attendanceItem.workingHours || 0,
      };
    }

    if (holidayDates.includes(date)) {
      return {
        id: `holiday-${date}`,
        date,
        status: 'holiday',
        checkIn: '-',
        checkOut: '-',
        workingHours: 0,
      };
    }

    if (weeklyOffDates.includes(date)) {
      return {
        id: `weekly-off-${date}`,
        date,
        status: 'weeklyOff',
        checkIn: '-',
        checkOut: '-',
        workingHours: 0,
      };
    }

    return {
      id: `absent-${date}`,
      date,
      status: 'absent',
      checkIn: '-',
      checkOut: '-',
      workingHours: 0,
    };
  });
};

const EmployeeAttendanceDetails = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [weeklyOffDates, setWeeklyOffDates] = useState<string[]>([]);
  const [holidayDates, setHolidayDates] = useState<string[]>([]);
  const [summary, setSummary] = useState<AttendanceStatusSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAttendanceDetails = async () => {
    if (!employeeId) return;

    try {
      setLoading(true);
      const [attendanceResponse, statusResponse] = await Promise.all([
        getEmployeeAttendance(Number(employeeId)),
        getAttendanceStatus(Number(employeeId), month, year),
      ]);
      setAttendance(attendanceResponse?.attendance || []);
      setWeeklyOffDates(statusResponse?.weeklyOffDates || []);
      setHolidayDates(statusResponse?.holidayDates || []);
      setSummary(statusResponse?.status || null);
    } catch (error) {
      console.error('Failed to fetch attendance details:', error);
      setAttendance([]);
      setWeeklyOffDates([]);
      setHolidayDates([]);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceDetails();
  }, [employeeId, month, year]);

  const monthlyRows = useMemo(() => {
    return getMonthAttendanceRows(
      month,
      year,
      attendance,
      weeklyOffDates,
      holidayDates
    );
  }, [month, year, attendance, weeklyOffDates, holidayDates]);

  const columns = [
    {
      key: 'date' as keyof MonthlyAttendanceRow,
      title: 'Date',
    },
    {
      key: 'status' as keyof MonthlyAttendanceRow,
      title: 'Status',
      render: (value: unknown) => (
        <StatusBadge status={formatStatus(value as string)} />
      ),
    },
    {
      key: 'checkIn' as keyof MonthlyAttendanceRow,
      title: 'Check In',
    },
    {
      key: 'checkOut' as keyof MonthlyAttendanceRow,
      title: 'Check Out',
    },
    {
      key: 'workingHours' as keyof MonthlyAttendanceRow,
      title: 'Working Hours',
      render: (value: unknown) => `${value ?? 0} hrs`,
    },
  ];

  return (
    <div>
      <div className="flex items-start justify-between">
        <PageHeader title="Employee Attendance Details" />
        <Breadcrumb />
      </div>

      <div className="mt-5 space-y-5">
        {/* Month, Year and Back Button */}
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-5
            shadow-sm
          "
        >
          <div className="flex flex-wrap gap-3">
            <select
              value={month}
              onChange={(event) => setMonth(Number(event.target.value))}
              className="
                rounded-xl
                border
                border-purple-200
                bg-purple-50
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                outline-none
                focus:border-[#7F26FD]
              "
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {new Date(year, index, 1).toLocaleString('en-IN', {
                    month: 'long',
                  })}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
              className="
                rounded-xl
                border
                border-purple-200
                bg-purple-50
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                outline-none
                focus:border-[#7F26FD]
              "
            >
              {[2025, 2026, 2027].map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              rounded-xl
              bg-[#7F26FD]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
            "
          >
            Back
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-purple-700">Present</p>
            <p className="mt-2 text-3xl font-bold text-[#7F26FD]">
              {summary?.present ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Absent</p>
            <p className="mt-2 text-3xl font-bold text-[#7F26FD]">
              {summary?.absent ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-purple-700">Leave</p>
            <p className="mt-2 text-3xl font-bold text-[#7F26FD]">
              {summary?.leave ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Weekly Off</p>
            <p className="mt-2 text-3xl font-bold text-[#7F26FD]">
              {summary?.weeklyOff ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-purple-700">Holiday</p>
            <p className="mt-2 text-3xl font-bold text-[#7F26FD]">
              {summary?.holiday ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-600">
              Work From Home
            </p>
            <p className="mt-2 text-3xl font-bold text-[#7F26FD]">
              {summary?.wfh ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-purple-700">
              Working Days
            </p>
            <p className="mt-2 text-3xl font-bold text-[#7F26FD]">
              {summary?.workingDays ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-600">
              Attendance Percentage
            </p>
            <p className="mt-2 text-3xl font-bold text-[#7F26FD]">
              {summary?.attendancePercentage ?? '0.00'}%
            </p>
          </div>
        </div>

        {/* Your reusable DataTable */}
        <DataTable<MonthlyAttendanceRow>
          columns={columns}
          data={monthlyRows}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EmployeeAttendanceDetails;