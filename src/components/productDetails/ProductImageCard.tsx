"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronDown,
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
import { getImageUrl } from "@/lib/api";
import placeholderImage from "../../../assets/placeholder-image.svg";

const formSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  address: z.string().min(5, "العنوان مطلوب"),
  state: z.string().min(1, "الولاية مطلوبة"),
  size: z.string().min(1, "المقاس مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

export function ProductImageCard({ product }: any) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Parse images
  const images: string[] = useMemo(() => {
    try {
      if (Array.isArray(product.images)) return product.images;
      if (typeof product.images === "string") return JSON.parse(product.images);
      return [];
    } catch {
      return [];
    }
  }, [product.images]);

  // Parse sizes
  const sizes: string[] = useMemo(() => {
    try {
      if (Array.isArray(product.sizeInfo)) return product.sizeInfo;
      if (typeof product.sizeInfo === "string")
        return JSON.parse(product.sizeInfo);
      return [];
    } catch {
      return [];
    }
  }, [product.sizeInfo]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      address: "",
      state: "",
      size: "",
    },
  });

  const selectedSize = watch("size");

  const onSubmit = (data: FormValues) => {
    console.log({ ...data, quantity, productId: product.id });
  };

  const currentImage =
    images.length > 0 && images[selectedImageIndex]
      ? getImageUrl(images[selectedImageIndex])
      : placeholderImage.src || placeholderImage;

  return (
    <div dir="rtl">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* ─── RIGHT SIDE (RTL): Product Info ─── */}
        <div className="order-1 flex flex-col">
          {/* Title */}
          <h1 className="text-[32px] font-semibold leading-tight text-black">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-[3px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-[20px] w-[20px] fill-[#FACC15] text-[#FACC15]"
                />
              ))}
            </div>
            <span className="text-[14px] text-black/50">
              0 Reviews
            </span>
          </div>

          {/* Price */}
          <p className="mt-4 text-[28px] font-semibold text-black">
            {product.discountPrice || product.price}{" "}
            <span className="text-[20px] font-normal">د.ج</span>
            {product.discountPrice &&
              product.discountPrice !== product.price && (
                <span className="mr-3 text-[18px] font-normal text-black/40 line-through">
                  {product.price} د.ج
                </span>
              )}
          </p>

          {/* Description */}
          <p className="mt-6 text-[16px] leading-[1.8] text-black/60">
            {product.description}
          </p>

          {/* ─── ORDER FORM ─── */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            {/* Inputs 2-column */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input
                  {...register("fullName")}
                  placeholder="الاسم الكامل"
                  className="h-[52px] rounded-none border-[#d2d2d2] bg-transparent text-right text-[16px] placeholder:text-black/35"
                />
                {errors.fullName && (
                  <p className="mt-1 text-[13px] text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("phone")}
                  placeholder="رقم الهاتف"
                  className="h-[52px] rounded-none border-[#d2d2d2] bg-transparent text-right text-[16px] placeholder:text-black/35"
                />
                {errors.phone && (
                  <p className="mt-1 text-[13px] text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("city")}
                  placeholder="المدينة"
                  className="h-[52px] rounded-none border-[#d2d2d2] bg-transparent text-right text-[16px] placeholder:text-black/35"
                />
                {errors.city && (
                  <p className="mt-1 text-[13px] text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("address")}
                  placeholder="العنوان"
                  className="h-[52px] rounded-none border-[#d2d2d2] bg-transparent text-right text-[16px] placeholder:text-black/35"
                />
                {errors.address && (
                  <p className="mt-1 text-[13px] text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* State Select */}
            <div className="relative">
              <select
                {...register("state")}
                className="h-[52px] w-full appearance-none rounded-none border border-[#d2d2d2] bg-transparent px-4 text-right text-[16px] text-black/60 outline-none"
              >
                <option value="">الولاية</option>
                <option value="alger">الجزائر</option>
                <option value="oran">وهران</option>
                <option value="blida">البليدة</option>
                <option value="constantine">قسنطينة</option>
                <option value="setif">سطيف</option>
              </select>
              <ChevronDown className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40 pointer-events-none" />
              {errors.state && (
                <p className="mt-1 text-[13px] text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="pt-2">
                <p className="mb-3 text-[16px] text-black/50">اختر المقاس</p>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setValue("size", size, { shouldValidate: true })
                      }
                      className={`h-[44px] min-w-[62px] px-5 border text-[16px] uppercase transition-all duration-200 ${
                        selectedSize === size
                          ? "border-[#B3A495] bg-[#B3A495] text-white"
                          : "border-transparent bg-[#E7E0D9] text-black/70"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {errors.size && (
                  <p className="mt-1 text-[13px] text-red-500">
                    {errors.size.message}
                  </p>
                )}
              </div>
            )}

            {/* Quantity + Buy */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              {/* Buy Button */}
              <Button
                type="submit"
                className="h-[52px] flex-1 rounded-none border border-black bg-transparent text-[20px] font-medium text-black shadow-none hover:bg-black hover:text-white transition-all duration-300"
              >
                اشترِ الآن
              </Button>

              {/* Quantity */}
              <div className="flex h-[52px] items-center border border-[#d2d2d2]">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="flex h-full w-[52px] items-center justify-center hover:bg-[#E9E9E9] transition-colors"
                >
                  <Minus className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <div className="flex h-full w-[52px] items-center justify-center border-x border-[#d2d2d2] text-[16px] font-medium">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="flex h-full w-[52px] items-center justify-center hover:bg-[#E9E9E9] transition-colors"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 gap-3 pt-6 md:grid-cols-2">
              <div className="flex items-center justify-between bg-[#E9E9E9] px-5 py-4">
                <span className="text-[16px] text-black/60">حيث تلتقي</span>
                <div className="flex items-center gap-2">
                  <HandHeart className="h-6 w-6 text-black/40" strokeWidth={1.5} />
                  <span className="h-[6px] w-[6px] rounded-full bg-[#B3A495]" />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#E9E9E9] px-5 py-4">
                <span className="text-[16px] text-black/60">حيث تلتقي</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-black/40" strokeWidth={1.5} />
                  <span className="h-[6px] w-[6px] rounded-full bg-[#B3A495]" />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* ─── LEFT SIDE (RTL): Image Gallery ─── */}
        <div className="order-2 flex flex-col-reverse gap-4 md:flex-row">
          {/* Main Image */}
          <div className="flex-1">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E9E9E9]">
              <img
                src={currentImage}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              {/* Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
                  {images.map((_: string, idx: number) => (
                    <span
                      key={idx}
                      className={`h-[8px] w-[8px] rounded-full transition-all ${
                        idx === selectedImageIndex ? "bg-black" : "bg-black/20"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 md:flex-col md:gap-4">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-[80px] w-[70px] overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-black"
                      : "border-transparent"
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
          )}
        </div>
      </div>
    </div>
  );
}