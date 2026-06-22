import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/Header/PageHeader';
import { getEmployeeDetails, updateEmployee, getRoles, } from '@/services/admin.service';

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
        const fetch = async () => {
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
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
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

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isValid = form.name && form.email && form.roleId;

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

    if (loading) {
        return (
            <div className="p-6 text-gray-500">
                Loading employee data...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <PageHeader title="Edit Employee" />

            <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="text-sm text-gray-600">EmployeeId</label>
                        <input
                            name="employeeId"
                            placeholder="Employee ID"
                            onChange={handleChange}
                            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Designation</label>
                        <input
                            name="designation"
                            value={form.designation}
                            onChange={handleChange}
                            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Gender</label>
                        <select name="gender" onChange={handleChange} className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            onChange={handleChange}
                            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Joining Date</label>
                        <input
                            type="date"
                            name="joiningDate"
                            onChange={handleChange}
                            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Work Location</label>
                        <input
                            name="workLocation"
                            placeholder="Work Location"
                            onChange={handleChange}
                            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Employee Type</label>
                        <select name="employeeType" onChange={handleChange} className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F26FD]">
                            <option value="">Employee Type</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Contract">Contract</option>
                            <option value="Intern">Intern</option>
                        </select>
                    </div>


                    {/* <input
                        name="profileImage"
                        placeholder="Profile Image URL"
                        onChange={handleChange}
                    /> */}

                    <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <select
                            name="roleId"
                            value={form.roleId}
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
                        disabled={!isValid || saving}
                        className={` px-5 py-2 rounded-lg text-white ${isValid ? 'bg-[#7F26FD]' : 'bg-gray-400'} `}   >
                        {saving ? 'Updating...' : 'Update Employee'}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default EditEmployee;