import { useEffect, useState } from 'react';
import privacyShield from '../assets/icons/privacy-shield.svg';
import { fetchInfoPage } from '../utils/api';

const defaultSections = [
  {
    title: 'Overview',
    content: 'Zootopia collects the minimum information needed to personalize recommendations and deliver your orders. We never sell your data to advertisers or data brokers.'
  },
  {
    title: 'What we collect',
    content: 'Account details (name, email, address), pet profile information (species, breed, age, weight, preferences), and order history. With your permission, we may also collect delivery preferences and veterinary notes.'
  },
  {
    title: 'How we use it',
    content: 'To personalize product picks, remind you before refills run out, process orders, prevent fraud, and improve our service. We use aggregated, de-identified data to understand trends.'
  },
  {
    title: 'Your rights',
    content: 'You can export or delete your data anytime from Account → Privacy. We respond to GDPR and CCPA requests within 30 days.'
  },
  {
    title: 'Contact',
    content: 'Questions? Email privacy@petcare.example.'
  }
];

const PrivacyPolicy = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('March 14, 2026');

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchInfoPage('privacy');
        if (data && data.page && data.page.sections) {
          setSections(data.page.sections);
          if (data.page.lastUpdated) {
            setLastUpdated(data.page.lastUpdated);
          }
        } else {
          setSections(defaultSections);
        }
      } catch (err) {
        console.warn('Could not fetch privacy page from API, using default policy:', err.message);
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
            <img src={privacyShield} alt="" className="w-[13px] h-[13px]" />
            Privacy
          </div>
          <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1A1A1A] mb-6 tracking-tight">
            Privacy policy
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

export default PrivacyPolicy;
