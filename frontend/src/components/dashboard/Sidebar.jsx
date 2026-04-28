import { useNavigate } from 'react-router-dom';
import { Settings, X } from 'lucide-react';

// Images
import bellaImg from '../../assets/images/dashboard-bella.png';
import miloImg  from '../../assets/images/dashboard-milo.png';
import cocoImg  from '../../assets/images/dashboard-coco.png';

// Icons
import overviewIcon      from '../../assets/icons/overview-icon.svg';
import mypetsIcon        from '../../assets/icons/mypets-icon.svg';
import mypetsActiveIcon  from '../../assets/icons/mypets-active-icon.svg';
import formypetIcon      from '../../assets/icons/formypet-icon.svg';
import shopIcon          from '../../assets/icons/shop-icon.svg';
import ordersIcon        from '../../assets/icons/orders-icon.svg';
import subscriptionsIcon from '../../assets/icons/subscriptions-icon.svg';
import remindersIcon     from '../../assets/icons/reminders-icon.svg';
import accountIcon       from '../../assets/icons/account-icon.svg';

const Sidebar = ({ activeNav, isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Overview',    icon: overviewIcon,     path: '/dashboard' },
    { label: 'My Pets',     icon: mypetsIcon,       path: '/my-pets', activeIcon: mypetsActiveIcon },
    { label: 'For My Pet',  icon: formypetIcon,     path: '/for-my-pet' },
  ];

  const shoppingItems = [
    { label: 'Shop',          icon: shopIcon,          path: '/shop' },
    { label: 'Orders',        icon: ordersIcon,        path: '#', badge: { val: '2', cls: 'bg-[#0f766e]/10 text-[#0f766e]' } },
    { label: 'Subscriptions', icon: subscriptionsIcon, path: '#', badge: { val: '2', cls: 'bg-[#0f766e]/10 text-[#0f766e]' } },
    { label: 'Reminders',     icon: remindersIcon,     path: '#', badge: { val: '3', cls: 'bg-[#f97360] text-white' } },
  ];

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-[120] lg:z-auto
      w-[290px] lg:w-[290px] shrink-0
      transition-transform duration-300 ease-in-out lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      bg-[#fff8f1] lg:bg-transparent
    `}>
      <div className="h-full lg:h-auto overflow-y-auto lg:overflow-visible bg-white border border-[#e7e2d9]/80 rounded-r-[24px] lg:rounded-[24px] shadow-[0px_1px_2px_0px_rgba(17,24,39,0.04),0px_8px_24px_0px_rgba(15,118,110,0.12)] p-3 relative">
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-[#6b7280]" />
        </button>

        {/* Household block */}
        <div
          className="border border-[#e7e2d9]/70 rounded-[16px] p-3 flex flex-col gap-3 mb-4 mt-8 lg:mt-0"
          style={{ backgroundImage: 'linear-gradient(153deg,#fff8f1 0%,#fffeff 100%)' }}
        >
          <div className="flex justify-between items-start">
            <div className="relative h-9 w-[92px]">
              <img src={bellaImg} className="absolute left-0 top-0 w-9 h-9 rounded-full border-2 border-white object-cover z-30 shadow-sm" alt="Bella" />
              <img src={miloImg}  className="absolute left-7 top-0 w-9 h-9 rounded-full border-2 border-white object-cover z-20 shadow-sm" alt="Milo"  />
              <img src={cocoImg}  className="absolute left-14 top-0 w-9 h-9 rounded-full border-2 border-white object-cover z-10 shadow-sm" alt="Coco"  />
            </div>
            <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors">
              <Settings className="w-[14px] h-[14px] text-[#6b7280]" />
            </button>
          </div>
          <div>
            <p className="font-manrope font-semibold text-[10px] text-[#0f766e] uppercase tracking-[1.4px]">Household</p>
            <h3 className="font-sora font-semibold text-[15px] text-[#1f2937]">Sarah's pets</h3>
            <p className="font-manrope text-[12px] text-[#6b7280]">3 profiles · 2 active subs</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-3 pb-3">
          {/* MENU */}
          <div>
            <p className="font-manrope font-semibold text-[10px] text-[#9ca3af] uppercase tracking-[1.4px] mb-1.5 px-3">Menu</p>
            <div className="flex flex-col gap-0.5">
              {menuItems.map((item) => {
                const isActive = activeNav === item.label;
                const icon = (isActive && item.activeIcon) ? item.activeIcon : item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.path !== '#') {
                        navigate(item.path);
                        onClose && onClose();
                      }
                    }}
                    className={`flex items-center gap-3 h-10 px-3 rounded-[14px] relative transition-all w-full text-left ${
                      isActive 
                        ? 'bg-[#0f766e] text-white shadow-[0px_4px_14px_0px_rgba(15,118,110,0.45)]' 
                        : 'text-[#374151] hover:bg-gray-50'
                    }`}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#f97360] rounded-r-full" />}
                    <img src={icon} className="w-[17px] h-[17px]" alt="" />
                    <span className={`font-manrope text-[13.5px] tracking-[-0.07px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SHOPPING */}
          <div>
            <p className="font-manrope font-semibold text-[10px] text-[#9ca3af] uppercase tracking-[1.4px] mb-1.5 px-3">Shopping</p>
            <div className="flex flex-col gap-0.5">
              {shoppingItems.map((item) => {
                const isActive = activeNav === item.label;
                return (
                  <button 
                    key={item.label} 
                    onClick={() => {
                      if (item.path && item.path !== '#') {
                        navigate(item.path);
                        onClose && onClose();
                      }
                    }}
                    className={`flex items-center gap-3 h-10 px-3 rounded-[14px] transition-colors w-full text-left ${
                      isActive 
                        ? 'bg-[#0f766e] text-white shadow-[0px_4px_14px_0px_rgba(15,118,110,0.45)]' 
                        : 'text-[#374151] hover:bg-gray-50'
                    }`}
                  >
                    <img src={item.icon} className={`w-[17px] h-[17px] ${isActive ? 'brightness-0 invert' : ''}`} alt="" />
                    <span className={`font-manrope text-[13.5px] flex-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
                    {item.badge && (
                      <span className={`${isActive ? 'bg-white/20 text-white' : item.badge.cls} font-manrope font-semibold text-[11px] w-5 h-5 flex items-center justify-center rounded-full`}>
                        {item.badge.val}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-[#e7e2d9]/80" />

          <button className="flex items-center gap-3 h-10 px-3 rounded-[14px] text-[#374151] hover:bg-gray-50 transition-colors w-full text-left">
            <img src={accountIcon} className="w-[17px] h-[17px]" alt="" />
            <span className="font-manrope font-medium text-[13.5px]">Account</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
