import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import PageHeader from "@/components/common/Header/PageHeader";
import { getEmployees, createAttendance } from "@/services/admin.service";

const AddAttendance = () => {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        userId: "",
        date: "",
        status: "",
        checkIn: "",
        checkOut: "",
        location: "",
        notes: "",
    });

    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const response = await getEmployees("", "", 1, 1000);

            setEmployees(response.users || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async () => {
        try {
            if (!form.userId) {
                alert("Please select an employee.");
                return;
            }

            if (!form.date) {
                alert("Please select a date.");
                return;
            }

            if (!form.status) {
                alert("Please select a status.");
                return;
            }

            if (
                ["present", "halfday", "work-from-home"].includes(form.status)
            ) {
                if (!form.checkIn || !form.checkOut) {
                    alert("Please enter Check In and Check Out time.");
                    return;
                }
            }

            const payload = {
                userId: Number(form.userId),
                date: form.date,
                status: form.status,
                checkIn: form.checkIn || undefined,
                checkOut: form.checkOut || undefined,
                location: form.location || undefined,
                notes: form.notes || undefined,
                inOffice: ["present", "halfday"].includes(form.status) ? 1 : 0,
            };

            const response = await createAttendance(payload);

            alert(response.message);

            navigate("/attendance");

        } catch (error: any) {
            alert(
                error?.response?.data?.message ||
                "Failed to create attendance."
            );
        }
    };

    return (
        <div>
            <div className="flex items-start justify-between">
                <PageHeader title="Add Attendance" />
                <Breadcrumb />
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow">

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Employee */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Employee
                        </label>

                        <select
                            className="w-full rounded-lg border p-3"
                            value={form.userId}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    userId: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Employee</option>

                            {employees.map((employee) => (
                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Date
                        </label>

                        <input
                            type="date"
                            className="w-full rounded-lg border p-3"
                            value={form.date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    date: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Status
                        </label>

                        <select
                            className="w-full rounded-lg border p-3"
                            value={form.status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    status: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Status</option>
                            <option value="present">Present</option>
                            <option value="halfday">Half Day</option>
                            <option value="absent">Absent</option>
                            <option value="leave">Leave</option>
                            <option value="birthday-leave">   Birthday Leave</option>
                            <option value="holiday">Holiday</option>
                            <option value="weekly-off">   Weekly Off</option>
                            <option value="work-from-home">  Work From Home </option>
                        </select>
                    </div>

                    {/* Check In */}
                    {
                        ["present", "halfday", "work-from-home"].includes(form.status) && (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Check In
                                    </label>

                                    <input
                                        type="time"
                                        className="w-full rounded-lg border p-3"
                                        value={form.checkIn}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                checkIn: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Check Out */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Check Out
                                    </label>

                                    <input
                                        type="time"
                                        className="w-full rounded-lg border p-3"
                                        value={form.checkOut}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                checkOut: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                            </>
                        )
                    }

                    {/* Location */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Location
                        </label>

                        <input
                            type="text"
                            className="w-full rounded-lg border p-3"
                            placeholder="Office"
                            value={form.location}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    location: e.target.value,
                                })
                            }
                        />
                    </div>

                </div>

                {/* Notes */}
                <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium">
                        Notes
                    </label>

                    <textarea
                        rows={4}
                        className="w-full rounded-lg border p-3"
                        value={form.notes}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                notes: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="mt-6 flex gap-3">

                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-lg border px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="rounded-lg bg-[#7F26FD] px-5 py-2 text-white"
                        disabled={loading}
                    >
                        Save Attendance
                    </button>

                </div>

            </div>
        </div>
    );
};

export default AddAttendance;