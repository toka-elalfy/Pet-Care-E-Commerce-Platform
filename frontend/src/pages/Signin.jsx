import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupCat from '../assets/images/signup-cat.png';
import logoIcon from '../assets/icons/signup-logo-icon.svg';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    console.log('Signin submitted:', formData);
    navigate('/dashboard');
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
            to="/signup"
            className="font-manrope font-semibold text-[13px] text-[#0f766e] hover:text-[#0d6962] transition-colors"
          >
            Create account
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

            {/* Heading */}
            <h1 className="font-sora font-bold text-[24px] sm:text-[32px] leading-tight text-[#1f2937] mb-2">
              Welcome back
            </h1>

            {/* Subtitle */}
            <p className="font-manrope font-normal text-[13px] lg:text-[14px] text-[#6b7280] mb-8">
              Sign in to manage your pets, orders, and subscriptions.
            </p>

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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full h-11 lg:h-[48px] bg-[#fff8f1] border border-[#e7e2d9] rounded-[12px] lg:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#6b7280]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-11 lg:h-[48px] bg-[#fff8f1] border border-[#e7e2d9] rounded-[12px] lg:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                />
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex flex-row items-center justify-between gap-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="peer appearance-none w-4 h-4 border border-[#d1d5db] rounded-[4px] bg-white checked:bg-[#0f766e] checked:border-[#0f766e] transition-all cursor-pointer"
                    />
                    <svg
                      className="absolute w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-manrope font-medium text-[12px] lg:text-[13px] text-[#4b5563] group-hover:text-[#1f2937]">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="font-manrope font-semibold text-[12px] lg:text-[13px] text-[#0f766e] hover:text-[#0d6962] transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full h-11 lg:h-[48px] bg-[#0f766e] rounded-full flex items-center justify-center gap-2 hover:bg-[#0d6962] transition-all mt-2 shadow-md active:scale-95"
              >
                <span className="font-manrope font-semibold text-[14px] text-white">
                  Sign in
                </span>
              </button>
            </form>

            {/* Create account link */}
            <p className="text-center mt-6 font-manrope text-[13px] text-[#6b7280]">
              New to Zootopia?{' '}
              <Link
                to="/signup"
                className="font-manrope font-bold text-[#0f766e] hover:text-[#0d6962] transition-colors"
              >
                Create account
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

export default Signin;
