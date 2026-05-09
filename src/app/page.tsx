import CategoryCarousel from "@/components/CategoryCarousel";
import CategoryProductSection from "../components/home/components/CategoryProductSection";
import Features from "../components/home/components/Features";
import Hero from "../components/home/components/Hero";
import InfoSection from "../components/home/components/InfoSection";

export default function RootPage() {
  return (
    <main className="min-h-screen flex flex-col gap-16">
      <Hero />
      <CategoryCarousel/> 
      <CategoryProductSection />
      <InfoSection />
      <Features />
    </main>
  );
}
