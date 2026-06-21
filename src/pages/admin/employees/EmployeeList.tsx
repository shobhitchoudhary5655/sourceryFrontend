import { useCallback, useEffect, useMemo, useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import { getEmployees } from '@/services/admin.service';

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

  const pageSize = 10;

  const pathNames = location.pathname.split('/').filter((x) => x);
  const breadcrumbItems = [...pathNames];

  const columns = useMemo(
    () => [
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' },
      { key: 'designation', title: 'Designation' },
      {
        key: 'role',
        title: 'Role',
        render: (value: unknown) => {
          // If backend sends role as an object: { id, name }
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

      /*
        Expected API response:

        {
          users: [...],
          total: 25,
          totalPages: 3,
          currentPage: 1
        }
      */

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

  // Reset page when searching
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <PageHeader title="Employees" />

        <Breadcrumb items={breadcrumbItems} />
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
    </div>
  );
};

export default Employees;

// import { useMemo, useState } from 'react';
// import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
// import PageHeader from '@/components/common/Header/PageHeader';
// import DataTable from '@/components/ui/Table/DataTable';
// import TableSearch from '@/components/ui/Table/TableSearch';
// import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';

// const Employees = () => {
//   const [search, setSearch] = useState('')
//   const [page, setPage] = useState(1)
//   const pathNames = location.pathname.split('/').filter((x) => x)
//   const breadcrumbItems = [...pathNames]
//   const loading = false
//   const columns = [
//     { key: 'name', title: 'Name' },
//     { key: 'email', title: 'Email' },
//     { key: 'role', title: 'Role' },
//     {
//       key: 'status', title: 'Status',
//       render: (value: unknown) => (
//         <StatusBadge status={value as string} />
//       ),
//     },
//   ];

//   const data = [
//     {
//       name: 'Shobhit',
//       email: 'shobhit@gmail.com',
//       role: 'Developer',
//       status: 'Active',
//     },
//   ];

//   const filteredData = useMemo(() => {
//     return data.filter((item) =>
//       item.name
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [data, search]);

//   const pageSize = 10;

//   const totalPages = Math.ceil(
//     filteredData.length / pageSize
//   );

//   const paginatedData = filteredData.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   );

//   return (
//     <div>
//       <div className="flex items-start justify-between">
//         <PageHeader
//           title="Employees"
//         // subtitle="Manage all employees"
//         />

//         <Breadcrumb items={breadcrumbItems} />
//       </div>

//       {/* <DataTable columns={columns} data={data} /> */}
//       <div className="space-y-5">
//         {/* Search + Action */}
//         <div className="flex items-center justify-between">
//           <TableSearch
//             value={search}
//             onChange={setSearch}
//           />

//           <button
//             className="
//               px-4
//               py-2
//               rounded-xl
//               bg-[#7F26FD]
//               text-white
//               hover:opacity-90
//             "
//           >
//             + Add Employee
//           </button>
//         </div>

//         {/* Table */}
//         <DataTable
//           columns={columns}
//           data={paginatedData}
//           loading={loading}
//           currentPage={page}
//           totalPages={totalPages}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default Employees;