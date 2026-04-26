import React, { useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingCart as CartIcon, RefreshCw, Lock, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ShoppingCart() {
  const { cartItems, updateQuantity, removeItem, togglePurchaseType } = useCart();

  // Debug Check: requested by user to see data flow
  console.log('Current Global Cart Items:', cartItems);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      if (item.purchaseType === 'subscription') {
        return sum + itemTotal * 0.85; // 15% off
      }
      return sum + itemTotal;
    }, 0);
  }, [cartItems]);

  const tax = 0;
  const total = subtotal + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen bg-[#FDFCF9] font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            /* ===== EMPTY CART STATE ===== */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center min-h-screen"
            >
              <div className="text-center px-6">
                {/* Icon in gray circle */}
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                  <CartIcon className="text-[#1B4332]" size={32} />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-400 mb-8">Once you add something, it'll show up here.</p>

                <Link
                  to="/bundles"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1B4332] text-white rounded-full font-bold text-sm hover:bg-[#122e23] transition shadow-lg shadow-green-900/10"
                >
                  Browse products
                </Link>
              </div>
            </motion.div>
          ) : (
            /* ===== FILLED CART ===== */
            <motion.div
              key="filled-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 lg:p-12"
            >
              <div className="max-w-5xl mx-auto">

                {/* Back Button */}
                <Link
                  to="/bundles"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition mb-6 w-fit"
                >
                  <ChevronLeft size={16} />
                  Back
                </Link>

                {/* Page Header */}
                <h1 className="text-4xl font-bold text-gray-900 mb-1">Your cart</h1>
                <p className="text-sm text-gray-400 mb-10">
                  {totalItems} items · review before checkout
                </p>

                {/* Main Layout: Items + Summary */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

                  {/* Left: Cart Items */}
                  <div style={{ flex: '1 1 0%', minWidth: 0 }}>
                    <AnimatePresence initial={false}>
                      {cartItems.map(item => {
                        const lineTotal = item.purchaseType === 'subscription'
                          ? item.price * item.quantity * 0.85
                          : item.price * item.quantity;

                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4"
                          >
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative">
                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={16} />
                              </button>

                              <div className="flex items-center gap-5">
                                {/* Product Image */}
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                                />

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                                    {item.brand}
                                  </p>
                                  <h3 className="font-semibold text-gray-900 text-sm mb-3">
                                    {item.name}
                                  </h3>

                                  <div className="flex items-center gap-3">
                                    {/* Quantity Stepper */}
                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                      <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                                      >
                                        <Minus size={13} />
                                      </button>
                                      <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-800 border-x border-gray-200">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                                      >
                                        <Plus size={13} />
                                      </button>
                                    </div>

                                    {/* Purchase Type Toggle */}
                                    <button
                                      onClick={() => togglePurchaseType(item.id)}
                                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                        item.purchaseType === 'subscription'
                                          ? 'bg-[#1B4332] text-white'
                                          : 'bg-gray-50 border border-gray-200 text-gray-500'
                                      }`}
                                    >
                                      <RefreshCw size={11} />
                                      {item.purchaseType === 'subscription' ? 'Subscription (save 15%)' : 'One-time'}
                                    </button>
                                  </div>
                                </div>

                                {/* Line Total */}
                                <div className="text-right shrink-0 pr-6">
                                  <p className="text-lg font-bold text-gray-900">${lineTotal.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Right: Order Summary */}
                  <div style={{ width: '300px', flexShrink: 0, position: 'sticky', top: '2rem' }}>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <h2 className="font-bold text-gray-900 text-lg mb-5">Order summary</h2>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-500">
                          <span>Subtotal</span>
                          <span className="font-medium text-gray-800">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                          <span>Shipping</span>
                          <span className="font-medium text-[#1B4332]">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                          <span>Estimated tax</span>
                          <span className="font-medium text-gray-800">$0.00</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-5 mt-5 border-t border-gray-100">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                      </div>

                      <button className="w-full mt-6 py-3.5 bg-[#1B4332] text-white rounded-2xl font-bold flex items-center justify-center gap-2 text-sm hover:bg-[#122e23] transition shadow-lg shadow-green-900/10">
                        <Lock size={14} />
                        Secure checkout
                      </button>

                      <Link
                        to="/bundles"
                        className="w-full mt-3 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold flex items-center justify-center text-sm hover:bg-gray-50 transition"
                      >
                        Continue shopping
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
