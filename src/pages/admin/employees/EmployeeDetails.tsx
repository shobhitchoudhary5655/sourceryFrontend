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

        {/* Center Profile Image */}
        <div className="flex flex-col items-center border-b pb-6">

          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-[#7F26FD] bg-[#7F26FD] shadow-lg">

            {data.profilePicture ? (

              <img
                src={data.profilePicture}
                alt={data.name}
                className="h-full w-full object-cover"
              />

            ) : (

              <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white">
                {data.name?.charAt(0)?.toUpperCase() || 'E'}
              </div>

            )}

          </div>


          <h2 className="mt-5 text-2xl font-semibold text-gray-800">
            {data.name || '-'}
          </h2>

          {/* <p className="mt-1 text-gray-500">
            {data.designation || '-'}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {data.email || '-'}
          </p> */}

        </div>



        {/* Employee Details */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">


          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-medium text-gray-800">
              {data.phone || '-'}
            </p>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="font-medium text-gray-800">
              {data.role?.name || '-'}
            </p>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Designation
            </p>

            <p className="font-medium text-gray-800">
              {data.designation || '-'}
            </p>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

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