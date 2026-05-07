"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const categories = [
  {
    id: 1,
    title: "العبايات",
    image: "/assets/categories/1bd94a2798be31706155da83653f62b6b126eee6.png",
    desc: "حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة",
  },
  {
    id: 2,
    title: "الفساتين",
    image: "/assets/categories/71aa02395661f0e215b6f647fc3f6f78c2dab4a1.png",
    desc: "حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة",
  },
  {
    id: 3,
    title: "الملابس الكاجوال",
    image: "/assets/categories/aafaabd0a4912fd03775b259cfcef59e756e5276.png",
    desc: "حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة",
  },
  {
    id: 4,
    title: "الاكسسوارات",
    image: "/assets/categories/e4985523f11f56ecf5993f073b7c0172583f4705.png",
    desc: "حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة",
  },
  {
    id: 5,
    title: "الأقمشة",
    image: "/assets/categories/eaa41c59987b254f45e318cf4bef2d837387bf03.png",
    desc: "حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة",
  },
];

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const next = () => setActiveIndex((prev) => (prev + 1) % categories.length);
  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + categories.length) % categories.length,
    );

  // Helper to get size based on offset
  const getSize = (offset: number) => {
    const absOffset = Math.abs(offset);
    if (absOffset === 0) return { width: 364, height: 513 };
    if (absOffset === 1) return { width: 297, height: 399 };
    return { width: 234, height: 317 };
  };

  return (
    <section className="w-full overflow-hidden select-none">
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-16 relative container mx-auto px-4">
          <h2 className="text-[56px] font-semibold text-black leading-tight mb-2">
            فئات
          </h2>
          <div className="flex justify-center -mt-2 mb-12">
            <svg
              width="142"
              height="18"
              viewBox="0 0 142 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 15.5C46.6667 4.16667 95.3333 4.16667 140 15.5"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActiveIndex(index)}
                className={`text-[16px] font-medium transition-all duration-300 whitespace-nowrap ${
                  activeIndex === index
                    ? "text-black border-b-2 border-black"
                    : "text-black/40 hover:text-black"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Section - Full Width */}
        <div className="relative w-full h-[530px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
              const index =
                (activeIndex + offset + categories.length) % categories.length;
              const isCenter = offset === 0;
              const cat = categories[index];
              const size = getSize(offset);

              // Calculate position with explicit gaps
              let xPosition = 0;
              if (offset !== 0) {
                const direction = offset > 0 ? 1 : -1;
                const absOffset = Math.abs(offset);

                // Base distance: half of center + half of first side + gap
                const centerWidth = 364;
                const side1Width = 297;
                const side2Width = 234;
                const gap = 30; // Subtle overlap

                if (absOffset === 1) {
                  xPosition =
                    direction * (centerWidth / 2 + side1Width / 2 + gap);
                } else if (absOffset === 2) {
                  xPosition =
                    direction *
                    (centerWidth / 2 + side1Width + side2Width / 2 + gap * 2);
                } else {
                  xPosition =
                    direction *
                    (centerWidth / 2 + side1Width + side2Width + 50 + gap * 3);
                }
              }

              return (
                <motion.div
                  key={`${cat.id}-${offset}`}
                  initial={false}
                  animate={{
                    width: size.width,
                    height: size.height,
                    x: xPosition,
                    opacity:
                      Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 25 }}
                  onClick={() => setActiveIndex(index)}
                  className="absolute cursor-pointer flex items-center justify-center"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-t-full bg-neutral-100 shadow-md">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover"
                      priority={isCenter}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Focused Content (Below centered image) */}
        <div className="text-center max-w-[380px] mx-auto space-y-8">
          <div className="space-y-0">
            <div className="flex-1 flex items-center justify-between gap-4">
              <h3 className="text-[20px] font-semibold text-black">
                {categories[activeIndex].title}
              </h3>

              <button
                onClick={next}
                className="p-3 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Next category"
              >
                <ArrowLeft className="size-6 text-black" />
              </button>
            </div>

            <p className="text-[16px] font-regular text-black/70 text-right">
              {categories[activeIndex].desc}
            </p>
          </div>

          <button className="bg-[#B3A495] px-[40px] py-[16px] text-[20px] font-regular text-black hover:bg-[#A39485] transition-colors shadow-sm">
            حيث تلتقي
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
