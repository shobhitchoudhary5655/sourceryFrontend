import { useCallback, useEffect, useMemo, useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';
import PageHeader from '@/components/common/Header/PageHeader';
import DataTable from '@/components/ui/Table/DataTable';
import TableSearch from '@/components/ui/Table/TableSearch';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge';
import ConfirmModal from '@/components/ui/Modal/ConfirmModal';
import PageLoader from '@/components/common/Loader/PageLoader';
import GenerateSalaryModal from "@/components/ui/Modal/GenerateSalaryModal";
import { getSalaryList, markSalaryPaid, createSalary } from '@/services/salary.service';
import Toast from '@/components/ui/Toast/Toast';
import { formatISTDate, getMonthName } from "@/utils/dateTime";
import type { Salary as SalaryType } from "@/services/salary.service";

const Salary = () => {
    const [search, setSearch] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(String(new Date().getFullYear()));
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [salaries, setSalaries] = useState<SalaryType[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const pageSize = 10;
    const [creatingSalary, setCreatingSalary] = useState(false);
    const today = new Date();
    const [generateMonth, setGenerateMonth] = useState(String(today.getMonth() + 1));
    const [generateYear, setGenerateYear] = useState(String(today.getFullYear()));
    const [generateModalOpen, setGenerateModalOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const columns = useMemo(
        () => [
            {
                key: "sno",
                title: "S No.",
                render: (_value: unknown, _row: SalaryType, index: number) => (page - 1) * pageSize + index + 1,
            },
            // {
            //     key: 'employeeId',
            //     title: 'Employee ID',
            //     render: (_: unknown, row: Salary) => row.user.employeeId,
            // },

            {
                key: 'name',
                title: 'Employee Name',
                render: (_: unknown, row: SalaryType) => row.user.name,
            },

            {
                key: 'designation',
                title: 'Designation',
                render: (_: unknown, row: SalaryType) => row.user.designation || '-',
            },

            {
                key: "baseSalary",
                title: "Base Salary",
                render: (value: unknown) =>
                    `₹${Number(value).toLocaleString("en-IN")}`,
            },

            {
                key: "lopDays",
                title: "Leave Days",
            },

            {
                key: "wfhDeductionDays",
                title: "WFH Days",
            },

            {
                key: "deductionAmount",
                title: "Deduction",
                render: (value: unknown) =>
                    `₹${Number(value).toLocaleString("en-IN")}`,
            },

            {
                key: "salary",
                title: "Net Salary",
                render: (value: unknown) =>
                    `₹${Number(value).toLocaleString("en-IN")}`,
            },

            {
                key: 'month',
                title: 'Month',
                render: (value: unknown) => getMonthName(Number(value)),
            },

            {
                key: 'year',
                title: 'Year',
            },

            {
                key: 'status',
                title: 'Status',
                render: (value: unknown) => (
                    <StatusBadge status={value as string} />
                ),
            },

            {
                key: 'paidDate',
                title: 'Paid Date',
                render: (value: unknown) => formatISTDate(value as string | null),
            },

            {
                key: 'action',
                title: 'Action',

                render: (_: unknown, row: SalaryType) =>
                    row.status === 'Paid' ? (
                        <span className="font-semibold text-green-600">
                            Paid
                        </span>
                    ) : (
                        <button
                            className="rounded-lg bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                            onClick={() => {
                                setSelectedId(row.id);
                                setConfirmOpen(true);
                            }}
                        >
                            Mark Paid
                        </button>
                    ),
            },
        ],
        []
    );

    const fetchSalary = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getSalaryList(
                search,
                month ? Number(month) : undefined,
                Number(year),
                status,
                page,
                pageSize
            );
            setSalaries(response.salaries || []);
            setTotalPages(response.totalPages || 1);
        } catch (err) {
            console.log(err);

            setSalaries([]);
        } finally {
            setLoading(false);
        }
    }, [search, month, year, status, page]);

    const handleGenerateSalary = async () => {
        try {
            setCreatingSalary(true);
            const response = await createSalary(Number(generateMonth), Number(generateYear));
            setToastMessage(response.message);
            setToastType("success");
            setToastOpen(true);
            setGenerateModalOpen(false);
            await fetchSalary();
        } catch (error: any) {
            setToastMessage(error?.response?.data?.message || "Something went wrong.");
            setToastType("error");
            setToastOpen(true);
        } finally {
            setCreatingSalary(false);
        }
    };

    useEffect(() => {
        fetchSalary();
    }, [fetchSalary]);

    const handleSearch = (value: string) => {
        setSearch(value);

        setPage(1);
    };

    const handleMarkPaid = async () => {
        if (!selectedId) return;

        try {
            await markSalaryPaid(selectedId);

            fetchSalary();
        } catch (err) {
            console.log(err);
        } finally {
            setConfirmOpen(false);
            setSelectedId(null);
        }
    };

    if (loading) {
        return <PageLoader text="Loading Salary..." />;
    }

    return (
        <div className="mx-auto w-full min-w-0 max-w-7xl space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <PageHeader title="Salary Management" />

                <div className="w-full sm:w-auto">
                    <Breadcrumb />
                </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <div className="w-full sm:w-72">
                        <TableSearch
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>

                    <select
                        value={month}
                        onChange={(e) => {
                            setMonth(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#7F26FD]"
                    >
                        <option value="">All Months</option>

                        {Array.from({ length: 12 }, (_, index) => (
                            <option
                                key={index + 1}
                                value={index + 1}
                            >
                                {getMonthName(index + 1)}
                            </option>
                        ))}
                    </select>

                    <select
                        value={year}
                        onChange={(e) => {
                            setYear(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#7F26FD]"
                    >
                        {Array.from({ length: 5 }, (_, index) => {
                            const y = new Date().getFullYear() - index;

                            return (
                                <option
                                    key={y}
                                    value={y}
                                >
                                    {y}
                                </option>
                            );
                        })}
                    </select>

                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#7F26FD]"
                    >
                        <option value="">All Status</option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Paid">
                            Paid
                        </option>
                    </select>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setGenerateModalOpen(true)}
                className="rounded-xl bg-[#7F26FD] px-5 py-2.5 text-white"
            >
                Generate Salary
            </button>

            <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                <div className="min-w-[1100px]">
                    <DataTable
                        columns={columns}
                        data={salaries}
                        loading={loading}
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </div>

            <ConfirmModal
                open={confirmOpen}
                title="Mark Salary Paid"
                message="Are you sure you want to mark this salary as paid?"
                confirmText="Mark Paid"
                onCancel={() => {
                    setConfirmOpen(false);
                    setSelectedId(null);
                }}
                onConfirm={handleMarkPaid}
            />

            <GenerateSalaryModal
                open={generateModalOpen}
                month={generateMonth}
                year={generateYear}
                loading={creatingSalary}
                setMonth={setGenerateMonth}
                setYear={setGenerateYear}
                onClose={() => setGenerateModalOpen(false)}
                onGenerate={async () => {
                    await handleGenerateSalary();
                    setGenerateModalOpen(false);
                }}
            />
            <Toast
                open={toastOpen}
                message={toastMessage}
                type={toastType}
                onClose={() => setToastOpen(false)}
            />
        </div>
    );
};

export default Salary;