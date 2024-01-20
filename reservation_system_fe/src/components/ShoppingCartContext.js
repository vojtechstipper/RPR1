import React, { createContext, useContext, useState } from "react";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [cartOtherData, setCartOtherData] = useState();

  const addToCart = (item) => {
    setCartData((prevData) => [...prevData, item]);
  };

  const changeCart = (newCartItems) => {
    setCartData([...newCartItems]);
  };

  return (
    <ShoppingCartContext.Provider value={{ cartData, addToCart, changeCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
