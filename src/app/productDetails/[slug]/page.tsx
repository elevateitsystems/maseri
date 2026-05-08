import BestSellers from "@/components/home/components/BestSellers";
import { AddReviewForm } from "@/components/productDetails/AddReviewForm";
import { ProductAccordion } from "@/components/productDetails/ProductAccordion";
import { ProductImageCard } from "@/components/productDetails/ProductImageCard";
import { ProductReviews } from "@/components/productDetails/ProductReviews";

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
export const mockReviews = [
  {
    name: "أحمد",
    rating: 5,
    comment: "منتج ممتاز وجودة عالية جدًا",
  },
  {
    name: "سارة",
    rating: 4,
    comment: "جميل ولكن يحتاج تحسين بسيط",
  },
  {
    name: "ليلى",
    rating: 5,
    comment: "رائع جدًا أنصح به",
  },
];
export default function Page() {
  return (
    <div className="rtl md:mt-32 space-y-16">
      <div className="container mx-auto py-10">
        <ProductImageCard product={mockProduct} />
        <ProductAccordion product={mockProduct} />
      </div>

      <div className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto">
          <ProductReviews reviews={mockReviews} />
          <AddReviewForm />
        </div>
      </div>

      <div className="container mx-auto py-10">
        <BestSellers limit={3} />
      </div>
    </div>
  );
}