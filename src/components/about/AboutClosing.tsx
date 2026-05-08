import React from "react";
import Image from "next/image";

export default function AboutClosing() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-[28px] md:text-[40px] font-bold text-black mb-8 leading-tight">
          انضمي إلى رحلتنا
        </h2>

        <p className="max-w-[1000px] mx-auto text-[16px] md:text-[18px] text-black/80 leading-relaxed mb-16">
          ماسيري ليست مجرد علامة تجارية، بل هي مجتمع يقدر الأناقة والستر. ندعوك
          لاستكشاف مجموعاتنا وتجربة الفرق الذي تصنعه الجودة والشغف. شكراً لكونك
          جزءاً من قصتنا.
        </p>

        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-sm grayscale-[0.2] opacity-90">
          <Image
            src="/assets/about-us/Rectangle 57 (2).png"
            alt="Closing View"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
