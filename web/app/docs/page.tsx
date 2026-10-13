"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function DocsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/docs?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/70 shadow-elevation-1">
        <h1 className="text-headline-md mb-4 bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
          hi!
        </h1>
        <p className="text-body-md text-on-surface-variant mb-6">
          This is the future REACH Consortium Documents Page.
        </p>

        {/* Compact search bar, mirrors the home page search */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full bg-surface-container-low border border-outline-variant shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] p-1.5 rounded-full flex items-center gap-1 mb-6 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/25 transition-all"
        >
          <input
            type="text"
            placeholder="Search projects & documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm px-3 py-1.5 focus:outline-none placeholder:text-outline text-on-surface"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-medium text-xs transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            Search
          </button>
        </form>

        {query && (
          <div className="mb-6 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/60">
            <span className="block text-label-xs text-outline uppercase tracking-widest mb-1">
              Active Query
            </span>
            <code className="text-sm text-on-surface">
              "{query}"
            </code>
          </div>
        )}

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-medium rounded-full bg-primary text-on-primary hover:scale-105 active:scale-95 transition-all duration-200 shadow-elevation-1"
        >
          Return to Portal
        </Link>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant">
          Loading Docs...
        </div>
      }
    >
      <DocsContent />
    </Suspense>
  );
}
