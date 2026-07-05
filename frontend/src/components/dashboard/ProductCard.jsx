import { useNavigate } from 'react-router-dom';
import starIcon from '../../assets/icons/star-filled.svg';
import cartPlusIcon from '../../assets/icons/cart-plus.svg';

const ProductCard = ({ product, showMatchReason = true }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/shop/${product.id}`)}
      className="bg-white border border-[#e7e2d9] rounded-[16px] overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="bg-[#fff8f1] relative h-[217.5px] overflow-hidden group shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Labels */}
        {product.label && (
          <div className="absolute top-[12px] left-[12px] bg-[#0f766e] px-[10px] py-[4px] rounded-full shadow-sm">
            <span className="text-white text-[11px] font-semibold">{product.label}</span>
          </div>
        )}
        
        <div className="absolute top-[12px] right-[12px] bg-white/90 px-[10px] py-[4px] rounded-full shadow-sm">
          <span className="text-[#1f2937] text-[11px] font-semibold">{product.petType}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-[16px] flex flex-col flex-grow">
        {/* Brand & Category */}
        <div className="flex items-center gap-[8px] mb-[4px]">
          <span className="text-[#6b7280] text-[11px] uppercase tracking-[0.55px] font-medium">{product.brand}</span>
          <span className="text-[#6b7280] text-[11px]">·</span>
          <span className="text-[#6b7280] text-[11px] uppercase tracking-[0.55px] font-medium">{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-[#1f2937] font-sora font-semibold text-[15px] mb-[8px] line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-[6px] mb-[12px]">
          <img src={starIcon} alt="rating" className="w-[13px] h-[13px]" />
          <span className="text-[#1f2937] text-[12px] font-semibold">{product.rating}</span>
          <span className="text-[#6b7280] text-[12px]">({product.reviews})</span>
        </div>

        {/* Match Reason (Optional) */}
        {showMatchReason && product.matchReason && (
          <div className="bg-[#a7c7a3]/20 border border-[#a7c7a3]/50 rounded-[10px] px-[13px] py-[9px] mb-[16px] flex-grow">
            <p className="text-[#0f766e] text-[12px] leading-[1.4]">
              {product.matchReason}
            </p>
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-[#1f2937] font-sora font-semibold text-[17px]">
              ${product.price}
            </div>
            <div className="text-[#0f766e] text-[11px] font-semibold">
              ${product.subscribePrice} subscribe
            </div>
          </div>
          
          <button className="bg-[#0f766e] w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-[#0d6b63] transition-colors shadow-md">
            <img src={cartPlusIcon} alt="Add to cart" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
