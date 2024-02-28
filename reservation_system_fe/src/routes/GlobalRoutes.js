import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.js";
import AboutPage from "../pages/AboutPage/AboutPage.js";
import MenuPage from "../pages/MenuPage/MenuPage.js";
import AllergensPage from "../pages/AllergensPage/AllergensPage.js";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage.js";
import GlobalLayout from "../components/layout/MainLayout/GlobalLayout.jsx";


const GlobalRoutes = {
    path: '/',
    element: <GlobalLayout/>,
    children: [
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: 'menu',
            element: <MenuPage/>
        },
        {
            path: 'about',
            element: <AboutPage/>
        },
        {
            path: 'allergens',
            element: <AllergensPage/>
        }
    ]
}

export default GlobalRoutes;