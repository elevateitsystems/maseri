import React from "react";
import Image from "next/image";

export default function AboutExperience() {
  return (
    <section className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className=" mx-auto px-4 md:px-8">
        {/* Content */}
        <div className="text-center max-w-[1800px] mx-auto mb-14 md:mb-20">
          <h2
            dir="rtl"
            className="
              text-black
              font-medium
              leading-[1.3]
              text-[32px]
              md:text-[52px]
              lg:text-[64px]
              mb-6
            "
          >
            تجربة مصممة لكِ تجمع بين الأناقة، الراحة والثقة
          </h2>

          <p
            dir="rtl"
            className="
              text-black/80
              leading-[1.9]
              text-[18px]
              md:text-[24px]
              lg:text-[32px]
              font-normal
              text-center
            "
          >
            نؤمن أن الموضة لا تقتصر على ما نرتديه، بل على ما نشعر به. لذلك يتم
            تصميم كل مجموعة لترافق المرأة في حياتها اليومية، من خلال قطع تجمع
            بين الأناقة، الراحة وسهولة الارتداء. نولي اهتمامًا كبيرًا لاختيار
            الأقمشة، القصات والتفاصيل الدقيقة، لضمان جودة تدوم ومظهر أنيق في كل
            مرة. كل قطعة مصممة لتبرز جمال القوام مع الحفاظ على حرية الحركة.
            هدفنا بسيط: تقديم تجربة تتجاوز مجرد شراء الملابس، حيث تشعرين بالثقة،
            الإلهام، وتعبّرين عن نفسك بكل راحة وأناقة.
          </p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.85fr] gap-5 md:gap-6 items-stretch max-w-[1440px]  mx-auto">
          {/* Left Image */}
          <div className="relative h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
            <Image
              src="/assets/about-us/Rectangle 57 (1).avif"
              alt="Lifestyle shopping"
              fill
              quality={75}
              priority
              className="object-cover"
            />
          </div>

          {/* Right Image */}
          <div className="relative h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
            <Image
              src="/assets/about-us/Rec.avif"
              alt="Fashion design"
              fill
              quality={75}
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
