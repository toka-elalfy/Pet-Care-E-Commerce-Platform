import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupCat from '../assets/images/signup-cat.png';
import logoIcon from '../assets/icons/signup-logo-icon.svg';
import checkCircle from '../assets/icons/check-circle-green.svg';
import arrowRight from '../assets/icons/arrow-right-signup.svg';
import checkBenefit from '../assets/icons/check-circle-benefit.svg';

const Signup = () => {
  const navigate = useNavigate();
  // Form state — ready for future backend integration
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend API
    console.log('Signup submitted:', formData);
    navigate('/onboarding');
  };

  // Password validation
  const hasMinLength = formData.password.length >= 8;
  const hasUpperAndNumber = /[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password);

  return (
    <div className="min-h-screen bg-[#fff8f1] flex flex-col animate-[fadeIn_0.5s_ease-out]">
      {/* Top navbar */}
      <header className="bg-white border-b border-[#e7e2d9] w-full flex justify-center shrink-0">
        <div className="w-full max-w-[1562px] h-[64px] lg:h-[72px] flex items-center justify-between px-4 lg:px-[165px]">
          <a
            href="/"
            className="font-sora font-semibold text-[14px] lg:text-[16px] text-[#1f2937] hover:text-[#0f766e] transition-colors"
          >
            ← Zootopia
          </a>
          <a
            href="/signin"
            className="font-manrope font-semibold text-[13px] text-[#0f766e] hover:text-[#0d6962] transition-colors"
          >
            Sign in
          </a>
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
              Create your account
            </h1>

            {/* Subtitle */}
            <p className="font-manrope font-normal text-[13px] lg:text-[14px] text-[#6b7280] mb-8">
              Your pets deserve better. Set up in under a minute.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* First name */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#6b7280]">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Sarah"
                    className="w-full h-11 lg:h-[48px] bg-[#fff8f1] border border-[#e7e2d9] rounded-[12px] lg:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                  />
                </div>

                {/* Last name */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#6b7280]">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Johnson"
                    className="w-full h-11 lg:h-[48px] bg-[#fff8f1] border border-[#e7e2d9] rounded-[12px] lg:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                  />
                </div>
              </div>

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
                  placeholder="At least 8 characters"
                  className="w-full h-11 lg:h-[48px] bg-[#fff8f1] border border-[#e7e2d9] rounded-[12px] lg:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                />
              </div>

              {/* Password requirements */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <img
                    src={checkCircle}
                    alt=""
                    className={`w-[13px] h-[13px] transition-opacity ${hasMinLength ? 'opacity-100' : 'opacity-30'}`}
                  />
                  <span className="font-manrope text-[11px] lg:text-[12px] text-[#6b7280]">
                    8+ characters
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <img
                    src={checkCircle}
                    alt=""
                    className={`w-[13px] h-[13px] transition-opacity ${hasUpperAndNumber ? 'opacity-100' : 'opacity-30'}`}
                  />
                  <span className="font-manrope text-[11px] lg:text-[12px] text-[#6b7280]">
                    1 uppercase, 1 number
                  </span>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full h-11 lg:h-[48px] bg-[#0f766e] rounded-full flex items-center justify-center gap-2 hover:bg-[#0d6962] transition-all mt-2 shadow-md active:scale-95"
              >
                <span className="font-manrope font-semibold text-[14px] text-white">
                  Create account
                </span>
                <img src={arrowRight} alt="" className="w-[15px] h-[15px]" />
              </button>
            </form>

            {/* Sign in link */}
            <p className="text-center mt-6 font-manrope text-[13px] text-[#6b7280]">
              Already have an account?{' '}
              <a
                href="/signin"
                className="font-manrope font-bold text-[#0f766e] hover:text-[#0d6962] transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Right side — Image panel */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0f766e]" />
          <img
            src={signupCat}
            alt="Cat"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(128.2deg, rgba(15, 118, 110, 0.8) 0%, rgba(15, 118, 110, 0.4) 100%)',
            }}
          />

          {/* Bottom text content */}
          <div className="absolute bottom-0 left-0 right-0 p-12 flex flex-col gap-6">
            <h2 className="font-sora font-semibold text-[24px] lg:text-[28px] leading-snug text-white max-w-[360px]">
              Join 120,000+ pet parents caring smarter every day.
            </h2>

            <ul className="flex flex-col gap-2">
              {[
                'Personalized picks for every pet',
                'Vet-approved products',
                'Reorder reminders',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <img src={checkBenefit} alt="" className="w-4 h-4 shrink-0" />
                  <span className="font-manrope text-[13px] lg:text-[14px] text-white/90">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
