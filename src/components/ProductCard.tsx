"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/api";
import { Product } from "@/types/api";
import Link from "next/link";
import Image from "next/image";

import placeholderImage from "../../assets/placeholder-image.svg";

export default function ProductCard({ product }: { product: Product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Parse images from JSON or Array
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

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative flex flex-col w-full h-auto group" dir="rtl">
      {/* Product Image Slider */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#d9d9d9]">
        <Link href={`/productDetails/${product.id}`} className="block w-full h-full">
          <Image
            src={
              images.length > 0 && images[currentIndex]
                ? getImageUrl(images[currentIndex])
                : placeholderImage.src
            }
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover object-top transition-all duration-500"
          />
        </Link>

        {/* Navigation Buttons - Hidden by default, show on hover on desktop */}
        {images.length > 1 && (
          <>
            <Button
              type="button"
              size="icon"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 z-50 h-11 w-11 -translate-y-1/2 rounded-full bg-white text-black shadow-lg border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden hover:bg-black hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </Button>

            <Button
              type="button"
              size="icon"
              onClick={handleNext}
              className="absolute right-3 top-1/2 z-50 h-11 w-11 -translate-y-1/2 rounded-full bg-white text-black shadow-lg border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden hover:bg-black hover:text-white"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} />
            </Button>

            {/* Slider Dots */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-[6px] w-[6px] md:h-[8px] md:w-[8px] rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-black scale-110"
                      : "bg-black/20"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col p-3 md:px-4 md:py-3 w-full">
        <div className="flex justify-between items-start gap-4 mb-1">
          <Link href={`/productDetails/${product.id}`} className="flex-1 min-w-0">
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
          <p className="text-xl font-bold text-black">{product.price} د.ج</p>
        </div>
      </div>
    </div>
  );
}
