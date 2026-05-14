"use client";

import { useState } from "react";
import { Review } from "@/types/api";
import { Star, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { AddReviewForm } from "./AddReviewForm";
import { api } from "@/lib/api";

// Swiper styles
import "swiper/css";

interface ProductReviewsProps {
  initialReviews: Review[];
  productId: number;
}

export function ProductReviews({
  initialReviews,
  productId,
}: ProductReviewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // Duplicate reviews to ensure the slider always has enough items to loop
  const displayReviews =
    reviews.length > 0
      ? reviews.length < 6
        ? [...reviews, ...reviews, ...reviews]
        : reviews
      : [];

  const handleRefresh = async () => {
    try {
      const data = await api.filterReviews({ approved: true, productId });
      setReviews(data);
    } catch (error) {
      console.error("Failed to refresh reviews:", error);
    }
  };

  return (
    <div className="mt-20 rtl px-4 md:px-0 relative">
      <h2 className="text-[32px] font-bold mb-10 text-right">التعليقات</h2>

      {/* Reviews Slider */}
      <div className="mb-12">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={displayReviews.length > 1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="reviews-swiper"
        >
          {displayReviews.map((r, i) => (
            <SwiperSlide key={i}>
              <div className="h-full p-8 border border-black/5 rounded-[8px] flex flex-col items-start text-right transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={index < r.rating ? "#FFD700" : "transparent"}
                      className={
                        index < r.rating ? "text-[#FFD700]" : "text-gray-200"
                      }
                    />
                  ))}
                </div>

                <p className="text-[15px] leading-relaxed text-black/60 mb-6 italic">
                  &quot;{r.comment || "لا يوجد تعليق"}&quot;
                </p>

                <div className="mt-auto pt-4 w-full">
                  <p className="text-[16px] font-bold text-black">{r.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Add Review Button */}
      <div className="flex justify-center mb-20">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#B3A495] text-white px-12 py-4 rounded-[4px] text-[16px] font-medium hover:bg-[#a39485] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#B3A495]/20"
        >
          إضافة مراجعة
        </button>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
          />

          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[500px] bg-white rounded-[12px] shadow-2xl z-[101] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200">
            <div className="p-6 md:p-8 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 left-4 p-2 hover:bg-black/5 rounded-full transition-colors text-black/40 hover:text-black"
              >
                <X size={20} />
              </button>

              <AddReviewForm
                productId={productId}
                onSuccess={() => {
                  setIsModalOpen(false);
                  handleRefresh();
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
