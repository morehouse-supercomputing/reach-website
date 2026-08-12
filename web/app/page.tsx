"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CoverflowCarousel from "../components/CoverflowCarousel";
import { INSTITUTIONS_DATA } from "../lib/data";

// The 12 consortium partners live in one place (lib/data.ts) so this section
// and the /institutions page can never drift out of sync with each other.
const partners = INSTITUTIONS_DATA;
const marq = [{ name: "Google Research", logo: "/google-research-logo-t.png" }, ...partners.map((p) => ({ name: p.name, logo: p.logo }))].filter((m) => m.logo);

const rotWords = [
  { w: "culture", c: "var(--blue)" },
  { w: "history", c: "var(--red)" },
  { w: "your language", c: "var(--amber-ink)" },
  { w: "your community", c: "var(--green-d)" },
  { w: "sacred traditions", c: "var(--blue-d)" },
];

const domains = [
  { ic: "b", e: "🎬", t: "Entertainment & Media", d: "Creative storytelling, visual assets, and avoiding monolithic portrayals." },
  { ic: "r", e: "🩺", t: "Health & Well-being", d: "Cultural health practices, medical education, and high-risk health outreach." },
  { ic: "a", e: "📚", t: "Education & Learning", d: "Curriculum development and accurate transmission of historical narratives." },
  { ic: "g", e: "💬", t: "Communications & Public Discourse", d: "Public messaging, dialogue facilitation, and language protection." },
];
const heuristics = [
  { c: "var(--blue)", t: "Historical Framing & Local Narratives", d: "Respecting collective memory and localized interpretations of history." },
  { c: "var(--red)", t: "Shared Moments & Local Customs", d: "Understanding recurring community rituals, holidays, and practices." },
  { c: "var(--amber)", t: "Sacred & Sensitive Content", d: "Protecting deeply held beliefs, religious codes, and community taboos." },
  { c: "var(--green)", t: "Authenticity & Essentialization", d: "Accurate identity representation without overgeneralizing or reinforcing tropes." },
  { c: "var(--blue-d)", t: "Cultural Expression", d: "Nuance in local language, dialect, music, art, and clothing." },
];
const lbCols = ["Historical", "Customs", "Sacred", "Authenticity", "Expression"];
const lbRows = [
  { model: "Gemini 2.5 Pro", scores: [4.6, 4.4, 4.5, 4.2, 4.7] },
  { model: "Gemini 2.5 Flash", scores: [4.2, 4.1, 4.0, 3.9, 4.3] },
  { model: "Model B", scores: [3.9, 4.0, 3.6, 3.7, 4.1] },
  { model: "Model C", scores: [3.4, 3.6, 3.2, 3.5, 3.8] },
  { model: "Model D", scores: [3.1, 3.0, 2.8, 3.3, 3.4] },
];
const sc = (v: number) => (v >= 4.0 ? "s-hi" : v >= 3.4 ? "s-mid" : "s-lo");
const workstreams = [
  { no: "WS1", c: "var(--blue)", t: "Foundational AI", d: "Core methodology, taxonomy, and the sociotechnical measurement framework." },
  { no: "WS2", c: "var(--green)", t: "Applied AI", d: "Community data collection via the Amplify app and regional validation workshops." },
  { no: "WS3", c: "var(--red)", t: "AI Safety", d: "Hybrid annotation, auto-rater prototyping, and the Cultural Leaderboard." },
  { no: "WS4", c: "var(--amber)", t: "AI Policy", d: "Responsible-use guidance and tech-policy translation for stakeholders." },
  { no: "WS5", c: "var(--blue-d)", t: "Dissemination", d: "Public communication, this platform, and the President's Council rollout." },
];
const spySections = [
  { id: "mission", label: "Mission", key: "blue" },
  { id: "framework", label: "Framework", key: "red" },
  { id: "leaderboard", label: "Leaderboard", key: "amber" },
];

