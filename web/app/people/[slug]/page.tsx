import { notFound } from "next/navigation";
import { allPeople, personBySlug, institutionByName } from "../../collaborators/data";
import PersonProfile from "../../../components/PersonProfile";

export function generateStaticParams() {
  return allPeople.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = personBySlug(slug);
  return { title: p ? `${p.name} · REACH GenAI Consortium` : "Person · REACH" };
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = personBySlug(slug);
  if (!p) notFound();
  const home = institutionByName(p.institution);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav className="nav">
        <div className="wrap row">
          <a className="logo" href="/"><span className="mk" />REACH</a>
          <div className="links">
            <a href="/#mission">Mission</a><a href="/#leaderboard">Leaderboard</a><a href="/collaborators">Collaborators</a>
          </div>
          <div className="right">
            {home ? (
              <a className="btn out sm" href={`/collaborators/${home.slug}`}>Back to {home.abbr}</a>
            ) : (
              <a className="btn out sm" href="/collaborators">All collaborators</a>
            )}
          </div>
        </div>
      </nav>
      <PersonProfile person={p} />
    </main>
  );
}
