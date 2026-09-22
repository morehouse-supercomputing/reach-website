"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MobileDrawerProvider, useMobileDrawer, DRAWER_WIDTH } from "../lib/mobile-drawer-context";
import MobileNavDrawer from "./MobileNavDrawer";

function PushableContent({ children }: { children: ReactNode }) {
  const { isOpen, close } = useMobileDrawer();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Panel sits fixed at the left edge, slides in from off-screen when open */}
      <MobileNavDrawer />

      {/* Whole page — pushed right when the drawer opens */}
      <div
        className="relative z-10 min-h-screen flex flex-col bg-background transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? `translateX(${DRAWER_WIDTH}px)` : undefined }}
      >
        {children}

        {/* Tap the now-visible sliver of the page to close */}
        {isOpen && (
          <div
            className="sm:hidden fixed inset-0 z-40"
            onClick={close}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

export default function MobileNavShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <MobileDrawerProvider>
      <PushableContent>{children}</PushableContent>
    </MobileDrawerProvider>
  );
}
