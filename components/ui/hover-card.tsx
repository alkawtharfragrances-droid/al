"use client";

import { motion } from "framer-motion";

export default function HoverCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.35,
      }}
      className="relative"
    >

      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-yellow-500/30 via-transparent to-yellow-500/30 blur-xl opacity-0 hover:opacity-100 transition duration-500" />

      <div className="relative">
        {children}
      </div>

    </motion.div>
  );
}