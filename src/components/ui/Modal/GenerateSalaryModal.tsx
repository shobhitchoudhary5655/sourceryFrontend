import Modal from "@/components/ui/Modal/Modal";

interface Props {
    open: boolean;
    month: string;
    year: string;
    loading?: boolean;

    setMonth: (value: string) => void;
    setYear: (value: string) => void;

    onClose: () => void;
    onGenerate: () => void;
}

const GenerateSalaryModal = ({
    open,
    month,
    year,
    loading,
    setMonth,
    setYear,
    onClose,
    onGenerate,
}: Props) => {
    return (
        <Modal
            open={open}
            title="Generate Salary"
            onClose={onClose}
        >
            <div className="space-y-4">
                <p className="text-gray-600">
                    Select the month and year for which you want to generate salary.
                </p>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Month
                    </label>

                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2"
                    >
                        {Array.from({ length: 12 }, (_, index) => (
                            <option
                                key={index + 1}
                                value={index + 1}
                            >
                                {new Date(
                                    2025,
                                    index
                                ).toLocaleString("default", {
                                    month: "long",
                                })}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Year
                    </label>

                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2"
                    >
                        {Array.from({ length: 5 }, (_, index) => {
                            const y =
                                new Date().getFullYear() - index;

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
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-xl border px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onGenerate}
                        disabled={loading}
                        className="rounded-xl bg-[#7F26FD] px-4 py-2 text-white"
                    >
                        {loading ? "Generating..." : "Generate"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default GenerateSalaryModal;