import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
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
          <Routes>
            <Route path="/" element={<h2 className="text-3xl font-bold">Welcome to PetCare</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
