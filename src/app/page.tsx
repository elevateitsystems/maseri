import CategoryCarousel from "@/components/CategoryCarousel";
import BestSellers from "../components/home/components/BestSellers";
import Features from "../components/home/components/Features";
import Hero from "../components/home/components/Hero";
import InfoSection from "../components/home/components/InfoSection";

export default function RootPage() {
  return (
    <main className="min-h-screen flex flex-col gap-14">
      <Hero />
      <CategoryCarousel/> 
      <BestSellers />
      <InfoSection />
      <Features />
    </main>
  );
}
