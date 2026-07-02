import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail } from 'lucide-react';

export default function PersonalInfoForm({ data, onSave }) {
  const [formData, setFormData] = useState({
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
        >
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <User size={16} />
            </div>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
            />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: 'easeInOut' }}
        >
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Mail size={16} />
            </div>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
            />
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}
        >
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
          />
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-6 flex justify-end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25, ease: 'easeInOut' }}
      >
        <button 
          onClick={() => onSave(formData)}
          className="px-5 py-2 bg-[#1B4332] text-white rounded-full text-sm font-semibold hover:bg-[#122e23] transition shadow-sm"
        >
          Save changes
        </button>
      </motion.div>
    </>
  );
}
