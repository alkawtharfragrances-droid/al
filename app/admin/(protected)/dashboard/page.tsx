"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type Product = {
  id: string;

  name: string;
  price: string;
  image: string;
  description: string;

  notes: string[];

  category: string;

  featured: boolean;
};

const categories = [
  "Designer",
  "Middle Eastern",
  "Niche",
  "Attars",
  "Bakhoor & Oils",
  "Decants / Partials",
];

export default function AdminPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [category, setCategory] =
    useState(categories[0]);

  const [featured, setFeatured] =
    useState(false);

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  // Edit States
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editPrice, setEditPrice] =
    useState("");

  const [editDescription, setEditDescription] =
    useState("");

  const [editFeatured, setEditFeatured] =
    useState(false);

  // Fetch Products
  const fetchProducts = async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "products")
        );

      const fetchedProducts =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

      setProducts(fetchedProducts);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    fetchProducts();

  }, []);

  // Delete Product
  const handleDelete = async (
    id: string
  ) => {

    try {

      await deleteDoc(
        doc(db, "products", id)
      );

      fetchProducts();

    } catch (error) {

      console.error(error);

      alert("Failed to delete product");
    }
  };

  // Start Editing
  const handleEditStart = (
    product: Product
  ) => {

    setEditingId(product.id);

    setEditPrice(product.price);

    setEditDescription(
      product.description
    );

    setEditFeatured(
      product.featured
    );
  };

  // Update Product
  const handleUpdate = async (
    id: string
  ) => {

    try {

      await updateDoc(
        doc(db, "products", id),
        {
          price: editPrice,

          description:
            editDescription,

          featured:
            editFeatured,
        }
      );

      setEditingId(null);

      fetchProducts();

      alert("Updated!");

    } catch (error) {

      console.error(error);

      alert("Failed to update");
    }
  };

  // Submit Product
  const handleSubmit = async () => {

    try {

      setLoading(true);

      if (!file) {

        alert("Please upload image");

        return;
      }

      // Cloudinary Upload
      const formData =
        new FormData();

      formData.append("file", file);

      formData.append(
        "upload_preset",
        process.env
          .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const response =
        await fetch(
          `https://api.cloudinary.com/v1_1/${
            process.env
              .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      const imageUrl =
        data.secure_url;

      // Product Object
      const perfume = {
        name,
        price,

        image: imageUrl,

        description,

        notes:
          notes
            .split(",")
            .map((note) =>
              note.trim()
            ),

        category,

        featured,
      };

      // Save Product
      await addDoc(
        collection(db, "products"),
        perfume
      );

      alert("Perfume Added!");

      fetchProducts();

      // Reset
      setName("");
      setPrice("");
      setDescription("");
      setNotes("");

      setCategory(categories[0]);

      setFeatured(false);

      setFile(null);

    } catch (error) {

      console.error(error);

      alert("Failed to add perfume");

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="min-h-screen bg-black text-white px-6 py-32">

      <div className="max-w-7xl mx-auto">

        {/* Navigation */}
        <div className="flex gap-4 mb-12">

          <Link
            href="/admin/dashboard"
            className="
              px-6 py-3
              rounded-2xl
              bg-yellow-500
              text-black
              font-semibold
            "
          >
            Products
          </Link>

          <Link
            href="/admin/campaigns"
            className="
              px-6 py-3
              rounded-2xl
              border border-white/10
              bg-white/5
              hover:bg-white/10
              transition
            "
          >
            Campaigns
          </Link>

        </div>

        {/* Header */}
        <div className="mb-20">

          <div
            className="
              inline-flex
              px-5 py-2
              rounded-full
              border border-yellow-500/20
              bg-yellow-500/10
              text-yellow-500
              uppercase
              tracking-[6px]
              text-sm
              mb-6
            "
          >
            Inventory Control
          </div>

          <h1 className="text-6xl font-bold mb-6">
            Admin Dashboard
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl">
            Manage fragrances, collections,
            inventory, and featured products.
          </p>

        </div>

        {/* Form Grid */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left */}
          <div
            className="
              rounded-[36px]
              border border-white/10
              bg-white/5
              backdrop-blur-sm
              p-8
              space-y-6
            "
          >

            {/* Name */}
            <div>

              <label className="block mb-3 text-zinc-400">
                Perfume Name
              </label>

              <input
                type="text"
                placeholder="Royal Oud"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full
                  bg-black/30
                  border border-white/10
                  rounded-2xl
                  px-6 py-5
                  outline-none
                  focus:border-yellow-500
                "
              />

            </div>

            {/* Price */}
            <div>

              <label className="block mb-3 text-zinc-400">
                Price
              </label>

              <input
                type="text"
                placeholder="₹2499"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="
                  w-full
                  bg-black/30
                  border border-white/10
                  rounded-2xl
                  px-6 py-5
                  outline-none
                  focus:border-yellow-500
                "
              />

            </div>

            {/* Category */}
            <div>

              <label className="block mb-3 text-zinc-400">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-black/30
                  border border-white/10
                  rounded-2xl
                  px-6 py-5
                  outline-none
                  focus:border-yellow-500
                "
              >

                {categories.map((cat) => (

                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>

                ))}

              </select>

            </div>

            {/* Notes */}
            <div>

              <label className="block mb-3 text-zinc-400">
                Fragrance Notes
              </label>

              <input
                type="text"
                placeholder="Oud, Rose, Amber"
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                className="
                  w-full
                  bg-black/30
                  border border-white/10
                  rounded-2xl
                  px-6 py-5
                  outline-none
                  focus:border-yellow-500
                "
              />

            </div>

          </div>

          {/* Right */}
          <div
            className="
              rounded-[36px]
              border border-white/10
              bg-white/5
              backdrop-blur-sm
              p-8
              space-y-6
            "
          >

            {/* Upload */}
            <div>

              <label className="block mb-3 text-zinc-400">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  if (
                    e.target.files?.[0]
                  ) {

                    setFile(
                      e.target.files[0]
                    );
                  }

                }}
                className="
                  w-full
                  bg-black/30
                  border border-white/10
                  rounded-2xl
                  px-6 py-5
                  outline-none
                "
              />

            </div>

            {/* Preview */}
            {file && (

              <div
                className="
                  overflow-hidden
                  rounded-[30px]
                  h-[280px]
                  border border-white/10
                "
              >

                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="
                    w-full h-full
                    object-cover
                  "
                />

              </div>

            )}

            {/* Description */}
            <div>

              <label className="block mb-3 text-zinc-400">
                Description
              </label>

              <textarea
                placeholder="A deep smoky oud with warm amber..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                rows={5}
                className="
                  w-full
                  bg-black/30
                  border border-white/10
                  rounded-2xl
                  px-6 py-5
                  outline-none
                  focus:border-yellow-500
                "
              />

            </div>

            {/* Featured */}
            <div
              className="
                flex items-center justify-between
                rounded-2xl
                border border-white/10
                bg-black/20
                px-6 py-5
              "
            >

              <div>

                <h3 className="font-semibold">
                  Featured Fragrance
                </h3>

                <p className="text-zinc-400 text-sm mt-1">
                  Show on homepage collections.
                </p>

              </div>

              <input
                type="checkbox"
                checked={featured}
                onChange={(e) =>
                  setFeatured(
                    e.target.checked
                  )
                }
                className="w-5 h-5"
              />

            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                w-full
                bg-yellow-500
                hover:bg-yellow-400
                disabled:opacity-50
                text-black
                py-5
                rounded-2xl
                font-semibold
                transition
              "
            >

              {loading
                ? "Uploading..."
                : "Add Fragrance"}

            </button>

          </div>

        </div>

        {/* Inventory */}
        <div className="mt-32">

          <div className="mb-10">

            <h2 className="text-5xl font-bold mb-4">
              Inventory
            </h2>

            <p className="text-zinc-400">
              Manage uploaded fragrances.
            </p>

          </div>

          <div className="space-y-6">

            {products.map((product) => (

              <div
                key={product.id}
                className="
                  flex flex-col lg:flex-row
                  lg:items-center
                  justify-between
                  gap-6
                  rounded-[30px]
                  border border-white/10
                  bg-white/5
                  backdrop-blur-sm
                  p-6
                "
              >

                {/* Left */}
                <div className="flex gap-6">

                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-28 h-28
                      rounded-2xl
                      object-cover
                    "
                  />

                  {/* Info */}
                  <div>

                    <p
                      className="
                        text-yellow-500
                        uppercase
                        tracking-[3px]
                        text-sm
                        mb-2
                      "
                    >
                      {product.category}
                    </p>

                    <h3 className="text-2xl font-bold">
                      {product.name}
                    </h3>

                    <p className="text-zinc-400 mt-2">
                      ₹{product.price}
                    </p>

                    {/* Notes */}
                    <div className="flex gap-2 flex-wrap mt-4">

                      {product.notes?.map((note) => (

                        <span
                          key={note}
                          className="
                            px-3 py-1
                            rounded-full
                            bg-black/30
                            border border-white/10
                            text-xs
                            text-zinc-300
                          "
                        >
                          {note}
                        </span>

                      ))}

                    </div>

                  </div>

                </div>

                {/* Right */}
                <div className="flex flex-col gap-4 min-w-[240px]">

                  {/* Edit Mode */}
                  {editingId === product.id ? (

                    <>

                      {/* Price */}
                      <input
                        type="text"
                        value={editPrice}
                        onChange={(e) =>
                          setEditPrice(
                            e.target.value
                          )
                        }
                        className="
                          bg-black/30
                          border border-white/10
                          rounded-xl
                          px-4 py-3
                          outline-none
                        "
                      />

                      {/* Description */}
                      <textarea
                        rows={4}
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(
                            e.target.value
                          )
                        }
                        className="
                          bg-black/30
                          border border-white/10
                          rounded-xl
                          px-4 py-3
                          outline-none
                        "
                      />

                      {/* Featured */}
                      <label className="flex items-center gap-3 text-sm text-zinc-300">

                        <input
                          type="checkbox"
                          checked={editFeatured}
                          onChange={(e) =>
                            setEditFeatured(
                              e.target.checked
                            )
                          }
                        />

                        Featured

                      </label>

                      {/* Save */}
                      <button
                        onClick={() =>
                          handleUpdate(
                            product.id
                          )
                        }
                        className="
                          bg-yellow-500
                          hover:bg-yellow-400
                          text-black
                          px-5 py-3
                          rounded-2xl
                          font-semibold
                          transition
                        "
                      >
                        Save Changes
                      </button>

                    </>

                  ) : (

                    <>

                      {/* Featured */}
                      {product.featured && (

                        <div
                          className="
                            px-4 py-2
                            rounded-full
                            bg-yellow-500
                            text-black
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[3px]
                            text-center
                          "
                        >
                          Featured
                        </div>

                      )}

                      {/* Edit */}
                      <button
                        onClick={() =>
                          handleEditStart(
                            product
                          )
                        }
                        className="
                          bg-blue-500/20
                          hover:bg-blue-500
                          border border-blue-500/30
                          text-blue-400
                          hover:text-white
                          px-5 py-3
                          rounded-2xl
                          transition
                        "
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                        className="
                          bg-red-500/20
                          hover:bg-red-500
                          border border-red-500/30
                          text-red-400
                          hover:text-white
                          px-5 py-3
                          rounded-2xl
                          transition
                        "
                      >
                        Delete
                      </button>

                    </>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );
}