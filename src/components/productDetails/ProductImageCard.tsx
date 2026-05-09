"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
  HandHeart,
  Star,
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

export function ProductImageCard({ product }: any) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse images from product
  const images: string[] = React.useMemo(() => {
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

  return (
    <div className="px-4 md:px-0 mt-24 md:mt-0 container mx-auto">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* ─── COLUMN 1 (RIGHT in RTL): Product Info ─── */}
        <div className="flex-1 order-2 lg:order-1 flex flex-col text-right">
          <h1 className="text-[36px] font-bold leading-tight text-black mb-4">
            {product.title}
          </h1>

          <div className="flex items-center justify-start gap-10 mb-6">
             <div className="text-[24px] font-bold text-black">
               {product.discountPrice || product.price} د.ج
               {product.discountPrice && (
                 <span className="text-sm line-through text-black/40 mr-2">{product.price} د.ج</span>
               )}
             </div>
             <div className="flex items-center gap-2">
               <span className="text-[14px] text-black/40">({product.reviewsCount || 0} مراجعة)</span>
               <span className="text-[16px] font-medium text-black">{product.rating || 5.0}</span>
               <Star size={18} fill="#FFD700" className="text-[#FFD700]" />
             </div>
          </div>

          <p className="text-[16px] leading-relaxed text-[#666] mb-8">
            {product.description}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 2x2 Grid for Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input
                  placeholder="الاسم الكامل"
                  {...register("fullName")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right placeholder:text-gray-500"
                />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-1">
                <Input
                  placeholder="رقم الهاتف"
                  {...register("phone")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right placeholder:text-gray-500"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
              <div className="space-y-1">
                <Input
                  placeholder="المدينة"
                  {...register("city")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right placeholder:text-gray-500"
                />
                {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
              </div>
              <div className="space-y-1">
                <Input
                  placeholder="العنوان"
                  {...register("address")}
                  className="h-14 bg-[#F9F9F9] border border-black/10 rounded-[2px] text-right placeholder:text-gray-500"
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
            </div>

            <div className="space-y-3">
               <p className="text-[14px] text-black/40">اختر المقاس</p>
               <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {(typeof product.sizeInfo === 'string' ? JSON.parse(product.sizeInfo || '[]') : product.sizeInfo || ["XS", "S", "M", "L"]).map((size: string) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setValue("size", size)}
                      className={`h-11 w-20 flex-shrink-0 flex items-center justify-center text-[14px] font-normal rounded-[2px] transition-all ${
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

            <div className="flex gap-4 items-center pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 bg-[#B3A495] hover:bg-[#a39485] text-[18px] font-normal rounded-[2px] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "جاري المعالجة..." : "اشتري الآن"}
              </Button>

              <div className="flex items-center">
                <button 
                  type="button" 
                  onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))} 
                  className="size-10 flex items-center justify-center border border-[rgba(0,0,0,0.1)] hover:bg-black/5 transition-colors"
                >
                  <Minus size={14} className="text-black/60" />
                </button>
                <div className="size-10 flex items-center justify-center font-normal text-[16px]">
                  {quantity}
                </div>
                <button 
                  type="button" 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="size-10 flex items-center justify-center border border-[rgba(0,0,0,0.1)] hover:bg-black/5 transition-colors"
                >
                  <Plus size={14} className="text-black/60" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6">
               <div className="flex items-center justify-center gap-4 bg-[rgba(0,0,0,0.05)] px-6 py-5 rounded-[2px]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#B3A495] rounded-full" />
                    <HandHeart size={22} className="text-black/40" strokeWidth={1.5} />
                  </div>
                  <span className="text-[16px] text-black font-medium">جودة عالية</span>
               </div>
               <div className="flex items-center justify-center gap-4 bg-[rgba(0,0,0,0.05)] px-6 py-5 rounded-[2px]">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-[#B3A495] rounded-full" />
                   <ShieldCheck size={22} className="text-black/40" strokeWidth={1.5} />
                  </div>
                  <span className="text-[16px] text-black font-medium">توصيل سريع</span>
               </div>
            </div>
          </form>
        </div>

        {/* ─── COLUMN 2 (LEFT in RTL): Image Gallery ─── */}
        <div className="flex-1 md:max-w-[600px] order-1 lg:order-2 flex flex-row gap-4 h-full">
          {/* Main Image */}
          <div className="flex-1 relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden group">
            <img
              src={getImageUrl(images[selectedImageIndex])}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {/* In RTL, Next is Left, Prev is Right */}
            <button 
              onClick={prevImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ChevronRight size={20} className="text-black/60" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ChevronLeft size={20} className="text-black/60" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === selectedImageIndex ? "bg-[#B3A495] w-6" : "bg-white w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails (Left of gallery column) */}
          <div className="hidden md:flex flex-col gap-4 w-[100px]">
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-[3/4] w-full overflow-hidden transition-all ${
                  selectedImageIndex === index ? "opacity-100 ring-1 ring-black/10" : "opacity-60"
                }`}
              >
                <img
                  src={getImageUrl(img)}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}