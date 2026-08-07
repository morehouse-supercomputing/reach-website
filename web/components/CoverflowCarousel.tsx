"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { RESEARCHERS_DATA } from "../lib/data";

// Below this width the fanned side cards render mostly off-screen, so pull them
// in closer and flatten the rotation to keep them visible/tappable.
const MOBILE_BREAKPOINT = "(max-width: 767px)";
const SWIPE_THRESHOLD_PX = 40;

export default function CoverflowCarousel({ searchQuery = "" }: { searchQuery?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const filteredList = useMemo(() => {
    return RESEARCHERS_DATA.filter((r) => {
      const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.workstream.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filteredList.length]);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isAutoplay || filteredList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoplay, filteredList.length]);

  const goTo = (index: number) => {
    setIsAutoplay(false);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (filteredList.length <= 1) return;
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % filteredList.length);
  };

  const handlePrev = () => {
    if (filteredList.length <= 1) return;
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev === 0 ? filteredList.length - 1 : prev - 1));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const deltaX = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (deltaX <= -SWIPE_THRESHOLD_PX) handleNext();
    else if (deltaX >= SWIPE_THRESHOLD_PX) handlePrev();
  };

  const current = filteredList[activeIndex];

  // Shortest circular distance from the active card, used to fan cards out in 3D
  const circularOffset = (index: number) => {
    const len = filteredList.length;
    let offset = index - activeIndex;
    if (offset > len / 2) offset -= len;
    if (offset < -len / 2) offset += len;
    return offset;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-8 w-full flex justify-between items-center px-4 md:px-10">
        <h3 className="text-headline-md text-on-surface">Featured Researchers</h3>
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

      {filteredList.length > 0 ? (
        <>
          {/* 3D Stage */}
          <div
            className="relative w-full h-[460px] md:h-[560px] cursor-grab active:cursor-grabbing"
            style={{ perspective: "1800px", touchAction: "pan-y" }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { dragStartX.current = null; }}
          >
            <div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {filteredList.map((researcher, index) => {
                const offset = circularOffset(index);
                const abs = Math.abs(offset);
                if (abs > 2) return null; // keep only the nearby fan of cards

                const initials = `${researcher.firstName[0]}${researcher.lastName[0]}`;
                const isActive = offset === 0;

                const translateX = offset * (isMobile ? 170 : 320);
                const translateZ = -abs * (isMobile ? 90 : 180);
                const rotateY = offset * (isMobile ? -22 : -38);
                const scale = 1 - abs * 0.16;
                const opacity = 1 - abs * 0.4;

                return (
                  <button
                    key={researcher.id}
                    onClick={() => goTo(index)}
                    aria-label={`Show ${researcher.firstName} ${researcher.lastName}`}
                    className="absolute left-1/2 top-1/2 w-80 md:w-[26rem] cursor-pointer transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex: 10 - abs,
                      opacity,
                      transitionProperty: "transform, opacity",
                    }}
                  >
                    <div
                      className={`overflow-hidden bg-surface-container-lowest rounded-3xl border p-8 md:p-10 flex flex-col items-center text-center transition-shadow duration-300 ${isActive
                          ? "border-primary shadow-elevation-2"
                          : "border-outline-variant shadow-elevation-1"
                        }`}
                    >
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-surface-container-lowest shadow-md mb-5">
                        <div
                          className={`w-full h-full flex items-center justify-center font-extrabold text-4xl ${researcher.avatarColor}`}
                        >
                          {initials}
                        </div>
                      </div>
                      <span className="text-label-xs text-tertiary mb-2">
                        {researcher.workstream}
                      </span>
                      <h4 className="text-headline-md text-on-surface mb-1">
                        {researcher.prefix && `${researcher.prefix} `}
                        {researcher.firstName} {researcher.lastName}
                      </h4>
                      <p className="text-sm text-on-surface-variant mb-1">
                        {researcher.institution}
                      </p>

                      {isActive && (
                        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 mt-3 pt-3 border-t border-outline-variant/40">
                          {researcher.bio}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            {filteredList.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous researcher"
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface-container-lowest border border-outline-variant shadow-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next researcher"
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface-container-lowest border border-outline-variant shadow-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Email contact for the active card */}
          {current && (
            <a
              href={`mailto:${current.email}`}
              className="mt-4 text-xs font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {current.email}
            </a>
          )}

          {/* Pagination dots & Play/Pause */}
          {filteredList.length > 1 && (
            <div className="flex items-center gap-3 mt-6">
              {filteredList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
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
        </>
      ) : (
        <div className="overflow-hidden bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-elevation-1 min-h-[340px] w-[calc(100%-2rem)] md:w-[calc(100%-5rem)] mx-4 md:mx-10 flex flex-col items-center justify-center p-8 text-center">
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
  );
}
