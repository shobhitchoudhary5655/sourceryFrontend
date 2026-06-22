import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PageHeader from '@/components/common/Header/PageHeader';
import { createEmployee, getRoles } from '@/services/admin.service';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    designation: '',
    roleId: '',
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res.roles || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid =
    form.name &&
    form.email &&
    form.password &&
    form.roleId;

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setLoading(true);

      await createEmployee(form);

      navigate('/employees');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <PageHeader title="Add Employee" />

=      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
            />
          </div>

=          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full mt-1 border px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Designation</label>
            <input
              name="designation"
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Role</label>
            <select
              name="roleId"
              onChange={handleChange}
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
            >
              <option value="">Select Role</option>
              {roles.map((r: any) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex justify-end gap-3 pt-4">

          <button
            onClick={() => navigate('/employees')}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className={`
              px-5 py-2 rounded-lg text-white
              ${isValid ? 'bg-[#7F26FD]' : 'bg-gray-400'}
            `}
          >
            {loading ? 'Creating...' : 'Create Employee'}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddEmployee;