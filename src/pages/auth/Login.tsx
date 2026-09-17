import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import logo from '@/assets/logo/logo.png';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/auth.service';
import notificationService from '@/services/notification.service';
import Toast from '@/components/ui/Toast/Toast';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("error");
    const showToast = (message: string, type: "success" | "error") => {
        setToastMessage(message);
        setToastType(type);
        setToastOpen(true);
    };
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            showToast("Please enter email and password", "error");
            return;
        }

        try {
            setLoading(true);

            const granted = await notificationService.requestPermission();
            console.log("Permission:", granted);

            let fcmToken = "";

            if (granted) {
                fcmToken = await notificationService.getFCMToken();
            }
            const response = await loginUser({
                email,
                password,
                fcmToken,
                platform: "web",
            });

            if (response.user.role != 'admin') {
                return null
            }
            login(response.token, response.user);
            navigate(ROUTES.ADMIN.DASHBOARD);
        } catch (error: any) {
            console.log(error);
            showToast(error?.response?.data?.message || "Something went wrong. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toast
                open={toastOpen}
                message={toastMessage}
                type={toastType}
                onClose={() => setToastOpen(false)}
            />
            <div className="min-h-screen bg-[#F3F6FD] flex items-center justify-center px-4">
                <div className="w-full max-w-md">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <img
                            src={logo}
                            alt="Sourcery IT"
                            className="w-20 h-20 mx-auto mb-4"
                        />

                        <h1 className="text-4xl font-bold text-[#6C22F5]">
                            Sourcery IT
                        </h1>

                        <p className="text-gray-500 mt-2 font-medium">
                            Login to continue
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl">

                        <form
                            onSubmit={handleLogin}
                            className="space-y-5"
                        >
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="shobhit@gmail.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    disabled={loading}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7F26FD] focus:border-transparent
                "
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7F26FD] focus:border-transparent"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 "
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                                    className="text-sm font-medium text-[#7F26FD] hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-[#7F26FD] hover:bg-[#6C22F5] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-300/40 disabled:opacity-70 flex items-center justify-center"
                            >
                                {loading ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;