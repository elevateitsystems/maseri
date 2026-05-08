"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  comment: z.string().min(5),
  rating: z.number().min(1).max(5),
});

export function AddReviewForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 4,
      name: "",
      email: "",
      comment: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="mt-24 mb-20 rtl px-4 md:px-0">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-[28px] font-bold">إضافة مراجعة</h2>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={20}
              fill={s <= rating ? "#FFD700" : "transparent"}
              className={s <= rating ? "text-[#FFD700]" : "text-gray-300 cursor-pointer"}
              onClick={() => setValue("rating", s)}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Input
              placeholder="الاسم"
              {...register("name")}
              className="h-14 bg-[#F9F9F9] border-none rounded-[2px] text-right focus-visible:ring-1 focus-visible:ring-[#B3A495]"
            />
            {errors.name && <p className="text-red-500 text-xs">اسم غير صالح</p>}
          </div>
          <div className="space-y-1">
            <Input
              placeholder="البريد الإلكتروني"
              {...register("email")}
              className="h-14 bg-[#F9F9F9] border-none rounded-[2px] text-right focus-visible:ring-1 focus-visible:ring-[#B3A495]"
            />
            {errors.email && <p className="text-red-500 text-xs">بريد إلكتروني غير صالح</p>}
          </div>
        </div>

        <div className="space-y-1">
          <Textarea
            placeholder="اكتب هنا..."
            {...register("comment")}
            className="min-h-[250px] bg-[#F9F9F9] border-none rounded-[2px] text-right p-6 focus-visible:ring-1 focus-visible:ring-[#B3A495]"
          />
          {errors.comment && <p className="text-red-500 text-xs">التعليق قصير جدًا</p>}
        </div>

        <Button
          type="submit"
          className="w-full h-14 bg-[#B3A495] hover:bg-[#a39485] text-white text-[18px] font-medium rounded-[2px] transition-all"
        >
          يقدم
        </Button>
      </form>
    </div>
  );
}