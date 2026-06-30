import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import { getEmployeeDetails, updateEmployee, getRoles, } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';

interface Employee {
  name: string;
  email: string;
  phone?: string | null;
  designation?: string | null;
  roleId?: number | null;
  employeeId?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  joiningDate?: string | null;
  workLocation?: string | null;
  employeeType?: string | null;
  profileImage?: string | null;
}

type EmployeeForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
  designation: string;
  roleId: string;
  employeeId: string;
  gender: string;
  dateOfBirth: string;
  joiningDate: string;
  workLocation: string;
  employeeType: string;
  profileImage: string;
};

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [form, setForm] = useState<EmployeeForm>({
    name: '',
    email: '',
    password: '',
    phone: '',
    designation: '',
    roleId: '',
    employeeId: '',
    gender: '',
    dateOfBirth: '',
    joiningDate: '',
    workLocation: '',
    employeeType: '',
    profileImage: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);

        const res = await getEmployeeDetails(Number(id));
        const emp: Employee = res.employee;

        setForm({
          name: emp.name ?? '',
          email: emp.email ?? '',
          password: '',
          phone: emp.phone ?? '',
          designation: emp.designation ?? '',
          roleId: emp.roleId ? String(emp.roleId) : '',
          employeeId: emp.employeeId ?? '',
          gender: emp.gender ?? '',
          dateOfBirth: emp.dateOfBirth
            ? emp.dateOfBirth.slice(0, 10)
            : '',
          joiningDate: emp.joiningDate
            ? emp.joiningDate.slice(0, 10)
            : '',
          workLocation: emp.workLocation ?? '',
          employeeType: emp.employeeType ?? '',
          profileImage: emp.profileImage ?? '',
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

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

  const isValid = Boolean(
    form.name && form.email && form.roleId
  );

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setSaving(true);

      const payload = {
        ...form,
        roleId: Number(form.roleId),
      };

      await updateEmployee(Number(id), payload);

      navigate('/employees');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#7F26FD] focus:ring-2 focus:ring-[#7F26FD]/30 sm:text-base';

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4 text-sm text-gray-500 sm:text-base">
        Loading employee data...
      </div>
    );
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
      <PageHeader title="Edit Employee" />

      <div className="space-y-5 rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-8">
        {/* FORM FIELDS */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <div className="min-w-0">
            <label
              htmlFor="employeeId"
              className="text-sm font-medium text-gray-600"
            >
              Employee ID
            </label>

            <input
              id="employeeId"
              name="employeeId"
              value={form.employeeId}
              placeholder="Employee ID"
              onChange={handleChange}
              className={inputClass}
            />
          </div>

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
              placeholder="Enter full name"
              onChange={handleChange}
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
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter email"
              onChange={handleChange}
              className={inputClass}
            />
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
              type="tel"
              name="phone"
              value={form.phone}
              placeholder="Enter phone number"
              onChange={handleChange}
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
              placeholder="e.g. Software Engineer"
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="gender"
              className="text-sm font-medium text-gray-600"
            >
              Gender
            </label>

            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="dateOfBirth"
              className="text-sm font-medium text-gray-600"
            >
              Date of Birth
            </label>

            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="joiningDate"
              className="text-sm font-medium text-gray-600"
            >
              Joining Date
            </label>

            <input
              id="joiningDate"
              type="date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="workLocation"
              className="text-sm font-medium text-gray-600"
            >
              Work Location
            </label>

            <input
              id="workLocation"
              name="workLocation"
              value={form.workLocation}
              placeholder="Work location"
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="employeeType"
              className="text-sm font-medium text-gray-600"
            >
              Employee Type
            </label>

            <select
              id="employeeType"
              name="employeeType"
              value={form.employeeType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Employee Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
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
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || saving}
            className="w-full rounded-lg bg-[#7F26FD] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6a1ee0] disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
          >
            {saving ? 'Updating...' : 'Update Employee'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;