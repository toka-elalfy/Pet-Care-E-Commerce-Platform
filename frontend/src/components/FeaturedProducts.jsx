import arrowRightTeal from '../assets/icons/arrow-right-teal.svg';
import starFilled from '../assets/icons/star-filled.svg';
import plusIcon from '../assets/icons/plus.svg';
import productSalmon from '../assets/images/product-salmon.png';
import productCatChicken from '../assets/images/product-cat-chicken.png';
import productLambToy from '../assets/images/product-lamb-toy.png';
import productPuppyFood from '../assets/images/product-puppy-food.png';

// Mock data - ready for future API integration
const products = [
  {
    id: 1,
    targetPet: 'For Bella',
    petType: 'Dog',
    brand: 'Wildroot',
    category: 'Food',
    name: 'Grain-Free Salmon Adult Formula',
    rating: 4.8,
    reviews: 312,
    price: 58,
    subscribePrice: 49,
    image: productSalmon,
  },
  {
    id: 2,
    targetPet: 'For Milo',
    petType: 'Cat',
    brand: 'Whiskerly',
    category: 'Food',
    name: 'Indoor Cat Chicken Dinner',
    rating: 4.7,
    reviews: 189,
    price: 34,
    subscribePrice: 29,
    image: productCatChicken,
  },
  {
    id: 3,
    targetPet: 'For Coco',
    petType: 'Dog',
    brand: 'Pawnest',
    category: 'Toys',
    name: 'Plush Lamb Comfort Toy',
    rating: 4.9,
    reviews: 521,
    price: 18,
    subscribePrice: 16,
    image: productLambToy,
  },
  {
    id: 4,
    targetPet: null,
    petType: 'Dog',
    brand: 'Wildroot',
    category: 'Food',
    name: 'Puppy Growth Chicken & Duck',
    rating: 4.6,
    reviews: 143,
    price: 46,
    subscribePrice: 39,
    image: productPuppyFood,
  },
];

const ProductCard = ({ product }) => (
  <div className="group flex flex-col bg-white rounded-[16px] overflow-hidden border border-[#e7e2d9] hover:shadow-lg transition-all duration-300 h-full">
    {/* Image area */}
    <div className="relative h-[180px] lg:h-[218px] bg-[#fff8f1] overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Pet tag */}
      {product.targetPet && (
        <div className="absolute top-3 left-3 bg-[#0f766e] px-2.5 py-1 rounded-full">
          <span className="font-manrope font-semibold text-[10px] lg:text-[11px] text-white">
            {product.targetPet}
          </span>
        </div>
      )}
      {/* Type tag */}
      <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-full">
        <span className="font-manrope font-semibold text-[10px] lg:text-[11px] text-[#1f2937]">
          {product.petType}
        </span>
      </div>
    </div>

    {/* Details */}
    <div className="p-4 lg:p-[16px] flex flex-col flex-1 gap-2">
      {/* Brand · Category */}
      <div className="flex items-center gap-2">
        <span className="font-manrope font-normal text-[10px] lg:text-[11px] text-[#6b7280] uppercase tracking-wider">
          {product.brand}
        </span>
        <span className="text-[#6b7280] text-[10px]">·</span>
        <span className="font-manrope font-normal text-[10px] lg:text-[11px] text-[#6b7280] uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Product name */}
      <h3 className="font-sora font-semibold text-[14px] lg:text-[15px] leading-tight text-[#1f2937] line-clamp-2 group-hover:text-[#0f766e] transition-colors cursor-pointer min-h-[40px]">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-2">
        <img src={starFilled} alt="" className="w-3 h-3 lg:w-[13px] lg:h-[13px]" />
        <span className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#1f2937]">
          {product.rating}
        </span>
        <span className="font-manrope font-normal text-[11px] lg:text-[12px] text-[#6b7280]">
          ({product.reviews})
        </span>
      </div>

      {/* Price + Add button */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="font-sora font-semibold text-[16px] lg:text-[17px] text-[#1f2937]">
            ${product.price}
          </span>
          <span className="font-manrope font-semibold text-[10px] lg:text-[11px] text-[#0f766e]">
            ${product.subscribePrice} subscribe
          </span>
        </div>
        <button className="w-9 h-9 lg:w-[40px] lg:h-[40px] bg-[#0f766e] rounded-full flex items-center justify-center hover:bg-[#0d6962] transition-colors shrink-0 shadow-sm active:scale-90">
          <img src={plusIcon} alt="Add to cart" className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
        </button>
      </div>
    </div>
  </div>
);

const FeaturedProducts = () => {
  return (
    <section className="w-full flex justify-center py-12 lg:py-[88px]">
      <div className="w-full max-w-[1280px] px-4 sm:px-6 xl:px-[24px] flex flex-col gap-6 lg:gap-[24px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-sora font-semibold text-[24px] lg:text-[26px] text-[#1f2937]">
              Featured this week
            </h2>
            <p className="font-manrope font-normal text-[13px] lg:text-[14px] text-[#6b7280]">
              Hand-picked favorites loved by thousands of pets.
            </p>
          </div>
          <button className="flex items-center gap-1 font-manrope font-semibold text-[13px] lg:text-[14px] text-[#0f766e] hover:text-[#0d6962] transition-colors w-fit group">
            See all products
            <img src={arrowRightTeal} alt="" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[20px]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
