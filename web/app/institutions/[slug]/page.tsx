import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FlourishEmbed from "../../components/FlourishEmbed";
import { WorkshopMapLocal } from "../../components/LocalVisualizations";
import { mockInstitutions, mockWorkstreams, mockWorkshopMetrics, Institution } from "../../mockData";

export function generateStaticParams() {
  return mockInstitutions.map((inst) => ({ slug: inst.id }));
}

// Aliases used to match this institution against the free-text "(Institution)"
// tags in Workstream.coLeads / subgroups.leads, e.g. "Erick Kitenge (PVAMU)".
const institutionAliases: Record<string, string[]> = {
  morehouse: ["Morehouse College", "Morehouse"],
  spelman: ["Spelman College", "Spelman"],
  howard: ["Howard University", "Howard"],
  hampton: ["Hampton University", "Hampton"],
  "xavier-la": ["Xavier University of Louisiana", "Xavier"],
  "morgan-state": ["Morgan State University", "Morgan State", "MSU"],
  tuskegee: ["Tuskegee University", "Tuskegee"],
  "florida-am": ["Florida A&M University", "FAMU"],
  "nc-at": ["North Carolina A&T State University", "NC A&T", "NCAT"],
  pvamu: ["Prairie View A&M University", "Prairie View A&M", "PVAMU"],
  claflin: ["Claflin University", "Claflin"],
  fisk: ["Fisk University", "Fisk"],
};

function parenMatchesInstitution(parenContent: string, aliases: string[]): boolean {
  const normalized = parenContent.trim().toLowerCase();
  return aliases.some((alias) => {
    const a = alias.toLowerCase();
    return normalized === a || normalized.includes(a) || a.includes(normalized);
  });
}

interface WorkstreamLeader {
  name: string;
  role: string;
}

// Scans every "Name (Institution)" pair out of coLeads / subgroup leads text
// and keeps the ones whose parenthetical matches this institution. Using a
// global match rather than splitting on "&" or "-" means compound entries
// like "Erick Kitenge (PVAMU) & Kofi Nyarko (MSU) - Focus Area 3 (Protocol
// & Platform)" resolve correctly: each real "Name (Inst)" pair is found
// independently, and the trailing "Focus Area 3 (Protocol & Platform)"
// pseudo-match is harmlessly discarded because it matches no known alias.
function extractInstitutionLeaders(institution: Institution): WorkstreamLeader[] {
  const aliases = institutionAliases[institution.id] ?? [institution.name];
  const nameParenPattern = /([A-Z][^,()]*?)\s*\(([^)]+)\)/g;
  const leaders = new Map<string, WorkstreamLeader>();

  const scanText = (text: string, role: string) => {
    for (const match of text.matchAll(nameParenPattern)) {
      const name = match[1].trim();
      const paren = match[2].trim();
      if (!parenMatchesInstitution(paren, aliases)) continue;
      const key = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, "").toLowerCase();
      if (!leaders.has(key)) {
        leaders.set(key, { name, role });
      }
    }
  };

  for (const ws of mockWorkstreams) {
    for (const coLead of ws.coLeads) {
      scanText(coLead, `${ws.code} Co-Lead`);
    }
    if (ws.subgroups) {
      for (const subgroup of ws.subgroups) {
        scanText(subgroup.leads, `${subgroup.name} Lead`);
      }
    }
  }

  return Array.from(leaders.values());
}

