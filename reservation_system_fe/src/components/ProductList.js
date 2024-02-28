import React, { useEffect, useState } from "react";
import { getProductsGroupped } from "../services/apiService";
import FoodItemCard from "./FoodItemCard";
import MenuWrapper from "./MenuWrapper";
import Grid from "@mui/material/Grid";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function ProductList() {
  const [productTypesWithProducts, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    console.log(term);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProductsGroupped();
        setProducts(response);
      } catch (error) {
        console.error("Chyba při načítání produktů:", error);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = productTypesWithProducts.map((product) => {
    const filteredProducts = product.products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productType.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      ...product,
      products: filteredProducts,
      showProductType:
        filteredProducts.length > 0 ||
        product.productType.name.toLowerCase().includes(searchTerm.toLowerCase()),
    };
  });

  const getGridSize = () => {
    if (isLargeScreen) return 4; // 3 kartičky vedle sebe na velkých obrazovkách
    if (isMediumScreen) return 6; // 2 kartičky vedle sebe na středních obrazovkách
    return 12; // 1 kartička na malých obrazovkách
  };

  return (
    <MenuWrapper handleSearchTermChange={handleSearchTermChange}>
      {filteredProducts.map((productType) => (
        <div key={productType.productType.name}>
          {productType.showProductType && <h1>{productType.productType.name}</h1>}
          <Grid container spacing={2}>
            {productType.products.map((item) => (
              <Grid item xs={12} sm={6} md={getGridSize()} key={item.id}>
                <FoodItemCard foodItem={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </MenuWrapper>
  );
}

export default ProductList;
