"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

export default function FeaturesSlider({ features }: { features: any[] }) {
  const swiperRef = React.useRef<SwiperType | null>(null);
  
  return (
    <div className="block md:hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1.3}
        spaceBetween={20}
        centeredSlides
        loop={features.length > 2}
        speed={800}
        autoplay={false} // Disable autoplay to reduce main-thread work
        pagination={{
          clickable: true,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="features-swiper pb-12 relative"
      >
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-[90px] h-[90px] mb-6 flex items-center justify-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={300}
                  height={300}
                  quality={75}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="300px"
                  className="object-contain"
                />
              </div>

              <h3 className="text-[18px] font-semibold text-black">
                {feature.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .features-swiper .swiper-pagination {
          bottom: 0px !important;
        }

        .features-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #000;
          opacity: 0.25;
          transition: all 0.3s ease;
        }

        .features-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 999px;
          opacity: 1;
          background: #000;
        }
      `}</style>
    </div>
  );
}
