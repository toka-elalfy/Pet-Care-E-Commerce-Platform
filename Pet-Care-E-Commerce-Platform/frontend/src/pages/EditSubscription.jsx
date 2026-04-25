import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  ArrowLeft,
  Calendar,
  RefreshCw,
  Minus,
  Plus,
  SkipForward,
  Pause,
  X
} from 'lucide-react';

/* ─── Mock Data ─── */
const MOCK_DATA = {
  id: 'SUB-001',
  title: 'Grain-Free Salmon Adult Formula',
  pet: 'Bella',
  status: 'Active',
  price: 49.00,
  brand: 'Wildroot • Food',
  image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop',
  nextDelivery: 'May 12, 2026',
  frequency: 4,
  quantity: 1,
  upcoming: [
    { date: 'May 12, 2026', items: '1 × Grain-Free Salmon Adult' },
    { date: 'Jun 09, 2026', items: '1 × Grain-Free Salmon Adult' },
    { date: 'Jul 07, 2026', items: '1 × Grain-Free Salmon Adult' }
  ]
};

export default function EditSubscription() {
  const { id } = useParams();
  const sub = MOCK_DATA; // using the mock data globally to represent any ID for now

  const [frequency, setFrequency] = useState(sub.frequency);
  const [quantity, setQuantity] = useState(sub.quantity);

  return (
    <div className="flex min-h-screen bg-[#FDFCF9] font-sans">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit subscription</h1>
              <p className="text-gray-500 mt-1 text-sm">Change frequency, quantity, or pause anytime.</p>
            </div>
            <Link to="/subscriptions" className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <ArrowLeft size={16} /> All subscriptions
            </Link>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Main Forms) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Product Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-6">
                <img 
                  src={sub.image} 
                  alt={sub.title} 
                  className="w-24 h-24 rounded-xl object-cover border border-gray-100 bg-gray-50 shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#D1FAE5] text-[#065F46] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shrink-0">
                      {sub.status}
                    </span>
                    <p className="text-sm text-gray-500">For {sub.pet}</p>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight truncate mt-1">{sub.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{sub.brand}</p>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-6 border-l border-gray-100 hidden sm:flex">
                  <p className="text-2xl font-bold text-gray-900">${sub.price.toFixed(2)}</p>
                  <p className="text-[10px] font-bold text-[#52B788] uppercase tracking-wide mt-1">per delivery • 15% off</p>
                </div>
              </div>

              {/* Delivery frequency */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 text-[17px] mb-1">Delivery frequency</h3>
                <p className="text-sm text-gray-500 mb-6">How often your subscription ships. Next delivery recalculates instantly.</p>
                
                <div className="flex flex-wrap gap-3">
                  {[2, 4, 6, 8].map(weeks => (
                    <button
                      key={weeks}
                      onClick={() => setFrequency(weeks)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                        frequency === weeks 
                          ? 'bg-[#1B4332] text-white shadow-md shadow-green-900/10' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Every {weeks} weeks
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 text-[17px] mb-1">Quantity per delivery</h3>
                <p className="text-sm text-gray-500 mb-6">Match the volume to your pet's usage to avoid waste.</p>
                
                <div className="flex items-center gap-6">
                  {/* Plus/Minus counter */}
                  <div className="flex items-center bg-white border border-gray-200 rounded-full h-11 w-36 shadow-sm overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-gray-900 w-10 text-center text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    ${sub.price.toFixed(2)} × {quantity} = <strong className="text-gray-900">${(sub.price * quantity).toFixed(2)}</strong> per delivery
                  </p>
                </div>
              </div>

              {/* Manage subscription */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 text-[17px] mb-6">Manage subscription</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Skip Card */}
                  <div className="border border-gray-100 rounded-xl p-5 hover:border-green-200 cursor-pointer transition group">
                    <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#065F46] flex items-center justify-center mb-4 font-bold">
                      <SkipForward size={18} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#1B4332] transition">Skip next delivery</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Pushes back your next ship date by one cycle.</p>
                  </div>

                  {/* Pause Card */}
                  <div className="border border-gray-100 rounded-xl p-5 hover:border-green-200 cursor-pointer transition group">
                    <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#065F46] flex items-center justify-center mb-4">
                      <Pause size={18} fill="currentColor" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#1B4332] transition">Pause subscription</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Pause deliveries with no end date.</p>
                  </div>

                  {/* Cancel Card */}
                  <div className="border border-gray-100 rounded-xl p-5 hover:border-red-200 cursor-pointer transition group">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center mb-4">
                      <X size={18} strokeWidth={2.5} />
                    </div>
                    <h4 className="font-bold text-[#DC2626] text-sm mb-1">Cancel subscription</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Stops future deliveries. You can resubscribe later.</p>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Next Delivery */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  <Calendar size={14} /> Next Delivery
                </h4>
                <p className="text-2xl font-bold text-gray-900 mb-1">{sub.nextDelivery}</p>
                <p className="text-sm text-gray-500">every {frequency} weeks - ships to Austin, TX</p>
              </div>

              {/* Upcoming schedule */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="font-bold text-gray-900 text-[17px] mb-4">Upcoming schedule</h4>
                <div className="space-y-3">
                  {sub.upcoming.map((entry, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-[#FDFCF9] border border-gray-50 rounded-xl p-4">
                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#52B788] shrink-0 shadow-sm">
                        <RefreshCw size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm leading-tight">{entry.date}</p>
                        <p className="text-[11px] text-gray-500 mt-1">{entry.items}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
