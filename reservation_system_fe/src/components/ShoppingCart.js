import React from "react";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useShoppingCart } from "./ShoppingCartContext";

const ShoppingCart = () => {
  const { cartData, addToCart } = useShoppingCart();

  const updateData = (newData) => {
    addToCart(newData);
  };

  const handleCountChange = (index, newCount) => {
    const newData = cartData.map((item, i) =>
      i === index ? { ...item, count: newCount } : item
    );
    updateData(newData);
  };
  
  const handleDeleteItem = (index) => {
    const newData = cartData.filter((_, i) => i !== index);
    updateData(newData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TableContainer component={Paper}>
          <h3 style={{ padding: "10px" }}>Košík</h3>
          <Table>
            <TableBody>
              {cartData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleCountChange(index, item.count - 1)}>-</Button>
                    {item.count}
                    <Button onClick={() => handleCountChange(index, item.count + 1)}>+</Button>
                  </TableCell>
                  <TableCell>{item.price} CZK</TableCell>
                  <TableCell>
                    <Button  onClick={() => handleDeleteItem(index)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ShoppingCart;
