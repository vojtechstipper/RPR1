import HomePage from "../pages/HomePage/HomePage.js";
import AboutPage from "../pages/AboutPage/AboutPage.js";
import MenuPage from "../pages/MenuPage/MenuPage.js";
import AllergensPage from "../pages/AllergensPage/AllergensPage.js";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage.js";
import GlobalLayout from "../components/layout/MainLayout/GlobalLayout.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.js";
import RegisterPage from "../pages/RegisterPage/RegisterPage.js";
import UserInfoPage from "../pages/UserInfoPage/UserInfoPage.js";
import ThanksForOrderPage from "../pages/ThanksForOrderPage/ThanksForOrderPage.js";
import PasswordResetPage from "../pages/PasswordResetPage/PasswordResetPage.js";


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
        },
        {
            path: 'register',
            element: <RegisterPage/>
        },
        {
            path: 'userinfo',
            element: <UserInfoPage/>
        },
        {
            path: '/thanksfororder',
            element: <ThanksForOrderPage/>
        }
        ,
        {
            path: '/forgottenpassword',
            element: <PasswordResetPage/>
        }
    ]
}

export default GlobalRoutes;