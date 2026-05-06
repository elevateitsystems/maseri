"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useStore } from "@/store/useStore";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "مجموعاتنا" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/about", label: "من نحن" },
];

const Navbar = () => {
  const cartCount = useStore((state) => state.cartCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.31)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* ── Top Row: Search | Logo | Icons ── */}
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[60px] relative">
          {/* Left side: Icons */}
          <div className="flex items-center gap-5">
            <button className="md:hidden" aria-label="Search">
              <Search
                className="h-[20px] w-[20px] text-black"
                strokeWidth={1.5}
              />
            </button>
            <button className="hidden md:block" aria-label="Wishlist">
              <Heart
                className="h-[20px] w-[20px] text-black"
                strokeWidth={1.5}
              />
            </button>
            <button className="relative" aria-label="Cart">
              <ShoppingCart
                className="h-[20px] w-[20px] text-black"
                strokeWidth={1.5}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-primary text-[9px] font-poppins text-white font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Left side: Hamburger (mobile) */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-[24px] w-[24px] text-black" strokeWidth={1.5} />
            ) : (
              <Menu
                className="h-[24px] w-[24px] text-black"
                strokeWidth={1.5}
              />
            )}
          </button>

          {/* Center: Logo */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none"
            style={{ fontFamily: "Poltawski Nowy" }}
          >
            <span className="text-xl font-medium tracking-[0.05em] text-black leading-tight">
              LABEL Textile
            </span>
            <span className="text-[13px] text-black leading-tight">
              Algeria
            </span>
          </div>

          {/* Right side: Search bar (desktop) */}
          <div className="hidden md:flex items-center gap-2 w-[220px]">
            <input
              type="text"
              placeholder="Search"
              className="text-left bg-transparent border-b border-black/30 text-[16px] font-poppins text-black placeholder:text-black/50 focus:outline-none focus:border-black w-full"
            />
            <Search
              className="h-[20px] w-[20px] text-black"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Navigation Links (desktop) ── */}
      <nav className="hidden md:block">
        <div className="container mx-auto px-6 lg:px-10">
          <ul
            className="flex items-center justify-center gap-10 h-[44px]"
            // style={{ fontFamily: "Poltawski Nowy" }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[16px] font-poppins text-black hover:text-primary-900 transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-black/10 bg-white/90 backdrop-blur-md">
          <div className="px-6 py-4">
            <div className="flex items-center gap-2 mb-4">
              <Search
                className="h-[20px] w-[20px] text-black"
                strokeWidth={1.5}
              />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-b border-black/30 pb-1 text-[16px] font-poppins text-black placeholder:text-black/50 focus:outline-none focus:border-black w-full"
              />
            </div>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[16px] font-poppins text-black hover:text-primary-900 transition-colors duration-200 block py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
