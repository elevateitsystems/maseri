import React from "react";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import BestSellers from "./components/BestSellers";
import InfoSection from "./components/InfoSection";
import Features from "./components/Features";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <article className="flex-grow">
        <Hero />
        <Categories />
        <BestSellers />
        <InfoSection />
        <Features />
      </article>
      <Footer />
    </main>
  );
}
