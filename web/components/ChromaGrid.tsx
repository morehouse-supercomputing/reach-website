"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  meta?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  seal?: boolean; // true = show image on a paper disc (logos); false = bare mark (monograms)
}

export interface ChromaGridProps {
  items: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const TILT = 7; // max degrees

export default function ChromaGrid({
  items,
  className = "",
  radius = 320,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
    setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = useCallback(
    (x: number, y: number) => {
      gsap.to(pos.current, {
        x,
        y,
        duration: damping,
        ease,
        onUpdate: () => {
          setX.current?.(pos.current.x);
          setY.current?.(pos.current.y);
        },
        overwrite: true,
      });
    },
    [damping, ease]
  );

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
  };

  // spotlight position + ProfileCard-style tilt, per card
  const handleCardMove = (e: React.PointerEvent<HTMLElement>) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    c.style.setProperty("--mouse-x", `${x}px`);
    c.style.setProperty("--mouse-y", `${y}px`);
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    c.style.setProperty("--rx", `${(-py * TILT).toFixed(2)}deg`);
    c.style.setProperty("--ry", `${(px * TILT).toFixed(2)}deg`);
  };

  const handleCardLeave = (e: React.PointerEvent<HTMLElement>) => {
    const c = e.currentTarget as HTMLElement;
    c.style.setProperty("--rx", "0deg");
    c.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ "--r": `${radius}px` } as React.CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((c, i) => (
        <a
          key={i}
          className="chroma-card"
          href={c.url}
          onPointerMove={handleCardMove}
          onPointerLeave={handleCardLeave}
          style={
            {
              "--card-border": c.borderColor || "transparent",
              "--card-gradient": c.gradient || "linear-gradient(160deg, #2a2c33, #121317)",
            } as React.CSSProperties
          }
        >
          <div className="chroma-img-wrapper">
            {c.seal !== false ? (
              <span className="disc"><img src={c.image} alt={c.title} loading="lazy" /></span>
            ) : (
              <img className="bare" src={c.image} alt={c.title} loading="lazy" />
            )}
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            <p className="role">{c.subtitle}</p>
            {c.meta && <span className="handle">{c.meta}</span>}
          </footer>
        </a>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
}
