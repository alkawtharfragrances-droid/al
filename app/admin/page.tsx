"use client";

import { useState } from "react";


export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const perfume = {
      name,
      price,
      image,
      description,
    };

    console.log(perfume);

    alert("Perfume Added!");

    setName("");
    setPrice("");
    setImage("");
    setDescription("");
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

      <div className="max-w-3xl mx-auto">

        <div className="mb-16">

          <p className="uppercase tracking-[10px] text-yellow-500 mb-4">
            Dashboard
          </p>

          <h1 className="text-6xl font-bold">
            Admin Panel
          </h1>

        </div>

        <div className="space-y-6">

          {/* Name */}
          <input
            type="text"
            placeholder="Perfume Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full bg-zinc-900 border border-white/10
              rounded-2xl px-6 py-5 outline-none
              focus:border-yellow-500
            "
          />

          {/* Price */}
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="
              w-full bg-zinc-900 border border-white/10
              rounded-2xl px-6 py-5 outline-none
              focus:border-yellow-500
            "
          />

          {/* Image */}
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="
              w-full bg-zinc-900 border border-white/10
              rounded-2xl px-6 py-5 outline-none
              focus:border-yellow-500
            "
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="
              w-full bg-zinc-900 border border-white/10
              rounded-2xl px-6 py-5 outline-none
              focus:border-yellow-500
            "
          />

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="
              bg-yellow-500 hover:bg-yellow-400
              text-black px-8 py-4 rounded-full
              font-semibold transition
            "
          >
            Add Perfume
          </button>

        </div>

      </div>

    </main>
  );
}