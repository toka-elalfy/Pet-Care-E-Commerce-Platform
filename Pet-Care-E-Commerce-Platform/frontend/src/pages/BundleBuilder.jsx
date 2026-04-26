import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import { ShoppingCart, X, Check, Plus, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const PRODUCTS = [
  { id: 1, name: 'Grain-Free Salmon Adult Formula', price: 58, category: 'Food', image: 'https://images.unsplash.com/photo-1589924691106-0736198bc2b9?w=400&h=400&fit=crop' },
  { id: 2, name: 'Indoor Cat Chicken Dinner', price: 34, category: 'Food', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop' },
  { id: 3, name: 'Plush Lamb Comfort Toy', price: 18, category: 'Toys', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop' },
  { id: 4, name: 'Puppy Growth Chicken & Duck', price: 46, category: 'Food', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop' },
  { id: 5, name: 'Fetch Pro Rubber Frisbee', price: 22, category: 'Toys', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop' },
  { id: 6, name: 'Daily Joint Support Chews', price: 32, category: 'Health', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop' },
  { id: 7, name: 'Pure Oat Calming Shampoo', price: 24, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=400&fit=crop' },
  { id: 8, name: 'Senior Cat Kidney Care', price: 38, category: 'Health', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop' },
];

const CATEGORIES = ['All', 'Food', 'Toys', 'Health', 'Grooming'];

export default function BundleBuilder() {
  const [bundle, setBundle] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addMultipleToCart } = useCart();
  const navigate = useNavigate();

  const handleAddBundleToCart = () => {
    if (bundle.length === 0) return;
    addMultipleToCart(bundle);
    setBundle([]);
    navigate('/cart');
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const discountInfo = useMemo(() => {
    const count = bundle.length;
    let percentage = 0;
    let nextTier = 2;
    let nextDiscount = 5;

    if (count >= 5) {
      percentage = 20;
      nextTier = null;
    } else if (count >= 4) {
      percentage = 15;
      nextTier = 5;
      nextDiscount = 20;
    } else if (count >= 3) {
      percentage = 10;
      nextTier = 4;
      nextDiscount = 15;
    } else if (count >= 2) {
      percentage = 5;
      nextTier = 3;
      nextDiscount = 10;
    }

    return { percentage, nextTier, nextDiscount };
  }, [bundle]);

  const subtotal = useMemo(() => bundle.reduce((sum, item) => sum + item.price, 0), [bundle]);
  const discountAmount = useMemo(() => subtotal * (discountInfo.percentage / 100), [subtotal, discountInfo]);
  const total = subtotal - discountAmount;

  const toggleProduct = (product) => {
    setBundle(prev => {
      const isAdded = prev.find(p => p.id === product.id);
      if (isAdded) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const removeProduct = (productId) => {
    setBundle(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCF9] font-sans">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-500 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
              <ShoppingCart size={10} /> Bundle Builder
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Build a bundle. Save more as you add.</h1>
          <p className="text-gray-500 mb-10 max-w-xl">Combine food, toys, health, and grooming into a single order. Discounts stack automatically as your bundle grows.</p>

          {/* Discount Progress Bar */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#1B4332] font-bold text-sm">
                <span>%</span>
                <span>Bundle discount</span>
              </div>
              <p className="text-xs text-gray-500">
                {discountInfo.nextTier
                  ? <>Add <span className="font-bold text-[#1B4332]">{discountInfo.nextTier - bundle.length} more</span> to unlock <span className="font-bold text-[#1B4332]">{discountInfo.nextDiscount}% off</span></>
                  : <span className="font-bold text-[#1B4332]">Max discount unlocked! 🎉</span>}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[5, 10, 15, 20].map((tier, idx) => {
                const isActive = discountInfo.percentage >= tier;
                const minItems = idx + 2;
                return (
                  <div
                    key={tier}
                    className={`rounded-xl py-4 px-5 text-center transition-all duration-300 border ${
                      isActive
                        ? 'bg-[#1B4332] border-[#1B4332] text-white shadow-lg'
                        : 'bg-[#F9F8F3] border-gray-100 text-gray-400'
                    }`}
                  >
                    <h4 className="text-xl font-bold">{tier}%</h4>
                    <p className="text-[10px] font-medium mt-0.5 opacity-80">{minItems}+ items</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content: Products + Sidebar */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

            {/* Left: Filters + Product Grid */}
            <div style={{ flex: '1 1 0%', minWidth: 0 }}>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1.5">
                  <SlidersHorizontal size={12} /> Filter
                </span>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {filteredProducts.map(product => {
                    const isAdded = bundle.find(p => p.id === product.id);
                    return (
                      <motion.div
                        layout
                        key={product.id}
                        className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group h-full flex flex-col border-2 ${
                          isAdded ? 'border-[#1B4332]' : 'border-transparent'
                        }`}
                      >
                        {/* Category Tag */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`px-2.5 py-1 text-[9px] font-bold rounded-md uppercase tracking-wider ${
                            product.category === 'Food' ? 'bg-amber-100 text-amber-700' :
                            product.category === 'Toys' ? 'bg-teal-100 text-teal-700' :
                            product.category === 'Health' ? 'bg-purple-100 text-purple-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {product.category}
                          </span>
                        </div>

                        {/* Image */}
                        <div className="h-48 overflow-hidden bg-gray-50 shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Details */}
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm mb-3 min-h-[40px] leading-snug flex-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="font-bold text-lg text-gray-900">${product.price}</span>
                            <button
                              onClick={() => toggleProduct(product)}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                                isAdded
                                  ? 'bg-[#1B4332] text-white'
                                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                              }`}
                            >
                              {isAdded ? (
                                <><Check size={13} /> In bundle</>
                              ) : (
                                <><Plus size={13} /> Add</>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Your Bundle Sidebar */}
            <div style={{ width: '320px', flexShrink: 0, position: 'sticky', top: '2rem' }}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-900 text-lg">Your bundle</h2>
                  <span className="px-2.5 py-1 bg-teal-50 text-[#1B4332] text-[10px] font-bold rounded-full">
                    {bundle.length} items
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                  <AnimatePresence initial={false}>
                    {bundle.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-3"
                      >
                        <img src={item.image} className="w-11 h-11 rounded-xl object-cover" alt="" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">${item.price}</p>
                        </div>
                        <button
                          onClick={() => removeProduct(item.id)}
                          className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {bundle.length === 0 && (
                    <div className="py-8 text-center">
                      <ShoppingCart className="mx-auto text-gray-200 mb-2" size={28} />
                      <p className="text-xs text-gray-400">Your bundle is empty</p>
                      <p className="text-[10px] text-gray-300 mt-1">Add products to get started</p>
                    </div>
                  )}
                </div>

                {/* Financials */}
                <div className="space-y-2.5 pt-5 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountInfo.percentage > 0 && (
                    <div className="flex justify-between text-xs font-bold text-[#1B4332]">
                      <span className="flex items-center gap-1.5">
                        Bundle discount
                        <span className="px-1.5 py-0.5 bg-[#E6F4EA] rounded text-[9px]">-{discountInfo.percentage}%</span>
                      </span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-1">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  disabled={bundle.length === 0}
                  onClick={handleAddBundleToCart}
                  className={`w-full mt-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm transition-all ${
                    bundle.length > 0
                      ? 'bg-[#1B4332] text-white hover:bg-[#122e23] shadow-lg shadow-green-900/10'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={16} />
                  Add bundle to cart
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-3 leading-relaxed">
                  Build once, reorder anytime. Bundles are saved to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
