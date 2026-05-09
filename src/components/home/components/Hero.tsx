import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"

    >
      {/* Background: warm beige gradient */}
      <div className="absolute hidden md:block inset-0 bg-gradient-to-b from-[#F2F0ED] to-[#C7B7A7]" />

      {/* Flower — top-right (desktop only) */}
      <div className="absolute md:-top-32 md:-left-30 -left-30 md:w-[480px] w-[200px] h-[200px] md:h-[480px] opacity-25 pointer-events-none select-none   ">
        <Image src="/assets/background-flower.png" alt="" fill sizes="480px" className="object-contain" aria-hidden="true" />
      </div>

      {/* Flower — bottom-left (desktop only) */}
      <div className="absolute md:-bottom-32 bottom-70 md:-right-40 -right-30 md:w-[480px] w-[200px] h-[200px] md:h-[480px] opacity-25 pointer-events-none select-none  ">
        <Image src="/assets/background-flower.png" alt="" fill sizes="480px" className="object-contain rotate-180" aria-hidden="true" />
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:block relative w-full h-screen">

        {/* Model image — LEFT side, full height, no cropping */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            transform: "translateX(-13%)",
          }}
        >
          <Image
            src="/assets/hero.png"
            alt="مجموعة أزياء لابيل تكستايل"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
            className="object-cover object-center lg:object-left"
            priority
          />
        </div>
        {/* Text — RIGHT side, vertically centered */}
        <div
          className="absolute inset-y-0 right-0 flex items-center z-10"
          style={{ width: "50%" }}
        >
          <div
            className="flex flex-col w-full pr-12  "
            style={{ direction: "rtl", textAlign: "right" }}
          >
            <h1
              className="font-normal text-black leading-[1.2] mb-5"
              style={{
                fontSize: "clamp(38px, 4.5vw, 68px)",
                fontFamily: "'Poltawski Nowy', serif",
              }}
            >
              حسي بروحك جميلة كل يوم
            </h1>

            <p
              className="text-black mb-10 leading-relaxed"
              style={{ fontSize: "clamp(20px, 1.1vw, 24px)" }}
            >
              قمصان أنيقة وبيجامات مريحة مصممة لراحتك وأناقتك
            </p>

            <div>
              <Link
                href="/Cata"
                className="inline-flex items-center justify-center px-25 h-[52px] border border-black text-black text-lg hover:bg-[#B3A495] hover:text-white transition-all duration-300"
                style={{ fontFamily: "'Poltawski Nowy', serif" }}
              >
                اكتشفي المجموعة
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div
        className="relative flex lg:hidden w-full flex-col justify-end mt-24"
        style={{ minHeight: "100svh" }}
      >
        {/* Full-bleed background image using img tag to avoid Next.js fill issues */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/mobile-hero-image.png"
          alt="مجموعة أزياء لابيل تكستايل"
          className="object-top"
          style={{ zIndex: 0 }}
        />



        {/* Text at bottom */}
        <div
          className="relative flex flex-col items-center pb-16 pt-8 px-6"
          style={{ zIndex: 2, direction: "rtl", textAlign: "center" }}
        >
          <h1
            className="font-bold text-black leading-[1.2] mb-4"
            style={{
              fontSize: "clamp(34px, 9vw, 50px)",
              fontFamily: "'Poppins', serif",
            }}
          >
            حسي بروحك جميلة كل يوم
          </h1>

          <p className="text-black text-[15px] mb-8 leading-relaxed max-w-[300px]">
            قمصان أنيقة وبيجامات مريحة مصممة لراحتك وأناقتك
          </p>

          <Link
            href="/Cata"
            className="inline-flex items-center justify-center px-10 h-[52px] w-[240px] border border-black text-black text-[16px] bg-white/30 backdrop-blur-sm hover:bg-[#B3A495] hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Poltawski Nowy', serif" }}
          >
            اكتشفي المجموعة
          </Link>
        </div>
      </div>
    </section>
  );
}
