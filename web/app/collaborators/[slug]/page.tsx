import { notFound } from "next/navigation";
import { institutions, bySlug, initials, monogram, personSlug, students, accents, WS_META } from "../data";
import ChromaGrid from "../../../components/ChromaGrid";

const avatar = (init: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><circle cx='150' cy='150' r='128' fill='none' stroke='rgba(255,253,248,0.5)' stroke-width='3'/><circle cx='150' cy='150' r='112' fill='rgba(255,253,248,0.08)'/><text x='150' y='188' text-anchor='middle' font-family='Georgia, serif' font-size='104' font-weight='700' fill='#fffdf8'>${init}</text></svg>`
  );

export function generateStaticParams() {
  return institutions.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = bySlug(slug);
  return { title: i ? `${i.name} · REACH GenAI Consortium` : "Collaborator · REACH" };
}

export default async function InstitutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = bySlug(slug);
  if (!i) notFound();

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav className="nav">
        <div className="wrap row">
          <a className="logo" href="/"><span className="mk" />REACH</a>
          <div className="links">
            <a href="/#mission">Mission</a><a href="/#framework">Framework</a><a href="/#leaderboard">Leaderboard</a><a href="/collaborators" style={{ color: "var(--blue)" }}>Collaborators</a>
          </div>
          <div className="right"><a className="btn out sm" href="/collaborators">All collaborators</a></div>
        </div>
      </nav>

      {/* HERO */}
      <section className="block" style={{ paddingTop: 64, paddingBottom: 48 }}>
        <div className="wrap inst-hero">
          <div>
            <div className="tags" style={{ marginBottom: 18 }}>
              <span className="tag b">{i.role}</span>
              <span className="tag a">{i.location}</span>
              <span className="tag g">REACH Partner</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,5vw,62px)", lineHeight: 1.0, letterSpacing: "-.03em", fontWeight: 600, maxWidth: "16ch" }}>{i.name}</h1>
            <p className="lead" style={{ maxWidth: 560 }}>
              {i.slug === "google-research"
                ? "Co-lead of the REACH GenAI Consortium through the Google Research Impact Lab, partnering with twelve HBCUs to build community-informed evaluation of generative AI."
                : "A partner institution of the REACH GenAI Consortium, embedding its faculty expertise and community perspective into community-informed evaluation of generative AI."}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <a className="btn blue" href="#people">Meet the people</a>
              <a className="btn out" href="#workstreams">Workstream contributions</a>
            </div>
          </div>
          <div className="card" style={{ display: "grid", placeItems: "center", padding: 40, background: "var(--paper)" }}>
            <img src={i.logo || monogram(i.abbr, accents[i.slug] || "#1a73e8")} alt={`${i.name} seal`} style={{ width: 180, height: 180, objectFit: "contain" }} />
          </div>
        </div>
      </section>

      {/* PEOPLE */}
      <section className="block alt" id="people" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="eyebrow">People</div>
          <h2 className="h2">{i.slug === "google-research" ? "Executive sponsors." : "Faculty & researchers."}</h2>
          <div style={{ marginTop: 30 }}>
            <ChromaGrid
              radius={300}
              items={i.people.map((f) => {
                const c = accents[i.slug] || "#1a73e8";
                return {
                  image: f.photo || avatar(initials(f.name)),
                  title: f.name,
                  subtitle: f.title,
                  borderColor: c,
                  gradient: `linear-gradient(160deg, ${c} 0%, #17181d 64%)`,
                  url: `/people/${personSlug(f.name)}`,
                  seal: false,
                };
              })}
            />
          </div>
        </div>
      </section>

      {/* REACH SUMMER COHORT (Morehouse hosts the website build) */}
      {i.slug === "morehouse" && (
        <section className="block" style={{ paddingTop: 64, paddingBottom: 0 }}>
          <div className="wrap">
            <div className="eyebrow">Workstream 5 · Dissemination</div>
            <h2 className="h2">REACH Website Summer Build Cohort.</h2>
            <p className="lead">The five-student cohort building this platform, supervised by Dr. Ashley Scruse.</p>
            <div style={{ marginTop: 30 }}>
              <ChromaGrid
                radius={300}
                items={students.map((st) => ({
                  image: st.photo || avatar(initials(st.name)),
                  title: st.name,
                  subtitle: st.role,
                  meta: st.institution !== "Morehouse College" ? st.institution : undefined,
                  borderColor: st.accent,
                  gradient: `linear-gradient(160deg, ${st.accent} 0%, #17181d 64%)`,
                  url: `/people/${st.slug}`,
                  seal: false,
                }))}
              />
            </div>
          </div>
        </section>
      )}

      {/* WORKSTREAMS */}
      <section className="block" id="workstreams" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="eyebrow">Contributions</div>
          <h2 className="h2">Workstreams.</h2>
          {i.workstreams.length > 0 ? (
            <div className="grid g3" style={{ marginTop: 30 }}>
              {i.workstreams.map((w) => (
                <div className="card" key={w}>
                  <div className="ws">
                    <div className="no" style={{ background: WS_META[w].color }}>{w}</div>
                    <div><h4>{WS_META[w].title}</h4><p>{WS_META[w].blurb}</p></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ marginTop: 30, padding: 32 }}>
              <p style={{ color: "var(--muted)", fontSize: 15.5 }}>
                Workstream contributions for {i.name} are being confirmed with the workstream leads. The five
                consortium workstreams are Foundational AI, Applied AI, AI Safety, AI Policy, and Dissemination.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="f"><div className="wrap"><div className="cols">
        <div><div className="brandline">REACH</div><p style={{ maxWidth: 300 }}>The Representation Evaluation + Cultural Heuristics GenAI Consortium. A peer-level Google Research and HBCU partnership.</p></div>
        <div><h5>Project</h5><a href="/#mission">North Star</a><a href="/#framework">Framework</a><a href="/#leaderboard">Leaderboard</a></div>
        <div><h5>Consortium</h5><a href="/collaborators">Collaborators</a><a href="/#consortium">Workstreams</a><a href="/#roadmap">Roadmap</a></div>
        <div><h5>This partner</h5><a href="#people">People</a><a href="#workstreams">Workstreams</a><a href="/collaborators">Back to all</a></div>
      </div><div className="bottom">© 2026 REACH GenAI Consortium · Google Research Impact Lab × HBCU Partners</div></div></footer>
    </main>
  );
}
