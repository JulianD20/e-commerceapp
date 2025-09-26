import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PlansPage from './pages/PlansPage';
import { AuthPage } from './pages/AuthPage';
import VendorDashboard from './pages/VendorDashboard';
import StorefrontPage from './pages/StorefrontPage';
import ProfilePage from './pages/ProfilePage';
import HelpCenter from './pages/HelpCenter';
import VendorOnboarding from './pages/VendorOnboarding';
import Chatbot from './components/chatbot/Chatbot';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ChatbotProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/category/:category" element={<MarketplacePage />} />
                    <Route path="/search" element={<MarketplacePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/store/:vendorId" element={<StorefrontPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/plans" element={<PlansPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                    <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                </Layout>
                <Chatbot />
              </div>
            </Router>
          </ChatbotProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;