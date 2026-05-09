"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import icon1 from "../../../../assets/features/hand-love.svg";
import icon2 from "../../../../assets/features/doller.svg";
import icon3 from "../../../../assets/features/box.svg";
import icon4 from "../../../../assets/features/location.svg";

const features = [
  {
    icon: icon1,
    title: "دعم متواصل",
  },
  {
    icon: icon2,
    title: "الدفع عند الاستلام",
  },
  {
    icon: icon3,
    title: "توصيل لكل الولايات",
  },
  {
    icon: icon4,
    title: "صنع في الجزائر",
  },
];

const Features = () => {
  const swiperRef = React.useRef<SwiperType | null>(null);
  return (
    <section className="bg-secondary-300 py-8 md:py-12">
      <div className="container mx-auto px-6 md:px-0">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          <h2 className="text-[30px] md:text-[40px] font-semibold text-black mb-4 md:mb-6 leading-tight">
            لماذا تختاريننا
          </h2>

          <p className="text-[16px] md:text-[20px] font-medium text-black/70 leading-relaxed">
            نوفرو لك تجربة تسوق سهلة وآمنة مع الدفع عند الاستلام، تصنيع
            في الجزائر، تصاميم مصنوعة يدويا، وتوصيل لكل الولايات عبر الوطن
          </p>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="block md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1.3}
            spaceBetween={20}
            centeredSlides
            loop
            speed={800}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
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

          {/* Custom Dot Style */}
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

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-[100px] h-[100px] mb-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>

              <h3 className="text-[20px] font-semibold text-black">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;