"use client";

import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ProductProps {
  name: string;

  image: string;

  description: string;

  notes?: string[];

  decants?: {
    size: string;
    price: number;
  }[];
}

export default function ProductCard({
  name,
  image,
  description,
  notes = [],
  decants = [],
}: ProductProps) {

  const [expanded, setExpanded] =
    useState(false);

  const whatsappNumber =
    "917006599020";

  const selectedDecant =
    decants?.[0];

  const message =
    `Hello, I want to order ${name} ${
      selectedDecant
        ? `(${selectedDecant.size})`
        : ""
    } for ₹${
      selectedDecant?.price || 0
    }`;

  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

  return (

    <div
      className="
        bg-zinc-900
        rounded-3xl
        overflow-hidden
        border border-zinc-800
        hover:border-amber-400/30
        transition-all duration-500
        group
      "
    >

      {/* IMAGE */}
      <div className="overflow-hidden">

        <img
          src={image}
          alt={name}
          className="
            h-[220px]
            md:h-[260px]
            w-full
            object-cover
            transition-transform duration-700
            group-hover:scale-105
          "
        />

      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* CATEGORY */}
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-amber-400
            mb-2
          "
        >
          Middle Eastern
        </p>

        {/* NAME */}
        <h2
          className="
            text-lg
            md:text-xl
            font-semibold
            text-white
            leading-tight
          "
        >
          {name}
        </h2>

        {/* SIZE */}
        <p className="text-zinc-500 text-sm mt-1">

          {selectedDecant?.size ||
            "Size Unavailable"}

        </p>

        {/* PRICE + VIEW */}
        <div className="flex items-center justify-between mt-4">

          <span className="text-xl font-bold text-white">

            {selectedDecant?.price
              ? `From ₹${selectedDecant.price}`
              : "No Price"}

          </span>

          <button
            onClick={() =>
              setExpanded(!expanded)
            }
            className="
              flex items-center gap-2
              bg-amber-400
              hover:bg-amber-300
              text-black
              px-4 py-2
              rounded-full
              text-sm
              font-semibold
              transition
            "
          >

            {expanded
              ? "Close"
              : "View"}

            {expanded ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}

          </button>

        </div>

        {/* EXPANDED SECTION */}
        {expanded && (

          <div className="mt-5 animate-in fade-in duration-300">

            {/* DESCRIPTION */}
            <p className="text-zinc-300 text-sm leading-relaxed">

              {description}

            </p>

            {/* NOTES */}
            {notes.length > 0 && (

              <div className="flex flex-wrap gap-2 mt-4">

                {notes.map(
                  (
                    note,
                    index
                  ) => (

                    <span
                      key={`${note}-${index}`}
                      className="
                        text-xs
                        bg-zinc-800
                        border border-zinc-700
                        text-zinc-300
                        px-3 py-1
                        rounded-full
                      "
                    >

                      {note}

                    </span>

                  )
                )}

              </div>

            )}

            {/* AVAILABLE SIZES */}
            {decants.length > 0 && (

              <div className="flex flex-wrap gap-2 mt-5">

                {decants.map(
                  (
                    decant,
                    index
                  ) => (

                    <div
                      key={`${decant.size}-${index}`}
                      className="
                        px-3 py-1
                        rounded-full
                        bg-amber-400/10
                        border border-amber-400/20
                        text-amber-300
                        text-xs
                      "
                    >

                      {decant.size}
                      {" • "}
                      ₹{decant.price}

                    </div>

                  )
                )}

              </div>

            )}

            {/* ORDER BUTTON */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-5
                block
                w-full
                text-center
                bg-green-500
                hover:bg-green-400
                text-black
                py-3
                rounded-2xl
                font-semibold
                transition
              "
            >
              Order on WhatsApp
            </a>

          </div>

        )}

      </div>

    </div>

  );
}