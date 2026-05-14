import React from "react";
import Image from "next/image";

const InfoSection = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-t from-[#F2F2F2] via-[#DED1C1] to-[#F2F2F2] py-8 md:py-12">
      <div className="container mx-auto px-6 md:px-0">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          {/* RIGHT SIDE (Image + Icon) */}
          <div className="flex justify-center lg:justify-start">
            {/* Wrapper that reserves space for the icon */}
            <div className="">
              {/* Main Image */}
              <div className="overflow-hidden">
                <Image
                  src="/assets/about-us-image.avif"
                  alt="About Maseri"
                  width={376}
                  height={534}
                  quality={75}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 376px"
                  className="object-cover w-full"
                />
              </div>
            </div>
          </div>

          {/* LEFT SIDE (Text) */}
          <div className="sm:flex-1 flex flex-col items-start text-start md:space-y-8">
            <h2
              className="font-bold text-black leading-[1.2] mb-5"
              style={{
                fontSize: "clamp(38px, 4.5vw, 68px)",
                fontFamily: "'Poltawski Nowy', serif",
              }}
            >
              مصنوعة بجودة واهتمام بالتفاصيل
            </h2>

            <p
              className="text-black/80 leading-relaxed"
              style={{ fontSize: "clamp(18px, 1.1vw, 24px)" }}
            >
              والخبرة التقليدية في الخياطة. نحن نفتخر بأن منتجاتنا مصنوعة في
              الجزائر، ونولي اهتماماً كبيراً بكل مرحلة من مراحل الإنتاج، من
              اختيار الأقمشة إلى آخر لمسة في الخياطة، لضمان جودة عالية راحة
              ومتانة تدوم. نعتمد على مواد مختارة بعناية وحرفيين ذوي خبرة لنقدم
              ملابس تعكس الأناقة والأصالة في نفس الوقت كل قطعة تمر بعملية إنتاج
              دقيقة حيث تكون الجودة والدقة هما الأساس، لنضمن أن كل منتج يلبي
              توقعات المرأة العصرية التي تبحث عن الأناقة والراحة في آن واحد{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
