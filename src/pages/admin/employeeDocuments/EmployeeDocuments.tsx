import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import PageHeader from "@/components/common/Header/PageHeader";
import DataTable from "@/components/ui/Table/DataTable";
import TableSearch from "@/components/ui/Table/TableSearch";
import PageLoader from "@/components/common/Loader/PageLoader";
import { getEmployees } from "@/services/admin.service";
import { FiFolder } from "react-icons/fi";

type Employee = {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  designation?: string;
};

const pageSize = 10;

const EmployeeDocuments = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getEmployees(
        search,
        "",
        page,
        pageSize
      );

      setEmployees(response.users || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.log(error);
      setEmployees([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const columns = useMemo(
    () => [
      {
        key: "sno",
        title: "S No.",
        render: (_: unknown, __: Employee, index: number) =>
          (page - 1) * pageSize + index + 1,
      },
      {
        key: "employeeId",
        title: "Employee ID",
      },
      {
        key: "name",
        title: "Employee Name",
      },
      {
        key: "email",
        title: "Email",
      },
      {
        key: "designation",
        title: "Designation",
        render: (value: unknown) => (value as string) || "-",
      },
      {
        key: "action",
        title: "Action",
        render: (_: unknown, row: Employee) => (
          <button
            onClick={() =>
              navigate(`/employee-documents/${row.id}`)
            }
            className="flex items-center gap-2 rounded-lg bg-[#7F26FD] px-3 py-2 text-white transition hover:bg-[#6a1ee0]"
          >
            <FiFolder size={16} />
            Documents
          </button>
        ),
      },
    ],
    [navigate, page]
  );

  if (loading) {
    return <PageLoader text="Loading employees..." />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">

      <div className="flex items-center justify-between">
        <PageHeader title="Employee Documents" />
        <Breadcrumb />
      </div>

      <div className="max-w-sm">
        <TableSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
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
  );
};

export default EmployeeDocuments;