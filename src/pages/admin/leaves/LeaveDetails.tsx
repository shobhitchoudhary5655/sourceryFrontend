import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { updateLeaveStatus, getLeaveRequests, } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';
import { formatISTDate } from '@/utils/dateTime';

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchLeave = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getLeaveRequests('', 'all', 1, 100);

      const leave = res.requests?.find(
        (item: any) => item.id === Number(id)
      );

      setData(leave || null);
    } catch (err) {
      console.error('Get leave details error:', err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLeave();
  }, [fetchLeave]);

  const handleAction = async (status: 'approved' | 'rejected') => {
    try {
      setActionLoading(true);

      await updateLeaveStatus(Number(id), status);

      await fetchLeave();
    } catch (err) {
      console.error('Update leave status error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <PageLoader text='Loading leave details...' />
  }

  if (!data) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-gray-500 sm:text-base">
          No leave request found.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    );
  }

  const detailItems = [
    {
      label: 'Employee',
      value: data.user?.name || '-',
    },
    {
      label: 'Email',
      value: data.user?.email || '-',
      email: true,
    },
    {
      label: 'Request Type',
      value: data.requestType || '-',
    },
    {
      label: 'Leave Type',
      value: data.leaveType || '-',
    },
    {
      label: 'From Date',
      value: formatISTDate(data.startDate),
    },
    {
      label: 'To Date',
      value: formatISTDate(data.endDate),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 sm:space-y-6">
      <PageHeader title="Leave Details" />

      <div className="rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {detailItems.map((item) => (
            <div key={item.label} className="min-w-0 space-y-1.5">
              <p className="text-sm font-medium text-gray-500">
                {item.label}
              </p>

              <p
                className={`font-medium text-gray-800 ${item.email ? 'break-all' : 'break-words'
                  }`}
              >
                {item.value}
              </p>
            </div>
          ))}

          <div className="min-w-0 space-y-1.5">
            <p className="text-sm font-medium text-gray-500">
              Status
            </p>

            <div>
              <StatusBadge status={data.status} />
            </div>
          </div>

          {data.reason && (
            <div className="min-w-0 space-y-1.5 md:col-span-2">
              <p className="text-sm font-medium text-gray-500">
                Reason
              </p>

              <p className="break-words font-medium text-gray-800">
                {data.reason}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={actionLoading}
          className="w-full rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          Back
        </button>

        {data.status === 'pending' && (
          <>
            <button
              type="button"
              onClick={() => handleAction('rejected')}
              disabled={actionLoading}
              className="w-full rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {actionLoading ? 'Processing...' : 'Reject'}
            </button>

            <button
              type="button"
              onClick={() => handleAction('approved')}
              disabled={actionLoading}
              className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {actionLoading ? 'Processing...' : 'Approve'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaveDetails;