
"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
  HandHeart,
  Star,
  ChevronDown,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, getImageUrl } from "@/lib/api";
import { toast } from "react-toastify";
import { Product } from "@/types/api";

import placeholderImage from "../../../assets/placeholder-image.svg";
import Image from "next/image";

/* SWIPER */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

const formSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  address: z.string().min(5, "العنوان مطلوب"),
  size: z.string().min(1, "المقاس مطلوب"),
  status: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SizeTable = () => {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "SL"];

  return (
    <div className="overflow-x-auto w-full mb-4 scrollbar-hide">
      <table className="w-full min-w-[650px] border-collapse border border-[#D1C6B9]">
        <thead>
          <tr className="bg-[#E9E1D8]">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <th
                  key={i}
                  className="border border-[#D1C6B9] py-5 px-4 text-center text-[18px] font-medium text-black"
                >
                  حيث تلتقي
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {sizes.map((size, idx) => (
            <tr key={idx}>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <td
                    key={i}
                    className="border border-[#D1C6B9] py-4 px-4 bg-[#F9F7F5] text-center text-[18px] text-black/70 font-medium"
                  >
                    78 - 90
                  </td>
                ))}

              <td className="border border-[#D1C6B9] py-4 px-4 bg-[#E9E1D8] text-center text-[18px] font-medium text-black">
                {size}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export function ProductImageCard({ product }: { product: Product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] =
    useState<number | null>(null);

  const [showStickyButton, setShowStickyButton] = useState(false);

  const imageColRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const swiperRef = useRef<any>(null);

  const images: string[] = useMemo(() => {
    try {
      if (Array.isArray(product.images)) {
        return product.images.length > 0
          ? product.images
          : [placeholderImage.src];
      }

      if (typeof product.images === "string") {
        const parsed = JSON.parse(product.images);

        return Array.isArray(parsed) && parsed.length > 0
          ? parsed
          : [placeholderImage.src];
      }

      return [placeholderImage.src];
    } catch {
      return [placeholderImage.src];
    }
  }, [product.images]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(selectedImageIndex);
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      address: "",
      size: "S",
      status: "in progress",
    },
  });

  const selectedSize = watch("size");

  const imageUrl = (src: string) =>
    src.startsWith("/") ? src : getImageUrl(src);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    const names = data.fullName.trim().split(/\s+/);

    const firstName = names[0];
    const lastName = names.slice(1).join(" ") || " ";

    try {
      await api.addOrder({
        productId: product.id,
        quantity,
        totalAmount:
          (product.discountPrice || product.price) * quantity,
        size: data.size,
        name: firstName,
        surName: lastName,
        city: data.city,
        address: data.address,
        contact: data.phone,
        status: data.status,
      });

      toast.success("تم تقديم طلبك بنجاح! سنتصل بك قريباً.");

      reset();

      setQuantity(1);
    } catch (error) {
      console.error(error);

      toast.error(
        "حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const accordionItems = [
    {
      title: "دليل المقاسات",
      content: <SizeTable />,
    },

    {
      title: "وصف المنتج",
      content: (
        <p className="text-[16px] leading-[1.8] text-black/60">
          {product.description ||
            "هذا المنتج مصنوع من خامات عالية الجودة ومناسب للاستخدام اليومي."}
        </p>
      ),
    },

    {
      title: "سياسة التوصيل",
      content: (
        <p className="text-[16px] leading-[1.8] text-black/60">
          يتم التوصيل خلال 3-5 أيام عمل إلى جميع الولايات.
        </p>
      ),
    },
  ];

  const statusOptions = [
    { value: "in progress", label: "قيد التنفيذ" },
    { value: "to call back", label: "بانتظار الاتصال" },
    { value: "confirm", label: "تأكيد" },
    { value: "completed", label: "مكتمل" },
    { value: "cancelled", label: "ملغى" },
  ];

  const scrollToForm = () => {
    const formElement = document.getElementById("order-form");

    if (formElement) {
      formElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-10 lg:px-10">
      <div
        ref={sectionRef}
        className="flex flex-col md:flex-row gap-0 lg:gap-10 h-auto md:h-[900px]"
      >
        {/* IMAGE GALLERY */}
        <div
          ref={imageColRef}
          className="flex-1 flex flex-col md:overflow-y-auto no-scrollbar order-1 md:order-2 h-full"
        >
          <div className="flex flex-row gap-4 mb-10 h-auto md:h-[750px] flex-shrink-0">
            {/* MAIN SLIDER */}
            <div className="flex-1 relative bg-[#F5F5F5] overflow-hidden rounded-[4px]">
              <Swiper
                modules={[Navigation, Pagination, Zoom]}
                zoom={{
                  maxRatio: 3,
                }}
                loop={true}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                pagination={{
                  clickable: true,
                  el: ".custom-pagination",
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) =>
                  setSelectedImageIndex(swiper.activeIndex)
                }
                className="h-fit w-full"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container">
                      <div className="relative w-full h-[500px] md:h-[750px] bg-[#F5F5F5]">
                        <Image
                          src={imageUrl(img)}
                          alt={`Product ${index + 1}`}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain select-none cursor-zoom-in"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/* DESKTOP NAVIGATION */}
                <button
                  onClick={prevImage}
                  className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-14 h-14 rounded-full bg-white items-center justify-center shadow-xl border border-black/5"
                >
                  <ChevronLeft
                    size={26}
                    className="text-black/80"
                  />
                </button>

                <button
                  onClick={nextImage}
                  className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-14 h-14 rounded-full bg-white items-center justify-center shadow-xl border border-black/5"
                >
                  <ChevronRight
                    size={26}
                    className="text-black/80"
                  />
                </button>
              </Swiper>

              {/* PAGINATION */}
              <div className="custom-pagination mt-5 flex justify-center gap-2" />
            </div>

            {/* THUMBNAILS */}
            <div className="hidden md:flex flex-col gap-3 w-[100px]">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-[3/4] w-full overflow-hidden rounded-[4px] transition-all ${
                    selectedImageIndex === index
                      ? "ring-2 ring-[#B3A495]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imageUrl(img)}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ACCORDION DESKTOP */}
          <div className="hidden md:block space-y-2 pb-10">
            {accordionItems.map((item, i) => (
              <div key={i} className="border-b border-[#E9E9E9]">
                <button
                  onClick={() =>
                    setOpenAccordionIndex(
                      openAccordionIndex === i ? null : i
                    )
                  }
                  className="flex w-full items-center justify-between py-6 text-right"
                >
                  <span className="text-[20px] font-medium text-black">
                    {item.title}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-black transition-transform duration-500 ${
                      openAccordionIndex === i
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openAccordionIndex === i
                      ? "max-h-[1000px] opacity-100 pb-8"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div
          id="order-form"
          className="flex-1 flex flex-col text-right order-2 md:order-1 h-full md:overflow-y-auto no-scrollbar"
        >
          <h1 className="text-[32px] md:text-[42px] font-bold leading-tight text-black mb-4">
            {product.title}
          </h1>

          <div className="flex items-center justify-start gap-8 mb-8">
            <div className="text-[28px] font-bold text-black">
              {product.discountPrice || product.price} د.ج

              {product.discountPrice && (
                <span className="text-[16px] line-through text-black/40 mr-3">
                  {product.price} د.ج
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[14px] text-black/40">
                ({product.reviewsCount || 0} مراجعة)
              </span>

              <span className="text-[16px] font-medium text-black">
                {product.rating || 5.0}
              </span>

              <Star
                size={18}
                fill="#FFD700"
                className="text-[#FFD700]"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input
                  placeholder="الاسم الكامل"
                  {...register("fullName")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right"
                />

                {errors.fullName && (
                  <p className="text-red-500 text-xs">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Input
                  placeholder="رقم الهاتف"
                  {...register("phone")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right"
                />

                {errors.phone && (
                  <p className="text-red-500 text-xs">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Input
                  placeholder="المدينة"
                  {...register("city")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right"
                />

                {errors.city && (
                  <p className="text-red-500 text-xs">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Input
                  placeholder="العنوان"
                  {...register("address")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right"
                />

                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* STATUS */}
              <div className="col-span-2 space-y-1">
                <div className="relative">
                  <select
                    {...register("status")}
                    className="w-full h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right px-4 appearance-none outline-none focus:ring-1 focus:ring-[#B3A495] pr-4 pl-10"
                    dir="rtl"
                  >
                    {statusOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown
                      size={20}
                      className="text-black/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SIZE */}
            <div className="space-y-3">
              <p className="text-[14px] text-black/40">
                اختر المقاس
              </p>

              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {(typeof product.sizeInfo === "string"
                  ? JSON.parse(product.sizeInfo || "[]")
                  : product.sizeInfo || ["XS", "S", "M", "L"]
                ).map((size: string) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setValue("size", size)}
                    className={`h-11 w-20 flex-shrink-0 flex items-center justify-center text-[14px] rounded-[2px] transition-all ${
                      selectedSize === size
                        ? "bg-[#B3A495] text-white"
                        : "bg-[#E9E1D8] text-black/60"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* BUY */}
            <div className="flex gap-4 items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-14 bg-[#B3A495] hover:bg-[#a39485] text-[20px] font-medium rounded-[2px]"
              >
                {isSubmitting
                  ? "جاري المعالجة..."
                  : "اشتري الآن"}
              </Button>

              <div className="flex items-center border border-black/10 h-14">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => (q > 1 ? q - 1 : 1))
                  }
                  className="w-12 h-full flex items-center justify-center hover:bg-black/5"
                >
                  <Minus size={16} />
                </button>

                <div className="w-12 h-full flex items-center justify-center text-[18px]">
                  {quantity}
                </div>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-full flex items-center justify-center hover:bg-black/5"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center justify-center gap-4 bg-black/5 py-5 rounded-[2px]">
                <HandHeart
                  size={22}
                  className="text-[#B3A495]"
                />

                <span className="text-[16px] font-medium">
                  جودة عالية
                </span>
              </div>

              <div className="flex items-center justify-center gap-4 bg-black/5 py-5 rounded-[2px]">
                <ShieldCheck
                  size={22}
                  className="text-[#B3A495]"
                />

                <span className="text-[16px] font-medium">
                  توصيل سريع
                </span>
              </div>
            </div>
          </form>

          {/* MOBILE ACCORDION */}
          <div className="block md:hidden space-y-2 py-10">
            {accordionItems.map((item, i) => (
              <div key={i} className="border-b border-[#E9E9E9]">
                <button
                  onClick={() =>
                    setOpenAccordionIndex(
                      openAccordionIndex === i ? null : i
                    )
                  }
                  className="flex w-full items-center justify-between py-6 text-right"
                >
                  <span className="text-[20px] font-medium text-black">
                    {item.title}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-black transition-transform duration-500 ${
                      openAccordionIndex === i
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openAccordionIndex === i
                      ? "max-h-[1000px] opacity-100 pb-8"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STICKY BUTTON */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-black/5 transition-all duration-500 z-[100] ${
          showStickyButton
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <Button
          onClick={scrollToForm}
          className="w-full h-14 bg-[#B3A495] hover:bg-[#a39485] text-[20px] font-medium rounded-[2px] shadow-lg"
        >
          اشتري الآن
        </Button>
      </div>
    </div>
  );
}
