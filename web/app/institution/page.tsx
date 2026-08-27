import type { Metadata } from "next";

export const metadata: Metadata = { title: "Morehouse College · REACH Consortium" };

type Faculty = { name: string; title: string; initials: string };
type Institution = {
  name: string;
  role: string;
  logo: string;
  location: string;
  accent: string;
  blurb: string;
  faculty: Faculty[];
  focus: string[];
};

// Template data — duplicate per school (or make it /partner/[slug]). Faculty from the consortium deck.
const inst: Institution = {
  name: "Morehouse College",
  role: "Partner Institution",
  logo: "/morehouse-college-seal.svg",
  location: "Atlanta, Georgia",
  accent: "#1a73e8",
  blurb:
    "One of twelve HBCU partners in the REACH GenAI Consortium, working alongside Google Research. Morehouse co-leads Workstream 5 with Google and Howard, and administers the consortium's technical cloud infrastructure.",
  faculty: [
    { name: "Dr. Ashley Scruse", title: "Researcher & Faculty Lead", initials: "AS" },
    { name: "Dr. Kinnis Gosha", title: "Chair, Computer Science Department", initials: "KG" },
    { name: "Dr. Sonya Dennis", title: "Assistant Professor, Computer Science", initials: "SD" },
  ],
  focus: ["Cultural competency evaluation", "Community-informed research", "Consortium coordination"],
};

export default function InstitutionPage() {
  const i = inst;
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav className="nav"><div className="wrap row"><a className="logo" href="/"><span className="mk" />REACH</a>
        <div className="links"><a href="/#consortium">Consortium</a><a href="/#framework">Framework</a><a href="/#leaderboard">Leaderboard</a></div>
        <div className="right"><a className="btn out sm" href="/#consortium">All partners</a></div></div>
      </nav>

      {/* HERO */}
      <section className="block" style={{ paddingTop: 64, paddingBottom: 48 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28, alignItems: "center" }}>
          <div>
            <div className="tags" style={{ marginBottom: 18 }}>
              <span className="tag b">{i.role}</span>
              <span className="tag a">{i.location}</span>
              <span className="tag g">REACH Partner</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,5vw,64px)", lineHeight: 1.0, letterSpacing: "-.03em", fontWeight: 600, maxWidth: "16ch" }}>{i.name}</h1>
            <p className="lead" style={{ maxWidth: 560 }}>{i.blurb}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <a className="btn blue" href="#faculty">Meet the faculty</a>
              <a className="btn out" href="/#leaderboard">View the leaderboard</a>
            </div>
          </div>
          <div className="card" style={{ display: "grid", placeItems: "center", padding: 40, background: "var(--paper)" }}>
            <img src={i.logo} alt={i.name} style={{ width: 168, height: 168, objectFit: "contain" }} />
          </div>
        </div>
      </section>

      {/* STATS + FOCUS */}
      <section className="block alt" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div className="feat blue"><span className="orb" /><div className="k">Role in the consortium</div><div className="big">{i.role}</div><p>Coordinating community-informed evaluation across twelve HBCUs and Google Research.</p></div>
          <div className="card">
            <div className="eyebrow" style={{ color: i.accent }}>Research focus</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              {i.focus.map((f) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: i.accent, flex: "0 0 auto" }} />
                  <span style={{ fontWeight: 600, fontSize: 15.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section className="block" id="faculty" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="eyebrow">Faculty & Researchers</div>
          <h2 className="h2">The people behind the work.</h2>
          <div className="grid g3" style={{ marginTop: 30 }}>
            {i.faculty.map((f) => (
              <div className="card hov" key={f.name}>
                <div className="ic b" style={{ background: "var(--blue-soft)", color: "var(--blue-d)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{f.initials}</div>
                <h3>{f.name}</h3>
                <p>{f.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="f"><div className="wrap"><div className="cols">
        <div><div className="brandline">REACH</div><p style={{ maxWidth: 300 }}>The Representation Evaluation + Cultural Heuristics GenAI Consortium. A peer-level Google Research and HBCU partnership.</p></div>
        <div><h5>Consortium</h5><a href="/#consortium">Partners</a><a href="/#consortium">Workstreams</a><a href="/#roadmap">Roadmap</a></div>
        <div><h5>Research</h5><a href="/#framework">Framework</a><a href="/#leaderboard">Leaderboard</a></div>
        <div><h5>This partner</h5><a href="#faculty">Faculty</a><a href="/#consortium">Back to all</a></div>
      </div><div className="bottom">© 2026 REACH GenAI Consortium · Google Research Impact Lab × HBCU Partners</div></div></footer>
    </main>
  );
}
