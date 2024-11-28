import React, { useState, useEffect } from 'react';
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BasketProvider } from './components/pages/cart/BasketContext';
import CurrencyProvider from './components/header/currencyContext';

import Header from './components/header/Header';
import Home from "./components/pages/home/Home";
import Detail from "./components/pages/detail/Detail";
import Cart from './components/pages/cart/Cart';
import Shop from './components/pages/shop/Shop';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulate loading (e.g., for fetching data or assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clean up timer
  }, []);


  return (
    <>
      {isLoading ? (
        <div className={`fixed inset-0 bg-white flex items-center justify-center z-50 ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-[#00001D]">
          <CurrencyProvider>
            <BasketProvider>
              <Router>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<Shop />} />
                  </Routes>
                </main>
              </Router>
            </BasketProvider>
          </CurrencyProvider>

        </div>
      )}
    </>


  );
};

export default App;
