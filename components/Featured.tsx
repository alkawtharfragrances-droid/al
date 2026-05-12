"use client";

export default function Featured() {
  return (
    <section className="relative pt-20 md:pt-28 pb-40 px-6 max-w-7xl mx-auto overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-yellow-500/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className="relative z-20 text-center mb-12 md:mb-20">

        <p className="uppercase tracking-[10px] text-yellow-500 mb-6">
          Featured Collection
        </p>

        <h2
          className="
            text-5xl sm:text-6xl md:text-8xl
            font-bold leading-none
            text-white
            drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]
          "
        >
          Signature Fragrances
        </h2>

      </div>

      {/* Editorial Layout */}
      <div className="relative md:h-[950px] flex flex-col gap-8 md:block">

        {/* MAIN CARD */}
        <div
          className="
            relative md:absolute
            left-1/2 md:-translate-x-1/2
            top-0
            w-full md:w-[680px]
            h-[420px] md:h-[520px]
            rounded-[40px]
            overflow-hidden
            border border-white/10
            backdrop-blur-xl
            bg-white/5
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            group
            hover:-translate-y-2
            transition duration-500
          "
        >

          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1974&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8 z-10">

            <h3 className="text-3xl md:text-5xl font-bold">
              Oud Royal
            </h3>

            <div className="flex items-center gap-6 mt-6 flex-wrap">

              <span className="text-2xl md:text-3xl text-yellow-500 font-bold">
                ₹2499
              </span>

              <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold transition">
                Order
              </button>

            </div>

          </div>

        </div>

        {/* TOP RIGHT */}
        <div
          className="
            relative md:absolute
            right-0 md:top-28
            w-full md:w-[320px]
            h-[260px]
            rounded-[36px]
            overflow-hidden
            border border-white/10
            backdrop-blur-xl
            bg-white/5
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            group
            hover:-translate-y-2
            transition duration-500
          "
        >

          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1974&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-6 left-6">

            <h3 className="text-3xl font-bold">
              Midnight Noir
            </h3>

          </div>

        </div>

        {/* LOWER LEFT */}
        <div
          className="
            relative md:absolute
            left-0 md:top-[430px]
            w-full md:w-[340px]
            h-[320px]
            rounded-[36px]
            overflow-hidden
            border border-white/10
            backdrop-blur-xl
            bg-white/5
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            group
            hover:-translate-y-2
            transition duration-500
          "
        >

          <img
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1974&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-6 left-6">

            <h3 className="text-3xl font-bold">
              Desert Elixir
            </h3>

          </div>

        </div>

        {/* BOTTOM BANNER */}
        <div
          className="
            relative md:absolute
            right-0 md:top-[520px]
            w-full md:w-[760px]
            h-[260px]
            rounded-[40px]
            overflow-hidden
            border border-white/10
            backdrop-blur-xl
            bg-white/5
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            group
            hover:-translate-y-2
            transition duration-500
          "
        >

          <img
            src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1974&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />

          <div className="absolute left-10 top-1/2 -translate-y-1/2">

            <h3 className="text-3xl md:text-5xl font-bold">
              Amber Essence
            </h3>

            <div className="flex items-center gap-6 mt-6 flex-wrap">

              <span className="text-2xl md:text-3xl text-yellow-500 font-bold">
                ₹3599
              </span>

              <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold transition">
                Order
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}