import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find(
    (p) => p.slug === slug
  );

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="relative h-[90vh] overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex items-center px-6">

          <div className="max-w-3xl">

            <p className="uppercase tracking-[10px] text-yellow-500 mb-6">
              Luxury Fragrance
            </p>

            <h1 className="text-6xl md:text-8xl font-bold">
              {product.name}
            </h1>

            <p className="mt-8 text-xl text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-10 flex items-center gap-6 flex-wrap">

              <span className="text-4xl text-yellow-500 font-bold">
                {product.price}
              </span>

              <a
                href={`https://wa.me/919999999999?text=I'm interested in ${product.name}`}
                target="_blank"
                className="
                  bg-yellow-500 hover:bg-yellow-400
                  text-black px-8 py-4 rounded-full
                  font-semibold transition
                "
              >
                Order on WhatsApp
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* Details */}
      <section className="max-w-7xl mx-auto px-6 py-32">

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-8">
            <h3 className="text-3xl font-bold mb-6">
              Top Notes
            </h3>

            <div className="space-y-3 text-zinc-300">
              {product.notes.top.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-8">
            <h3 className="text-3xl font-bold mb-6">
              Middle Notes
            </h3>

            <div className="space-y-3 text-zinc-300">
              {product.notes.middle.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-8">
            <h3 className="text-3xl font-bold mb-6">
              Base Notes
            </h3>

            <div className="space-y-3 text-zinc-300">
              {product.notes.base.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-zinc-900 rounded-[32px] p-8">
            <h3 className="text-2xl font-bold mb-4">
              Longevity
            </h3>

            <p className="text-zinc-300">
              {product.longevity}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-[32px] p-8">
            <h3 className="text-2xl font-bold mb-4">
              Projection
            </h3>

            <p className="text-zinc-300">
              {product.projection}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-[32px] p-8">
            <h3 className="text-2xl font-bold mb-4">
              Vibe
            </h3>

            <p className="text-zinc-300">
              {product.vibe}
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}