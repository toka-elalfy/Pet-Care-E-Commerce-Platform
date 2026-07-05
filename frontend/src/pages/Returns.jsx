import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import returnsIcon from '../assets/icons/returns-icon.svg';
import pawIcon from '../assets/icons/paw.svg';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import { fetchInfoPage } from '../utils/api';

const defaultSteps = [
  {
    number: '1',
    title: '1. Start your return',
    description: "Open the order from your dashboard and tap 'Start Return'.",
  },
  {
    number: '2',
    title: '2. Print the label',
    description: "We'll email a prepaid label within minutes.",
  },
  {
    number: '3',
    title: '3. Get refunded',
    description: 'Refunds hit your original payment method in 3–5 business days.',
  },
];

const defaultEligibilityList = [
  'Unopened food, treats, and supplements within 30 days.',
  'Toys and grooming items with original tags.',
  'Damaged-in-transit items — we replace immediately.',
];

const Returns = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchInfoPage('returns');
        if (data && data.page && data.page.sections) {
          setSections(data.page.sections);
        } else {
          // Format defaults to show if page fetch is empty
          setSections([
            {
              title: "What's eligible",
              content: defaultEligibilityList.join('\n')
            },
            {
              title: "Food your pet didn't like",
              content: "We'll still refund it. Ask us on chat and we'll also suggest a different formula based on your pet's profile."
            }
          ]);
        }
      } catch (err) {
        console.warn('Could not fetch returns Details from API, using default returns info:', err.message);
        setSections([
          {
            title: "What's eligible",
            content: defaultEligibilityList.join('\n')
          },
          {
            title: "Food your pet didn't like",
            content: "We'll still refund it. Ask us on chat and we'll also suggest a different formula based on your pet's profile."
          }
        ]);
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
          <img src={returnsIcon} alt="" className="w-[13px] h-[13px]" style={{ filter: 'invert(31%) sepia(86%) saturate(415%) hue-rotate(124deg) brightness(96%) contrast(92%)' }} />
          Returns
        </div>
        <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1f2937] mb-6 tracking-tight">
          30-day, no-questions-asked returns.
        </h1>
        <p className="text-[#6b7280] text-[18px] lg:text-[20px] leading-relaxed max-w-[620px]">
          If your pet isn't thrilled, send it back. We cover return shipping on anything unopened.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
        {defaultSteps.map((step) => (
          <div key={step.number} className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col items-start hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 bg-[#0f766e] text-white rounded-lg flex items-center justify-center mb-10 font-sora font-semibold text-[18px]">
              {step.number}
            </div>
            <h3 className="text-[#1f2937] font-sora font-semibold text-[18px] mb-3">
              {step.title}
            </h3>
            <p className="text-[#6b7280] text-[15px] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Info Sections Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f766e]"></div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-24">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 lg:p-10">
              <h2 className="text-[#1f2937] font-sora font-semibold text-[22px] mb-6">
                {section.title}
              </h2>
              {section.content.includes('\n') ? (
                <ul className="space-y-4">
                  {section.content.split('\n').map((item, idy) => (
                    <li key={idy} className="flex items-start gap-3 text-[#6b7280] text-[16px] leading-relaxed">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#0f766e] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#6b7280] text-[16px] leading-relaxed">
                  {section.content}
                </p>
              )}
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

export default Returns;
