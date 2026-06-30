import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import ConfirmModal from '@/components/ui/Modal/ConfirmModal';
import { getEmployees, deleteEmployee, } from '@/services/admin.service';
import { FiEye, FiEdit, FiTrash2, } from 'react-icons/fi';
import PageLoader from '@/components/common/Loader/PageLoader';

type Employee = {
  id: number;
  name: string;
  email: string;
  designation?: string;
  role?: string;
  status: string;
};

const Employees = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const pageSize = 10;

  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Name',
      },
      {
        key: 'email',
        title: 'Email',
        render: (value: unknown) => (
          <span className="block max-w-[220px] truncate">
            {(value as string) || '-'}
          </span>
        ),
      },
      {
        key: 'designation',
        title: 'Designation',
        render: (value: unknown) => (
          <span className="whitespace-nowrap">
            {(value as string) || '-'}
          </span>
        ),
      },
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
        render: (_: unknown, row: Employee) => (
          <div className="flex min-w-[110px] items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate(`/employees/${row.id}`)}
              className="rounded p-1.5 text-blue-600 transition hover:bg-blue-50 hover:text-blue-800"
              title="View employee"
              aria-label="View employee"
            >
              <FiEye size={18} />
            </button>

            <button
              type="button"
              onClick={() => navigate(`/employees/edit/${row.id}`)}
              className="rounded p-1.5 text-yellow-500 transition hover:bg-yellow-50 hover:text-yellow-600"
              title="Edit employee"
              aria-label="Edit employee"
            >
              <FiEdit size={18} />
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedId(row.id);
                setConfirmOpen(true);
              }}
              className="rounded p-1.5 text-red-600 transition hover:bg-red-50 hover:text-red-800"
              title="Delete employee"
              aria-label="Delete employee"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    [navigate]
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

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteEmployee(selectedId);

      if (employees.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchEmployees();
      }
    } catch (error) {
      console.error('Delete employee error:', error);
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  if (loading) {
    return <PageLoader text='Loading employees...' />
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Employees" />

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
          onClick={() => navigate('/employees/add')}
          className="
            w-full shrink-0 rounded-xl
            bg-[#7F26FD] px-4 py-2.5
            text-sm font-medium text-white
            transition hover:bg-[#6a1ee0]
            sm:w-auto
          "
        >
          + Add Employee
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
        <div className="min-w-[850px]">
          <DataTable
            columns={columns}
            data={employees}
            loading={loading}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
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

export default Employees;