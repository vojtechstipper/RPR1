import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FoodItemCard from './FoodItemCard';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/product/list');
        setProducts(response.data);
        console.log("products")
        console.log(products);
      } catch (error) {
        console.error('Chyba při načítání produktů:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
    {products.map((product) => (
<FoodItemCard name={product.name} description={product.description} allergens={product.allergens}></FoodItemCard>))}
  

 </div>
  );
};

export default ProductList;
