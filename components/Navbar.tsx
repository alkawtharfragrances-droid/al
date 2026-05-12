"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className="
        fixed top-4 left-1/2
        -translate-x-1/2
        z-50
        w-[95%] max-w-5xl
      "
    >
      <nav
        className="
          flex items-center justify-between
          px-6 md:px-8
          py-4
          rounded-full
          border border-white/10
          bg-black/40
          backdrop-blur-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.45)]
        "
      >

        {/* Logo */}
        <Link
          href="/"
          className="
            text-2xl md:text-4xl
            font-bold
            tracking-wide
            text-white
          "
        >
          Al-Kawthar
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">

          <Link
            href="/"
            className="text-zinc-300 hover:text-yellow-500 transition"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-zinc-300 hover:text-yellow-500 transition"
          >
            Products
          </Link>

          <Link
            href="/about"
            className="text-zinc-300 hover:text-yellow-500 transition"
          >
            About
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Search Box */}
          <div
            className={`
              flex items-center
              overflow-hidden
              transition-all duration-500
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              rounded-full

              ${searchOpen ? "w-64 px-4 py-2" : "w-11 h-11 justify-center"}
            `}
          >

            {searchOpen ? (
              <>
                <Search size={18} className="text-zinc-400" />

                <input
                  type="text"
                  placeholder="Search fragrances..."
                  className="
                    bg-transparent
                    outline-none
                    text-white
                    px-3
                    w-full
                    placeholder:text-zinc-500
                  "
                />

                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="
                  w-full h-full
                  flex items-center justify-center
                "
              >
                <Search size={18} className="text-white" />
              </button>
            )}

          </div>

          {/* Admin Button */}
          <Link
            href="/admin"
            className="
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              px-6 py-3
              rounded-full
              font-semibold
              transition duration-300
              hover:scale-105
              shadow-[0_0_30px_rgba(234,179,8,0.35)]
            "
          >
            Admin
          </Link>

        </div>

      </nav>
    </header>
  );
}