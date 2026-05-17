"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description?: string;
  notes?: string[];
  featured?: boolean;
  decants?: {
    size: string;
    price: number;
  }[];
}

export default function ProductsPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  // CATEGORY ORDER
  const orderedCategories = [
    "Middle Eastern",
    "Designer",
    "Niche",
    "French",
    "Partials",
    "Attar",
    "Bakhoor / Essential Oils",
  ];

  // CATEGORY IMAGES
  const categoryImages: Record<string, string> = {

    all:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",

    middleeastern:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1200&auto=format&fit=crop",

    designer:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop",

    niche:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",

    french:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop",

    partials:
      "https://images.unsplash.com/photo-1619994403073-2cec4b5d4b20?q=80&w=1200&auto=format&fit=crop",

    attar:
      "https://images.unsplash.com/photo-1615634262417-d53102d6f7d9?q=80&w=1200&auto=format&fit=crop",

    bakhooressentialoils:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
  };

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const snapshot =
            await getDocs(
              collection(db, "products")
            );

          const data =
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Product[];

          setProducts(data);

        } catch (error) {

          console.error(
            "Error fetching products:",
            error
          );

        } finally {

          setLoading(false);

        }

      };

    fetchProducts();

  }, []);

  // ALWAYS SHOW ALL CATEGORIES
  const categories =
    useMemo(() => {

      return [
        "All",
        ...orderedCategories,
      ];

    }, []);

  // FILTER + SORT
  const filteredProducts =
    useMemo(() => {

      let filtered =
        products.filter((product) => {

          const matchesSearch =
            product.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            selectedCategory === "All"
              ? true
              : product.category
                  ?.toLowerCase()
                  .trim() ===
                selectedCategory
                  .toLowerCase()
                  .trim();

          return (
            matchesSearch &&
            matchesCategory
          );

        });

      // SORTING

      if (sortBy === "price-low") {

        filtered.sort(
          (a, b) =>
            (a.decants?.[0]?.price || 0) -
            (b.decants?.[0]?.price || 0)
        );

      }

      if (sortBy === "price-high") {

        filtered.sort(
          (a, b) =>
            (b.decants?.[0]?.price || 0) -
            (a.decants?.[0]?.price || 0)
        );

      }

      if (sortBy === "a-z") {

        filtered.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      }

      return filtered;

    }, [
      products,
      search,
      selectedCategory,
      sortBy,
    ]);

  return (

    <section
      className="
        min-h-screen
        px-4 md:px-8 xl:px-16
        py-24
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">

          <p
            className="
              uppercase
              tracking-[8px]
              text-yellow-500
              text-xs
              mb-4
            "
          >
            Luxury Collection
          </p>

          <h1
            className="
              text-4xl
              md:text-6xl
              font-bold
            "
          >
            Explore Fragrances
          </h1>

          <p
            className="
              mt-5
              text-zinc-400
              text-base
              md:text-lg
              max-w-2xl
              mx-auto
            "
          >
            Discover premium fragrances curated
            for every identity, season, and mood.
          </p>

        </div>

        {/* CATEGORY SHOWCASE */}
        <div
          className="
            flex
            gap-5
            overflow-x-auto
            pb-6
            mb-12
            scrollbar-hide
          "
        >

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                min-w-[180px]
                relative
                overflow-hidden
                rounded-3xl
                border
                transition-all
                duration-500
                hover:scale-[1.03]

                ${
                  selectedCategory === category
                    ? "border-yellow-500 scale-[1.02]"
                    : "border-white/10"
                }
              `}
            >

              <div className="relative h-[120px]">

                <img
                  src={
                    categoryImages[
                      category
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .replace("/", "")
                    ] ||
                    categoryImages["all"]
                  }
                  alt={category}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                <div
                  className="
                    absolute inset-0
                    bg-black/40
                  "
                />

                <div
                  className="
                    absolute bottom-3 left-3
                    text-left
                  "
                >

                  <p
                    className="
                      text-white
                      font-bold
                      text-sm
                    "
                  >
                    {category}
                  </p>

                </div>

              </div>

            </button>

          ))}

        </div>

        {/* SEARCH + SORT */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-5
            items-center
            justify-between
            mb-12
          "
        >

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search fragrances..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              lg:w-[380px]
              bg-white/5
              border border-white/10
              rounded-2xl
              px-6 py-4
              outline-none
              focus:border-yellow-500
              transition
            "
          />

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="
              bg-white/5
              border border-white/10
              rounded-2xl
              px-5 py-4
              outline-none
              focus:border-yellow-500
            "
          >

            <option value="default">
              Sort Products
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="a-z">
              Alphabetical
            </option>

          </select>

        </div>

        {/* LOADING */}
        {loading && (

          <div
            className="
              text-center
              text-zinc-500
              py-24
            "
          >
            Loading fragrances...
          </div>

        )}

        {/* PRODUCTS */}
        {!loading &&
          filteredProducts.length > 0 && (

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              gap-5
            "
          >

            {filteredProducts.map(
              (product) => (

                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    backdrop-blur-sm
                    hover:-translate-y-1
                    transition duration-500
                    shadow-[0_8px_24px_rgba(0,0,0,0.25)]
                  "
                >

                  {/* IMAGE */}
                  <div
                    className="
                      overflow-hidden
                      h-[180px]
                      md:h-[240px]
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

                  {/* OVERLAY */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/30
                      to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition duration-500
                    "
                  />

                  {/* CONTENT */}
                  <div
                    className="
                      p-4
                      relative z-10
                    "
                  >

                    {/* CATEGORY */}
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

                    {/* NAME */}
                    <h3
                      className="
                        text-sm
                        md:text-base
                        font-bold
                        leading-snug
                        mb-2
                        line-clamp-2
                      "
                    >
                      {product.name}
                    </h3>

                    {/* SIZE */}
                    <p
                      className="
                        text-zinc-500
                        text-xs
                        mb-4
                      "
                    >
                      {product.decants?.[0]?.size ||
                        "Size Unavailable"}
                    </p>

                    {/* BOTTOM */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      {/* PRICE */}
                      <p
                        className="
                          text-base
                          md:text-lg
                          font-bold
                        "
                      >
                        {product.decants?.[0]?.price
                          ? `From ₹${product.decants[0].price}`
                          : "No Price"}
                      </p>

                      {/* BUTTON */}
                      <div
                        className="
                          px-3 py-1.5
                          rounded-full
                          bg-yellow-500
                          group-hover:bg-yellow-400
                          text-black
                          text-xs
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

        {/* EMPTY */}
        {!loading &&
          filteredProducts.length === 0 && (

          <div className="text-center py-24">

            <h3 className="text-2xl font-bold mb-3">
              No Fragrances Found
            </h3>

            <p className="text-zinc-500">
              Try adjusting your search or filters.
            </p>

          </div>

        )}

      </div>

    </section>

  );

}