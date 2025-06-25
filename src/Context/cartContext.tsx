import React, { Children, createContext, useContext, useState } from "react";
import type { Books, CartContextType } from "../Types/Types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Books[]>([]);

  const addToCart = (item: Books) => {
    setCart((prev: Books[]) => {
      const existing = prev.find((book: Books) => book.bookId === item.bookId);
      if (existing) {
        return prev.map((existingItem) =>
          existingItem.bookId === item.bookId
            ? {
                ...existingItem,
                quantity: existingItem.quantity + 1,
                totalPrice:
                  existingItem.price_usd * (existingItem.quantity + 1),
              }
            : { ...existingItem, totalPrice: existingItem.price_usd }
        );
      }
      return [...prev, { ...item, quantity: 1, totalPrice: item.price_usd }];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((prev: Books[]) => prev.filter((item) => item.bookId !== bookId));
  };

  const increment = (bookId: number) => {
    setCart((prev: Books[]) =>
      prev.map((item) =>
        item.bookId === bookId
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.price_usd * (item.quantity + 1),
            }
          : item
      )
    );
  };

  const decrement = (bookId: number) => {
    setCart((prev: Books[]) =>
      prev
        .map((item) =>
          item.bookId === bookId && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.price_usd * (item.quantity - 1),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
