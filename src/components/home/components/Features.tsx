import React from "react";
import Image from "next/image";
import icon1 from "../../../../assets/features/hand-love.svg";
import icon2 from "../../../../assets/features/doller.svg";
import icon3 from "../../../../assets/features/box.svg";
import icon4 from "../../../../assets/features/location.svg";

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
    <section>
      <div className="container mx-auto px-4 pb-12 sm:pb-28">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-[40px] font-semibold text-black mb-6 leading-tight">
           لماذا تختاريننا
          </h2>
          <p className="text-[20px] font-medium text-black/70 leading-relaxed">
           نوفرو لك تجربة تسوق سهلة وآمنة مع الدفع عند الاستلام، تصنيع في الجزائر، تصاميم مصنوعة يدويا، وتوصيل لكل الولايات عبر الوطن
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
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
