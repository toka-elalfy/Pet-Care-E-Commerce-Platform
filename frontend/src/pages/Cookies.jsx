import { useEffect, useState } from 'react';
import infoCircle from '../assets/icons/info-circle.svg';
import { fetchInfoPage } from '../utils/api';

const defaultSections = [
  {
    title: 'What are cookies?',
    content: 'Cookies are small text files that websites save to your computer or mobile device when you visit. They allow the website to remember your actions and preferences over a period of time, so you do not have to keep re-entering them whenever you come back to the site or browse from one page to another.'
  },
  {
    title: 'How Zootopia uses cookies',
    content: 'We use cookies and similar tracking technologies to handle critical application functions. This includes keeping you signed into your account, maintaining items in your shopping cart, persisting your theme or preference settings, and ensuring secure payment processing.'
  },
  {
    title: 'Types of cookies we use',
    content: 'We use Essential Cookies for user sessions and security; Functional Cookies to remember your customized preferences; and Performance & Analytics Cookies to gather aggregated information about site traffic and help us improve the overall user experience.'
  },
  {
    title: 'Your cookie choices',
    content: 'Most web browsers allow you to manage cookie settings. You can choose to block or delete cookies through your browser preferences. However, please note that blocking essential cookies may prevent you from using necessary checkout or dashboard features on our platform.'
  }
];

const Cookies = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('March 14, 2026');

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchInfoPage('cookies');
        if (data && data.page && data.page.sections) {
          setSections(data.page.sections);
          if (data.page.lastUpdated) {
            setLastUpdated(data.page.lastUpdated);
          }
        } else {
          setSections(defaultSections);
        }
      } catch (err) {
        console.warn('Could not fetch cookies from API, using default policy:', err.message);
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
            <img src={infoCircle} alt="" className="w-[13px] h-[13px]" />
            Cookies
          </div>
          <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1A1A1A] mb-6 tracking-tight">
            Cookie Policy
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

export default Cookies;
