"use client";

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">

      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          w-full h-full
          object-cover
          opacity-35
          scale-110
        "
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* Main Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Luxury Gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-black/20
          via-yellow-500/5
          to-black/40
        "
      />

      {/* Ambient Glow */}
      <div
        className="
          absolute
          top-[10%]
          left-[15%]
          w-[500px]
          h-[500px]
          bg-yellow-500/10
          blur-[160px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-[10%]
          right-[10%]
          w-[500px]
          h-[500px]
          bg-red-500/10
          blur-[180px]
          rounded-full
        "
      />

    </div>
  );
}