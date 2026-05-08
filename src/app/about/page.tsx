import React from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutCommitment from "@/components/about/AboutCommitment";
import AboutExperience from "@/components/about/AboutExperience";
import AboutQuality from "@/components/about/AboutQuality";
import AboutClosing from "@/components/about/AboutClosing";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutCommitment />
      <AboutExperience />
      <AboutQuality />
      <AboutClosing />
    </main>
  );
}
