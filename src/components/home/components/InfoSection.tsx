import React from "react";
import Image from "next/image";

const InfoSection = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-t from-[#F2F2F2] via-[#DED1C1] to-[#F2F2F2] py-16 md:py-28 relative">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col-reverse lg:flex-row-reverse items-start lg:items-center justify-center gap-10 xl:gap-32">
          {/* TEXT SIDE (Left on Desktop) */}
          <div className="flex-1 flex flex-col items-start lg:items-start text-start lg:text-right space-y-6 md:space-y-8">
            <h2
              className="font-bold text-black leading-tight"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontFamily: "'Poltawski Nowy', serif",
              }}
            >
              مصنوعة بجودة واهتمام بالتفاصيل
            </h2>

            <p
              className="text-black/70 leading-[1.8] max-w-2xl"
              style={{
                fontSize: "clamp(15px, 1.2vw, 20px)",
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

          {/* IMAGE SIDE (Right on Desktop) */}
          <div className="relative flex-shrink-0 mb-12 lg:mb-0 self-end sm:self-center">
            {/* Main Image Container */}
            <div className="relative w-[280px] h-[398px] sm:w-[320px] sm:h-[454px] md:w-[376px] md:h-[534px] overflow-hidden">
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

            {/* Overlapping Floating Icon */}
            <div className="absolute top-[7%] -right-[33%] sm:-right-[25%] lg:-right-[20%] xl:-right-[35%] w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] xl:w-[234px] xl:h-[234px] flex items-center justify-center z-10 transition-transform duration-500 hover:scale-105 rounded-full bg-[#F2F2F2] shadow-xl">
              <div className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] xl:w-[234px] xl:h-[234px]">
                <Image
                  src="/assets/about-us-icon.avif"
                  alt="Quality Icon"
                  fill
                  sizes="234px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
