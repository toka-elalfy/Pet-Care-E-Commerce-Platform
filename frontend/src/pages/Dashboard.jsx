import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PawPrint, Package, RefreshCw, AlertCircle } from 'lucide-react';

// Assets
import bellaImg from '../assets/images/dashboard-bella.png';
import miloImg from '../assets/images/dashboard-milo.png';
import cocoImg from '../assets/images/dashboard-coco.png';
import sparklesIcon from '../assets/icons/sparkles-icon.svg';
import trendUpIcon from '../assets/icons/trend-up-icon.svg';

// --- SUB-COMPONENTS --- //

const StatCard = ({ icon: Icon, title, value, trend, iconColor }) => (
  <div className="bg-white border border-[#e7e2d9] rounded-[16px] p-4 lg:p-5 flex flex-col gap-3 lg:gap-4 shadow-sm hover:-translate-y-1 transition-transform">
    <div className="flex items-center gap-2">
      <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${iconColor}`} />
      <span className="font-manrope text-[11px] lg:text-[12px] text-[#6b7280]">{title}</span>
    </div>
    <div className="font-sora font-bold text-[24px] lg:text-[28px] text-[#1f2937] leading-none">{value}</div>
    <div className="flex items-center gap-1.5 mt-0.5 lg:mt-1">
      <img src={trendUpIcon} alt="" className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
      <span className="font-manrope font-semibold text-[10px] lg:text-[11px] text-[#0f766e]">{trend}</span>
    </div>
  </div>
);

// --- MAIN PAGE --- //

const Dashboard = () => {
  const navigate = useNavigate();
  // Mock data for initial UI render (backend ready)
  const [pets] = useState([
    { id: 1, name: 'Bella', type: 'Golden Retriever', age: '3 yrs', weight: '28 kg', image: bellaImg },
    { id: 2, name: 'Milo', type: 'British Shorthair', age: '5 yrs', weight: '4.2 kg', image: miloImg },
    { id: 3, name: 'Coco', type: 'Shih Tzu', age: '1 yr', weight: '6 kg', image: cocoImg },
  ]);

  const [orders] = useState([
    { id: 'ORD-10482', date: 'Apr 18, 2026', status: 'Delivered', total: '$112.00', statusColor: 'bg-[#a7c7a3]/30 text-[#0f766e]' },
    { id: 'ORD-10471', date: 'Apr 04, 2026', status: 'Shipped', total: '$58.00', statusColor: 'bg-[#0f766e]/10 text-[#0f766e]' },
    { id: 'ORD-10456', date: 'Mar 21, 2026', status: 'Processing', total: '$69.00', statusColor: 'bg-[#f59e0b]/15 text-[#b45309]' },
    { id: 'ORD-10433', date: 'Mar 02, 2026', status: 'Delivered', total: '$92.00', statusColor: 'bg-[#a7c7a3]/30 text-[#0f766e]' },
  ]);

  const [reminders] = useState([
    { id: 1, title: "Bella's food is running low", desc: "Grain-Free Salmon Adult Formula · ~6 days left", color: "bg-[#dc2626]", action: "Reorder now" },
    { id: 2, title: "Milo's litter refill soon", desc: "Indoor Cat Chicken Dinner · ~14 days left", color: "bg-[#f59e0b]", action: "Convert to subscription" },
    { id: 3, title: "Coco's shampoo almost out", desc: "Pure Oat Calming Shampoo · ~21 days left", color: "bg-[#16a34a]", action: "Reorder now" },
  ]);

  const [subscriptions] = useState([
    { id: 1, title: "Grain-Free Salmon Adult Formula", desc: "Every 4 weeks · next May 12, 2026" },
    { id: 2, title: "Indoor Cat Chicken Dinner", desc: "Every 6 weeks · next May 28, 2026" },
  ]);

  return (
    <main className="flex-1 flex flex-col gap-6 lg:gap-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-sora font-semibold text-[24px] lg:text-[28px] text-[#1f2937]">Welcome back, Sarah 👋</h1>
          <p className="font-manrope text-[13px] lg:text-[14px] text-[#6b7280]">Here's what's happening in the Johnson household today.</p>
        </div>
        <button 
          onClick={() => navigate('/for-my-pet')}
          className="bg-[#0f766e] hover:bg-[#0d6962] text-white rounded-full h-[40px] lg:h-[44px] px-4 lg:px-5 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md w-full sm:w-auto"
        >
          <img src={sparklesIcon} alt="" className="w-3.5 h-3.5 lg:w-[15px] lg:h-[15px]" />
          <span className="font-manrope font-semibold text-[13px] lg:text-[14px]">See picks for my pets</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 animate-[fadeIn_0.6s_ease-out]">
        <StatCard icon={PawPrint} iconColor="text-[#0f766e]" title="Pets" value="3" trend="+1 this year" />
        <StatCard icon={Package} iconColor="text-[#6b7280]" title="Orders" value="2" trend="Arriving soon" />
        <StatCard icon={RefreshCw} iconColor="text-[#6b7280]" title="Active subs" value="2" trend="15% saved" />
        <StatCard icon={AlertCircle} iconColor="text-[#6b7280]" title="Reminders" value="3" trend="Action needed" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 xl:gap-8 mb-16 animate-[fadeIn_0.7s_ease-out]">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Your Pets */}
          <section className="bg-white border border-[#e7e2d9] rounded-[16px] p-4 lg:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sora font-semibold text-[15px] lg:text-[16px] text-[#1f2937]">Your pets</h2>
              <button onClick={() => navigate('/my-pets')} className="flex items-center gap-1.5 text-[#0f766e] hover:text-[#0d6962] transition-colors">
                <span className="font-manrope font-semibold text-[12px] lg:text-[13px]">Manage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {pets.map(pet => (
                <div 
                  key={pet.id} 
                  onClick={() => navigate('/for-my-pet')}
                  className="bg-[#fff8f1] border border-[#e7e2d9] rounded-[16px] p-4 flex gap-3 items-start hover:shadow-md transition-shadow cursor-pointer"
                >
                  <img src={pet.image} alt={pet.name} className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] rounded-[12px] lg:rounded-[14px] object-cover" />
                  <div className="flex flex-col flex-1">
                    <h3 className="font-sora font-semibold text-[14px] lg:text-[15px] text-[#1f2937] leading-tight">{pet.name}</h3>
                    <p className="font-manrope text-[11px] lg:text-[12px] text-[#6b7280] leading-snug my-1">
                      {pet.type} · {pet.age}
                    </p>
                    <span className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#0f766e] mt-auto">View picks →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Orders */}
          <section className="bg-white border border-[#e7e2d9] rounded-[16px] p-4 lg:p-5 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sora font-semibold text-[15px] lg:text-[16px] text-[#1f2937]">Recent orders</h2>
              <button className="flex items-center gap-1.5 text-[#0f766e] hover:text-[#0d6962] transition-colors">
                <span className="font-manrope font-semibold text-[12px] lg:text-[13px]">View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="border border-[#e7e2d9] rounded-[14px] overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[500px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#fff8f1]">
                    <th className="font-manrope font-bold text-[10px] lg:text-[11px] text-[#6b7280] uppercase tracking-[1.1px] p-3 lg:p-4 py-2.5 lg:py-3">Order</th>
                    <th className="font-manrope font-bold text-[10px] lg:text-[11px] text-[#6b7280] uppercase tracking-[1.1px] p-3 lg:p-4 py-2.5 lg:py-3">Date</th>
                    <th className="font-manrope font-bold text-[10px] lg:text-[11px] text-[#6b7280] uppercase tracking-[1.1px] p-3 lg:p-4 py-2.5 lg:py-3">Status</th>
                    <th className="font-manrope font-bold text-[10px] lg:text-[11px] text-[#6b7280] uppercase tracking-[1.1px] p-3 lg:p-4 py-2.5 lg:py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t border-[#e7e2d9] hover:bg-gray-50/50 transition-colors cursor-pointer text-[12px] lg:text-[13px]">
                      <td className="p-3 lg:p-4 font-manrope font-semibold text-[#1f2937]">{order.id}</td>
                      <td className="p-3 lg:p-4 font-manrope text-[#6b7280]">{order.date}</td>
                      <td className="p-3 lg:p-4">
                        <span className={`inline-flex px-2 py-0.5 lg:py-1 rounded-full font-manrope font-semibold text-[10px] lg:text-[11px] ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3 lg:p-4 font-manrope font-semibold text-[#1f2937] text-right">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Reorder Reminders */}
          <section className="bg-white border border-[#e7e2d9] rounded-[16px] p-4 lg:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sora font-semibold text-[15px] lg:text-[16px] text-[#1f2937]">Reminders</h2>
              <button className="text-[#0f766e] font-manrope font-semibold text-[12px] lg:text-[13px] hover:text-[#0d6962]">All</button>
            </div>
            <div className="flex flex-col gap-3">
              {reminders.map(reminder => (
                <div key={reminder.id} className="bg-[#fff8f1] border border-[#e7e2d9] rounded-[14px] p-3 hover:-translate-y-0.5 transition-transform cursor-pointer shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${reminder.color}`}></div>
                    <h3 className="font-sora font-semibold text-[12px] lg:text-[13px] text-[#1f2937]">{reminder.title}</h3>
                  </div>
                  <p className="font-manrope text-[11px] lg:text-[12px] text-[#6b7280] mb-2">{reminder.desc}</p>
                  <span className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#0f766e]">{reminder.action} →</span>
                </div>
              ))}
            </div>
          </section>

          {/* Active Subscriptions */}
          <section className="bg-white border border-[#e7e2d9] rounded-[16px] p-4 lg:p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="font-sora font-semibold text-[15px] lg:text-[16px] text-[#1f2937]">Subscriptions</h2>
            </div>
            <div className="flex flex-col gap-2">
              {subscriptions.map(sub => (
                <div key={sub.id} className="border border-[#e7e2d9] rounded-[14px] p-3 flex gap-3 items-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="bg-[#0f766e]/10 w-9 h-9 lg:w-10 lg:h-10 rounded-[12px] lg:rounded-[14px] flex items-center justify-center shrink-0">
                    <RefreshCw className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#0f766e]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-sora font-semibold text-[12px] lg:text-[13px] text-[#1f2937] truncate">{sub.title}</h3>
                    <p className="font-manrope text-[10px] lg:text-[11px] text-[#6b7280] leading-snug">{sub.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
