import starIcon from '../assets/icons/star-testimonial.svg';

// Mock data - ready for future API integration
const testimonials = [
  {
    quote: 'Our senior lab eats better now than he did at 3. The joint chews have been life-changing.',
    author: 'Amelia R.',
    pet: 'Maple the Labrador',
  },
  {
    quote: "I used to panic-shop kibble at midnight. The reminder nudges me a week before — perfect.",
    author: 'David K.',
    pet: 'Luna the Husky',
  },
  {
    quote: 'Loved getting picks tailored to an indoor senior cat. Not generic filler — real recommendations.',
    author: 'Priya S.',
    pet: 'Biscuit the Persian',
  },
];

const Testimonials = () => {
  return (
    <section className="w-full flex justify-center pb-[88px]">
      <div className="w-full max-w-[1280px] px-4 xl:px-[24px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#fff8f1] border border-[#e7e2d9] rounded-[16px] p-[24px] flex flex-col min-h-[184px] hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-[4px] mb-[12px]">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={starIcon} alt="" className="w-[14px] h-[14px]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-manrope font-normal text-[15px] leading-[24.375px] text-[#1f2937] flex-1 mb-[20px]">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div>
                <p className="font-sora font-semibold text-[14px] leading-[21px] text-[#1f2937]">
                  {testimonial.author}
                </p>
                <p className="font-manrope font-normal text-[12px] leading-[18px] text-[#6b7280]">
                  {testimonial.pet}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
