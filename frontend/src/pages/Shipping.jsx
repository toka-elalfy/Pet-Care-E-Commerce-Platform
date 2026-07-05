import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import truckIcon from '../assets/icons/truck.svg';
import packageIcon from '../assets/icons/package.svg';
import pawIcon from '../assets/icons/paw.svg';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import { fetchInfoPage } from '../utils/api';

const defaultShippingMethods = [
  {
    id: 'standard',
    title: 'Standard',
    time: '2–4 business days',
    cost: 'Free over $49 · otherwise $5.99',
    icon: packageIcon,
  },
  {
    id: 'express',
    title: 'Express',
    time: '1–2 business days',
    cost: '$12.99 flat',
    icon: truckIcon,
  },
  {
    id: 'local',
    title: 'Local same-day',
    time: 'Select metros',
    cost: '$14.99 · order by 12pm local',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const defaultInfoCards = [
  {
    title: 'Where we ship',
    content: 'All 50 US states and Washington, DC. International shipping isn\'t available yet — we\'re working on Canada for late 2026.',
  },
  {
    title: 'Tracking',
    content: 'You\'ll get a tracking link the moment your order leaves the warehouse. Orders page also shows a live timeline for every shipment.',
  },
];

const Shipping = () => {
  const navigate = useNavigate();
  const [infoCards, setInfoCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchInfoPage('shipping');
        if (data && data.page && data.page.sections) {
          const formatted = data.page.sections.map(section => ({
            title: section.title,
            content: section.content
          }));
          setInfoCards(formatted);
        } else {
          setInfoCards(defaultInfoCards);
        }
      } catch (err) {
        console.warn('Could not fetch shipping details from API, using default shipping info:', err.message);
        setInfoCards(defaultInfoCards);
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []);

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-24 md:pb-32 font-manrope animate-[fadeIn_0.5s_ease-out] flex flex-col items-center">

      {/* Header Section */}
      <div className="w-full max-w-[720px] text-center mb-16 md:mb-24 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-[#f0f9f9] px-4 py-2 rounded-full mb-6 text-[#0f766e] text-[14px] font-medium border border-[#ccfbf1]">
          <img src={truckIcon} alt="" className="w-[13px] h-[13px] brightness-0 saturate-100 invert-[34%] sepia-[86%] font-semibold" style={{ filter: 'invert(31%) sepia(86%) saturate(415%) hue-rotate(124deg) brightness(96%) contrast(92%)' }} />
          Shipping
        </div>
        <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.05] text-[#1f2937] mb-6 tracking-tight">
          Fast, trackable, and free over $49.
        </h1>
        <p className="text-[#6b7280] text-[18px] lg:text-[20px] leading-relaxed max-w-[620px]">
          We ship from three regional warehouses, so most orders arrive in 2–4 business days.
        </p>
      </div>

      {/* Methods Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
        {defaultShippingMethods.map((method) => (
          <div key={method.id} className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col items-start hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 bg-[#f0f9f9] rounded-lg flex items-center justify-center mb-10 text-[#0f766e]">
              {typeof method.icon === 'string' ? (
                <img src={method.icon} alt="" className="w-[18px] h-[18px]" style={{ filter: 'invert(31%) sepia(86%) saturate(415%) hue-rotate(124deg) brightness(96%) contrast(92%)' }} />
              ) : (
                method.icon
              )}
            </div>
            <h3 className="text-[#1f2937] font-sora font-semibold text-[18px] mb-1">
              {method.title}
            </h3>
            <p className="text-[#4b5563] text-[15px] mb-1">
              {method.time}
            </p>
            <p className="text-[#0f766e] text-[14px] font-medium">
              {method.cost}
            </p>
          </div>
        ))}
      </div>

      {/* Info Sections */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f766e]"></div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-24">
          {infoCards.map((card, idx) => (
            <div key={idx} className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 lg:p-10">
              <h2 className="text-[#1f2937] font-sora font-semibold text-[22px] mb-4">
                {card.title}
              </h2>
              <p className="text-[#6b7280] text-[16px] leading-relaxed">
                {card.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="w-full max-w-[1032px] bg-[#fcfbf9] border border-[#e7e2d9] rounded-[32px] p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center mx-auto">
        <div className="w-14 h-14 bg-[#0f766e] rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-[#0f766e]/20">
          <img src={pawIcon} alt="" className="w-6 h-6 invert" />
        </div>
        <h2 className="font-sora font-semibold text-[32px] lg:text-[40px] text-[#1f2937] mb-8">
          Ready to meet smarter care?
        </h2>
        <button
          onClick={() => navigate('/onboarding')}
          className="inline-flex items-center gap-2 h-[56px] px-10 bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[16px] transition-all hover:shadow-lg active:scale-95"
        >
          Start free — add your first pet
          <img src={arrowRightIcon} alt="" className="w-5 h-5 invert" />
        </button>
      </div>

    </div>
  );
};

export default Shipping;
