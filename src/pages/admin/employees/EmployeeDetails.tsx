import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import { getEmployeeDetails } from '@/services/admin.service';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
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
    fetch();
  }, [id]);

  if (loading || !data) {
    return (
      <div className="p-6 text-gray-500">
        Loading employee details...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <PageHeader title="Employee Profile" />

        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg"
          >
            Back
          </button>

          <button
            onClick={() => navigate(`/employees/edit/${id}`)}
            className="px-4 py-2 bg-[#7F26FD] text-white rounded-lg"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <div className="flex items-center gap-5 border-b pb-5">

          <div className="w-16 h-16 rounded-full bg-[#7F26FD] flex items-center justify-center text-white text-xl font-bold">
            {data.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{data.name}</h2>
            <p className="text-gray-500">{data.designation || '-'}</p>
            <p className="text-sm text-gray-400">{data.email}</p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-medium">{data.phone || '-'}</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Role</p>
            <p className="font-medium">{data.role?.name || '-'}</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Designation</p>
            <p className="font-medium">{data.designation || '-'}</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium">{data.email}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EmployeeDetails;