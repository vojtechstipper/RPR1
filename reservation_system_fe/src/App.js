import React from 'react';
import './App.css';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.js"
import AboutPage from "./pages/AboutPage.js"
import MenuPage from "./pages/MenuPage.js"
import AllergensPage from "./pages/AllergensPage.js"


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="allergens" element={<AllergensPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
