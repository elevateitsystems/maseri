import React from "react";
import ProductCard from "@/components/ProductCard";

const products = [
  { id: 1, title: "عباية كلاسيكية سوداء", price: 450, category: "العبايات" },
  { id: 2, title: "فستان صيفي مشجر", price: 320, category: "الفساتين" },
  { id: 3, title: "طقم كاجوال بيج", price: 280, category: "ملابس كاجوال" },
  { id: 4, title: "عباية حرير فاخرة", price: 850, category: "العبايات" },
];

const BestSellers = () => {
  return (
    <section className="py-20 bg-bg-light-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">الأكثر مبيعاً</h2>
            <p className="text-muted-foreground">اكتشفي القطع الأكثر طلباً في مجموعتنا المختارة بعناية.</p>
          </div>
          <button className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors">
            عرض الكل
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
