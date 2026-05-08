"use client";

import React from "react";
import Image from "next/image";

const features = [
  {
    icon: "/assets/features/hand-love.png",
    title: "صناعة يدوية",
  },
  {
    icon: "/assets/features/doller.png",
    title: "الدفع عند الاستلام",
  },
  {
    icon: "/assets/features/box.png",
    title: "توصيل لكل الولايات",
  },
  {
    icon: "/assets/features/location.png",
    title: "صنع في الجزائر",
  },
];

export default function ContactUs() {
  return (
    <section className="relative w-full overflow-hidden  py-16 md:py-24 bg-[#F2F2F2]">
      {/* Decorative Background Images */}
      <div className="absolute left-0 top-0 h-full w-[150px] md:w-[250px] lg:w-[300px] opacity-60 pointer-events-none">
        <Image
          src="/assets/contacts_us_left_image.png"
          alt=""
          fill
          className="object-contain object-left-top"
        />
      </div>
      <div className="absolute right-0 top-0 h-full w-[150px] md:w-[250px] lg:w-[300px] opacity-60 pointer-events-none">
        <Image
          src="/assets/contacts_us_right_image.png"
          alt=""
          fill
          className="object-contain object-right-top"
        />
      </div>

      <div className="container relative mx-auto px-6 lg:px-10">
        {/* Contact Form Section */}
        <div className="full mx-auto text-center">
          <h1 className="text-[40px] md:text-[60px] font-bold text-black mb-10 mt-8">
            اتصل بنا
          </h1>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="اسم"
                  className="w-full h-[60px] px-6 bg-transparent border border-[#E6E6E6] text-black focus:outline-none focus:border-primary-900 transition-colors placeholder:text-neutral-400 text-right"
                />
              </div>
              <div className="relative">
                <input
                  // type="text"
                  placeholder="بريد إلكتروني"
                  className="w-full h-[60px] px-6 bg-transparent border border-[#E6E6E6] text-black focus:outline-none focus:border-primary-900 transition-colors placeholder:text-neutral-400 text-right"
                />
              </div>
            </div>
            <div className="relative">
              <textarea
                placeholder="رسالة"
                rows={6}
                className="w-full px-6 py-4 bg-transparent border border-[#E6E6E6] text-black focus:outline-none focus:border-primary-900 transition-colors placeholder:text-neutral-400 text-right resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full h-[60px] border border-[#DBDBDB] text-black text-[18px] font-medium hover:bg-[#B3A495] hover:text-white transition-all duration-300"
            >
              تقديم
            </button>
          </form>
        </div>

        {/* Features Section */}
        <div className="mt-24 md:mt-32 text-center">
          <h2 className="text-[18px] text-neutral-600 mb-4">لماذا تختارنا</h2>
          <p className="max-w-[800px] mx-auto text-[24px] md:text-[32px] leading-relaxed font-bold text-black mb-16">
            نوفر لك تجربة تسوق سهلة وآمنة مع الدفع عند الاستلام، تصنيع في
            الجزائر، تصاميم مصنوعة يدوياً، وتوصيل لكل الولايات عبر الوطن
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <div className="relative size-20 md:size-24">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain grayscale-[0.5] opacity-80"
                  />
                </div>
                <span className="text-[16px] md:text-[18px] font-medium text-black">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
