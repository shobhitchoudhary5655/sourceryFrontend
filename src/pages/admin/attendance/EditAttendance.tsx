import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/common/Header/PageHeader";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { getAttendanceById, updateAttendance } from "@/services/admin.service";
import { formatTimeForInput } from "@/utils/dateTime";

const EditAttendance = () => {
    const { attendanceId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        status: "",
        checkIn: "",
        checkOut: "",
        location: "",
        notes: "",
        inOffice: 1,
    });

    const disableTime = [
        "absent",
        "leave",
        "birthday-leave",
        "holiday",
        "weekly-off",
    ].includes(form.status);

    const disableStatuses = [
        "absent",
        "leave",
        "birthday-leave",
        "holiday",
        "weekly-off",
    ];

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await getAttendanceById(Number(attendanceId));

            const attendance = response.attendance;

            setEmployee(attendance.user);

            setForm({
                status: attendance.status,
                checkIn: formatTimeForInput(attendance.checkIn),
                checkOut: formatTimeForInput(attendance.checkOut),
                location: attendance.location || "",
                notes: attendance.notes || "",
                inOffice: attendance.inOffice,
            });

        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                ...form,
                inOffice: ["present", "halfday"].includes(form.status) ? 1 : 0,
            };

            await updateAttendance(Number(attendanceId), payload);
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between">
                <PageHeader title="Edit Attendance" />
                <Breadcrumb />
            </div>

            <div className="mb-6 rounded-lg border bg-gray-50 p-4">
                <h2 className="text-lg font-semibold">
                    {employee?.name}
                </h2>

                <p>Employee ID : {employee?.employeeId}</p>

                <p>Designation : {employee?.designation}</p>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow">

                <label>Status</label>

                <select
                    className="mt-2 w-full rounded border p-2"
                    value={form.status}
                    onChange={(e) => {
                        const status = e.target.value;

                        setForm({
                            ...form,
                            status,
                            checkIn: disableStatuses.includes(status) ? "" : form.checkIn,
                            checkOut: disableStatuses.includes(status) ? "" : form.checkOut,
                            inOffice: ["present", "halfday"].includes(status) ? 1 : 0,
                        });
                    }}
                >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="halfday">Half Day</option>
                    <option value="leave">Leave</option>
                    <option value="birthday-leave">Birthday Leave</option>
                </select>

                <div className="mt-4">
                    <label>Check In</label>

                    <input
                        type="time"
                        className="mt-2 w-full rounded border p-2"
                        value={form.checkIn}
                        disabled={disableTime}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                checkIn: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="mt-4">
                    <label>Check Out</label>

                    <input
                        type="time"
                        className="mt-2 w-full rounded border p-2"
                        value={form.checkOut}
                        disabled={disableTime}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                checkOut: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="mt-4">
                    <label>Location</label>

                    <input
                        className="mt-2 w-full rounded border p-2"
                        value={form.location}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                location: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="mt-4">
                    <label>Notes</label>

                    <textarea
                        className="mt-2 w-full rounded border p-2"
                        rows={4}
                        value={form.notes}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                notes: e.target.value,
                            })
                        }
                    />
                </div>
                {/* {!disableTime && (
                    <div className="mt-4 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.inOffice}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    inOffice: e.target.checked,
                                })
                            }
                        />

                        <label>In Office</label>
                    </div>
                )} */}

                <div className="mt-6 flex gap-3">

                    <button
                        onClick={() => navigate(-1)}
                        className="rounded border px-6 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded bg-[#7F26FD] px-6 py-2 text-white"
                    >
                        {loading ? "Updating..." : "Update Attendance"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default EditAttendance;