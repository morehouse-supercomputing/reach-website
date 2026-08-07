"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CoverflowCarousel from "../components/CoverflowCarousel";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Navigate to the docs page, passing the search query as a param
    router.push(`/docs?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById("carousel-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4 md:px-10 text-center border-b border-outline-variant/60 bg-gradient-to-b from-surface-container/60 to-transparent">
        <div className="max-w-4xl mx-auto flex flex-col items-center">

          <h1 className="text-display-lg bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-6 max-w-3xl text-center">
            Empowering the Future of AI at HBCUs
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-2xl mb-10 text-center">
            The REACH consortium is a coalition of 12 HBCU institutions advancing AI research, safety, and policies. Search our directory of scholars and research works below.
          </p>

          {/* Search Bar - Front & Center */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-2 rounded-2xl md:rounded-full shadow-elevation-1 hover:shadow-elevation-2 flex flex-col md:flex-row gap-2 items-stretch md:items-center transition-all duration-300 mb-6"
          >
            {/* Icon + input always share a row, even on mobile */}
            <div className="flex-1 flex items-center min-w-0">
              {/* Search Icon */}
              <div className="flex items-center pl-4 pr-1 py-1.5">
                <svg className="h-4 w-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Input field */}
              <div className="flex-1 relative py-1.5 px-3">
                <input
                  type="text"
                  placeholder="Search researchers by name, school, role, or interest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-outline text-on-surface"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="btn-elevated px-6 py-3 rounded-xl md:rounded-full bg-gradient-to-b from-primary-container to-primary hover:brightness-105 text-on-primary font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </form>

          {/* Quick Suggestions tags */}
          <div className="flex flex-wrap justify-center gap-2 text-xs text-on-surface-variant mb-10 max-w-lg">
            <span>Suggestions:</span>
            {["Dr. Ashley Scruse", "Applied AI", "Morehouse College", "AI Safety"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="hover:text-primary underline decoration-outline-variant transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={handleSmoothScroll}
              className="btn-elevated px-6 py-3 rounded-full bg-gradient-to-b from-primary-container to-primary text-on-primary font-medium text-sm transition-all hover:brightness-105 hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            >
              Meet Our Researchers
            </button>
            <Link
              href="/docs"
              className="px-6 py-3 rounded-full border border-outline-variant text-on-surface font-medium text-sm transition-all hover:bg-surface-container duration-200"
            >
              Consortium Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Researchers Carousel Section */}
      <section id="carousel-section" className="py-20 bg-surface-container-low/40 backdrop-blur-xs flex-1 overflow-hidden">
        {/* Passed down searchQuery to update highlighted profiles dynamically */}
        <CoverflowCarousel searchQuery={searchQuery} />
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-10 border-t border-outline-variant/60 flex flex-col items-center gap-4 text-center text-label-sm text-on-surface-variant">
        <p>© 2026 REACH Consortium. All rights reserved. Partnering with 12 historically black colleges and universities.</p>
        <Link
          href="/contact"
          className="px-5 py-2 rounded-full border border-outline-variant text-on-surface font-medium text-sm transition-all hover:bg-surface-container hover:border-primary hover:text-primary duration-200"
        >
          Contact Us
        </Link>
      </footer>
    </div>
  );
}
