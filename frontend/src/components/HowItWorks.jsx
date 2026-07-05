const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Tell us about your pet",
      description: "Breed, age, weight, and preferences build a profile we learn from."
    },
    {
      number: "02",
      title: "Get personalized picks",
      description: "See products matched to each pet — with clear reasons why."
    },
    {
      number: "03",
      title: "Subscribe & relax",
      description: "We deliver on schedule and remind you before anything runs out."
    }
  ];

  return (
    <section className="w-full flex justify-center py-[88px]">
      <div className="w-full max-w-[1280px] px-4 xl:px-[24px] flex flex-col items-center">
        
        <div className="flex flex-col items-center mb-[40px]">
          <h2 className="font-sora font-semibold text-[30px] leading-[45px] text-[#1f2937] text-center w-full max-w-[560px]">
            How Zootopia works
          </h2>
          <p className="font-manrope font-normal text-[15px] leading-[22.5px] text-[#6b7280] text-center mt-[12px]">
            Three simple steps to personalized, worry-free pet care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] w-full">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white border border-[#e7e2d9] rounded-[16px] h-[198.5px] p-[28px] flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="font-sora font-bold text-[32px] leading-[48px] text-[rgba(15,118,110,0.3)] mb-[12px]">
                {step.number}
              </div>
              <h3 className="font-sora font-semibold text-[18px] leading-[27px] text-[#1f2937]">
                {step.title}
              </h3>
              <p className="font-manrope font-normal text-[14px] leading-[22.75px] text-[#6b7280] mt-[8px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;
