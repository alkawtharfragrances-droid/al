"use client";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Gold Glow */}
      <div
        className="
          absolute
          top-[10%]
          left-[20%]
          w-[500px]
          h-[500px]
          bg-yellow-500/10
          blur-[140px]
          rounded-full
          animate-pulse
        "
      />

      {/* Red Glow */}
      <div
        className="
          absolute
          bottom-[10%]
          right-[10%]
          w-[500px]
          h-[500px]
          bg-red-500/10
          blur-[160px]
          rounded-full
          animate-pulse
        "
      />

      {/* White Glow */}
      <div
        className="
          absolute
          top-[50%]
          left-[50%]
          w-[400px]
          h-[400px]
          bg-white/5
          blur-[120px]
          rounded-full
        "
      />

    </div>
  );
}