import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageHeader from '@/components/common/Header/PageHeader';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { updateLeaveStatus, getLeaveRequests } from '@/services/admin.service';

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeave = async () => {
    try {
      setLoading(true);
      const res = await getLeaveRequests('', 'all', 1, 100);
      const leave = res.requests.find(   (item: any) => item.id === Number(id) );
      setData(leave);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [id]);

  const handleAction = async (status: 'approved' | 'rejected') => {
    try {
      await updateLeaveStatus(Number(id), status);
      fetchLeave();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  if (!data) return <div className="p-6">No Data Found</div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Leave Details" />

      <div className="rounded-2xl border bg-white p-6 space-y-3">
        <p><b>Employee:</b> {data.user?.name}</p>
        <p><b>Email:</b> {data.user?.email}</p>
        <p><b>Type:</b> {data.type}</p>
        <p><b>From:</b> {data.from}</p>
        <p><b>To:</b> {data.to}</p>

        <p>
          <b>Status:</b>{' '}
          <StatusBadge status={data.status} />
        </p>
      </div>

      {data.status === 'pending' && (
        <div className="flex gap-4">
          <button
            onClick={() => handleAction('approved')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Approve
          </button>

          <button
            onClick={() => handleAction('rejected')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Reject
          </button>

          <button
            onClick={() => navigate(-1)}
            className="border px-4 py-2 rounded-lg"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaveDetails;