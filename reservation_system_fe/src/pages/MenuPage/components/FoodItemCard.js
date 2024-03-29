import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Paper } from "@mui/material";

import Tooltip from "@mui/material/Tooltip";
import { useShoppingCart } from "../../../components/ShoppingCartContext";

const FoodItemCard = ({ foodItem }) => {
  const hasAllergens = foodItem.allergens && foodItem.allergens.length > 0;
  const { addToCart } = useShoppingCart();

  const handleAddToCart = () => {
    addToCart({
      productName: foodItem.name,
      productId: foodItem.id,
      count: 1,
      price: foodItem.priceLevel.price,
    });
  };

  return (
    <Paper
      elevation={5}
      sx={{
        maxWidth: "100%",
        maxHeight: "100%",
        mb: 5,
        backgroundColor: "#f1efef",
        mx: { xs: 0.5, sm: 2 },
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
        },
        borderRadius: "16px", // Zaoblené rohy
      }}
    >
      <Card
        sx={{
          alignItems: "left",
          maxHeight: "600px",
          height: { xs: "550px", xl: "600px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%", // Zajistí, že obrázek se přizpůsobí šířce kontejneru
            height: 220,
            objectFit: "cover", // nebo contain?, Zajistí, že obrázek pokryje celou plochu bez zkreslení
          }}
          image={
            foodItem.imageId
              ? `https://localhost:7038/${foodItem.imageId}`
              : "https://via.placeholder.com/300"
          }
          alt={foodItem.name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            p: { xs: 1, sm: 2 },
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {foodItem.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {foodItem.description}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="fontWeightMedium"
              color="text.primary"
            >
              Cena: {foodItem.priceLevel.price} CZK
            </Typography>
            {hasAllergens && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Alergeny: {foodItem.allergens.map((al) => al.code).join(", ")}
                </Typography>
                <Tooltip
                  title={foodItem.allergens.map((al) => al.name).join(", ")}
                >
                  <InfoOutlinedIcon sx={{ ml: 0.5 }} />
                </Tooltip>
              </Box>
            )}
          </CardContent>
          <Box sx={{ p: 1 }}>
            <Button
              onClick={handleAddToCart}
              variant="contained"
              color="primary"
              fullWidth
            >
              Přidat do košíku
            </Button>
          </Box>
        </Box>
      </Card>
    </Paper>
  );
};

export default FoodItemCard;
