"use client";

import Link from "next/link";

import {
  ShoppingBag,
} from "lucide-react";

import {
  useCart,
} from "@/context/CartContext";

export default function FloatingCart() {

  const { cart } =
    useCart();

  // Total Quantity
  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (

    <Link
      href="/cart"
      className="
        absolute
        top-8
        right-8
        z-[99999]
        group
      "
    >

      {/* Button */}
      <div
        className="
          relative
          flex items-center
          justify-center
          w-20 h-20
          rounded-full
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          shadow-[0_10px_40px_rgba(0,0,0,0.45)]
          transition duration-300
          group-hover:scale-110
        "
      >

        {/* Icon */}
        <ShoppingBag
          className="
            w-8 h-8
          "
        />

        {/* Counter */}
        {totalItems > 0 && (

          <div
            className="
              absolute
              -top-1
              -right-1
              min-w-[30px]
              h-[30px]
              px-2
              rounded-full
              bg-white
              text-black
              text-sm
              font-bold
              flex items-center
              justify-center
              shadow-lg
            "
          >
            {totalItems}
          </div>

        )}

      </div>

    </Link>

  );
}