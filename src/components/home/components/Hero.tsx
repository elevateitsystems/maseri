import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] md:h-[827px] overflow-hidden">
      {/* Background: warm beige gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-400 to-secondary-50" />

      {/* Flower decoration (bottom-left visually) */}
      <div
        className="absolute -top-45 -left-55 w-[400px] h-[400px] md:w-[500px] md:h-[500px] opacity-20 pointer-events-none"
        // style={{ left: 0 }}
      >
        <Image
          src="/assets/background-flower.png"
          alt=""
          fill
          sizes="500px"
          className="object-contain object-bottom"
          aria-hidden="true"
        />
      </div>

      {/* Hero Image: Models (positioned on the visual LEFT side of the screen) */}
      <div className="lg:absolute size-[90%] sm:size-[110%] lg:size-[125%] 2xl:size-[145%] sm:left-[5%] lg:left-[-20%] 2xl:left-[-38%] 2xl:bottom-[-26%]">
        <Image
          src="/assets/hero-image.png"
          alt="مجموعة أزياء ماسيري"
          fill
          sizes="125vw"
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* Content: positioned on the visual RIGHT side of the screen */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex" style={{ justifyContent: "flex-start" }}>
            <div className="max-w-[580px] flex flex-col items-start">
              {/* Title */}
              <h1
                className="font-bold text-black leading-[1.1] mb-6"
                style={{
                  fontSize: "clamp(36px, 5vw, 70px)",
                  fontFamily: "'Poltawski Nowy', serif",
                }}
              >
                حيث تلتقي
                <br />
                الموضة بالاستدامة
              </h1>

              {/* Description */}
              <p className="text-[20px] font-poppins text-black mb-10 leading-relaxed">
                حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button className="h-[50px] px-8 bg-primary-900 text-[16px] font-poppins hover:bg-primary-800 transition-all duration-300">
                  حيث تلتقي
                </button>
                <button className="h-[50px] px-8 border border-black text-[16px] font-poppins hover:bg-black hover:text-white transition-all duration-300">
                  حيث تلتقي
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flower decoration (bottom-left visually) */}
      <div
        className="absolute -bottom-45 -right-55 w-[400px] h-[400px] md:w-[500px] md:h-[500px] opacity-20 pointer-events-none"
        // style={{ left: 0 }}
      >
        <Image
          src="/assets/background-flower.png"
          alt=""
          fill
          sizes="500px"
          className="object-contain object-bottom"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
