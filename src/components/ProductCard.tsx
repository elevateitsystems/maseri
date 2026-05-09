"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Product } from "@/types/api";
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
      {/* Clickable Overlay */}
      <Link 
        href={`/productDetails/${product.id}`} 
        className="absolute inset-0 z-10"
        aria-label={`View details for ${product.title}`}
      />

      <div className="aspect-[4/4] relative overflow-hidden bg-[#F9F9F9]">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-full object-cover"
          />
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
