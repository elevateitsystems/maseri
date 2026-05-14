
"use client";

import React, { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { getImageUrl } from "@/lib/api";
import { Product } from "@/types/api";
import Link from "next/link";
import Image from "next/image";
import type { Swiper as SwiperClass } from "swiper";

import placeholderImage from "../../assets/placeholder-image.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // Parse images
  const images: string[] = useMemo(() => {
    try {
      if (Array.isArray(product.images)) return product.images;

      if (typeof product.images === "string") {
        return JSON.parse(product.images);
      }

      return [];
    } catch {
      return [];
    }
  }, [product.images]);

  const displayImages =
    images.length > 0 ? images : [placeholderImage.src];

  return (
    <div
      className="relative flex flex-col w-full h-auto group"
      dir="rtl"
    >
      {/* Product Image Slider */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#d9d9d9]">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          loop={displayImages.length > 1}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper: SwiperClass) => {
            if (
              typeof swiper.params.navigation !== "boolean" &&
              swiper.params.navigation
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          className="h-full w-full"
        >
          {displayImages.map((img, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/productDetails/${product.id}`}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={
                      img === placeholderImage.src
                        ? placeholderImage.src
                        : getImageUrl(img)
                    }
                    alt={product.title}
                    fill
                    priority={index === 0}
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-all duration-500"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}

          {/* PREV BUTTON */}
          {displayImages.length > 1 && (
            <button
              ref={prevRef}
              className="absolute left-3 top-1/2 z-30 hidden md:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
            >
              <ChevronLeft
                className="h-6 w-6"
                strokeWidth={2}
              />
            </button>
          )}

          {/* NEXT BUTTON */}
          {displayImages.length > 1 && (
            <button
              ref={nextRef}
              className="absolute right-3 top-1/2 z-30 hidden md:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
            >
              <ChevronRight
                className="h-6 w-6"
                strokeWidth={2}
              />
            </button>
          )}
        </Swiper>
      </div>

      {/* Product Info */}
      <div className="flex flex-col p-3 md:px-4 md:py-3 w-full">
        <div className="flex justify-between items-start gap-4 mb-1">
          <Link
            href={`/productDetails/${product.id}`}
            className="flex-1 min-w-0"
          >
            <h3 className="text-xl font-normal text-black truncate text-right">
              {product.title}
            </h3>
          </Link>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // Add to cart logic
            }}
            className="h-10 w-10 flex-shrink-0 rounded-full bg-[#F9F9F9] border border-black/5 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
          >
            <ShoppingBag size={20} />
          </button>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-black">
            {product.price} د.ج
          </p>
        </div>
      </div>
    </div>
  );
}
