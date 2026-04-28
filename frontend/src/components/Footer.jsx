import logoFooter from '../assets/icons/logo-footer.svg';

const Footer = () => {
  return (
    <footer className="bg-[#0f1f1d] w-full flex flex-col items-center">
      {/* Main footer content */}
      <div className="w-full max-w-[1280px] px-4 sm:px-6 xl:px-[24px] pt-12 lg:pt-[64px] pb-12 lg:pb-[64px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr] gap-10 lg:gap-[64px]">

          {/* Logo + Email */}
          <div className="flex flex-col max-w-[469px]">
            <div className="flex items-center gap-2.5 mb-4 lg:mb-[16px]">
              <img src={logoFooter} alt="Zootopia" className="w-9 h-9 lg:w-[38px] lg:h-[38px]" />
              <span className="font-sora font-semibold text-[18px] lg:text-[19.76px] tracking-tight">
                <span className="text-white">Zoo</span>
                <span className="text-[#a7c7a3]">topia</span>
              </span>
            </div>

            <p className="font-manrope font-normal text-[14px] leading-relaxed text-white/70 mb-6 lg:mb-[24px] max-w-[320px]">
              Smarter care for the pets who run your home. Personalized
              nutrition, on time, every time.
            </p>

            <div className="flex w-full max-w-[400px] h-11 gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/15 rounded-full px-4 text-[14px] text-white placeholder:text-white/50 font-manrope focus:outline-none focus:border-[#a7c7a3] transition-colors min-w-0"
              />
              <button className="bg-[#f97360] text-white rounded-full px-5 h-full shrink-0 font-manrope font-semibold text-[14px] hover:bg-[#e06856] transition-all hover:scale-[1.02] active:scale-95">
                Join
              </button>
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col">
            <h4 className="font-sora font-semibold text-[14px] text-white mb-4 lg:mb-[16px]">
              Shop
            </h4>
            <ul className="flex flex-col gap-3 lg:gap-[15px]">
              {['Dogs', 'Cats', 'Food', 'Toys', 'Health', 'Grooming'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-manrope font-medium text-[14px] text-white/70 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <h4 className="font-sora font-semibold text-[14px] text-white mb-4 lg:mb-[16px]">
              Company
            </h4>
            <ul className="flex flex-col gap-3 lg:gap-[15px]">
              {['About', 'Careers', 'Press', 'Sustainability'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-manrope font-medium text-[14px] text-white/70 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <h4 className="font-sora font-semibold text-[14px] text-white mb-4 lg:mb-[16px]">
              Support
            </h4>
            <ul className="flex flex-col gap-3 lg:gap-[15px]">
              {['Help Center', 'Shipping', 'Returns', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-manrope font-medium text-[14px] text-white/70 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-white/10 flex justify-center">
        <div className="w-full max-w-[1280px] h-auto lg:h-[65px] px-4 sm:px-6 xl:px-[24px] flex flex-col-reverse lg:flex-row items-center justify-between py-6 lg:py-0 gap-4 lg:gap-0">
          <p className="font-manrope font-normal text-[12px] lg:text-[13px] text-white/60">
            © 2026 Zootopia, Inc. All rights reserved.
          </p>
          <div className="flex gap-6 lg:gap-[20px]">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="font-manrope font-medium text-[12px] lg:text-[13px] text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
