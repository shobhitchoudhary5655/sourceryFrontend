import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import { getEmployeeDetails } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await getEmployeeDetails(Number(id));
        setData(res.employee);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading || !data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4 text-sm text-gray-500 sm:text-base">
        Loading employee details...
      </div>
    );
  }

  if (loading) {
    return <PageLoader text='Loading employee details...' />
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="Employee Profile" />

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => navigate(`/employees/edit/${id}`)}
            className="w-full rounded-lg bg-[#7F26FD] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#6a1ee0] sm:w-auto"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 border-b pb-5 xs:flex-row xs:items-center sm:gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#7F26FD] text-xl font-bold text-white">
            {data.name?.charAt(0)?.toUpperCase() || 'E'}
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-lg font-semibold text-gray-800 sm:text-xl">
              {data.name || '-'}
            </h2>

            <p className="break-words text-sm text-gray-500 sm:text-base">
              {data.designation || '-'}
            </p>

            <p className="break-all text-sm text-gray-400">
              {data.email || '-'}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:gap-6 md:grid-cols-2">
          <div className="min-w-0 space-y-1.5">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="break-words font-medium text-gray-800">
              {data.phone || '-'}
            </p>
          </div>

          <div className="min-w-0 space-y-1.5">
            <p className="text-sm text-gray-500">Role</p>
            <p className="break-words font-medium text-gray-800">
              {data.role?.name || '-'}
            </p>
          </div>

          <div className="min-w-0 space-y-1.5">
            <p className="text-sm text-gray-500">Designation</p>
            <p className="break-words font-medium text-gray-800">
              {data.designation || '-'}
            </p>
          </div>

          <div className="min-w-0 space-y-1.5">
            <p className="text-sm text-gray-500">Email</p>
            <p className="break-all font-medium text-gray-800">
              {data.email || '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;