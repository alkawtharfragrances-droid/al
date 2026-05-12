"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import HeroQuotes from "@/components/HeroQuotes";

export default function Hero() {

  const router =
    useRouter();

  const [search, setSearch] =
    useState("");

  const handleSearch = () => {

    if (!search.trim()) {

      router.push("/products");

      return;
    }

    router.push(
      `/products?search=${encodeURIComponent(search)}`
    );
  };

  return (

    <section
      className="
        relative
        min-h-screen
        flex items-center
        justify-center
        overflow-hidden
      "
    >

      {/* Extra Hero Overlay */}
      <div
        className="
          absolute inset-0
          bg-black/40
        "
      />

      {/* Ambient Glow */}
      <div
        className="
          absolute
          top-20 left-20
          w-72 h-72
          bg-yellow-500/20
          blur-[120px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-10 right-10
          w-96 h-96
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

        {/* Search Bar */}
        <div
          className="
            mt-10
            max-w-2xl
            mx-auto
          "
        >

          <div
            className="
              flex flex-col
              sm:flex-row
              gap-4
              p-3
              rounded-[32px]
              border border-white/10
              bg-white/5
              backdrop-blur-2xl
              shadow-[0_10px_60px_rgba(0,0,0,0.45)]
            "
          >

            {/* Input */}
            <input
              type="text"
              placeholder="Search fragrances, notes, brands..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  handleSearch();
                }

              }}
              className="
                flex-1
                bg-transparent
                px-6 py-5
                text-white
                placeholder:text-zinc-500
                outline-none
                text-lg
              "
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="
                px-8 py-5
                rounded-[24px]
                bg-yellow-500
                hover:bg-yellow-400
                text-black
                font-semibold
                transition duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
                shadow-[0_10px_30px_rgba(234,179,8,0.35)]
              "
            >
              Search
            </button>

          </div>

        </div>

        {/* CTA Buttons */}
        <div
          className="
            mt-10
            flex justify-center
            gap-4 md:gap-5
            flex-wrap
          "
        >

          <Link
            href="/products"
            className="
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              px-6 md:px-8
              py-3 md:py-4
              rounded-full
              font-semibold
              transition duration-300
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
              border border-white/30
              backdrop-blur-xl
              bg-white/5
              px-6 md:px-8
              py-3 md:py-4
              rounded-full
              hover:bg-white
              hover:text-black
              transition duration-300
            "
          >
            WhatsApp Us
          </a>

        </div>

        {/* Quotes */}
        <div className="mt-16">

          <HeroQuotes />

        </div>

      </div>

    </section>
  );
}