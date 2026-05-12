import type { Metadata } from "next";
import FloatingCart from "@/components/cart/FloatingCart";
import {
  Playfair_Display,
  Poppins,
} from "next/font/google";

import "./globals.css";

import "aos/dist/aos.css";

import PageTransition from "@/components/PageTransition";

import FragranceParticles from "@/components/FragranceParticles";

import {
  CartProvider,
} from "@/context/CartContext";

import {
  AuthProvider,
} from "@/components/admin/AuthProvider";

const playfair =
  Playfair_Display({
    subsets: ["latin"],
    variable:
      "--font-heading",
  });

const poppins =
  Poppins({
    subsets: ["latin"],
    weight: [
      "300",
      "400",
      "500",
      "600",
      "700",
    ],
    variable:
      "--font-body",
  });

export const metadata: Metadata = {
  title: "Al-Kawthar",
  description:
    "Luxury Fragrance Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body
        className={`
          ${playfair.variable}
          ${poppins.variable}
          bg-black
          text-white
        `}
      >

        <CartProvider>

          <AuthProvider>

            <FragranceParticles />

            <PageTransition>
              <FloatingCart />

              {children}

            </PageTransition>

          </AuthProvider>

        </CartProvider>

      </body>

    </html>
  );
}