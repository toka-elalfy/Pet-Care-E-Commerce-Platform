import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import OrderDetails from './pages/OrderDetails';
import Subscriptions from './pages/Subscriptions';
import EditSubscription from './pages/EditSubscription';
import Reminders from './pages/Reminders';
import AccountSettings from './pages/AccountSettings';
import BundleBuilder from './pages/BundleBuilder';
import ShoppingCartPage from './pages/ShoppingCart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md p-4">
              <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">PetCare</h1>
                <div className="space-x-4">
                  <a href="/" className="hover:text-blue-500">Home</a>
                  <a href="/login" className="hover:text-blue-500">Login</a>
                </div>
              </div>
            </nav>
            <main className="container mx-auto p-8">
              <h2 className="text-3xl font-bold">Welcome to PetCare</h2>
            </main>
          </div>
        } />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/bundles" element={<BundleBuilder />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/subscriptions/edit/:id" element={<EditSubscription />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/account" element={<AccountSettings />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
