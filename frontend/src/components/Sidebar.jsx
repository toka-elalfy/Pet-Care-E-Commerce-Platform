import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  LayoutDashboard,
  Dog,
  Heart,
  ShoppingBag,
  Package,
  RefreshCw,
  Bell,
  User,
  ChevronRight,
  ShoppingCart as ShoppingCartIcon,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Simple helper to check if a path is active
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile Top Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-40">
        <h1 className="text-xl font-bold text-[#1B4332]">PetCare</h1>
        <button onClick={() => setIsOpen(true)} className="p-2 -mr-2 text-gray-500 hover:text-gray-900 transition">
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[88px] px-3' : 'w-[280px] px-6'} py-6 shrink-0 border-r border-gray-100 bg-white flex flex-col gap-8 h-screen lg:h-auto overflow-y-auto lg:overflow-visible`}>
        {/* Mobile close button inside drawer */}
        <button 
          className="lg:hidden absolute top-6 right-6 p-2 -mt-2 -mr-2 text-gray-400 hover:text-gray-900 transition"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Desktop Collapse Toggle */}
        <button 
          className="hidden lg:flex absolute top-10 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shadow-sm z-50 bg-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronRight size={14} className={`transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
      <div className={`rounded-2xl border border-gray-100 p-4 shadow-sm bg-white transition-all duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="flex -space-x-2 mb-3">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
          <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
          <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase">Household</p>
        <h3 className="font-bold text-gray-900 flex items-center justify-between">Sarah's pets <ChevronRight size={14}/></h3>
        <p className="text-xs text-gray-400">3 profiles • 2 active subs</p>
      </div>

      {isCollapsed && (
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 border-2 border-white shadow-sm">SP</div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <p className={`text-[10px] font-bold text-gray-400 uppercase mb-3 px-2 ${isCollapsed ? 'hidden' : 'block'}`}>Menu</p>
          <div className={`${isCollapsed ? 'block text-center mb-3' : 'hidden'}`}>
            <div className="w-4 border-t-2 border-gray-200 mx-auto rounded-full"></div>
          </div>
          <SidebarLink to="/" icon={LayoutDashboard} label="Overview" active={isActive('/overview')} isCollapsed={isCollapsed} />
          <SidebarLink to="/" icon={Dog} label="My Pets" active={isActive('/mypets')} isCollapsed={isCollapsed} />
          <SidebarLink to="/" icon={Heart} label="For My Pet" active={isActive('/formypet')} isCollapsed={isCollapsed} />
        </div>
        <div>
          <p className={`text-[10px] font-bold text-gray-400 uppercase mb-3 px-2 ${isCollapsed ? 'hidden' : 'block'}`}>Shopping</p>
          <div className={`${isCollapsed ? 'block text-center mb-3' : 'hidden'}`}>
            <div className="w-4 border-t-2 border-gray-200 mx-auto rounded-full"></div>
          </div>
          <SidebarLink to="/" icon={ShoppingBag} label="Shop" active={isActive('/shop')} isCollapsed={isCollapsed} />
          <SidebarLink to="/orders" icon={Package} label="Orders" active={isActive('/orders')} badge={2} isCollapsed={isCollapsed} />
          <SidebarLink to="/bundles" icon={ShoppingBag} label="Bundles" active={isActive('/bundles')} isCollapsed={isCollapsed} />
          <SidebarLink to="/cart" icon={ShoppingCartIcon} label="Cart" active={isActive('/cart')} badge={cartItems.length > 0 ? cartItems.length : null} isCollapsed={isCollapsed} />
          <SidebarLink to="/subscriptions" icon={RefreshCw} label="Subscriptions" active={isActive('/subscriptions')} badge={2} isCollapsed={isCollapsed} />
          <SidebarLink to="/reminders" icon={Bell} label="Reminders" active={isActive('/reminders')} badge={3} isCollapsed={isCollapsed} />
        </div>
        <div className="mt-8 pb-8 lg:pb-0">
            <SidebarLink to="/account" icon={User} label="Account" active={isActive('/account')} isCollapsed={isCollapsed} />
        </div>
      </div>
    </aside>
    </>
  );
}

function SidebarLink({ icon: Icon, label, badge, active = false, to = "#", isCollapsed }) {
  return (
    <Link to={to} className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-xl text-sm font-medium transition mb-1 ${active ? 'bg-[#1B4332] text-white shadow-lg shadow-green-900/10' : 'text-gray-500 hover:bg-gray-50'} relative group`}>
      <Icon size={18} className={`${active ? 'text-white' : 'text-gray-400'} shrink-0`} />
      {!isCollapsed && <span className="flex-1 whitespace-nowrap overflow-hidden">{label}</span>}
      {(!isCollapsed && badge) && <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shrink-0 ${label === 'Reminders' ? 'bg-red-500 text-white' : active ? 'bg-white/20' : 'bg-green-100 text-[#1B4332]'}`}>{badge}</span>}
      
      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-bold rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
          {label} {badge && `(${badge})`}
        </div>
      )}
    </Link>
  );
}
