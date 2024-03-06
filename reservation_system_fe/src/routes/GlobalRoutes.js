import HomePage from "../pages/HomePage/HomePage.js";
import AboutPage from "../pages/AboutPage/AboutPage.js";
import MenuPage from "../pages/MenuPage/MenuPage.js";
import AllergensPage from "../pages/AllergensPage/AllergensPage.js";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage.js";
import GlobalLayout from "../components/layout/MainLayout/GlobalLayout.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.js";


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
        }        ,
        {
            path: 'shoppingCart',
            element: <ShoppingCartPage/>
        },
        {
            path: 'login',
            element: <LoginPage/>
        }
    ]
}

export default GlobalRoutes;