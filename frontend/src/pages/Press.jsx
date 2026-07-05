import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPressReleases } from '../utils/api';

const defaultNewsItems = [
  {
    source: 'TechCrunch',
    title: 'How Zootopia turned pet profiles into a retail engine',
    date: 'Mar 2026',
  },
  {
    source: 'Fast Company',
    title: 'The startups making pet parenting quieter',
    date: 'Feb 2026',
  },
  {
    source: 'Forbes',
    title: 'Subscription done right: lessons from Zootopia',
    date: 'Jan 2026',
  },
  {
    source: 'Wired',
    title: 'Inside the smart filtering behind personalized pet picks',
    date: 'Nov 2025',
  },
];

const Press = () => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPress = async () => {
      try {
        const data = await fetchPressReleases();
        if (data && data.releases && data.releases.length > 0) {
          setNewsItems(data.releases);
        } else {
          setNewsItems(defaultNewsItems);
        }
      } catch (err) {
        console.warn('Could not fetch press releases from API, using default listings:', err.message);
        setNewsItems(defaultNewsItems);
      } finally {
        setLoading(false);
      }
    };
    loadPress();
  }, []);

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-24 md:pb-32 font-manrope animate-[fadeIn_0.5s_ease-out] flex flex-col items-center justify-center">

      {/* Header Section */}
      <div className="w-full max-w-[720px] mx-auto text-center flex flex-col items-center mb-16 md:mb-24">
        <div className="inline-flex items-center gap-2 bg-[#f3f4f6] px-4 py-2 rounded-full mb-6 text-[#4b5563] text-[14px] font-medium">
          <svg className="w-4 h-4 text-[#0f766e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v4a2 2 0 002 2h4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h3m-3 4h6m-6 4h6" />
          </svg>
          Press
        </div>
        <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1f2937] mb-6">
          Stories, assets, and things journalists ask for.
        </h1>
        <p className="text-[#6b7280] text-[18px] lg:text-[20px] leading-relaxed">
          For press inquiries, reach us at <span className="text-[#0f766e] font-medium">press@petcare.example</span> and we'll respond within one business day.
        </p>
      </div>

      {/* In the news Section */}
      <div className="w-full max-w-[1032px] mb-12">
        <div className="bg-white border border-[#e7e2d9] rounded-[24px] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e7e2d9] bg-[#fcfbf9]/50">
            <h2 className="text-[#1f2937] font-sora font-semibold text-[18px]">In the news</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f766e]"></div>
            </div>
          ) : (
            <div className="flex flex-col">
              {newsItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link || '#'}
                  className="flex items-center justify-between p-6 hover:bg-[#fcfbf9] transition-colors border-b border-[#e7e2d9] last:border-0 group"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[#0f766e] text-[12px] font-bold tracking-wider uppercase">{item.source}</span>
                    <h3 className="text-[#1f2937] font-sora font-semibold text-[16px] md:text-[18px] group-hover:text-[#0f766e] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[#6b7280] text-[14px]">{item.date}</span>
                  </div>
                  <svg className="w-5 h-5 text-[#9ca3af] group-hover:text-[#0f766e] transition-all transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Brand Assets Section */}
      <div className="w-full max-w-[1032px] mb-16 md:mb-24">
        <div className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 md:p-10">
          <h2 className="text-[#1f2937] font-sora font-semibold text-[24px] mb-4">Brand assets</h2>
          <p className="text-[#6b7280] text-[16px] leading-relaxed mb-8 max-w-[800px]">
            Logos, product photography, and founder headshots are available as a single zip. Please don't modify the wordmark or recolor the paw icon.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#0f766e] hover:bg-[#0d6b63] text-white px-6 h-[48px] rounded-full font-manrope font-semibold text-[15px] transition-all hover:shadow-lg active:scale-95">
            Download press kit
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

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

export default Press;
