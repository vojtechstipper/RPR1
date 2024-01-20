import React, { createContext, useContext, useState } from 'react';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  const addToCart = (item) => {
    setCartData((prevData) => [...prevData, item]);
  };

  return (
    <ShoppingCartContext.Provider value={{ cartData, addToCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
