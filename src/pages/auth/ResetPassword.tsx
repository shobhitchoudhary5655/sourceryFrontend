import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Modal from "@/components/ui/Modal/Modal";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Toast from "@/components/ui/Toast/Toast";
import { resetPassword } from "@/services/auth.service";

const ResetPassword = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");
    const [successModal, setSuccessModal] = useState(false);

    useEffect(() => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (!isMobile) return;

        window.location.href = `sourceryit://reset-password?token=${token}`;
    }, [token]);

    const showToast = (message: string, type: "success" | "error") => {
        setToastMessage(message);
        setToastType(type);
        setToastOpen(true);
    };

    const handleSubmit = async () => {

        if (!token) {
            showToast("Invalid or expired reset link.", "error");
            return;
        }

        if (!password.trim()) {
            showToast("Please enter your new password.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showToast("Passwords do not match.", "error");
            return;
        }

        try {
            setLoading(true);
            await resetPassword({ token, password, });
            setSuccessModal(true);
        } catch (err: any) {
            showToast(err?.response?.data?.message || "Unable to reset password.", "error");
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

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold text-[#7F26FD]">
                            Reset Password
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Enter your new password below.
                        </p>

                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            New Password
                        </label>

                        <div className="relative">
                            <Input
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

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 mt-4">
                            Confirm New Password
                        </label>

                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                                className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7F26FD] focus:border-transparent"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 "
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-12 bg-[#7F26FD] hover:bg-[#6C22F5] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-300/40 disabled:opacity-70 flex items-center justify-center mt-8"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </div>

            </div>

            <Modal
                open={successModal}
                title="Password Reset Successful"
                onClose={() => {
                    setSuccessModal(false);
                    navigate("/");
                }}
            >
                <div className="text-center">

                    <div className="text-6xl mb-5">
                        ✅
                    </div>

                    <h3 className="text-xl font-semibold mb-3">
                        Your password has been updated.
                    </h3>

                    <p className="text-gray-600 leading-7">
                        Your Sourcery IT account password has been changed successfully.
                    </p>

                    <p className="text-gray-600 mt-3 leading-7">
                        A confirmation email has also been sent to your registered email address.
                    </p>

                    <Button
                        className="w-full mt-8"
                        onClick={() => {
                            setSuccessModal(false);
                            navigate("/");
                        }}
                    >
                        Close
                    </Button>

                </div>
            </Modal>
        </>
    );
};

export default ResetPassword;