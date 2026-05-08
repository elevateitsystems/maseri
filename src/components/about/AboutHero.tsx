import React from "react";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[320px] md:h-[450px] lg:h-[673px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/about-us/women-shopping-buying-consumer-products-customer-day-celebration 1.png"
        alt="About"
        fill
        priority
        className="object-cover grayscale-[90%]"
      />

      {/* Beige Overlay */}
      <div className="absolute inset-0 bg-[#C8B8A8]/70 mix-blend-multiply" />

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D3C5B5]/40 to-[#C8B8A8]/30" />

      {/* Title */}
      <div className="absolute bottom-6 right-6 md:bottom-14 md:right-16 lg:bottom-20 lg:right-28">
        <h1
          className="
            text-black
            leading-none
            font-semibold
            text-[42px]
            md:text-[72px]
            lg:text-[96px]
            drop-shadow-sm
          "
          dir="rtl"
        >
          معلومات عنا
        </h1>
      </div>
    </section>
  );
}