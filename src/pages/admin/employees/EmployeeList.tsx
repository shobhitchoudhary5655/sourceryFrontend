import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { getEmployees, deleteEmployee } from '@/services/admin.service';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import ConfirmModal from '@/components/ui/Modal/ConfirmModal';

type Employee = {
  id: number;
  name: string;
  email: string;
  designation?: string;
  role?: string;
  status: string;
};

const Employees = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate()
  const pageSize = 10;

  const columns = useMemo(
    () => [
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' },
      { key: 'designation', title: 'Designation' },
      {
        key: 'role',
        title: 'Role',
        render: (value: unknown) => {
          if (typeof value === 'object' && value !== null) {
            return (value as { name?: string }).name || '-';
          }

          return (value as string) || '-';
        },
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
        render: (_: unknown, row: any) => (
          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate(`/employees/${row.id}`)}
              className="text-blue-600 hover:text-blue-800"
              title="View"
            >
              <FiEye size={18} />
            </button>

            <button
              onClick={() => navigate(`/employees/edit/${row.id}`)}
              className="text-yellow-500 hover:text-yellow-600"
              title="Edit"
            >
              <FiEdit size={18} />
            </button>

            <button
              onClick={() => {
                setSelectedId(row.id);
                setConfirmOpen(true);
              }} className="text-red-600 hover:text-red-800"
              title="Delete"
            >
              <FiTrash2 size={18} />
            </button>

          </div>
        ),
      }
    ],
    []
  );

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getEmployees(
        search,
        '',
        page,
        pageSize
      );

      setEmployees(response.users || []);
      setTotalPages(response.totalPages || 0);
    } catch (error: any) {
      console.log('Get employees error:', error);
      setEmployees([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  // const handleDelete = async (id: number) => {
  //   const confirmDelete = window.confirm('Delete this employee?');
  //   if (!confirmDelete) return;

  //   await deleteEmployee(id);
  //   fetchEmployees();
  // };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <PageHeader title="Employees" />

        <Breadcrumb />
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <TableSearch
            value={search}
            onChange={handleSearchChange}
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
            onClick={() => navigate('/employees/add')}
          >
            + Add Employee
          </button>
        </div>

        <DataTable
          columns={columns}
          data={employees}
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
            await deleteEmployee(selectedId);
            fetchEmployees();
          }
          setConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default Employees;
