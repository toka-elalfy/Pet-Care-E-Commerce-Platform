import React from 'react';
import Sidebar from '../components/Sidebar';
import { Edit2, SkipForward, Pause, X, Play, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Mock Data ─── */
const subscriptions = [
  {
    id: 'SUB-001',
    title: 'Grain-Free Salmon Adult Formula',
    pet: 'Bella',
    frequency: 'Every 4 weeks',
    status: 'Active',
    nextDelivery: 'May 12, 2026',
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop'
  },
  {
    id: 'SUB-002',
    title: 'Indoor Cat Chicken Dinner',
    pet: 'Milo',
    frequency: 'Every 6 weeks',
    status: 'Active',
    nextDelivery: 'May 28, 2026',
    price: 29.00,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop'
  },
  {
    id: 'SUB-003',
    title: 'Daily Joint Support Chews',
    pet: 'Bella',
    frequency: 'Every 8 weeks',
    status: 'Paused',
    nextDelivery: 'Paused',
    price: 27.00,
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=100&h=100&fit=crop'
  }
];

export default function Subscriptions() {
  return (
    <div className="flex min-h-screen bg-[#FDFCF9] font-sans">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage recurring deliveries, frequencies, and upcoming shipments.</p>
          </header>

          <div className="space-y-6">
            {subscriptions.map(sub => (
              <SubscriptionCard key={sub.id} subscription={sub} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function SubscriptionCard({ subscription }) {
  const isActive = subscription.status === 'Active';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden flex flex-col md:flex-row md:items-center gap-6">
      
      {/* Product Image & Info */}
      <div className="flex items-start md:items-center gap-6 flex-1 min-w-0">
        <img 
          src={subscription.image} 
          alt={subscription.title} 
          className="w-20 h-20 rounded-xl object-cover border border-gray-100 bg-gray-50 shrink-0" 
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="font-bold text-gray-900 text-[17px] leading-tight">{subscription.title}</h3>
            <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${isActive ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-gray-100 text-gray-600'}`}>
              {subscription.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">For {subscription.pet} • {subscription.frequency}</p>
          <div className="flex items-center gap-2 mt-2">
            <RefreshCw size={14} className={isActive ? "text-[#52B788]" : "text-gray-400"} />
            <p className="text-xs font-semibold text-gray-900">Next delivery: {subscription.nextDelivery}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0 md:pl-6 md:border-l md:border-gray-100">
        {/* Price */}
        <div className="flex flex-col sm:items-center justify-center shrink-0 min-w-[100px]">
          <p className="text-2xl font-bold text-gray-900">${subscription.price}</p>
          <p className="text-[10px] font-bold text-[#52B788] uppercase tracking-wide mt-1">billed per delivery</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <ActionButton to={`/subscriptions/edit/${subscription.id}`} icon={Edit2} label="Edit" />
          {isActive ? (
            <>
              <ActionButton icon={SkipForward} label="Skip next" />
              <ActionButton icon={Pause} label="Pause" />
            </>
          ) : (
            <ResumeButton />
          )}
          <CancelButton />
        </div>
      </div>

    </div>
  );
}

function ActionButton({ icon: Icon, label, to }) {
  const inner = (
    <>
      <Icon size={14} /> {label}
    </>
  );
  const className = "flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-xs font-semibold hover:bg-gray-50 transition shadow-sm whitespace-nowrap";
  
  if (to) {
    return <Link to={to} className={className}>{inner}</Link>;
  }
  return <button className={className}>{inner}</button>;
}

function ResumeButton() {
  return (
    <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1B4332] text-white rounded-full text-xs font-semibold hover:bg-[#122e23] transition shadow-sm whitespace-nowrap">
      <Play size={14} fill="currentColor" /> Resume
    </button>
  );
}

function CancelButton() {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-[#dc2626] rounded-full text-xs font-semibold hover:bg-red-50 hover:border-red-200 transition shadow-sm whitespace-nowrap">
      <X size={14} strokeWidth={2.5} /> Cancel
    </button>
  );
}
