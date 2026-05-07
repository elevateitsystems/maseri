"use client";

import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import Image, { StaticImageData } from "next/image";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  category: string;
  image: StaticImageData;
}

const ProductCard = ({
  id,
  title,
  price,
  category,
  image,
}: ProductCardProps) => {
  const incrementCart = useStore((state) => state.incrementCart);

  return (
    <div className="group relative transition-all duration-300">
      <div className="aspect-[4/4] relative overflow-hidden bg-secondary-50">
        <Image
          src={image}
          alt=""
          fill
          sizes="534px"
          className="object-contain object-bottom"
          aria-hidden="true"
        />
      </div>
      <div className="p-4 space-y-1.5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-normal truncate">{title}</h3>
          <button className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-red transition-colors">
            <Heart className="size-6" />
          </button>
        </div>
        <div className="">
          <p className="text-xl font-semibold">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
