"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { RESEARCHERS_DATA, researcherPhotoUrl } from "../lib/data";
import LogoImage from "./LogoImage";

// Carousel spotlights a fixed subset of the full directory
const CAROUSEL_RESEARCHERS = RESEARCHERS_DATA.slice(0, 4);

export default function ResearcherCarousel({ searchQuery = "" }: { searchQuery?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Filter researchers based on the query passed down
  const filteredList = useMemo(() => {
    return CAROUSEL_RESEARCHERS.filter((r) => {
      const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.workstream.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  // Reset activeIndex if the list filters down to a smaller size
  useEffect(() => {
    setActiveIndex(0);
  }, [filteredList.length]);

  // Autoplay rotation every 5 seconds
  useEffect(() => {
    if (!isAutoplay || filteredList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % filteredList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, filteredList.length]);

  const handleNext = () => {
    if (filteredList.length <= 1) return;
    setIsAutoplay(false); // Pause autoplay on manual navigation
    setActiveIndex((prevIndex) => (prevIndex + 1) % filteredList.length);
  };

  const handlePrev = () => {
    if (filteredList.length <= 1) return;
    setIsAutoplay(false); // Pause autoplay on manual navigation
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? filteredList.length - 1 : prevIndex - 1
    );
  };

  const current = filteredList[activeIndex];
  const initials = current ? `${current.firstName[0]}${current.lastName[0]}` : "";


  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Navigation Button to Grid View */}
      <div className="mb-8 w-full flex justify-between items-center px-4">
        <h3 className="text-headline-md text-on-surface">
          Featured Researchers
        </h3>
        <Link
          href="/researchers"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border border-outline-variant hover:border-primary transition-all hover:bg-surface-container shadow-xs hover:shadow-md active:scale-95 duration-200"
        >
          View All Researchers
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Main Carousel Card Container */}
      <div className="w-full relative px-4 group">
        {filteredList.length > 0 ? (
          <>
            <div className="overflow-hidden bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 min-h-[340px] flex flex-col md:flex-row">

              {/* Avatar side */}
              <div className="w-full md:w-2/5 p-8 flex items-center justify-center bg-surface-container-low border-b md:border-b-0 md:border-r border-outline-variant/60">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-surface-container-lowest shadow-lg relative">
                  <LogoImage
                    src={researcherPhotoUrl(current)}
                    alt={`${current.firstName} ${current.lastName}`}
                    className="w-full h-full object-cover"
                    fallback={
                      <div className={`w-full h-full flex items-center justify-center font-extrabold text-3xl md:text-4xl ${current.avatarColor}`}>
                        {initials}
                      </div>
                    }
                  />
                </div>
              </div>

              {/* Details side */}
              <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-label-xs text-tertiary">
                      {current.workstream}
                    </span>
                  </div>
                  <h4 className="text-headline-md text-on-surface mb-1">
                    {current.prefix && `${current.prefix} `}
                    {current.firstName} {current.lastName}
                  </h4>
                  <p className="text-label-sm text-on-surface-variant mb-3">
                    {current.role} at {current.institution}
                  </p>
                  <p className="text-body-md text-on-surface-variant italic">
                    "{current.bio}"
                  </p>
                </div>

                {/* Email contact */}
                <div className="mt-6 pt-4 border-t border-outline-variant/60 flex justify-between items-center">
                  <a
                    href={`mailto:${current.email}`}
                    className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {current.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {filteredList.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous researcher"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 rounded-full bg-surface-container-lowest border border-outline-variant shadow-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next researcher"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 rounded-full bg-surface-container-lowest border border-outline-variant shadow-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </>
        ) : (
          <div className="overflow-hidden bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-elevation-1 min-h-[340px] flex flex-col items-center justify-center p-8 text-center">
            <svg className="h-12 w-12 text-outline mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-headline-md text-on-surface mb-1">No matching researchers found</h4>
            <p className="text-body-md text-on-surface-variant max-w-sm mb-6">
              There are no researchers matching "{searchQuery}" in this highlight carousel.
            </p>
            <Link
              href={`/researchers?q=${encodeURIComponent(searchQuery)}`}
              className="btn-elevated px-5 py-2.5 rounded-full text-xs font-medium bg-gradient-to-b from-primary-container to-primary text-on-primary hover:brightness-105 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Search Full Directory
            </Link>
          </div>
        )}
      </div>

      {/* Pagination dots & Play/Pause State */}
      {filteredList.length > 1 && (
        <div className="flex items-center gap-3 mt-6">
          {filteredList.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoplay(false);
                setActiveIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex
                ? "w-8 bg-primary"
                : "w-2 bg-outline-variant hover:bg-outline"
                }`}
            />
          ))}
          <button
            onClick={() => setIsAutoplay((prev) => !prev)}
            aria-label={isAutoplay ? "Pause auto-rotation" : "Start auto-rotation"}
            className="ml-2 p-1 text-outline hover:text-on-surface rounded transition-colors text-xs flex items-center cursor-pointer"
          >
            {isAutoplay ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
