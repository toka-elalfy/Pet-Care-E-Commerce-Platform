import React from 'react';
import { motion } from 'framer-motion';

const NOTIFICATION_SETTINGS = [
  { id: 'reorder', title: 'Reorder reminders', desc: 'Alerts before food and meds run out' },
  { id: 'updates', title: 'Order updates', desc: 'Shipping confirmations and delivery alerts' },
  { id: 'promo', title: 'Promotions', desc: 'Sales, bundles, and seasonal offers' },
  { id: 'product', title: 'Product updates', desc: 'New arrivals matched to your pet' },
  { id: 'email', title: 'Email channel', desc: 'Receive notifications by email' },
  { id: 'sms', title: 'SMS channel', desc: 'Receive notifications by text' },
];

export default function NotificationPreferences({ notifState, setNotifState }) {

  return (
    <div className="space-y-4">
      {NOTIFICATION_SETTINGS.map((notif, i) => (
        <motion.div
          key={notif.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: 'easeInOut' }}
          onClick={() => setNotifState(prev => ({ ...prev, [notif.id]: !prev[notif.id] }))}
          className="border border-gray-100 rounded-xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{notif.title}</h4>
            <p className="text-xs text-gray-500 mt-1">{notif.desc}</p>
          </div>
          <button 
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${notifState[notif.id] ? 'bg-[#1B4332]' : 'bg-gray-200'}`}
          >
            <div 
              className={`w-5 h-5 bg-white rounded-full absolute top-[2px] transition-transform shadow-sm ${notifState[notif.id] ? 'translate-x-[26px]' : 'translate-x-[2px]'}`} 
            />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
