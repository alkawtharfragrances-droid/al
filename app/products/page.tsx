
"use client";


const perfumes = [
  {
    name: "Midnight Noir",
    price: "₹3199",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1974&auto=format&fit=crop",
    category: "Oud",
    notes: ["Smoke", "Leather", "Dark Woods"],
    mood: "Mysterious & Deep",
  },
  {
    name: "Amber Essence",
    price: "₹2899",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1974&auto=format&fit=crop",
    category: "Amber",
    notes: ["Amber", "Vanilla", "Warm Resin"],
    mood: "Warm & Addictive",
  },
  {
    name: "Desert Elixir",
    price: "₹2799",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop",
    category: "Woody",
    notes: ["Sandalwood", "Dry Earth", "Cedar"],
    mood: "Elegant & Grounded",
  },
  {
    name: "Royal Oud",
    price: "₹3499",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1974&auto=format&fit=crop",
    category: "Oriental",
    notes: ["Oud", "Spices", "Incense"],
    mood: "Regal & Atmospheric",
  },
];

export default function ProductsPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden px-6 py-32">

      {/* Ambient Glow */}
      <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-yellow-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-red-500/10 blur-[160px] rounded-full" />

      <section className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center">

          {/* Al-Kawthar Tag */}
          <div className="flex justify-center mb-6">

            <div
              className="
                px-6 py-2
                rounded-full
                border border-yellow-500/20
                bg-yellow-500/10
                backdrop-blur-xl
                text-yellow-500
                uppercase
                tracking-[6px]
                text-sm
                shadow-[0_0_30px_rgba(234,179,8,0.15)]
              "
            >
              Al-Kawthar
            </div>

          </div>

          <p className="uppercase tracking-[10px] text-yellow-500 mb-4">
            Curated Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-bold">
            Explore Fragrances
          </h1>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto">
            Discover refined compositions crafted for atmosphere,
            elegance, and unforgettable presence.
          </p>

        </div>

        {/* Seasonal Collections */}
        <div className="mt-24">

          <div className="text-center mb-12">

            <p className="uppercase tracking-[10px] text-yellow-500 mb-4">
              Seasonal Collections
            </p>

            <h2 className="text-4xl md:text-6xl font-bold">
              Featured Campaigns
            </h2>

          </div>

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-4
              gap-8
            "
          >

            {[
              {
                name: "Summer Sale",
                image:
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop",
              },
              {
                name: "Winter Sale",
                image:
                  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop",
              },
              {
                name: "Fall Collection",
                image:
                  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1974&auto=format&fit=crop",
              },
              {
                name: "Friday Special",
                image:
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1974&auto=format&fit=crop",
              },
            ].map((sale) => (

              <div
                key={sale.name}
                className="
                  group
                  relative
                  h-[340px]
                  rounded-[40px]
                  overflow-hidden
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  hover:-translate-y-2
                  transition duration-500
                  shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                "
              >

                {/* Image */}
                <img
                  src={sale.image}
                  alt={sale.name}
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/20
                    to-transparent
                  "
                />

                {/* Glow */}
                <div
                  className="
                    absolute inset-0
                    bg-yellow-500/0
                    group-hover:bg-yellow-500/10
                    transition duration-500
                  "
                />

                {/* Content */}
                <div className="absolute bottom-8 left-8">

                  <p className="uppercase tracking-[6px] text-yellow-500 text-sm mb-3">
                    Limited Edition
                  </p>

                  <h3 className="text-4xl font-bold">
                    {sale.name}
                  </h3>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Categories */}
        <div className="mt-24">

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-6
            "
          >

            {[
              {
                name: "Oud",
                image:
                  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop",
              },
              {
                name: "Amber",
                image:
                  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1974&auto=format&fit=crop",
              },
              {
                name: "Fresh",
                image:
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop",
              },
              {
                name: "Woody",
                image:
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1974&auto=format&fit=crop",
              },
            ].map((category) => (

              <button
                key={category.name}
                className="
                  group
                  relative
                  h-[180px]
                  w-[260px]
                  rounded-[999px]
                  overflow-hidden
                  border border-white/10
                  backdrop-blur-xl
                  bg-white/5
                  hover:-translate-y-2
                  transition duration-500
                  shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                "
              >

                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-black/80
                    via-black/20
                    to-black/40
                  "
                />

                {/* Glow */}
                <div
                  className="
                    absolute inset-0
                    bg-yellow-500/0
                    group-hover:bg-yellow-500/10
                    transition duration-500
                  "
                />

                {/* Content */}
                <div
                  className="
                    absolute inset-0
                    flex items-center justify-center
                  "
                >

                  <p
                    className="
                      text-3xl md:text-4xl
                      font-bold
                      text-white
                      tracking-wide
                      drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]
                    "
                  >
                    {category.name}
                  </p>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Product Grid */}
        <div
          className="
            mt-24
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          "
        >

          {perfumes.map((perfume) => (
            <div
              key={perfume.name}
              className={`
                group
                relative
                rounded-[32px]
                overflow-hidden
                border border-white/10
                backdrop-blur-xl
                hover:-translate-y-2
                transition duration-500

                ${
                  perfume.category === "Oud"
                    ? "bg-amber-900/10"
                    : perfume.category === "Amber"
                    ? "bg-yellow-700/10"
                    : perfume.category === "Woody"
                    ? "bg-lime-900/10"
                    : "bg-purple-900/10"
                }
              `}
            >

              {/* Image */}
              <div className="h-[420px] overflow-hidden">

                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="
                    w-full h-full
                    object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

              </div>

              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/20
                  to-transparent
                "
              />

              {/* Content */}
              <div
                className="
                  absolute bottom-0 left-0
                  w-full
                  p-6
                "
              >

                <p className="text-yellow-500 text-sm mb-2 tracking-[4px] uppercase">
                  {perfume.category}
                </p>

                <h2 className="text-3xl font-bold">
                  {perfume.name}
                </h2>

                {/* Hover Reveal */}
                <div
                  className="
                    mt-4
                    opacity-0
                    translate-y-4
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition duration-500
                  "
                >

                  <p className="text-zinc-300 text-sm mb-3">
                    {perfume.mood}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {perfume.notes.map((note) => (
                      <span
                        key={note}
                        className="
                          px-3 py-1
                          rounded-full
                          bg-white/10
                          backdrop-blur-xl
                          text-xs
                          border border-white/10
                        "
                      >
                        {note}
                      </span>
                    ))}

                  </div>

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-2xl font-semibold text-yellow-500">
                    {perfume.price}
                  </span>

                  <button
                    className="
                      bg-yellow-500
                      hover:bg-yellow-400
                      text-black
                      px-5 py-3
                      rounded-full
                      font-semibold
                      transition duration-300
                    "
                  >
                    Order
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}