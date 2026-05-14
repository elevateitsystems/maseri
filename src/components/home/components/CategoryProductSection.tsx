"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Category, Product, ProductFilters } from "@/types/api";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, Loader2 } from "lucide-react";

interface CategoryProductSectionProps {
  initialCategories: Category[];
  initialProducts: Product[];
}

const CategoryProductSection = ({ 
  initialCategories, 
  initialProducts 
}: CategoryProductSectionProps) => {
  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCata, setSelectedCata] = useState<Category | null>(null);
  const [showFavorites] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only fetch if it's not the initial load or filters changed
    const fetchProducts = async () => {
      // Skip fetching on initial mount if no category is selected (we already have initialProducts)
      if (!selectedCata && !showFavorites && products === initialProducts) {
        return;
      }

      setLoading(true);
      try {
        const filters: ProductFilters = {};
        if (selectedCata) {
          filters.cataId = selectedCata.id;
        }
        if (showFavorites) {
          filters.favourite = true;
        }
        const data = await api.filterProducts(filters);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCata, showFavorites]);

  return (
    <section className="py-16 md:py-32 overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-8 md:mb-12 gap-6 md:gap-10 text-center lg:text-right">
          <div className="space-y-4 md:space-y-6">
            <h2 
              className="text-[32px] md:text-[48px] font-bold text-black leading-tight"
            >
              اكتشف مجموعتنا
            </h2>
            <p 
              className="text-base md:text-lg text-black/60 max-w-2xl leading-relaxed"
            >
              اختر الفئة التي تناسب ذوقك وتصفح أفضل المنتجات المختارة بعناية.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="relative w-full lg:w-80 z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-[#F9F9F9] border-2 border-black/5 px-6 md:px-8 py-3.5 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-black/5 transition-all duration-300"
              >
                <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                <span className="truncate">{selectedCata?.name || "جميع الفئات"}</span>
              </button>

              {isOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-4 bg-white border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded overflow-hidden backdrop-blur p-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <button
                      onClick={() => {
                        setSelectedCata(null);
                        setIsOpen(false);
                      }}
                      className={`w-full text-right px-8 py-4 text-lg rounded hover:bg-black/5 transition-colors ${
                        selectedCata === null ? "bg-black/5 font-bold" : ""
                      }`}
                    >
                      جميع الفئات
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCata(cat);
                          setIsOpen(false);
                        }}
                        className={`w-full text-right px-8 py-4 text-lg rounded hover:bg-black/5 transition-colors ${
                          selectedCata?.id === cat.id ? "bg-black/5 font-bold" : ""
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative min-h-[500px]">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-16 h-16 animate-spin text-black/10" />
              <p className="text-black/40 font-medium">جاري تحميل المنتجات...</p>
            </div>
          ) : (
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div 
                    className="col-span-full py-32 text-center bg-[#F9F9F9] rounded-[3rem] border-2 border-dashed border-black/5"
                  >
                    <p className="text-3xl font-medium text-black/30 mb-2">عذراً، لا توجد منتجات حالياً</p>
                    <p className="text-lg text-black/20">جرب تغيير الفئة أو تصفح الكل</p>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryProductSection;
