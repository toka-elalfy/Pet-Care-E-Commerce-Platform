import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ArrowLeft, User, MapPin, CreditCard, Lock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalInfoForm from '../components/account/PersonalInfoForm';
import AddressBookList from '../components/account/AddressBookList';
import NotificationPreferences from '../components/account/NotificationPreferences';

export default function AccountSettings() {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isAddressBookOpen, setIsAddressBookOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Hoisted state
  const [personalInfo, setPersonalInfo] = useState({ name: 'Sarah Johnson', email: 'sarah@example.com', phone: '' });
  const [addresses, setAddresses] = useState([
    { id: 1, title: 'Home', address: '124 Maple St. Austin TX 78701', isPrimary: true },
    { id: 2, title: 'Office', address: '500 Cesar Chavez, Austin TX 78701', isPrimary: false }
  ]);
  const [notifState, setNotifState] = useState({ 
    reorder: true, updates: true, promo: false, product: true, email: true, sms: false 
  });

  const handleSavePersonalInfo = (data) => {
    setPersonalInfo(data);
    setIsEditingPersonalInfo(false);
  };

  const dynamicSections = [
    {
      title: 'Personal info',
      subtitle: `${personalInfo.name} • ${personalInfo.email}`,
      icon: User,
    },
    {
      title: 'Address book',
      subtitle: `${addresses.length} saved addresses`,
      icon: MapPin,
    },
    {
      title: 'Payment methods',
      subtitle: 'Visa ending 4242',
      icon: CreditCard,
    },
    {
      title: 'Password & security',
      subtitle: 'Last changed 2 months ago',
      icon: Lock,
    },
    {
      title: 'Notification preferences',
      subtitle: `${Object.values(notifState).filter(Boolean).length} channels on`,
      icon: Bell,
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCF9] font-sans">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          
          <header className="mb-10">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:underline">
              <ArrowLeft size={16} />
              <span>Back</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-6">Account settings</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage personal info, addresses, payments, and preferences.</p>
          </header>

          <div className="space-y-4">
            
            {/* Standard Sections */}
            {dynamicSections.map((section, idx) => {
              const isPersonal = section.title === 'Personal info';
              const isAddress = section.title === 'Address book';
              const isNotifications = section.title === 'Notification preferences';
              const isExpanded = (isPersonal && isEditingPersonalInfo) || (isAddress && isAddressBookOpen) || (isNotifications && isNotificationsOpen);

              return (
                <div key={idx} className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm transition ${!isExpanded ? 'hover:border-gray-200 cursor-pointer' : ''}`}>
                  
                  {/* Top Bar (Title & Button) */}
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-[#E6F4EA] text-[#1B4332] flex items-center justify-center shrink-0">
                        <section.icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">{section.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{section.subtitle}</p>
                      </div>
                    </div>

                    {(isPersonal || isAddress || isNotifications) ? (
                      <AnimatePresence mode="wait">
                        <motion.button 
                          key={isExpanded ? 'close' : 'edit'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15, ease: 'easeInOut' }}
                          onClick={() => {
                            if (isPersonal) setIsEditingPersonalInfo(!isEditingPersonalInfo);
                            if (isAddress) setIsAddressBookOpen(!isAddressBookOpen);
                            if (isNotifications) setIsNotificationsOpen(!isNotificationsOpen);
                          }}
                          className={`px-5 py-2 border rounded-full text-xs font-bold transition shrink-0 shadow-sm ${
                            isExpanded 
                              ? 'bg-[#1B4332] border-[#1B4332] text-white hover:bg-[#122e23]' 
                              : 'border-transparent text-gray-700 hover:opacity-80'
                          }`}
                          style={!isExpanded ? { backgroundColor: '#F5F3EC' } : {}}
                        >
                          {isExpanded ? 'Close' : 'Edit'}
                        </motion.button>
                      </AnimatePresence>
                    ) : (
                      <button 
                        className="px-5 py-2 border border-transparent rounded-full text-xs font-bold text-gray-700 transition shrink-0 shadow-sm"
                        style={{ backgroundColor: '#F5F3EC' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#EAE7DF'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#F5F3EC'}
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {/* Expanded Form Area */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          
                          {isPersonal && <PersonalInfoForm data={personalInfo} onSave={handleSavePersonalInfo} />}
                          {isAddress && <AddressBookList addresses={addresses} setAddresses={setAddresses} />}
                          {isNotifications && <NotificationPreferences notifState={notifState} setNotifState={setNotifState} />}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                </div>
              );
            })}

            {/* Delete Account Section */}
            <div className="mt-8 bg-white border border-red-100 rounded-2xl p-6 flex items-center justify-between gap-6 pt-6 mt-12">
              <div>
                <h3 className="font-bold text-base" style={{ color: '#dc2626' }}>Delete account</h3>
                <p className="text-sm text-gray-500 mt-0.5">Permanently remove your data, pets, and subscriptions.</p>
              </div>

              <button 
                className="px-6 py-2.5 bg-white rounded-full text-sm font-bold transition shrink-0 shadow-sm"
                style={{ color: '#dc2626', borderColor: '#dc2626', borderWidth: '1px' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
              >
                Delete
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
