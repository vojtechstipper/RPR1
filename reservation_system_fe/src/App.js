import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from './routes';
import OrderBanner from "./components/layout/MainLayout/OrderBanner";


function App() {
  return (
    <BrowserRouter>
    <OrderBanner/>
      <Routes />
      
    </BrowserRouter>
  );
}

export default App;
