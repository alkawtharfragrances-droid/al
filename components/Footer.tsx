import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        relative
        mt-40
        border-t border-white/10
        overflow-hidden
      "
    >

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        {/* Top Grid */}
        <div
          className="
            grid
            md:grid-cols-4
            gap-16
          "
        >

          {/* Brand */}
          <div className="md:col-span-2">

            <div
              className="
                inline-flex
                px-5 py-2
                rounded-full
                border border-yellow-500/20
                bg-yellow-500/10
                backdrop-blur-xl
                text-yellow-500
                uppercase
                tracking-[6px]
                text-sm
                mb-8
              "
            >
              Al-Kawthar
            </div>

            <h2 className="text-5xl font-bold leading-tight max-w-xl">
              Crafted for atmosphere,
              memory, and presence.
            </h2>

            <p className="mt-8 text-zinc-400 leading-relaxed max-w-lg text-lg">
              A cinematic fragrance experience inspired by timeless luxury,
              elegant compositions, and unforgettable impressions.
            </p>

          </div>

          {/* Navigation */}
          <div>

            <h3 className="text-xl font-semibold mb-8">
              Navigation
            </h3>

            <div className="flex flex-col gap-5 text-zinc-400">

              <Link
                href="/"
                className="hover:text-yellow-500 transition"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="hover:text-yellow-500 transition"
              >
                Products
              </Link>

              <Link
                href="/about"
                className="hover:text-yellow-500 transition"
              >
                About
              </Link>

            </div>

          </div>

          {/* Connect */}
          <div>

            <h3 className="text-xl font-semibold mb-8">
              Connect
            </h3>

            <div className="flex flex-col gap-5 text-zinc-400">

              <a
                href="https://wa.me/917006599020"
                target="_blank"
                className="hover:text-yellow-500 transition"
              >
                WhatsApp
              </a>

              <a
                href="#"
                className="hover:text-yellow-500 transition"
              >
                Instagram
              </a>

              <a
                href="https://zetalinked.vercel.app"
                className="hover:text-yellow-500 transition"
              >
                Developer Website

              </a>

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="my-16 h-px bg-white/10" />

        {/* Bottom */}
        <div
          className="
            flex
            flex-col md:flex-row
            items-center
            justify-between
            gap-6
          "
        >

          <p className="text-zinc-500 text-sm">
            © 2026 Al-Kawthar. All rights reserved.
          </p>

          <a
  href="https://zetalinked.vercel.app"
  className="
    text-zinc-500
    text-sm
    hover:text-yellow-500
    transition
  "
        >
  Crafted with cinematic luxury by{" "}
  <span className="text-yellow-500">
    Ahanger Labs
  </span>
</a>

        </div>

      </div>

    </footer>
  );
}