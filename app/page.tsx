import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Testimonials from "@/components/Testimonials";
import Lamp from "@/components/Lamp";
import BentoGrid from "@/components/BentoGrid";
import AOSProvider from "@/components/AOSProvider";
import AmbientBackground from "@/components/AmbientBackground";
import VideoBackground from "@/components/VideoBackground";
import SeasonalCollections from "@/components/SeasonalCollections";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <PageTransition>

    <main className="text-white overflow-hidden relative">

      <VideoBackground />

      <AmbientBackground />

     <AOSProvider />

      <Navbar />

      <Hero />
      <SeasonalCollections />

      <Featured />

      <BentoGrid />

      <Testimonials />

      <Lamp />
      <Footer />

    </main>
    </PageTransition>
  );
}