import { useMemo, useState } from 'react';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';

const LeaveRequests = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pathNames = location.pathname.split('/').filter((x) => x)
  const breadcrumbItems = [...pathNames]
  const loading = false
  const columns = [
    { key: 'name', title: 'Employee' },
    { key: 'type', title: 'Type' },
    { key: 'from', title: 'From' },
    { key: 'to', title: 'To' },
    {
      key: 'status', title: 'Status',
      render: (value: unknown) => (
        <StatusBadge status={value as string} />
      ),
    }
  ];

  const data = [
    {
      name: 'Aman',
      type: 'Sick Leave',
      from: '2026-06-10',
      to: '2026-06-12',
      status: 'Pending',
    },
  ];

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageSize = 10;

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  );

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>
      <div className="flex items-start justify-between">
        <PageHeader
          title="Leave Requests"
        // subtitle="Approve or reject leaves"
        />

        <Breadcrumb items={breadcrumbItems} />
      </div>
      {/* <DataTable columns={columns} data={data} /> */}
      <div className="space-y-5">
        {/* Search + Action */}
        <div className="flex items-center justify-between">
          <TableSearch
            value={search}
            onChange={setSearch}
          />

          {/* <button
            className="
              px-4
              py-2
              rounded-xl
              bg-[#7F26FD]
              text-white
              hover:opacity-90
            "
          >
            + Add Employee
          </button> */}
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