import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from './routes'
import GlobalContainer from "./routes/GlobalRoutes";
import AdminContainer from "./routes/AdminContainer";
import UserContainer from "./routes/UserContainer";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
// require('dotenv').config()


function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

// <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/forgotPassword" element={<P />} />

export default App;
