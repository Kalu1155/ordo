import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

 // ✅ Add to cart with quantity support
const addToCart = (dish, quantity = 1) => {
  setCart((prev) => {
    const existingItem = prev.find((item) => item.id === dish.id);

    if (existingItem) {
      // If dish already in cart, update quantity
      return prev.map((item) =>
        item.id === dish.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // ✅ Ensure price is stored as a number
      return [
        ...prev,
        { 
          ...dish, 
          price: Number(dish.price) || 0,  // force numeric
          quantity 
        }
      ];
    }
  });
};


  // ✅ Remove item completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Update quantity directly
  const updateQuantity = (id, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => setCart([]);

  // ✅ Get total price
  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
