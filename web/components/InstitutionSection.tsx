import Link from "next/link";
import type { Institution, Researcher } from "../lib/data";
import { researcherSlug } from "../lib/data";
import LogoImage from "./LogoImage";

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function researcherName(r: Researcher) {
  return `${r.prefix ? r.prefix + " " : ""}${r.firstName} ${r.lastName}`;
}

function InstitutionLogo({ institution, sizeClass }: { institution: Institution; sizeClass: string }) {
  return (
    <div
      className={`rounded-full bg-white/95 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden ${sizeClass}`}
    >
      <LogoImage
        src={institution.logo}
        alt={`${institution.name} seal`}
        className="h-full w-full object-contain p-3"
        fallback={<span className="text-2xl font-bold text-on-surface">{initialsFor(institution.name)}</span>}
      />
    </div>
  );
}

function ResearcherHeadshot({ researcher }: { researcher: Researcher }) {
  return (
    <Link href={`/researchers/${researcherSlug(researcher)}`} className="group flex flex-col items-center gap-3 text-center">
      <div
        className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-bold text-xl ring-2 ring-white/50 transition-all duration-200 group-hover:ring-white group-hover:scale-105 ${researcher.avatarColor}`}
      >
        {researcher.firstName[0]}
        {researcher.lastName[0]}
      </div>
      <span className="max-w-[9.5rem] text-sm font-medium leading-tight text-white/95 transition-colors group-hover:text-white">
        {researcherName(researcher)}
      </span>
    </Link>
  );
}

/**
 * One HBCU partner's "stop" on the institutions page: name, seal, a short bio,
 * and their researchers, all set against a gradient of the school's own colors.
 * Self-contained and data-driven so the page can stack one of these per
 * institution — the eventual scroll-linked gradient/cross-fade between
 * sections will wrap around this same component.
 */
export default function InstitutionSection({ institution, researchers }: { institution: Institution; researchers: Researcher[] }) {
  return (
    <section
      id={institution.id}
      className={`relative flex min-h-screen w-full scroll-mt-16 flex-col justify-center overflow-hidden bg-gradient-to-br px-6 py-20 md:px-12 ${institution.accentColor}`}
    >
      {/* Desktop / tablet: seal, name, bio, then the full researcher grid */}
      <div className="hidden md:block">
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
          <InstitutionLogo institution={institution} sizeClass="w-32 h-32 mb-6" />
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl">{institution.name}</h1>
          <p className="mb-6 text-sm font-medium text-white/80">
            {institution.city}, {institution.state} · Est. {institution.founded}
          </p>
          <p className="text-base leading-relaxed text-white/90">{institution.history}</p>
        </div>

        {researchers.length > 0 ? (
          <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-x-6 gap-y-12 lg:grid-cols-5">
            {researchers.map((r) => (
              <ResearcherHeadshot key={r.id} researcher={r} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-white/70">Researcher roster coming soon.</p>
        )}
      </div>

      {/* Mobile: seal + gradient only, researchers collapse to a plain link list */}
      <div className="flex flex-col items-center text-center md:hidden">
        <InstitutionLogo institution={institution} sizeClass="w-24 h-24 mb-4" />
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">{institution.name}</h1>
        {researchers.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {researchers.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/researchers/${researcherSlug(r)}`}
                  className="inst-link font-medium underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {researcherName(r)}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-white/70">Researcher roster coming soon.</p>
        )}
      </div>
    </section>
  );
}
