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

  categories?: string[];

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
  categories = [],
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

        {/* CATEGORIES */}

        <div className="flex flex-wrap gap-2 mb-3">

          {categories.map(
            (category) => (

              <span
                key={category}
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-amber-400
                  border
                  border-amber-400/20
                  bg-amber-400/10
                  px-3
                  py-1
                  rounded-full
                "
              >
                {category}
              </span>

            )
          )}

        </div>

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

              <div className="mt-5">

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    text-zinc-500
                    mb-3
                  "
                >
                  Notes
                </p>

                <div className="flex flex-wrap gap-2">

                  {notes.map(
                    (note) => (

                      <span
                        key={note}
                        className="
                          px-3 py-2
                          rounded-full
                          bg-zinc-800
                          text-zinc-300
                          text-xs
                        "
                      >
                        {note}
                      </span>

                    )
                  )}

                </div>

              </div>

            )}

            {/* ALL DECANTS */}
            {decants.length > 0 && (

              <div className="mt-6">

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    text-zinc-500
                    mb-3
                  "
                >
                  Available Sizes
                </p>

                <div className="space-y-2">

                  {decants.map(
                    (
                      decant,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                          flex
                          items-center
                          justify-between
                          bg-zinc-800
                          rounded-2xl
                          px-4
                          py-3
                        "
                      >

                        <span className="text-sm text-zinc-300">
                          {decant.size}
                        </span>

                        <span className="text-sm font-semibold text-white">
                          ₹{decant.price}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* WHATSAPP */}
            <a
              href={whatsappLink}
              target="_blank"
              className="
                mt-6
                w-full
                flex
                items-center
                justify-center
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