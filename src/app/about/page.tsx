import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <article className="flex-grow container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">من نحن</h1>
        <div className="prose prose-lg max-w-4xl">
          <p className="text-xl text-muted-foreground leading-relaxed">
            ماسيري هي علامة تجارية رائدة في عالم الموضة المحتشمة، تأسست بشغف لتقديم تصاميم تمزج بين الجمال والستر، والجودة والأناقة.
          </p>
          {/* More content can be added here */}
        </div>
      </article>
      <Footer />
    </main>
  );
}
