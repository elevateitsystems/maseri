"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { Category } from "@/types/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const BASE_URL = "https://back.testwebapp.space";

interface CategoryType {
  id: number;
  name: string;
  image: string;
}

const duplicateForLoop = (cats: CategoryType[]) => {
  if (!cats.length) return [];
  const arr: CategoryType[] = [];
  while (arr.length < 12) {
    arr.push(...cats);
  }
  return arr.slice(0, 12);
};

export default function CategoryCarousel() {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  const [rawCats, setRawCats] = useState<Category[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/getCata`, { cache: "no-store" });
        const json = await res.json();
        setRawCats(json.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categories = useMemo(() => duplicateForLoop(rawCats), [rawCats]);

  const slideTo = (index: number) => {
    swiperRef.current?.slideToLoop(index, 800);
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="animate-pulse max-w-7xl mx-auto px-4">
          <div className="h-16 w-48 bg-black/10 rounded mx-auto mb-6" />
          <div className="flex justify-center gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 w-24 bg-black/10 rounded hidden md:block" />
            ))}
          </div>
          <div className="flex justify-center gap-4 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`bg-black/10 rounded-[200px_200px_30px_30px] hidden md:block ${i === 2 ? "w-[340px] h-[580px]" : "w-[260px] h-[460px]"
                  }`}
              />
            ))}
            <div
              key="mobile"
              className="bg-black/10 rounded-[200px_200px_30px_30px] w-full sm:w-[280px] h-[420px] sm:h-[520px] md:hidden"
            />
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section
      dir="rtl"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Soft Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[1200px] h-[800px] rounded-full bg-[#EDE4D8]/60 blur-[120px]" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 md:mb-16 relative z-10">
        <h2
          className="font-bold text-black tracking-tight"
          style={{ fontSize: "clamp(42px, 7.5vw, 88px)", fontFamily: "Georgia, serif" }}
        >
          منتجاتنا
        </h2>

        <div className="flex justify-center mt-4">
          <svg width="153" height="24" viewBox="0 0 153 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.779386 21.7369C0.779386 21.7369 79.2044 -11.5285 152.249 8.31399" stroke="black" strokeWidth="4" />
          </svg>

        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-6 md:gap-10 mt-8 overflow-x-auto pb-3 no-scrollbar px-4">
          {rawCats.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => slideTo(i)}
              className={`text-sm md:text-base whitespace-nowrap pb-2 transition-all duration-300 ${active % rawCats.length === i
                  ? "text-black font-medium"
                  : "text-black/50 hover:text-black/80"
                }`}
            >
              {cat.name}
              {active % rawCats.length === i && (
                <div className="h-0.5 w-full bg-black mt-1.5 rounded" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="relative z-10 px-2 md:px-0 min-h-[320px] md:min-h-[620px] flex items-center justify-center overflow-visible">
        <Swiper
          dir="rtl"
          className="cat-swiper max-w-[1800px] mx-auto overflow-visible"
          modules={[Autoplay]}
          centeredSlides
          loop
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 1.05,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: -28,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: -35,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: -42,
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
        >
          {categories.map((cat, i) => {
            // Calculate distance from active slide
            const distance = Math.min(
              Math.abs(i - active),
              categories.length - Math.abs(i - active)
            );

            // Determine card size based on distance
            const getCardSizes = () => {
              if (distance === 0)
                return { w: "w-[364px]", h: "h-[586px]", scale: "md:scale-100" };
              if (distance === 1)
                return { w: "w-[297px]", h: "h-[399px]", scale: "md:scale-100" };
              return { w: "w-[234px]", h: "h-[317px]", scale: "md:scale-100" };
            };

            const sizes = getCardSizes();

            return (
              <SwiperSlide key={`${cat.id}-${i}`} className="h-auto flex items-center justify-center py-6">
                {({ isActive }) => (
                  <div
                    className="flex justify-center cursor-pointer group w-full"
                    onClick={() =>
                      isActive
                        ? router.push(`/cataProducts/${cat.id}/${encodeURIComponent(cat.name)}`)
                        : swiperRef.current?.slideToLoop(i, 700)
                    }
                  >
                    <div
                      className={`arch-card relative transition-all duration-700 transform ${sizes.scale}`}
                    >
                      {/* Arch Container - Fixed Height */}
                      <div
                        className={`relative overflow-hidden bg-[#F8F4EE] shadow-lg md:shadow-2xl transition-all duration-500 flex-shrink-0 ${sizes.w} ${sizes.h}`}
                        style={{
                          borderRadius: "140px 140px 30px 30px / 120px 120px 30px 30px",
                        }}
                      >
                        {cat.image ? (
                          <Image
                            src={`${BASE_URL}/${cat.image}`}
                            alt={cat.name}
                            fill
                            priority={isActive}
                            className="object-cover object-center transition-all duration-700"
                            sizes="(max-width: 640px) 260px, (max-width: 1024px) 260px, 364px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-[#E8D5C4] to-[#D4C4B0] animate-pulse" />
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                      </div>

                      {/* Label */}
                      <div className="text-center mt-2 md:mt-4 min-h-[28px] md:min-h-[40px] flex items-center justify-center">
                        <h3
                          className={`font-semibold text-black transition-all duration-500 ${isActive
                              ? "text-lg md:text-2xl"
                              : "text-sm md:text-base"
                            }`}
                        >
                          {cat.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            router.push(`/cataProducts`);
          }}
          className="group inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full text-sm md:text-base font-medium hover:scale-105 active:scale-95 transition-all duration-300"
        >
          منتجاتنا
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>
    </section>
  );
}