export default function Lamp() {
  return (
    <section className="relative py-40 text-center overflow-hidden">

      <div className="absolute inset-0 flex justify-center">
        <div className="w-[500px] h-[500px] bg-yellow-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10">

        <h2 className="text-6xl font-bold">
          Discover Your Signature Scent
        </h2>

        <p className="mt-6 text-zinc-400 text-xl">
          Elevate your presence with luxury fragrances.
        </p>

        <a
          href="https://wa.me/917006599020?text=I'm interested in exploring the fragrance collection at Al-Kawthar"
          target="_blank"
          className="inline-block mt-10 bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold"
        >
          Order on WhatsApp
        </a>

      </div>
    </section>
  );
}