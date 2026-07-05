import { useState } from 'react';
import chevronDown from '../assets/icons/chevron-down.svg';

// Mock data - ready for future API integration
const faqs = [
  {
    question: 'How are recommendations personalized?',
    answer:
      "We use your pet's profile — species, breed, age, weight, and preferences — to filter our catalog to products a vet would pick for them.",
  },
  {
    question: 'Can I pause or cancel my subscription?',
    answer:
      'Absolutely. You can pause, skip, change frequency, or cancel anytime from your Subscriptions dashboard.',
  },
  {
    question: 'How do reorder reminders work?',
    answer:
      "Based on portion size and delivery volume, we predict when you'll run out — and remind you a week before.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full flex justify-center py-[88px]">
      <div className="w-full max-w-[1280px] px-4 xl:px-[24px] flex flex-col items-center">
        <h2 className="font-sora font-semibold text-[26px] sm:text-[30px] leading-[45px] text-[#1f2937] text-center mb-[32px]">
          Frequently asked questions
        </h2>

        <div className="w-full max-w-[774px] flex flex-col gap-[12px]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-[#e7e2d9] rounded-[16px] overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                className="w-full flex items-center justify-between p-[21px] text-left cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="font-sora font-semibold text-[15px] leading-[22.5px] text-[#1f2937] pr-4">
                  {faq.question}
                </h3>
                <img
                  src={chevronDown}
                  alt=""
                  className={`w-[18px] h-[18px] shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[200px] pb-[21px]' : 'max-h-0'
                }`}
              >
                <p className="px-[21px] font-manrope font-normal text-[14px] leading-[22.75px] text-[#6b7280]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
