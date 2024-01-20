import React, { useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ShoppingCart = ({ onDataUpdate }) => {
  const [data, setData] = useState([
    {
      productId:"32237550caa742b180f143b47bcf576f",
      productName: "Párek v rohlíku",
      note: "Poznámka",
      count: 0,
      price: 45,
    },
    {
      productId:"276fb3324e3e4b34ac98e6070bdce4f7",
      productName: "Kafe",
      note: "Poznámka",
      count: 0,
      price: 100,
    },
    // Další položky podle potřeby
  ]);

  const updateData = (newData) => {
    setData(newData);
    onDataUpdate(newData);
  };

  const handleCountChange = (index, newCount) => {
    const newData = [...data];
    newData[index].count = newCount;
    updateData(newData);
  };

  const handleDeleteItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TableContainer component={Paper}>
          <h3 style={{ padding: "10px" }}>Košík</h3>
          <Table>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleCountChange(index, item.count - 1)}
                    >
                      -
                    </Button>
                    {item.count}
                    <Button
                      onClick={() => handleCountChange(index, item.count + 1)}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell>{item.price} CZK</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteItem(index)}>
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
