import React from "react";
import ProductCard from "@/components/ProductCard";
import product1 from "../../../../assets/productImages/product-1.png";
import product2 from "../../../../assets/productImages/product-2.png";
import product3 from "../../../../assets/productImages/product-3.png";

const products = [
  {
    id: 1,
    title: "عباية كلاسيكية سوداء",
    price: 450,
    category: "العبايات",
    image: product3,
  },
  {
    id: 2,
    title: "فستان صيفي مشجر",
    price: 320,
    category: "الفساتين",
    image: product2,
  },
  {
    id: 3,
    title: "طقم كاجوال بيج",
    price: 280,
    category: "ملابس كاجوال",
    image: product1,
  },
];

const BestSellers = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              أفضل المبيعات
            </h2>
            <p className="text-[20px] font-medium text-black/70 leading-relaxed">
              حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي
              الموضة بالاستدامة حيث تلتقي الموضة بالاستدامةحيث تلتقي الموضة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
