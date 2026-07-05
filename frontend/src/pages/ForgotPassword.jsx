import { useState } from 'react';
import { Link } from 'react-router-dom';
import signupCat from '../assets/images/signup-cat.png';
import logoIcon from '../assets/icons/signup-logo-icon.svg';

import { forgotPassword } from '../utils/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setError(null);
        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            console.error('Forgot password error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fff8f1] flex flex-col animate-[fadeIn_0.5s_ease-out]">
            {/* Top navbar */}
            <header className="bg-white border-b border-[#e7e2d9] w-full flex justify-center shrink-0">
                <div className="w-full max-w-[1562px] h-[64px] lg:h-[72px] flex items-center justify-between px-4 lg:px-[165px]">
                    <Link
                        to="/"
                        className="font-sora font-semibold text-[14px] lg:text-[16px] text-[#1f2937] hover:text-[#0f766e] transition-colors"
                    >
                        ← Zootopia
                    </Link>
                    <Link
                        to="/signin"
                        className="font-manrope font-semibold text-[13px] text-[#0f766e] hover:text-[#0d6962] transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </header>

            {/* Main content */}
            <div className="flex flex-1 w-full">
                {/* Left side — Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-6 py-10 lg:py-16">
                    <div className="w-full max-w-[420px]">
                        {/* Logo */}
                        <div className="flex items-center gap-2 mb-6 lg:mb-8">
                            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#0f766e] rounded-[12px] lg:rounded-[14px] flex items-center justify-center shrink-0">
                                <img src={logoIcon} alt="" className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
                            </div>
                            <span className="font-sora font-semibold text-[16px] lg:text-[18px] text-[#1f2937]">
                                Zootopia
                            </span>
                        </div>

                        {!submitted ? (
                            <>
                                {/* Heading */}
                                <h1 className="font-sora font-bold text-[24px] sm:text-[32px] leading-tight text-[#1f2937] mb-2">
                                    Forgot password?
                                </h1>

                                {/* Subtitle */}
                                <p className="font-manrope font-normal text-[13px] lg:text-[14px] text-[#6b7280] mb-6">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-[12px] text-[13px] font-manrope">
                                        {error}
                                    </div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    {/* Email */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#6b7280]">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            disabled={loading}
                                            className="w-full h-11 lg:h-[48px] bg-[#fff8f1] border border-[#e7e2d9] rounded-[12px] lg:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all disabled:opacity-50"
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-11 lg:h-[48px] bg-[#0f766e] rounded-full flex items-center justify-center gap-2 hover:bg-[#0d6962] transition-all mt-2 shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                                    >
                                        <span className="font-manrope font-semibold text-[14px] text-white">
                                            {loading ? 'Sending link...' : 'Send reset link'}
                                        </span>
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="animate-[fadeIn_0.3s_ease-out]">
                                {/* Heading */}
                                <h1 className="font-sora font-bold text-[24px] sm:text-[32px] leading-tight text-[#1f2937] mb-4">
                                    Check your email
                                </h1>

                                {/* Subtitle */}
                                <p className="font-manrope font-normal text-[14px] text-[#4b5563] mb-8 leading-relaxed">
                                    We've sent a password reset link to <span className="font-semibold text-[#1f2937]">{email}</span>. Please click the link in that email to reset your password.
                                </p>

                                {/* Check spam note */}
                                <div className="bg-[#f3f4f6] rounded-[12px] p-4 text-[13px] text-[#6b7280] font-manrope mb-8">
                                    If you don't receive an email within a few minutes, please check your spam folder or try again.
                                </div>

                                {/* Resend button */}
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="w-full h-11 lg:h-[48px] border border-[#0f766e]/20 bg-white text-[#0f766e] rounded-full flex items-center justify-center gap-2 hover:bg-[#0f766e]/5 transition-all shadow-sm active:scale-95 cursor-pointer"
                                >
                                    <span className="font-manrope font-semibold text-[14px]">
                                        Try another email address
                                    </span>
                                </button>
                            </div>
                        )}

                        {/* Back to sign in link */}
                        <p className="text-center mt-6 font-manrope text-[13px] text-[#6b7280]">
                            Remember your password?{' '}
                            <Link
                                to="/signin"
                                className="font-manrope font-bold text-[#0f766e] hover:text-[#0d6962] transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right side — Image panel */}
                <div className="hidden lg:block w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#0f766e]" />
                    <img
                        src={signupCat}
                        alt="Cat"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(128.213deg, rgba(15, 118, 110, 0.8) 0%, rgba(15, 118, 110, 0.4) 100%)',
                        }}
                    />

                    {/* Bottom text content */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 flex flex-col justify-end h-full pointer-events-none">
                        <h2 className="font-sora font-semibold text-[24px] lg:text-[28px] leading-snug text-white max-w-[360px]">
                            Warm welcomes, happy tails. Pick up right where you left off.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
