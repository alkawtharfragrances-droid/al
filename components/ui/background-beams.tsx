"use client";

import { motion } from "framer-motion";

export const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/20 blur-3xl rounded-full"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/10 blur-3xl rounded-full"
      />

    </div>
  );
};