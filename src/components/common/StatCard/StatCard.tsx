import type { ReactNode } from 'react';

interface Props {
    title: string;
    value: string | number;
    icon: ReactNode;
}

const StatCard = ({
    title,
    value,
    icon,
}: Props) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-800">
                        {value}
                    </h2>
                </div>

                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;