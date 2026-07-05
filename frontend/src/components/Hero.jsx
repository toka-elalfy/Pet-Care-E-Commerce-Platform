import { Link } from 'react-router-dom';
import heroDog from '../assets/images/hero-dog.png';
import sparkleIcon from '../assets/icons/sparkle.svg';
import arrowRightWhite from '../assets/icons/arrow-right-white.svg';
import shieldCheck from '../assets/icons/shield-check.svg';
import truckIcon from '../assets/icons/truck.svg';
import starBadge from '../assets/icons/star-badge.svg';
import pawIcon from '../assets/icons/paw.svg';
import arrowRightSm from '../assets/icons/arrow-right-sm.svg';
import bellRing from '../assets/icons/bell-ring.svg';

const Hero = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1280px] px-4 sm:px-6 xl:px-[24px] py-10 lg:py-[48px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 items-center lg:items-start">

          {/* Left Content */}
          <div className="w-full lg:w-[596px] lg:pt-[100px] xl:pt-[133px] flex flex-col items-center lg:items-start shrink-0 text-center lg:text-left">
            {/* Badge */}
            <div className="bg-[rgba(167,199,163,0.3)] h-7 lg:h-[30px] rounded-full flex items-center gap-2 px-3 mb-5">
              <img src={sparkleIcon} alt="" className="w-3.5 h-3.5" />
              <span className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#0f766e]">
                A platform built around your pet's profile
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-sora font-bold text-[32px] sm:text-[44px] lg:text-[52px] leading-tight lg:leading-[1.05] tracking-tight lg:tracking-[-1.3px] text-[#1f2937] mb-5 max-w-[596px]">
              Pet-care shopping,{' '}
              <span className="text-[#0f766e]">personalized</span> by your
              pet's profile.
            </h1>

            {/* Subtext */}
            <p className="font-manrope font-normal text-[14px] sm:text-[17px] leading-relaxed lg:leading-[27.625px] text-[#6b7280] max-w-[520px] mb-8">
              Create a profile for every pet and Zootopia filters the catalog to
              what actually fits them. Subscribe to essentials, build custom
              bundles, and get reminded before supplies run out.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-8 w-full sm:w-auto">
              <Link to="/signup" className="bg-[#0f766e] h-12 lg:h-[48px] px-6 rounded-full shadow-lg flex items-center justify-center gap-2 hover:bg-[#0d6962] transition-all hover:-translate-y-0.5 w-full sm:w-auto">
                <span className="font-manrope font-semibold text-[14px] lg:text-[15px] text-white">
                  Create a pet profile
                </span>
                <img src={arrowRightWhite} alt="" className="w-4 h-4" />
              </Link>
              <button className="bg-white border border-[#e7e2d9] h-12 lg:h-[48px] px-6 rounded-full font-manrope font-semibold text-[14px] lg:text-[15px] text-[#1f2937] hover:bg-gray-50 transition-colors w-full sm:w-auto">
                How it works
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <img src={shieldCheck} alt="" className="w-4 h-4" />
                <span className="font-manrope font-normal text-[12px] lg:text-[13px] text-[#6b7280]">
                  Vet-approved brands
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img src={truckIcon} alt="" className="w-4 h-4" />
                <span className="font-manrope font-normal text-[12px] lg:text-[13px] text-[#6b7280]">
                  Free delivery over $40
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img src={starBadge} alt="" className="w-4 h-4" />
                <span className="font-manrope font-normal text-[12px] lg:text-[13px] text-[#6b7280]">
                  4.9 rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="relative w-full lg:w-[596px] lg:ml-auto shrink-0 mt-8 lg:mt-0">
            {/* Main image container */}
            <div className="bg-[#fff8f1] border border-[#e7e2d9] rounded-[24px] lg:rounded-[32px] overflow-hidden w-full aspect-square lg:aspect-[596/715] relative shadow-sm">
              <img
                src={heroDog}
                alt="Happy dog"
                className="w-full h-full object-cover"
              />

              {/* Bottom overlay card - Recommended for Bella */}
              <div className="absolute bottom-4 left-4 right-4 lg:bottom-5 lg:left-5 lg:right-5 bg-white/95 backdrop-blur-sm h-16 lg:h-[80px] rounded-xl lg:rounded-[16px] shadow-xl flex items-center gap-3 lg:gap-4 p-3 lg:p-4">
                <div className="w-10 h-10 lg:w-[48px] lg:h-[48px] bg-[#0f766e]/10 rounded-lg lg:rounded-[14px] flex items-center justify-center shrink-0">
                  <img src={pawIcon} alt="" className="w-5 h-5 lg:w-5 lg:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sora font-semibold text-[13px] lg:text-[14px] text-[#1f2937] truncate">
                    Recommended for Bella
                  </p>
                  <p className="font-manrope font-normal text-[11px] lg:text-[12px] text-[#6b7280] truncate">
                    Grain-free salmon · every 4 weeks
                  </p>
                </div>
                <button className="w-8 h-8 lg:w-9 lg:h-9 bg-[#0f766e] rounded-full flex items-center justify-center shrink-0 hover:bg-[#0d6962] transition-colors">
                  <img src={arrowRightSm} alt="" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Floating card - Running low soon */}
            <div className="hidden sm:flex absolute -top-4 -left-4 bg-white border border-[#e7e2d9] rounded-[16px] shadow-lg items-center gap-3 p-3 w-[180px] lg:w-[197px] h-14 lg:h-[66px] animate-[bounce_3s_infinite]">
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#f97360]/15 rounded-full flex items-center justify-center shrink-0">
                <img src={bellRing} alt="" className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sora font-semibold text-[11px] lg:text-[13px] text-[#1f2937]">
                  Running low soon
                </p>
                <p className="font-manrope font-normal text-[10px] lg:text-[11px] text-[#6b7280]">
                  Bella's food · 6 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
