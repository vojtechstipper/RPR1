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
        console.log(response.data)
      } catch (error) {
        console.error('Chyba při načítání produktů:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Název</th>
          <th>Typ</th>
          <th>Alergeny</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.productType.name}</td>
            <td>{item.allergens.join(', ')}</td>
            <td>
              <ul>
                {item.priceLevels.map((priceLevel, idx) => (
                  <li key={idx}>
                    {priceLevel.name}: {priceLevel.price.toFixed(2)} ,-
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
