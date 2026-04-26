import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  PackageSearch,
  RefreshCw,
  ShoppingBag,
  CreditCard,
  Truck
} from 'lucide-react';

/* ─── Mock Data Helpers ─── */
const MOCK_ORDERS = {
  'ORD-10482': {
    id: 'ORD-10482',
    date: 'Apr 18, 2026',
    status: 'Delivered',
    tracking: '1Z999AA10123456784',
    subtotal: 67.00,
    shippingCost: 0,
    tax: 0,
    total: 67.00,
    items: [
      {
        id: 1,
        title: 'Grain-Free Salmon Adult Formula',
        qty: 1,
        type: 'subscription',
        price: 49.00,
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        title: 'Plush Lamb Comfort Toy',
        qty: 1,
        type: 'one-time',
        price: 18.00,
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=100&h=100&fit=crop'
      }
    ],
    timeline: [
      { label: 'Order placed', date: 'Apr 18, 2026' },
      { label: 'Processing', date: 'Apr 18, 2026' },
      { label: 'Shipped', date: 'Apr 19, 2026' },
      { label: 'Delivered', date: 'Apr 19, 2026' }
    ]
  },
  'ORD-10456': {
    id: 'ORD-10456',
    date: 'Mar 21, 2026',
    status: 'Processing',
    tracking: '1Z999AA10123456784',
    subtotal: 87.00,
    shippingCost: 0,
    tax: 0,
    total: 87.00,
    items: [
      {
        id: 1,
        title: 'Indoor Cat Chicken Dinner',
        qty: 1,
        type: 'subscription',
        price: 29.00,
        image: 'https://images.unsplash.com/photo-1584852758129-af0db163aed0?q=80&w=100&auto=format&fit=crop'
      },
      {
        id: 2,
        title: 'Grain-Free Salmon Adult Formula',
        qty: 1,
        type: 'one-time',
        price: 58.00,
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop'
      }
    ],
    timeline: [
      { label: 'Order placed', date: 'Mar 21, 2026' },
      { label: 'Processing', date: 'Mar 21, 2026' },
      { label: 'Shipped', date: '—' },
      { label: 'Delivered', date: 'Estimated 2-3 days' }
    ]
  }
};

const DEFAULT_ORDER = MOCK_ORDERS['ORD-10482'];

const STATUS_CONFIG = {
  Delivered: {
    title: 'Delivered',
    badgeClass: 'bg-[#D1FAE5] text-[#065F46]',
    icon: PackageCheck,
    iconBg: 'bg-[#D1FAE5]',
    iconColor: 'text-[#065F46]',
    stepIndex: 3
  },
  Processing: {
    title: 'Being prepared',
    badgeClass: 'bg-[#FEF3C7] text-[#92400E]',
    icon: PackageSearch,
    iconBg: 'bg-[#D1FAE5]',  // light green bg in the image
    iconColor: 'text-[#065F46]',
    stepIndex: 1
  },
  Shipped: {
    title: 'On the way',
    badgeClass: 'bg-[#DBEAFE] text-[#1E40AF]',
    icon: Truck,
    iconBg: 'bg-[#DBEAFE]',
    iconColor: 'text-[#1E40AF]',
    stepIndex: 2
  }
};

export default function OrderDetails() {
  const { id } = useParams();
  const order = MOCK_ORDERS[id] || { ...DEFAULT_ORDER, id };
  
  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.Processing;
  const activeStepIndex = statusConfig.stepIndex;

  return (
    <div className="flex min-h-screen bg-[#FDFCF9] font-sans">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order {order.id}</h1>
              <p className="text-gray-500 mt-1 text-sm">Placed {order.date}</p>
            </div>
            <Link to="/orders" className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <ArrowLeft size={16} /> All orders
            </Link>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-6">
              
              {/* Status Tracker Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${statusConfig.iconBg} flex items-center justify-center ${statusConfig.iconColor}`}>
                      <statusConfig.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{statusConfig.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">Tracking #{order.tracking}</p>
                    </div>
                  </div>
                  <span className={`${statusConfig.badgeClass} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}>
                    {order.status}
                  </span>
                </div>

                {/* Timeline */}
                <div className="mt-8 mb-16 mx-4">
                  <div className="flex items-center relative w-full">
                    {order.timeline.map((step, idx) => {
                      const isPastOrCurrent = idx <= activeStepIndex;
                      const isPast = idx < activeStepIndex;
                      const isLast = idx === order.timeline.length - 1;
                      
                      return (
                        <React.Fragment key={idx}>
                          {/* Step Circle & Label */}
                          <div className="relative flex flex-col items-center shrink-0 z-10">
                            {isPastOrCurrent ? (
                              <div className="w-8 h-8 rounded-full bg-[#1B4332] text-white flex items-center justify-center ring-4 ring-white shadow-sm">
                                <CheckCircle2 size={16} />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-white border-[2px] border-[#D1D5DB] flex items-center justify-center ring-4 ring-white">
                                <div className="w-2 h-2 rounded-full bg-[#9CA3AF]"></div>
                              </div>
                            )}
                            
                            {/* Text absolutely positioned below the circle to not stretch flex elements */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-28 text-center pt-1">
                              <p className="text-xs font-bold text-gray-900 leading-snug">{step.label}</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">{step.date}</p>
                            </div>
                          </div>
                          
                          {/* Connecting Line Segment */}
                          {!isLast && (
                            <div className={`flex-1 h-[2px] -mx-2 z-0 transition-colors duration-500 ${isPast ? 'bg-[#1B4332]' : 'bg-gray-200'}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
                <h3 className="font-bold text-gray-900 text-lg mb-6">Items in this order</h3>
                
                <div className="space-y-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-gray-100 bg-gray-50" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-base leading-tight">{item.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">Qty {item.qty} • {item.type}</p>
                      </div>
                      <p className="font-bold text-gray-900 text-lg">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 bg-[#1B4332] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#122e23] transition shadow-sm">
                    <ShoppingBag size={16} /> Reorder
                  </button>
                  <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition shadow-sm">
                    <RefreshCw size={16} /> Convert to subscription
                  </button>
                </div>
              </div>

            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  <Truck size={14} /> Delivery Address
                </h4>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p>128 Willow Lane</p>
                  <p>Austin, TX 78701</p>
                  <p className="text-gray-500 mt-1">(512) 555-0134</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <Truck size={14} /> Shipping Method
                </h4>
                <p className="text-sm text-gray-700">Standard • 3-5 business days</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <CreditCard size={14} /> Payment
                </h4>
                <p className="text-sm text-gray-700">Cash on delivery</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Summary
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 border-b border-gray-100 pb-4">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-[17px] pt-1">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
