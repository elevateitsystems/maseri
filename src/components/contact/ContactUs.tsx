"use client";

import React from "react";
import Image from "next/image";
import Features from "../home/components/Features";

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
    <section className="relative w-full overflow-hidden  py-16 md:py-24">
      {/* Decorative Background Images */}
      <div className=" absolute left-0 top-0 h-full w-[150px] md:w-[250px] lg:w-[300px] opacity-60 pointer-events-none">
        <Image
          src="/assets/contacts_us_left_image.png"
          alt=""
          fill
          className="object-contain object-left-top"
        />
      </div>
      <div className=" absolute right-0 top-0 h-full w-[150px] md:w-[250px] lg:w-[300px] opacity-60 pointer-events-none">
        <Image
          src="/assets/contacts_us_right_image.png"
          alt=""
          fill
          className="object-contain object-right-top"
        />
      </div>

      <div className="container relative mx-auto px-6 lg:px-10 space-y-6">
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
              className="w-full h-14 bg-[#B3A495] hover:bg-[#a39485] text-white text-[18px] font-medium rounded-[2px] transition-all disabled:opacity-50"
            >
              تقديم
            </button>
          </form>
        </div>

        {/* Features Section */}
        <Features/>
      </div>
    </section>
  );
}
