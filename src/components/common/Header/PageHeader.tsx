interface Props {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, action, }: Props) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800" >
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-gray-500 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

            {action}
        </div>
    );
};

export default PageHeader;