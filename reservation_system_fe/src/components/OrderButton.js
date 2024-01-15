import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";

const OrderButton = ({ onDataUpdate, onPlaceOrder }) => {
  const [orderData, setOrderData] = useState({
    items: [],
    orderTime: new Date().toISOString(),
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (Array.isArray(onDataUpdate) && onDataUpdate.length > 0) {
      const newTotalPrice = onDataUpdate.reduce((acc, item) => {
        return acc + item.count * item.price;
      }, 0);
      setTotalPrice(newTotalPrice);

      setOrderData({
        items: onDataUpdate.map((item) => ({
          count: item.count || 0,
          productId: item.productName || "",
        })),
        orderTime: new Date().toISOString(),
      });
    } else {
      setTotalPrice(0);
      setOrderData({
        items: [],
        orderTime: new Date().toISOString(),
      });
    }
  }, [onDataUpdate]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7038/order",
        orderData
      );

      onPlaceOrder();
      onDataUpdate([]);

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
