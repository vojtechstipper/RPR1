import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/MainLayout/Navbar";
import Footer from "../../components/layout/MainLayout/Footer";
import ShoppingCart from "./components/ShoppingCart";
import Box from "@mui/material/Box";
import ShoppingNote from "./components/ShoppingNote";
import OrderButton from "../../components/global/OrderButton";
import { useShoppingCart } from "../../components/ShoppingCartContext";

function ShoppingCartPage() {
    const {cartData} = useShoppingCart();
    const [orderTime, setOrderTime] = useState("");
    const [orderNote, setOrderNote] = useState("");
  
    useEffect(() => {
    }, [cartData]);
  
    const updateOrderTime = (time) => {     
      setOrderTime(time);
    };
    const updateOrderNote = (note) => {
      setOrderNote(note);
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
        <ShoppingCart />
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
        <ShoppingNote
          onTimeChange={updateOrderTime}
          onNoteChange={updateOrderNote}
        />
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          marginTop: "60px",
          marginBottom: "100px",
        }}
      >
        <OrderButton orderTime={orderTime} orderNote={orderNote} />
      </Box>

      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
