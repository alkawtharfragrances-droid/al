"use client";
import {
  useCart,
} from "@/context/CartContext";
import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  doc,
  getDoc,
  collection,
  getDocs,
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

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [product, setProduct] =
    useState<Product | null>(null);
  const { addToCart } =
  useCart();
  const [
    relatedProducts,
    setRelatedProducts,
  ] = useState<Product[]>([]);

  // Fetch Related Products
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

        // Same Category
        related =
          related.filter(
            (item) =>
              item.category ===
              currentProduct.category
          );

        // Limit
        related =
          related.slice(0, 3);

        setRelatedProducts(
          related
        );

      } catch (error) {

        console.error(error);

      }
    };

  // Fetch Product
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

          fetchRelatedProducts(
            fetchedProduct
          );
        }

      } catch (error) {

        console.error(error);

      }
    };

  useEffect(() => {

    fetchProduct();

  }, []);

  // Loading
  if (!product) {

    return (

      <main
        className="
          min-h-screen
          flex items-center
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

      {/* Hero */}
      <section
        className="
          relative
          min-h-screen
          overflow-hidden
        "
      >

        {/* Background */}
        <img
          src={product.image}
          alt={product.name}
          className="
            absolute inset-0
            w-full h-full
            object-cover
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black
            via-black/60
            to-black/20
          "
        />

        {/* Content */}
        <div
          className="
            relative z-10
            max-w-7xl mx-auto
            px-6
            min-h-screen
            flex items-end
            pb-24
          "
        >

          <div className="max-w-3xl">

            {/* Category */}
            <p
              className="
                uppercase
                tracking-[6px]
                text-yellow-500
                mb-6
              "
            >
              {product.category}
            </p>

            {/* Name */}
            <h1
              className="
                text-5xl
                md:text-7xl
                font-bold
                mb-8
                leading-none
              "
            >
              {product.name}
            </h1>

            {/* Description */}
            <p
              className="
                text-zinc-300
                text-lg md:text-xl
                leading-relaxed
                mb-10
              "
            >
              {product.description}
            </p>

            {/* Notes */}
            <div
              className="
                flex flex-wrap
                gap-3
                mb-10
              "
            >

              {product.notes?.map(
                (note) => (

                  <div
                    key={note}
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

            {/* Bottom */}
            <div
              className="
                flex flex-col
                sm:flex-row
                gap-6
                sm:items-center
              "
            >

              {/* Price */}
              <div
                className="
                  text-4xl
                  font-bold
                "
              >
                ₹{product.price}
              </div>
              <button
  onClick={() =>

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

  }
  className="
    inline-flex
    px-8 py-5
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
              {/* WhatsApp */}
              <Link
                href={`https://wa.me/?text=I'm interested in ${product.name}`}
                target="_blank"
                className="
                  inline-flex
                  px-8 py-5
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

      {/* Related Products */}
      <section className="py-32 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-16">

            <p
              className="
                uppercase
                tracking-[8px]
                text-yellow-500
                mb-5
              "
            >
              You May Also Like
            </p>

            <h2 className="text-5xl font-bold">

              Related Fragrances

            </h2>

          </div>

          {/* Grid */}
          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >

            {relatedProducts.map(
              (item) => (

                <Link
                  href={`/products/${item.id}`}
                  key={item.id}
                  className="
                    group
                    overflow-hidden
                    rounded-[36px]
                    border border-white/10
                    bg-white/5
                    backdrop-blur-sm
                    hover:-translate-y-2
                    transition duration-500
                  "
                >

                  {/* Image */}
                  <div
                    className="
                      overflow-hidden
                      h-[380px]
                    "
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-full h-full
                        object-cover
                        group-hover:scale-110
                        transition duration-700
                      "
                    />

                  </div>

                  {/* Content */}
                  <div className="p-8">

                    {/* Category */}
                    <p
                      className="
                        uppercase
                        tracking-[4px]
                        text-yellow-500
                        text-xs
                        mb-4
                      "
                    >
                      {item.category}
                    </p>

                    {/* Name */}
                    <h3
                      className="
                        text-3xl
                        font-bold
                        mb-4
                      "
                    >
                      {item.name}
                    </h3>

                    {/* Price */}
                    <p
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      ₹{item.price}
                    </p>

                  </div>

                </Link>

              )
            )}

          </div>

        </div>

      </section>

    </main>

  );
}