import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Favorites from './pages/Favorites';
import Account from './pages/Account';
import Campaigns from './pages/Campaigns';
import { CartProvider } from './context/CartContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/Navbar';
import ForgotPassword from './components/auth/ForgotPassword';
import OrderTracking from './pages/OrderTracking';
import Profile from './pages/Profile';
import { NotificationProvider } from './context/NotificationContext';
import SearchResults from './pages/SearchResults';

const App = () => {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Router>
          <CartProvider>
            <Navbar />
            <main className="pt-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Korumalı rotalar */}
                <Route path="/hesabim/*" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/sepet" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/siparislerim" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/adreslerim" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/favorilerim" element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                } />

                {/* Genel rotalar */}
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/kategori/:categorySlug" element={<CategoryPage />} />
                <Route path="/favoriler" element={<Favorites />} />
                <Route path="/kampanyalar" element={<Campaigns />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/siparis-takip" element={<OrderTracking />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
            </main>
          </CartProvider>
        </Router>
      </NotificationProvider>
    </Provider>
  );
};

export default App;
