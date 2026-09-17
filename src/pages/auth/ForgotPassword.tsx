import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Toast from "@/components/ui/Toast/Toast";
import logo from "@/assets/logo/logo.png";
import { forgotPassword } from "@/services/auth.service";
import { ROUTES } from "@/routes/routes";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        open: false,
        message: "",
        type: "success" as "success" | "error",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setToast({
                open: true,
                message: "Please enter your registered email.",
                type: "error",
            });
            return;
        }

        try {
            setLoading(true);
            const response = await forgotPassword(email);
            setToast({
                open: true,
                message: response.message,
                type: "success",
            });
            setTimeout(() => {
                navigate(ROUTES.LOGIN);
            }, 2500);

        } catch (error: any) {

            setToast({
                open: true,
                message: error.response?.data?.message || "Something went wrong.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toast
                open={toast.open}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, open: false, })}
            />

            <div className="min-h-screen bg-[#F3F6FD] flex items-center justify-center px-4">
                <div className="w-full max-w-md">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-20 h-20 mx-auto mb-4"
                        />

                        <h1 className="text-4xl font-bold text-[#6C22F5]">
                            Sourcery IT
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Forgot your password?
                        </p>

                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-8">

                        <h2 className="text-2xl font-semibold mb-2">
                            Forgot Password
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Enter your registered email address.
                            We'll send you a password reset link.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full"
                            >
                                Send Reset Link
                            </Button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/login")
                                }
                                className="w-full text-[#7F26FD] font-medium hover:underline"
                            >
                                Back to Login
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
};

export default ForgotPassword;