import React, { createContext, useContext, useState, useEffect } from 'react';

const INITIAL_CART = [
  {
    id: 1,
    name: 'Grain-Free Salmon Adult Formula',
    brand: 'WILDROOT',
    price: 49,
    quantity: 4,
    purchaseType: 'subscription',
    image: 'https://images.unsplash.com/photo-1589924691106-0736198bc2b9?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Plush Lamb Comfort Toy',
    brand: 'PAWNEST',
    price: 18,
    quantity: 3,
    purchaseType: 'one-time',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Puppy Growth Chicken & Duck',
    brand: 'WILDROOT',
    price: 46,
    quantity: 2,
    purchaseType: 'one-time',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Indoor Cat Chicken Dinner',
    brand: 'WHISKERLY',
    price: 34,
    quantity: 1,
    purchaseType: 'one-time',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Fetch Pro Rubber Frisbee',
    brand: 'PAWNEST',
    price: 22,
    quantity: 1,
    purchaseType: 'one-time',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Daily Joint Support Chews',
    brand: 'VETBLOOM',
    price: 32,
    quantity: 1,
    purchaseType: 'one-time',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
  },
];

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('petcare_cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Failed to parse cart from local storage', error);
    }
    return INITIAL_CART;
  });

  useEffect(() => {
    localStorage.setItem('petcare_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const togglePurchaseType = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, purchaseType: item.purchaseType === 'one-time' ? 'subscription' : 'one-time' }
          : item
      )
    );
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => 
          p.id === item.id ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p
        );
      }
      return [...prev, { 
        ...item, 
        brand: item.brand || 'Zootopia', 
        quantity: item.quantity || 1, 
        purchaseType: 'one-time' 
      }];
    });
  };

  const addMultipleToCart = (items) => {
    setCartItems(prev => {
      const newItems = [...prev];
      items.forEach(item => {
        const existing = newItems.find(p => p.id === item.id);
        if (existing) {
          existing.quantity += (item.quantity || 1);
        } else {
          newItems.push({ 
            ...item, 
            brand: item.brand || 'Zootopia', 
            quantity: item.quantity || 1, 
            purchaseType: 'one-time' 
          });
        }
      });
      return newItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, updateQuantity, removeItem, togglePurchaseType, addToCart, addMultipleToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
