import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShoppingCart from "../components/ShoppingCart";
import Box from "@mui/material/Box";
import ShoppingNote from "../components/ShoppingNote";
import OrderButton from "../components/OrderButton";

function ShoppingCartPage() {
    const [cartData, setCartData] = useState([]);
    const [orderTime, setOrderTime] = useState("");
  
    const updateCartData = (newData) => {
      setCartData(newData);
    };
  
    const updateOrderTime = (time) => {
      setOrderTime(time);
    };
  
    const placeOrder = () => {
      console.log("Objednávka byla odeslána s daty:", cartData);
      console.log("Čas objednávky:", orderTime);
    };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#d3d3d3",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "2000px",
          margin: "auto",
          width: "75%",
          borderRadius: "12px",
        }}
      >
        <ShoppingCart onDataUpdate={updateCartData} />
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          marginTop: "80px",
        }}
      ></Box>

      <Box
        sx={{
          marginTop: "50px",
          backgroundColor: "#d3d3d3",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "2000px",
          margin: "auto",
          width: "75%",
          borderRadius: "12px",
        }}
      >
        <ShoppingNote onTimeChange={updateOrderTime} />
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          marginTop: "60px",
          marginBottom: "100px",
        }}
      >
        <OrderButton onDataUpdate={updateCartData} onPlaceOrder={placeOrder} />
      </Box>

      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
