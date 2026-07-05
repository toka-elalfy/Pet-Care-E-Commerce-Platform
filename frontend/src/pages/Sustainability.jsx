import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInfoPage } from '../utils/api';

const defaultStats = [
  {
    value: '100%',
    description: 'Recyclable packaging across food and treats.',
  },
  {
    value: '-38%',
    description: 'Reduction in shipping emissions vs. 2024 baseline.',
  },
  {
    value: '12k lbs',
    description: 'Surplus food donated to local shelters in 2025.',
  },
];

const defaultSections = [
  {
    title: 'Packaging',
    description: 'Every parcel ships in curbside-recyclable paperboard. Ice packs in our fresh line are plant-based and home-compostable.',
  },
  {
    title: 'Sourcing',
    description: 'We prioritize suppliers with third-party welfare certifications and regional sourcing to shrink transport emissions.',
  },
  {
    title: 'Subscriptions reduce waste',
    description: 'Right-sized refills mean fewer half-used bags at the back of the pantry and fewer emergency trips across town.',
  },
  {
    title: 'Annual report',
    description: 'Read our 2025 sustainability report for the full breakdown of materials, emissions, and goals for 2026.',
  },
];

const Sustainability = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchInfoPage('sustainability');
        if (data && data.page && data.page.sections) {
          // Format DB sections back to cards structure
          const formatted = data.page.sections.map(section => ({
            title: section.title,
            description: section.content
          }));
          setSections(formatted);
        } else {
          setSections(defaultSections);
        }
      } catch (err) {
        console.warn('Could not fetch sustainability details from API, using default information:', err.message);
        setSections(defaultSections);
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []);

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-24 md:pb-32 font-manrope animate-[fadeIn_0.5s_ease-out] flex flex-col items-center justify-center">

      {/* Header Section */}
      <div className="w-full max-w-[720px] mx-auto text-center flex flex-col items-center mb-16 md:mb-24">
        <div className="inline-flex items-center gap-2 bg-[#f3f4f6] px-4 py-2 rounded-full mb-6 text-[#4b5563] text-[14px] font-medium">
          <svg className="w-4 h-4 text-[#0f766e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Sustainability
        </div>
        <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1f2937] mb-6">
          Good for pets. Gentler on the planet.
        </h1>
        <p className="text-[#6b7280] text-[18px] lg:text-[20px] leading-relaxed max-w-[600px] mx-auto">
          We measure the footprint of every box we ship, and publish progress annually.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
        {defaultStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 md:p-10 flex flex-col gap-4">
            <span className="text-[#0f766e] font-sora font-semibold text-[40px] leading-tight">
              {stat.value}
            </span>
            <p className="text-[#4b5563] text-[16px] leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Info Cards Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f766e]"></div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 md:mb-24">
          {sections.map((card, idx) => (
            <div key={idx} className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 md:p-10">
              <h2 className="text-[#1f2937] font-sora font-semibold text-[20px] mb-4">
                {card.title}
              </h2>
              <p className="text-[#6b7280] text-[16px] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="w-full max-w-[1032px] bg-[#fcfbf9] border border-[#e7e2d9] rounded-[32px] p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center mx-auto">
        <div className="w-14 h-14 bg-[#0f766e] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#0f766e]/20">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="font-sora font-semibold text-[32px] lg:text-[40px] text-[#1f2937] mb-8">
          Ready to meet smarter care?
        </h2>
        <button
          onClick={() => navigate('/onboarding')}
          className="inline-flex items-center gap-2 h-[56px] px-10 bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[16px] transition-all hover:shadow-lg active:scale-95"
        >
          Start free — add your first pet
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default Sustainability;
