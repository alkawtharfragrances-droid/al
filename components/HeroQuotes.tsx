"use client";

import { useEffect, useState } from "react";

const quotes = [
  {
    quote: "Perfume is the art that makes memory speak.",
    author: "Francis Kurkdjian",
  },
  {
    quote: "A fragrance is a silent introduction.",
    author: "Al-Kawthar",
  },
  {
    quote: "Luxury lives in restraint.",
    author: "Al-Kawthar",
  },
  {
    quote: "Fragrance is the unseen layer of presence.",
    author: "Jacques Polge",
  },
  {
    quote: "Some impressions remain long after departure.",
    author: "Al-Kawthar",
  },
];

export default function HeroQuotes() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-14 max-w-4xl mx-auto px-6">

      <div
        className="
          backdrop-blur-2xl
          bg-white/5
          border border-white/10
          rounded-[40px]
          px-8 md:px-12
          py-8 md:py-10
          shadow-[0_10px_50px_rgba(0,0,0,0.45)]
        "
      >

        <p
          className="
            text-xl md:text-3xl
            italic
            text-zinc-100
            leading-relaxed
            min-h-[100px]
          "
        >
          “{quotes[current].quote}”
        </p>

        <div className="mt-8 flex items-center justify-between flex-wrap gap-6">

          <span
            className="
              uppercase
              tracking-[6px]
              text-yellow-500
              text-xs md:text-sm
            "
          >
            {quotes[current].author}
          </span>

          <div className="flex gap-3">

            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                  transition-all duration-500
                  rounded-full

                  ${
                    current === index
                      ? "w-10 h-2 bg-yellow-500"
                      : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }
                `}
              />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}