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

import {
  Pencil,
  Trash2,
  X,
} from "lucide-react";

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
  categories: string[];
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
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [notes, setNotes] = useState("");
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>([]);
  const [featured, setFeatured] =
    useState(false);
  const [file, setFile] =
    useState<File | null>(null);
  const [loading, setLoading] =
    useState(false);

  // PRODUCTS
  const [products, setProducts] =
    useState<Product[]>([]);

  const [productSearch, setProductSearch] =
    useState("");

  // DECANTS
  const [decants, setDecants] =
    useState<Decant[]>([
      {
        size: "",
        price: "",
      },
    ]);

  // EDITING
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editDescription, setEditDescription] =
    useState("");

  const [editNotes, setEditNotes] =
    useState("");

  const [editCategories, setEditCategories] =
    useState<string[]>([]);

  const [editFeatured, setEditFeatured] =
    useState(false);

  const [editFile, setEditFile] =
    useState<File | null>(null);

  const [editDecants, setEditDecants] =
    useState<Decant[]>([]);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    const snapshot = await getDocs(
      collection(db, "products")
    );

    const fetchedProducts = snapshot.docs.map(
      (doc) => {

        const data = doc.data();

        return {
          id: doc.id,
          ...data,

          categories:
            data.categories ||
            (data.category
              ? [data.category]
              : []),
        };

      }
    ) as Product[];

    setProducts(fetchedProducts.reverse());

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // IMAGE UPLOAD
  const uploadImage = async (
    imageFile: File
  ) => {

    const formData = new FormData();

    formData.append("file", imageFile);

    formData.append(
      "upload_preset",
      process.env
        .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        process.env
          .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return data.secure_url;

  };

  // TOGGLE CATEGORY
  const toggleCategory = (
    category: string,
    currentCategories: string[],
    setter: React.Dispatch<
      React.SetStateAction<string[]>
    >
  ) => {

    if (
      currentCategories.includes(category)
    ) {

      setter(
        currentCategories.filter(
          (c) => c !== category
        )
      );

    } else {

      setter([
        ...currentCategories,
        category,
      ]);

    }

  };

  // ADD PRODUCT
  const handleSubmit = async () => {

    try {

      setLoading(true);

      if (!file) {
        alert("Please upload image");
        return;
      }

      const imageUrl =
        await uploadImage(file);

      await addDoc(
        collection(db, "products"),
        {
          name,

          image: imageUrl,

          description,

          categories:
            selectedCategories,

          featured,

          notes: notes
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

      alert("Perfume Added");

      setName("");
      setDescription("");
      setNotes("");
      setSelectedCategories([]);
      setFeatured(false);
      setFile(null);

      setDecants([
        {
          size: "",
          price: "",
        },
      ]);

      fetchProducts();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  // DELETE
  const handleDelete = async (
    id: string
  ) => {

    await deleteDoc(
      doc(db, "products", id)
    );

    fetchProducts();

  };

  // OPEN EDIT
  const openEdit = (
    product: Product
  ) => {

    setEditingProduct(product);

    setEditName(product.name);

    setEditDescription(
      product.description
    );

    setEditNotes(
      product.notes?.join(", ") || ""
    );

    setEditCategories(
      product.categories || []
    );

    setEditFeatured(
      product.featured
    );

    setEditDecants(
      product.decants || []
    );

  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {

    if (!editingProduct) return;

    try {

      let imageUrl =
        editingProduct.image;

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
          editingProduct.id
        ),
        {
          name: editName,

          description:
            editDescription,

          image: imageUrl,

          categories:
            editCategories,

          featured:
            editFeatured,

          notes: editNotes
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

      alert("Updated");

      setEditingProduct(null);

      fetchProducts();

    } catch (error) {

      console.error(error);

    }

  };

  // FILTER
  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          productSearch.toLowerCase()
        )
    );

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-[1800px] mx-auto">

        {/* HEADER */}

        <div className="mb-14">

          <h1 className="text-5xl font-bold mb-3">
            Admin Dashboard
          </h1>

          <p className="text-zinc-400">
            Manage your fragrances
          </p>

        </div>

        {/* ADD PRODUCT */}

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-8
            mb-16
          "
        >

          <h2 className="text-3xl font-bold mb-8">
            Add Perfume
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">

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
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-6
                py-5
              "
            />

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
                border
                border-white/10
                rounded-2xl
                px-6
                py-5
              "
            />

          </div>

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
              mt-6
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-6
              py-5
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
              mt-6
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-6
              py-5
            "
          />

          {/* CATEGORIES */}

          <div className="mt-8">

            <p className="mb-4 text-zinc-400">
              Categories
            </p>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

              {categories.map(
                (category) => (

                  <label
                    key={category}
                    className="
                      flex
                      items-center
                      gap-3
                      border
                      border-white/10
                      rounded-2xl
                      px-4
                      py-4
                      bg-black/30
                    "
                  >

                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(
                        category
                      )}
                      onChange={() =>
                        toggleCategory(
                          category,
                          selectedCategories,
                          setSelectedCategories
                        )
                      }
                    />

                    <span className="text-sm">
                      {category}
                    </span>

                  </label>

                )
              )}

            </div>

          </div>

          {/* DECANTS */}

          <div className="mt-8">

            <p className="mb-4 text-zinc-400">
              Sizes & Prices
            </p>

            <div className="space-y-4">

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

                        setDecants(updated);

                      }}
                      className="
                        bg-black/30
                        border
                        border-white/10
                        rounded-2xl
                        px-6
                        py-5
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

                        setDecants(updated);

                      }}
                      className="
                        bg-black/30
                        border
                        border-white/10
                        rounded-2xl
                        px-6
                        py-5
                      "
                    />

                  </div>

                )
              )}

            </div>

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
                mt-4
                px-5
                py-3
                rounded-2xl
                bg-white/10
              "
            >
              + Add Size
            </button>

          </div>

          {/* FEATURED */}

          <label className="flex items-center gap-3 mt-8">

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

          {/* BUTTON */}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              mt-8
              bg-yellow-500
              text-black
              px-8
              py-5
              rounded-2xl
              font-bold
            "
          >
            {loading
              ? "Uploading..."
              : "Add Product"}
          </button>

        </div>

        {/* PRODUCTS */}

        <div className="mt-20">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-bold">
                Products
              </h2>

              <p className="text-zinc-500 mt-2">
                Manage existing perfumes
              </p>

            </div>

            <input
              type="text"
              placeholder="Search perfumes..."
              value={productSearch}
              onChange={(e) =>
                setProductSearch(
                  e.target.value
                )
              }
              className="
                w-[320px]
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-6
                py-4
                outline-none
              "
            />

          </div>

          {/* PRODUCTS GRID */}

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              gap-5
            "
          >

            {filteredProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-[28px]
                    overflow-hidden
                  "
                >

                  <div className="relative">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-full
                        h-[220px]
                        object-cover
                      "
                    />

                    {product.featured && (

                      <div
                        className="
                          absolute
                          top-3
                          left-3
                          px-3
                          py-1
                          rounded-full
                          bg-yellow-500
                          text-black
                          text-xs
                          font-semibold
                        "
                      >
                        Featured
                      </div>

                    )}

                  </div>

                  <div className="p-4">

                    {/* CATEGORIES */}

                    <div className="flex flex-wrap gap-2 mb-3">

                      {product.categories?.map(
                        (category) => (

                          <span
                            key={category}
                            className="
                              text-[10px]
                              px-2
                              py-1
                              rounded-full
                              bg-yellow-500/10
                              text-yellow-500
                              border
                              border-yellow-500/20
                            "
                          >
                            {category}
                          </span>

                        )
                      )}

                    </div>

                    {/* NAME */}

                    <h3
                      className="
                        text-lg
                        font-bold
                        mb-3
                        line-clamp-1
                      "
                    >
                      {product.name}
                    </h3>

                    {/* DECANTS */}

                    <div className="space-y-2 mb-5">

                      {product.decants?.map(
                        (
                          decant,
                          index
                        ) => (

                          <div
                            key={index}
                            className="
                              flex
                              items-center
                              justify-between
                              text-sm
                              bg-white/5
                              rounded-xl
                              px-3
                              py-2
                            "
                          >

                            <span>
                              {decant.size}
                            </span>

                            <span className="text-yellow-500 font-semibold">
                              ₹{decant.price}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                    {/* BUTTONS */}

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          openEdit(product)
                        }
                        className="
                          flex-1
                          py-2
                          rounded-xl
                          bg-white/10
                          hover:bg-white/20
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <Pencil size={16} />

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
                          py-2
                          rounded-xl
                          bg-red-500
                          hover:bg-red-600
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <Trash2 size={16} />

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {/* EDIT MODAL */}

      {editingProduct && (

        <div
          className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-sm
            z-50
            overflow-y-auto
            p-10
          "
        >

          <div
            className="
              max-w-4xl
              mx-auto
              bg-zinc-950
              border
              border-white/10
              rounded-[32px]
              p-8
            "
          >

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                Edit Perfume
              </h2>

              <button
                onClick={() =>
                  setEditingProduct(null)
                }
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                <X size={20} />
              </button>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

              <input
                type="text"
                value={editName}
                onChange={(e) =>
                  setEditName(
                    e.target.value
                  )
                }
                className="
                  bg-black/30
                  border
                  border-white/10
                  rounded-2xl
                  px-6
                  py-5
                "
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
                className="
                  border
                  border-white/10
                  rounded-2xl
                  px-6
                  py-5
                "
              />

            </div>

            <textarea
              rows={5}
              value={editDescription}
              onChange={(e) =>
                setEditDescription(
                  e.target.value
                )
              }
              className="
                mt-6
                w-full
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-6
                py-5
              "
            />

            <input
              type="text"
              value={editNotes}
              onChange={(e) =>
                setEditNotes(
                  e.target.value
                )
              }
              className="
                mt-6
                w-full
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-6
                py-5
              "
            />

            {/* EDIT CATEGORIES */}

            <div className="mt-8">

              <p className="mb-4 text-zinc-400">
                Categories
              </p>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

                {categories.map(
                  (category) => (

                    <label
                      key={category}
                      className="
                        flex
                        items-center
                        gap-3
                        border
                        border-white/10
                        rounded-2xl
                        px-4
                        py-4
                        bg-black/30
                      "
                    >

                      <input
                        type="checkbox"
                        checked={editCategories.includes(
                          category
                        )}
                        onChange={() =>
                          toggleCategory(
                            category,
                            editCategories,
                            setEditCategories
                          )
                        }
                      />

                      <span className="text-sm">
                        {category}
                      </span>

                    </label>

                  )
                )}

              </div>

            </div>

            {/* EDIT DECANTS */}

            <div className="mt-8">

              <p className="mb-4 text-zinc-400">
                Sizes & Prices
              </p>

              <div className="space-y-4">

                {editDecants.map(
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
                        value={decant.size}
                        onChange={(e) => {

                          const updated =
                            [...editDecants];

                          updated[index].size =
                            e.target.value;

                          setEditDecants(updated);

                        }}
                        className="
                          bg-black/30
                          border
                          border-white/10
                          rounded-2xl
                          px-6
                          py-5
                        "
                      />

                      <input
                        type="number"
                        value={decant.price}
                        onChange={(e) => {

                          const updated =
                            [...editDecants];

                          updated[index].price =
                            e.target.value;

                          setEditDecants(updated);

                        }}
                        className="
                          bg-black/30
                          border
                          border-white/10
                          rounded-2xl
                          px-6
                          py-5
                        "
                      />

                    </div>

                  )
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  setEditDecants([
                    ...editDecants,
                    {
                      size: "",
                      price: "",
                    },
                  ])
                }
                className="
                  mt-4
                  px-5
                  py-3
                  rounded-2xl
                  bg-white/10
                "
              >
                + Add Size
              </button>

            </div>

            {/* FEATURED */}

            <label className="flex items-center gap-3 mt-8">

              <input
                type="checkbox"
                checked={editFeatured}
                onChange={(e) =>
                  setEditFeatured(
                    e.target.checked
                  )
                }
              />

              Featured Product

            </label>

            {/* SAVE */}

            <button
              onClick={handleUpdate}
              className="
                mt-8
                w-full
                bg-yellow-500
                text-black
                px-8
                py-5
                rounded-2xl
                font-bold
              "
            >
              Save Changes
            </button>

          </div>

        </div>

      )}

    </main>

  );

}