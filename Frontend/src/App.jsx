import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import HomePage from './Homepage/HomePage';
import Category from './Category/Category';
import Product from './Category/Product/Computing';

import ShopCart from './ShopCart/ShopCart';

import Transaction from './Transaction/Transaction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/computing" element={<Product />} />
        <Route path="/shopcart" element={<ShopCart />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
