import React, { useState, useContext } from "react";

const CartContext = React.createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addProduct = (item) => {
    const existing = cartItems.find((f) => f.product.id === item.product.id);
    if (existing) {
      existing.quantity += item.quantity;
      const newList = [
        ...cartItems.filter((f) => f.product.id !== item.product.id),
        existing,
      ];
      setCartItems(newList);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const updateProduct = (quantity, id) => {
    const existing = cartItems.find(({ product }) => product.id === id);
    if (quantity === '' || (quantity > 0  && existing.product.data.stock >= quantity)) {
      existing.quantity = quantity;
      const newList = [
        ...cartItems.filter(({ product }) => product.id !== id),
        existing,
      ];
      setCartItems(newList);
    }
  };

  const removeProduct = (id) => {
    setCartItems([...cartItems.filter(({ product }) => product.id !== id)]);
  };

  const value = { cartItems, addProduct, updateProduct, removeProduct };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within CartContextProvider");
  }
  return context;
};

export { CartContextProvider, useCartContext };
