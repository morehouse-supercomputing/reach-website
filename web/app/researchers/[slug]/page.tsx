import { notFound } from "next/navigation";
import Link from "next/link";
import { RESEARCHERS_DATA, researcherSlug, researcherBySlug } from "../../../lib/data";
import ResearcherProfile from "../../../components/ResearcherProfile";

export function generateStaticParams() {
  return RESEARCHERS_DATA.map((r) => ({ slug: researcherSlug(r) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = researcherBySlug(slug);
  return { title: r ? `${r.firstName} ${r.lastName} · REACH GenAI Consortium` : "Researcher · REACH" };
}

export default async function ResearcherPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const researcher = researcherBySlug(slug);
  if (!researcher) notFound();

  return (
    <main style={{ minHeight: "calc(100vh - 70px)", background: "var(--bg)" }}>
      <div className="wrap" style={{ paddingTop: 24 }}>
        <Link className="btn out sm" href="/researchers">
          ← All researchers
        </Link>
      </div>
      <ResearcherProfile researcher={researcher} />
    </main>
  );
}
