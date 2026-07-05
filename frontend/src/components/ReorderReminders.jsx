const ReorderReminders = () => {
  return (
    <section className="w-full flex justify-center pb-[88px]">
      <div className="w-full max-w-[1280px] px-4 xl:px-[24px] flex flex-col lg:flex-row gap-[24px]">
        
        {/* Left Block - Reorder reminders */}
        <div className="bg-[#fff8f1] border border-[#e7e2d9] rounded-[24px] w-full lg:w-[604px] min-h-[404.5px] p-[40px] flex flex-col relative">
          <span className="font-manrope font-semibold text-[12px] leading-[18px] text-[#f97360] tracking-[1.2px] uppercase mb-[14px]">
            Reorder reminders
          </span>
          <h3 className="font-sora font-semibold text-[28px] leading-[35px] text-[#1f2937] mb-[12px] max-w-[460px]">
            Never run out again.
          </h3>
          <p className="font-manrope font-normal text-[14px] leading-[21px] text-[#6b7280] max-w-[440px] mb-[24px]">
            Every order is tied to a usage estimate based on portion size, pet weight, and pack volume. We tell you when it's time to reorder — with one tap to buy again or convert to a subscription.
          </p>
          
          <div className="flex flex-col gap-[8px] w-full max-w-[522px] mt-auto">
            <div className="bg-white border border-[#e7e2d9] rounded-[14px] h-[45.5px] p-[13px] flex items-center gap-[12px] w-full shadow-sm hover:shadow-md transition-shadow">
              <div className="w-[8px] h-[8px] bg-[#dc2626] rounded-full shrink-0" />
              <span className="font-sora font-semibold text-[13px] leading-[19.5px] text-[#1f2937] flex-1">Bella's food</span>
              <span className="font-manrope font-normal text-[12px] leading-[18px] text-[#6b7280]">~6 days left</span>
            </div>
            
            <div className="bg-white border border-[#e7e2d9] rounded-[14px] h-[45.5px] p-[13px] flex items-center gap-[12px] w-full shadow-sm hover:shadow-md transition-shadow">
              <div className="w-[8px] h-[8px] bg-[#f59e0b] rounded-full shrink-0" />
              <span className="font-sora font-semibold text-[13px] leading-[19.5px] text-[#1f2937] flex-1">Milo's food</span>
              <span className="font-manrope font-normal text-[12px] leading-[18px] text-[#6b7280]">~14 days left</span>
            </div>
            
            <div className="bg-white border border-[#e7e2d9] rounded-[14px] h-[45.5px] p-[13px] flex items-center gap-[12px] w-full shadow-sm hover:shadow-md transition-shadow">
              <div className="w-[8px] h-[8px] bg-[#16a34a] rounded-full shrink-0" />
              <span className="font-sora font-semibold text-[13px] leading-[19.5px] text-[#1f2937] flex-1">Coco's shampoo</span>
              <span className="font-manrope font-normal text-[12px] leading-[18px] text-[#6b7280]">~21 days left</span>
            </div>
          </div>
        </div>

        {/* Right Block - Subscriptions */}
        <div className="bg-white border border-[#e7e2d9] rounded-[24px] w-full lg:w-[604px] min-h-[404.5px] p-[40px] flex flex-col relative shadow-sm">
          <span className="font-manrope font-semibold text-[12px] leading-[18px] text-[#0f766e] tracking-[1.2px] uppercase mb-[14px]">
            Subscriptions
          </span>
          <h3 className="font-sora font-semibold text-[28px] leading-[35px] text-[#1f2937] mb-[20px] max-w-[460px]">
            Save 15% on every recurring delivery.
          </h3>
          
          <div className="flex flex-col gap-[12px] w-full max-w-[522px] mb-[24px]">
            <div className="flex items-start gap-[8px]">
              <div className="w-[20px] h-[20px] bg-[rgba(167,199,163,0.4)] rounded-[33554400px] flex items-center justify-center shrink-0 mt-[1px]">
                <span className="font-manrope font-normal text-[14px] leading-[21px] text-[#0f766e]">✓</span>
              </div>
              <span className="font-manrope font-normal text-[14px] leading-[21px] text-[#4b5563]">
                Choose a frequency — 2, 4, 6, or 8 weeks
              </span>
            </div>
            <div className="flex items-start gap-[8px]">
              <div className="w-[20px] h-[20px] bg-[rgba(167,199,163,0.4)] rounded-[33554400px] flex items-center justify-center shrink-0 mt-[1px]">
                <span className="font-manrope font-normal text-[14px] leading-[21px] text-[#0f766e]">✓</span>
              </div>
              <span className="font-manrope font-normal text-[14px] leading-[21px] text-[#4b5563]">
                Pause, skip, or cancel anytime from your dashboard
              </span>
            </div>
            <div className="flex items-start gap-[8px]">
              <div className="w-[20px] h-[20px] bg-[rgba(167,199,163,0.4)] rounded-[33554400px] flex items-center justify-center shrink-0 mt-[1px]">
                <span className="font-manrope font-normal text-[14px] leading-[21px] text-[#0f766e]">✓</span>
              </div>
              <span className="font-manrope font-normal text-[14px] leading-[21px] text-[#4b5563]">
                Adjust quantity per delivery to match your pet's needs
              </span>
            </div>
          </div>
          
          <button className="mt-auto bg-[#0f766e] text-white w-fit px-[24px] h-[44px] rounded-[33554400px] font-manrope font-semibold text-[14px] leading-[21px] shadow-[0px_10px_15px_0px_rgba(15,118,110,0.1),0px_4px_6px_0px_rgba(15,118,110,0.1)] hover:bg-[#0d6962] transition-colors">
            Start a subscription
          </button>
        </div>

      </div>
    </section>
  );
};

export default ReorderReminders;
