"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Product } from "@/types/api";
import { getImageUrl } from "@/lib/api";

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
    <div className="group relative transition-all duration-300">
      <div className="aspect-[4/4] relative overflow-hidden">
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
          <button className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-red transition-colors">
            <Heart className="size-6" />
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
