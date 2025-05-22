import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import HomePage from './Homepage/HomePage.jsx';
import Category from './Category/Category.jsx';
import Dashboard from './Category/Dashboard/Dashboard.jsx';
import Product from './Category/Product/Computing.jsx';

import ShopCart from './ShopCart/ShopCart.jsx';

import Transaction from './Transaction/Transaction.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/dashboard" element={<Dashboard />} />
        <Route path="/category/computing" element={<Product />} />
        <Route path="/shopcart" element={<ShopCart />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
