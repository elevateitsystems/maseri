"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, getImageUrl } from "@/lib/api";
import { Product } from "@/types/api";
import Link from "next/link";
import Image from "next/image";

import placeholderImage from "../../../assets/placeholder-image.svg";

function ProductSlider({ product }: { product: Product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Parse images from JSON
  const images: string[] = React.useMemo(() => {
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
    <div className="relative group w-full aspect-[4/5] overflow-hidden bg-[#d9d9d9]">
      {/* Product Image */}
      <Image
        src={
          images.length > 0 && images[currentIndex]
            ? getImageUrl(images[currentIndex])
            : placeholderImage.src
        }
        alt={product.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button
            type="button"
            size="icon"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 z-50 h-11 w-11 -translate-y-1/2 rounded-full bg-white text-black shadow-lg border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden hover:bg-black hover:text-white"
          >
            <ChevronLeft
              className="h-6 w-6"
              strokeWidth={2}
            />
          </Button>

          <Button
            type="button"
            size="icon"
            onClick={handleNext}
            className="absolute right-3 top-1/2 z-50 h-11 w-11 -translate-y-1/2 rounded-full bg-white text-black shadow-lg border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden hover:bg-black hover:text-white"
          >
            <ChevronRight
              className="h-6 w-6"
              strokeWidth={2}
            />
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
  );
}

function CardSkeleton() {
  return (
    <div className="w-full flex flex-col animate-pulse">
      {/* Image */}
      <div className="w-full aspect-[4/5] rounded-md bg-neutral-200" />

      {/* Content */}
      <div className="mt-5 flex items-start justify-between px-2">
        <div className="flex-1 space-y-3">
          <div className="h-6 w-3/4 rounded bg-neutral-200" />

          <div className="h-5 w-1/4 rounded bg-neutral-200" />
        </div>

        <div className="h-12 w-12 md:size-16 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}

export default function CataProductCard({ cataId, cataName }: { cataId?: number, cataName?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.filterProducts(cataId ? { cataId } : {});
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cataId]);

  return (
    <section className="w-full overflow-hidden py-16 mt-10 md:mt-22">
      <div className="mx-auto container px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-4 flex items-start justify-start gap-3">
          <h2 className="text-[32px] md:text-[56px] font-bold leading-none tracking-[-1px] md:tracking-[-2px] text-black">
            {cataName || products[0]?.cata_name || "Abaya"}
          </h2>

          <span className="mt-1 text-[18px] font-medium text-black/70">
            ({loading ? "..." : products.length})
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-end justify-center gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col w-full h-auto"
              >
                {/* Product Image */}
                <Link href={`/productDetails/${product.id}`} className="w-full">
                  <ProductSlider product={product} />
                </Link>

                {/* Product Info */}
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
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-muted-foreground">
No Products Found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
