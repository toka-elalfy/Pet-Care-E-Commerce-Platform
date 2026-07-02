import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function AddressBookList({ addresses = [], setAddresses }) {

  const handleRemove = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleMakePrimary = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isPrimary: addr.id === id
    })));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {addresses.map((addr, i) => (
          <motion.div 
            key={addr.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, delay: i * 0.05, ease: 'easeInOut' }}
            className="border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={16} className="text-gray-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">{addr.title}</h4>
                  {addr.isPrimary && (
                    <span className="px-2 cursor-default py-0.5 bg-[#E6F4EA] text-[#1B4332] text-[10px] font-bold rounded-md tracking-wide">PRIMARY</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{addr.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!addr.isPrimary && (
                <button 
                  onClick={() => handleMakePrimary(addr.id)}
                  className="px-5 py-2 border border-transparent rounded-full text-xs font-bold text-gray-700 transition shadow-sm bg-[#F5F3EC] hover:bg-[#EAE7DF]"
                >
                  Make primary
                </button>
              )}
              <button 
                onClick={() => handleRemove(addr.id)}
                className="px-5 py-2 bg-red-50 border border-transparent text-red-600 rounded-full text-xs font-bold hover:bg-red-100 transition shadow-sm"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add New Address */}
      <motion.button 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
        className="w-full py-4 mt-2 border-2 border-dashed border-gray-300 bg-transparent text-gray-500 rounded-xl text-sm font-bold hover:border-gray-400 hover:text-gray-700 transition flex items-center justify-center gap-2"
      >
        + Add new address
      </motion.button>
    </div>
  );
}
