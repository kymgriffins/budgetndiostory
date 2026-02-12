"use client";

import { NAV_ITEMS, MOBILE_NAV_ITEMS } from "@/lib/routes";
import logo from "@/public/logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { ThemeToggle } from "./theme-toggle";

/**
 * NavbarLanding Component
 * Minimalist navbar designed for video background pages
 *
 * Behavior:
 * - At top (scrollY = 0): Transparent background, white text
 * - After scroll: Slight background tint, maintains white text
 *
 * Features:
 * - Ultra-minimalist design
 * - Smooth fade transition
 * - Designed for video backgrounds
 */
interface NavbarLandingProps {
  isScrolled?: boolean;
}

export default function NavbarLanding({
  isScrolled: externalIsScrolled,
}: NavbarLandingProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentIsScrolled = externalIsScrolled ?? isScrolled;

  const logoSrc = typeof logo === "string" ? logo : logo?.src;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        role="banner"
        aria-label="Main navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full px-8 py-6 flex items-center justify-between z-[60] transition-all duration-500 ${
          currentIsScrolled ? "bg-black/30 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src={logoSrc}
            alt="Budget Ndio Story – Home"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              className="text-sm font-NeueMontreal text-white/90 hover:text-white transition-colors duration-300"
              href={item.href}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/participate"
            className="px-4 py-2 bg-[#00aa55] text-white text-sm font-medium font-NeueMontreal rounded-full hover:bg-[#008844] transition-colors"
            aria-label="Subscribe to newsletter"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <HiOutlineMenuAlt4
            onClick={() => setToggle(true)}
            className="text-3xl text-white cursor-pointer"
            aria-label="Open menu"
          />
        </div>
      </motion.nav>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence mode="wait">
        {toggle && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.3, 0.86, 0.36, 0.95] }}
            className="fixed top-0 left-0 w-full h-screen z-[70] bg-[#0a0a0a] flex flex-col"
          >
            {/* Menu Header */}
            <div className="w-full flex justify-between items-center px-8 py-6">
              <Link href="/" onClick={() => setToggle(false)}>
                <img
                  src={logoSrc}
                  alt="Budget Ndio Story"
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <IoMdClose
                onClick={() => setToggle(false)}
                className="text-3xl text-white cursor-pointer"
              />
            </div>

            {/* Navigation Items */}
            <ul className="flex-1 flex flex-col justify-center gap-8 px-8">
              {MOBILE_NAV_ITEMS.map((item) => (
                <Link
                  href={item.href}
                  key={item.id}
                  onClick={() => setToggle(false)}
                  className="text-5xl font-FoundersGrotesk uppercase font-bold text-white tracking-tight"
                >
                  {item.title}
                </Link>
              ))}
            </ul>

            {/* CTA at bottom */}
            <div className="px-8 pb-12">
              <Link
                href="/participate"
                onClick={() => setToggle(false)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00aa55] text-white"
              >
                <span className="text-sm font-NeueMontreal uppercase tracking-wider">
                  Subscribe
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
