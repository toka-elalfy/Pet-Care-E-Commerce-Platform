import logoMark from '../../assets/icons/logo-mark.svg';

const Footer = () => (
  <footer className="bg-[#0f1f1d] pt-16 pb-8 mt-auto w-full">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-0 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-[320px]">
          <div className="flex items-center gap-2 mb-6">
            <img src={logoMark} alt="Zootopia" className="w-[38px] h-[38px]" />
            <span className="font-sora font-semibold text-[20px]">
              <span className="text-white">Zoo</span><span className="text-[#a7c7a3]">topia</span>
            </span>
          </div>
          <p className="font-manrope text-[14px] text-white/70 leading-relaxed">
            Smarter care for the pets who run your home. Personalized nutrition, on time, every time.
          </p>
          <div className="mt-8 flex gap-2">
            <input type="email" placeholder="Your email"
              className="bg-white/10 border border-white/15 rounded-full h-11 px-4 font-manrope text-sm text-white placeholder:text-white/50 focus:outline-none flex-1" />
            <button className="bg-[#f97360] text-white rounded-full h-11 px-6 font-manrope font-semibold text-[14px] transition-colors whitespace-nowrap hover:bg-[#e06350]">Join</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          {[
            { title: 'Shop',    links: ['Dogs','Cats','Food','Toys','Health','Grooming'] },
            { title: 'Company', links: ['About','Careers','Press','Sustainability'] },
            { title: 'Support', links: ['Help Center','Shipping','Returns','Contact'] },
          ].map(col => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="font-sora font-semibold text-[14px] text-white">{col.title}</h4>
              {col.links.map(l => (
                <a key={l} href="#" className="font-manrope text-[14px] text-white/70 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-manrope text-[13px] text-white/60">© 2026 Zootopia, Inc. All rights reserved.</p>
        <div className="flex gap-5">
          {['Privacy','Terms','Cookies'].map(l => (
            <a key={l} href="#" className="font-manrope text-[16px] text-white/60 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
