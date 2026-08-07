"use client";

import { INSTITUTIONS_DATA, type Institution } from "../../lib/data";
import LogoImage from "../../components/LogoImage";

// Placeholder copy until real institution bios are written.
const FEATURE_BIO =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const STANDARD_BIOS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
];

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function InstitutionCard({ institution, index }: { institution: Institution; index: number }) {
  // Every 4th tile is the "feature" tile in the bento rhythm.
  const isFeature = index % 4 === 0;
  const bio = isFeature ? FEATURE_BIO : STANDARD_BIOS[index % STANDARD_BIOS.length];

  return (
    <article
      className={`group relative flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/60 hover:border-primary shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 hover:-translate-y-0.5 ${
        isFeature ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      {/* Header band in the school's own colors */}
      <div
        className={`relative bg-gradient-to-br ${institution.accentColor} ${
          isFeature ? "h-32 lg:h-40" : "h-20"
        }`}
      >
        <span className="absolute top-4 right-4 text-label-xs px-2.5 py-1 rounded-full bg-black/20 text-white backdrop-blur-sm">
          Est. {institution.founded}
        </span>
      </div>

      <div className="px-6 pb-6 flex-1 flex flex-col relative">
        {/* Logo bubble */}
        <div
          className={`relative -mt-10 mb-4 rounded-2xl overflow-hidden border-4 border-surface-container-lowest shadow-md bg-surface-container-lowest ${
            isFeature ? "w-24 h-24 -mt-12" : "w-16 h-16"
          }`}
        >
          <LogoImage
            src={institution.logo}
            alt={`${institution.name} logo`}
            className="h-full w-full object-contain p-2"
            fallback={
              <div
                className={`h-full w-full flex items-center justify-center font-bold text-white bg-gradient-to-br ${institution.accentColor} ${
                  isFeature ? "text-2xl" : "text-base"
                }`}
              >
                {initialsFor(institution.name)}
              </div>
            }
          />
        </div>

        <h2 className={`text-on-surface mb-1 ${isFeature ? "text-headline-md" : "text-base font-semibold"}`}>
          {institution.name}
        </h2>
        <p className="text-label-xs text-outline mb-3">
          {institution.city}, {institution.state}
        </p>
        <p className={`text-sm text-on-surface-variant ${isFeature ? "" : "line-clamp-3"}`}>
          {bio}
        </p>
      </div>
    </article>
  );
}

export default function InstitutionsPage() {
  return (
    <div className="min-h-screen bg-background text-on-background transition-colors duration-300">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-b from-surface-container/60 to-transparent py-16 px-4 md:px-10 border-b border-outline-variant/60">
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-headline-md bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4">
            Partner Institutions
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            The HBCU partners driving the REACH consortium, and the scholars representing them.
          </p>
        </div>
      </header>

      {/* Bento grid */}
      <main className="max-w-7xl mx-auto py-16 px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(260px,auto)] grid-flow-row-dense gap-6">
          {INSTITUTIONS_DATA.map((institution, index) => (
            <InstitutionCard key={institution.id} institution={institution} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
