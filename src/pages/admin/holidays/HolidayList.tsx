import { useMemo, useState } from 'react';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import TableSearch from '@/components/ui/Table/TableSearch';

const Holidays = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pathNames = location.pathname.split('/').filter((x) => x)
  const breadcrumbItems = [...pathNames]
  const loading = false
  const columns = [
    { key: 'name', title: 'Holiday' },
    { key: 'date', title: 'Date' },
  ];

  const data = [
    {
      name: 'Independence Day',
      date: '2026-08-15',
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
          title="Holidays"
        // subtitle="Company holiday calendar"
        />

        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="space-y-5">
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
            + Add Holiday
          </button>
        </div>

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

export default Holidays;