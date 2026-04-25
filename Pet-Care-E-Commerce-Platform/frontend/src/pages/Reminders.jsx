import React from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, ShoppingCart, RefreshCw } from 'lucide-react';

/* ─── Mock Data ─── */
const MOCK_SUMMARY = [
  {
    title: 'Running low',
    value: '1',
    icon: Bell,
    hexBg: '#fef2f2',
    hexColor: '#ef4444'
  },
  {
    title: 'Upcoming deliveries',
    value: '2',
    icon: Bell,
    hexBg: '#E6F4EA',
    hexColor: '#1B4332'
  },
  {
    title: 'Suggestions',
    value: '4',
    icon: Bell,
    hexBg: '#fff7ed',
    hexColor: '#f97316'
  }
];

const MOCK_REMINDERS = [
  {
    id: 1,
    title: "Bella's food is running low",
    subtitle: 'Grain-Free Salmon Adult Formula',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop',
    daysLeft: '~6 days left',
    progress: 85,
    hexColor: '#ef4444'
  },
  {
    id: 2,
    title: "Milo's litter refill soon",
    subtitle: 'Indoor Cat Chicken Dinner',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop',
    daysLeft: '~14 days left',
    progress: 50,
    hexColor: '#f97316'
  },
  {
    id: 3,
    title: "Coco's shampoo almost out",
    subtitle: 'Pure Oat Calming Shampoo',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=100&h=100&fit=crop',
    daysLeft: '~21 days left',
    progress: 25,
    hexColor: '#52B788'
  }
];

const MOCK_HISTORY = [
  { date: 'Apr 21', message: 'Your order ORD-10482 was delivered' },
  { date: 'Apr 18', message: "Bella's food predicted to run out in 7 days" },
  { date: 'Apr 14', message: "Milo's subscription shipped" },
  { date: 'Apr 10', message: 'New recommendation: Senior Joint Support' }
];

export default function Reminders() {
  return (
    <div className="flex min-h-screen bg-[#FDFCF9] font-sans">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reminders & notifications</h1>
            <p className="text-gray-500 mt-1 text-sm">We watch supplies for you and nudge before you run out.</p>
          </header>

          <div className="space-y-10">
            
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {MOCK_SUMMARY.map((stat, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: stat.hexBg, color: stat.hexColor }}
                  >
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">{stat.title}</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reminders List */}
            <div className="space-y-4">
              {MOCK_REMINDERS.map(reminder => (
                <div key={reminder.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
                  
                  {/* Product Info */}
                  <div className="flex items-center gap-8 flex-1 min-w-0">
                    <img 
                      src={reminder.image} 
                      alt={reminder.title} 
                      className="w-[72px] h-[72px] rounded-xl object-cover border border-gray-100 bg-gray-50 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-[17px] leading-tight truncate mb-1">{reminder.title}</h4>
                      <p className="text-xs text-gray-500 mb-2.5 truncate">{reminder.subtitle}</p>
                      
                      {/* Progress Bar */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden shrink-0">
                          <div 
                            className="h-full rounded-full transition-all duration-500" 
                            style={{ width: `${reminder.progress}%`, backgroundColor: reminder.hexColor }}
                          />
                        </div>
                        <span 
                          className="text-[11px] font-bold shrink-0"
                          style={{ color: reminder.hexColor }}
                        >
                          {reminder.daysLeft}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-end gap-3 shrink-0 md:pl-6 md:border-l md:border-gray-100">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] text-white rounded-full text-xs font-semibold hover:bg-[#122e23] transition shadow-sm whitespace-nowrap">
                      <ShoppingCart size={14} /> Reorder now
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-xs font-semibold hover:bg-gray-50 transition shadow-sm whitespace-nowrap">
                      <RefreshCw size={14} /> Convert to subscription
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Notification History */}
            <div>
              <h3 className="font-bold text-gray-900 text-[17px] mb-4">Notification history</h3>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex flex-col">
                  {MOCK_HISTORY.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-6 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition cursor-default"
                    >
                      <span className="text-xs text-gray-400 font-semibold w-12 shrink-0">{item.date}</span>
                      <p className="text-sm text-gray-700">{item.message}</p>
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
