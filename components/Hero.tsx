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
            md:text-7xl
            font-bold
            leading-tight
            text-white
            drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]
            max-w-5xl
            mx-auto
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
          Leave something behind
          <br />
          without saying a word.
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

          {/* Explore */}
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

          {/* WhatsApp */}
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
              flex
              items-center
              gap-2
            "
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                d="M12.04 2C6.52 2 2.05 6.48 2.05 12c0 1.77.46 3.5 1.34 5.03L2 22l5.13-1.34A9.95 9.95 0 0 0 12.04 22C17.56 22 22.04 17.52 22.04 12S17.56 2 12.04 2Zm0 18.18c-1.54 0-3.05-.41-4.37-1.18l-.31-.18-3.05.8.81-2.97-.2-.31a8.1 8.1 0 1 1 7.12 3.84Zm4.47-6.08c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.04.4 1.4.52.58.18 1.1.16 1.52.1.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z"
              />
            </svg>

            WhatsApp

          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/alkawthar_fragrances"
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
              hover:bg-[#E1306C]
              hover:border-[#E1306C]
              hover:text-white
              transition
              duration-300
              flex
              items-center
              gap-2
            "
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5Zm0 1.8h8.5c2.18 0 3.95 1.77 3.95 3.95v8.5c0 2.18-1.77 3.95-3.95 3.95h-8.5A3.95 3.95 0 0 1 3.8 16.25v-8.5C3.8 5.57 5.57 3.8 7.75 3.8Zm9.25 1.35a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1ZM12 6.85A5.15 5.15 0 1 0 12 17.15 5.15 5.15 0 0 0 12 6.85Zm0 1.8A3.35 3.35 0 1 1 12 15.35 3.35 3.35 0 0 1 12 8.65Z"
              />
            </svg>

            Instagram

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