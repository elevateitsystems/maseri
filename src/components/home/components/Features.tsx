import React from "react";
import Image from "next/image";
import icon1 from "../../../../assets/features/hand-love.png";
import icon2 from "../../../../assets/features/doller.png";
import icon3 from "../../../../assets/features/box.png";
import icon4 from "../../../../assets/features/location.png";

const features = [
  {
    icon: icon1,
    title: "دعم متواصل",
  },
  {
    icon: icon2,
    title: "دفع آمن",
  },
  {
    icon: icon3,
    title: "استبدال مرن",
  },
  {
    icon: icon4,
    title: "شحن سريع",
  },
];

const Features = () => {
  return (
    <section>
      <div className="container mx-auto px-4 pb-12 sm:pb-28">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-[40px] font-semibold text-black mb-6 leading-tight">
            حيث تلتقي حيث تلتقي
          </h2>
          <p className="text-[20px] font-medium text-black/70 leading-relaxed">
            حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي
            الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة
            بالاستدامة حيث تلتقي الموضة بالاستدامة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-[80px] h-[80px] mb-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
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
