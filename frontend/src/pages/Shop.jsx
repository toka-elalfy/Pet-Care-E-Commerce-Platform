import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../constants/shopData';
import ProductCard from '../components/dashboard/ProductCard';
import ShopFilterSidebar from '../components/shop/ShopFilterSidebar';
import backIcon from '../assets/icons/back-icon.svg';
import searchIcon from '../assets/icons/search-icon-shop.svg';
import filterIcon from '../assets/icons/filter-icon.svg';
import { X } from 'lucide-react';

const Shop = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    petType: 'All',
    category: 'All',
    ageGroup: 'All',
    size: 'All'
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPetType = filters.petType === 'All' || product.petType === filters.petType || product.petType === 'Any Pet';
    const matchesCategory = filters.category === 'All' || product.category === filters.category;
    const matchesAge = filters.ageGroup === 'All' || product.ageGroup === filters.ageGroup || product.ageGroup === 'All';
    const matchesSize = filters.size === 'All' || product.size === filters.size;

    return matchesSearch && matchesPetType && matchesCategory && matchesAge && matchesSize;
  });

  return (
    <div className="flex flex-col gap-6 lg:gap-[32px] animate-[fadeIn_0.5s_ease-out]">
      {/* Back Button */}
      <div className="pt-2">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white border border-[#e7e2d9] h-9 px-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
        >
          <img src={backIcon} alt="back" className="w-[14px] h-[14px]" />
          <span className="font-manrope font-semibold text-[13px] text-[#374151]">Back</span>
        </button>
      </div>

      {/* Title & Search Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#1f2937] font-sora font-semibold text-[28px] lg:text-[32px] leading-tight">
            Shop for your pet
          </h1>
          <p className="text-[#6b7280] font-manrope text-[13px] lg:text-[14px]">
            {filteredProducts.length} products personalized for you
          </p>
        </div>

        <div className="relative w-full lg:w-[360px]">
          <img 
            src={searchIcon} 
            alt="search" 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" 
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-white border border-[#e7e2d9] rounded-full pl-10 pr-4 text-[14px] font-manrope focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
          />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 bg-white border border-[#e7e2d9] h-10 px-4 rounded-full font-manrope font-semibold text-[13px] text-[#1f2937] w-full justify-center shadow-sm"
        >
          <img src={filterIcon} alt="" className="w-4 h-4" />
          Filter Products
        </button>
      </div>

      {/* Main Shop Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Overlay for mobile filters */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Sidebar Filters */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-[160] lg:z-auto
          w-[280px] lg:w-[284px] transition-transform duration-300
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#fff8f1] lg:bg-transparent
        `}>
          <div className="h-full lg:h-auto overflow-y-auto lg:overflow-visible p-6 lg:p-0">
             <div className="flex justify-between items-center mb-6 lg:hidden">
               <span className="font-sora font-semibold text-[18px]">Filters</span>
               <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                 <X className="w-5 h-5" />
               </button>
             </div>
             <ShopFilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="hidden sm:inline text-[#6b7280] text-[13px] font-manrope">Showing {filteredProducts.length} results</span>
            <select className="bg-white border border-[#e7e2d9] h-10 px-4 rounded-full font-manrope text-[13px] text-[#1f2937] focus:outline-none w-full sm:w-auto">
              <option>Sort by: Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showMatchReason={false} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 lg:p-12 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-[#fff8f1] rounded-full flex items-center justify-center">
                <img src={searchIcon} alt="" className="w-8 h-8 opacity-20" />
              </div>
              <div>
                <h3 className="font-sora font-semibold text-[18px] text-[#1f2937]">No products found</h3>
                <p className="font-manrope text-[#6b7280] text-[14px] mt-1">Try adjusting your filters or search query.</p>
              </div>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ petType: 'All', category: 'All', ageGroup: 'All', size: 'All' });
                }}
                className="text-[#0f766e] font-semibold text-[14px] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
