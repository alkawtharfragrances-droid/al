"use client";

import { useEffect, useState } from "react";

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

const categories = [
  {
    name: "Designer",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1974&auto=format&fit=crop",
  },

  {
    name: "Middle Eastern",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop",
  },

  {
    name: "Niche",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1974&auto=format&fit=crop",
  },

  {
    name: "Attars",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop",
  },

  {
    name: "Bakhoor & Oils",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1974&auto=format&fit=crop",
  },

  {
    name: "Decants / Partials",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function ProductsPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const snapshot =
          await getDocs(
            collection(db, "products")
          );

        const fetchedProducts =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Product[];

        setProducts(fetchedProducts);

      } catch (error) {

        console.error(error);

      }
    };

    fetchProducts();

  }, []);

  return (
    <main className="min-h-screen text-white px-6 py-32">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">

          <div
            className="
              inline-flex
              px-5 py-2
              rounded-full
              border border-yellow-500/20
              bg-yellow-500/10
              text-yellow-500
              uppercase
              tracking-[6px]
              text-sm
              mb-8
            "
          >
            Al-Kawthar
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Curated Collections
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Explore cinematic fragrance compositions
            across designer, niche, Middle Eastern,
            attars, oils, and collector selections.
          </p>

        </div>

        {/* Categories */}
        <div className="mb-28">

          <div
            className="
              flex
              gap-6
              overflow-x-auto
              pb-4
              scrollbar-hide
            "
          >

            {categories.map((category) => (
              <div
                key={category.name}
                className="
                  relative
                  min-w-[240px]
                  h-[140px]
                  rounded-[36px]
                  overflow-hidden
                  border border-white/10
                  group
                  flex-shrink-0
                "
              >

                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-black/50
                  "
                />

                {/* Glow */}
                <div
                  className="
                    absolute inset-0
                    bg-yellow-500/0
                    group-hover:bg-yellow-500/10
                    transition duration-500
                  "
                />

                {/* Text */}
                <div
                  className="
                    absolute inset-0
                    flex items-center justify-center
                    text-center
                    px-4
                  "
                >

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    {category.name}
                  </h2>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Products Grid */}
        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >

          {products.map((perfume) => (
            <div
              key={perfume.id}
              className="
                group
                relative
                overflow-hidden
                rounded-[36px]
                border border-white/10
                bg-white/5
                backdrop-blur-sm
              "
            >

              {/* Image */}
              <div className="relative h-[420px] overflow-hidden">

                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="
                    w-full h-full
                    object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/90
                    via-black/20
                    to-transparent
                  "
                />

                {/* Featured Badge */}
                {perfume.featured && (
                  <div
                    className="
                      absolute top-5 left-5
                      px-4 py-2
                      rounded-full
                      bg-yellow-500
                      text-black
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[3px]
                    "
                  >
                    Featured
                  </div>
                )}

              </div>

              {/* Content */}
              <div className="p-8">

                {/* Category */}
                <p
                  className="
                    text-yellow-500
                    uppercase
                    tracking-[4px]
                    text-sm
                    mb-4
                  "
                >
                  {perfume.category}
                </p>

                {/* Name */}
                <h2 className="text-3xl font-bold mb-3">
                  {perfume.name}
                </h2>

                {/* Description */}
                <p
                  className="
                    text-zinc-400
                    leading-relaxed
                    mb-6
                  "
                >
                  {perfume.description}
                </p>

                {/* Notes */}
                <div
                  className="
                    flex flex-wrap
                    gap-3
                    mb-8
                  "
                >

                  {perfume.notes?.map((note) => (
                    <span
                      key={note}
                      className="
                        px-4 py-2
                        rounded-full
                        bg-white/5
                        border border-white/10
                        text-sm
                        text-zinc-300
                      "
                    >
                      {note}
                    </span>
                  ))}

                </div>

                {/* Bottom */}
                <div
                  className="
                    flex items-center
                    justify-between
                  "
                >

                  <p className="text-2xl font-bold">
                     ₹{perfume.price}
                  </p>

                  <button
                    className="
                      bg-yellow-500
                      hover:bg-yellow-400
                      text-black
                      px-6 py-3
                      rounded-full
                      font-semibold
                      transition
                    "
                  >
                    View
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}