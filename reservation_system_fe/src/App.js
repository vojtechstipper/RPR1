import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage.js";
import MenuPage from "./pages/MenuPage.js";
import AllergensPage from "./pages/AllergensPage.js";
import AdminHomePage from "./pages/AdminHomePage";
import AdminStatsPage from "./pages/AdminStatsPage";
import AdminEditProductPage from "./pages/AdminEditProductPage";
import AdminEditUserPage from "./pages/AdminEditUserPage";
import ShoppingCartPage from "./pages/ShoppingCartPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="allergens" element={<AllergensPage />} />
        <Route path="admin/home" element={<AdminHomePage />} />
        <Route path="admin/stats" element={<AdminStatsPage />} />
        <Route path="admin/edit/products" element={<AdminEditProductPage />} />
        <Route path="admin/edit/users" element={<AdminEditUserPage />} />
        <Route path="shoppingcart" element={<ShoppingCartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
