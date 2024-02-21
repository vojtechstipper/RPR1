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
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import PasswordResetPage from "./pages/PasswordResetPage.js";
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import UserContainer from "./containers/UserContainer.jsx";
import AdminContainer from "./containers/AdminContainer.jsx";
import GlobalContainer from "./containers/GlobalContainer.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Provider>
  );
}

export default App;
