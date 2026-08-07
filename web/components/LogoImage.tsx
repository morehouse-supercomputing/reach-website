"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders `src`, falling back to `fallback` if it 404s. Checks `img.complete`/
 * `naturalWidth` on mount (not just onError) because on a server-rendered page the
 * browser can start — and fail — the request before hydration attaches onError,
 * so the event fires before React is listening for it.
 */
export default function LogoImage({
  src,
  alt,
  className,
  fallback,
}: {
  src?: string;
  alt: string;
  className: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  if (!src || failed) return <>{fallback}</>;

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
