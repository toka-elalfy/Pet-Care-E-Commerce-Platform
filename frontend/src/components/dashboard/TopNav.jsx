import { useNavigate } from 'react-router-dom';
import { Bell, ShoppingCart, Menu } from 'lucide-react';
import logoMark from '../../assets/icons/logo-mark.svg';

const TopNav = ({ activePage, toggleSidebar }) => {
  const navigate = useNavigate();
  const navLinks = ['Dashboard', 'My Pets', 'Shop', 'For My Pet', 'Bundles', 'Orders', 'Subscriptions', 'Reminders'];

  return (
    <header className="bg-white/85 backdrop-blur border-b border-[#e7e2d9] h-[73px] flex items-center justify-between px-4 lg:px-6 shrink-0 w-full z-[110] sticky top-0">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-[#1f2937]" />
        </button>

        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2.5">
          <img src={logoMark} alt="Zootopia" className="w-[32px] h-[32px] lg:w-[36px] lg:h-[36px]" />
          <span className="font-sora font-semibold text-[16px] lg:text-[18.72px] tracking-[-0.28px]">
            <span className="text-[#1f2937]">Zoo</span>
            <span className="text-[#0f766e]">topia</span>
          </span>
        </button>
      </div>

      <nav className="hidden xl:flex items-center gap-1">
        {navLinks.map(link => {
          const path = 
            link === 'Dashboard' ? '/dashboard' : 
            link === 'My Pets' ? '/my-pets' : 
            link === 'For My Pet' ? '/for-my-pet' : 
            link === 'Shop' ? '/shop' : 
            '#';
          const isActive = activePage === link;
          return (
            <button
              key={link}
              onClick={() => navigate(path)}
              className={`h-[37px] px-3 rounded-[10px] font-manrope font-medium text-[13px] transition-colors whitespace-nowrap ${
                isActive 
                  ? 'bg-[#e6f1f0] text-[#0f766e] font-semibold' 
                  : 'text-[#1f2937]/75 hover:text-[#1f2937] hover:bg-gray-50'
              }`}
            >
              {link}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-1 lg:gap-3">
        <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-[18px] h-[18px] text-[#374151]" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f97360] rounded-full border-2 border-white" />
        </div>
        <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart className="w-[18px] h-[18px] text-[#374151]" />
          <div className="absolute -top-0.5 -right-0.5 bg-[#f97360] text-white text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white">2</div>
        </div>
        <div className="hidden sm:flex w-8 h-8 bg-[#a7c7a3]/40 text-[#0f766e] rounded-full items-center justify-center font-sora font-semibold text-[14px] lg:text-[16px] cursor-pointer ml-1">
          SJ
        </div>
      </div>
    </header>
  );
};

export default TopNav;
