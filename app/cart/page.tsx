"use client";

import Image from "next/image";

import Link from "next/link";

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
        px-6
        py-40
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">

          <p
            className="
              uppercase
              tracking-[8px]
              text-yellow-500
              mb-6
            "
          >
            Luxury Checkout
          </p>

          <h1
            className="
              text-6xl
              md:text-7xl
              font-bold
              mb-8
            "
          >
            Your Cart
          </h1>

          <p
            className="
              text-zinc-400
              max-w-2xl
              text-lg
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
              rounded-[40px]
              p-16
              text-center
            "
          >

            <h2
              className="
                text-4xl
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
                px-8 py-5
                rounded-full
                bg-yellow-500
                hover:bg-yellow-400
                text-black
                font-semibold
                transition
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
              gap-10
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
                      rounded-[36px]
                      border border-white/10
                      bg-white/5
                      backdrop-blur-sm
                      p-6
                    "
                  >

                    {/* Image */}
                    <div
                      className="
                        relative
                        w-full md:w-[220px]
                        h-[260px]
                        overflow-hidden
                        rounded-[28px]
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
                            text-4xl
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
                            flex items-center
                            gap-4
                            border border-white/10
                            rounded-full
                            px-5 py-3
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
                sticky top-32
                rounded-[40px]
                border border-white/10
                bg-white/5
                backdrop-blur-sm
                p-8
              "
            >

              <h2
                className="
                  text-4xl
                  font-bold
                  mb-10
                "
              >
                Order Summary
              </h2>

              {/* Items Count */}
              <div
                className="
                  flex justify-between
                  mb-6
                  text-zinc-400
                "
              >

                <span>Items</span>

                <span>
                  {cart.length}
                </span>

              </div>

              {/* Subtotal */}
              <div
                className="
                  flex justify-between
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
                  flex items-center
                  justify-center
                  px-8 py-5
                  rounded-full
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  font-semibold
                  transition
                  mb-5
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