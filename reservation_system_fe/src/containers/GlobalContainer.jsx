import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.js";
import AboutPage from "../pages/AboutPage.js";
import MenuPage from "../pages/MenuPage.js";
import AllergensPage from "../pages/AllergensPage.js";
import ShoppingCartPage from "../pages/ShoppingCartPage.js";


const GlobalContainer = () => {
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="allergens" element={<AllergensPage />} />
    </Routes>
}

export default GlobalContainer;