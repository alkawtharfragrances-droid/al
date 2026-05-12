import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import PageTransition from "@/components/PageTransition";
import FragranceParticles from "@/components/FragranceParticles";
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Al-Kawthar",
  description: "Luxury Fragrance Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable}`}
      >
        <FragranceParticles />
        <PageTransition>
          
  {children}
</PageTransition>
      </body>
    </html>
  );
}