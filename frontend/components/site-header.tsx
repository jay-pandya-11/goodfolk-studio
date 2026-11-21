"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { siteConfig } from "@/lib/site-config";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About & Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="page-shell flex h-20 items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 focus-visible:outline-hidden"
          aria-label="Goodfolk Studio Homepage"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-lg shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:bg-blue-600">
            <span>G</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
              Goodfolk
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              Design &amp; Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60"
          aria-label="Primary navigation"
        >
          {navigationLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Header CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all duration-150 hover:bg-blue-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span>Start a Project</span>
            <FaArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? (
            <FaTimes className="h-5 w-5" aria-hidden="true" />
          ) : (
            <FaBars className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-slate-200 px-6 py-8 shadow-xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navigationLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <span>Start a Project</span>
                <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <div className="mt-3 text-center text-xs text-slate-500">
                <span>Direct inquiries: </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-slate-800 hover:text-blue-600 underline"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
