import React from "react";
import Image from "next/image";

const InfoSection = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-t from-[#F2F2F2] via-[#DED1C1] to-[#F2F2F2]">
      <div className=" w-full mx-auto  ">
        <div className="flex flex-col-reverse md:flex-row items-center  gap-20 px-3">
          {/* RIGHT SIDE (Image + Icon) */}
          <div className="  flex justify-center lg:justify-start">
            {/* Wrapper that reserves space for the icon */}
            <div className=" ">
              {/* Main Image */}
              <div className="  overflow-hidden">
                <Image
                  src="/assets/about-us-image.svg"
                  alt="About Maseri"
                  width={376}
                  height={534}
                  className="object-cover w-full"
                />
              </div>

            </div>
          </div>

          {/* LEFT SIDE (Text) */}
          <div className="sm:flex-1 flex flex-col items-start text-start space-y-8">
            <h2 className="text-[56px] font-semibold text-black leading-tight">
              مصنوعة بجودة واهتمام بالتفاصيل
            </h2>

            <p className="text-[20px] font-medium text-black/70 leading-relaxed max-w-[600px]">
              والخبرة التقليدية في الخياطة. نحن نفتخر بأن منتجاتنا مصنوعة في الجزائر، ونولي اهتماماً كبيراً بكل مرحلة من مراحل الإنتاج، من اختيار الأقمشة إلى آخر لمسة في الخياطة، لضمان جودة عالية راحة ومتانة تدوم. نعتمد على مواد مختارة بعناية وحرفيين ذوي خبرة لنقدم ملابس تعكس الأناقة والأصالة في نفس الوقت كل قطعة تمر بعملية إنتاج دقيقة حيث تكون الجودة والدقة هما الأساس، لنضمن أن كل منتج يلبي توقعات المرأة العصرية التي تبحث عن الأناقة والراحة في آن واحد            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
