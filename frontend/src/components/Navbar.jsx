import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/icons/logo.svg';
import searchIcon from '../assets/icons/search.svg';

const navLinks = [
  { label: 'Home', path: '/', active: true },
  { label: 'Shop', path: '/#shop', active: false },
  { label: 'Bundle Builder', path: '/#bundle', active: false },
  { label: 'How It Works', path: '/#howitworks', active: false },
  { label: 'Help', path: '/#help', active: false },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-[rgba(255,255,255,0.85)] border-b border-[#e7e2d9] backdrop-blur-md sticky top-0 z-50 w-full flex justify-center">
      <div className="w-full max-w-[1280px] h-[72px] flex items-center justify-between px-4 xl:px-[24px]">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-[10px] shrink-0">
          <img src={logoSvg} alt="Zootopia" className="w-[36px] h-[36px]" />
          <span className="font-sora font-semibold text-[18.72px] tracking-[-0.28px] leading-[18.72px]">
            <span className="text-[#1f2937]">Zoo</span>
            <span className="text-[#0f766e]">topia</span>
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-[4px] h-[37px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`px-[16px] flex items-center justify-center h-full rounded-[10px] font-manrope font-medium text-[14px] leading-[21px] transition-colors whitespace-nowrap ${
                link.active
                  ? 'bg-[rgba(15,118,110,0.1)] text-[#0f766e]'
                  : 'text-[rgba(31,41,55,0.75)] hover:text-[#1f2937] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search & Actions - Desktop */}
        <div className="hidden lg:flex items-center gap-[8px]">
          <div className="relative w-[260px] h-[40px]">
            <img src={searchIcon} alt="" className="absolute left-[12px] top-[12px] w-[16px] h-[16px]" />
            <input
              type="text"
              placeholder="Search products, pets, advice…"
              className="w-full h-full bg-[#fff8f1] border border-[#e7e2d9] rounded-full pl-[36px] pr-[12px] text-[14px] text-[#1f2937] font-manrope font-normal focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[rgba(31,41,55,0.5)]"
            />
          </div>

          <div className="flex items-center gap-[8px] h-[40px]">
            <Link to="/signin" className="px-[16px] flex items-center justify-center h-full text-[#1f2937] font-manrope font-medium text-[14px] leading-[21px] rounded-full hover:bg-gray-50 transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="px-[24px] flex items-center justify-center h-full bg-[#0f766e] text-white font-manrope font-semibold text-[14px] leading-[21px] rounded-full shadow-[0px_1px_3px_0px_rgba(15,118,110,0.2),0px_1px_2px_0px_rgba(15,118,110,0.2)] hover:bg-[#0d6962] transition-colors">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-[22px] h-[2px] bg-[#1f2937] rounded transition-transform ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-[22px] h-[2px] bg-[#1f2937] rounded transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-[22px] h-[2px] bg-[#1f2937] rounded transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full bg-white border-b border-[#e7e2d9] shadow-lg z-40 px-4 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-[10px] font-manrope font-medium text-[14px] ${
                link.active ? 'bg-[rgba(15,118,110,0.1)] text-[#0f766e]' : 'text-[rgba(31,41,55,0.75)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative w-full h-[40px] mt-2">
            <img src={searchIcon} alt="" className="absolute left-[12px] top-[12px] w-[16px] h-[16px]" />
            <input
              type="text"
              placeholder="Search products, pets, advice…"
              className="w-full h-full bg-[#fff8f1] border border-[#e7e2d9] rounded-full pl-[36px] pr-[12px] text-[14px] font-manrope placeholder:text-[rgba(31,41,55,0.5)]"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Link to="/signin" className="flex flex-1 items-center justify-center h-[40px] border border-[#e7e2d9] text-[#1f2937] font-manrope font-medium text-[14px] rounded-full">Sign In</Link>
            <Link to="/signup" className="flex flex-1 items-center justify-center h-[40px] bg-[#0f766e] text-white font-manrope font-semibold text-[14px] rounded-full">Get Started</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
