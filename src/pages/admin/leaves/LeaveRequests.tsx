import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { getLeaveRequests } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';

interface LeaveRow {
  id: number;
  name: string;
  requestType: string;
  leaveType?: string;
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

  const pageSize = 10;

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getLeaveRequests(
        search,
        'all',
        page,
        pageSize
      );

      const mapped: LeaveRow[] = (response.requests || []).map(
        (item: any) => ({
          id: item.id,
          name: item.user?.name || '-',
          requestType: item.requestType || '-',
          leaveType: item.leaveType || '-',
          from: item.startDate || '-',
          to: item.endDate || '-',
          status: item.status || '-',
        })
      );

      setData(mapped);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeaves();
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchLeaves]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Employee',
        render: (value: unknown) => (
          <span className="block min-w-[150px] break-words">
            {(value as string) || '-'}
          </span>
        ),
      },
      {
        key: 'requestType',
        title: 'RequestType',
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {(value as string) || '-'}
          </span>
        ),
      },
      {
        key: 'leaveType',
        title: 'LeaveType',
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {(value as string) || '-'}
          </span>
        ),
      },
      {
        key: 'from',
        title: 'From',
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {(value as string) || '-'}
          </span>
        ),
      },
      {
        key: 'to',
        title: 'To',
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {(value as string) || '-'}
          </span>
        ),
      },
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
        render: (_: unknown, row: LeaveRow) => (
          <button
            type="button"
            onClick={() => navigate(`/requests/${row.id}`)}
            className="rounded p-1.5 text-blue-600 transition hover:bg-blue-50 hover:text-blue-800"
            title="View leave request"
            aria-label="View leave request"
          >
            <FiEye size={18} />
          </button>
        ),
      },
    ],
    [navigate]
  );

  if (loading) {
    return <PageLoader text='Loading request details...' />
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl space-y-4 sm:space-y-6">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Leave Requests" />

        <div className="w-full sm:w-auto">
          <Breadcrumb />
        </div>
      </div>

      <div className="w-full sm:max-w-sm">
        <TableSearch
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
        <div className="min-w-[760px]">
          <DataTable
            columns={columns}
            data={data}
            loading={loading}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;