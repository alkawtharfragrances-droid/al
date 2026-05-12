import Link from "next/link";
import PageTransition from "@/components/PageTransition";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-yellow-500/10 blur-[150px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-red-500/10 blur-[180px] rounded-full" />

      {/* Content */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-24">

        {/* Heading */}
        <div className="text-center">

          <p className="uppercase tracking-[10px] text-yellow-500 mb-6">
            The Philosophy
          </p>

          <h1
            className="
              text-5xl sm:text-6xl md:text-8xl
              font-bold
              leading-none
              text-white
              drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]
            "
          >
            About Al-Kawthar
          </h1>

          <p className="mt-10 text-zinc-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Al-Kawthar is built around the belief that fragrance is more
            than scent — it is atmosphere, memory, identity, and presence.

            Our collections are curated to feel timeless, refined, and deeply expressive.
          </p>

        </div>

        {/* Brand Story */}
        <div
          className="
            mt-24
            grid md:grid-cols-2
            gap-10
            items-center
          "
        >

          {/* Left */}
          <div
            className="
              backdrop-blur-2xl
              bg-white/5
              border border-white/10
              rounded-[40px]
              p-10
              shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            "
          >

            <p className="uppercase tracking-[8px] text-yellow-500 mb-6 text-sm">
              Curated Luxury
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Fragrance As Presence
            </h2>

            <p className="text-zinc-300 leading-relaxed text-lg">
              Every fragrance in the Al-Kawthar collection is chosen to create
              an emotional and atmospheric experience.

              We focus on refined compositions, luxurious accords, and
              unforgettable impressions that remain long after departure.
            </p>

          </div>

          {/* Right Image */}
          <div
            className="
              relative
              rounded-[40px]
              overflow-hidden
              border border-white/10
              shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              h-[500px]
            "
          >

            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop"
              alt="Luxury perfume"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          </div>

        </div>

        {/* Values */}
        <div className="mt-28">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[10px] text-yellow-500 mb-4">
              The Experience
            </p>

            <h2 className="text-4xl md:text-6xl font-bold">
              Crafted With Intention
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div
              className="
                backdrop-blur-2xl
                bg-white/5
                border border-white/10
                rounded-[32px]
                p-8
                hover:-translate-y-2
                transition duration-500
              "
            >

              <h3 className="text-2xl font-bold mb-4">
                Atmosphere
              </h3>

              <p className="text-zinc-300 leading-relaxed">
                Fragrance should create a feeling before a word is spoken.
              </p>

            </div>

            {/* Card 2 */}
            <div
              className="
                backdrop-blur-2xl
                bg-white/5
                border border-white/10
                rounded-[32px]
                p-8
                hover:-translate-y-2
                transition duration-500
              "
            >

              <h3 className="text-2xl font-bold mb-4">
                Presence
              </h3>

              <p className="text-zinc-300 leading-relaxed">
                Luxury lives in subtlety, restraint, and unforgettable impressions.
              </p>

            </div>

            {/* Card 3 */}
            <div
              className="
                backdrop-blur-2xl
                bg-white/5
                border border-white/10
                rounded-[32px]
                p-8
                hover:-translate-y-2
                transition duration-500
              "
            >

              <h3 className="text-2xl font-bold mb-4">
                Identity
              </h3>

              <p className="text-zinc-300 leading-relaxed">
                A fragrance should feel personal, timeless, and deeply expressive.
              </p>

            </div>

          </div>

        </div>

        {/* Developer Credit */}
        <div
          className="
            mt-32
            backdrop-blur-2xl
            bg-white/5
            border border-white/10
            rounded-[40px]
            p-10 md:p-14
            text-center
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
        >

          <p className="uppercase tracking-[10px] text-yellow-500 mb-6 text-sm">
            Digital Experience
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Designed & Developed
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-300 text-lg leading-relaxed">
            The Al-Kawthar digital experience was crafted with a focus on
            cinematic luxury, modern editorial aesthetics, and immersive branding by Ahanger Labs.
          </p>

          <div className="mt-10 flex justify-center flex-wrap gap-4">

            <a
              href="https://zetalinked.vercel.app/"
              target="_blank"
              className="
                bg-yellow-500 hover:bg-yellow-400
                text-black
                px-8 py-4
                rounded-full
                font-semibold
                transition duration-300
                hover:scale-105
              "
            >
              Visit Developer Website
            </a>

            <Link
              href="/"
              className="
                border border-white/20
                bg-white/5
                backdrop-blur-xl
                px-8 py-4
                rounded-full
                hover:bg-white hover:text-black
                transition duration-300
              "
            >
              Return Home
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}