"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = {
  id: string;

  name: string;

  price: number;

  image: string;

  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (
    item: CartItem
  ) => void;

  removeFromCart: (
    id: string
  ) => void;

  increaseQuantity: (
    id: string
  ) => void;

  decreaseQuantity: (
    id: string
  ) => void;

  clearCart: () => void;
};

const CartContext =
  createContext<
    CartContextType | undefined
  >(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] =
    useState<CartItem[]>([]);

  // Load localStorage
  useEffect(() => {

    const storedCart =
      localStorage.getItem(
        "cart"
      );

    if (storedCart) {

      setCart(
        JSON.parse(
          storedCart
        )
      );

    }

  }, []);

  // Save localStorage
  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  // Add To Cart
  const addToCart =
    (item: CartItem) => {

      setCart((prev) => {

        const existing =
          prev.find(
            (p) =>
              p.id === item.id &&
              p.name === item.name
          );

        // Increase quantity if same size already exists
        if (existing) {

          return prev.map(
            (p) =>

              p.id === item.id &&
              p.name === item.name

                ? {
                    ...p,
                    quantity:
                      p.quantity + 1,
                  }

                : p
          );

        }

        // Add new item
        return [
          ...prev,
          item,
        ];

      });

    };

  // Remove
  const removeFromCart =
    (id: string) => {

      setCart((prev) =>
        prev.filter(
          (item) =>
            item.id !== id
        )
      );

    };

  // Increase
  const increaseQuantity =
    (id: string) => {

      setCart((prev) =>
        prev.map((item) =>

          item.id === id

            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }

            : item
        )
      );

    };

  // Decrease
  const decreaseQuantity =
    (id: string) => {

      setCart((prev) =>

        prev
          .map((item) =>

            item.id === id

              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }

              : item

          )
          .filter(
            (item) =>
              item.quantity > 0
          )

      );

    };

  // Clear Cart
  const clearCart = () => {

    setCart([]);

  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {

  const context =
    useContext(
      CartContext
    );

  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );

  }

  return context;

}