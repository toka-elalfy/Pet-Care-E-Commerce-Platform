import petProfileIcon from '../assets/icons/pet-profile.svg';
import smartFilterIcon from '../assets/icons/smart-filter.svg';
import subscriptionIcon from '../assets/icons/subscription.svg';
import reorderIcon from '../assets/icons/reorder.svg';
import arrowRightSmTeal from '../assets/icons/arrow-right-small-teal.svg';

const features = [
  {
    icon: petProfileIcon,
    title: 'Pet profiles',
    description: 'Save breed, age, weight, size, and needs — the data that powers every recommendation.',
    action: 'Create a profile',
  },
  {
    icon: smartFilterIcon,
    title: 'Smart filtering',
    description: 'Catalog narrowed to what fits your pet, with clear suitability tags on every product.',
    action: 'Browse catalog',
  },
  {
    icon: subscriptionIcon,
    title: 'Subscriptions',
    description: 'Automatic recurring deliveries for essentials. Change frequency, pause, or cancel anytime.',
    action: 'See subscriptions',
  },
  {
    icon: reorderIcon,
    title: 'Reorder reminders',
    description: 'We estimate usage from portion size and nudge you before supplies run low.',
    action: 'How it works',
  },
];

const WhyZootopia = () => {
  return (
    <section className="w-full flex justify-center py-12 lg:py-[88px]">
      <div className="w-full max-w-[1280px] px-4 sm:px-6 xl:px-[24px] flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 lg:mb-[40px]">
          <div className="bg-[#0f766e]/10 px-3 py-1.5 rounded-full mb-4 lg:mb-[16px]">
            <span className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#0f766e] uppercase tracking-wider">
              Why Zootopia
            </span>
          </div>
          <h2 className="font-sora font-semibold text-[24px] sm:text-[30px] leading-tight lg:leading-[37.5px] text-[#1f2937] text-center max-w-[620px]">
            Four systems that work together for every pet.
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[16px] w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-[#e7e2d9] rounded-[16px] p-6 lg:p-[24px] flex flex-col hover:shadow-lg transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-10 h-10 lg:w-[44px] lg:h-[44px] bg-[#0f766e]/10 rounded-xl lg:rounded-[14px] flex items-center justify-center mb-4 lg:mb-[16px] group-hover:bg-[#0f766e]/20 transition-colors">
                <img src={feature.icon} alt="" className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
              </div>

              {/* Title */}
              <h3 className="font-sora font-semibold text-[16px] text-[#1f2937] mb-2 lg:mb-[6px]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-manrope font-normal text-[13px] leading-relaxed text-[#6b7280] mb-4 flex-1">
                {feature.description}
              </p>

              {/* CTA link */}
              <button className="flex items-center gap-1 font-manrope font-semibold text-[13px] text-[#0f766e] w-fit group/btn hover:text-[#0d6962] transition-colors">
                {feature.action}
                <img
                  src={arrowRightSmTeal}
                  alt=""
                  className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZootopia;
