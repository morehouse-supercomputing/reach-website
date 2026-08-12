"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Researcher } from "../lib/data";
import { researcherAccent } from "../lib/data";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

function initialsOf(r: Researcher) {
  return `${r.firstName[0]}${r.lastName[0]}`.toUpperCase();
}

function badgePng(r: Researcher): string {
  const accent = researcherAccent(r);
  const fullName = `${r.prefix ? r.prefix + " " : ""}${r.firstName} ${r.lastName}`;
  const W = 600,
    H = 906;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  x.beginPath();
  (x as any).roundRect ? (x as any).roundRect(0, 0, W, H, 34) : x.rect(0, 0, W, H);
  x.clip();
  x.fillStyle = "#f4f1ea";
  x.fillRect(0, 0, W, H);
  x.fillStyle = "#ffffff";
  x.fillRect(0, 0, W, 150);
  const seg = [
    ["#ea4335", 0],
    ["#fbbc05", 0.25],
    ["#34a853", 0.5],
    ["#4285f4", 0.75],
  ] as const;
  seg.forEach(([col, off]) => {
    x.fillStyle = col;
    x.fillRect(W * off, 150, W * 0.25, 6);
  });
  x.textBaseline = "alphabetic";
  x.fillStyle = "#211f1a";
  x.textAlign = "left";
  x.font = "700 42px Georgia, 'Times New Roman', serif";
  x.fillText("REACH", 48, 96);
  x.fillStyle = "#706a5f";
  x.textAlign = "right";
  x.font = "16px Helvetica, Arial, sans-serif";
  x.fillText("GENAI CONSORTIUM", W - 48, 90);
  x.fillStyle = accent;
  x.beginPath();
  x.arc(W / 2, 330, 108, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = "#ffffff";
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.font = "700 92px Georgia, serif";
  x.fillText(initialsOf(r), W / 2, 336);
  x.textBaseline = "alphabetic";
  x.fillStyle = "#211f1a";
  x.font = fullName.length > 22 ? "700 36px Georgia, serif" : "700 44px Georgia, serif";
  x.fillText(fullName, W / 2, 512);
  x.fillStyle = accent;
  x.font = "700 21px Helvetica, Arial, sans-serif";
  const role = r.role.length > 46 ? r.role.slice(0, 44) + "…" : r.role;
  x.fillText(role, W / 2, 558);
  x.fillStyle = "#706a5f";
  x.font = "21px Helvetica, Arial, sans-serif";
  x.fillText(r.institution, W / 2, 596);
  x.strokeStyle = "#e2ddd0";
  x.beginPath();
  x.moveTo(48, 756);
  x.lineTo(W - 48, 756);
  x.stroke();
  x.textAlign = "left";
  x.fillStyle = "#706a5f";
  x.font = "18px Helvetica, Arial, sans-serif";
  x.fillText(r.workstream, 48, 810);
  x.fillStyle = "#211f1a";
  x.font = "700 18px Helvetica, Arial, sans-serif";
  x.fillText("2026 · Google Research × HBCUs", 48, 844);
  return c.toDataURL("image/png");
}

function makeBand(logo: HTMLImageElement): string {
  const W = 1024,
    H = 128;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  x.fillStyle = "#0b0b0c";
  x.fillRect(0, 0, W, H);
  const lh = 92;
  const lw = lh * (logo.width / logo.height);
  x.drawImage(logo, (W - lw) / 2, (H - lh) / 2, lw, lh);
  return c.toDataURL("image/png");
}

export default function ResearcherProfile({ researcher }: { researcher: Researcher }) {
  const [front, setFront] = useState<string | null>(null);
  const [band, setBand] = useState<string | null>(null);
  const accent = researcherAccent(researcher);

  useEffect(() => {
    setFront(badgePng(researcher));
    const img = new Image();
    img.onload = () => setBand(makeBand(img));
    img.src = "/google-research-logo-t.png";
  }, [researcher]);

  return (
    <div
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "0 28px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        alignItems: "center",
        minHeight: "calc(100vh - 70px)",
      }}
      className="researcher-profile"
    >
      <div style={{ height: "min(84vh, 760px)", minHeight: 560, position: "relative", overflow: "hidden" }}>
        {front && <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} frontImage={front} lanyardImage={band} lanyardWidth={1.1} />}
      </div>
      <div style={{ maxWidth: 460 }}>
        <div className="eyebrow" style={{ color: accent }}>
          {researcher.workstream}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px,4.4vw,52px)",
            lineHeight: 1.03,
            letterSpacing: "-.02em",
            fontWeight: 600,
          }}
        >
          {researcher.prefix && `${researcher.prefix} `}
          {researcher.firstName} {researcher.lastName}
        </h1>
        <div style={{ marginTop: 12, fontSize: 18, fontWeight: 600, color: accent }}>{researcher.role}</div>
        <div style={{ fontSize: 16, color: "var(--muted)", marginTop: 2 }}>{researcher.institution}</div>
        <p style={{ marginTop: 22, fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6 }}>{researcher.bio}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
          <a className="btn out sm" href={`mailto:${researcher.email}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>
          {researcher.linkedin && (
            <a className="btn out sm" href={researcher.linkedin} target="_blank" rel="noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
        <div style={{ marginTop: 20, fontSize: 13.5, color: "var(--muted)" }}>Grab the badge and give it a swing.</div>
      </div>
    </div>
  );
}
