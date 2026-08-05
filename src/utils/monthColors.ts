export const MONTH_ROW_COLORS: Record<number, string> = {
    1: "bg-red-50",
    2: "bg-orange-50",
    3: "bg-yellow-50",
    4: "bg-green-50",
    5: "bg-cyan-50",
    6: "bg-blue-50",
    7: "bg-purple-50",
    8: "bg-pink-50",
    9: "bg-slate-100",
    10: "bg-indigo-50",
    11: "bg-emerald-50",
    12: "bg-rose-50",
};

export const MONTH_BADGE_COLORS: Record<number, string> = {
    1: "bg-red-100 text-red-700",
    2: "bg-orange-100 text-orange-700",
    3: "bg-yellow-100 text-yellow-700",
    4: "bg-green-100 text-green-700",
    5: "bg-cyan-100 text-cyan-700",
    6: "bg-blue-100 text-blue-700",
    7: "bg-purple-100 text-purple-700",
    8: "bg-pink-100 text-pink-700",
    9: "bg-gray-200 text-gray-700",
    10: "bg-indigo-100 text-indigo-700",
    11: "bg-emerald-100 text-emerald-700",
    12: "bg-rose-100 text-rose-700",
};

export const getSalaryRowColor = (month: number) => {
    return MONTH_ROW_COLORS[month] || "bg-white";
};

export const getSalaryBadgeColor = (month: number) => {
    return MONTH_BADGE_COLORS[month] || "bg-gray-100 text-gray-700";
};