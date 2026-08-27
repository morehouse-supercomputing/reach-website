"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { AnyPerson } from "../app/collaborators/data";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

function initialsOf(name: string) {
  return name
    .replace(/^Dr\.\s+/i, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function badgePng(p: AnyPerson): string {
  const W = 600, H = 906;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d")!;
  x.beginPath();
  (x as any).roundRect ? (x as any).roundRect(0, 0, W, H, 34) : x.rect(0, 0, W, H);
  x.clip();
  x.fillStyle = "#f4f1ea"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, W, 150);
  const seg = [["#ea4335", 0], ["#fbbc05", 0.25], ["#34a853", 0.5], ["#4285f4", 0.75]] as const;
  seg.forEach(([col, off]) => { x.fillStyle = col; x.fillRect(W * off, 150, W * 0.25, 6); });
  x.textBaseline = "alphabetic";
  x.fillStyle = "#211f1a"; x.textAlign = "left"; x.font = "700 42px Georgia, 'Times New Roman', serif";
  x.fillText("REACH", 48, 96);
  x.fillStyle = "#706a5f"; x.textAlign = "right"; x.font = "16px Helvetica, Arial, sans-serif";
  x.fillText("GENAI CONSORTIUM", W - 48, 90);
  x.fillStyle = p.accent; x.beginPath(); x.arc(W / 2, 330, 108, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#ffffff"; x.textAlign = "center"; x.textBaseline = "middle";
  x.font = "700 92px Georgia, serif"; x.fillText(initialsOf(p.name), W / 2, 336);
  x.textBaseline = "alphabetic";
  x.fillStyle = "#211f1a";
  x.font = p.name.length > 22 ? "700 36px Georgia, serif" : "700 44px Georgia, serif";
  x.fillText(p.name, W / 2, 512);
  x.fillStyle = p.accent; x.font = "700 21px Helvetica, Arial, sans-serif";
  const role = p.title.length > 46 ? p.title.slice(0, 44) + "…" : p.title;
  x.fillText(role, W / 2, 558);
  x.fillStyle = "#706a5f"; x.font = "21px Helvetica, Arial, sans-serif"; x.fillText(p.institution, W / 2, 596);
  x.strokeStyle = "#e2ddd0"; x.beginPath(); x.moveTo(48, 756); x.lineTo(W - 48, 756); x.stroke();
  x.textAlign = "left";
  x.fillStyle = "#706a5f"; x.font = "18px Helvetica, Arial, sans-serif";
  x.fillText(p.kind === "student" ? "Summer Build Cohort" : "Consortium Faculty", 48, 810);
  x.fillStyle = "#211f1a"; x.font = "700 18px Helvetica, Arial, sans-serif";
  x.fillText("2026 · Google Research × HBCUs", 48, 844);
  return c.toDataURL("image/png");
}

function makeBand(logo: HTMLImageElement): string {
  const W = 1024, H = 128;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d")!;
  x.fillStyle = "#0b0b0c"; x.fillRect(0, 0, W, H);
  const lh = 92;
  const lw = lh * (logo.width / logo.height);
  x.drawImage(logo, (W - lw) / 2, (H - lh) / 2, lw, lh);
  return c.toDataURL("image/png");
}

export default function PersonProfile({ person }: { person: AnyPerson }) {
  const [front, setFront] = useState<string | null>(null);
  const [band, setBand] = useState<string | null>(null);

  useEffect(() => {
    setFront(badgePng(person));
    const img = new Image();
    img.onload = () => setBand(makeBand(img));
    img.src = "/google-research-logo-t.png";
  }, [person]);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center", minHeight: "calc(100vh - 70px)" }}>
      <div style={{ height: "min(84vh, 760px)", minHeight: 560, position: "relative", overflow: "hidden" }}>
        {front && <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} frontImage={front} lanyardImage={band} lanyardWidth={1.1} />}
      </div>
      <div style={{ maxWidth: 460 }}>
        <div className="eyebrow" style={{ color: person.accent }}>
          {person.kind === "student" ? "REACH Participant" : "Consortium Faculty"}
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.4vw,52px)", lineHeight: 1.03, letterSpacing: "-.02em", fontWeight: 600 }}>{person.name}</h1>
        <div style={{ marginTop: 12, fontSize: 18, fontWeight: 600, color: person.accent }}>{person.title}</div>
        <div style={{ fontSize: 16, color: "var(--muted)", marginTop: 2 }}>{person.institution}</div>
        {person.bio ? (
          <p style={{ marginTop: 22, fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6 }}>{person.bio}</p>
        ) : (
          <p style={{ marginTop: 22, fontSize: 16, color: "var(--muted)", lineHeight: 1.6 }}>Full profile coming soon.</p>
        )}
        {person.focus && (
          <div className="tags" style={{ marginTop: 22 }}>
            {person.focus.map((f) => (<span className="tag b" key={f}>{f}</span>))}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
          <a className="btn out sm" href="#" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.51C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z"/></svg>
            LinkedIn
          </a>
          {person.github && (
            <a className="btn out sm" href={person.github} target="_blank" rel="noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>
              GitHub
            </a>
          )}
          <a className="btn out sm" href="#" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
            CV
          </a>
          <a className="btn out sm" href="#" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            Portfolio
          </a>
        </div>
        <div style={{ marginTop: 20, fontSize: 13.5, color: "var(--muted)" }}>Grab the badge and give it a swing.</div>
      </div>
    </div>
  );
}