const timeline = [
  { c: "var(--blue)", when: "Jun 2025", what: "Inaugural Faculty Catalyst Workshop; milestones aligned with leadership councils." },
  { c: "var(--green)", when: "Late 2025", what: "Multi-institutional contracts executed; Cultural Heuristics taxonomy finalized." },
  { c: "var(--amber)", when: "Feb 2026", what: "Hybrid research convening kicks off the active data-collection phase." },
  { c: "var(--red)", when: "Apr–Jul 2026", what: "Regional community workshops and campus student research projects." },
  { c: "var(--blue)", when: "Sep 2026", what: "Strategic summit: leadership alignment, tool exchanges, and student showcases." },
  { c: "var(--green)", when: "Late 2026", what: "Public benchmark suite, model scorecards, and Cultural Leaderboard launch." },
];

export default function Home() {
  const [ri, setRi] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpy, setActiveSpy] = useState(spySections[0].id);
  const router = useRouter();

  useEffect(() => {
    const t = setInterval(() => setRi((i) => (i + 1) % rotWords.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const els = spySections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSpy(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/docs?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <nav className="nav">
        <div className="wrap row">
          <div className="logo">
            <span className="mk" />
            REACH
          </div>
          <div className="links">
            <Link href="/researchers">Directory</Link>
            <Link href="/institutions">Institutions</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="right">
            <Link className="btn blue sm" href="/signin">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* SECTION SCROLLSPY */}
      <aside className="scrollspy" aria-label="Section navigation">
        <span className="rail" />
        {spySections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`sdot ${s.key}${activeSpy === s.id ? " active" : ""}`}
            onClick={scrollToId(s.id)}
            aria-current={activeSpy === s.id ? "true" : undefined}
          >
            <span className="pt" />
            <span className="lbl">{s.label}</span>
          </a>
        ))}
      </aside>

      {/* HERO */}
      <header className="hero">
        <span className="oblob a" />
        <span className="oblob b" />
        <span className="oblob c" />
        <span className="oblob d" />
        <div className="wrap in">
          <div className="pill">
            <span className="g" />
            <span>Consortium Active Phase</span>
          </div>
          <h1>
            Measuring how well AI understands
            <br />
            <span className="rotwrap">
              <span className="rot anim" key={ri} style={{ color: rotWords[ri].c }}>
                {rotWords[ri].w}
              </span>
            </span>
          </h1>
          <p className="sub">
            A Google Research and HBCU consortium building the benchmarks, datasets, and public leaderboard that test how generative AI handles hyper-local culture.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "32px auto 0",
              background: "var(--paper)",
              border: "1px solid var(--border)",
              padding: "8px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "var(--shadow)",
            }}
          >
            <div style={{ display: "flex", flex: 1, alignItems: "center", paddingLeft: "12px" }}>
              <svg style={{ height: "18px", width: "18px", color: "var(--muted)", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search scholars, schools, or research interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "14.5px",
                  color: "var(--ink)",
                  paddingLeft: "10px",
                  fontFamily: "var(--font-body)",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn blue"
              style={{
                padding: "8px 20px",
                fontSize: "14px",
                borderRadius: "999px",
              }}
            >
              Search
            </button>
          </form>

          {/* Suggestions */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              fontSize: "12.5px",
              color: "var(--muted)",
              marginTop: "16px",
              fontFamily: "var(--font-body)",
            }}
          >
            <span>Suggestions:</span>
            {["Dr. Ashley Scruse", "Applied AI", "Morehouse College", "AI Safety"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--blue)",
                  textDecoration: "underline",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "12.5px",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="cta" style={{ marginTop: "24px" }}>
            <a className="btn blue" href="#researchers-section" onClick={scrollToId("researchers-section")}>
              Meet Our Researchers
            </a>
            <a className="btn out" href="#mission" onClick={scrollToId("mission")}>
              Our North Star
            </a>
          </div>

          <div className="stats">
            <div className="s">
              <div className="n b">12</div>
              <div className="l">HBCU Partners</div>
            </div>
            <div className="s">
              <div className="n r">4</div>
              <div className="l">Cultural Domains</div>
            </div>
            <div className="s">
              <div className="n a">5</div>
              <div className="l">Heuristic Lenses</div>
            </div>
            <div className="s">
              <div className="n g">5</div>
              <div className="l">Workstreams</div>
            </div>
          </div>
        </div>
        <div className="marq-cap">Google Research + 12 HBCU partner institutions</div>
        <div className="marquee">
          <div className="track">
            {[...marq, ...marq].map((m, i) => (
              <div className="chip logo" key={i}>
                <img className="lg" src={m.logo} alt={m.name} />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* FEATURED RESEARCHERS CAROUSEL SECTION */}
      <section className="block alt" id="researchers-section" style={{ overflow: "hidden" }}>
        <div className="wrap reveal">
          <div className="eyebrow">Featured Researchers</div>
          <h2 className="h2">Scholars driving AI innovation and safety.</h2>
          <p className="lead">
            Meet the researchers, advisors, and faculty cataloging local cultural insights and defining cultural competency evaluation lenses.
          </p>
        </div>
        <div style={{ marginTop: "40px" }}>
          <CoverflowCarousel searchQuery={searchQuery} />
        </div>
      </section>

      {/* MISSION */}
      <section className="block alt" id="mission">
        <div className="wrap reveal">
          <div className="eyebrow">The North Star</div>
          <h2 className="h2">Closing a sociotechnical measurement gap.</h2>
          <p className="lead" style={{ maxWidth: 780 }}>
            Existing AI benchmarks lean on static, Western, English-centric datasets that overlook hyper-local context, language variation, and cultural nuance. REACH co-designs community-authored evaluation tools and annotated ground-truth datasets to assess and improve the cultural competency of models like Gemini across real communities.
          </p>
          <div className="grid g2" style={{ marginTop: 34 }}>
            <div className="feat blue">
              <span className="orb" />
              <div className="k">Peer-level partnership</div>
              <div className="big">Co-design</div>
              <p>Not transactional funding. HBCUs and Google Research collaborate as peers, embedding community perspective into the core research.</p>
            </div>
            <div className="feat red">
              <span className="orb" />
              <div className="k">Community-authored</div>
              <div className="big">Ground truth</div>
              <p>Regional in-person workshops harvest authentic, hyper-local query data that maps real cultural taxonomies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="block" id="framework">
        <div className="wrap reveal">
          <div className="eyebrow">The Cultural Topics Framework</div>
          <h2 className="h2">Turning cultural identity into measurable constraints.</h2>
          <p className="lead">A structured taxonomy on two axes: the domains we evaluate, and the heuristic lenses we score against.</p>
          <div style={{ margin: "36px 0 16px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>
            Cultural Domains <span style={{ color: "var(--muted)", fontWeight: 500 }}>· the use cases</span>
          </div>
          <div className="grid g4">
            {domains.map((d) => (
              <div className="card hov" key={d.t}>
                <div className={`ic ${d.ic}`} style={{ fontSize: "22px" }}>{d.e}</div>
                <h3>{d.t}</h3>
                <p>{d.d}</p>
              </div>
            ))}
          </div>
          <div style={{ margin: "42px 0 16px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>
            Cultural Heuristics <span style={{ color: "var(--muted)", fontWeight: 500 }}>· the evaluation lenses</span>
          </div>
          <div className="card">
            <div className="grid g3">
              {heuristics.map((h) => (
                <div key={h.t} style={{ display: "flex", gap: 12 }}>
                  <span style={{ flex: "0 0 auto", width: 11, height: 11, borderRadius: 3, background: h.c, marginTop: 6 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{h.t}</div>
                    <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 2 }}>{h.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="block alt" id="leaderboard">
        <div className="wrap reveal">
          <div className="eyebrow">Workstream 3 · Core Data Product</div>
          <h2 className="h2">The REACH Cultural Leaderboard.</h2>
          <p className="lead">Disaggregated model rankings scored against the Cultural Heuristics framework on a 5-point, community-validated rubric.</p>
          <div className="lbcard">
            <div className="top">
              <div className="t">Cultural competency by heuristic · mean score (1–5)</div>
              <span className="badge">Sample data</span>
            </div>
            <div className="scroll">
              <table className="lb">
                <thead>
                  <tr>
                    <th className="m">Model</th>
                    {lbCols.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                    <th>Overall</th>
                  </tr>
                </thead>
                <tbody>
                  {lbRows.map((r, i) => {
                    const o = r.scores.reduce((a, b) => a + b, 0) / r.scores.length;
                    return (
                      <tr key={r.model}>
                        <td className="m">
                          <span className="rank">{i + 1}</span>
                          {r.model}
                        </td>
                        {r.scores.map((s, j) => (
                          <td key={j}>
                            <span className={`score ${sc(s)}`}>{s.toFixed(1)}</span>
                          </td>
                        ))}
                        <td>
                          <span className={`score ${sc(o)}`}>{o.toFixed(2)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="lbfoot">
              Illustrative placeholder data for layout. Live rankings come from the Workstream 3 hybrid annotation pipeline (creator-intent plus expert cultural-accuracy assessment) and prompt-based auto-raters.
            </div>
          </div>
        </div>
      </section>

      {/* CONSORTIUM */}
      <section className="block" id="consortium">
        <div className="wrap reveal">
          <div className="eyebrow">The Consortium</div>
          <h2 className="h2">Twelve HBCUs and Google Research, as peers.</h2>
          <p className="lead">Participating institutions embed multi-site academic expertise and community perspective into the research design.</p>
          <div className="grid g4" style={{ marginTop: 30 }}>
            {partners.map((i) => (
              <Link
                className="card hov"
                style={{
                  padding: 0,
                  display: "block",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                }}
                key={i.id}
                href={`/institutions#${i.id}`}
              >
                <div className="inst">
                  {i.logo ? (
                    <img className="lgm" src={i.logo} alt="" />
                  ) : (
                    <div className="mk">{i.abbr}</div>
                  )}
                  <div>
                    <div className="nm">{i.name}</div>
                    <div className="rl">{i.role}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ margin: "50px 0 18px" }} className="eyebrow">
            Five Workstreams
          </div>
          <div className="grid g3">
            {workstreams.map((w) => (
              <div className="card" key={w.no}>
                <div className="ws">
                  <div className="no" style={{ background: w.c }}>
                    {w.no}
                  </div>
                  <div>
                    <h4>{w.t}</h4>
                    <p>{w.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ROADMAP */}
      <section className="block" id="roadmap">
        <div className="wrap reveal">
          <div className="eyebrow">Roadmap</div>
          <h2 className="h2">From taxonomy to a public benchmark.</h2>
          <p className="lead" style={{ maxWidth: 720 }}>
            Building toward the September strategic summit and a late-2026 public release, alongside the meta-paper{" "}
            <em>
              &ldquo;The REACH Corpus: A Multi-Site, Community-Authored Multimodal Dataset for Evaluating Hyper-Local Cultural Nuance in AI.&rdquo;
            </em>
          </p>
          <div className="tl">
            {timeline.map((t) => (
              <div className="row" key={t.when}>
                <span className="dot" style={{ background: t.c }} />
                <div className="when" style={{ color: t.c }}>
                  {t.when}
                </div>
                <div className="what">{t.what}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="block alt">
        <div className="wrap reveal">
          <div className="ctaband">
            <span className="orb o1" />
            <span className="orb o2" />
            <span className="orb o3" />
            <span className="orb o4" />
            <h3>The public launch is built for the HBCU President&apos;s Council.</h3>
            <p>Open-source benchmark suites, model scorecards, and a living Cultural Leaderboard, community-authored and independently verifiable.</p>
            <a className="btn white" href="#leaderboard" onClick={scrollToId("leaderboard")}>
              See the Leaderboard
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="f">
        <div className="wrap">
          <div className="cols">
            <div>
              <div className="brandline">REACH</div>
              <p style={{ maxWidth: 300 }}>
                The Representation Evaluation + Cultural Heuristics GenAI Consortium. A peer-level Google Research and HBCU partnership.
              </p>
            </div>
            <div>
              <h5>Project</h5>
              <a href="#mission" onClick={scrollToId("mission")}>North Star</a>
              <a href="#framework" onClick={scrollToId("framework")}>Framework</a>
              <a href="#leaderboard" onClick={scrollToId("leaderboard")}>Leaderboard</a>
            </div>
            <div>
              <h5>Consortium</h5>
              <Link href="/institutions">Partners</Link>
              <Link href="/researchers">Directory</Link>
              <a href="#roadmap" onClick={scrollToId("roadmap")}>Roadmap</a>
            </div>
            <div>
              <h5>Governance</h5>
              <Link href="/docs">Docs</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="bottom">© 2026 REACH GenAI Consortium · Google Research Impact Lab × HBCU Partners</div>
        </div>
      </footer>
    </>
  );
}
