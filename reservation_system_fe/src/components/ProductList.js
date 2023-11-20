import React, { useEffect, useState } from 'react';
import { getProductsGroupped } from '../services/apiService';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';

import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search'; // Import ikony lupy

function ProductList() {
  const [productTypesWithProducts, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProductsGroupped();
        setProducts(response.result);
      } catch (error) {
        console.error('Chyba při načítání produktů:', error);
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
      // Pokud je výsledek filtru prázdný a název typu produktu také nesouhlasí s hledaným výrazem, nezobrazujte název typu produktu.
      showProductType: filteredProducts.length > 0 || product.productType.name.toLowerCase().includes(searchTerm.toLowerCase()),
    };
  });

  return (
    <div>
      <FormControl variant="standard">
        <Input
          id="input-with-icon-adornment"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Vyhledat podle názvu nebo typu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>

      {filteredProducts.map((product) => (
        <div key={product.productType.name}>
          {product.showProductType && <h1>{product.productType.name}</h1>}
          <Grid container>
            {product.products.map((item) => (
              <ProductCard
                key={item.name}
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
}

export default ProductList;
