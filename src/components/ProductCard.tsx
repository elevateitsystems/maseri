"use client";

import React from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Product } from "@/types/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getImageUrl } from "@/lib/api";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const incrementCart = useStore((state) => state.incrementCart);

  // Handle images
  const images = React.useMemo(() => {
    try {
      if (Array.isArray(product.images)) return product.images;
      if (typeof product.images === "string") return JSON.parse(product.images);
      return [];
    } catch (e) {
      return [];
    }
  }, [product.images]);

  const mainImage = images.length > 0 ? getImageUrl(images[0]) : "";

  return (
    <div className="group relative transition-all duration-300 overflow-hidden">
      {/* Clickable Overlay (Desktop only, mobile will click the card/swiper) */}
      <Link 
        href={`/productDetails/${product.id}`} 
        className="absolute inset-0 z-10 hidden md:block"
        aria-label={`View details for ${product.title}`}
      />

      <div className="aspect-[4/4] relative overflow-hidden bg-[#F9F9F9]">
        {images.length > 1 ? (
          <div className="relative w-full h-full group/swiper">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-black/20 !opacity-100 !w-2 !h-1 !rounded-full transition-all duration-300',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#4ADE80] !w-8 !rounded-full',
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              className="w-full h-full product-card-swiper"
              loop
            >
              {images.map((img: string, idx: number) => (
                <SwiperSlide key={idx}>
                  <Link href={`/productDetails/${product.id}`}>
                    <img
                      src={getImageUrl(img)}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Arrows */}
            <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover/swiper:opacity-100 transition-opacity md:flex hidden">
              <ChevronLeft size={18} className="text-black/60" />
            </button>
            <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover/swiper:opacity-100 transition-opacity md:flex hidden">
              <ChevronRight size={18} className="text-black/60" />
            </button>

            {/* Mobile Arrows (Always visible but smaller) */}
            <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/60 flex items-center justify-center shadow-sm md:hidden">
              <ChevronLeft size={16} className="text-black/60" />
            </button>
            <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/60 flex items-center justify-center shadow-sm md:hidden">
              <ChevronRight size={16} className="text-black/60" />
            </button>

            <style jsx global>{`
              .product-card-swiper .swiper-pagination {
                bottom: 8px !important;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
              }
            `}</style>
          </div>
        ) : mainImage ? (
          <Link href={`/productDetails/${product.id}`}>
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-1.5">
        <div className="flex justify-between items-top gap-2">
          <h3 className="text-xl font-normal">{product.title}</h3>
          <button className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-red-500 transition-all duration-300 shadow-sm">
            <Heart className={`size-6 transition-all duration-300 ${product.favourite ? "fill-red-500 text-red-500 scale-110" : "group-hover:scale-110"}`} />
          </button>
        </div>
        <div className="">
          <p className="text-xl font-semibold">{product.price} د.ج</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
