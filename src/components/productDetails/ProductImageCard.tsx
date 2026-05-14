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

// ─── Types ────────────────────────────────────────────────────────────────────
interface Commune {
  id: number;
  nameFr: string;
  nameAr: string;
}

interface Country {
  id: number;
  nameFr: string;
  nameAr: string;
  price1: number | null;
  price2: number | null;
  communes: string | Commune[];
}

// ─── Schema ───────────────────────────────────────────────────────────────────
const formSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  address: z.string().min(5, "العنوان مطلوب"),
  size: z.string().min(1, "المقاس مطلوب"),
  color: z.string().optional(),
  country: z.string().optional(),
  commune: z.string().optional(),
  shippingType: z.enum(["domicile", "bureau"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Size Table ───────────────────────────────────────────────────────────────
const SizeTable = () => {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "SL"];
  return (
    <div className="overflow-x-auto w-full mb-4 scrollbar-hide">
      <table className="w-full min-w-[100%] md:min-w-[650px] border-collapse border border-[#D1C6B9]">
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

// ─── Main Component ───────────────────────────────────────────────────────────
export function ProductImageCard({ product }: { product: Product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null,
  );
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  // Country / shipping state
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [shippingType, setShippingType] = useState<"domicile" | "bureau">(
    "domicile",
  );

  const imageColRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  // ── Detect RTL ────────────────────────────────────────────────────────────
  useEffect(() => {
    setIsRTL(
      document.documentElement.dir === "rtl" ||
        document.documentElement.lang?.startsWith("ar"),
    );
  }, []);

  // ── Fetch countries once ──────────────────────────────────────────────────
  useEffect(() => {
    fetch("https://back.testwebapp.space/getCountries")
      .then((r) => r.json())
      .then((json) => setCountries(json.data ?? []))
      .catch(console.error);
  }, []);

  const images: string[] = useMemo(() => {
    try {
      if (Array.isArray(product.images))
        return product.images.length > 0
          ? product.images
          : [placeholderImage.src];
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
    if (swiperRef.current) swiperRef.current.slideTo(selectedImageIndex);
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleScroll = () => setShowStickyButton(window.scrollY > 500);
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
      address: "",
      size: "S",
      shippingType: "domicile",
    },
  });

  const selectedSize = watch("size");

  const imageUrl = (src: string) =>
    src.startsWith("/") ? src : getImageUrl(src);

  const nextImage = () => setSelectedImageIndex((p) => (p + 1) % images.length);
  const prevImage = () =>
    setSelectedImageIndex((p) => (p - 1 + images.length) % images.length);

  // ── Country select handler ────────────────────────────────────────────────
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found =
      countries.find((c) => String(c.id) === e.target.value) ?? null;
    setSelectedCountry(found);
    setValue("country", found ? String(found.id) : "");
    setValue("commune", "");

    if (found) {
      const parsed: Commune[] =
        typeof found.communes === "string"
          ? JSON.parse(found.communes)
          : found.communes;
      setCommunes(parsed);
    } else {
      setCommunes([]);
    }
  };

  // ── Computed shipping price ───────────────────────────────────────────────
  const shippingPrice = useMemo(() => {
    if (!selectedCountry) return null;
    return shippingType === "domicile"
      ? selectedCountry.price1
      : selectedCountry.price2;
  }, [selectedCountry, shippingType]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const names = data.fullName.trim().split(/\s+/);
    const firstName = names[0];
    const lastName = names.slice(1).join(" ") || " ";

    // Parse selected color back to integer (strip leading "#")
    const colorInt = selectedColor
      ? parseInt(selectedColor.replace("#", ""), 16)
      : null;

    try {
      await api.addOrder({
        productId: product.id,
        quantity,
        totalAmount: (product.discountPrice || product.price) * quantity,
        size: data.size,
        name: firstName,
        surName: lastName,
        city: data.commune || data.country || "",
        address: data.address,
        contact: data.phone,
        status: "confirm",
        // ── new fields ──────────────────────────────────────────────────────
        country: selectedCountry ? selectedCountry.nameAr : undefined,
        countryPrice1: selectedCountry?.price1 ?? null,
        countryPrice2: selectedCountry?.price2 ?? null,
        color: colorInt,
      });

      toast.success("تم تقديم طلبك بنجاح! سنتصل بك قريباً.");
      reset();
      setQuantity(1);
      setSelectedCountry(null);
      setSelectedColor("");
      setCommunes([]);
      setShippingType("domicile");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const accordionItems = [
    { title: "دليل المقاسات", content: <SizeTable /> },
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

  const scrollToForm = () => {
    document
      .getElementById("order-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const colors: string[] = useMemo(() => {
    try {
      const parsed =
        typeof product.colors === "string"
          ? JSON.parse(product.colors)
          : product.colors;
      if (!Array.isArray(parsed)) return [];
      return parsed.map(
        (num: number) => `#${Number(num).toString(16).slice(-6)}`,
      );
    } catch {
      return [];
    }
  }, [product.colors]);

  const [selectedColor, setSelectedColor] = useState("");

  // ── Select shared classes ─────────────────────────────────────────────────
  const selectCls =
    "w-full h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right px-4 appearance-none outline-none focus:ring-1 focus:ring-[#B3A495] pr-4 pl-10";

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={sectionRef}
        className="flex flex-col md:flex-row gap-0 sm:gap-5 lg:gap-10 h-auto md:h-[900px] w-full min-w-0"
      >
        {/* ── IMAGE GALLERY ──────────────────────────────────────────────── */}
        <div
          ref={imageColRef}
          className="flex-1 flex flex-col md:overflow-y-auto no-scrollbar order-1 md:order-2 h-full w-full min-w-0"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-10 h-auto md:h-[750px] flex-shrink-0 w-full">
            {/* MAIN SLIDER */}
            <div className="flex-1 relative bg-[#F5F5F5] overflow-hidden rounded-[4px]">
              <Swiper
                modules={[Navigation, Pagination, Zoom]}
                zoom={{ maxRatio: 3 }}
                loop={false}
                navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
                pagination={{ clickable: true, el: ".custom-pagination" }}
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
                          loading="eager"
                          quality={75}
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover select-none cursor-zoom-in"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                {/* PREV BUTTON — RIGHT SIDE IN RTL */}
                <button
                  onClick={() => {
                    if (isRTL) {
                      prevImage();
                    } else {
                      nextImage();
                    }
                  }}
                  disabled={selectedImageIndex === 0}
                  className={`absolute top-1/2 -translate-y-1/2 z-20 hidden md:flex w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm items-center justify-center shadow-xl border border-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 ${
                    isRTL ? "right-4" : "left-4"
                  }`}
                >
                  {isRTL ? (
                    <ChevronRight size={26} className="text-black/80" />
                  ) : (
                    <ChevronLeft size={26} className="text-black/80" />
                  )}
                </button>

                {/* NEXT BUTTON — LEFT SIDE IN RTL */}
                <button
                  onClick={() => {
                    if (isRTL) {
                      nextImage();
                    } else {
                      prevImage();
                    }
                  }}
                  disabled={selectedImageIndex === images.length - 1}
                  className={`absolute top-1/2 -translate-y-1/2 z-20 hidden md:flex w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm items-center justify-center shadow-xl border border-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 ${
                    isRTL ? "left-4" : "right-4"
                  }`}
                >
                  {isRTL ? (
                    <ChevronLeft size={26} className="text-black/80" />
                  ) : (
                    <ChevronRight size={26} className="text-black/80" />
                  )}
                </button>
              </Swiper>
              <div className="custom-pagination mt-5 flex justify-center gap-2" />
            </div>

            {/* THUMBNAILS */}
            <div className="hidden md:flex flex-col gap-3 w-[100px] p-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-[3/4] w-full overflow-hidden rounded-[4px] transition-all ${selectedImageIndex === index ? "ring-2 ring-[#B3A495]" : "opacity-60 hover:opacity-100"}`}
                >
                  <Image
                    src={imageUrl(img)}
                    alt={`Thumbnail ${index + 1}`}
                    quality={75}
                    loading="eager"
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
                    setOpenAccordionIndex(openAccordionIndex === i ? null : i)
                  }
                  className="flex w-full items-center justify-between py-6 text-right"
                >
                  <span className="text-[20px] font-medium text-black">
                    {item.title}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-black transition-transform duration-500 ${openAccordionIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordionIndex === i ? "max-h-[1000px] opacity-100 pb-8" : "max-h-0 opacity-0"}`}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PRODUCT DETAILS / FORM ─────────────────────────────────────── */}
        <div
          id="order-form"
          className="flex-1 flex flex-col items-start w-full text-right order-2 md:order-1 h-full md:overflow-y-auto no-scrollbar px-0 min-w-0"
        >
          <h1 className="text-[32px] md:text-[42px] font-bold leading-tight text-black mb-4">
            {product.title}
          </h1>

          <div className="flex items-center flex-col justify-start gap-8 mb-8">
            <div className="text-[28px] font-bold text-black">
              {product.discountPrice || product.price} د.ج
              {product.discountPrice && (
                <span className="text-[16px] line-through text-black/40 mr-3">
                  {product.price} د.ج
                </span>
              )}
            </div>
            {product.description && (
              <p className="block md:hidden text-[15px] leading-[1.8] text-black/60 mb-6 text-right">
                {product.description}
              </p>
            )}
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-black/40">
                ({product.reviewsCount || 0} مراجعة)
              </span>
              <span className="text-[16px] font-medium text-black">
                {product.rating || 5.0}
              </span>
              <Star size={18} fill="#FFD700" className="text-[#FFD700]" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
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

              {/* Phone */}
              <div className="space-y-1">
                <Input
                  placeholder="رقم الهاتف"
                  {...register("phone")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>

              {/* Wilaya */}
              <div className="col-span-2 space-y-1">
                <div className="relative">
                  <select
                    onChange={handleCountryChange}
                    defaultValue=""
                    className={selectCls}
                    dir="rtl"
                  >
                    <option value="" disabled>
                      اختر الولاية
                    </option>
                    {countries.map((c) => (
                      <option key={c.id} value={String(c.id)}>
                        {c.nameAr}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={20} className="text-black/40" />
                  </div>
                </div>
              </div>

              {/* Commune */}
              {communes.length > 0 && (
                <div className="col-span-2 space-y-1">
                  <div className="relative">
                    <select
                      {...register("commune")}
                      defaultValue=""
                      className={selectCls}
                      dir="rtl"
                    >
                      <option value="" disabled>
                        اختر البلدية
                      </option>
                      {communes.map((cm) => (
                        <option key={cm.id} value={String(cm.id)}>
                          {cm.nameAr}
                        </option>
                      ))}
                    </select>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={20} className="text-black/40" />
                    </div>
                  </div>
                </div>
              )}

              {/* Address — full width */}
              <div className="col-span-2 space-y-1">
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
            </div>

            {/* ── SIZE ─────────────────────────────────────────────────────── */}
            <div className="space-y-3">
              <p className="text-[14px] text-black/40">اختر المقاس</p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {(typeof product.sizeInfo === "string"
                  ? JSON.parse(product.sizeInfo || "[]")
                  : product.sizeInfo || ["XS", "S", "M", "L"]
                ).map((size: string) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setValue("size", size)}
                    className={`h-11 w-20 flex-shrink-0 flex items-center justify-center text-[14px] rounded-[2px] transition-all ${selectedSize === size ? "bg-[#B3A495] text-white" : "bg-[#E9E1D8] text-black/60"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ── COLORS ───────────────────────────────────────────────────── */}
            {colors.length > 0 && (
              <div className="space-y-3">
                <p className="text-[14px] text-black/40">اختر اللون</p>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color);
                        setValue("color", color);
                      }}
                      className={`relative h-11 w-11 rounded-1 border-2 transition-all flex-shrink-0 ${selectedColor === color ? "border-black scale-90" : "border-black/10"}`}
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── SHIPPING METHOD ───────────────────────────────────────────── */}
            {selectedCountry && (
              <div className="space-y-3">
                <p className="text-[14px] text-black/40 text-right">
                  اختر طريقة الشحن
                </p>
                <div className="space-y-2">
                  {/* A domicile */}
                  <label
                    className={`flex items-center justify-between gap-3 px-4 h-14 border rounded-[2px] cursor-pointer transition-all ${shippingType === "domicile" ? "border-[#B3A495] bg-[#F9F7F5]" : "border-black/10 bg-[#F9F9F9]"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${shippingType === "domicile" ? "border-[#B3A495]" : "border-black/30"}`}
                      >
                        {shippingType === "domicile" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#B3A495]" />
                        )}
                      </div>
                      <span className="text-[15px] font-medium text-black">
                        A domicile
                      </span>
                    </div>
                    {selectedCountry.price1 !== null ? (
                      <span className="text-[15px] font-bold text-[#B3A495]">
                        {selectedCountry.price1} د.ج
                      </span>
                    ) : (
                      <span className="text-[13px] text-black/40">
                        99.99 د.ج
                      </span>
                    )}
                    <input
                      type="radio"
                      className="hidden"
                      checked={shippingType === "domicile"}
                      onChange={() => {
                        setShippingType("domicile");
                        setValue("shippingType", "domicile");
                      }}
                    />
                  </label>

                  {/* Bureau DHD */}
                  <label
                    className={`flex items-center justify-between gap-3 px-4 h-14 border rounded-[2px] cursor-pointer transition-all ${shippingType === "bureau" ? "border-[#B3A495] bg-[#F9F7F5]" : "border-black/10 bg-[#F9F9F9]"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${shippingType === "bureau" ? "border-[#B3A495]" : "border-black/30"}`}
                      >
                        {shippingType === "bureau" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#B3A495]" />
                        )}
                      </div>
                      <span className="text-[15px] font-medium text-black">
                        Bureau DHD
                      </span>
                    </div>
                    {selectedCountry.price2 !== null ? (
                      <span className="text-[15px] font-bold text-[#B3A495]">
                        {selectedCountry.price2} د.ج
                      </span>
                    ) : (
                      <span className="text-[13px] text-black/40">
                        99.99 د.ج
                      </span>
                    )}
                    <input
                      type="radio"
                      className="hidden"
                      checked={shippingType === "bureau"}
                      onChange={() => {
                        setShippingType("bureau");
                        setValue("shippingType", "bureau");
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* ── BUY BUTTON ───────────────────────────────────────────────── */}
            <div className="flex gap-4 items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-14 bg-[#B3A495] hover:bg-[#a39485] text-[20px] font-medium rounded-[2px]"
              >
                {isSubmitting ? "جاري المعالجة..." : "اشتري الآن"}
              </Button>
              <div className="flex items-center border border-black/10 h-14">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
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

            {/* ── FEATURES ─────────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center justify-center gap-4 bg-black/5 py-5 rounded-[2px]">
                <HandHeart size={22} className="text-[#B3A495]" />
                <span className="text-[16px] font-medium">جودة عالية</span>
              </div>
              <div className="flex items-center justify-center gap-4 bg-black/5 py-5 rounded-[2px]">
                <ShieldCheck size={22} className="text-[#B3A495]" />
                <span className="text-[16px] font-medium">توصيل سريع</span>
              </div>
            </div>
          </form>

          {/* MOBILE ACCORDION */}
          <div className="block md:hidden space-y-2 py-10">
            {accordionItems
              .filter((_, i) => i !== 1)
              .map((item, i) => (
                <div key={i} className="border-b border-[#E9E9E9]">
                  <button
                    onClick={() =>
                      setOpenAccordionIndex(openAccordionIndex === i ? null : i)
                    }
                    className="flex w-full items-center justify-between py-6 text-right"
                  >
                    <span className="text-[20px] font-medium text-black">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-black transition-transform duration-500 ${openAccordionIndex === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordionIndex === i ? "max-h-[1000px] opacity-100 pb-8" : "max-h-0 opacity-0"}`}
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
        className={`fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-black/5 transition-all duration-500 z-[100] ${showStickyButton ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
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
