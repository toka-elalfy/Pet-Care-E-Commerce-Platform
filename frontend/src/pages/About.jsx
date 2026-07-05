import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInfoPage } from '../utils/api';

const defaultSections = [
  {
    title: "Our mission",
    content: "Every pet deserves the right food, the right care, at the right time. We build the tools that make it effortless to be the perfect pet parent."
  },
  {
    title: "Our values",
    content: "Vet-reviewed products, no hype. Pet profile first, catalog second. You stay in control — pause, skip, cancel anytime."
  }
];

const About = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchInfoPage('about');
        if (data && data.page && data.page.sections) {
          setSections(data.page.sections);
        } else {
          setSections(defaultSections);
        }
      } catch (err) {
        console.warn('Could not fetch about page from API, using defaults:', err.message);
        setSections(defaultSections);
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []);

  return (
    <div className="w-full max-w-[1080px] mx-auto px-6 pt-16 pb-32 font-manrope animate-[fadeIn_0.5s_ease-out]">

      {/* Header Section */}
      <div className="max-w-[720px] mx-auto text-center flex flex-col items-center mb-24">
        <div className="inline-flex items-center gap-2 bg-[#f3f4f6] px-4 py-2 rounded-full mb-6 text-[#4b5563] text-[14px] font-medium">
          <svg className="w-4 h-4 text-[#0f766e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          About Zootopia
        </div>
        <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1f2937] mb-6">
          Smarter care for the pets who run your home.
        </h1>
        <p className="text-[#6b7280] text-[18px] lg:text-[20px] leading-relaxed">
          We started Zootopia after watching friends forget to reorder food, miss vet visits, and struggle to find exactly what their pets needed. There had to be a better way to care for the animals we love.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col justify-center text-center">
          <div className="font-sora font-semibold text-[40px] text-[#0f766e] mb-2">2024</div>
          <div className="text-[#4b5563] text-[16px]">Founded in Austin by pet parents and engineers.</div>
        </div>
        <div className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col justify-center text-center">
          <div className="font-sora font-semibold text-[40px] text-[#0f766e] mb-2">48k+</div>
          <div className="text-[#4b5563] text-[16px]">Pet profiles powering personalized picks every day.</div>
        </div>
        <div className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col justify-center text-center">
          <div className="font-sora font-semibold text-[40px] text-[#0f766e] mb-2">93%</div>
          <div className="text-[#4b5563] text-[16px]">Customers who say reorder reminders changed their routine.</div>
        </div>
      </div>

      {/* Dynamic Content Sections */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f766e]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-24">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[24px] p-8 lg:p-10 flex flex-col">
              <h2 className="font-sora font-semibold text-[24px] text-[#1f2937] mb-4">{section.title}</h2>
              <p className="text-[#4b5563] text-[16px] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[32px] p-12 lg:p-16 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-[#ecfdf5] rounded-full flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="font-sora font-semibold text-[32px] lg:text-[40px] text-[#1f2937] mb-8">
          Ready to meet smarter care?
        </h2>
        <button
          onClick={() => navigate('/onboarding')}
          className="inline-flex items-center gap-2 h-[56px] px-8 bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[16px] transition-all hover:shadow-lg active:scale-95"
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

export default About;
