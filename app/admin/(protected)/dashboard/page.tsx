"use client";

import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type Decant = {
  size: string;
  price: string | number;
};

type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  notes: string[];
  category: string;
  featured: boolean;
  decants?: Decant[];
};

export default function DashboardPage() {

  const categories = [
    "Middle Eastern",
    "Designer",
    "Niche",
    "French",
    "Partials",
    "Attar",
    "Bakhoor / Essential Oils",
  ];

  // CREATE
  const [name, setName] =
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

  const [products, setProducts] =
    useState<Product[]>([]);

  const [productSearch, setProductSearch] =
    useState("");

  const [decants, setDecants] =
    useState<Decant[]>([
      {
        size: "",
        price: "",
      },
    ]);

  // EDIT
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [
    showEditModal,
    setShowEditModal,
  ] = useState(false);

  const [editName, setEditName] =
    useState("");

  const [
    editDescription,
    setEditDescription,
  ] = useState("");

  const [editNotes, setEditNotes] =
    useState("");

  const [
    editCategory,
    setEditCategory,
  ] = useState(categories[0]);

  const [
    editFeatured,
    setEditFeatured,
  ] = useState(false);

  const [
    editDecants,
    setEditDecants,
  ] = useState<Decant[]>([
    {
      size: "",
      price: "",
    },
  ]);

  const [
    editFile,
    setEditFile,
  ] = useState<File | null>(null);

  // FETCH
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

      setProducts(
        fetchedProducts.reverse()
      );

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  // FILTERED PRODUCTS
  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          productSearch.toLowerCase()
        )
    );

  // CLOUDINARY
  const uploadImage = async (
    imageFile: File
  ) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      imageFile
    );

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

    return data.secure_url;

  };

  // ADD PRODUCT
  const handleSubmit = async () => {

    try {

      setLoading(true);

      if (!file) {

        alert(
          "Please upload image"
        );

        return;

      }

      const imageUrl =
        await uploadImage(file);

      await addDoc(
        collection(
          db,
          "products"
        ),
        {

          name,

          image: imageUrl,

          description,

          category,

          featured,

          notes:
            notes
              .split(",")
              .map((note) =>
                note.trim()
              )
              .filter(Boolean),

          decants:
            decants.map(
              (item) => ({
                size: item.size,
                price: Number(
                  item.price
                ),
              })
            ),

        }
      );

      alert(
        "Perfume Added!"
      );

      fetchProducts();

      setName("");

      setDescription("");

      setNotes("");

      setCategory(
        categories[0]
      );

      setFeatured(false);

      setFile(null);

      setDecants([
        {
          size: "",
          price: "",
        },
      ]);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to add perfume"
      );

    } finally {

      setLoading(false);

    }

  };

  // DELETE
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

    }

  };

  // EDIT START
  const handleEditStart = (
    product: Product
  ) => {

    setEditingId(product.id);

    setEditName(product.name);

    setEditDescription(
      product.description
    );

    setEditCategory(
      product.category
    );

    setEditFeatured(
      product.featured
    );

    setEditNotes(
      product.notes?.join(", ") || ""
    );

    setEditDecants(
      product.decants?.map(
        (d) => ({
          size: d.size,
          price: String(d.price),
        })
      ) || [
        {
          size: "",
          price: "",
        },
      ]
    );

    setShowEditModal(true);

  };

  // UPDATE
  const handleUpdate = async () => {

    if (!editingId) return;

    try {

      let imageUrl =
        products.find(
          (p) =>
            p.id === editingId
        )?.image || "";

      if (editFile) {

        imageUrl =
          await uploadImage(
            editFile
          );

      }

      await updateDoc(
        doc(
          db,
          "products",
          editingId
        ),
        {

          name: editName,

          image: imageUrl,

          description:
            editDescription,

          category:
            editCategory,

          featured:
            editFeatured,

          notes:
            editNotes
              .split(",")
              .map((note) =>
                note.trim()
              )
              .filter(Boolean),

          decants:
            editDecants.map(
              (item) => ({
                size: item.size,
                price: Number(
                  item.price
                ),
              })
            ),

        }
      );

      setShowEditModal(false);

      setEditingId(null);

      setEditFile(null);

      fetchProducts();

      alert("Updated!");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update"
      );

    }

  };

  return (

    <main className="min-h-screen bg-black text-white px-6 py-32">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-20">

          <h1 className="text-6xl font-bold mb-6">
            Admin Dashboard
          </h1>

          <p className="text-zinc-400">
            Manage your fragrance inventory.
          </p>

        </div>

        {/* ADD FORM */}
        <div
          className="
            rounded-[36px]
            border border-white/10
            bg-white/5
            backdrop-blur-sm
            p-8
            space-y-6
            mb-24
          "
        >

          <input
            type="text"
            placeholder="Perfume Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              w-full
              bg-black/30
              border border-white/10
              rounded-2xl
              px-6 py-5
            "
          />

          <textarea
            placeholder="Description"
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
            "
          />

          <input
            type="text"
            placeholder="Notes separated by commas"
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
            className="
              w-full
              bg-black/30
              border border-white/10
              rounded-2xl
              px-6 py-5
            "
          />

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

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ||
                  null
              )
            }
            className="
              w-full
              border border-white/10
              rounded-2xl
              px-6 py-5
            "
          />

          {/* FEATURED */}
          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
            />

            Featured Product

          </label>

          {/* DECANTS */}
          <div className="space-y-4">

            <p className="text-zinc-400">
              Sizes & Prices
            </p>

            {decants.map(
              (
                decant,
                index
              ) => (

                <div
                  key={index}
                  className="
                    grid
                    grid-cols-2
                    gap-4
                  "
                >

                  <input
                    type="text"
                    placeholder="5ml"
                    value={decant.size}
                    onChange={(e) => {

                      const updated =
                        [...decants];

                      updated[index].size =
                        e.target.value;

                      setDecants(
                        updated
                      );

                    }}
                    className="
                      w-full
                      bg-black/30
                      border border-white/10
                      rounded-2xl
                      px-6 py-5
                    "
                  />

                  <input
                    type="number"
                    placeholder="699"
                    value={decant.price}
                    onChange={(e) => {

                      const updated =
                        [...decants];

                      updated[index].price =
                        e.target.value;

                      setDecants(
                        updated
                      );

                    }}
                    className="
                      w-full
                      bg-black/30
                      border border-white/10
                      rounded-2xl
                      px-6 py-5
                    "
                  />

                </div>

              )
            )}

            <button
              type="button"
              onClick={() =>
                setDecants([
                  ...decants,
                  {
                    size: "",
                    price: "",
                  },
                ])
              }
              className="
                px-5 py-3
                rounded-2xl
                bg-white/10
              "
            >
              + Add Size
            </button>

          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full
              py-5
              rounded-2xl
              bg-yellow-500
              text-black
              font-bold
            "
          >
            {loading
              ? "Uploading..."
              : "Add Product"}
          </button>

        </div>

        {/* PRODUCTS */}
        <section>

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              justify-between
              gap-6
              mb-10
            "
          >

            <h2 className="text-5xl font-bold">
              Added Products
            </h2>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) =>
                setProductSearch(
                  e.target.value
                )
              }
              className="
                w-full
                lg:w-[360px]
                bg-black/30
                border border-white/10
                rounded-2xl
                px-6 py-4
                outline-none
                focus:border-yellow-500
                transition
              "
            />

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {filteredProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="
                    rounded-[36px]
                    overflow-hidden
                    border border-white/10
                    bg-white/5
                  "
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full
                      h-[420px]
                      object-cover
                    "
                  />

                  <div className="p-6">

                    <p className="
                      text-yellow-500
                      uppercase
                      tracking-[4px]
                      text-sm
                      mb-2
                    ">
                      {product.category}
                    </p>

                    <h2 className="text-3xl font-bold mb-4">
                      {product.name}
                    </h2>

                    <div className="
                      flex flex-wrap
                      gap-2 mb-6
                    ">

                      {product.decants?.map(
                        (
                          decant,
                          index
                        ) => (

                          <div
                            key={`${decant.size}-${index}`}
                            className="
                              px-4 py-2
                              rounded-full
                              bg-yellow-500/10
                              border border-yellow-500/20
                              text-yellow-500
                              text-sm
                            "
                          >
                            {decant.size}
                            {" • "}
                            ₹{decant.price}
                          </div>

                        )
                      )}

                    </div>

                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          handleEditStart(
                            product
                          )
                        }
                        className="
                          flex-1
                          py-3
                          rounded-2xl
                          bg-white/10
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                        className="
                          flex-1
                          py-3
                          rounded-2xl
                          bg-red-500
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

      </div>

    </main>

  );

}