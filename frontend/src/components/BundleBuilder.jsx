import packageIcon from '../assets/icons/package.svg';
import arrowRightBundle from '../assets/icons/arrow-right-bundle.svg';

const BundleBuilder = () => {
  return (
    <section className="w-full flex justify-center py-12 lg:py-[88px]">
      <div className="w-full max-w-[1280px] px-4 sm:px-6 xl:px-[24px]">
        <div
          className="relative w-full rounded-[24px] lg:rounded-[32px] overflow-hidden flex flex-col lg:flex-row items-center lg:items-start justify-between p-6 sm:p-10 lg:p-[56px] gap-10 lg:gap-[40px]"
          style={{
            backgroundImage:
              'linear-gradient(161.4deg, #0f766e 0%, #107072 14.3%, #107a72 28.6%, #117c74 42.9%, #127f76 57.1%, #138178 71.4%, #13837a 85.7%, #14857c 100%)',
          }}
        >
          {/* Decorative circle */}
          <div className="absolute right-[-64px] top-[-64px] w-[256px] h-[256px] rounded-full bg-white/5 pointer-events-none" />

          {/* Left Content */}
          <div className="flex flex-col z-10 w-full lg:max-w-[520px] items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <div className="bg-white/15 h-[30px] rounded-full flex items-center gap-2 px-3 w-fit mb-5 lg:mb-[16px]">
              <img src={packageIcon} alt="" className="w-3.5 h-3.5" />
              <span className="font-manrope font-semibold text-[11px] lg:text-[12px] text-white uppercase tracking-wider">
                Bundle Builder
              </span>
            </div>

            <h2 className="font-sora font-semibold text-[26px] sm:text-[34px] leading-tight lg:leading-[42.5px] text-white mb-4 lg:mb-[12px]">
              Combine food, toys, and care — save up to 20%.
            </h2>

            <p className="font-manrope font-normal text-[14px] lg:text-[15px] leading-relaxed text-white/80 mb-8 lg:mb-[24px] max-w-[520px]">
              Pick any products from the catalog. Bundle discounts stack
              automatically as you add more — no codes, no coupons.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 w-full sm:w-auto">
              <button className="bg-white h-12 lg:h-[48px] px-6 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
                <span className="font-manrope font-semibold text-[14px] lg:text-[15px] text-[#0f766e]">
                  Start building
                </span>
                <img src={arrowRightBundle} alt="" className="w-4 h-4" />
              </button>

              <div className="bg-white/10 border border-white/20 h-12 lg:h-[48px] rounded-full flex items-center px-5 w-full sm:w-auto justify-center">
                <span className="font-manrope font-semibold text-[11px] lg:text-[13px] text-white whitespace-nowrap">
                  2 items · 5% off · 5+ items · 20% off
                </span>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-[20px] lg:rounded-[16px] shadow-2xl w-full max-w-[443px] p-5 lg:p-[16px] z-10 lg:mt-[36px]">
            <div className="flex items-center justify-between mb-4 lg:mb-[12px]">
              <h3 className="font-sora font-semibold text-[14px] text-[#1f2937]">
                Bella's weekly bundle
              </h3>
              <div className="bg-[#0f766e]/10 px-2.5 py-1 rounded-full">
                <span className="font-manrope font-semibold text-[10px] lg:text-[11px] text-[#0f766e]">
                  3 items · 10% off
                </span>
              </div>
            </div>

            {/* Bundle items */}
            {[
              { name: 'Grain-Free Salmon', price: '$58' },
              { name: 'Plush Lamb Toy', price: '$18' },
              { name: 'Joint Support Chews', price: '$32' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-t border-[#e7e2d9]"
              >
                <span className="font-manrope text-[13px] text-[#1f2937]">
                  {item.name}
                </span>
                <span className="font-manrope font-semibold text-[13px] text-[#1f2937]">
                  {item.price}
                </span>
              </div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between pt-4 border-t border-[#e7e2d9] mt-1">
              <span className="font-sora font-semibold text-[14px] text-[#1f2937]">
                Total
              </span>
              <span className="font-sora font-bold text-[18px] text-[#1f2937]">
                $97.20
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleBuilder;
