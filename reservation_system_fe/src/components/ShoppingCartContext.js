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
    console.log(item);
    setCartData((prevData) => {
      const existingItemIndex = prevData.findIndex(
        (i) => i.productId === item.productId
      );
      if (existingItemIndex > -1) {
        // Produkt již existuje, aktualizujeme jeho množství
        const newCartData = [...prevData];
        newCartData[existingItemIndex] = {
          ...newCartData[existingItemIndex],
          count: newCartData[existingItemIndex].count + 1,
        };
        return newCartData;
      } else {
        // Produkt neexistuje, přidáme ho jako novou položku
        return [...prevData, { ...item, count: 1 }];
      }
    });
  };

  const changeCart = (newCartItems) => {
    setCartData([...newCartItems]);
  };

  const clearCart = () => {
    setCartData([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartData, addToCart, changeCart, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
