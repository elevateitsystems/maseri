import React from "react";
import Image from "next/image";

export default function AboutClosing() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className=" px-6 text-center">
      

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
            التزام أصيل: إبراز الحرفية المحلية وصناعة موضة مسؤولة
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
            وراء كل قطعة نصممها ، هناك رؤية واضحة: إبراز الحرفية المحلية التي غالبًا ما يتم التقليل من قيمتها، وتقديم موضة تحمل معنى حقيقي. يتم تصميم كل قطعة وصناعتها بعناية في الجزائر، على يد حرفيين مهرة يجمعون بين التقنيات التقليدية وروح الموضة العصرية. هذا الاختيار ليس جماليًا فقط، بل هو أيضًا التزام أخلاقي لدعم إنتاج أكثر إنسانية ومسؤولية. نحرص على إنتاج كميات محدودة لضمان جودة أعلى وتقليل الهدر، مما يمنح كل قطعة طابعًا مميزًا بعيدًا عن الإنتاج الواسع. نهتم بكل تفصيلة لنقدم تصاميم فريدة تعبّر عن العناية والدقة. نحن لا نقدم مجرد ملابس، بل رؤية لموضة واعية، مستدامة، ومتصلة بجذورها. موضة تحترم من يصنعها بقدر ما تليق بمن ترتديها
          </p>
        </div>
        <div className="relative w-1/2 mx-auto aspect-[21/9] overflow-hidden rounded-sm grayscale-[0.2] opacity-90">
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
