import React, { useEffect, useState } from "react";
import { getProductsGroupped } from "../../../services/apiService";
import FoodItemCard from "./FoodItemCard";
import MenuWrapper from "./MenuWrapper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

function ProductList() {
  const [productTypesWithProducts, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]); // Pro uložení všech kategorií
  const navigate = useNavigate();

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    console.log(term);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProductsGroupped(navigate);
        setProducts(response);
        setCategories(response);
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
        product.productType.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    };
  });

  return (
    <MenuWrapper
      categories={categories}
      handleSearchTermChange={handleSearchTermChange}
    >
      {filteredProducts.map(
        (productType) =>
          productType.showProductType && (
            <div key={productType.productType.name}>
              {productType.showProductType && (
                <Typography variant="h4" mb={8}>
                  {productType.productType.name}
                </Typography>
              )}

              <Grid container spacing={1}>
                {productType.products.map((item) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={item.id}>
                    <FoodItemCard foodItem={item} />
                  </Grid>
                ))}
              </Grid>
            </div>
          )
      )}
    </MenuWrapper>
  );
}

export default ProductList;
