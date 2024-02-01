import React, { createContext, useContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(() => {
    const localData = localStorage.getItem("cartData");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

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
