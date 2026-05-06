"use client";

import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  category: string;
}

const ProductCard = ({ id, title, price, category }: ProductCardProps) => {
  const incrementCart = useStore((state) => state.incrementCart);

  return (
    <div className="group relative bg-white border border-transparent hover:border-border transition-all duration-300">
      <div className="aspect-[3/4] relative overflow-hidden bg-secondary-50">
        <div className="absolute inset-0 flex items-center justify-center text-secondary-900/5 font-bold text-4xl select-none">
          PRODUCT
        </div>
        
        {/* Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
          <Button 
            onClick={() => incrementCart()}
            className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-none transition-colors"
          >
            <ShoppingBag className="ml-2 h-4 w-4" />
            أضف إلى السلة
          </Button>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 left-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-red transition-colors">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">{category}</p>
        <h3 className="text-sm font-bold truncate">{title}</h3>
        <p className="text-sm font-bold text-primary">{price} ر.س</p>
      </div>
    </div>
  );
};

export default ProductCard;
