"use client";

import React from "react";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
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
                      className="w-full h-full object-cover object-top"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Arrows */}
            <button className="swiper-button-prev-custom absolute left-3 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg opacity-0 group-hover/swiper:opacity-100 transition-all duration-300 md:flex hidden hover:bg-black hover:text-white border border-black/5">
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <button className="swiper-button-next-custom absolute right-3 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg opacity-0 group-hover/swiper:opacity-100 transition-all duration-300 md:flex hidden hover:bg-black hover:text-white border border-black/5">
              <ChevronRight size={24} strokeWidth={2} />
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
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col w-full">
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
              // Cart logic
            }}
            className="h-10 w-10 flex-shrink-0 rounded-full bg-[#F9F9F9] border border-black/5 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-black">{product.price} د.ج</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
