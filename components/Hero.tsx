"use client";

import Link from "next/link";
import HeroQuotes from "@/components/HeroQuotes";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Extra Hero Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Ambient Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/10 blur-[140px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl md:max-w-5xl pt-40 md:pt-32">

        <p className="uppercase tracking-[6px] md:tracking-[10px] text-yellow-500 mb-6">
          Luxury Fragrances
        </p>

        <h1
          className="
            text-5xl sm:text-6xl md:text-8xl
            font-bold leading-tight
            text-white
            drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]
          "
        >
          Crafted For Presence
        </h1>

        <p className="mt-8 text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Crafted for presence.
          <br />
         What lingers unseen, lingers deepest.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-4 md:gap-5 flex-wrap">

          <Link
            href="/products"
            className="
              bg-yellow-500 hover:bg-yellow-400
              text-black
              px-6 md:px-8 py-3 md:py-4
              rounded-full
              font-semibold
              transition duration-300
              hover:scale-105
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
              px-6 md:px-8 py-3 md:py-4
              rounded-full
              hover:bg-white hover:text-black
              transition duration-300
            "
          >
            WhatsApp Us
          </a>

        </div>

        {/* Rotating Quotes */}
        <HeroQuotes />

      </div>

    </section>
  );
}