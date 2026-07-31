"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const DRAWER_WIDTH = 272;

interface DrawerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useMobileDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useMobileDrawer must be used within MobileDrawerProvider");
  return ctx;
}

export function MobileDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const value: DrawerContextValue = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}
