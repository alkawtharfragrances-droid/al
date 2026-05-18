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

  // GET MAX DECANT AUTOMATICALLY
  const maxDecant =
    decants.length > 0
      ? [...decants].sort(
          (a, b) => {

            const aValue =
              parseInt(
                a.size.replace(/\D/g, "")
              ) || 0;

            const bValue =
              parseInt(
                b.size.replace(/\D/g, "")
              ) || 0;

            return bValue - aValue;

          }
        )[0]
      : null;

  const message =
    `Hello, I want to order ${name} ${
      maxDecant
        ? `(${maxDecant.size})`
        : ""
    } for ₹${
      maxDecant?.price || 0
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

        {/* HIGHLIGHTED FULL BOTTLE */}

        {maxDecant && (

          <div
            className="
              mt-4

              flex
              items-center
              justify-between

              rounded-2xl

              border
              border-amber-400/20

              bg-amber-400/10

              px-4
              py-3
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-amber-400
                  mb-1
                "
              >
                Full Bottle
              </p>

              <p
                className="
                  text-sm
                  text-white
                  font-medium
                "
              >
                {maxDecant.size}
              </p>

            </div>

            <div
              className="
                text-xl
                font-bold
                text-amber-400
              "
            >
              ₹{maxDecant.price}
            </div>

          </div>

        )}

        {/* VIEW BUTTON */}

        <div className="flex justify-end mt-4">

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
                    ) => {

                      const isMax =
                        decant.size ===
                        maxDecant?.size;

                      return (

                        <div
                          key={index}
                          className={`
                            flex
                            items-center
                            justify-between

                            rounded-2xl
                            px-4
                            py-3

                            ${
                              isMax
                                ? `
                                  bg-amber-400/10
                                  border
                                  border-amber-400/20
                                `
                                : `
                                  bg-zinc-800
                                `
                            }
                          `}
                        >

                          <span
                            className={`
                              text-sm

                              ${
                                isMax
                                  ? "text-amber-400 font-semibold"
                                  : "text-zinc-300"
                              }
                            `}
                          >
                            {decant.size}
                          </span>

                          <span
                            className={`
                              text-sm
                              font-semibold

                              ${
                                isMax
                                  ? "text-amber-400"
                                  : "text-white"
                              }
                            `}
                          >
                            ₹{decant.price}
                          </span>

                        </div>

                      );

                    }
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