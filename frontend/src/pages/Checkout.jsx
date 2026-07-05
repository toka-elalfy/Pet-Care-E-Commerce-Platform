import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Product images
import salmonProduct from '../assets/images/product-salmon.png';
import lambProduct from '../assets/images/product-lamb-toy.png';

// Icons
import shieldIcon from '../assets/icons/shield-check.svg';
import returnsIcon from '../assets/icons/returns-icon.svg';

const Checkout = () => {
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('cod');

  return (
    <div className="max-w-[1280px] mx-auto px-6 pt-4 pb-24 font-manrope animate-[fadeIn_0.5s_ease-out]">
      {/* Back to cart */}
      <button 
        onClick={() => navigate('/shop')}
        className="text-[#6b7280] font-medium text-[13px] hover:text-[#1f2937] transition-colors mb-6 flex items-center gap-2"
      >
        ← Back to cart
      </button>

      {/* Heading */}
      <h1 className="font-sora font-semibold text-[32px] lg:text-[40px] text-[#1f2937] mb-8 lg:mb-12">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[40px]">
        
        {/* LEFT COLUMN */}
        <div className="flex-1 max-w-[705px] flex flex-col gap-10">
          
          {/* Contact Section */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[#1f2937] font-sora font-semibold text-[20px] lg:text-[24px]">Contact</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[#6b7280] text-[13px]">First name</label>
                  <input type="text" defaultValue="Sarah" className="w-full h-[44px] px-4 border border-[#e7e2d9] rounded-[12px] bg-white text-[#1f2937] text-[15px] focus:outline-none focus:border-[#0f766e] transition-colors" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[#6b7280] text-[13px]">Last name</label>
                  <input type="text" defaultValue="Johnson" className="w-full h-[44px] px-4 border border-[#e7e2d9] rounded-[12px] bg-white text-[#1f2937] text-[15px] focus:outline-none focus:border-[#0f766e] transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#6b7280] text-[13px]">Email</label>
                <input type="email" defaultValue="sarah.j@example.com" className="w-full h-[44px] px-4 border border-[#e7e2d9] rounded-[12px] bg-white text-[#1f2937] text-[15px] focus:outline-none focus:border-[#0f766e] transition-colors" />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[#1f2937] font-sora font-semibold text-[20px] lg:text-[24px]">Shipping address</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#6b7280] text-[13px]">Address</label>
                <input type="text" defaultValue="128 Willow Lane" className="w-full h-[44px] px-4 border border-[#e7e2d9] rounded-[12px] bg-white text-[#1f2937] text-[15px] focus:outline-none focus:border-[#0f766e] transition-colors" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[#6b7280] text-[13px]">City</label>
                  <input type="text" defaultValue="Austin" className="w-full h-[44px] px-4 border border-[#e7e2d9] rounded-[12px] bg-white text-[#1f2937] text-[15px] focus:outline-none focus:border-[#0f766e] transition-colors" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[#6b7280] text-[13px]">State</label>
                  <input type="text" defaultValue="TX" className="w-full h-[44px] px-4 border border-[#e7e2d9] rounded-[12px] bg-white text-[#1f2937] text-[15px] focus:outline-none focus:border-[#0f766e] transition-colors" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[#6b7280] text-[13px]">ZIP code</label>
                  <input type="text" defaultValue="78701" className="w-full h-[44px] px-4 border border-[#e7e2d9] rounded-[12px] bg-white text-[#1f2937] text-[15px] focus:outline-none focus:border-[#0f766e] transition-colors" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[#6b7280] text-[13px]">Phone</label>
                  <input type="tel" defaultValue="(512) 555-0134" className="w-full h-[44px] px-4 border border-[#e7e2d9] rounded-[12px] bg-white text-[#1f2937] text-[15px] focus:outline-none focus:border-[#0f766e] transition-colors" />
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Section */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[#1f2937] font-sora font-semibold text-[20px] lg:text-[24px]">Delivery</h2>
            <div className="flex flex-col gap-3">
              {[
                { id: 'standard', label: 'Standard', desc: '3–5 business days', price: 'Free' },
                { id: 'express', label: 'Express', desc: '1–2 business days', price: '$9.00' },
                { id: 'sameday', label: 'Same day', desc: 'Austin only', price: '$15.00' },
              ].map(opt => (
                <label key={opt.id} className={`flex items-center gap-4 p-5 rounded-[16px] border cursor-pointer transition-all ${delivery === opt.id ? 'bg-[#0f766e]/5 border-[#0f766e]' : 'bg-white border-[#e7e2d9] hover:border-[#0f766e]/50'}`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    checked={delivery === opt.id}
                    onChange={() => setDelivery(opt.id)}
                    className="accent-[#0f766e] w-4 h-4 shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-[#1f2937] font-sora font-semibold text-[15px]">{opt.label}</div>
                    <div className="text-[#6b7280] text-[13px]">{opt.desc}</div>
                  </div>
                  <div className="text-[#1f2937] font-sora font-semibold text-[15px]">{opt.price}</div>
                </label>
              ))}
            </div>
          </section>

          {/* Payment Section */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[#1f2937] font-sora font-semibold text-[20px] lg:text-[24px]">Payment</h2>
            
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-[12px] border border-gray-100">
              <img src={shieldIcon} alt="" className="w-5 h-5 mt-0.5 opacity-70" />
              <p className="text-[#4b5563] text-[14px] leading-relaxed">
                Place your order below. For the current release, payment is handled outside of the platform.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label className={`flex items-center gap-4 p-5 rounded-[16px] border cursor-pointer transition-all ${payment === 'cod' ? 'bg-[#0f766e]/5 border-[#0f766e]' : 'bg-white border-[#e7e2d9] hover:border-[#0f766e]/50'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={payment === 'cod'}
                  onChange={() => setPayment('cod')}
                  className="accent-[#0f766e] w-4 h-4 shrink-0"
                />
                <div className="flex-1">
                  <div className="text-[#1f2937] font-sora font-semibold text-[15px]">Cash on delivery</div>
                  <div className="text-[#6b7280] text-[13px]">Pay in person when your order arrives</div>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-5 rounded-[16px] border cursor-pointer transition-all ${payment === 'transfer' ? 'bg-[#0f766e]/5 border-[#0f766e]' : 'bg-white border-[#e7e2d9] hover:border-[#0f766e]/50'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={payment === 'transfer'}
                  onChange={() => setPayment('transfer')}
                  className="accent-[#0f766e] w-4 h-4 shrink-0"
                />
                <div className="flex-1">
                  <div className="text-[#1f2937] font-sora font-semibold text-[15px]">Bank transfer</div>
                  <div className="text-[#6b7280] text-[13px]">Receive instructions by email after you order</div>
                </div>
              </label>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-[495px]">
          <div className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[24px] p-6 lg:p-8 sticky top-6">
            <h2 className="text-[#1f2937] font-sora font-semibold text-[20px] lg:text-[24px] mb-6">Order summary</h2>
            
            {/* Items */}
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-[#fff8f1] rounded-[12px] border border-[#e7e2d9] flex items-center justify-center overflow-hidden shrink-0">
                  <img src={salmonProduct} alt="Grain-Free Salmon Adult Formula" className="w-[85%] h-[85%] object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#1f2937] font-sora font-semibold text-[14px] truncate">Grain-Free Salmon Adult Formula</div>
                  <div className="text-[#6b7280] text-[13px]">Qty 1</div>
                </div>
                <div className="text-[#1f2937] font-sora font-semibold text-[15px] shrink-0">$58.00</div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-[#fff8f1] rounded-[12px] border border-[#e7e2d9] flex items-center justify-center overflow-hidden shrink-0">
                  <img src={lambProduct} alt="Plush Lamb Comfort Toy" className="w-[85%] h-[85%] object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#1f2937] font-sora font-semibold text-[14px] truncate">Plush Lamb Comfort Toy</div>
                  <div className="text-[#6b7280] text-[13px]">Qty 1</div>
                </div>
                <div className="text-[#1f2937] font-sora font-semibold text-[15px] shrink-0">$18.00</div>
              </div>
            </div>

            <div className="h-px bg-[#e7e2d9] mb-5"></div>

            {/* Totals */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-[#4b5563]">Subtotal</span>
                <span className="text-[#1f2937] font-sora font-semibold">$76.00</span>
              </div>
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-[#4b5563]">Shipping</span>
                <span className="text-[#1f2937] font-sora font-semibold">{delivery === 'standard' ? 'Free' : (delivery === 'express' ? '$9.00' : '$15.00')}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-[#1f2937] font-sora font-semibold text-[18px]">Total</span>
              <span className="text-[#1f2937] font-sora font-semibold text-[24px]">
                ${delivery === 'standard' ? '76.00' : (delivery === 'express' ? '85.00' : '91.00')}
              </span>
            </div>

            <button className="w-full h-[52px] bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[15px] transition-all hover:shadow-lg active:scale-95 mb-6">
              Place order
            </button>

            {/* Badges */}
            <div className="flex justify-center gap-6 text-[#6b7280] text-[13px]">
              <div className="flex items-center gap-2">
                <img src={shieldIcon} alt="" className="w-4 h-4 opacity-70" />
                <span>SSL secure</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={returnsIcon} alt="" className="w-4 h-4 opacity-70" />
                <span>Free returns</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
