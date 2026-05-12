"use client";

import { motion } from "framer-motion";

export default function TextGenerate({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex flex-wrap justify-center">
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
          }}
          className="mr-4"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}