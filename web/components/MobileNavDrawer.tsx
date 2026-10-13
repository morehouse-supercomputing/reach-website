"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SIGN_IN_ITEM, CloseIcon } from "../lib/nav-items";
import { useMobileDrawer, DRAWER_WIDTH } from "../lib/mobile-drawer-context";

export default function MobileNavDrawer() {
  const { isOpen, close } = useMobileDrawer();
  const pathname = usePathname();

  return (
    <div
      className="sm:hidden fixed inset-y-0 left-0 z-30 bg-surface-container-lowest border-r border-outline-variant/60 flex flex-col transition-transform duration-300 ease-in-out"
      style={{ width: DRAWER_WIDTH, transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-outline-variant/60">
        <span className="text-lg font-extrabold tracking-tight text-on-surface">Navigation</span>
        <button
          onClick={close}
          aria-label="Close menu"
          className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-col p-3 gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface hover:bg-surface-container"
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}

        <Link
          href={SIGN_IN_ITEM.href}
          onClick={close}
          className="btn-elevated mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-b from-primary-container to-primary text-on-primary"
        >
          <SIGN_IN_ITEM.icon className="h-5 w-5" />
          {SIGN_IN_ITEM.label}
        </Link>
      </nav>
    </div>
  );
}
