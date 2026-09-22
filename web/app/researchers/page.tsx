"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RESEARCHERS_DATA, INSTITUTION_NAMES, WORKSTREAMS, researcherSlug, researcherPhotoUrl } from "../../lib/data";
import LogoImage from "../../components/LogoImage";

const INSTITUTIONS = ["All Institutions", ...INSTITUTION_NAMES];
const WORKSTREAM_OPTIONS = ["All Workstreams", ...WORKSTREAMS];

function ResearchersGridContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedInstitution, setSelectedInstitution] = useState("All Institutions");
  const [selectedWorkstream, setSelectedWorkstream] = useState("All Workstreams");
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "institution">("name-asc");

  // Client-side filtering logic
  const filteredResearchers = useMemo(() => {
    return RESEARCHERS_DATA.filter((researcher) => {
      const fullName = `${researcher.firstName} ${researcher.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        researcher.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        researcher.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesInstitution =
        selectedInstitution === "All Institutions" ||
        researcher.institution === selectedInstitution;

      const matchesWorkstream =
        selectedWorkstream === "All Workstreams" ||
        researcher.workstream === selectedWorkstream;

      return matchesSearch && matchesInstitution && matchesWorkstream;
    }).sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortBy === "name-desc") {
        return b.lastName.localeCompare(a.lastName);
      } else {
        return a.institution.localeCompare(b.institution);
      }
    });
  }, [searchQuery, selectedInstitution, selectedWorkstream, sortBy]);

  return (
    <div className="min-h-screen bg-background text-on-background transition-colors duration-300">
      {/* Header section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-surface-container/60 to-transparent py-16 px-4 md:px-10 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-headline-md bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4">
            REACH Consortium Researchers
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Meet the scholars, principal investigators, and student contributors pioneering AI innovation, safety, and policy across the 12 partner HBCUs.
          </p>
        </div>
      </header>

      {/* Main body */}
      <main className="max-w-7xl mx-auto py-12 px-4 md:px-10">

        {/* Filters and Search Bar */}
        <section className="bg-surface-container-lowest/80 backdrop-blur-[16px] rounded-2xl p-6 border border-outline-variant/60 shadow-elevation-1 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3 relative">
            <input
              type="text"
              placeholder="Search by name, role, bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/25 transition-all placeholder:text-outline text-sm"
            />
            <svg
              className="absolute left-3.5 top-3.5 h-4 w-4 text-outline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="w-full md:w-auto flex flex-wrap gap-3 items-center justify-start md:justify-end">
            {/* Institution Filter */}
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/25 text-sm cursor-pointer"
            >
              {INSTITUTIONS.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>

            {/* Workstream Filter */}
            <select
              value={selectedWorkstream}
              onChange={(e) => setSelectedWorkstream(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/25 text-sm cursor-pointer"
            >
              {WORKSTREAM_OPTIONS.map((ws) => (
                <option key={ws} value={ws}>
                  {ws}
                </option>
              ))}
            </select>

            {/* Sort Toggle */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/25 text-sm cursor-pointer"
            >
              <option value="name-asc">Sort: A-Z (Last Name)</option>
              <option value="name-desc">Sort: Z-A (Last Name)</option>
              <option value="institution">Sort: Institution</option>
            </select>
          </div>
        </section>

        {/* Grid Display */}
        {filteredResearchers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredResearchers.map((researcher) => {
              const initials = `${researcher.firstName[0]}${researcher.lastName[0]}`;
              return (
                <article
                  key={researcher.id}
                  onClick={() => router.push(`/researchers/${researcherSlug(researcher)}`)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") router.push(`/researchers/${researcherSlug(researcher)}`);
                  }}
                  className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/60 hover:border-primary shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {/* Decorative Gradient Header Card */}
                  <div className="h-24 bg-gradient-to-r from-surface-container to-surface-container-high relative">
                    <span className="absolute top-4 right-4 text-label-xs px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container">
                      {researcher.workstream.split(":")[0]}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="px-6 pb-6 flex-1 flex flex-col relative">
                    {/* Headshot / Initials Bubble */}
                    <div className="relative -mt-12 mb-4 w-20 h-20 rounded-2xl overflow-hidden border-4 border-surface-container-lowest shadow-md">
                      <LogoImage
                        src={researcherPhotoUrl(researcher)}
                        alt={`${researcher.firstName} ${researcher.lastName}`}
                        className="w-full h-full object-cover"
                        fallback={
                          <div className={`w-full h-full flex items-center justify-center font-bold text-xl ${researcher.avatarColor}`}>
                            {initials}
                          </div>
                        }
                      />
                    </div>

                    <h2 className="text-headline-md mb-1 text-on-surface">
                      {researcher.prefix && `${researcher.prefix} `}
                      {researcher.firstName} {researcher.lastName}
                    </h2>

                    <p className="text-label-sm uppercase tracking-wider text-tertiary mb-2">
                      {researcher.role}
                    </p>

                    <p className="text-sm font-medium text-on-surface-variant mb-2">
                      {researcher.institution}
                    </p>

                    <p className="text-sm text-on-surface-variant line-clamp-3 mb-6">
                      {researcher.bio}
                    </p>

                    {/* Footer Contact Details */}
                    <div className="mt-auto pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs text-outline">
                      <a
                        href={`mailto:${researcher.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </a>
                      {researcher.linkedin && (
                        <a
                          href={researcher.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/60">
            <svg
              className="mx-auto h-12 w-12 text-outline mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-1 text-on-surface">No researchers found</h3>
            <p className="text-on-surface-variant text-sm">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ResearchersGrid() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-on-surface-variant">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 w-48 bg-surface-container rounded-lg mb-4" />
            <div className="h-4 w-64 bg-surface-container-low rounded-lg" />
          </div>
        </div>
      }
    >
      <ResearchersGridContent />
    </Suspense>
  );
}
