import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[712px] mx-auto px-6 pt-10 pb-24 font-manrope animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col items-center text-center w-full">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#ecfdf5] border border-[#10b981]/20 flex items-center justify-center mb-8 shrink-0">
          <svg className="w-9 h-9 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading & Paragraph */}
        <h1 className="font-sora font-semibold text-[32px] lg:text-[40px] text-[#1f2937] mb-4">
          Order confirmed!
        </h1>
        <p className="text-[#6b7280] text-[15px] lg:text-[16px] mb-12 max-w-[500px]">
          Thanks Sarah — we'll email a receipt to sarah.j@example.com.
        </p>

        {/* Info Row */}
        <div className="w-full flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 border border-[#e7e2d9] rounded-[24px] p-6 lg:p-8 mb-12 bg-[#fcfbf9]">
          <div className="flex-1 flex flex-col items-center gap-2 border-b sm:border-b-0 sm:border-r border-[#e7e2d9] pb-6 sm:pb-0">
            <div className="text-[#6b7280] text-[13px] font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Order number</span>
            </div>
            <div className="text-[#1f2937] font-sora font-semibold text-[16px]">
              #ORD-10493
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center gap-2 border-b sm:border-b-0 sm:border-r border-[#e7e2d9] pb-6 sm:pb-0 px-0 sm:px-6">
            <div className="text-[#6b7280] text-[13px] font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Placed</span>
            </div>
            <div className="text-[#1f2937] font-sora font-semibold text-[16px]">
              Apr 23, 2026
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="text-[#6b7280] text-[13px] font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Arrives</span>
            </div>
            <div className="text-[#1f2937] font-sora font-semibold text-[16px]">
              Apr 26 – 28
            </div>
          </div>
        </div>

        {/* What's in this order */}
        <div className="w-full flex flex-col text-left mb-12">
          <h2 className="text-[#1f2937] font-sora font-semibold text-[18px] lg:text-[20px] mb-6">
            What's in this order
          </h2>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center py-4 border-b border-[#e7e2d9]">
              <div className="flex flex-col">
                <div className="text-[#1f2937] font-sora font-semibold text-[15px] mb-1">
                  Grain-Free Salmon Adult Formula
                </div>
                <div className="text-[#6b7280] text-[14px]">Qty 1 · subscription</div>
              </div>
              <div className="text-[#1f2937] font-sora font-semibold text-[16px] shrink-0 ml-4">$49.00</div>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-[#e7e2d9] last:border-0">
              <div className="flex flex-col">
                <div className="text-[#1f2937] font-sora font-semibold text-[15px] mb-1">
                  Plush Lamb Comfort Toy
                </div>
                <div className="text-[#6b7280] text-[14px]">Qty 1 · one-time</div>
              </div>
              <div className="text-[#1f2937] font-sora font-semibold text-[16px] shrink-0 ml-4">$18.00</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="w-full sm:w-auto px-8 h-[48px] bg-white border border-[#e7e2d9] hover:border-[#0f766e] text-[#1f2937] rounded-full font-manrope font-semibold text-[15px] transition-all hover:shadow-sm active:scale-95"
          >
            View order details
          </button>
          <button 
            onClick={() => navigate('/shop')}
            className="w-full sm:w-auto px-8 h-[48px] bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[15px] transition-all hover:shadow-lg active:scale-95"
          >
            Continue shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
