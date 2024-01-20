import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";

const OrderButton = ({ onDataUpdate, onPlaceOrder, orderItems, order }) => {
  const [orderData, setOrderData] = useState({
    items: orderItems,
    orderTime: new Date().toISOString(),
    note: order.note,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("UseEffect v buttonu - " + orderItems);
    console.log(order);
    if (Array.isArray(orderItems) && orderItems.length > 0) {
      const newTotalPrice = orderItems.reduce((acc, item) => {
        return acc + item.count * item.price;
      }, 0);
      setTotalPrice(newTotalPrice);

      setOrderData({
        items: orderItems.map((item) => ({
          count: item.count || 0,
          productId: item.productId || "",
        })),
        orderTime: convertTimeStringToISOFormat(order.orderTime),
        orderNote: order.note || "nic",
      });
    } else {
      setTotalPrice(0);
      setOrderData({
        items: [],
        orderTime: new Date().toISOString(),
      });
    }
  }, [orderItems]);

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
