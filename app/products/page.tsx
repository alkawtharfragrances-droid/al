"use client";

import {
  useEffect,
  useMemo,
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

const categories = [
  "All",
  "Designer",
  "Middle Eastern",
  "Niche",
  "Attars",
  "Bakhoor & Oils",
  "Decants / Partials",
];

export default function ProductsPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [sortBy, setSortBy] =
    useState("default");

  // Fetch Products
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
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Product[];

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

  // Filtering + Sorting
  const filteredProducts =
    useMemo(() => {

      let filtered =
        [...products];

      // Category Filter
      if (
        selectedCategory !== "All"
      ) {

        filtered =
          filtered.filter(
            (product) =>
              product.category ===
              selectedCategory
          );
      }

      // Search
      if (
        searchQuery.trim()
      ) {

        filtered =
          filtered.filter(
            (product) =>

              product.name
                .toLowerCase()
                .includes(
                  searchQuery.toLowerCase()
                ) ||

              (product.description || "")
                .toLowerCase()
                .includes(
                  searchQuery.toLowerCase()
                ) ||

              (product.notes || []).some(
                (note) =>
                  note
                    .toLowerCase()
                    .includes(
                      searchQuery.toLowerCase()
                    )
              )
          );
      }

      // Sorting
      switch (sortBy) {

        case "price-low":

          filtered.sort(
            (a, b) =>
              Number(a.price) -
              Number(b.price)
          );

          break;

        case "price-high":

          filtered.sort(
            (a, b) =>
              Number(b.price) -
              Number(a.price)
          );

          break;

        case "a-z":

          filtered.sort(
            (a, b) =>
              a.name.localeCompare(
                b.name
              )
          );

          break;

        case "z-a":

          filtered.sort(
            (a, b) =>
              b.name.localeCompare(
                a.name
              )
          );

          break;
      }

      return filtered;

    }, [
      products,
      selectedCategory,
      searchQuery,
      sortBy,
    ]);

  return (

    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section
        className="
          relative
          overflow-hidden
          px-6
          pt-40
          pb-24
        "
      >

        {/* Glow */}
        <div
          className="
            absolute
            top-0 left-1/2
            -translate-x-1/2
            w-[700px]
            h-[700px]
            bg-yellow-500/10
            blur-[180px]
            rounded-full
          "
        />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-20">

            <p
              className="
                uppercase
                tracking-[8px]
                text-yellow-500
                mb-6
              "
            >
              Luxury Catalogue
            </p>

            <h1
              className="
                text-6xl
                md:text-8xl
                font-bold
                mb-8
              "
            >
              All Fragrances
            </h1>

            <p
              className="
                text-zinc-400
                max-w-2xl
                mx-auto
                text-lg
                leading-relaxed
              "
            >
              Explore designer icons,
              niche masterpieces,
              Middle Eastern legends,
              attars, oils, and
              exclusive collections.
            </p>

          </div>

          {/* Search + Sort */}
          <div
            className="
              flex flex-col lg:flex-row
              gap-6
              items-center
              justify-between
              mb-12
            "
          >

            {/* Search */}
            <input
              type="text"
              placeholder="Search fragrances, notes, collections..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="
                w-full lg:w-[420px]
                bg-white/5
                border border-white/10
                rounded-2xl
                px-6 py-5
                outline-none
                focus:border-yellow-500
                transition
              "
            />

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="
                w-full lg:w-auto
                bg-white/5
                border border-white/10
                rounded-2xl
                px-6 py-5
                outline-none
                focus:border-yellow-500
                transition
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
                A → Z
              </option>

              <option value="z-a">
                Z → A
              </option>

            </select>

          </div>

          {/* Filters */}
          <div
            className="
              flex flex-wrap
              justify-center
              gap-4
              mb-20
            "
          >

            {categories.map(
              (category) => (

                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                  className={`
                    px-6 py-3
                    rounded-full
                    border
                    transition

                    ${
                      selectedCategory ===
                      category

                        ? `
                          bg-yellow-500
                          text-black
                          border-yellow-500
                        `

                        : `
                          border-white/10
                          bg-white/5
                          hover:bg-white/10
                        `
                    }
                  `}
                >
                  {category}
                </button>

              )
            )}

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
              Loading fragrances...
            </div>

          )}

          {/* Empty */}
          {!loading &&
            filteredProducts.length === 0 && (

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
              No fragrances found.
            </div>

          )}

          {/* Products */}
          {!loading &&
            filteredProducts.length > 0 && (

            <div
              className="
                grid
                md:grid-cols-2
                xl:grid-cols-3
                gap-8
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

                    {/* Overlay */}
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
                    <div
                      className="
                        p-8
                        relative z-10
                      "
                    >

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

                        {(product.notes || []).map(
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

    </main>

  );
}