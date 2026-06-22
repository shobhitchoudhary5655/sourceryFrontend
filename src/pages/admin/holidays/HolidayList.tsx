import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import TableSearch from '@/components/ui/Table/TableSearch';
import { getHolidays, deleteHoliday, } from '@/services/admin.service';
import ConfirmModal from '@/components/ui/Modal/ConfirmModal';
import { FiTrash2 } from 'react-icons/fi';

const Holidays = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const pageSize = 10;

  const fetchHolidays = async () => {
    try {
      setLoading(true);

      const res = await getHolidays();

      const mapped = res.holidays.map((item: any) => ({
        id: item.id,
        name: item.holidayName,
        date: item.date,
      }));

      setData(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // const handleDelete = async (id: number) => {
  //   try {
  //     await deleteHoliday(id);
  //     fetchHolidays();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const columns = [
    { key: 'name', title: 'Holiday' },
    { key: 'date', title: 'Date' },
    {
      key: 'action',
      title: 'Action',
      render: (_: unknown, row: any) => (
        <button
          // onClick={() => handleDelete(row.id)}
          onClick={() => {
            setSelectedId(row.id);
            setConfirmOpen(true);
          }}
          className="text-red-600 hover:text-red-800"
          title='delete'
        >
          <FiTrash2 size={18} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-start justify-between">
        <PageHeader title="Holidays" />
        <Breadcrumb />
      </div>

      <div className="space-y-5">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <TableSearch value={search} onChange={setSearch} />

          <button
            onClick={() => navigate('/holidays/add')}
            className="
              px-4 py-2 rounded-xl
              bg-[#7F26FD]
              text-white
              hover:opacity-90
            "
          >
            + Add Holiday
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
      <ConfirmModal
        open={confirmOpen}
        title="Delete Holiday"
        message="Are you sure you want to delete this holiday?"
        confirmText="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          if (selectedId) {
            await deleteHoliday(selectedId);
            fetchHolidays();
          }
          setConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default Holidays;