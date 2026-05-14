"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <section className="py-16 md:py-14">
        <div className="animate-pulse max-w-7xl mx-auto px-4">
          <div className="h-16 w-48 bg-black/10 rounded mx-auto mb-6" />
          <div className="flex justify-center gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-24 bg-black/10 rounded hidden md:block"
              />
            ))}
          </div>
          <div className="flex justify-center gap-4 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`bg-black/10 rounded-[200px_200px_30px_30px] hidden md:block ${
                  i === 2 ? "w-[340px] h-[580px]" : "w-[260px] h-[460px]"
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
      className="relative overflow-hidden py-10 md:py-12 px-0 md:px-0"
    >
      {/* Soft Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[1200px] h-[800px] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="text-center mb-4 md:mb-6 relative z-10 px-4 md:px-0">
        <h1
          className="font-bold text-black leading-[1.2] mb-5"
          style={{
            fontSize: "clamp(38px, 4.5vw, 68px)",
            fontFamily: "'Poltawski Nowy', serif",
          }}
        >
          منتجاتنا
        </h1>

        <div className="flex justify-center mt-4">
          <svg
            width="153"
            height="24"
            viewBox="0 0 153 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.779386 21.7369C0.779386 21.7369 79.2044 -11.5285 152.249 8.31399"
              stroke="black"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-start md:justify-center gap-9 md:gap-10 mt-8 md:mt-2 overflow-x-auto pb-3 no-scrollbar px-7 md:px-4">
          {rawCats.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => slideTo(i)}
              className={`text-sm md:text-base whitespace-nowrap pb-2 transition-all duration-300 ${
                active % rawCats.length === i
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
      <div className="relative z-10 px-0 md:px-0 min-h-[570px] md:min-h-[450px] flex items-center justify-center overflow-visible group">
        <Swiper
          dir="rtl"
          className="cat-swiper max-w-[1800px] mx-auto overflow-visible"
          modules={[Autoplay]}
          loop={rawCats.length > 3}
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1.08}
          spaceBetween={18}
          centeredSlides={true}
          breakpoints={{
            320: { slidesPerView: 1.18, spaceBetween: -10 },
            480: { slidesPerView: 1.24, spaceBetween: -12 },
            640: { slidesPerView: 1.32, spaceBetween: -14 },
            768: { slidesPerView: 3, spaceBetween: -20 },
            1024: { slidesPerView: 5, spaceBetween: -35 },
            1280: { slidesPerView: 5, spaceBetween: -42 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
        >
          {categories.map((cat, i) => {
            const distance = Math.min(
              Math.abs(i - active),
              categories.length - Math.abs(i - active),
            );

            const getCardSizes = () => {
              if (distance === 0)
                return {
                  w: "w-[82vw] max-w-[520px] md:w-[320px] md:max-w-none",
                  h: "h-[500px] sm:h-[560px] md:h-[420px]",
                };
              if (distance === 1)
                return {
                  w: "w-[70vw] max-w-[440px] md:w-[260px] md:max-w-none",
                  h: "h-[420px] sm:h-[480px] md:h-[350px]",
                };
              return {
                w: "w-[60vw] max-w-[360px] md:w-[200px] md:max-w-none",
                h: "h-[340px] sm:h-[400px] md:h-[280px]",
              };
            };

            const sizes = getCardSizes();

            return (
              <SwiperSlide
                key={`${cat.id}-${i}`}
                className="h-full flex items-center justify-center"
              >
                {({ isActive }) => (
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer group w-full h-[560px] sm:h-[620px] md:h-[550px]"
                    onClick={() =>
                      isActive
                        ? router.push(
                            `/cataProducts/${cat.id}/${encodeURIComponent(cat.name)}`,
                          )
                        : swiperRef.current?.slideToLoop(i, 700)
                    }
                  >
                    <div className="relative flex flex-col items-center transition-all duration-700 ease-in-out">
                      <div
                        className={`relative overflow-hidden bg-[#F8F4EE] shadow-lg md:shadow-2xl transition-all duration-700 ease-in-out flex-shrink-0 ${sizes.w} ${sizes.h}`}
                        style={{
                          borderRadius:
                            "160px 160px 20px 20px / 140px 140px 20px 20px",
                        }}
                      >
                        {cat.image ? (
                          <Image
                            src={`${BASE_URL}/${cat.image}`}
                            alt={cat.name}
                            fill
                            quality={75}
                            fetchPriority={isActive ? "high" : "auto"}
                            className="object-cover object-center transition-all duration-700"
                            sizes="(max-width: 640px) 82vw, (max-width: 767px) 520px, (max-width: 1024px) 260px, 364px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-[#E8D5C4] to-[#D4C4B0] animate-pulse" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                      </div>

                      <div className="w-full text-center mt-4 md:mt-6 flex flex-row-reverse items-center justify-between px-2 h-10">
                        <button
                          className={`transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/cataProducts/${cat.id}/${encodeURIComponent(cat.name)}`,
                            );
                          }}
                        >
                          <svg
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 9C18.5523 9 19 8.55228 19 8C19 7.44772 18.5523 7 18 7V8V9ZM1.29289 7.29289C0.902369 7.68342 0.902369 8.31658 1.29289 8.70711L7.65685 15.0711C8.04738 15.4616 8.68054 15.4616 9.07107 15.0711C9.46159 14.6805 9.46159 14.0474 9.07107 13.6569L3.41421 8L9.07107 2.34315C9.46159 1.95262 9.46159 1.31946 9.07107 0.928932C8.68054 0.538408 8.04738 0.538408 7.65685 0.928932L1.29289 7.29289ZM18 8V7L2 7V8V9L18 9V8Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                        <h3
                          className={`font-semibold text-black transition-all duration-500 ${isActive ? "text-lg md:text-2xl" : "text-sm md:text-base opacity-40"}`}
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
        {/* Side Finger Sliders (Arrows) */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute right-5 md:right-8 top-[42%] md:top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 hidden md:flex items-center justify-center shadow-xl z-30 border border-black/5 active:scale-90 transition-transform md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronRight size={24} className="text-black/70 md:w-8 md:h-8" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute left-5 md:left-8 top-[42%] md:top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 hidden md:flex items-center justify-center shadow-xl z-30 border border-black/5 active:scale-90 transition-transform md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronLeft size={24} className="text-black/70 md:w-8 md:h-8" />
        </button>

        {/* Mobile Pagination Bar */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:hidden z-20">
          {rawCats.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${active % rawCats.length === i ? "w-6 bg-black" : "w-1.5 bg-black/20"}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center mb-6 md:mt-8">
        <button
          onClick={() => router.push(`/cataProducts`)}
          dir="rtl"
          className="inline-flex items-center justify-center h-[62px] px-[40px] bg-[#B3A495] text-[#2F2F2F] text-[18px] md:text-[20px] leading-none font-normal whitespace-nowrap transition-transform duration-300 hover:scale-105"
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        >
          حيث تلتقي
        </button>
      </div>
    </section>
  );
}
