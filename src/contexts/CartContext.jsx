import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //saved cart data i local storage when ever its change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = ({ product, selectedVariant, quantity }) => {
    if (!product) {
      console.error("Cannot add to cart: product is undefined");
      return;
    }

    const variantIdentifier =
      selectedVariant?.color || selectedVariant?.type || "default";
    const itemId = `${product.id}-${variantIdentifier}`;

    

    setCart((prev) => {
      const found = prev.find((i) => i.id === itemId);
      if (found) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        { id: itemId, product, variant: selectedVariant, quantity },
      ];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const isInCart = (product, selectedVariant) => {
    const itemId = `${product.id}-${selectedVariant?.color || "default"}`;
    return cart.some((item) => item.id === itemId);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
