import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import { getEmployeeDetails, updateEmployee, getRoles, } from '@/services/admin.service';
import PageLoader from '@/components/common/Loader/PageLoader';
import Toast from "@/components/ui/Toast/Toast";

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
  salary?: number | null;
  status?: "Active" | "Inactive";
  clBalance?: number | null;
  slBalance?: number | null;
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
  salary: string;
  status: string;
  clBalance: string;
  slBalance: string;
};

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    salary: '',
    status: 'Active',
    clBalance: '',
    slBalance: '',
  });
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
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
          dateOfBirth: emp.dateOfBirth ? emp.dateOfBirth.slice(0, 10) : '',
          joiningDate: emp.joiningDate ? emp.joiningDate.slice(0, 10) : '',
          workLocation: emp.workLocation ?? '',
          employeeType: emp.employeeType ?? '',
          profileImage: emp.profileImage ?? '',
          salary: emp.salary ? String(emp.salary) : '',
          status: emp.status ?? 'Active',
          clBalance: emp.clBalance ? String(emp.clBalance) : '',
          slBalance: emp.slBalance ? String(emp.slBalance) : '',
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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const isValid = Boolean(
    form.name && form.email && form.roleId
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Enter a valid email.";
    }

    if (!form.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!form.designation.trim()) {
      newErrors.designation = "Designation is required.";
    }

    if (!form.roleId) {
      newErrors.roleId = "Role is required.";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    }

    if (!form.joiningDate) {
      newErrors.joiningDate = "Joining date is required.";
    }

    if (!form.workLocation.trim()) {
      newErrors.workLocation = "Work location is required.";
    }

    if (!form.employeeType) {
      newErrors.employeeType = "Employee type is required.";
    }

    if (!form.salary) {
      newErrors.salary = "Salary is required.";
    } else if (Number(form.salary) < 0) {
      newErrors.salary = "Salary cannot be negative.";
    }

    if (!form.status) {
      newErrors.status = "Status is required.";
    }

    if (Number(form.clBalance) < 0) {
      newErrors.clBalance = "CL Balance cannot be negative.";
    }
    
    if (Number(form.slBalance) < 0) {
      newErrors.slBalance = "SL Balance cannot be negative.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // if (!isValid) return;
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        roleId: Number(form.roleId),
        salary: form.salary ? Number(form.salary) : null,
        clBalance: form.clBalance ? Number(form.clBalance) : 0,
        slBalance: form.slBalance ? Number(form.slBalance) : 0,
      };

      await updateEmployee(Number(id), payload);
      setToast({
        open: true,
        message: "Employee updated successfully.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/employees");
      }, 1200);
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: "Failed to update employee.",
        type: "error",
      });
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
            {errors.employeeId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.employeeId}
              </p>
            )}
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
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
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
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
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
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone}
              </p>
            )}
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
            {errors.designation && (
              <p className="mt-1 text-sm text-red-500">
                {errors.designation}
              </p>
            )}
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
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">
                {errors.gender}
              </p>
            )}
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
            {errors.joiningDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.joiningDate}
              </p>
            )}
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
            {errors.workLocation && (
              <p className="mt-1 text-sm text-red-500">
                {errors.workLocation}
              </p>
            )}
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
            {errors.employeeType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.employeeType}
              </p>
            )}
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
            {errors.roleId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.roleId}
              </p>
            )}
          </div>
          <div className="min-w-0">
            <label
              htmlFor="salary"
              className="text-sm font-medium text-gray-600"
            >
              Salary
            </label>

            <input
              id="salary"
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter salary"
            />
            {errors.salary && (
              <p className="mt-1 text-sm text-red-500">
                {errors.salary}
              </p>
            )}
          </div>
          <div className="min-w-0">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-600"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">
                {errors.status}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label
              htmlFor="clBalance"
              className="text-sm font-medium text-gray-600"
            >
              CL Balance
            </label>

            <input
              id="clBalance"
              type="number"
              step="0.5"
              name="clBalance"
              value={form.clBalance}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.clBalance && (
              <p className="mt-1 text-sm text-red-500">
                {errors.clBalance}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label
              htmlFor="slBalance"
              className="text-sm font-medium text-gray-600"
            >
              SL Balance
            </label>

            <input
              id="slBalance"
              type="number"
              step="0.5"
              name="slBalance"
              value={form.slBalance}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.slBalance && (
              <p className="mt-1 text-sm text-red-500">
                {errors.slBalance}
              </p>
            )}
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
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </div>
  );
};

export default EditEmployee;