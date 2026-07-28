"use client";

import { useEffect } from "react";

interface FlourishEmbedProps {
  id: string;
  minHeight?: string;
}

export default function FlourishEmbed({ id, minHeight = "400px" }: FlourishEmbedProps) {
  useEffect(() => {
    const scriptId = "flourish-embed-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://public.flourish.studio/resources/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Re-trigger Flourish parsing when a new embed container enters the DOM
      if ((window as any).Flourish && typeof (window as any).Flourish.init === "function") {
        try {
          (window as any).Flourish.init();
        } catch (e) {
          console.warn("Error refreshing Flourish embed:", e);
        }
      }
    }
  }, [id]);

  return (
    <div className="w-full relative overflow-hidden rounded-xl border border-zinc-200/60 bg-white">
      <div
        className="flourish-embed"
        data-src={`visualisation/${id}`}
        data-width="100%"
        style={{ minHeight }}
      ></div>
    </div>
  );
}
