import { useEffect, useState } from 'react';
import termsIcon from '../assets/icons/terms-icon.svg';
import { fetchInfoPage } from '../utils/api';

const defaultSections = [
  {
    title: 'Agreement',
    content: "By using Zootopia, you agree to these terms. If you don't agree, please don't use the service."
  },
  {
    title: 'Accounts',
    content: "You're responsible for keeping your login secure and for activity under your account. You must be at least 18 to purchase."
  },
  {
    title: 'Subscriptions',
    content: "Recurring orders charge on the cadence you set. You can pause, skip, or cancel anytime in your dashboard before the next billing date."
  },
  {
    title: 'Shipping and returns',
    content: "See our Shipping and Returns pages for specifics. Refunds follow the policies described there."
  },
  {
    title: 'Limitation of liability',
    content: "Zootopia isn't a veterinary service. Always consult a licensed vet about health concerns for your pet."
  },
  {
    title: 'Changes',
    content: "We may update these terms occasionally. Material changes will be emailed to you at least 14 days before taking effect."
  }
];

const TermsOfService = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('March 14, 2026');

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchInfoPage('terms');
        if (data && data.page && data.page.sections) {
          setSections(data.page.sections);
          if (data.page.lastUpdated) {
            setLastUpdated(data.page.lastUpdated);
          }
        } else {
          setSections(defaultSections);
        }
      } catch (err) {
        console.warn('Could not fetch terms page from API, using default terms:', err.message);
        setSections(defaultSections);
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F9F7F3] font-manrope animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-24 md:pb-32">

        {/* Header Section */}
        <div className="w-full max-w-[720px] mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00684A1A] px-3 py-1.5 rounded-full mb-6 text-[#00684A] text-[14px] font-medium border border-[#00684A26]">
            <img src={termsIcon} alt="" className="w-[13px] h-[13px]" />
            Terms
          </div>
          <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1A1A1A] mb-6 tracking-tight">
            Terms of service
          </h1>
          <p className="text-[#4D4D4D] text-[16px] lg:text-[18px]">
            Last updated {lastUpdated}
          </p>
        </div>

        {/* Content Card */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00684A]"></div>
          </div>
        ) : (
          <div className="w-full bg-white border border-[#E7E2D9] rounded-[24px] p-8 md:p-12 lg:p-16 shadow-sm">
            <div className="space-y-12 md:space-y-16">
              {sections.map((section, idx) => (
                <div key={idx} className="max-w-[720px]">
                  <h2 className="text-[#1A1A1A] font-sora font-semibold text-[22px] md:text-[24px] mb-4">
                    {section.title}
                  </h2>
                  <p className="text-[#4D4D4D] text-[16px] md:text-[17px] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TermsOfService;
