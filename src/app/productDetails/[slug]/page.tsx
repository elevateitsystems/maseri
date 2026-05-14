import BestSellers from "@/components/home/components/BestSellers";
import { ProductImageCard } from "@/components/productDetails/ProductImageCard";
import { ProductReviews } from "@/components/productDetails/ProductReviews";
import { api } from "@/lib/api";
import Link from "next/link";
import { ToastProvider } from "@/components/ToastProvider";
import { MobileOrderButton } from "@/components/productDetails/MobileOrderButton";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productId = parseInt(slug) || 1;

  // Parallel fetch on server
  const [reviews, product] = await Promise.all([
    api.filterReviews({ approved: true, productId }),
    api.getProductById(productId),
  ]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        المنتج غير موجود
      </div>
    );

  return (
    <div className="container mx-auto space-y-16 mt-20 md:mt-44 relative px-6">
      <ToastProvider />
      <ProductImageCard product={product} />

      <ProductReviews initialReviews={reviews} productId={productId} />

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

      {/* Fixed Mobile Order Button (Client logic inside the component) */}
      <MobileOrderButton />
    </div>
  );
}

// Small client component for the mobile button to keep the page server-side
