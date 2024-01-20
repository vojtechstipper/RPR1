import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useShoppingCart } from "./ShoppingCartContext";

const OrderButton = ({  onPlaceOrder, order }) => {
  const { cartData} = useShoppingCart();
  const [orderData, setOrderData] = useState({
    items: cartData,
    orderTime: new Date().toISOString(),
    note:"",
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("cartData changed button:", cartData); 
    console.log(order);
    if (Array.isArray(cartData) && cartData.length > 0) {
      const newTotalPrice = cartData.reduce((acc, item) => {
        return acc + item.count * item.price;
      }, 0);
      setTotalPrice(newTotalPrice);

      setOrderData({
        items: cartData.map((item) => ({
          count: item.count || 0,
          productId: item.productId || "",
        })),
       // orderTime: convertTimeStringToISOFormat(order.orderTime),
        orderNote:  "nic",
      });
    } else {
      setTotalPrice(0);
      setOrderData({
        items: [],
        orderTime: new Date().toISOString(),
      });
    }
  }, [cartData]);

  function convertTimeStringToISOFormat(timeString) {
    // Get today's date
    const today = new Date();

    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);

    // Set the hours and minutes to today's date
    today.setHours(hours + 1, minutes, 0, 0);

    // Convert the date to ISO format
    const isoFormat = today.toISOString();

    return isoFormat;
  }
  const placeOrder = async () => {
    try {
      console.log("Order: ");
      console.log(order);

      const response = await axios.post(
        "https://localhost:7038/order",
        orderData
      );

      onPlaceOrder();

      console.log("Objednávka byla úspěšně odeslána", response.data);
    } catch (error) {
      console.error("Chyba při odesílání objednávky na API", error);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-end"
      sx={{
        maxWidth: "1500px",
        padding: "0 20px",
      }}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          Celkem {totalPrice} Kč
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#d3d3d3",
            width: "200px",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={placeOrder}
        >
          Objednat
        </Button>
      </Grid>
    </Grid>
  );
};

export default OrderButton;
