import React from "react";
import Image from "next/image";

export default function AboutCommitment() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-[28px] md:text-[40px] font-bold text-black mb-8 leading-tight">
          التزام أصيل: إبراز الحرفية المحلية وصناعة موضة مسؤولة
        </h2>
        
        <p className="max-w-[1200px] mx-auto text-[16px] md:text-[18px] text-black/80 leading-relaxed mb-16 text-justify md:text-center">
          وراء كل قطعة نصممها، هناك رؤية واضحة: إبراز الحرفية المحلية التي غالبًا ما يتم التقليل من قيمتها، وتقديم موضة تحمل معنى حقيقي. يتم تصميم كل قطعة وصناعتها بعناية في الجزائر، على يد حرفيين مهرة يجمعون بين التقنيات التقليدية وروح الموضة العصرية. هذا الاختيار ليس جماليًا فقط، بل هو أيضًا التزام أخلاقي لدعم إنتاج أكثر إنسانية ومسؤولية. نحرص على إنتاج كميات محدودة لضمان جودة أعلى وتقليل الهدر، مما يمنح كل قطعة طابعًا مميزًا بعيدًا عن الإنتاج الواسع. نهتم بكل تفصيلة لنقدم تصاميم فريدة تعبّر عن العناية والدقة. نحن لا نقدم مجرد ملابس، بل رؤية لموضة واعية، مستدامة، ومتصلة بجذورها. موضة تحترم من يصنعها بقدر ما تليق بمن ترتديها.
        </p>

        <div className="relative w-full aspect-[16/7] overflow-hidden rounded-sm">
          <Image
            src="/assets/about-us/Rectangle 57.png"
            alt="Craftsmanship"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
