import { Category } from "@/types/api";
import CategorySliderDynamic from "./CategorySliderDynamic";

const BASE_URL = "https://back.testwebapp.space";

export default async function CategoryCarousel() {
  let rawCats: Category[] = [];
  
  try {
    const res = await fetch(`${BASE_URL}/getCata`, { 
        next: { revalidate: 3600 } 
    });
    const json = await res.json();
    rawCats = json.data || [];
  } catch (error) {
    console.error("Failed to fetch categories on server:", error);
  }

  if (!rawCats.length) return null;

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden py-10 md:py-12 px-0 md:px-0"
    >
      {/* Soft Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[1200px] h-[800px] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="text-center mb-4 md:mb-6 relative z-10 px-4 md:px-0">
        <h1
          className="font-bold text-black leading-[1.2] mb-5"
          style={{
            fontSize: "clamp(38px, 4.5vw, 68px)",
            fontFamily: "'Poltawski Nowy', serif",
          }}
        >
          منتجاتنا
        </h1>

        <div className="flex justify-center mt-4">
          <svg
            width="153"
            height="24"
            viewBox="0 0 153 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.779386 21.7369C0.779386 21.7369 79.2044 -11.5285 152.249 8.31399"
              stroke="black"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>

      {/* Swiper Slider Island (Dynamic Client Wrapper) */}
      <CategorySliderDynamic rawCats={rawCats} />

      {/* Bottom Button */}
      <div className="flex justify-center mb-6 md:mt-8">
        <a
          href="/cataProducts"
          dir="rtl"
          className="inline-flex items-center justify-center h-[62px] px-[40px] bg-[#B3A495] text-[#2F2F2F] text-[18px] md:text-[20px] leading-none font-normal whitespace-nowrap transition-transform duration-300 hover:scale-105"
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        >
          حيث تلتقي
        </a>
      </div>
    </section>
  );
}
