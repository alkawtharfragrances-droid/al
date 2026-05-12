"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Midnight Oud",
    subtitle: "Dark • Smoky • Atmospheric",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop",
    className:
      "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
  },

  {
    title: "Amber Essence",
    subtitle: "Warm • Golden • Addictive",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1974&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },

  {
    title: "Fresh Citrus",
    subtitle: "Bright • Crisp • Airy",
    image:
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=1974&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },

  {
    title: "Royal Leather",
    subtitle: "Elegant • Smooth • Deep",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1974&auto=format&fit=crop",
    className:
      "col-span-1 md:col-span-2 row-span-1",
  },

  {
    title: "Desert Elixir",
    subtitle: "Dry Woods • Sandalwood • Earth",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },
];

export default function BentoGrid() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-orange-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">

          <div
            className="
              inline-flex
              px-5 py-2
              rounded-full
              border border-yellow-500/20
              bg-yellow-500/10
              text-yellow-500
              uppercase
              tracking-[6px]
              text-sm
              mb-6
            "
          >
            Curated Collection
          </div>

          <h2 className="text-5xl md:text-7xl font-bold">
            Discover Luxury
          </h2>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto">
            A cinematic collection of refined fragrances inspired by mood,
            atmosphere, memory, and timeless elegance.
          </p>

        </div>

        {/* Bento Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            auto-rows-[260px]
          "
        >

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className={`
                group
                relative
                overflow-hidden
                rounded-[36px]
                border border-white/10
                bg-black/20
                backdrop-blur-sm
                ${item.className}
              `}
            >

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                  group-hover:scale-110
                  transition duration-700
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                "
              />

              {/* Glow */}
              <div
                className="
                  absolute inset-0
                  bg-yellow-500/0
                  group-hover:bg-yellow-500/10
                  transition duration-500
                "
              />

              {/* Content */}
              <div
                className="
                  absolute bottom-0 left-0
                  p-8
                  w-full
                "
              >

                <p className="text-yellow-500 uppercase tracking-[4px] text-sm mb-3">
                  Signature Blend
                </p>

                <h3 className="text-3xl md:text-4xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-zinc-300">
                  {item.subtitle}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}