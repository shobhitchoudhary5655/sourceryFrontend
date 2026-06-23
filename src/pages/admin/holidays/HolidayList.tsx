import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import TableSearch from '@/components/ui/Table/TableSearch';
import ConfirmModal from '@/components/ui/Modal/ConfirmModal';
import { getHolidays, deleteHoliday, } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';

type Holiday = {
  id: number;
  name: string;
  date: string;
};

const Holidays = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const pageSize = 10;

  const fetchHolidays = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getHolidays();

      const mapped: Holiday[] = (res.holidays || []).map((item: any) => ({
        id: item.id,
        name: item.holidayName,
        date: item.date,
      }));

      setData(mapped);
    } catch (err) {
      console.error('Get holidays error:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const filteredData = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return data;

    return data.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Holiday',
        render: (value: unknown) => (
          <span className="block min-w-[180px] break-words">
            {(value as string) || '-'}
          </span>
        ),
      },
      {
        key: 'date',
        title: 'Date',
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {(value as string) || '-'}
          </span>
        ),
      },
      {
        key: 'action',
        title: 'Action',
        render: (_: unknown, row: Holiday) => (
          <button
            type="button"
            onClick={() => {
              setSelectedId(row.id);
              setConfirmOpen(true);
            }}
            className="rounded p-1.5 text-red-600 transition hover:bg-red-50 hover:text-red-800"
            title="Delete holiday"
            aria-label="Delete holiday"
          >
            <FiTrash2 size={18} />
          </button>
        ),
      },
    ],
    []
  );

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteHoliday(selectedId);

      if (paginatedData.length === 1 && page > 1) {
        setPage((previousPage) => previousPage - 1);
      }

      await fetchHolidays();
    } catch (err) {
      console.error('Delete holiday error:', err);
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  if (loading) {
    return <PageLoader text='Loading holiday details...' />
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl space-y-4 sm:space-y-6">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Holidays" />

        <div className="w-full sm:w-auto">
          <Breadcrumb />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="w-full sm:max-w-sm">
          <TableSearch
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <button
          type="button"
          onClick={() => navigate('/holidays/add')}
          className="
            w-full shrink-0 rounded-xl bg-[#7F26FD]
            px-4 py-2.5 text-sm font-medium text-white
            transition hover:bg-[#6a1ee0]
            sm:w-auto
          "
        >
          + Add Holiday
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
        <div className="min-w-[480px]">
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

      <ConfirmModal
        open={confirmOpen}
        title="Delete Holiday"
        message="Are you sure you want to delete this holiday?"
        confirmText="Delete"
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Holidays;