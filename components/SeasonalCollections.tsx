"use client";
import { motion } from "framer-motion";
export default function SeasonalCollections() {
  return (
    <section className="relative py-28 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="uppercase tracking-[10px] text-yellow-500 mb-4">
            Seasonal Collections
          </p>

          <h2 className="text-5xl md:text-7xl font-bold">
            Featured Campaigns
          </h2>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto">
            Curated selections inspired by atmosphere, season, and occasion.
          </p>

        </div>

        {/* Cards */}
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          {[
            {
              name: "Summer Sale",
              image:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop",
            },
            {
              name: "Winter Sale",
              image:
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop",
            },
            {
              name: "Fall Collection",
              image:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1974&auto=format&fit=crop",
            },
            {
              name: "Friday Special",
              image:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1974&auto=format&fit=crop",
            },
          ].map((sale,index) => (

            <motion.div
            key={sale.name}
            initial={{
              opacity: 0,
              filter: "blur(8px)",
                 }}
                whileInView={{
                opacity: 1,
                 filter: "blur(0px)",
                }}
                     transition={{
                 duration: 0.8,
                 delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                     }}
                 viewport={{ once: true }}
                 className="
                  group
                 relative
                 h-[340px]
                 rounded-[40px]
                 overflow-hidden
                 border border-white/10
                 bg-white/5
                 backdrop-blur-sm
                 hover:-translate-y-2
                  transition duration-500
                  shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                 "
                >

              {/* Image */}
              <img
                src={sale.image}
                alt={sale.name}
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
                  from-black
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
                  absolute bottom-8 left-8
                "
              >

                <p className="uppercase tracking-[6px] text-yellow-500 text-sm mb-3">
                  Limited Edition
                </p>

                <h3 className="text-4xl font-bold">
                  {sale.name}
                </h3>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}