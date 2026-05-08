import React from "react";
import Image from "next/image";

export default function AboutExperience() {
  return (
    <section className=" ">
      <div className=" mx-auto px-6 text-center">
        <h2 className="text-[28px] md:text-[40px]  text-black mb-8 leading-tight">
          تجربة مصممة لك تجمع بين الأناقة، الراحة والثقة
        </h2>

        <p className="  !text-[22px] md:text-[18px] text-black/80 leading-relaxed mb-16 text-justify md:text-center">
          نؤمن أن الموضة لا تقتصر على ما نرتديه، بل على ما نشعر به. لذلك يتم
          تصميم كل مجموعة لترافق المرأة في حياتها اليومية، من خلال قطع تجمع بين
          الأناقة، الراحة وسهولة الارتداء. نولي اهتمامًا كبيرًا لاختيار الأقمشة،
          القصّات والتفاصيل الدقيقة، لضمان جودة تدوم ومظهر أنيق في كل مرة. كل
          قطعة مصممة لتبرز جمال القوام مع الحفاظ على حرية الحركة. هدفنا بسيط:
          تقديم تجربة تتجاوز مجرد شراء الملابس، حيث تشعرين بالثقة، الإلهام،
          وتعبّرين عن نفسك بكل راحة وأناقة.
        </p>

        <div className="grid container mx-auto grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/assets/about-us/Rectangle 57 (1).png"
              alt="Lifestyle 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/assets/about-us/Rec.png"
              alt="Lifestyle 1"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
