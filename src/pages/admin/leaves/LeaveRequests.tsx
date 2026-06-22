import { useEffect, useMemo, useState } from 'react';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { getLeaveRequests } from '@/services/admin.service';
import { useNavigate } from 'react-router-dom';
import { FiEye, } from 'react-icons/fi';

interface LeaveRow {
  id: number;
  name: string;
  type: string;
  from: string;
  to: string;
  status: string;
}

const LeaveRequests = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [data, setData] = useState<LeaveRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const response = await getLeaveRequests(search, 'all', page, 10,);
      const mapped = response.requests.map((item: any) => ({
        id: item.id,
        name: item.user?.name || '-',
        type: item.type || item.leaveType || '-',
        from: item.fromDate || item.startDate || '-',
        to: item.toDate || item.endDate || '-',
        status: item.status,
      }));

      setData(mapped);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeaves();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, page]);

  const columns = [
    { key: 'name', title: 'Employee' },
    { key: 'type', title: 'Type' },
    { key: 'from', title: 'From' },
    { key: 'to', title: 'To' },
    {
      key: 'status',
      title: 'Status',
      render: (value: unknown) => (
        <StatusBadge status={value as string} />
      ),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_: unknown, row: any) => (
        <button
          onClick={() => navigate(`/leave-requests/${row.id}`)}
          className="text-blue-600 hover:text-blue-800"
          title="View"
        >
          <FiEye size={18} />
        </button>
      ),
    }
  ];

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageSize = 10;

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>
      <div className="flex items-start justify-between">
        <PageHeader title="Leave Requests" />
        <Breadcrumb />
      </div>

      <div className="space-y-5">
        {/* Search */}
        <div className="flex items-center justify-between">
          <TableSearch value={search} onChange={setSearch} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={paginatedData}
          loading={loading}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default LeaveRequests;