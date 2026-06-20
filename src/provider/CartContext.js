import React, { createContext, useState, useContext, useMemo } from 'react';

// Create the context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevCartItems => [...prevCartItems, item]);
  };

  const removeFromCart = async (itemId) => {
    // Simulate an async operation like an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setCartItems(prevCartItems => prevCartItems.filter(cartItem => cartItem.id !== itemId));
        resolve();
      }, 500);
    });
  };

  // Calculate cart item count dynamically
  const cartItemCount = useMemo(() => {
    return cartItems.length;
  }, [cartItems]);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};