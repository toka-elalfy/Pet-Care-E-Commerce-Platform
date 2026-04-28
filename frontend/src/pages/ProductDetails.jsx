import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../constants/shopData';
import ProductCard from '../components/dashboard/ProductCard';

// Icons
import starIcon from '../assets/icons/star-filled.svg';
import minusIcon from '../assets/icons/minus-icon.svg';
import plusIcon from '../assets/icons/plus-icon.svg';
import bundleIcon from '../assets/icons/bundle-icon.svg';
import shippingIcon from '../assets/icons/shipping-icon.svg';
import vetIcon from '../assets/icons/vet-approved-icon.svg';
import returnsIcon from '../assets/icons/returns-icon.svg';

// Thumbnails
import thumb1 from '../assets/images/product-thumb-1.png';
import thumb2 from '../assets/images/product-thumb-2.png';
import mainImg from '../assets/images/product-main.png';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState('subscribe');
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Mock related products
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 2);

  const thumbnails = [product.image, thumb1, mainImg, thumb2]; 

  return (
    <div className="flex flex-col gap-6 lg:gap-[40px] animate-[fadeIn_0.5s_ease-out] pb-20">
      {/* Back Link */}
      <button 
        onClick={() => navigate('/shop')}
        className="flex items-center gap-2 text-[#6b7280] font-manrope font-medium text-[13px] hover:text-[#1f2937] transition-colors w-fit pt-2"
      >
        ← Back to shop
      </button>

      <div className="flex flex-col xl:flex-row gap-8 lg:gap-[40px]">
        {/* Left: Gallery */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="aspect-[4/3] lg:aspect-[702/526] bg-[#fff8f1] border border-[#e7e2d9] rounded-[20px] lg:rounded-[24px] overflow-hidden">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3 lg:gap-4">
            {thumbnails.map((thumb, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(thumb)}
                className={`aspect-square rounded-[12px] lg:rounded-[14px] overflow-hidden border-2 transition-all ${
                  selectedImage === thumb ? 'border-[#0f766e]' : 'border-[#e7e2d9] hover:border-[#0f766e]/40'
                }`}
              >
                <img src={thumb} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full xl:w-[490px] flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <p className="text-[#0f766e] font-manrope font-semibold text-[11px] lg:text-[12px] uppercase tracking-[1px] lg:tracking-[1.2px]">
              {product.brand} · {product.category}
            </p>
            <h1 className="text-[#1f2937] font-sora font-semibold text-[28px] lg:text-[32px] leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <img src={starIcon} alt="" className="w-3.5 h-3.5 lg:w-[15px] lg:h-[15px]" />
                <span className="text-[#1f2937] font-manrope font-semibold text-[13px]">{product.rating}</span>
              </div>
              <span className="text-[#6b7280]">·</span>
              <span className="text-[#6b7280] font-manrope text-[12px] lg:text-[13px]">{product.reviews} reviews</span>
            </div>
          </div>

          <p className="text-[#4b5563] font-manrope text-[14px] lg:text-[15px] leading-relaxed">
            Complete daily nutrition for {product.petType.toLowerCase()}s. Supports healthy digestion with prebiotic fiber and natural hairball control.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Hairball Care', 'Indoor', 'Real Chicken'].map(tag => (
              <span key={tag} className="bg-[#a7c7a3]/20 text-[#0f766e] px-3 py-1.5 rounded-full text-[11px] lg:text-[12px] font-manrope font-semibold">
                {tag}
              </span>
            ))}
          </div>

          {/* Suitable For */}
          <div className="bg-white border border-[#e7e2d9] rounded-[16px] p-4 lg:p-5 flex flex-col gap-3">
            <h3 className="text-[#6b7280] font-manrope font-semibold text-[10px] lg:text-[11px] uppercase tracking-[1px]">Suitable for</h3>
            <div className="flex justify-between">
              {[
                { label: 'Pet', val: product.petType },
                { label: 'Age', val: product.ageGroup },
                { label: 'Size', val: product.size }
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center gap-1 flex-1 border-r last:border-r-0 border-[#e7e2d9]/50 px-1">
                  <span className="text-[#6b7280] text-[10px] uppercase tracking-[1px]">{item.label}</span>
                  <span className="text-[#1f2937] font-sora font-semibold text-[13px] lg:text-[14px] text-center">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Options */}
          <div className="flex flex-col gap-3">
            {/* Subscribe */}
            <label className={`flex gap-3 lg:gap-4 p-4 rounded-[16px] border cursor-pointer transition-all ${
              purchaseType === 'subscribe' ? 'bg-[#0f766e]/5 border-[#0f766e]' : 'bg-white border-[#e7e2d9]'
            }`}>
              <input 
                type="radio" 
                name="purchase" 
                checked={purchaseType === 'subscribe'} 
                onChange={() => setPurchaseType('subscribe')}
                className="mt-1 accent-[#0f766e] w-4 h-4 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <span className="text-[#1f2937] font-sora font-semibold text-[14px] lg:text-[15px]">Subscribe & save 15%</span>
                  <span className="text-[#0f766e] font-sora font-semibold text-[15px] lg:text-[16px]">${product.subscribePrice}</span>
                </div>
                <p className="text-[#6b7280] text-[11px] lg:text-[12px] mb-3">Free delivery · pause or cancel anytime</p>
                <select className="w-full h-9 bg-white border border-[#e7e2d9] rounded-full px-3 text-[12px] lg:text-[13px] font-manrope focus:outline-none">
                  <option>Ships every 4 weeks</option>
                  <option>Ships every 6 weeks</option>
                  <option>Ships every 8 weeks</option>
                </select>
              </div>
            </label>

            {/* One-time */}
            <label className={`flex gap-3 lg:gap-4 p-4 rounded-[16px] border cursor-pointer transition-all ${
              purchaseType === 'one-time' ? 'bg-[#0f766e]/5 border-[#0f766e]' : 'bg-white border-[#e7e2d9]'
            }`}>
              <input 
                type="radio" 
                name="purchase" 
                checked={purchaseType === 'one-time'} 
                onChange={() => setPurchaseType('one-time')}
                className="mt-1 accent-[#0f766e] w-4 h-4 shrink-0"
              />
              <div className="flex-1 flex justify-between items-center gap-2">
                <div className="min-w-0">
                  <span className="text-[#1f2937] font-sora font-semibold text-[14px] lg:text-[15px]">One-time purchase</span>
                  <p className="text-[#6b7280] text-[11px] lg:text-[12px]">Ships in 1–2 business days</p>
                </div>
                <span className="text-[#1f2937] font-sora font-semibold text-[15px] lg:text-[16px] shrink-0">${product.price}</span>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Quantity */}
              <div className="flex items-center justify-between sm:justify-start bg-white border border-[#e7e2d9] rounded-full h-[48px] px-2 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                >
                  <img src={minusIcon} alt="minus" className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-sora font-semibold text-[15px]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                >
                  <img src={plusIcon} alt="plus" className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <button className="flex-1 h-[48px] bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[14px] lg:text-[15px] transition-all hover:shadow-lg active:scale-95 px-4">
                Add to cart · ${purchaseType === 'subscribe' ? (product.subscribePrice * quantity).toFixed(2) : (product.price * quantity).toFixed(2)}
              </button>
            </div>

            <button className="h-[48px] bg-white border border-[#0f766e]/30 hover:border-[#0f766e] text-[#0f766e] rounded-full font-manrope font-semibold text-[13px] lg:text-[14px] flex items-center justify-center gap-2 transition-all px-4">
              <img src={bundleIcon} alt="" className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              Add to a bundle · save up to 20%
            </button>
          </div>

          {/* Badges */}
          <div className="flex justify-between py-2 overflow-x-auto no-scrollbar gap-4">
            {[
              { icon: shippingIcon, text: 'Free over $40' },
              { icon: vetIcon, text: 'Vet approved' },
              { icon: returnsIcon, text: '30-day returns' }
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2 opacity-80 shrink-0">
                <img src={item.icon} alt="" className="w-3.5 h-3.5" />
                <span className="text-[#6b7280] text-[11px] lg:text-[12px] font-manrope whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-8 lg:mt-10 flex flex-col gap-6">
        <h2 className="text-[#1f2937] font-sora font-semibold text-[20px] lg:text-[24px]">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} showMatchReason={false} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
