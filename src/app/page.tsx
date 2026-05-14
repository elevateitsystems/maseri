import CategoryCarousel from "@/components/CategoryCarousel";
import CategoryProductSection from "../components/home/components/CategoryProductSection";
import Features from "../components/home/components/Features";
import Hero from "../components/home/components/Hero";
import InfoSection from "../components/home/components/InfoSection";
import { api } from "@/lib/api";

export default async function RootPage() {
  // Parallel fetch on the server
  const [categories, products] = await Promise.all([
    api.getCategories(),
    api.filterProducts({}) // Initial products for all categories
  ]);

  return (
    <main className="min-h-screen flex flex-col gap-8 md:gap-0">
      <Hero />
      <CategoryCarousel /> 
      <CategoryProductSection 
        initialCategories={categories} 
        initialProducts={products} 
      />
      <InfoSection />
      <Features />
    </main>
  );
}
