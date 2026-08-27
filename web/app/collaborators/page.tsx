import type { Metadata } from "next";
import { institutions, accents, monogram } from "./data";
import ChromaGrid from "../../components/ChromaGrid";

export const metadata: Metadata = { title: "Collaborators · REACH GenAI Consortium" };

export default function CollaboratorsPage() {
  const items = institutions.map((i) => {
    const c = accents[i.slug] || "#1a73e8";
    return {
      image: i.logo || monogram(i.abbr, accents[i.slug] || "#1a73e8"),
      title: i.name,
      subtitle: `${i.role} · ${i.location}`,
      borderColor: c,
      gradient: `linear-gradient(150deg, ${c} 0%, #17181d 62%)`,
      url: `/collaborators/${i.slug}`,
    };
  });

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav className="nav">
        <div className="wrap row">
          <a className="logo" href="/"><span className="mk" />REACH</a>
          <div className="links">
            <a href="/#mission">Mission</a><a href="/#framework">Framework</a><a href="/#leaderboard">Leaderboard</a><a href="/collaborators" style={{ color: "var(--blue)" }}>Collaborators</a><a href="/gallery">Gallery</a>
          </div>
          <div className="right"><a className="btn out sm" href="/">Home</a></div>
        </div>
      </nav>

      <section className="block" style={{ paddingTop: 72 }}>
        <div className="wrap">
          <div className="eyebrow">The Consortium</div>
          <h1 className="h2" style={{ fontSize: "clamp(34px,4.6vw,56px)" }}>Collaborators.</h1>
          <p className="lead">Google Research and twelve HBCU partner institutions, working as peers. Move your cursor across the wall, and select an institution to meet its people and workstreams.</p>
          <div style={{ marginTop: 38 }}>
            <ChromaGrid items={items} radius={340} />
          </div>
        </div>
      </section>

      <footer className="f"><div className="wrap"><div className="cols">
        <div><div className="brandline">REACH</div><p style={{ maxWidth: 300 }}>The Representation Evaluation + Cultural Heuristics GenAI Consortium. A peer-level Google Research and HBCU partnership.</p></div>
        <div><h5>Project</h5><a href="/#mission">North Star</a><a href="/#framework">Framework</a><a href="/#leaderboard">Leaderboard</a></div>
        <div><h5>Consortium</h5><a href="/collaborators">Collaborators</a><a href="/gallery">Gallery</a><a href="/#consortium">Workstreams</a><a href="/#roadmap">Roadmap</a></div>
        <div><h5>Governance</h5><a href="#">Methodology</a><a href="#">Publications</a><a href="#">Contact</a></div>
      </div><div className="bottom">© 2026 REACH GenAI Consortium · Google Research Impact Lab × HBCU Partners</div></div></footer>
    </main>
  );
}
