"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const BASE_URL = "https://back.testwebapp.space";

interface Category {
  id: number;
  name: string;
  image: string;
}

const duplicateCategories = (cats: Category[]) => {
  if (!cats.length) return [];
  const arr: Category[] = [];
  while (arr.length < 12) {
    for (const cat of cats) {
      if (arr.length >= 12) break;
      arr.push({ ...cat });
    }
  }
  return arr;
};

export default function CategoryCarousel() {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  const [rawCats, setRawCats] = useState<Category[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/getCata`, {
          cache: "no-store",
        });
        const json = await res.json();
        setRawCats(json.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // MEMOIZED DATA
  const categories = useMemo(() => duplicateCategories(rawCats), [rawCats]);

  const slideTo = (i: number) => {
    swiperRef.current?.slideToLoop(i, 700);
  };

  // SKELETON LOADER
  if (loading) {
    return (
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{ background: "#F5F1EC" }}
      >
        <div className="animate-pulse">
          <div className="flex flex-col items-center mb-14">
            <div className="h-14 w-52 rounded bg-black/10" />
            <div className="h-2 w-40 rounded bg-black/10 mt-5" />
          </div>
          <div className="flex items-end justify-center gap-1 px-5 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`rounded-t-[200px] bg-black/10 ${
                  i === 2 ? "w-[320px] h-[520px]" : "w-[220px] h-[360px]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <div>
      <section
        dir="rtl"
        className="relative overflow-hidden"
        // style={{ background: "#F5F1EC" }}
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[#DDD3C8]/30 blur-3xl" />
        </div>

        {/* GLOBAL STYLES */}
        <style jsx global>{`
          .cat-swiper {
            width: 100%;
            overflow: visible !important;
            padding-top: 40px;
            padding-bottom: 90px;

            /* FIX 3: Fixed height prevents layout reflow when active card grows/shrinks */
            height: 580px;
          }

          @media (min-width: 768px) {
            .cat-swiper {
              /* FIX 3: Taller fixed height for desktop active card size */
              height: 860px;
            }
          }

          .cat-swiper .swiper-wrapper {
            align-items: center;
          }
          .cat-swiper .swiper-slide {
            display: flex;
            justify-content: center;
            transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
            transform: scale(0.7);
            z-index: 1;
          }
          .cat-swiper .swiper-slide-active,
          .cat-swiper .swiper-slide-prev,
          .cat-swiper .swiper-slide-next {
            transform: scale(1);
            z-index: 50;
            opacity: 1;
          }

          .cat-swiper .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
            opacity: 0.6;
            transform: scale(0.8);
          }
          .arch-card {
            transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @media (max-width: 768px) {
            .cat-swiper {
              padding-bottom: 60px;
            }
          }
        `}</style>

        {/* HEADING */}
        <div className="relative z-10 text-center mb-10 md:mb-16">
          <h2
            className="font-normal text-black leading-none"
            style={{
              fontSize: "clamp(42px, 8vw, 88px)",
              fontFamily: "Georgia, serif",
            }}
          >
            منتجاتنا
          </h2>

          <div className="flex justify-center mt-4 mb-8">
            <svg width="180" height="20" viewBox="0 0 180 20" fill="none">
              <path
                d="M5 15C60 0 120 0 175 15"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* TABS */}
          <div className="flex justify-center gap-5 md:gap-8 overflow-x-auto no-scrollbar px-5">
            {rawCats.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => slideTo(i)}
                className={`relative pb-2 text-sm md:text-[20px] whitespace-nowrap transition-all duration-300 ${
                  active % rawCats.length === i
                    ? "text-black"
                    : "text-black/40 hover:text-black/70"
                }`}
              >
                {cat.name}
                {active % rawCats.length === i && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1.5px] rounded-full bg-black" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* SWIPER */}
        <Swiper
          dir="rtl"
          className="cat-swiper"
          modules={[Autoplay]}
          centeredSlides
          loop
          speed={900}
          slidesPerView={5}
          spaceBetween={4}        // FIX 1: Was -150 (heavy overlap). Now 4px gap between slides.
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 4,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 4,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActive(swiper.realIndex);
          }}
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={`${cat.id}-${i}`}>
              {({ isActive }) => (
                <div
                  className="flex justify-center cursor-pointer"
                  onClick={() =>
                    isActive
                      ? router.push(
                          `/cataProducts/${cat.id}/${encodeURIComponent(cat.name)}`
                        )
                      : swiperRef.current?.slideToLoop(i, 700)
                  }
                >
                  <div
                    className="arch-card relative transition-all duration-700 w-full max-w-[420px] mx-auto"
                  >
                    {/* IMAGE */}
                    <div
                      className="relative overflow-hidden transition-all duration-700 w-full h-[300px] md:h-[550px]"
                      style={{
                        borderRadius: "220px 220px 0 0",
                        background: "linear-gradient(to bottom, #E7DED3 0%, #F6F2ED 100%)",
                      }}
                    >
                      <Image
                        src={`${BASE_URL}/${cat.image}`}
                        alt={cat.name}
                        fill
                        priority={isActive}
                        className="object-cover object-top"
                        sizes="(max-width:768px) 250px, 420px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </div>

                    {/* LABEL */}
                    <div className="text-right bg-[rgba(200,200,200,0.2)] p-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-black font-semibold leading-none transition-all duration-500 ${
                            isActive ? "text-[26px] md:text-[32px]" : "text-[22px] md:text-[28px]"
                          }`}
                        >
                          {cat.name}
                        </h3>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            swiperRef.current?.slidePrev();
                          }}
                        >
                          <ArrowLeft className="size-8" />
                        </button>
                      </div>

                      <p
                        className={`transition-all duration-500 ${
                          isActive ? "text-[20px] md:text-[24px]" : "text-[11px] md:text-[13px]"
                        }`}
                      >
                        اكتشف منتجاتنا
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* BUTTON */}
      <div className="flex justify-center">
        <Link
          href="/products"
          className="
            group
            relative
            overflow-hidden
            inline-flex
            items-center
            justify-center
            bg-[#B8A998]
            px-12
            py-4
            text-black
            text-sm
            md:text-lg
            font-medium
            tracking-wide
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-xl
          "
        >
          <span className="relative z-10 flex items-center gap-3">
            منتجاتنا
          </span>
        </Link>
      </div>
    </div>
  );
}