"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/api";
import { Product } from "@/types/api";
import Link from "next/link";

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
    } catch (e) {
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
      <img
        src={
          images.length > 0 && images[currentIndex]
            ? getImageUrl(images[currentIndex])
            : placeholderImage.src
        }
        alt={product.title}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button
            type="button"
            size="icon"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-50 h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 rounded-full bg-white/80 md:bg-[#d8cfc0] text-black shadow-none hover:bg-white md:hover:bg-[#cfc4b2] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft
              className="h-5 w-5 md:h-7 md:w-7"
              strokeWidth={1.8}
            />
          </Button>

          <Button
            type="button"
            size="icon"
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-50 h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 rounded-full bg-white/80 md:bg-[#d8cfc0] text-black shadow-none hover:bg-white md:hover:bg-[#cfc4b2] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight
              className="h-5 w-5 md:h-7 md:w-7"
              strokeWidth={1.8}
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

export default function CataProductCard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch(
          "https://back.testwebapp.space/filterProducts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cataId: 1 }),
          }
        );

        const responseResult = await data.json();

        setProducts(responseResult?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full overflow-hidden py-16 md:mt-20">
      <div className="mx-auto container px-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-start gap-3">
          <h2 className="text-[32px] md:text-[56px] font-bold leading-none tracking-[-1px] md:tracking-[-2px] text-black">
            {products[0]?.cata_name || "Abaya"}
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
                <Link href={`/productDetails/${product.id}`}>
                  <ProductSlider product={product} />
                </Link>

                {/* Product Info */}
                <Link
                  href={`/productDetails/${product.id}`}
                  className="mt-5 flex items-start justify-between px-2"
                >
                  {/* Text */}
                  <div className="flex-1 text-start">
                    <h3 className="text-[22px] font-semibold leading-none text-black">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-[18px] text-black/80">
                      {product.price} د.ج
                    </p>
                  </div>

                  {/* Cart Button */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-12 w-12 md:size-16 rounded-full border-black bg-transparent hover:bg-black hover:text-white"
                  >
                    <ShoppingBag
                      className="h-5 w-5 md:size-7"
                      strokeWidth={1.8}
                    />
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-muted-foreground">
                0 data found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}