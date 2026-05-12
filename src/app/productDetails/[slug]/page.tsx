"use client";
import { useEffect, useState, use, useCallback } from "react";
import BestSellers from "@/components/home/components/BestSellers";
import { ProductImageCard } from "@/components/productDetails/ProductImageCard";
import { ProductReviews } from "@/components/productDetails/ProductReviews";
import { api } from "@/lib/api";
import { Review, Product } from "@/types/api";
import { ProductDetailsSkeleton } from "@/components/productDetails/ProductDetailsSkeleton";
import Link from "next/link";
import { ToastProvider } from "@/components/ToastProvider"; 

export const mockProduct = {
  id: 1,
  title: "حيث تلتقي الأناقة",
  description:
    "هذا المنتج مثال لنص يمكن أن يستبدل في نفس المساحة.",
  price: 2500,
  image: "https://images.unsplash.com/photo-1520975922284-9f0f7d3f7d66",
  details:
    "هذا المنتج مصنوع من خامات عالية الجودة ومناسب للاستخدام اليومي.",
};


export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const productId = parseInt(slug) || 1;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [reviewData, productData] = await Promise.all([
        api.filterReviews({ approved: true, productId }),
        api.getProductById(productId)
      ]);
      setReviews(reviewData);
      setProduct(productData);
      console.log("Fetched product:", productData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    Promise.resolve().then(() => fetchData());
  }, [fetchData]);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (!product) return <div className="min-h-screen flex items-center justify-center">المنتج غير موجود</div>;

  return (
    <div className="container mx-auto space-y-16 mt-20 md:mt-44 relative px-6">
      <ToastProvider />
      <ProductImageCard product={product} />

      <ProductReviews 
        reviews={reviews} 
        productId={productId} 
        onSuccess={fetchData} 
      />

      <BestSellers limit={3} excludeId={productId} />

      {/* Explore More Section */}
      <section className="flex flex-col items-center mt-4 mb-24">
        <Link
          href="/cataProducts"
          className="bg-[#B3A495] text-white px-12 py-4 rounded-[4px] text-[16px] font-medium hover:bg-[#a39485] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#B3A495]/20"
        >
          اكتشف مجموعتنا
        </Link>
      </section>

      {/* Fixed Mobile Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-black/5 md:hidden z-[100]">
        <button
          onClick={() => {
            const el = document.getElementById("order-form");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full bg-black text-white h-14 rounded-[4px] text-[18px] font-bold shadow-xl active:scale-95 transition-transform"
        >
          اطلب الآن<br />
          <span className="text-xs">الدفع عند الاستلام</span>
        </button>
      </div>
    </div>
  );
}
