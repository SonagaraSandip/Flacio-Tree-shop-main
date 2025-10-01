import React, { createContext, useState, useContext, useEffect } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compare, setCompare] = useState(() => {
    const savedCompare = localStorage.getItem("compare");
    return savedCompare ? JSON.parse(savedCompare) : [];
  });

  // save compare data in local storage whenever its change
  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compare));
  }, [compare]);

  const addToCompare = ({ product, selectedVariant }) => {
    // Add a check to ensure product is defined
    if (!product) {
      console.error("Cannot add to compare: product is undefined");
      return; // Exit the function if product is not defined
    }
    const item = {
      id: `${product.id}`,
      product,
      variant: selectedVariant || null,
    };

    setCompare((prev) => {
      // check if item is already in compare
      const exists = prev.find((i) => i.id === item.id);
      if (exists)
        return prev.map((item) =>
          item.id === item.id
            ? { ...item, variant: selectedVariant || null }
            : item
        );
      return [...prev, item];
    });
  };

  // remove from compare
  const removeFromCompare = (itemId) => {
    setCompare((prev) => prev.filter((item) => item.id !== itemId));
  };

  const isInCompare = (product) => {
    const itemId = `${product.id}`;
    return compare.some((item) => item.id === itemId);
  };

  const value = {
    compare,
    addToCompare,
    removeFromCompare,
    isInCompare,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCompare = () => useContext(CompareContext);
