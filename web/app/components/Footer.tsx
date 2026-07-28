interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-maroon-primary flex items-center justify-center text-white font-bold border border-white/20 text-sm shadow-md">
            R
          </span>
          <span className="font-semibold text-lg text-white">REACH Consortium</span>
        </div>
        <p className="text-sm">
          &copy; 2026 REACH Consortium. All rights reserved. In partnership with Google.
        </p>
      </div>
    </footer>
  );
}
