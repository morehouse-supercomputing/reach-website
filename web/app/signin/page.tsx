"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-sm w-full bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/70 shadow-elevation-1">
        <h1 className="text-headline-md mb-1 text-on-surface">Sign In</h1>
        <p className="text-body-md text-on-surface-variant mb-6">
          Access for consortium partners with designated credentials.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-label-sm text-on-surface-variant mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@morehouse.edu"
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/25 transition-all placeholder:text-outline text-sm text-on-surface"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-label-sm text-on-surface-variant mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/25 transition-all placeholder:text-outline text-sm text-on-surface"
            />
          </div>

          <button
            type="submit"
            className="btn-elevated mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-b from-primary-container to-primary text-on-primary font-medium text-sm hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-xs text-on-surface-variant text-center">
            Authentication isn&apos;t connected yet — this form is a placeholder.
          </p>
        )}

        <Link
          href="/"
          className="mt-6 inline-flex w-full items-center justify-center text-xs font-medium text-on-surface-variant hover:text-primary transition-colors"
        >
          Return to Portal
        </Link>
      </div>
    </div>
  );
}
