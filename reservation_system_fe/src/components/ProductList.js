import React, {useEffect, useState} from 'react';
import {getProductsGroupped} from '../services/apiService';
import FoodItemCard from './FoodItemCard';
import MenuWrapper from './MenuWrapper';
import Grid from "@mui/material/Grid";

function ProductList() {
    const [productTypesWithProducts, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
      <MenuWrapper handleSearchTermChange={handleSearchTermChange}>
        {filteredProducts.map((product) => (
          <div key={product.productType.name}>
            {product.showProductType && <h1>{product.productType.name}</h1>}
            <Grid container>
              {product.products.map((item) => (
                <FoodItemCard
                  description={item.description}
                  allergens={item.allergens}
                  foodItem={item}
                />
              ))}
            </Grid>
          </div>
        ))}
      </MenuWrapper>
    );
}

export default ProductList;
