import React from "react";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Image
        src="/assets/about-us/women-shopping-buying-consumer-products-customer-day-celebration 1.png"
        alt="About Maseri"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 lg:bottom-24 lg:right-24">
        <h1 className="text-[48px] md:text-[80px] lg:text-[100px] font-md text-black drop-shadow-sm">
          معلومات عنا
        </h1>
      </div>
    </section>
  );
}
