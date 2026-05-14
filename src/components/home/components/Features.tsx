import React from "react";
import Image from "next/image";
import FeaturesSliderDynamic from "./FeaturesSliderDynamic";

import icon1 from "../../../../public/assets/features/hand-love.svg";
import icon2 from "../../../../public/assets/features/doller.svg";
import icon3 from "../../../../public/assets/features/box.svg";
import icon4 from "../../../../public/assets/features/location.svg";

const features = [
  {
    icon: icon1,
    title: "دعم متواصل",
  },
  {
    icon: icon2,
    title: "الدفع عند الاستلام",
  },
  {
    icon: icon3,
    title: "توصيل لكل الولايات",
  },
  {
    icon: icon4,
    title: "صنع في الجزائر",
  },
];

const Features = () => {
  return (
    <section className="bg-secondary-300 py-8 md:py-12">
      <div className="container mx-auto px-6 md:px-0">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          <h2 className="text-[30px] md:text-[40px] font-semibold text-black mb-4 md:mb-6 leading-tight">
            لماذا تختاريننا
          </h2>

          <p className="text-[16px] md:text-[20px] font-medium text-black/70 leading-relaxed">
            نوفرو لك تجربة تسوق سهلة وآمنة مع الدفع عند الاستلام، تصنيع في
            الجزائر، تصاميم مصنوعة يدويا، وتوصيل لكل الولايات عبر الوطن
          </p>
        </div>

        {/* MOBILE CAROUSEL ISLAND */}
        <FeaturesSliderDynamic features={features} />

        {/* DESKTOP GRID (Pure Static) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-[100px] h-[100px] mb-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={300}
                  height={300}
                  quality={75}
                  loading="lazy"
                  className="object-contain"
                />
              </div>

              <h3 className="text-[20px] font-semibold text-black">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
