"use client";
import { useEffect, useState, use } from "react";
import BestSellers from "@/components/home/components/BestSellers";
import { AddReviewForm } from "@/components/productDetails/AddReviewForm";
import { ProductAccordion } from "@/components/productDetails/ProductAccordion";
import { ProductImageCard } from "@/components/productDetails/ProductImageCard";
import { ProductReviews } from "@/components/productDetails/ProductReviews";
import { api } from "@/lib/api";
import { Review, Product } from "@/types/api";
import { ProductDetailsSkeleton } from "@/components/productDetails/ProductDetailsSkeleton";

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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [reviewData, productData] = await Promise.all([
        api.filterReviews({ approved: true, productId }),
        api.getProductById(productId)
      ]);
      setReviews(reviewData);
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (!product) return <div className="min-h-screen flex items-center justify-center">المنتج غير موجود</div>;

  return (
    <div className=" container mx-auto  md:mt-44 space-y-16 ">
      <ProductImageCard product={product} />
      <ProductAccordion product={product} />

      <ProductReviews reviews={reviews} />
      <AddReviewForm productId={productId} onSuccess={fetchData} />

      <BestSellers limit={3} excludeId={productId} />
    </div>
  );
}