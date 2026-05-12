"use client";

interface ProductProps {
  name: string;
  image: string;
  price: number;
  description: string;
}

export default function ProductCard({
  name,
  image,
  price,
  description,
}: ProductProps) {

  const whatsappNumber = "919999999999";

  const message = `Hello, I want to order ${name} for ₹${price}`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-white transition">
      <img
        src={image}
        alt={name}
        className="h-72 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-semibold">{name}</h2>

        <p className="text-zinc-400 mt-2 text-sm">
          {description}
        </p>

        <div className="flex items-center justify-between mt-5">
          <span className="text-xl font-bold">₹{price}</span>

          <a
            href={whatsappLink}
            target="_blank"
            className="bg-green-500 px-4 py-2 rounded-xl text-black font-semibold"
          >
            Order
          </a>
        </div>
      </div>
    </div>
  );
}