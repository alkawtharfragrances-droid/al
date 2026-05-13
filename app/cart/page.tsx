"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

import {
  useCart,
} from "@/context/CartContext";

export default function CartPage() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  // Total Items
  const itemCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  // Subtotal
  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          item.quantity,
      0
    );

  // WhatsApp Message
  const whatsappMessage =
    encodeURIComponent(
      cart
        .map(
          (item) =>
            `${item.name}
Qty: ${item.quantity}
Price: ₹${item.price}`
        )
        .join("\n\n") +
        `\n\nSubtotal: ₹${subtotal}`
    );

  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        px-4 md:px-6
        py-28 md:py-40
        overflow-x-hidden
      "
    >

      {/* Floating Cart */}
      <Link
        href="/cart"
        className="
          fixed
          bottom-5 right-5
          md:top-8 md:right-8
          md:bottom-auto
          z-[9999]
        "
      >
        <button
          className="
            relative
            flex
            items-center
            justify-center
            w-14 h-14
            rounded-full
            bg-yellow-500
            text-black
            shadow-[0_0_30px_rgba(234,179,8,0.35)]
            hover:scale-105
            transition-all
            duration-300
          "
        >

          <ShoppingBag size={22} />

          {itemCount > 0 && (
            <span
              className="
                absolute
                -top-1 -right-1
                min-w-[22px]
                h-[22px]
                px-1
                rounded-full
                bg-white
                text-black
                text-[11px]
                font-bold
                flex
                items-center
                justify-center
              "
            >
              {itemCount}
            </span>
          )}

        </button>
      </Link>

      <div className="max-w-7xl mx-auto">

        {/* Back */}
        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
            text-zinc-400
            hover:text-white
            transition
            mb-10
          "
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16 md:mb-20">

          <p
            className="
              uppercase
              tracking-[8px]
              text-yellow-500
              mb-6
              text-sm
            "
          >
            Luxury Checkout
          </p>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              mb-8
              leading-none
            "
          >
            Your Cart
          </h1>

          <p
            className="
              text-zinc-400
              max-w-2xl
              text-base md:text-lg
            "
          >
            Review your fragrance
            selections before
            completing your order.
          </p>

        </div>

        {/* Empty */}
        {cart.length === 0 && (

          <div
            className="
              border border-white/10
              bg-white/5
              backdrop-blur-sm
              rounded-[32px]
              md:rounded-[40px]
              p-8 md:p-16
              text-center
            "
          >

            <h2
              className="
                text-3xl md:text-4xl
                font-bold
                mb-6
              "
            >
              Your cart is empty
            </h2>

            <p
              className="
                text-zinc-400
                mb-10
                max-w-xl
                mx-auto
              "
            >
              Explore luxury
              fragrances and add
              them to your cart.
            </p>

            <Link
              href="/products"
              className="
                inline-flex
                px-8 py-4
                rounded-full
                bg-yellow-500
                hover:bg-yellow-400
                text-black
                font-semibold
                transition
                shadow-[0_0_25px_rgba(234,179,8,0.25)]
              "
            >
              Browse Fragrances
            </Link>

          </div>

        )}

        {/* Cart */}
        {cart.length > 0 && (

          <div
            className="
              grid
              lg:grid-cols-[1fr_420px]
              gap-8 md:gap-10
            "
          >

            {/* Items */}
            <div className="space-y-6">

              {cart.map(
                (item) => (

                  <div
                    key={item.id}
                    className="
                      flex flex-col
                      md:flex-row
                      gap-6
                      rounded-[30px]
                      md:rounded-[36px]
                      border border-white/10
                      bg-white/5
                      backdrop-blur-sm
                      p-5 md:p-6
                    "
                  >

                    {/* Image */}
                    <div
                      className="
                        relative
                        w-full
                        md:w-[220px]
                        h-[260px]
                        overflow-hidden
                        rounded-[24px]
                    "
                    >

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="
                          object-cover
                        "
                      />

                    </div>

                    {/* Content */}
                    <div
                      className="
                        flex-1
                        flex flex-col
                        justify-between
                      "
                    >

                      <div>

                        <h2
                          className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            mb-4
                          "
                        >
                          {item.name}
                        </h2>

                        <p
                          className="
                            text-zinc-400
                            text-lg
                          "
                        >
                          ₹{item.price}
                        </p>

                      </div>

                      {/* Controls */}
                      <div
                        className="
                          flex flex-wrap
                          gap-4
                          items-center
                          mt-8
                        "
                      >

                        {/* Quantity */}
                        <div
                          className="
                            flex
                            items-center
                            gap-5
                            border border-white/10
                            rounded-full
                            px-5 py-3
                            bg-black/20
                          "
                        >

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            className="
                              text-xl
                              hover:text-yellow-400
                              transition
                            "
                          >
                            −
                          </button>

                          <span
                            className="
                              text-lg
                            "
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            className="
                              text-xl
                              hover:text-yellow-400
                              transition
                            "
                          >
                            +
                          </button>

                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                          className="
                            px-5 py-3
                            rounded-full
                            bg-red-500/20
                            border border-red-500/30
                            text-red-400
                            hover:bg-red-500
                            hover:text-white
                            transition
                          "
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

            {/* Summary */}
            <div
              className="
                h-fit
                lg:sticky
                lg:top-32
                rounded-[32px]
                md:rounded-[40px]
                border border-white/10
                bg-white/5
                backdrop-blur-sm
                p-6 md:p-8
              "
            >

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  mb-10
                "
              >
                Order Summary
              </h2>

              {/* Items Count */}
              <div
                className="
                  flex
                  justify-between
                  mb-6
                  text-zinc-400
                "
              >

                <span>Items</span>

                <span>
                  {itemCount}
                </span>

              </div>

              {/* Subtotal */}
              <div
                className="
                  flex
                  justify-between
                  mb-10
                  text-2xl
                  font-bold
                "
              >

                <span>Subtotal</span>

                <span>
                  ₹{subtotal}
                </span>

              </div>

              {/* Checkout */}
              <Link
                href={`https://wa.me/917006599020?text=${whatsappMessage}`}
                target="_blank"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  px-8 py-5
                  rounded-full
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  font-semibold
                  transition
                  mb-5
                  shadow-[0_0_30px_rgba(234,179,8,0.25)]
                "
              >
                Checkout on WhatsApp
              </Link>

              {/* Clear */}
              <button
                onClick={clearCart}
                className="
                  w-full
                  px-8 py-5
                  rounded-full
                  border border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition
                "
              >
                Clear Cart
              </button>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}