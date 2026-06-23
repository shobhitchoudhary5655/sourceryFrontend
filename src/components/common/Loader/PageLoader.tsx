import { LoaderCircle } from 'lucide-react';

type PageLoaderProps = {
    text?: string;
    fullScreen?: boolean;
};

const PageLoader = ({ text = 'Loading...', fullScreen = false, }: PageLoaderProps) => {
    return (
        <div
            className={`flex items-center justify-center px-4 text-gray-500 ${fullScreen ? 'min-h-screen' : 'min-h-[300px]'}  `} >
            <div className="flex flex-col items-center gap-3">
                <LoaderCircle
                    size={72}
                    className="animate-spin text-[#7F26FD]"
                />

                <p className="text-sm font-medium sm:text-base">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default PageLoader;