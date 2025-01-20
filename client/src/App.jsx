import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductList from './components/Product/ProductList';
import Header from './components/Header/Header';
import HeroSection from './components/Hero/HeroSection';
import Profile from './components/Profile/Profile';



function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <HeroSection/>
        <Routes>
          <Route path="/shop" element={<ProductList />} />
          <Route path="/home"/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/cart'/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
