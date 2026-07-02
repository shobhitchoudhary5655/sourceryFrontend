import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import PageLoader from '@/components/common/Loader/PageLoader';
import DataTable from '@/components/ui/Table/DataTable';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { getAttendanceStatus, getEmployeeAttendance, getEmployeeDetails, } from '@/services/admin.service';
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
      status: '-',
      checkIn: '-',
      checkOut: '-',
      workingHours: 0,
    };
  });
};

const EmployeeAttendanceDetails = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [employeeName, setEmployeeName] = useState('');
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [weeklyOffDates, setWeeklyOffDates] = useState<string[]>([]);
  const [holidayDates, setHolidayDates] = useState<string[]>([]);
  const [summary, setSummary] = useState<AttendanceStatusSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const fetchAttendanceDetails = useCallback(async () => {
    if (!employeeId) {
      setFirstLoad(false);
      return;
    }

    try {
      setLoading(true);

      const [
        attendanceResponse,
        statusResponse,
        employeeResponse,
      ] = await Promise.all([
        getEmployeeAttendance(Number(employeeId)),
        getAttendanceStatus(Number(employeeId), month, year),
        getEmployeeDetails(Number(employeeId)),
      ]);

      setAttendance(attendanceResponse?.attendance || []);
      setWeeklyOffDates(statusResponse?.weeklyOffDates || []);
      setHolidayDates(statusResponse?.holidayDates || []);
      setSummary(statusResponse?.status || null);

      setEmployeeName(employeeResponse?.employee?.name || '');
    } catch (error) {
      console.error('Failed to fetch attendance details:', error);

      setAttendance([]);
      setWeeklyOffDates([]);
      setHolidayDates([]);
      setSummary(null);
      setEmployeeName('');
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  }, [employeeId, month, year]);

  useEffect(() => {
    fetchAttendanceDetails();
  }, [fetchAttendanceDetails]);

  const monthlyRows = useMemo(() => {
    return getMonthAttendanceRows(
      month,
      year,
      attendance,
      weeklyOffDates,
      holidayDates
    );
  }, [month, year, attendance, weeklyOffDates, holidayDates]);

  const columns = useMemo(
    () => [
      {
        key: 'date' as keyof MonthlyAttendanceRow,
        title: 'Date',
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {value as string}
          </span>
        ),
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
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {value as string}
          </span>
        ),
      },
      {
        key: 'checkOut' as keyof MonthlyAttendanceRow,
        title: 'Check Out',
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {value as string}
          </span>
        ),
      },
      {
        key: 'workingHours' as keyof MonthlyAttendanceRow,
        title: 'Working Hours',
        render: (value: unknown) => `${value ?? 0} hrs`,
      },
    ],
    []
  );

  const summaryCards = [
    {
      label: 'Present',
      value: summary?.present ?? 0,
      className: 'bg-purple-50 border-purple-100',
      labelClassName: 'text-purple-700',
    },
    {
      label: 'Absent',
      value: summary?.absent ?? 0,
      className: 'bg-white border-purple-100',
      labelClassName: 'text-gray-600',
    },
    {
      label: 'Leave',
      value: summary?.leave ?? 0,
      className: 'bg-purple-50 border-purple-100',
      labelClassName: 'text-purple-700',
    },
    {
      label: 'Weekly Off',
      value: summary?.weeklyOff ?? 0,
      className: 'bg-white border-purple-100',
      labelClassName: 'text-gray-600',
    },
    {
      label: 'Holiday',
      value: summary?.holiday ?? 0,
      className: 'bg-purple-50 border-purple-100',
      labelClassName: 'text-purple-700',
    },
    {
      label: 'Work From Home',
      value: summary?.wfh ?? 0,
      className: 'bg-white border-purple-100',
      labelClassName: 'text-gray-600',
    },
    {
      label: 'Working Days',
      value: summary?.workingDays ?? 0,
      className: 'bg-purple-50 border-purple-100',
      labelClassName: 'text-purple-700',
    },
    {
      label: 'Attendance Percentage',
      value: `${summary?.attendancePercentage ?? '0.00'}%`,
      className: 'bg-white border-purple-100',
      labelClassName: 'text-gray-600',
    },
  ];

  if (firstLoad && loading) {
    return <PageLoader text="Loading attendance details..." />;
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <PageHeader
            title="Employee Attendance Details"
          // subtitle={ employeeName   ? `Attendance record of ${employeeName}`   : 'Employee attendance record' }
          />

          {employeeName && (
            <div className="mt-2 inline-flex max-w-full items-center rounded-lg bg-[#F4EDFF] px-3 py-2 text-sm font-medium text-[#7F26FD] sm:text-base">
              <span className="mr-1 shrink-0 text-gray-600">
                Employee:
              </span>

              <span className="truncate">
                {employeeName}
              </span>
            </div>
          )}
        </div>

        <div className="w-full sm:w-auto">
          <Breadcrumb />
        </div>
      </div>

      <div
        className="
          flex flex-col gap-4 rounded-xl border border-gray-100
          bg-white p-4 shadow-sm
          sm:rounded-2xl sm:p-5
          lg:flex-row lg:items-center lg:justify-between
        "
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
          <select
            value={month}
            onChange={(event) => setMonth(Number(event.target.value))}
            className="
              w-full rounded-xl border border-purple-200
              bg-purple-50 px-4 py-2.5 text-sm font-medium text-gray-700
              outline-none focus:border-[#7F26FD]
              sm:min-w-[180px]
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
              w-full rounded-xl border border-purple-200
              bg-purple-50 px-4 py-2.5 text-sm font-medium text-gray-700
              outline-none focus:border-[#7F26FD]
              sm:min-w-[140px]
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
            w-full rounded-xl bg-[#7F26FD] px-5 py-2.5
            text-sm font-medium text-white transition hover:opacity-90
            sm:w-auto sm:min-w-[120px]
          "
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`
              min-w-0 rounded-xl border p-4 shadow-sm
              sm:rounded-2xl sm:p-5
              ${card.className}
            `}
          >
            <p className={`truncate text-sm font-medium ${card.labelClassName}`}>
              {card.label}
            </p>

            <p className="mt-2 break-words text-2xl font-bold text-[#7F26FD] sm:text-3xl">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
        <div className="min-w-[720px]">
          <DataTable<MonthlyAttendanceRow>
            columns={columns}
            data={monthlyRows}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceDetails;