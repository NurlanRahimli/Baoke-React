import React, { createContext, useState, useContext, useEffect } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  // Add product to basket or increment its quantity
  const addToBasket = (product) => {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find((item) => item.id === product.id);
      if (existingProduct) {
        // Increment quantity if product exists
        return prevBasket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new product with quantity 1
      return [...prevBasket, { ...product, quantity: 1 }];
    });
  };

  // Decrement product quantity or remove if quantity is 1
  const decrementFromBasket = (productId) => {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find((item) => item.id === productId);
      if (existingProduct && existingProduct.quantity === 1) {
        // Remove product if quantity is 1
        return prevBasket.filter((item) => item.id !== productId);
      }
      // Decrement quantity
      return prevBasket.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const removeFromBasket = (productId) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.id !== productId)
    );
  };

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem("basket");
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        decrementFromBasket,
        removeFromBasket,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};
