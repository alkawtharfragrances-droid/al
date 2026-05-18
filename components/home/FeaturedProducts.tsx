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

  categories?: string[];

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
              (doc) => {

                const productData =
                  doc.data();

                return {
                  id: doc.id,
                  ...productData,

                  // SUPPORT OLD + NEW CATEGORY SYSTEM
                  categories:
                    productData.categories ||
                    (
                      productData.category
                        ? [
                            productData.category,
                          ]
                        : []
                    ),
                };

              }
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
            (product) => {

              // GET MAX DECANT
              const maxDecant =
                product.decants &&
                product.decants.length > 0
                  ? [...product.decants].sort(
                      (a, b) => {

                        const aValue =
                          parseInt(
                            a.size.replace(/\D/g, "")
                          ) || 0;

                        const bValue =
                          parseInt(
                            b.size.replace(/\D/g, "")
                          ) || 0;

                        return bValue - aValue;

                      }
                    )[0]
                  : null;

              return (

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

                    {/* DYNAMIC CATEGORIES */}
                    <div className="flex flex-wrap gap-2 mb-3">

                      {product.categories?.map(
                        (
                          category,
                          index
                        ) => (

                          <span
                            key={`${category}-${index}`}
                            className="
                              uppercase
                              tracking-[2px]
                              text-yellow-500
                              text-[9px]
                              px-2 py-1
                              rounded-full
                              border
                              border-yellow-500/20
                              bg-yellow-500/10
                            "
                          >
                            {category}
                          </span>

                        )
                      )}

                    </div>

                    {/* Name */}
                    <h3
                      className="
                        text-lg
                        md:text-xl
                        font-bold
                        leading-tight
                        mb-4
                      "
                    >
                      {product.name}
                    </h3>

                    {/* FULL BOTTLE HIGHLIGHT */}
                    {maxDecant && (

                      <div
                        className="
                          rounded-2xl

                          border
                          border-yellow-500/20

                          bg-yellow-500/10

                          px-4
                          py-3

                          mb-4
                        "
                      >

                        <p
                          className="
                            text-[9px]
                            uppercase
                            tracking-[3px]
                            text-yellow-500
                            mb-1
                          "
                        >
                          Full Bottle
                        </p>

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <span
                            className="
                              text-sm
                              text-white
                              font-medium
                            "
                          >
                            {maxDecant.size}
                          </span>

                          <span
                            className="
                              text-lg
                              md:text-xl
                              font-bold
                              text-yellow-500
                            "
                          >
                            ₹{maxDecant.price}
                          </span>

                        </div>

                      </div>

                    )}

                    {/* Bottom */}
                    <div
                      className="
                        flex
                        items-center
                        justify-end
                      "
                    >

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

              );

            }
          )}

        </div>

      )}

    </section>

  );

}