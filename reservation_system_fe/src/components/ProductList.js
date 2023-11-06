import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Importujeme Link z react-router-dom
import api from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/product/list');
        setProducts(response.data);
      } catch (error) {
        console.error('Chyba při načítání produktů:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Seznam produktů</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}> {product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