function getInitials(name: string): string {
  const cleaned = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, "");
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export default async function InstitutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const institution = mockInstitutions.find((inst) => inst.id === slug);

  if (!institution) {
    notFound();
  }

  const workstreams = mockWorkstreams.filter((ws) =>
    institution.workstreams.includes(ws.id)
  );
  const hostedWorkshop = mockWorkshopMetrics.find(
    (w) => w.location === institution.location && w.audience.includes(institution.name)
  );
  const leaders = extractInstitutionLeaders(institution);

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-800 font-sans antialiased">
      <Navbar />

      {/* Hero */}
      <header className="relative bg-cream-primary border-b border-zinc-200/60 py-16 sm:py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 bg-maroon-primary/5 rounded-bl-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative">
          <Link
            href="/#institutions"
            className="text-xs font-bold text-maroon-primary hover:text-maroon-light transition-colors"
          >
            &larr; Back to Directory
          </Link>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold bg-maroon-primary/10 text-maroon-primary border border-maroon-primary/20 w-fit mb-4">
                REACH Consortium Partner
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-maroon-primary leading-tight">
                {institution.name}
              </h1>
              <p className="mt-3 text-zinc-600">{institution.location}</p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div
                className={`bg-white rounded-2xl border border-maroon-primary/20 shadow-sm p-6 sm:p-8 grid ${
                  hostedWorkshop ? "grid-cols-3" : "grid-cols-2"
                } gap-6 sm:gap-10 divide-x divide-zinc-100`}
              >
                <div className="text-center px-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-maroon-primary">
                    {workstreams.length}
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
                    {workstreams.length === 1 ? "Workstream" : "Workstreams"}
                  </div>
                </div>
                <div className="text-center px-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-maroon-primary">
                    {leaders.length}
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
                    {leaders.length === 1 ? "Named Leader" : "Named Leaders"}
                  </div>
                </div>
                {hostedWorkshop && (
                  <div className="text-center px-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-maroon-primary">
                      {hostedWorkshop.validatedQueries.replace(/\s*queries$/i, "")}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
                      Validated Queries
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Research Narrative */}
        <section>
          <h2 className="text-2xl font-bold text-maroon-primary mb-4">About {institution.name}</h2>
          <p className="text-zinc-650 leading-relaxed max-w-3xl">{institution.bio}</p>
        </section>

        {/* Core Disciplines */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-maroon-primary">Core Disciplines</h2>
            <div className="h-1 w-12 bg-maroon-primary mt-2 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workstreams.map((ws) => {
              const isLead = ws.leadInstitution.toLowerCase().includes(institution.name.toLowerCase());
              return (
                <div
                  key={ws.id}
                  className="bg-cream-primary/30 border border-zinc-200/40 rounded-2xl p-6 hover:border-maroon-primary/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-white border border-maroon-primary/20 flex items-center justify-center text-maroon-primary font-extrabold text-xs mb-5 shadow-sm">
                    {ws.code}
                  </div>
                  <h3 className="font-bold text-maroon-primary mb-2">{ws.name}</h3>
                  <p className="text-xs text-zinc-650 leading-relaxed mb-4">{ws.description}</p>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      isLead
                        ? "bg-maroon-primary text-white"
                        : "bg-white text-maroon-primary border border-zinc-200"
                    }`}
                  >
                    {isLead ? "Lead Institution" : "Contributing Institution"}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Workstream Leaders */}
        {leaders.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-maroon-primary">Workstream Leaders</h2>
              <p className="text-xs text-zinc-500 mt-1">
                Named co-leads and subgroup leads from {institution.name} across the consortium.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {leaders.map((leader) => (
                <div key={leader.name} className="text-center">
                  <div className="h-20 w-20 mx-auto rounded-full bg-maroon-primary text-white flex items-center justify-center text-lg font-bold border-2 border-maroon-primary/20 mb-3">
                    {getInitials(leader.name)}
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900">{leader.name}</h4>
                  <p className="text-[11px] text-maroon-primary">{leader.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Consortium Data */}
        <section className="bg-white rounded-3xl border border-zinc-200/60 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-maroon-primary mb-2">Consortium Data</h2>
          <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
            {hostedWorkshop
              ? `${institution.name} hosted a validation workshop on ${hostedWorkshop.date}, part of the consortium-wide query elicitation effort mapped below.`
              : `${institution.name} contributes to the consortium-wide validation effort mapped below.`}
          </p>
          <WorkshopMapLocal />

          <div className="mt-6">
            {institution.flourishId ? (
              <FlourishEmbed id={institution.flourishId} minHeight="400px" />
            ) : process.env.NODE_ENV !== "production" ? (
              <div className="p-4 bg-cream-primary rounded-xl border border-maroon-primary/20 text-left text-xs">
                <p className="font-bold text-maroon-primary flex items-center gap-1.5">
                  <span>💡</span> Flourish Integration Guide:
                </p>
                <p className="text-zinc-655 mt-1.5 leading-relaxed">
                  To add a live chart for {institution.name}: open{" "}
                  <code className="bg-white px-1.5 py-0.5 rounded border border-maroon-primary/20 font-mono text-[11px] text-maroon-primary">
                    web/app/mockData.ts
                  </code>
                  , find the institution with id{" "}
                  <code className="font-mono text-zinc-800">&quot;{institution.id}&quot;</code>, and set its{" "}
                  <code className="font-mono text-zinc-800">flourishId</code> to your live Flourish project ID.
                </p>
              </div>
            ) : null}
          </div>
        </section>

        {/* Milestones */}
        {hostedWorkshop && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-maroon-primary">Milestones</h2>
            </div>
            <div className="relative pl-8 border-l-2 border-zinc-100">
              <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-maroon-primary border-2 border-white shadow"></span>
              <span className="text-xs uppercase font-bold text-maroon-primary tracking-wider">
                {hostedWorkshop.date}
              </span>
              <h5 className="font-bold text-zinc-900 mt-1 mb-1">Hosted a REACH Validation Workshop</h5>
              <p className="text-sm text-zinc-650 leading-relaxed">
                {hostedWorkshop.audience} {hostedWorkshop.validatedQueries} scored above the validation
                threshold out of {hostedWorkshop.rawQueries} collected.
              </p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-3xl bg-maroon-primary p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-bl-full pointer-events-none"></div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Follow REACH&apos;s Progress</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            See how {institution.name} and the other 11 partner institutions are advancing culturally-aware
            AI research.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/news"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-maroon-primary font-bold text-sm hover:bg-zinc-50 transition-all"
            >
              View News &amp; Updates
            </Link>
            <Link
              href="/#institutions"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              Back to Directory
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
