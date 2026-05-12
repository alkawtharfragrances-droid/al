"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
};

export default function FragranceParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.random() * 18 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 12,
    }));

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="
            absolute
            rounded-full
            bg-yellow-300/25
            blur-lg
          "
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 20, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

    </div>
  );
}