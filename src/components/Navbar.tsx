"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/cataProduct", label: "مجموعاتنا" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/about", label: "من نحن" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 z-50 w-full"
      style={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(255, 255, 255, 0.31)",
      }}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="relative flex h-[60px] items-center justify-between">
          <button
            className="flex items-center justify-center md:hidden"
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

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center">
            <span className="text-xl font-medium leading-tight tracking-normal text-black">
              LABEL Textile
            </span>
            <span className="text-[13px] leading-tight text-black">Algeria</span>
          </div>
        </div>
      </div>

      <nav className="hidden md:block">
        <div className="container mx-auto px-6 lg:px-10">
          <ul className="flex h-[44px] items-center justify-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[16px] font-medium text-black transition-colors duration-200 hover:text-primary-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <nav className="border-t border-black/10 bg-white/90 backdrop-blur-md md:hidden">
          <div className="px-6 py-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1 text-[16px] text-black transition-colors duration-200 hover:text-primary-900"
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
