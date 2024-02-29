import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Paper } from "@mui/material";

import Tooltip from "@mui/material/Tooltip";
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
    <Paper
      elevation={5}
      sx={{
        width: "auto",
        marginTop: "30px",
        marginRight: "5em",
        marginBottom: "30px",
      }}
    >
      <Card
        sx={{
          display: "flex",
          boxShadow: 14,
          width: 500,
          backgroundColor: "#f1efef",
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Grid container>
              <Grid item xs={8} width={300}>
                <Typography
                  style={{ fontWeight: "bold" }}
                  fontSize={20}
                  variant="h4"
                >
                  {foodItem.name}
                </Typography>
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="h6.heading"
                  color="red"
                >
                  CZK {foodItem.priceLevel.price}
                </Typography>
                <Typography variant="subtitle1">
                  {foodItem.description}
                </Typography>
                {hasAllergens && (
                  <Typography
                    style={{ fontWeight: "bold", display: "flex" }}
                    variant="subtitle2"
                  >
                    Alergeny:{" "}
                    {foodItem.allergens.map((al) => al.code).join(", ")}
                    <Tooltip
                      style={{ marginLeft: 5 }}
                      title={foodItem.allergens.map((al) => al.name).join(", ")}
                    >
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </Typography>
                )}
              </Grid>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  sx={{ width: 160, height: 100, borderRadius: 1 }}
                  image={`https://localhost:7038/${foodItem.imageId}`} //uložit do configu jako baseUrl
                  alt="Coffee"
                />
                <Box
                  sx={{
                    width: 160,
                    height: 30,
                    marginTop: 1,
                    textAlign: "center",
                  }}
                >
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    color="success"
                  >
                    Přidat do košíku
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
    </Paper>
  );
};

export default FoodItemCard;
