"use client";
import { useEffect, useState } from "react";

const partners = [
  { slug: "morehouse", abbr: "MC", name: "Morehouse College", role: "Partner Institution", logo: "/morehouse-college-seal.svg" },
  { slug: "clark-atlanta", abbr: "CAU", name: "Clark Atlanta University", role: "Partner Institution", logo: "/clark-atlanta-seal.svg" },
  { slug: "claflin", abbr: "CU", name: "Claflin University", role: "Partner Institution", logo: "/claflin-seal.png" },
  { slug: "famu", abbr: "FAMU", name: "Florida A&M University", role: "Partner Institution", logo: "/famu-seal.png" },
  { slug: "hampton", abbr: "HU", name: "Hampton University", role: "Partner Institution", logo: "/hampton-seal.png" },
  { slug: "howard", abbr: "HOW", name: "Howard University", role: "Partner Institution", logo: "/howard-university-logo.png" },
  { slug: "morgan-state", abbr: "MSU", name: "Morgan State University", role: "Partner Institution", logo: "/morgan-state-university.png" },
  { slug: "nc-at", abbr: "A&T", name: "North Carolina A&T", role: "Partner Institution", logo: "/ncat-logo.svg" },
  { slug: "prairie-view", abbr: "PV", name: "Prairie View A&M", role: "Partner Institution", logo: "/prairie-view-seal.svg" },
  { slug: "spelman", abbr: "SC", name: "Spelman College", role: "Partner Institution", logo: "/spelman-college-logo.svg" },
  { slug: "tuskegee", abbr: "TU", name: "Tuskegee University", role: "Partner Institution", logo: "/tuskegee-university-seal.svg" },
  { slug: "xavier", abbr: "XU", name: "Xavier University of Louisiana", role: "Partner Institution", logo: "" },
];
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
  useEffect(() => {
    const t = setInterval(() => setRi((i) => (i + 1) % rotWords.length), 2200);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="wrap row">
          <div className="logo"><span className="mk" />REACH</div>
          <div className="links">
            <a href="#mission">Mission</a><a href="#framework">Framework</a><a href="#leaderboard">Leaderboard</a><a href="/collaborators">Collaborators</a><a href="#roadmap">Roadmap</a>
          </div>
          <div className="right"><a className="btn blue sm" href="#leaderboard">View the Leaderboard</a></div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <span className="oblob a" /><span className="oblob b" /><span className="oblob c" /><span className="oblob d" />
        <div className="wrap in">
          <h1>Measuring how well AI understands<br /><span className="rotwrap"><span className="rot anim" key={ri} style={{ color: rotWords[ri].c }}>{rotWords[ri].w}</span></span></h1>
          <p className="sub">A Google Research and HBCU consortium building the benchmarks, datasets, and public leaderboard that test how generative AI handles hyper-local culture.</p>
          <div className="cta">
            <a className="btn blue" href="#leaderboard">Explore the Leaderboard</a>
            <a className="btn out" href="#mission">Our North Star</a>
          </div>
          <div className="stats">
            <div className="s"><div className="n b">12</div><div className="l">HBCU Partners</div></div>
            <div className="s"><div className="n r">4</div><div className="l">Cultural Domains</div></div>
            <div className="s"><div className="n a">5</div><div className="l">Heuristic Lenses</div></div>
            <div className="s"><div className="n g">5</div><div className="l">Workstreams</div></div>
          </div>
        </div>
        <div className="marq-cap">Google Research + 12 HBCU partner institutions</div>
        <div className="marquee"><div className="track">{[...marq, ...marq].map((m, i) => (<div className="chip logo" key={i}><img className="lg" src={m.logo} alt={m.name} /></div>))}</div></div>
      </header>

      {/* MISSION */}
      <section className="block alt" id="mission">
        <div className="wrap reveal">
          <div className="eyebrow">The North Star</div>
          <h2 className="h2">Closing a sociotechnical measurement gap.</h2>
          <p className="lead" style={{ maxWidth: 780 }}>Existing AI benchmarks lean on static, Western, English-centric datasets that overlook hyper-local context, language variation, and cultural nuance. REACH co-designs community-authored evaluation tools and annotated ground-truth datasets to assess and improve the cultural competency of models like Gemini across real communities.</p>
          <div className="grid g2" style={{ marginTop: 34 }}>
            <div className="feat blue"><span className="orb" /><div className="k">Peer-level partnership</div><div className="big">Co-design</div><p>Not transactional funding. HBCUs and Google Research collaborate as peers, embedding community perspective into the core research.</p></div>
            <div className="feat red"><span className="orb" /><div className="k">Community-authored</div><div className="big">Ground truth</div><p>Regional in-person workshops harvest authentic, hyper-local query data that maps real cultural taxonomies.</p></div>
          </div>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="block" id="framework">
        <div className="wrap reveal">
          <div className="eyebrow">The Cultural Topics Framework</div>
          <h2 className="h2">Turning cultural identity into measurable constraints.</h2>
          <p className="lead">A structured taxonomy on two axes: the domains we evaluate, and the heuristic lenses we score against.</p>
          <div style={{ margin: "36px 0 16px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>Cultural Domains <span style={{ color: "var(--muted)", fontWeight: 500 }}>· the use cases</span></div>
          <div className="grid g4">{domains.map((d) => (<div className="card hov" key={d.t}><div className={`ic ${d.ic}`}>{d.e}</div><h3>{d.t}</h3><p>{d.d}</p></div>))}</div>
          <div style={{ margin: "42px 0 16px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>Cultural Heuristics <span style={{ color: "var(--muted)", fontWeight: 500 }}>· the evaluation lenses</span></div>
          <div className="card"><div className="grid g3">{heuristics.map((h) => (<div key={h.t} style={{ display: "flex", gap: 12 }}><span style={{ flex: "0 0 auto", width: 11, height: 11, borderRadius: 3, background: h.c, marginTop: 6 }} /><div><div style={{ fontWeight: 600, fontSize: 15 }}>{h.t}</div><div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 2 }}>{h.d}</div></div></div>))}</div></div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="block alt" id="leaderboard">
        <div className="wrap reveal">
          <div className="eyebrow">Workstream 3 · Core Data Product</div>
          <h2 className="h2">The REACH Cultural Leaderboard.</h2>
          <p className="lead">Disaggregated model rankings scored against the Cultural Heuristics framework on a 5-point, community-validated rubric.</p>
          <div className="lbcard">
            <div className="top"><div className="t">Cultural competency by heuristic · mean score (1–5)</div><span className="badge">Sample data</span></div>
            <div className="scroll"><table className="lb">
              <thead><tr><th className="m">Model</th>{lbCols.map((c) => <th key={c}>{c}</th>)}<th>Overall</th></tr></thead>
              <tbody>{lbRows.map((r, i) => { const o = r.scores.reduce((a, b) => a + b, 0) / r.scores.length; return (<tr key={r.model}><td className="m"><span className="rank">{i + 1}</span>{r.model}</td>{r.scores.map((s, j) => <td key={j}><span className={`score ${sc(s)}`}>{s.toFixed(1)}</span></td>)}<td><span className={`score ${sc(o)}`}>{o.toFixed(2)}</span></td></tr>); })}</tbody>
            </table></div>
            <div className="lbfoot">Illustrative placeholder data for layout. Live rankings come from the Workstream 3 hybrid annotation pipeline (creator-intent plus expert cultural-accuracy assessment) and prompt-based auto-raters.</div>
          </div>
        </div>
      </section>

      {/* CONSORTIUM */}
      <section className="block" id="consortium">
        <div className="wrap reveal">
          <div className="eyebrow">The Consortium</div>
          <h2 className="h2">Twelve HBCUs and Google Research, as peers.</h2>
          <p className="lead">Participating institutions embed multi-site academic expertise and community perspective into the research design.</p>
          <div className="grid g4" style={{ marginTop: 30 }}>{partners.map((i) => (<a className="card hov" style={{ padding: 0 }} key={i.name} href={`/collaborators/${i.slug}`}><div className="inst">{i.logo ? <img className="lgm" src={i.logo} alt="" /> : <div className="mk">{i.abbr}</div>}<div><div className="nm">{i.name}</div><div className="rl">{i.role}</div></div></div></a>))}</div>
          <div style={{ margin: "50px 0 18px" }} className="eyebrow">Five Workstreams</div>
          <div className="grid g3">{workstreams.map((w) => (<div className="card" key={w.no}><div className="ws"><div className="no" style={{ background: w.c }}>{w.no}</div><div><h4>{w.t}</h4><p>{w.d}</p></div></div></div>))}</div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="block alt" id="roadmap">
        <div className="wrap reveal">
          <div className="eyebrow">Roadmap</div>
          <h2 className="h2">From taxonomy to a public benchmark.</h2>
          <p className="lead" style={{ maxWidth: 720 }}>Building toward the September strategic summit and a late-2026 public release, alongside the meta-paper <em>&ldquo;The REACH Corpus: A Multi-Site, Community-Authored Multimodal Dataset for Evaluating Hyper-Local Cultural Nuance in AI.&rdquo;</em></p>
          <div className="tl">{timeline.map((t) => (<div className="row" key={t.when}><span className="dot" style={{ background: t.c }} /><div className="when" style={{ color: t.c }}>{t.when}</div><div className="what">{t.what}</div></div>))}</div>
        </div>
      </section>

      {/* CTA */}
      <section className="block">
        <div className="wrap reveal">
          <div className="ctaband"><span className="orb o1" /><span className="orb o2" /><span className="orb o3" /><span className="orb o4" />
            <h3>The public launch is built for the HBCU President&apos;s Council.</h3>
            <p>Open-source benchmark suites, model scorecards, and a living Cultural Leaderboard, community-authored and independently verifiable.</p>
            <a className="btn white" href="#leaderboard">See the Leaderboard</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="f"><div className="wrap"><div className="cols">
        <div><div className="brandline">REACH</div><p style={{ maxWidth: 300 }}>The Representation Evaluation + Cultural Heuristics GenAI Consortium. A peer-level Google Research and HBCU partnership.</p></div>
        <div><h5>Project</h5><a href="#mission">North Star</a><a href="#framework">Framework</a><a href="#leaderboard">Leaderboard</a></div>
        <div><h5>Consortium</h5><a href="#consortium">Partners</a><a href="#consortium">Workstreams</a><a href="#roadmap">Roadmap</a></div>
        <div><h5>Governance</h5><a href="#">Methodology</a><a href="#">Publications</a><a href="#">Contact</a></div>
      </div><div className="bottom">© 2026 REACH GenAI Consortium · Google Research Impact Lab × HBCU Partners</div></div></footer>
    </>
  );
}
