"use client";

import React, { useState, useMemo } from "react";
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
import placeholderImage from "../../../assets/placeholder-image.svg";

const formSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  address: z.string().min(5, "العنوان مطلوب"),
  size: z.string().min(1, "المقاس مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

// SizeTable Component (Extracted from Accordion)
const SizeTable = () => {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "SL"];
  return (
    <div className="overflow-x-auto w-full mb-4 scrollbar-hide">
      <table className="w-full min-w-[650px] border-collapse border border-[#D1C6B9]">
        <thead>
          <tr className="bg-[#E9E1D8]">
            {Array(5).fill(0).map((_, i) => (
              <th key={i} className="border border-[#D1C6B9] py-5 px-4 text-center text-[18px] font-medium text-black">
                حيث تلتقي
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, idx) => (
            <tr key={idx} className="group">
              {Array(4).fill(0).map((_, i) => (
                <td key={i} className="border border-[#D1C6B9] py-4 px-4 bg-[#F9F7F5] text-center text-[18px] text-black/70 font-medium">
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

export function ProductImageCard({ product }: any) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);

  const images: string[] = useMemo(() => {
    try {
      if (Array.isArray(product.images)) return product.images.length > 0 ? product.images : [placeholderImage.src];
      if (typeof product.images === "string") {
        const parsed = JSON.parse(product.images);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : [placeholderImage.src];
      }
      return [placeholderImage.src];
    } catch (e) {
      return [placeholderImage.src];
    }
  }, [product.images]);

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
    },
  });

  const selectedSize = watch("size");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const names = data.fullName.trim().split(/\s+/);
    const firstName = names[0];
    const lastName = names.slice(1).join(" ") || " ";

    try {
      await api.addOrder({
        productId: product.id,
        quantity: quantity,
        totalAmount: (product.discountPrice || product.price) * quantity,
        size: data.size,
        name: firstName,
        surName: lastName,
        city: data.city,
        address: data.address,
        contact: data.phone,
      });
      toast.success("تم تقديم طلبك بنجاح! سنتصل بك قريباً.");
      reset();
      setQuantity(1);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = () => setSelectedImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const accordionItems = [
    { title: "دليل المقاسات", content: <SizeTable /> },
    { title: "وصف المنتج", content: <p className="text-[16px] leading-[1.8] text-black/60">{product.description || "هذا المنتج مصنوع من خامات عالية الجودة ومناسب للاستخدام اليومي."}</p> },
    { title: "سياسة التوصيل", content: <p className="text-[16px] leading-[1.8] text-black/60">يتم التوصيل خلال 3-5 أيام عمل إلى جميع الولايات.</p> },
  ];

  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-10 lg:gap-20 h-auto md:h-[800px]">
        
        {/* ─── RIGHT SIDE (Visually) / FIRST IN DOM: Product Details + Form ─── */}
        <div className="flex-1 flex flex-col text-right order-2 md:order-1 h-full md:overflow-y-auto no-scrollbar">
          <h1 className="text-[32px] md:text-[42px] font-bold leading-tight text-black mb-4">
            {product.title}
          </h1>

          <div className="flex items-center justify-start gap-8 mb-8">
            <div className="text-[28px] font-bold text-black">
              {product.discountPrice || product.price} د.ج
              {product.discountPrice && <span className="text-[16px] line-through text-black/40 mr-3">{product.price} د.ج</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-black/40">({product.reviewsCount || 0} مراجعة)</span>
              <span className="text-[16px] font-medium text-black">{product.rating || 5.0}</span>
              <Star size={18} fill="#FFD700" className="text-[#FFD700]" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input placeholder="الاسم الكامل" {...register("fullName")} className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right" />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-1">
                <Input placeholder="رقم الهاتف" {...register("phone")} className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right" />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
              <div className="space-y-1">
                <Input placeholder="المدينة" {...register("city")} className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right" />
                {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
              </div>
              <div className="space-y-1">
                <Input placeholder="العنوان" {...register("address")} className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right" />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[14px] text-black/40">اختر المقاس</p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {(typeof product.sizeInfo === 'string' ? JSON.parse(product.sizeInfo || '[]') : product.sizeInfo || ["XS", "S", "M", "L"]).map((size: string) => (
                  <button key={size} type="button" onClick={() => setValue("size", size)} className={`h-11 w-20 flex-shrink-0 flex items-center justify-center text-[14px] rounded-[2px] transition-all ${selectedSize === size ? "bg-[#B3A495] text-white" : "bg-[#E9E1D8] text-black/60"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-[#B3A495] hover:bg-[#a39485] text-[20px] font-medium rounded-[2px] transition-all">
                {isSubmitting ? "جاري المعالجة..." : "اشتري الآن"}
              </Button>
              <div className="flex items-center border border-black/10 h-14">
                <button type="button" onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))} className="w-12 h-full flex items-center justify-center hover:bg-black/5"><Minus size={16} /></button>
                <div className="w-12 h-full flex items-center justify-center text-[18px]">{quantity}</div>
                <button type="button" onClick={() => setQuantity(q => q + 1)} className="w-12 h-full flex items-center justify-center hover:bg-black/5"><Plus size={16} /></button>
              </div>
            </div>

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
        </div>

        {/* ─── LEFT SIDE (Visually) / SECOND IN DOM: Image + FAQ (Scrollable) ─── */}
        <div className="flex-1 flex flex-col md:overflow-y-auto no-scrollbar order-1 md:order-2 h-full">
          {/* Main Gallery */}
          <div className="flex flex-row gap-4 mb-10 h-auto md:h-[600px] flex-shrink-0">


            {/* Main Image */}
            <div className="flex-1 relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden rounded-[4px]">
              <img src={getImageUrl(images[selectedImageIndex])} alt={product.title} className="h-full w-full object-cover" />
              <button onClick={prevImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                <ChevronRight size={20} className="text-black/60" />
              </button>
              <button onClick={nextImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                <ChevronLeft size={20} className="text-black/60" />
              </button>
            </div>

                        {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-[100px]">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-[3/4] w-full overflow-hidden rounded-[4px] transition-all ${
                    selectedImageIndex === index ? "ring-2 ring-[#B3A495]" : "opacity-60"
                  }`}
                >
                  <img src={getImageUrl(img)} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Accordion (FAQ) - Appears after image in scroll area */}
          <div className="space-y-2 pb-10 order-3 md:order-2">
            {accordionItems.map((item, i) => (
              <div key={i} className="border-b border-[#E9E9E9]">
                <button
                  onClick={() => setOpenAccordionIndex(openAccordionIndex === i ? null : i)}
                  className="flex w-full items-center justify-between py-6 text-right group"
                >
                  <span className="text-[20px] font-medium text-black">{item.title}</span>
                  <ChevronDown className={`h-5 w-5 text-black transition-transform duration-500 ${openAccordionIndex === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordionIndex === i ? "max-h-[1000px] opacity-100 pb-8" : "max-h-0 opacity-0"}`}>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}