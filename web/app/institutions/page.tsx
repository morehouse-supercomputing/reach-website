"use client";

import Link from "next/link";
import { INSTITUTIONS_DATA, RESEARCHERS_DATA } from "../../lib/data";

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

      {/* Hierarchy */}
      <main className="max-w-5xl mx-auto py-16 px-4 md:px-10">
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-6 top-2 bottom-2 w-px bg-outline-variant md:left-1/2" />

          <div className="flex flex-col gap-16">
            {INSTITUTIONS_DATA.map((institution, index) => {
              const people = RESEARCHERS_DATA.filter(
                (r) => r.institution === institution.name
              );
              const alignRight = index % 2 === 1;

              return (
                <div
                  key={institution.id}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    alignRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Node dot */}
                  <span
                    className={`absolute left-6 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-gradient-to-br ${institution.accentColor} ring-4 ring-background`}
                  />

                  {/* Card */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
                    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-300 p-6">
                      <div
                        className={`inline-block h-1.5 w-12 rounded-full bg-gradient-to-r ${institution.accentColor} mb-4`}
                      />
                      <h2 className="text-headline-md mb-1 text-on-surface">
                        {institution.name}
                      </h2>
                      <p className="text-label-xs text-outline mb-4">
                        {institution.city}, {institution.state} &middot; Founded {institution.founded}
                      </p>
                      <p className="text-body-md text-on-surface-variant mb-5">
                        {institution.history}
                      </p>

                      {people.length > 0 && (
                        <div className="pt-4 border-t border-outline-variant/40">
                          <p className="text-label-xs text-outline mb-3">
                            Contributors
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {people.map((person) => {
                              const initials = `${person.firstName[0]}${person.lastName[0]}`;
                              return (
                                <Link
                                  key={person.id}
                                  href="/researchers"
                                  title={`${person.firstName} ${person.lastName} — view directory`}
                                  className="group flex flex-col items-center gap-1.5"
                                >
                                  <div
                                    className={`h-12 w-12 rounded-xl overflow-hidden border-2 border-surface-container-lowest shadow-md flex items-center justify-center font-bold text-sm ${person.avatarColor} transition-transform duration-200 group-hover:scale-105`}
                                  >
                                    {initials}
                                  </div>
                                  <span className="text-[10px] text-on-surface-variant group-hover:text-primary transition-colors">
                                    {person.lastName}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for the other half on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
