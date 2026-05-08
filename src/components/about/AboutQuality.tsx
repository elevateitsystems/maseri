import React from "react";
import Image from "next/image";

export default function AboutQuality() {
  return (
    <section className="bg-gradient-to-t from-[#F2F2F2] via-[#DED1C1] to-[#F2F2F2] py-20">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          {/* Right Side: Image + Floating Icon */}
          <div className="relative flex justify-center order-1 md:order-2">
            <div className="relative pr-[100px] md:pr-[140px]">
              <div className="relative w-[280px] h-[400px] md:w-[376px] md:h-[534px] overflow-hidden rounded-sm shadow-xl">
                <Image
                  src="/assets/about-us-image.png"
                  alt="Quality Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-1/4 -translate-y-1/2 right-0 w-[150px] h-[150px] md:w-[233px] md:h-[233px] bg-background rounded-full flex items-center justify-center p-6 shadow-2xl z-10">
                <Image
                  src="/assets/about-us-icon.png"
                  alt="Quality Icon"
                  width={233}
                  height={233}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Left Side: Text */}
          <div className="flex-1 text-right order-2 md:order-1">
            <h2 className="text-[36px] md:text-[56px] font-bold text-black mb-8 leading-tight">
              أعلى معايير الجودة
            </h2>
            <p className="text-[18px] md:text-[20px] text-black/70 leading-relaxed mb-10">
              نحن في ماسيري نلتزم بأعلى معايير الجودة في كل خيط وكل غرزة. شغفنا هو التميز، وهدفنا هو تقديم قطع تدوم معك طويلاً وتحافظ على رونقها وأناقتها. كل تصميم هو رحلة من الإبداع والدقة لضمان حصولك على الأفضل دائماً.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
