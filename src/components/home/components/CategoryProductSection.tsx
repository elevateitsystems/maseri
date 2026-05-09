"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Category, Product } from "@/types/api";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, Loader2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CategoryProductSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCata, setSelectedCata] = useState<Category | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [catsLoading, setCatsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
        // Initially show all products (null category)
        setSelectedCata(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setCatsLoading(false);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filters: any = {};
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

  if (catsLoading) return null;

  return (
    <section className="py-20" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-10">
          <div className="space-y-6 text-right">
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-black"
            >
              اكتشف مجموعتنا
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-black/60 max-w-2xl leading-relaxed"
            >
              اختر الفئة التي تناسب ذوقك وتصفح أفضل المنتجات المختارة بعناية.
            </motion.p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Favourites Filter */}
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all duration-500 text-lg font-medium ${
                showFavorites 
                ? "bg-black text-white border-black shadow-xl scale-105" 
                : "bg-white text-black border-black/5 hover:border-black/20"
              }`}
            >
              <Heart className={`w-6 h-6 transition-transform duration-300 ${showFavorites ? "fill-white scale-110" : "group-hover:scale-110"}`} />
              <span>المفضلة</span>
            </button>

            {/* Custom Premium Dropdown */}
            <div className="relative w-full md:w-80 z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-[#F9F9F9] border-2 border-black/5 px-8 py-4 rounded-full text-lg font-medium hover:bg-black/5 transition-all duration-300"
              >
                <span>{selectedCata?.name || "جميع الفئات"}</span>
                <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-white border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded overflow-hidden backdrop-blur p-2"
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
                  </motion.div>
                )}
              </AnimatePresence>
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
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              <AnimatePresence mode="popLayout">
                {products.length > 0 ? (
                  products.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-full py-32 text-center bg-[#F9F9F9] rounded-[3rem] border-2 border-dashed border-black/5"
                  >
                    <p className="text-3xl font-medium text-black/30 mb-2">عذراً، لا توجد منتجات حالياً</p>
                    <p className="text-lg text-black/20">جرب تغيير الفئة أو تصفح الكل</p>
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
