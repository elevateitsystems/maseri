import React from "react";
import Image from "next/image";

export default function AboutCommitment() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="px-6 text-center">
         


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
            رؤية عصرية للموضة النسائية تجمع بين الحرفية الأصيلة والهوية الفريدة
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
            بدأت رحلتنا بفكرة بسيطة لكنها قوية : تقديم تجربة جديدة للمرأة في عالم الموضة . كل
            ملابس تجمع بين الجودة، الراحة، والشخصية الفريدة. كل تصميم ليس مجرد قطعة ملابس، بل وسيلة تعبّر من خلالها كل امرأة عن هويتها بثقة وأناقة
            قطعة مصنوعة يدويًا في الجزائر، وتعكس حرفية مميزة ممزوجة بأسلوب عصري وأنيق. نهتم بكل تفصيلة بعناية لنقدم
          </p>
        </div>

        <div className="relative w-full aspect-[16/7] overflow-hidden rounded-sm">
          <Image
            src="/assets/about-us/tar.png"
            alt="Craftsmanship"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
