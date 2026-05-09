"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Category } from "@/types/api";
import { api } from "@/lib/api";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories for navbar:", err);
      }
    };
    fetchCats();

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "#", label: "مجموعاتنا", isDropdown: true },
    { href: "/contact", label: "اتصل بنا" },
    { href: "/about", label: "من نحن" },
  ];

  return (
    <header
      className="sticky top-0 md:top-[-70px] z-50 w-full transition-all duration-300"
      dir="rtl"
      style={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.4)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: (scrolled && !mobileMenuOpen) ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="relative flex h-[70px] items-center justify-between">
          <button
            className="flex items-center justify-center md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-black" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6 text-black" strokeWidth={1.5} />
            )}
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center">
            <span className="text-2xl font-medium tracking-tight text-black">
              LABEL Textile
            </span>
            <span className="text-[11px] tracking-[3px] -mt-1 font-medium">Algeria</span>
          </div>

          {/* Spacer for desktop layout balance */}
          <div className="hidden md:block w-24" />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block transition-all duration-300">
        <div className="container mx-auto px-6 lg:px-10">
          <ul className="flex h-[60px] items-center justify-center gap-12">
            {navLinks.map((link) => (
              <li 
                key={link.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => link.isDropdown && setIsHovered(true)}
                onMouseLeave={() => link.isDropdown && setIsHovered(false)}
              >
                {link.isDropdown ? (
                  <div className="flex items-center gap-1 cursor-default text-[16px] font-medium text-black group">
                    <span>{link.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "rotate-180" : ""}`} />
                    
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white border border-black/5 shadow-2xl rounded-xl overflow-hidden py-2"
                        >
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/cataProducts/${cat.id}/${encodeURIComponent(cat.name)}`}
                              className="block px-6 py-3 text-[15px] text-black/70 hover:bg-black/5 hover:text-black transition-all"
                              onClick={() => setIsHovered(false)}
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-[16px] font-medium text-black transition-all duration-200 hover:text-black/60 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-black/5 bg-white overflow-hidden md:hidden shadow-2xl"
          >
            <div className="px-8 py-8 space-y-6">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.isDropdown ? (
                    <div className="space-y-4">
                      <span className="block text-[18px] font-bold text-black/40 uppercase tracking-wider">{link.label}</span>
                      <div className="grid grid-cols-1 gap-3 pr-4 border-r-2 border-black/5">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/cataProducts/${cat.id}/${encodeURIComponent(cat.name)}`}
                            className="block text-[17px] text-black font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-[20px] font-bold text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
