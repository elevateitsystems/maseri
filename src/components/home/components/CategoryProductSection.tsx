"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Category, Product } from "@/types/api";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CategoryProductSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCata, setSelectedCata] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [catsLoading, setCatsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCata(data[0]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setCatsLoading(false);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    if (selectedCata) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const data = await api.filterProducts({ cataId: selectedCata.id });
          setProducts(data);
        } catch (err) {
          console.error("Error fetching products:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [selectedCata]);

  if (catsLoading) return null;

  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="space-y-4 text-center md:text-right">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              اكتشف مجموعتنا
            </h2>
            <p className="text-lg text-black/60 max-w-2xl">
              اختر الفئة التي تناسب ذوقك وتصفح أفضل المنتجات المختارة بعناية.
            </p>
          </div>

          {/* Custom Premium Dropdown */}
          <div className="relative w-full md:w-72 z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between bg-[#F9F9F9] border border-black/5 px-6 py-4 rounded-full text-lg font-medium hover:bg-black/5 transition-all duration-300"
            >
              <span>{selectedCata?.name || "اختر الفئة"}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white border border-black/5 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCata(cat);
                        setIsOpen(false);
                      }}
                      className={`w-full text-right px-6 py-4 text-lg hover:bg-black/5 transition-colors ${
                        selectedCata?.id === cat.id ? "bg-black/5 font-bold" : ""
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-black/20" />
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {products.length > 0 ? (
                  products.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 text-center"
                  >
                    <p className="text-2xl text-black/40">لا توجد منتجات في هذه الفئة حالياً</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryProductSection;
