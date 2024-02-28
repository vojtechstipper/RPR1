import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Paper, Tooltip } from "@mui/material";
import { useShoppingCart } from "./ShoppingCartContext";

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
    <Paper elevation={5} sx={{ maxWidth: '100%', mb: 2, backgroundColor: "#f1efef", mx: { xs: 0.5, sm: 2 } }}>
      <Card sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        minHeight: { xs: 360, sm: 280, md: 320 },
        minWidth: { xs: 280, sm: 280, md: 300 },
      }}>
        <CardMedia
          component="img"
          sx={{
            width: '100%', // Zajistí, že obrázek se přizpůsobí šířce kontejneru
            maxHeight: { xs: 150, sm: 220, md: 220 }, // Maximální výška obrázku
            objectFit: 'cover', // Zajistí, že obrázek pokryje celou plochu bez zkreslení
          }}
          image={foodItem.imageId ? `https://localhost:7038/${foodItem.imageId}` : "https://via.placeholder.com/220"}
          alt={foodItem.name}
        />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          p: { xs: 1, sm: 2 },
        }}>
          <CardContent sx={{ flex: '1 0 auto', overflow: 'auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              {foodItem.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {foodItem.description}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Cena: CZK {foodItem.priceLevel.price}
            </Typography>
            {hasAllergens && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Alergeny: {foodItem.allergens.map((al) => al.code).join(", ")}
                </Typography>
                <Tooltip title={foodItem.allergens.map((al) => al.name).join(", ")}>
                  <InfoOutlinedIcon sx={{ ml: 0.5 }} />
                </Tooltip>
              </Box>
            )}
          </CardContent>
          <Box sx={{ p: 1 }}>
            <Button onClick={handleAddToCart} variant="contained" color="primary" fullWidth>
              Přidat do košíku
            </Button>
          </Box>
        </Box>
      </Card>
    </Paper>
  );
};

export default FoodItemCard;
