"use client";

import dynamic from "next/dynamic";

const CategorySlider = dynamic(() => import("./CategorySlider"), {
  ssr: false,
  loading: () => (
    <div className="py-10 md:py-14">
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
                i === 2 ? "w-[280px] h-[450px]" : "w-[200px] h-[380px]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default CategorySlider;
