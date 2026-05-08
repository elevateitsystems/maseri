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
  const categories = useMemo(
    () => duplicateCategories(rawCats),
    [rawCats]
  );

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
          {/* TITLE */}
          <div className="flex flex-col items-center mb-14">
            <div className="h-14 w-52 rounded bg-black/10" />

            <div className="h-2 w-40 rounded bg-black/10 mt-5" />
          </div>

          {/* CARDS */}
          <div className="flex items-end justify-center gap-5 px-5 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`rounded-t-[200px] bg-black/10 ${
                  i === 2
                    ? "w-[320px] h-[520px]"
                    : "w-[220px] h-[360px]"
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
    <>
      <section
        dir="rtl"
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background: "#F5F1EC",
        }}
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
          }

          .cat-swiper .swiper-wrapper {
            align-items: center;
          }

          .cat-swiper .swiper-slide {
            display: flex;
            justify-content: center;
            transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
            transform: scale(0.82);
            z-index: 1;
          }

          .cat-swiper .swiper-slide-active {
            transform: scale(1);
            z-index: 50;
          }

          .cat-swiper .swiper-slide-prev,
          .cat-swiper .swiper-slide-next {
            transform: scale(0.9);
            z-index: 20;
          }

          .arch-card {
            transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .swiper-slide-active .arch-card {
            transform: translateY(-20px);
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
            className="font-bold text-black leading-none"
            style={{
              fontSize: "clamp(42px, 8vw, 88px)",
              fontFamily: "Georgia, serif",
            }}
          >
            فئات
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
                className={`relative pb-2 text-sm md:text-[15px] whitespace-nowrap transition-all duration-300 ${
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
          spaceBetween={-120}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.8,
              spaceBetween: -70,
            },

            640: {
              slidesPerView: 3,
              spaceBetween: -90,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: -120,
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
                          `/cataProducts/${cat.id}/${encodeURIComponent(
                            cat.name
                          )}`
                        )
                      : swiperRef.current?.slideToLoop(i, 700)
                  }
                >
                  {/* CARD */}
                  <div
                    className={`arch-card relative transition-all duration-700 ${
                      isActive
                        ? "w-[250px] md:w-[420px]"
                        : "w-[170px] md:w-[260px]"
                    }`}
                  >
                    {/* IMAGE */}
                    <div
                      className={`relative overflow-hidden transition-all duration-700 ${
                        isActive
                          ? "h-[360px] md:h-[620px]"
                          : "h-[250px] md:h-[420px]"
                      }`}
                      style={{
                        borderRadius: "220px 220px 0 0",
                        background:
                          "linear-gradient(to bottom, #E7DED3 0%, #F6F2ED 100%)",

                        boxShadow: isActive
                          ? "0 40px 80px rgba(0,0,0,0.16)"
                          : "0 10px 25px rgba(0,0,0,0.08)",
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
                    <div className="text-center pt-4 md:pt-5">
                      <h3
                        className={`text-black font-semibold leading-none transition-all duration-500 ${
                          isActive
                            ? "text-[28px] md:text-[46px]"
                            : "text-[18px] md:text-[26px]"
                        }`}
                      >
                        {cat.name}
                      </h3>

                      <div className="flex items-center justify-center gap-3 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            swiperRef.current?.slidePrev();
                          }}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>

                        <p
                          className={`text-black/45 transition-all duration-500 ${
                            isActive
                              ? "text-[12px] md:text-[14px]"
                              : "text-[11px] md:text-[13px]"
                          }`}
                        >
                          اكتشف منتجاتنا
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* DOTS */}
        <div className="flex justify-center gap-2 relative z-10 mt-2">
          {rawCats.map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: active % rawCats.length === i ? 34 : 10,
                height: 4,
                background:
                  active % rawCats.length === i
                    ? "#111111"
                    : "rgba(0,0,0,0.18)",
              }}
            />
          ))}
        </div>
      </section>

      {/* BUTTON */}
      <div className="flex justify-center pb-20">
        <Link
          href="/products"
          className="
            group
            relative
            overflow-hidden
            inline-flex
            items-center
            justify-center
            rounded-full
            bg-black
            px-8
            py-4
            text-white
            text-sm
            md:text-base
            font-medium
            tracking-wide
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-2xl
          "
        >
          <span className="relative z-10 flex items-center gap-3">
            منتجاتنا

            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </span>

          <span className="absolute inset-0 bg-[#B8A998] scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100" />
        </Link>
      </div>
    </>
  );
}