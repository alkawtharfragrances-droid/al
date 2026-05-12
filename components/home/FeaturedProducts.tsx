"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type Product = {
  id: string;

  name: string;

  price: string;

  image: string;

  description: string;

  notes: string[];

  category: string;

  featured: boolean;
};

export default function FeaturedProducts() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "products"
            )
          );

        const fetched =
          snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (product: any) =>
                product.featured
            ) as Product[];

        setProducts(fetched);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <section className="py-32 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20 text-center">

          <p
            className="
              uppercase
              tracking-[8px]
              text-yellow-500
              mb-6
            "
          >
            Signature Collection
          </p>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">

            Featured Fragrances

          </h2>

          <p
            className="
              text-zinc-400
              max-w-2xl
              mx-auto
              text-lg
              leading-relaxed
            "
          >
            Discover the fragrances
            chosen to define presence,
            memory, and identity.
          </p>

        </div>

        {/* Loading */}
        {loading && (

          <div
            className="
              text-center
              text-zinc-500
              py-24
            "
          >
            Loading featured fragrances...
          </div>

        )}

        {/* Empty */}
        {!loading &&
          products.length === 0 && (

          <div
            className="
              text-center
              text-zinc-500
              py-24
              border border-white/10
              rounded-[36px]
              bg-white/5
            "
          >
            No featured fragrances yet.
          </div>

        )}

        {/* Products Grid */}
        {!loading &&
          products.length > 0 && (

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
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
                    rounded-[36px]
                    border border-white/10
                    bg-white/5
                    backdrop-blur-sm
                    hover:-translate-y-2
                    transition duration-500
                    shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                  "
                >

                  {/* Image */}
                  <div
                    className="
                      overflow-hidden
                      h-[420px]
                    "
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-full h-full
                        object-cover
                        group-hover:scale-110
                        transition duration-700
                      "
                    />

                  </div>

                  {/* Overlay Glow */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/70
                      via-transparent
                      to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition duration-500
                    "
                  />

                  {/* Content */}
                  <div className="p-8 relative z-10">

                    {/* Category */}
                    <p
                      className="
                        uppercase
                        tracking-[4px]
                        text-yellow-500
                        text-xs
                        mb-4
                      "
                    >
                      {product.category}
                    </p>

                    {/* Name */}
                    <h3
                      className="
                        text-3xl
                        font-bold
                        mb-4
                      "
                    >
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="
                        text-zinc-400
                        leading-relaxed
                        mb-6
                        line-clamp-3
                      "
                    >
                      {product.description}
                    </p>

                    {/* Notes */}
                    <div
                      className="
                        flex flex-wrap
                        gap-2
                        mb-8
                      "
                    >

                      {product.notes?.map(
                        (note) => (

                          <div
                            key={note}
                            className="
                              px-3 py-1
                              rounded-full
                              border border-white/10
                              bg-black/20
                              text-xs
                              text-zinc-300
                            "
                          >
                            {note}
                          </div>

                        )
                      )}

                    </div>

                    {/* Bottom */}
                    <div
                      className="
                        flex items-center
                        justify-between
                      "
                    >

                      {/* Price */}
                      <p
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        ₹{product.price}
                      </p>

                      {/* CTA */}
                      <div
                        className="
                          px-5 py-3
                          rounded-full
                          bg-yellow-500
                          group-hover:bg-yellow-400
                          text-black
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

      </div>

    </section>

  );
}