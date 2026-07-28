import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FlourishEmbed from "../../components/FlourishEmbed";
import { WorkshopMapLocal } from "../../components/LocalVisualizations";
import { mockInstitutions, mockWorkstreams, mockWorkshopMetrics } from "../../mockData";

export function generateStaticParams() {
  return mockInstitutions.map((inst) => ({ slug: inst.id }));
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

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-800 font-sans antialiased">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Profile card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-white border border-zinc-200/60 p-8 shadow-sm sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-2xl bg-maroon-primary text-white font-extrabold text-xl flex items-center justify-center border border-maroon-primary/20 mb-6">
                  {institution.logo}
                </div>
                <h1 className="text-2xl font-bold text-maroon-primary mb-1">{institution.name}</h1>
                <p className="text-zinc-500 text-sm mb-6">{institution.location}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {institution.workstreams.map((wId) => (
                    <span
                      key={wId}
                      className="px-3 py-1 bg-cream-primary text-maroon-primary rounded-full text-[10px] font-bold border border-maroon-primary/20"
                    >
                      {wId.toUpperCase()}
                    </span>
                  ))}
                </div>
                <Link
                  href="/#institutions"
                  className="text-xs font-bold text-maroon-primary hover:text-maroon-light transition-colors"
                >
                  &larr; Back to Directory
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats row */}
            <div className={`grid grid-cols-1 ${hostedWorkshop ? "sm:grid-cols-2" : ""} gap-4`}>
              <div className="bg-cream-primary rounded-2xl border border-zinc-200/40 p-6 text-center">
                <span className="text-maroon-primary font-bold text-3xl leading-tight">
                  {workstreams.length}
                </span>
                <p className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1">
                  {workstreams.length === 1 ? "Workstream" : "Workstreams"} Joined
                </p>
              </div>
              {hostedWorkshop && (
                <div className="bg-cream-primary rounded-2xl border border-zinc-200/40 p-6 text-center">
                  <span className="text-maroon-primary font-bold text-3xl leading-tight">
                    {hostedWorkshop.validatedQueries}
                  </span>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1">
                    Validated Queries ({hostedWorkshop.date})
                  </p>
                </div>
              )}
            </div>

            {/* Narrative */}
            <section className="bg-white rounded-3xl border border-zinc-200/60 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-maroon-primary mb-4">Research Narrative</h2>
              <p className="text-zinc-650 leading-relaxed">{institution.bio}</p>
            </section>

            {/* Workstream contributions */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-maroon-primary px-2">Workstream Contributions</h2>
              <div className="grid grid-cols-1 gap-4">
                {workstreams.map((ws) => (
                  <Link
                    key={ws.id}
                    href="/#workstreams"
                    className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200 block"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-maroon-primary text-white text-[9px] font-bold uppercase tracking-wider">
                        {ws.code}
                      </span>
                      <h3 className="font-bold text-maroon-primary text-sm">{ws.name}</h3>
                    </div>
                    <p className="text-xs text-zinc-650 leading-relaxed">{ws.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Consortium data */}
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
          </div>
        </div>
      </main>

      <Footer className="mt-16" />
    </div>
  );
}
