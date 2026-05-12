"use client";

import { motion } from "framer-motion";

const testimonials = [
  "Absolutely luxurious fragrances.",
  "The oud collection is incredible.",
  "Premium quality and long lasting.",
  "Best Arabic fragrances in town.",
];

export default function Testimonials() {
  return (
    <section className="py-32 overflow-hidden">

      <h2 className="text-5xl font-bold text-center mb-20">
        What Customers Say
      </h2>

      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="flex gap-8 whitespace-nowrap"
      >

        {[...testimonials, ...testimonials].map(
          (testimonial, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 px-10 py-8 rounded-3xl min-w-[400px]"
            >
              <p className="text-xl text-zinc-300">
                {testimonial}
              </p>
            </div>
          )
        )}

      </motion.div>
    </section>
  );
}