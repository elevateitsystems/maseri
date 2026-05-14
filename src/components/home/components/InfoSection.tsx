import React from "react";
import Image from "next/image";

const InfoSection = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-t from-[#F2F2F2] via-[#DED1C1] to-[#F2F2F2] py-20 md:py-28 relative">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-center gap-16 md:gap-32">
          {/* TEXT SIDE (Left) */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-right space-y-8">
            <h2
              className="font-bold text-black leading-tight"
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontFamily: "'Poltawski Nowy', serif",
              }}
            >
              مصنوعة بجودة واهتمام بالتفاصيل
            </h2>

            <p
              className="text-black/70 leading-[1.8]"
              style={{
                fontSize: "clamp(16px, 1.2vw, 20px)",
                fontFamily: "'Noto Naskh Arabic', serif",
              }}
            >
              والخبرة التقليدية في الخياطة. نحن نفتخر بأن منتجاتنا مصنوعة في
              الجزائر، ونولي اهتماماً كبيراً بكل مرحلة من مراحل الإنتاج، من
              اختيار الأقمشة إلى آخر لمسة في الخياطة، لضمان جودة عالية راحة
              ومتانة تدوم. نعتمد على مواد مختارة بعناية وحرفيين ذوي خبرة لنقدم
              ملابس تعكس الأناقة والأصالة في نفس الوقت كل قطعة تمر بعملية إنتاج
              دقيقة حيث تكون الجودة والدقة هما الأساس، لنضمن أن كل منتج يلبي
              توقعات المرأة العصرية التي تبحث عن الأناقة والراحة في آن واحد.
            </p>
          </div>

          {/* IMAGE SIDE (Right) */}
          <div className="relative flex-shrink-0">
            {/* Main Image - 376x534 */}
            <div className="relative w-[300px] h-[426px] md:w-[376px] md:h-[534px] overflow-hidden shadow-2xl">
              <Image
                src="/assets/about-us-image.avif"
                alt="About Maseri"
                width={376}
                height={534}
                quality={85}
                loading="lazy"
                sizes="(max-width: 768px) 300px, 376px"
                className="object-cover"
              />
            </div>

            {/* Overlapping Floating Icon - 234px */}
            <div className="absolute top-[10%] -right-[20%] md:-right-[35%] w-[160px] h-[160px] md:w-[234px] md:h-[234px] flex items-center justify-center z-10 transition-transform duration-500 hover:scale-105 rounded-full bg-white">
              <Image
                src="/assets/about-us-icon.avif"
                alt="Quality Icon"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
