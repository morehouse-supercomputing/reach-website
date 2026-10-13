"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, MenuIcon, CloseIcon } from "../lib/nav-items";
import { useMobileDrawer } from "../lib/mobile-drawer-context";

function NavLink({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative py-2 text-sm font-medium transition-colors duration-200 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2 ${
        isActive
          ? "text-primary after:w-full"
          : "text-on-background hover:text-primary after:w-0 hover:after:w-full"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileDrawerTrigger() {
  const { isOpen, toggle } = useMobileDrawer();

  return (
    <button
      onClick={toggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="sm:hidden p-2 rounded-full text-on-background hover:text-primary hover:bg-surface-container transition-colors"
    >
      {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-[16px] border-b border-outline-variant/60 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Left side: logo + mobile trigger + primary nav */}
        <div className="flex items-center gap-2 md:gap-8">
          <Link
            href="/"
            className="text-lg font-extrabold tracking-tight text-on-background"
          >
            Reach
          </Link>
          <MobileDrawerTrigger />
          <div className="hidden sm:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} label={item.label} href={item.href} />
            ))}
          </div>
        </div>

        {/* Right side: sign in */}
        <Link
          href="/signin"
          className="btn-elevated px-4 py-2 rounded-full bg-gradient-to-b from-primary-container to-primary text-on-primary text-sm font-medium hover:brightness-105 active:scale-95 transition-all duration-200"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}
