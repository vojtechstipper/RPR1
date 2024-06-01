import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../ShoppingCartContext";
import { sendOrder } from "../../services/apiService";

const OrderButton = ({ order, orderTime, orderNote }) => {
  const navigate = useNavigate();
  const { cartData } = useShoppingCart();
  const [orderData, setOrderData] = useState({
    items: cartData,
    orderTime: orderTime,
    note: "",
  });
  const { clearCart } = useShoppingCart();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
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
        note: orderNote,
        orderTime: orderTime,
      });
    } else {
      setTotalPrice(0);
      setOrderData({
        items: [],
        orderTime: orderTime,
        note: orderNote,
      });
    }
  }, [cartData, orderTime, orderNote]);

  const placeOrder = async () => {
    try {
      const response = await sendOrder(orderData);
      console.log("Objednávka byla úspěšně odeslána", response.data);
      navigate("/thanksfororder");
      clearCart();
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
            backgroundColor: "#f1efef",
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
