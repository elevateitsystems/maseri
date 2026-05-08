import React from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutCommitment from "@/components/about/AboutCommitment";
import AboutExperience from "@/components/about/AboutExperience";
import AboutClosing from "@/components/about/AboutClosing";
import Features from "@/components/home/components/Features";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutCommitment />
      <AboutExperience />
      <AboutClosing />
      <Features/>
    </main>
  );
}
