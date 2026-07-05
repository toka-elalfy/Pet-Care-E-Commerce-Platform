import arrowRightTeal from '../assets/icons/arrow-right-teal.svg';
import dogFoodImg from '../assets/images/dog-food.png';
import catFoodImg from '../assets/images/cat-food.png';
import toysImg from '../assets/images/toys.png';
import healthCareImg from '../assets/images/health-care.png';

const categories = [
  { id: 1, name: 'Dog Food', items: '184 items', image: dogFoodImg },
  { id: 2, name: 'Cat Food', items: '122 items', image: catFoodImg },
  { id: 3, name: 'Toys & Play', items: '96 items', image: toysImg },
  { id: 4, name: 'Health & Care', items: '74 items', image: healthCareImg },
];

const ShopByCategory = () => {
  return (
    <section className="w-full flex justify-center pb-12 lg:pb-[88px]">
      <div className="w-full max-w-[1280px] px-4 sm:px-6 xl:px-[24px] flex flex-col gap-6 lg:gap-[24px]">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-sora font-semibold text-[24px] lg:text-[26px] text-[#1f2937]">
              Shop by category
            </h2>
            <p className="font-manrope font-normal text-[13px] lg:text-[14px] text-[#6b7280]">
              Curated by veterinarians and real pet parents.
            </p>
          </div>
          <button className="flex items-center gap-1 font-manrope font-semibold text-[13px] lg:text-[14px] text-[#0f766e] hover:text-[#0d6962] transition-colors w-fit group">
            Browse all
            <img src={arrowRightTeal} alt="" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer relative h-[300px] lg:h-[370px] rounded-[16px] overflow-hidden border border-[#e7e2d9] shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <h3 className="font-sora font-semibold text-[16px] lg:text-[18px] text-white">
                  {category.name}
                </h3>
                <p className="font-manrope font-medium text-[11px] lg:text-[12px] text-white/80">
                  {category.items}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
