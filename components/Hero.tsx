"use client";

import {
  useState,
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import HeroQuotes from "@/components/HeroQuotes";

export default function Hero() {

  const router =
    useRouter();

  // Search
  const [search, setSearch] =
    useState("");

  // Products
  const [products, setProducts] =
    useState<any[]>([]);

  // Suggestions
  const [
    filteredSuggestions,
    setFilteredSuggestions,
  ] = useState<any[]>([]);

  // Fetch Products
  useEffect(() => {

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

          const fetchedProducts =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setProducts(
            fetchedProducts
          );

        } catch (error) {

          console.error(
            error
          );
        }

      };

    fetchProducts();

  }, []);

  // Autocomplete
  useEffect(() => {

    if (!search.trim()) {

      setFilteredSuggestions(
        []
      );

      return;
    }

    const filtered =
      products.filter(
        (product: any) =>

          product.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          product.brand
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          product.category
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredSuggestions(
      filtered.slice(0, 6)
    );

  }, [search, products]);

  // Search Handler
  const handleSearch =
    () => {

      const trimmedSearch =
        search.trim();

      if (
        !trimmedSearch
      ) {

        router.push(
          "/products"
        );

        return;
      }

      router.push(
        `/products?search=${encodeURIComponent(trimmedSearch)}`
      );
    };

  return (

    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        bg-black
      "
    >

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
      />

      {/* Ambient Glow */}
      <div
        className="
          absolute
          top-20
          left-20
          w-72
          h-72
          bg-yellow-500/20
          blur-[120px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-10
          right-10
          w-96
          h-96
          bg-red-500/10
          blur-[140px]
          rounded-full
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          text-center
          px-6
          max-w-3xl
          md:max-w-5xl
          pt-40
          md:pt-32
        "
      >

        {/* Badge */}
        <p
          className="
            uppercase
            tracking-[6px]
            md:tracking-[10px]
            text-yellow-500
            mb-6
            text-sm
          "
        >
          Luxury Fragrances
        </p>

        {/* Heading */}
        <h1
          className="
            text-5xl
            sm:text-6xl
            md:text-8xl
            font-bold
            leading-tight
            text-white
            drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]
          "
        >
          Crafted For Presence
        </h1>

        {/* Description */}
        <p
          className="
            mt-8
            text-zinc-300
            text-base
            sm:text-lg
            md:text-xl
            leading-relaxed
            max-w-2xl
            mx-auto
          "
        >
          Crafted for presence.
          <br />
          What lingers unseen,
          lingers deepest.
        </p>

        {/* Search Section */}
        <div
          className="
            mt-10
            max-w-3xl
            mx-auto
            relative
          "
        >

          {/* Search Container */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
              p-3
              rounded-[34px]
              border
              border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              shadow-[0_10px_60px_rgba(0,0,0,0.45)]
              transition-all
              duration-300
              hover:border-yellow-500/20
            "
          >

            {/* Input Wrapper */}
            <div
              className="
                flex
                items-center
                flex-1
                px-5
              "
            >

              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="
                  w-5
                  h-5
                  text-zinc-500
                  mr-4
                  shrink-0
                "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m0 0A7.65 7.65 0 1 0 5.85 5.85a7.65 7.65 0 0 0 10.8 10.8Z"
                />
              </svg>

              {/* Input */}
              <input
                type="text"
                placeholder="Search fragrances, notes, brands..."
                value={search}
                onChange={(
                  e
                ) =>
                  setSearch(
                    e.target.value
                  )
                }
                onKeyDown={(
                  e
                ) => {

                  if (
                    e.key ===
                    "Enter"
                  ) {

                    handleSearch();
                  }

                }}
                className="
                  flex-1
                  bg-transparent
                  py-5
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  text-base
                  md:text-lg
                "
              />

            </div>

            {/* Search Button */}
            <button
              onClick={
                handleSearch
              }
              className="
                px-8
                py-5
                rounded-[24px]
                bg-yellow-500
                hover:bg-yellow-400
                text-black
                font-semibold
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
                shadow-[0_10px_30px_rgba(234,179,8,0.35)]
                whitespace-nowrap
              "
            >
              Search
            </button>

          </div>

          {/* Autocomplete Dropdown */}
          {filteredSuggestions.length >
            0 && (

            <div
              className="
                absolute
                top-full
                left-0
                right-0
                mt-3
                rounded-[28px]
                border
                border-white/10
                bg-black/90
                backdrop-blur-2xl
                overflow-hidden
                shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                z-50
              "
            >

              {filteredSuggestions.map(
                (
                  product: any
                ) => (

                  <button
                    key={
                      product.id
                    }
                    onClick={() => {

                      setSearch(
                        product.name
                      );

                      router.push(
                        `/products?search=${encodeURIComponent(product.name)}`
                      );
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      text-left
                      px-5
                      py-4
                      hover:bg-yellow-500
                      hover:text-black
                      transition-all
                      duration-200
                      border-b
                      border-white/5
                      last:border-none
                    "
                  >

                    {/* Product Image */}
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      className="
                        w-12
                        h-12
                        object-cover
                        rounded-xl
                      "
                    />

                    {/* Product Info */}
                    <div>

                      <p
                        className="
                          font-medium
                        "
                      >
                        {
                          product.name
                        }
                      </p>

                      <p
                        className="
                          text-sm
                          text-zinc-500
                        "
                      >
                        ₹
                        {
                          product.price
                        }
                      </p>

                    </div>

                  </button>

                )
              )}

            </div>

          )}

        </div>

        {/* CTA Buttons */}
        <div
          className="
            mt-10
            flex
            justify-center
            gap-4
            md:gap-5
            flex-wrap
          "
        >

          <Link
            href="/products"
            className="
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              px-6
              md:px-8
              py-3
              md:py-4
              rounded-full
              font-semibold
              transition
              duration-300
              hover:scale-105
              shadow-[0_10px_30px_rgba(234,179,8,0.25)]
            "
          >
            Explore Collection
          </Link>

          <a
            href="https://wa.me/917006599020"
            target="_blank"
            className="
              border
              border-white/30
              backdrop-blur-xl
              bg-white/5
              px-6
              md:px-8
              py-3
              md:py-4
              rounded-full
              hover:bg-white
              hover:text-black
              transition
              duration-300
            "
          >
            WhatsApp Us
          </a>

        </div>

        {/* Quotes */}
        <div
          className="
            mt-16
          "
        >

          <HeroQuotes />

        </div>

      </div>

    </section>
  );
}