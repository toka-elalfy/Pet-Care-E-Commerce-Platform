import React from 'react';
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
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { cartItems } = useCart();

  // Simple helper to check if a path is active
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="w-[280px] shrink-0 border-r border-gray-100 bg-white p-6 hidden lg:flex flex-col gap-8">
      <div className="rounded-2xl border border-gray-100 p-4 shadow-sm bg-white">
        <div className="flex -space-x-2 mb-3">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
          <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
          <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase">Household</p>
        <h3 className="font-bold text-gray-900 flex items-center justify-between">Sarah's pets <ChevronRight size={14}/></h3>
        <p className="text-xs text-gray-400">3 profiles • 2 active subs</p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 px-2">Menu</p>
          <SidebarLink to="/" icon={LayoutDashboard} label="Overview" active={isActive('/overview')} />
          <SidebarLink to="/" icon={Dog} label="My Pets" active={isActive('/mypets')} />
          <SidebarLink to="/" icon={Heart} label="For My Pet" active={isActive('/formypet')} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 px-2">Shopping</p>
          <SidebarLink to="/" icon={ShoppingBag} label="Shop" active={isActive('/shop')} />
          <SidebarLink to="/orders" icon={Package} label="Orders" active={isActive('/orders')} badge={2} />
          <SidebarLink to="/bundles" icon={ShoppingBag} label="Bundles" active={isActive('/bundles')} />
          <SidebarLink to="/cart" icon={ShoppingCartIcon} label="Cart" active={isActive('/cart')} badge={cartItems.length > 0 ? cartItems.length : null} />
          <SidebarLink to="/subscriptions" icon={RefreshCw} label="Subscriptions" active={isActive('/subscriptions')} badge={2} />
          <SidebarLink to="/reminders" icon={Bell} label="Reminders" active={isActive('/reminders')} badge={3} />
        </div>
        <div className="mt-8">
            <SidebarLink to="/account" icon={User} label="Account" active={isActive('/account')} />
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ icon: Icon, label, badge, active = false, to = "#" }) {
  return (
    <Link to={to} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition mb-1 ${active ? 'bg-[#1B4332] text-white shadow-lg shadow-green-900/10' : 'text-gray-500 hover:bg-gray-50'}`}>
      <Icon size={18} className={active ? 'text-white' : 'text-gray-400'} />
      <span className="flex-1">{label}</span>
      {badge && <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${label === 'Reminders' ? 'bg-red-500 text-white' : active ? 'bg-white/20' : 'bg-green-100 text-[#1B4332]'}`}>{badge}</span>}
    </Link>
  );
}
