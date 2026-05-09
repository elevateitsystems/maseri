"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { ReviewSchema, ReviewPayload } from "@/types/api";
import { api } from "@/lib/api";

interface AddReviewFormProps {
  productId: number;
  onSuccess?: () => void;
}

export function AddReviewForm({ productId, onSuccess }: AddReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewPayload>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      productId: productId,
      rating: 5,
      name: "",
      comment: "",
      approved: false,
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: ReviewPayload) => {
    setIsSubmitting(true);
    try {
      await api.addReview(data);
      toast.success('تمت إضافة مراجعتك بنجاح! ستظهر بعد الموافقة عليها.');
      reset({ ...data, name: "", comment: "", rating: 5 });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء إضافة المراجعة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rtl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[24px] font-bold">إضافة مراجعة</h2>
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <Input
            placeholder="الاسم الكامل"
            {...register("name")}
            className="h-12 bg-[#F9F9F9] border border-black/5 rounded-[4px] text-right focus-visible:ring-1 focus-visible:ring-[#B3A495]"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Textarea
            placeholder="اكتب مراجعتك هنا..."
            {...register("comment")}
            className="min-h-[150px] bg-[#F9F9F9] border border-black/5 rounded-[4px] text-right p-4 focus-visible:ring-1 focus-visible:ring-[#B3A495]"
          />
          {errors.comment && <p className="text-red-500 text-xs">{errors.comment.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-[#B3A495] hover:bg-[#a39485] text-white text-[16px] font-medium rounded-[4px] transition-all disabled:opacity-50"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال المراجعة"}
        </Button>
      </form>
    </div>
  );
}