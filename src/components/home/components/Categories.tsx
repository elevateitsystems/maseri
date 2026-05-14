"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const BASE_URL = "https://back.testwebapp.space";

interface Category {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const GAP = 28;
const CENTER_W = 364;
const SIDE1_W = 297;
const SIDE2_W = 234;
const SIDE3_W = 180;

const getLayout = (absOffset: number) => {
  if (absOffset === 0) return { width: CENTER_W, height: 513, opacity: 1 };
  if (absOffset === 1) return { width: SIDE1_W, height: 399, opacity: 1 };
  if (absOffset === 2) return { width: SIDE2_W, height: 317, opacity: 0.7 };
  return { width: SIDE3_W, height: 250, opacity: 0 };
};

const getXPosition = (offset: number) => {
  if (offset === 0) return 0;
  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  if (abs === 1) return dir * (CENTER_W / 2 + SIDE1_W / 2 + GAP);
  if (abs === 2) return dir * (CENTER_W / 2 + SIDE1_W + SIDE2_W / 2 + GAP * 2);
  return dir * (CENTER_W / 2 + SIDE1_W + SIDE2_W + SIDE3_W / 2 + GAP * 3);
};

const SPRING = {
  type: "spring" as const,
  stiffness: 200,
  damping: 28,
  mass: 0.8,
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/getCata`)
      .then((r) => r.json())
      .then((json) => {
        const data: Category[] = json.data || [];
        setCategories(data);
        setActiveIndex(0);
      })
      .catch(console.error);
  }, []);

  const startAuto = useCallback((len: number) => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % len);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!categories.length) return;
    startAuto(categories.length);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [categories.length, startAuto]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    startAuto(categories.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next = (activeIndex + 1) % categories.length;
    setActiveIndex(next);
    startAuto(categories.length);
  };

  if (!categories.length) return null;

  return (
    <section className="w-full overflow-hidden select-none " dir="rtl">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-16 container mx-auto px-4">
          <h2 className="text-[56px] font-semibold text-black leading-tight mb-2">
            منتجاتنا
          </h2>
          <div className="flex justify-center -mt-2 mb-12">
            <svg width="142" height="18" viewBox="0 0 142 18" fill="none">
              <path
                d="M2 15.5C46.6667 4.16667 95.3333 4.16667 140 15.5"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Tabs */}
          <div className="flex justify-center items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => handleSelect(i)}
                className={`text-[16px] font-medium transition-all duration-300 whitespace-nowrap pb-1 ${
                  activeIndex === i
                    ? "text-black border-b-2 border-black"
                    : "text-black/40 hover:text-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full h-[600px] flex items-end justify-center">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index =
              (activeIndex + offset + categories.length) % categories.length;
            const cat = categories[index];
            if (!cat) return null;

            const { width, height, opacity } = getLayout(Math.abs(offset));
            const x = getXPosition(offset);
            const isCenter = offset === 0;

            return (
              <motion.div
                key={cat.id}
                className="absolute bottom-[60px] cursor-pointer flex flex-col items-center"
                style={{ zIndex: 10 - Math.abs(offset) }}
                animate={{ x, width, opacity }}
                transition={SPRING}
                onClick={() => !isCenter && handleSelect(index)}
              >
                {/* Arch frame */}
                <motion.div
                  className="relative w-full overflow-hidden rounded-t-full  "
                  animate={{ height }}
                  transition={SPRING}
                >
                  <Image
                    src={`${BASE_URL}/${cat.image}`}
                    alt={cat.name}
                    fill
                    quality={75}
                    className="object-cover object-top"
                    priority={isCenter}
                  />
                </motion.div>

                {/* Label row */}
                <div className="w-full mt-3 flex items-center justify-between px-1">
                  <span
                    className={`font-semibold text-black transition-all duration-300 ${isCenter ? "text-[18px]" : "text-[13px]"}`}
                  >
                    {cat.name}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1.5 hover:bg-black/5 rounded-full transition-colors shrink-0"
                    aria-label="Next"
                  >
                    <ArrowLeft
                      className={`text-black transition-all ${isCenter ? "size-5" : "size-4"}`}
                    />
                  </button>
                </div>

                <p className="text-[12px] text-black/50 w-full text-right px-1 mt-0.5">
                  اكتشفي منتجاتنا
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-black" : "w-2 bg-black/20"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
