import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PageHeader from '@/components/common/Header/PageHeader';
import { createEmployee, getRoles } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  if (loading) {
    return <PageLoader />
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#7F26FD] focus:ring-2 focus:ring-[#7F26FD]/30 sm:text-base';

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 sm:space-y-6">
      <PageHeader title="Add Employee" />

      <div className="space-y-5 rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <div className="min-w-0">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-600"
            >
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`${inputClass} pr-11`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#7F26FD]"
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
              </button>
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-600"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="designation"
              className="text-sm font-medium text-gray-600"
            >
              Designation
            </label>

            <input
              id="designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="roleId"
              className="text-sm font-medium text-gray-600"
            >
              Role <span className="text-red-500">*</span>
            </label>

            <select
              id="roleId"
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Role</option>

              {roles.map((role: any) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate('/employees')}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="
              w-full rounded-lg bg-[#7F26FD]
              px-5 py-2.5 text-sm font-medium text-white
              transition hover:bg-[#6a1ee0]
              disabled:cursor-not-allowed disabled:bg-gray-400
              sm:w-auto
            "
          >
            {loading ? 'Creating...' : 'Create Employee'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;