"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { albums, shots, byAlbum, type Shot } from "./data";

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? shots : shots.filter((s) => s.album === filter)),
    [filter]
  );

  // Only photos that actually exist can be opened.
  const filled = useMemo(() => visible.filter((s) => s.src), [visible]);
  const placed = shots.filter((s) => s.src).length;

  const step = useCallback(
    (dir: number) => {
      setOpen((cur) => {
        if (cur === null || filled.length === 0) return cur;
        return (cur + dir + filled.length) % filled.length;
      });
    },
    [filled.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const current = open === null ? null : filled[open];

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav className="nav">
        <div className="wrap row">
          <a className="logo" href="/"><span className="mk" />REACH</a>
          <div className="links">
            <a href="/#mission">Mission</a>
            <a href="/#framework">Framework</a>
            <a href="/#leaderboard">Leaderboard</a>
            <a href="/collaborators">Collaborators</a>
            <a href="/gallery" style={{ color: "var(--blue)" }}>Gallery</a>
          </div>
          <div className="right"><a className="btn out sm" href="/">Home</a></div>
        </div>
      </nav>

      <section className="block" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div className="wrap">
          <div className="eyebrow">Workshops &amp; Convenings</div>
          <h1 className="h2" style={{ fontSize: "clamp(34px,4.6vw,56px)" }}>
            The work, in the room.
          </h1>
          <p className="lead">
            Twelve HBCUs and Google Research do this together, in person, city by city.
            These are the rooms where the taxonomy got argued over and the queries got written.
          </p>

          <div className="gal-bar">
            <div className="gal-chips">
              <button
                className={`gal-chip${filter === "all" ? " on" : ""}`}
                onClick={() => { setFilter("all"); setOpen(null); }}
              >
                All <span className="gal-n">{shots.length}</span>
              </button>
              {albums.map((a) => {
                const n = shots.filter((s) => s.album === a.slug).length;
                return (
                  <button
                    key={a.slug}
                    className={`gal-chip${filter === a.slug ? " on" : ""}`}
                    style={filter === a.slug ? { borderColor: a.accent, color: a.accent } : undefined}
                    onClick={() => { setFilter(a.slug); setOpen(null); }}
                  >
                    <span className="gal-dot" style={{ background: a.accent }} />
                    {a.title} <span className="gal-n">{n}</span>
                  </button>
                );
              })}
            </div>
            <div className="gal-count">
              {placed} of {shots.length} photos placed
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div className="gal-grid">
            {visible.map((s, i) => {
              const a = byAlbum(s.album);
              const idx = s.src ? filled.findIndex((f) => f.id === s.id) : -1;
              return (
                <figure
                  key={s.id}
                  className={`gal-tile${s.size ? " " + s.size : ""}${s.src ? " has" : ""}`}
                  style={{ ["--a" as string]: a?.accent, ["--t" as string]: `${((i % 5) - 2) * 0.35}deg` }}
                  onClick={() => idx >= 0 && setOpen(idx)}
                  tabIndex={idx >= 0 ? 0 : -1}
                  onKeyDown={(e) => { if (idx >= 0 && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setOpen(idx); } }}
                >
                  {s.src ? (
                    <img src={s.src} alt={s.caption || `${a?.title} photograph`} loading="lazy" />
                  ) : (
                    <div className="gal-empty">
                      <span className="gal-mk" />
                      <span className="gal-wait">Awaiting photo</span>
                    </div>
                  )}
                  <figcaption>
                    <span className="gal-where">{a?.title}</span>
                    <span className="gal-when">{a?.meta}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {current && (
        <div className="gal-box" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="gal-x" onClick={() => setOpen(null)} aria-label="Close">×</button>
          <button
            className="gal-arrow l"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous"
          >‹</button>
          <figure className="gal-stage" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.caption || ""} />
            <figcaption>
              <strong>{byAlbum(current.album)?.title}</strong>
              <span>{byAlbum(current.album)?.meta}</span>
              {current.caption && <p>{current.caption}</p>}
            </figcaption>
          </figure>
          <button
            className="gal-arrow r"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next"
          >›</button>
        </div>
      )}

      <footer className="f"><div className="wrap"><div className="cols">
        <div><div className="brandline">REACH</div><p style={{ maxWidth: 300 }}>The Representation Evaluation + Cultural Heuristics GenAI Consortium. A peer-level Google Research and HBCU partnership.</p></div>
        <div><h5>Project</h5><a href="/#mission">North Star</a><a href="/#framework">Framework</a><a href="/#leaderboard">Leaderboard</a></div>
        <div><h5>Consortium</h5><a href="/collaborators">Collaborators</a><a href="/gallery">Gallery</a><a href="/#roadmap">Roadmap</a></div>
        <div><h5>Governance</h5><a href="#">Methodology</a><a href="#">Publications</a><a href="#">Contact</a></div>
      </div><div className="bottom">© 2026 REACH GenAI Consortium · Google Research Impact Lab × HBCU Partners</div></div></footer>
    </main>
  );
}
