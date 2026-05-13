"use client";

import Link from "next/link";

import {
  Search,
  X,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

export default function Navbar() {

  const router =
    useRouter();

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const [search, setSearch] =
    useState("");

  const [products, setProducts] =
    useState<any[]>([]);

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
      filtered.slice(0, 5)
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

    <>

      <header
        className="
          fixed
          top-4
          left-1/2
          -translate-x-1/2
          z-50
          w-[95%]
          max-w-5xl
        "
      >

        <nav
          className="
            flex
            items-center
            justify-between
            px-6
            md:px-8
            py-4
            rounded-full
            border
            border-white/10
            bg-black/40
            backdrop-blur-2xl
            shadow-[0_10px_40px_rgba(0,0,0,0.45)]
          "
        >

          {/* Logo */}
          <Link
            href="/"
            className="
              text-2xl
              md:text-4xl
              font-bold
              tracking-wide
              text-white
            "
          >
            Al-Kawthar
          </Link>

          {/* Nav Links */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-10
            "
          >

            <Link
              href="/"
              className="
                text-zinc-300
                hover:text-yellow-500
                transition
              "
            >
              Home
            </Link>

            <Link
              href="/products"
              className="
                text-zinc-300
                hover:text-yellow-500
                transition
              "
            >
              Products
            </Link>

            <Link
              href="/about"
              className="
                text-zinc-300
                hover:text-yellow-500
                transition
              "
            >
              About
            </Link>

          </div>

          {/* Right Side */}
          <div
            className="
              flex
              items-center
              gap-4
              relative
            "
          >

            {/* Search Box */}
            <div
              className="
                relative
              "
            >

              <div
                className={`
                  flex
                  items-center
                  overflow-hidden
                  transition-all
                  duration-500
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  rounded-full

                  ${
                    searchOpen
                      ? "w-72 px-4 py-2"
                      : "w-11 h-11 justify-center"
                  }
                `}
              >

                {searchOpen ? (

                  <>

                    {/* Search Icon */}
                    <Search
                      size={18}
                      className="
                        text-zinc-400
                      "
                    />

                    {/* Input */}
                    <input
                      type="text"
                      placeholder="Search fragrances..."
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
                        bg-transparent
                        outline-none
                        text-white
                        px-3
                        w-full
                        placeholder:text-zinc-500
                      "
                    />

                    {/* Close */}
                    <button
                      onClick={() => {

                        setSearchOpen(
                          false
                        );

                        setSearch(
                          ""
                        );
                      }}
                      className="
                        text-zinc-400
                        hover:text-white
                        transition
                      "
                    >
                      <X
                        size={18}
                      />
                    </button>

                  </>

                ) : (

                  <button
                    onClick={() =>
                      setSearchOpen(
                        true
                      )
                    }
                    className="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Search
                      size={18}
                      className="
                        text-white
                      "
                    />

                  </button>

                )}

              </div>

              {/* Dropdown */}
              {searchOpen &&
                filteredSuggestions.length >
                  0 && (

                <div
                  className="
                    absolute
                    top-full
                    left-0
                    right-0
                    mt-3
                    rounded-[24px]
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

                        {/* Image */}
                        <img
                          src={
                            product.image
                          }
                          alt={
                            product.name
                          }
                          className="
                            w-11
                            h-11
                            rounded-xl
                            object-cover
                          "
                        />

                        {/* Info */}
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

          </div>

        </nav>

      </header>

      {/* Floating Admin Button */}
      <Link
        href="/admin"
        className="
          fixed
          bottom-5
          left-5
          z-[9999]
        "
      >

        <button
          className="
            px-6
            py-4
            rounded-full
            bg-yellow-500
            hover:bg-yellow-400
            text-black
            font-semibold
            transition-all
            duration-300
            hover:scale-105
            shadow-[0_0_30px_rgba(234,179,8,0.35)]
          "
        >
          Admin
        </button>

      </Link>

    </>

  );
}