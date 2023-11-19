import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FoodItemCard from './FoodItemCard';
import BeverageItemCard from './BeverageItemCard';

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
<BeverageItemCard name={product.name} description={product.description} ></BeverageItemCard>))}
  

 </div>
  );
}

export default ProductList;
