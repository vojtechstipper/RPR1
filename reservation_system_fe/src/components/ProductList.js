import React, { useEffect, useState } from 'react';
import {getProductsGroupped} from '../services/apiService';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';

function ProductList() {
  const [productTypesWithProducts, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProductsGroupped();
        setProducts(response.result);
        console.log("products")
        console.log(response.result);
      } catch (error) {
        console.error('Chyba při načítání produktů:', error);
      }
    }

    fetchProducts();
  }, []);

  
  return (
    <div>
      {productTypesWithProducts.map((product) => (
        <div>
          <h1>{product.productType.name}</h1>
          <Grid container >
          {product.products.map((item) => (
            <ProductCard 
              name={item.name}
              description={item.description}
              allergens={item.allergens}
            ></ProductCard>
          ))}

          </Grid>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
