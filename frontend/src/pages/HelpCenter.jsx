import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFAQs } from '../utils/api';

const defaultFAQs = [
  {
    category: 'Orders',
    items: [
      {
        question: 'When will my order ship?',
        answer: 'Most orders ship within 24 hours on business days.',
      },
      {
        question: 'Can I change my order after placing it?',
        answer: 'You can edit or cancel within 30 minutes of checkout from your Orders dashboard.',
      },
      {
        question: "What's the return policy?",
        answer: 'Free 30-day returns on any unopened item. No questions asked.',
      },
    ],
  },
  {
    category: 'Subscriptions',
    items: [
      {
        question: 'How do I pause or skip?',
        answer: 'Open Subscriptions in your dashboard and tap Pause or Skip for the specific pet.',
      },
      {
        question: 'Can I change frequency?',
        answer: 'Yes — anytime, and next delivery recalculates automatically.',
      },
    ],
  },
  {
    category: 'Pet profiles',
    items: [
      {
        question: 'How do breed/age affect picks?',
        answer: 'They narrow the catalog to the nutrition and size appropriate for your pet.',
      },
      {
        question: 'Can I add multiple pets?',
        answer: 'Absolutely. Each pet gets its own personalized recommendations and schedule.',
      },
    ],
  },
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupedFAQs, setGroupedFAQs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const data = await fetchFAQs();
        if (data && data.faqs && data.faqs.length > 0) {
          // Group by category
          const groups = {};
          data.faqs.forEach((item) => {
            if (!groups[item.category]) {
              groups[item.category] = [];
            }
            groups[item.category].push({
              question: item.question,
              answer: item.answer,
            });
          });
          const formatted = Object.keys(groups).map((cat) => ({
            category: cat,
            items: groups[cat],
          }));
          setGroupedFAQs(formatted);
        } else {
          setGroupedFAQs(defaultFAQs);
        }
      } catch (err) {
        console.warn('Could not fetch FAQs from API, using default list:', err.message);
        setGroupedFAQs(defaultFAQs);
      } finally {
        setLoading(false);
      }
    };
    loadFAQs();
  }, []);

  // Filter based on search query
  const filteredFAQs = groupedFAQs.map(section => {
    const matchedItems = section.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...section,
      items: matchedItems
    };
  }).filter(section => section.items.length > 0);

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-24 md:pb-32 font-manrope animate-[fadeIn_0.5s_ease-out] flex flex-col items-center">

      {/* Hero Section */}
      <div className="w-full max-w-[720px] mx-auto text-center flex flex-col items-center mb-16 md:mb-20">
        <div className="w-14 h-14 bg-[#ecfdf5] rounded-full flex items-center justify-center mb-8 border border-[#10b981]/20 shadow-sm">
          <svg className="w-7 h-7 text-[#0f766e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1f2937] mb-8">
          How can we help?
        </h1>
        <div className="w-full max-w-[520px] relative group">
          <input
            type="text"
            placeholder="Search help articles…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[56px] px-6 bg-white border border-[#e7e2d9] rounded-full text-[#1f2937] placeholder-[#9ca3af] focus:outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/5 transition-all shadow-sm"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#9ca3af] group-focus-within:text-[#0f766e] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* FAQ Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f766e]"></div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-24 items-start">
          {filteredFAQs.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h2 className="font-sora font-semibold text-[18px] text-[#1f2937] px-2">{section.category}</h2>
              <div className="flex flex-col gap-4">
                {section.items.map((faq, fidx) => (
                  <div key={fidx} className="bg-white border border-[#e7e2d9] rounded-[20px] p-5 hover:border-[#0f766e] transition-colors cursor-pointer group">
                    <h3 className="font-manrope font-semibold text-[15px] text-[#1f2937] mb-2 pr-6 relative">
                      {faq.question}
                      <svg className="w-4 h-4 absolute right-0 top-0.5 text-[#9ca3af] group-hover:text-[#0f766e] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </h3>
                    <p className="text-[#6b7280] text-[14px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Support CTA */}
      <div className="w-full bg-[#0f766e] rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        <div className="flex flex-col text-center md:text-left">
          <span className="text-[#4ade80] text-[13px] font-bold tracking-widest uppercase mb-4">Still need help?</span>
          <h2 className="font-sora font-semibold text-[28px] md:text-[36px] lg:text-[40px] text-white leading-tight">
            Our care team replies in under an hour, every day.
          </h2>
        </div>
        <Link
          to="/contact"
          className="whitespace-nowrap inline-flex items-center gap-3 h-[56px] px-8 bg-white hover:bg-[#f3f4f6] text-[#0f766e] rounded-full font-manrope font-semibold text-[16px] transition-all hover:shadow-xl active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Contact support
        </Link>
      </div>

    </div>
  );
};

export default HelpCenter;
