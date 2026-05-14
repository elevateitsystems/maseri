"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  imageUrl: (src: string) => string;
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  isRTL: boolean;
  swiperRef: React.MutableRefObject<any>;
  prevImage: () => void;
  nextImage: () => void;
}

export default function ProductGallery({
  images,
  imageUrl,
  selectedImageIndex,
  setSelectedImageIndex,
  isRTL,
  swiperRef,
  prevImage,
  nextImage,
}: ProductGalleryProps) {
  return (
    <div className="flex-1 relative bg-[#F5F5F5] overflow-hidden rounded-[4px]">
      <Swiper
        modules={[Navigation, Pagination, Zoom]}
        zoom={{ maxRatio: 3 }}
        loop={false}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setSelectedImageIndex(swiper.activeIndex)}
        className="h-fit w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <div className="relative w-full h-[500px] md:h-[750px] bg-[#F5F5F5]">
                <Image
                  src={imageUrl(img)}
                  alt={`Product ${index + 1}`}
                  fill
                  quality={75}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover select-none cursor-zoom-in"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* PREV BUTTON — RIGHT SIDE IN RTL */}
        <button
          onClick={() => {
            if (isRTL) {
              prevImage();
            } else {
              nextImage();
            }
          }}
          disabled={selectedImageIndex === 0}
          className={`absolute top-1/2 -translate-y-1/2 z-20 hidden md:flex w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm items-center justify-center shadow-xl border border-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 ${
            isRTL ? "right-4" : "left-4"
          }`}
        >
          {isRTL ? (
            <ChevronRight size={26} className="text-black/80" />
          ) : (
            <ChevronLeft size={26} className="text-black/80" />
          )}
        </button>

        {/* NEXT BUTTON — LEFT SIDE IN RTL */}
        <button
          onClick={() => {
            if (isRTL) {
              nextImage();
            } else {
              prevImage();
            }
          }}
          disabled={selectedImageIndex === images.length - 1}
          className={`absolute top-1/2 -translate-y-1/2 z-20 hidden md:flex w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm items-center justify-center shadow-xl border border-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 ${
            isRTL ? "left-4" : "right-4"
          }`}
        >
          {isRTL ? (
            <ChevronLeft size={26} className="text-black/80" />
          ) : (
            <ChevronRight size={26} className="text-black/80" />
          )}
        </button>
      </Swiper>
      <div className="custom-pagination mt-5 flex justify-center gap-2" />
    </div>
  );
}
