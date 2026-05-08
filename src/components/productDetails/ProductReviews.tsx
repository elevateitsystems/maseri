import { Star } from "lucide-react";

export function ProductReviews({ reviews }: any) {
  return (
    <div className="mt-20 rtl px-4 md:px-0">
      <h2 className="text-[32px] font-bold mb-10 text-right">التعليقات</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {reviews.map((r: any, i: number) => (
          <div
            key={i}
            className="p-8 bg-[#FDFDFD] border border-[#EEEEEE] rounded-[4px] shadow-sm flex flex-col items-start text-right"
          >
            {/* stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={index < r.rating ? "#FFD700" : "transparent"}
                  className={index < r.rating ? "text-[#FFD700]" : "text-gray-300"}
                />
              ))}
            </div>

            <p className="text-[14px] leading-relaxed text-[#555555] mb-6">
              {r.comment || "حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة"}
            </p>

            <p className="text-[16px] font-bold text-black mt-auto">{r.name}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-[#B3A495] text-white px-10 py-3 rounded-[2px] text-[16px] font-medium hover:bg-[#a39485] transition-colors">
          إضافة مراجعة
        </button>
      </div>
    </div>
  );
}