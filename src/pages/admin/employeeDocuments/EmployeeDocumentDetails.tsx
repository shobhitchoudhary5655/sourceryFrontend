import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import PageHeader from "@/components/common/Header/PageHeader";
import PageLoader from "@/components/common/Loader/PageLoader";
import DataTable from "@/components/ui/Table/DataTable";
import { FiArrowLeft, FiDownload, FiEye } from "react-icons/fi";
import {
    getEmployeeDocuments,
    getDocumentViewUrl,
} from "@/services/admin.service";
type Employee = {
    id: number;
    employeeId: string;
    name: string;
    email: string;
    designation?: string;
};

type EmployeeDocument = {
    id: number;
    documentType: string;
    documentName: string;
    documentUrl: string;
    mimeType: string;
    fileSize: number;
    status?: "pending" | "approved" | "rejected";
    remarks?: string | null;
};

const EmployeeDocumentDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [documents, setDocuments] = useState<EmployeeDocument[]>([]);

    const fetchDocuments = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getEmployeeDocuments(Number(id));
            setEmployee(response.employee);
            setDocuments(response.documents || {});
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const handleView = async (id: number) => {
        try {

            const response = await getDocumentViewUrl(id);

            window.open(response.url, "_blank");

        } catch (error) {
            console.log(error);
        }
    };

    const handleDownload = async (id: number) => {
        try {

            const response = await getDocumentViewUrl(id);

            const link = document.createElement("a");

            link.href = response.url;
            link.download = "";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

        } catch (error) {
            console.log(error);
        }
    };

    const columns = useMemo(
        () => [
            {
                key: "documentType",
                title: "Document Type",
            },
            {
                key: "documentName",
                title: "Document Name",
            },
            // {
            //     key: "status",
            //     title: "Status",
            //     render: (value: unknown) => {
            //         const status = value as string;

            //         return (
            //             <span
            //                 className={`rounded-full px-3 py-1 text-xs font-medium ${status === "approved"
            //                     ? "bg-green-100 text-green-700"
            //                     : status === "rejected"
            //                         ? "bg-red-100 text-red-700"
            //                         : "bg-yellow-100 text-yellow-700"
            //                     }`}
            //             >
            //                 {status.charAt(0).toUpperCase() + status.slice(1)}
            //             </span>
            //         );
            //     },
            // },
            {
                key: "fileSize",
                title: "Size",
                render: (value: unknown) =>
                    `${((Number(value) || 0) / 1024).toFixed(2)} KB`,
            },
            {
                key: "action",
                title: "Action",
                render: (_: unknown, row: EmployeeDocument) => (
                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => handleView(row.id)}
                            className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                            title="View"
                        >
                            <FiEye />
                        </button>

                        <button
                            onClick={() => handleDownload(row.id)}
                            className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                            title="Download"
                        >
                            <FiDownload />
                        </button>

                    </div>
                ),
            },
        ],
        []
    );

    if (loading) {
        return <PageLoader text="Loading documents..." />;
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6">

            <div className="flex items-center justify-between">

                <PageHeader title="Employee Documents" />

                <Breadcrumb />

            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

                    <div>
                        <p className="text-sm text-gray-500">Employee ID</p>
                        <h3 className="font-semibold">{employee?.employeeId}</h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Employee Name</p>
                        <h3 className="font-semibold">{employee?.name}</h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <h3 className="font-semibold">{employee?.email}</h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Designation</p>
                        <h3 className="font-semibold">
                            {employee?.designation || "-"}
                        </h3>
                    </div>

                </div>

            </div>

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                {documents.length === 0 ? (
                    <div className="rounded-xl border bg-white py-12 text-center text-gray-500">
                        No documents uploaded yet.
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={documents}
                        loading={loading}
                    />
                )}

            </div>

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 rounded-lg border px-5 py-2 hover:bg-gray-50"
            >
                <FiArrowLeft />
                Back
            </button>

        </div>
    );
};

export default EmployeeDocumentDetails;