"use client";

/**
 * ARCHIVED — solar-system institutions layout. Shelved based on team feedback that
 * it wasn't the right fit for the institutions page, but kept intact here in case
 * it's worth revisiting. Not imported anywhere currently.
 *
 * To bring back: import from "../../components/archive/InstitutionOrbits" in
 * app/institutions/page.tsx.
 */

import type { Institution } from "../../lib/data";
import LogoImage from "../LogoImage";

// Swap in a real project mark whenever we get one; falls back to a "REACH" wordmark until then.
const PROJECT_LOGO = "/logos/reach.png";

const MIN_RING_DIAMETER_PCT = 38;
const MAX_RING_DIAMETER_PCT = 100;
const SUN_DIAMETER_PCT = 16;
const PLANET_DIAMETER_PCT = 13;

function ringDiameterPct(index: number, count: number) {
  if (count <= 1) return MAX_RING_DIAMETER_PCT;
  const step = (MAX_RING_DIAMETER_PCT - MIN_RING_DIAMETER_PCT) / (count - 1);
  return MIN_RING_DIAMETER_PCT + index * step;
}

function planetPosition(index: number, count: number) {
  const angleDeg = -90 + index * (360 / count);
  const angleRad = (angleDeg * Math.PI) / 180;
  const radiusPct = ringDiameterPct(index, count) / 2;
  return {
    left: `${50 + radiusPct * Math.cos(angleRad)}%`,
    top: `${50 + radiusPct * Math.sin(angleRad)}%`,
  };
}

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Planet({
  institution,
  index,
  count,
}: {
  institution: Institution;
  index: number;
  count: number;
}) {
  const position = planetPosition(index, count);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ left: position.left, top: position.top, width: `${PLANET_DIAMETER_PCT}%` }}
    >
      <div
        className={`group relative aspect-square w-full rounded-full border-[2.5px] border-surface-container-lowest bg-gradient-to-br ${institution.accentColor} shadow-elevation-1 flex items-center justify-center overflow-hidden cursor-default transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.6] hover:shadow-elevation-2 hover:z-20`}
      >
        <LogoImage
          src={institution.logo}
          alt={`${institution.name} logo`}
          className="h-full w-full object-contain bg-surface-container-lowest p-[7.5px] grayscale"
          fallback={
            <span className="font-bold text-on-primary text-[15px] leading-[20px]">
              {initialsFor(institution.name)}
            </span>
          }
        />
      </div>
      <span className="mt-2.5 max-w-[7.5rem] text-center text-[12.5px] leading-tight text-on-surface-variant transition-colors group-hover:text-on-surface">
        {institution.name}
      </span>
    </div>
  );
}

export default function InstitutionOrbits({ institutions }: { institutions: Institution[] }) {
  const count = institutions.length;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="relative mx-auto aspect-square w-full" style={{ maxWidth: 700 }}>
        {/* Dashed orbit rings, one per institution */}
        {institutions.map((institution, index) => {
          const diameter = ringDiameterPct(index, count);
          return (
            <div
              key={institution.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-outline-variant/70"
              style={{ width: `${diameter}%`, height: `${diameter}%` }}
            />
          );
        })}

        {/* Sun — stands in for the REACH project until a logo mark exists */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: `${SUN_DIAMETER_PCT}%` }}
        >
          <div className="absolute inset-0 -m-[15px] rounded-full bg-primary/25 blur-xl animate-pulse" />
          <div className="relative aspect-square w-full rounded-full bg-gradient-to-br from-primary to-tertiary shadow-elevation-2 ring-[5px] ring-surface flex items-center justify-center overflow-hidden">
            <LogoImage
              src={PROJECT_LOGO}
              alt="REACH Consortium"
              className="h-full w-full object-contain p-[15px]"
              fallback={
                <span className="font-bold tracking-wide text-on-primary text-[17.5px] leading-[25px]">
                  REACH
                </span>
              }
            />
          </div>
        </div>

        {/* Institution planets */}
        {institutions.map((institution, index) => (
          <Planet key={institution.id} institution={institution} index={index} count={count} />
        ))}
      </div>

      <p className="mt-6 text-center text-label-xs text-outline">
        Hover a planet to preview a partner institution
      </p>
    </div>
  );
}
