"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Category, Product } from "@/types/api";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronDown, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

const CategoryProductSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCata, setSelectedCata] = useState<Category | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [catsLoading, setCatsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const swiperRef = React.useRef<any>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
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
    <section className="py-8 md:py-16 overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-8 md:mb-12 gap-6 md:gap-10 text-center lg:text-right">
          <div className="space-y-4 md:space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[32px] md:text-[48px] font-bold text-black leading-tight"
            >
              اكتشف مجموعتنا
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-black/60 max-w-2xl leading-relaxed"
            >
              اختر الفئة التي تناسب ذوقك وتصفح أفضل المنتجات المختارة بعناية.
            </motion.p>
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

        {/* Products Carousel */}
        <div className="relative group min-h-[500px]">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-16 h-16 animate-spin text-black/10" />
              <p className="text-black/40 font-medium">جاري تحميل المنتجات...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <Swiper
                dir="rtl"
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={1.5}
                centeredSlides={true}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 30, centeredSlides: false },
                  1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false },
                }}
                className="product-carousel !overflow-visible"
              >
                {products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Arrows - Desktop Only, Hover Only */}
              <button 
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl z-30 border border-black/5 active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden"
              >
                <ChevronRight size={24} className="text-black/70" />
              </button>
              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl z-30 border border-black/5 active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden"
              >
                <ChevronLeft size={24} className="text-black/70" />
              </button>
            </>
          ) : (
            <div className="py-32 text-center bg-[#F9F9F9] rounded-[3rem] border-2 border-dashed border-black/5">
              <p className="text-3xl font-medium text-black/30 mb-2">عذراً، لا توجد منتجات حالياً</p>
              <p className="text-lg text-black/20">جرب تغيير الفئة أو تصفح الكل</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryProductSection;
