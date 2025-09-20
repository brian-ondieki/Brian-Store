import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductListPage from './pages/ProductListPage';
import ProductCreatePage from './pages/ProductCreatePage';
import Header from './components/Header';
import ProductEditPage from './pages/ProductEditPage'; 
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<><Header /><main><HomePage /></main></>} />
      <Route path="/products/:id" element={<><Header /><main><ProductDetailsPage /></main></>} />
      

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboardPage />}>
       
        <Route index element={<ProductListPage />} /> 
        <Route path="products/new" element={<ProductCreatePage />} />
        <Route path="products/:id/edit" element={<ProductEditPage />} />
      </Route>
    </Routes>
  );
}

export default App;