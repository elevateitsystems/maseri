import BestSellers from "../components/home/components/BestSellers";
import Categories from "../components/home/components/Categories";
import Features from "../components/home/components/Features";
import Hero from "../components/home/components/Hero";
import InfoSection from "../components/home/components/InfoSection";

export default function RootPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Categories />
      <BestSellers />
      <InfoSection />
      <Features />
    </main>
  );
}
