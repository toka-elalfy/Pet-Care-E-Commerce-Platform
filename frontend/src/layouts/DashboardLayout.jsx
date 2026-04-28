import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNav from '../components/dashboard/TopNav';
import Sidebar from '../components/dashboard/Sidebar';
import Footer from '../components/dashboard/Footer';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [path]);

  // Logic to determine active states
  let activePage = 'Dashboard';
  let activeNav = 'Overview';

  if (path.includes('/my-pets')) {
    activePage = 'My Pets';
    activeNav = 'My Pets';
  } else if (path.includes('/add-pet') || path.includes('/edit-pet')) {
    activePage = 'My Pets';
    activeNav = 'My Pets';
  } else if (path.includes('/for-my-pet')) {
    activePage = 'For My Pet';
    activeNav = 'For My Pet';
  } else if (path.includes('/shop')) {
    activePage = 'Shop';
    activeNav = 'Shop';
  }

  const isShopPage = path.startsWith('/shop');
  const showSidebar = !isShopPage;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#fff8f1] flex flex-col font-manrope overflow-x-hidden">
      <TopNav activePage={activePage} toggleSidebar={toggleSidebar} />
      
      {/* Shell */}
      <div className={`flex-1 w-full max-w-[1562px] mx-auto px-4 lg:px-[141px] py-6 lg:py-8 flex gap-8 lg:gap-12 ${!showSidebar ? 'justify-center' : ''}`}>
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && showSidebar && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {showSidebar && (
          <Sidebar 
            activeNav={activeNav} 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        )}

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col min-w-0 ${!showSidebar ? 'max-w-[1280px]' : ''}`}>
          <Outlet />
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
