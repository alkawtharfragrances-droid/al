"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface Product {

  id: string;

  name: string;

  image: string;

  category: string;

  featured?: boolean;

  description?: string;

  notes?: string[];

  decants?: {
    size: string;
    price: number;
  }[];

}

export default function FeaturedProducts() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const q = query(
            collection(
              db,
              "products"
            ),
            where(
              "featured",
              "==",
              true
            )
          );

          const snapshot =
            await getDocs(q);

          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            ) as Product[];

          setProducts(data);

        } catch (error) {

          console.error(
            "Error fetching featured products:",
            error
          );

        } finally {

          setLoading(false);

        }

      };

    fetchProducts();

  }, []);

  return (

    <section
      className="
        relative
        px-4 md:px-8 xl:px-16
        py-20
      "
    >

      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-10
        "
      >

        <div>

          <p
            className="
              uppercase
              tracking-[4px]
              text-yellow-500
              text-xs
              mb-2
            "
          >
            Featured Collection
          </p>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-bold
            "
          >
            Luxury Fragrances
          </h2>

        </div>

        <Link
          href="/products"
          className="
            hidden md:flex
            items-center
            gap-2
            border border-white/10
            hover:border-yellow-500/40
            bg-white/5
            backdrop-blur-md
            px-5 py-3
            rounded-full
            transition
          "
        >
          View All
        </Link>

      </div>

      {/* Loading */}
      {loading && (

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-4 md:gap-6
          "
        >

          {[...Array(8)].map(
            (_, i) => (

              <div
                key={i}
                className="
                  animate-pulse
                  rounded-[28px]
                  bg-zinc-900
                  h-[360px]
                "
              />

            )
          )}

        </div>

      )}

      {/* Products */}
      {!loading &&
        products.length > 0 && (

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-4 md:gap-6
          "
        >

          {products.map(
            (product) => (

              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-white/5
                  backdrop-blur-sm
                  hover:-translate-y-1
                  transition duration-500
                  shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                "
              >

                {/* Image */}
                <div
                  className="
                    overflow-hidden
                    h-[220px]
                    md:h-[280px]
                  "
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition duration-700
                    "
                  />

                </div>

                {/* Content */}
                <div
                  className="
                    p-4 md:p-5
                  "
                >

                  {/* Category */}
                  <p
                    className="
                      uppercase
                      tracking-[3px]
                      text-yellow-500
                      text-[10px]
                      mb-2
                    "
                  >
                    {product.category}
                  </p>

                  {/* Name */}
                  <h3
                    className="
                      text-lg
                      md:text-xl
                      font-bold
                      leading-tight
                      mb-2
                    "
                  >
                    {product.name}
                  </h3>

                  {/* Size */}
                  <p
                    className="
                      text-zinc-500
                      text-sm
                      mb-4
                    "
                  >
                    {product.decants?.[0]
                      ?.size ||
                      "Size Unavailable"}
                  </p>

                  {/* Bottom */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    {/* Price */}
                    <p
                      className="
                        text-lg
                        md:text-xl
                        font-bold
                      "
                    >
                      {product.decants?.[0]
                        ?.price
                        ? `From ₹${product.decants[0].price}`
                        : "No Price"}
                    </p>

                    {/* Button */}
                    <div
                      className="
                        px-4 py-2
                        rounded-full
                        bg-yellow-500
                        group-hover:bg-yellow-400
                        text-black
                        text-sm
                        font-semibold
                        transition
                      "
                    >
                      View
                    </div>

                  </div>

                </div>

              </Link>

            )
          )}

        </div>

      )}

    </section>

  );

}