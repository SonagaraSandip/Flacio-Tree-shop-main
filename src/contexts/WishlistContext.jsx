import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  //save wishlist data in local storage whenever its change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = ({ product, selectedVariant }) => {
    // Add a check to ensure product is defined
    if (!product) {
      console.error("Cannot add to wishlist: product is undefined");
      return; // Exit the function if product is not defined
    }
    const item = {
      id: `${product.id}`,
      product,
      variant: selectedVariant || null,
    };

    setWishlist((Prev) => {
      // check if item already exists in wishlist
      const exists = Prev.find((i) => i.id === item.id);
      if (exists)
        return Prev.map((item) =>
          item.id === item.id
            ? { ...item, variant: selectedVariant || null }
            : item
        );
      return [...Prev, item];
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((Prev) => Prev.filter((item) => item.id !== itemId));
  };

  const isInWishlist = (product) => {
    const itemId = `${product.id}`;
    return wishlist.some((item) => item.id === itemId);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
