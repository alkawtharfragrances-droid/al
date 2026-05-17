"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  useCart,
} from "@/context/CartContext";

type Product = {
  id: string;

  name: string;

  image: string;

  description: string;

  notes: string[];

  category: string;

  featured?: boolean;

  decants?: {
    size: string;
    price: number;
  }[];
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [product, setProduct] =
    useState<Product | null>(null);

  const [
    relatedProducts,
    setRelatedProducts,
  ] = useState<Product[]>([]);

  const [
    selectedDecant,
    setSelectedDecant,
  ] = useState<{
    size: string;
    price: number;
  } | null>(null);

  const [
    showCartPopup,
    setShowCartPopup,
  ] = useState(false);

  const { addToCart } =
    useCart();

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const resolvedParams =
            await params;

          const docRef =
            doc(
              db,
              "products",
              resolvedParams.id
            );

          const snapshot =
            await getDoc(docRef);

          if (
            snapshot.exists()
          ) {

            const fetchedProduct = {
              id: snapshot.id,
              ...snapshot.data(),
            } as Product;

            setProduct(
              fetchedProduct
            );

            // AUTO SELECT FIRST DECANT
            if (
              fetchedProduct.decants &&
              fetchedProduct.decants.length > 0
            ) {

              setSelectedDecant(
                fetchedProduct.decants[0]
              );

            }

            fetchRelatedProducts(
              fetchedProduct
            );

          }

        } catch (error) {

          console.error(error);

        }

      };

    fetchProduct();

  }, []);

  // RELATED PRODUCTS
  const fetchRelatedProducts =
    async (
      currentProduct: Product
    ) => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "products"
            )
          );

        let related =
          snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (item: any) =>
                item.id !==
                currentProduct.id
            ) as Product[];

        related =
          related.filter(
            (item) =>
              item.category ===
              currentProduct.category
          );

        related =
          related.slice(0, 4);

        setRelatedProducts(
          related
        );

      } catch (error) {

        console.error(error);

      }

    };

  // LOADING
  if (!product) {

    return (

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-black
          text-white
        "
      >
        Loading...
      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section
        className="
          relative
          min-h-screen
          overflow-hidden
        "
      >

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="
            absolute inset-0
            w-full h-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black
            via-black/70
            to-black/30
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative z-10
            max-w-7xl mx-auto
            px-4 md:px-8
            min-h-screen
            flex items-end
            pb-20
          "
        >

          <div className="max-w-3xl">

            {/* CATEGORY */}
            <p
              className="
                uppercase
                tracking-[6px]
                text-yellow-500
                text-xs
                mb-5
              "
            >
              {product.category}
            </p>

            {/* NAME */}
            <h1
              className="
                text-4xl
                md:text-7xl
                font-bold
                leading-none
                mb-6
              "
            >
              {product.name}
            </h1>

            {/* SIZE */}
            <p
              className="
                text-zinc-400
                text-lg
                mb-6
              "
            >
              {selectedDecant?.size ||
                "Size Unavailable"}
            </p>

            {/* DESCRIPTION */}
            <p
              className="
                text-zinc-300
                text-base md:text-xl
                leading-relaxed
                mb-10
              "
            >
              {product.description}
            </p>

            {/* DECANT SELECTOR */}
            {product.decants &&
              product.decants.length > 0 && (

              <div className="mb-10">

                <p
                  className="
                    uppercase
                    tracking-[4px]
                    text-yellow-500
                    text-xs
                    mb-4
                  "
                >
                  Select Size
                </p>

                <select
                  value={
                    selectedDecant?.size
                  }
                  onChange={(e) => {

                    const found =
                      product.decants?.find(
                        (d) =>
                          d.size ===
                          e.target.value
                      );

                    if (found) {

                      setSelectedDecant(
                        found
                      );

                    }

                  }}
                  className="
                    bg-black/40
                    border border-white/10
                    rounded-2xl
                    px-5 py-4
                    text-white
                    outline-none
                    min-w-[240px]
                  "
                >

                  {product.decants.map(
                    (
                      decant,
                      index
                    ) => (

                      <option
                        key={`${decant.size}-${index}`}
                        value={
                          decant.size
                        }
                      >
                        {decant.size}
                        {" • "}
                        ₹{decant.price}
                      </option>

                    )
                  )}

                </select>

              </div>

            )}

            {/* NOTES */}
            {product.notes &&
              product.notes.length > 0 && (

              <div
                className="
                  flex flex-wrap
                  gap-3
                  mb-10
                "
              >

                {product.notes.map(
                  (note, index) => (

                    <div
                      key={`${note}-${index}`}
                      className="
                        px-4 py-2
                        rounded-full
                        border border-white/10
                        bg-white/5
                        backdrop-blur-sm
                        text-sm
                      "
                    >
                      {note}
                    </div>

                  )
                )}

              </div>

            )}

            {/* ACTIONS */}
            <div
              className="
                flex flex-col
                sm:flex-row
                gap-5
                sm:items-center
              "
            >

              {/* PRICE */}
              <div
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                "
              >
                ₹
                {selectedDecant?.price ||
                  0}
              </div>

              {/* ADD TO CART */}
              <button
                onClick={() => {

                  addToCart({
                    id: `${product.id}-${selectedDecant?.size}`,

                    name: `${product.name} (${selectedDecant?.size})`,

                    price:
                      selectedDecant?.price ||
                      0,

                    image:
                      product.image,

                    quantity: 1,
                  });

                  setShowCartPopup(true);

                  setTimeout(() => {

                    setShowCartPopup(false);

                  }, 2500);

                }}
                className="
                  inline-flex
                  px-7 py-4
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  border border-white/10
                  font-semibold
                  transition
                "
              >
                Add To Cart
              </button>

              {/* WHATSAPP */}
              <Link
                href={`https://wa.me/917006599020?text=I'm interested in ${product.name} (${selectedDecant?.size})`}
                target="_blank"
                className="
                  inline-flex
                  px-7 py-4
                  rounded-full
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  font-semibold
                  transition
                "
              >
                Enquire on WhatsApp
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* CART POPUP */}
      {showCartPopup && (

        <div
          className="
            fixed
            bottom-8
            right-8
            z-[999999]

            px-6 py-4

            rounded-2xl

            bg-zinc-950/95
            backdrop-blur-xl

            border
            border-yellow-500/20

            shadow-[0_10px_40px_rgba(0,0,0,0.45)]

            animate-in
            slide-in-from-bottom-5
            fade-in

            duration-500
          "
        >

          <div className="flex items-center gap-4">

            {/* IMAGE */}
            <img
              src={product.image}
              alt={product.name}
              className="
                w-14
                h-14
                rounded-xl
                object-cover
              "
            />

            {/* CONTENT */}
            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[3px]
                  text-yellow-500
                  mb-1
                "
              >
                Added To Cart
              </p>

              <h3 className="font-semibold">
                {product.name}
              </h3>

              <p className="text-zinc-400 text-sm">
                {selectedDecant?.size}
              </p>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}