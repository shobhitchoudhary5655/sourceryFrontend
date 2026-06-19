import { useMemo, useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';

const Attendance = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbItems = [ ...pathnames];

  const loading = false;

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'date', title: 'Date' },
    {
      key: 'status', title: 'Status',
      render: (value: string) => (
        <StatusBadge status={value} />
      ),
    },
    { key: 'checkIn', title: 'Check In' },
    { key: 'checkOut', title: 'Check Out' },
  ];

  const data = [
    {
      name: 'John',
      date: '2026-06-15',
      status: 'Present',
      checkIn: '09:10 AM',
      checkOut: '06:00 PM',
    },
    {
      name: 'Rahul',
      date: '2026-06-15',
      status: 'Absent',
      checkIn: '-',
      checkOut: '-',
    },
    {
      name: 'Amit',
      date: '2026-06-15',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:10 PM',
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
          title="Attendance"
          // subtitle="Employee attendance records"
        />

        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="space-y-5">
        {/* Search + Action */}
        <div className="flex items-center justify-between">
          <TableSearch
            value={search}
            onChange={setSearch}
          />

          <button
            className="
              px-4
              py-2
              rounded-xl
              bg-[#7F26FD]
              text-white
              hover:opacity-90
            "
          >
            Add Attendance
          </button>
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

export default Attendance;