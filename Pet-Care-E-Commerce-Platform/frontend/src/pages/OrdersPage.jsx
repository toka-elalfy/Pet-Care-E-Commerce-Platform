import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';

/* ─── Sample Data ─── */
const orders = [
  { id: 'ORD-10482', date: 'Apr 18, 2026', items: 'Grain-Free Salmon Adult, Plush Lamb Comfort Toy', status: 'Delivered', total: '$112.00' },
  { id: 'ORD-10471', date: 'Apr 04, 2026', items: 'Grain-Free Salmon Adult', status: 'Shipped', total: '$58.00' },
  { id: 'ORD-10456', date: 'Mar 21, 2026', items: 'Indoor Cat Chicken Dinner, Oat Calming Shampoo', status: 'Processing', total: '$59.00' },
  { id: 'ORD-10433', date: 'Mar 02, 2026', items: 'Joint Support Chews, Fetch Pro Frisbee', status: 'Delivered', total: '$92.00' },
];

const statusStyles = {
  Delivered: 'bg-[#D1FAE5] text-[#065F46]',
  Shipped: 'bg-[#DBEAFE] text-[#1E40AF]',
  Processing: 'bg-[#FEF3C7] text-[#92400E]',
};

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="flex min-h-screen bg-[#FDFCF9] font-sans">
      <Sidebar />

      {/* ── Main Content (The Orders Part) ── */}
      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 mt-1 text-sm">Track, reorder, and manage every delivery</p>
          </header>

          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search orders, products..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/10" />
            </div>
            <div className="flex gap-2">
              {['All', 'Processing', 'Shipped', 'Delivered'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${activeFilter === f ? 'bg-[#1B4332] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left">Order</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Items</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Total</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => {
                  const isVisible = activeFilter === 'All' || order.status === activeFilter;
                  if (!isVisible) return null;
                  
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-5 font-bold text-gray-900">{order.id}</td>
                      <td className="px-6 py-5 text-gray-500">{order.date}</td>
                      <td className="px-6 py-5 text-gray-500 italic max-w-xs truncate">{order.items}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${statusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-gray-900">{order.total}</td>
                      <td className="px-6 py-5 text-right">
                        <Link to={`/orders/${order.id}`} className="text-gray-400 hover:text-[#1B4332] font-medium transition cursor-pointer inline-block p-2">
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}