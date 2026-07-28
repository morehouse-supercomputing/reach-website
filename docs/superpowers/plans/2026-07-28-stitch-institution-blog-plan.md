# Institution Profile Pages & Blog Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a real-data institution detail page per HBCU partner and visually upgrade the `/news` feed, adapting the Stitch `reach_premium` mockup's layout ideas into the site's existing maroon/cream brand — no fabricated content.

**Architecture:** Plain Next.js App Router pages/components matching the existing style exactly: relative imports, inline Tailwind utility classes, `"use client"` only on components that use hooks. The new institution page is a Server Component (enables `generateStaticParams`) that composes existing client components (`Navbar`, `FlourishEmbed`, `WorkshopMapLocal`) plus one new shared `Footer`.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript (strict), Tailwind CSS v4. No new dependencies.

## Global Constraints

- Follow the spec exactly: `docs/superpowers/specs/2026-07-28-stitch-institution-blog-design.md`.
- No fabricated data — every number/fact shown must trace to an existing field in `web/app/mockData.ts`.
- Use only the existing theme tokens already defined in `web/app/globals.css` (`maroon-primary`, `maroon-light`, `cream-primary`, etc.) — no new colors.
- Use relative imports (`"./components/X"`, `"../mockData"`), matching every existing file in `web/app` — do not introduce the `@/*` alias even though it's configured in `tsconfig.json`.
- No new npm dependencies.
- No automated test suite exists in this project and none is introduced here. Verification is `npm run build` (type-checks + statically generates all routes) plus manual checks in `npm run dev`, per the spec's testing plan.
- Every task's code changes are committed on the current branch (`marketing/comms`) before moving to the next task.

---

### Task 1: Extract shared `Footer` component

**Files:**
- Create: `web/app/components/Footer.tsx`
- Modify: `web/app/page.tsx:451-464` (footer block), `web/app/page.tsx` imports (~line 6-7)
- Modify: `web/app/news/page.tsx:232-245` (footer block), `web/app/news/page.tsx` imports (~line 4)

**Interfaces:**
- Produces: `Footer` — default export, `(props: { className?: string }) => JSX.Element`, from `web/app/components/Footer.tsx`. Tasks 4 and 5 both import and render this.

- [ ] **Step 1: Create the `Footer` component**

Create `web/app/components/Footer.tsx`:

```tsx
interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-maroon-primary flex items-center justify-center text-white font-bold border border-white/20 text-sm shadow-md">
            R
          </span>
          <span className="font-semibold text-lg text-white">REACH Consortium</span>
        </div>
        <p className="text-sm">
          &copy; 2026 REACH Consortium. All rights reserved. In partnership with Google.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Wire `Footer` into `web/app/page.tsx`**

Add the import next to the other component imports:

```tsx
import Navbar from "./components/Navbar";
import FlourishEmbed from "./components/FlourishEmbed";
```
becomes:
```tsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FlourishEmbed from "./components/FlourishEmbed";
```

Replace the inline footer block:

```tsx
      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-maroon-primary flex items-center justify-center text-white font-bold border border-white/25 text-sm shadow-md">
              R
            </span>
            <span className="font-semibold text-lg text-white">REACH Consortium</span>
          </div>
          <p className="text-sm">
            &copy; 2026 REACH Consortium. All rights reserved. In partnership with Google.
          </p>
        </div>
      </footer>
```

with:

```tsx
      <Footer />
```

- [ ] **Step 3: Wire `Footer` into `web/app/news/page.tsx`**

Add the import:

```tsx
import Navbar from "../components/Navbar";
```
becomes:
```tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
```

Replace the inline footer block:

```tsx
      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-maroon-primary flex items-center justify-center text-white font-bold border border-white/20 text-sm shadow-md">
              R
            </span>
            <span className="font-semibold text-lg text-white">REACH Consortium</span>
          </div>
          <p className="text-sm">
            &copy; 2026 REACH Consortium. All rights reserved. In partnership with Google.
          </p>
        </div>
      </footer>
```

with:

```tsx
      <Footer className="mt-16" />
```

- [ ] **Step 4: Verify the build**

Run: `cd "/Users/newman/google reach/web" && npm run build`
Expected: build succeeds with no TypeScript or lint errors. (This also confirms no visual/behavioral regression, since the extracted markup is byte-identical to what it replaced, aside from the one pre-existing `border-white/25` vs `border-white/20` inconsistency now unified to `/20`.)

- [ ] **Step 5: Manual visual check**

Run: `cd "/Users/newman/google reach/web" && npm run dev`
Open `http://localhost:3000` and `http://localhost:3000/news` — confirm both footers render identically to before (REACH Consortium badge + copyright line).

- [ ] **Step 6: Commit**

```bash
cd "/Users/newman/google reach"
git add web/app/components/Footer.tsx web/app/page.tsx web/app/news/page.tsx
git commit -m "Extract shared Footer component"
```

---

### Task 2: Extend data model for institution charts and news visualizations

**Files:**
- Modify: `web/app/mockData.ts:1-8` (`Institution` interface), `web/app/mockData.ts:29-36` (`NewsItem` interface), `web/app/mockData.ts:239-264` (`mockNews` array)

**Interfaces:**
- Produces: `Institution.flourishId?: string`, `NewsItem.localViz?: "workshopMap" | "survey" | "funding" | "matrix"`. Task 4 reads `Institution.flourishId`. Task 5 reads `NewsItem.localViz`.

- [ ] **Step 1: Add `flourishId` to the `Institution` interface**

```ts
export interface Institution {
  id: string;
  name: string;
  location: string;
  logo: string;
  bio: string;
  workstreams: string[];
}
```
becomes:
```ts
export interface Institution {
  id: string;
  name: string;
  location: string;
  logo: string;
  bio: string;
  workstreams: string[];
  flourishId?: string; // live Flourish chart id; when unset, the institution page shows a placeholder guide
}
```

- [ ] **Step 2: Add `localViz` to the `NewsItem` interface**

```ts
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: 'Press Release' | 'Consortium News' | 'Media Asset';
  content: string;
}
```
becomes:
```ts
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: 'Press Release' | 'Consortium News' | 'Media Asset';
  content: string;
  localViz?: "workshopMap" | "survey" | "funding" | "matrix"; // renders the matching LocalVisualizations chart in the detail modal
}
```

- [ ] **Step 3: Set `localViz` on the two matching news items**

```ts
  {
    id: "news-1",
    title: "REACH Consortium Launches Student Funding Pipeline",
    date: "June 2026",
    excerpt: "WS5 announces the disbursement of $50,000 to each of the 12 partner universities, creating over 100 student research opportunities.",
    category: "Press Release",
    content: "To support the talent pipeline, Workstream 5 has established a $600,000 collective student research budget. Each of the 12 universities receives $50,000 to pay student researchers a standardized stipend of $25 per hour (assuming 200 hours over a 10-week summer window). The initial call generated 33 project submissions, supporting fully remote participation and cross-institutional collaboration."
  },
  {
    id: "news-2",
    title: "Consortium Finalizes Query Elicitation phase",
    date: "July 2026",
    excerpt: "With the conclusion of the Taos County rural workshop, the consortium has gathered over 1,800 total raw queries for analysis.",
    category: "Consortium News",
    content: "The Data Collection & Curation team (WS2) completed its sequence of in-person community validation workshops. Across D.C., Los Angeles, Baltimore, Tuskegee, Chicago, and Taos County, everyday users and domain experts drafted query chains using the 'Query Layering Method'. Over 1,052 queries scored above the 1.7 threshold and have been formatted into the training corpus."
  },
```
becomes:
```ts
  {
    id: "news-1",
    title: "REACH Consortium Launches Student Funding Pipeline",
    date: "June 2026",
    excerpt: "WS5 announces the disbursement of $50,000 to each of the 12 partner universities, creating over 100 student research opportunities.",
    category: "Press Release",
    content: "To support the talent pipeline, Workstream 5 has established a $600,000 collective student research budget. Each of the 12 universities receives $50,000 to pay student researchers a standardized stipend of $25 per hour (assuming 200 hours over a 10-week summer window). The initial call generated 33 project submissions, supporting fully remote participation and cross-institutional collaboration.",
    localViz: "funding"
  },
  {
    id: "news-2",
    title: "Consortium Finalizes Query Elicitation phase",
    date: "July 2026",
    excerpt: "With the conclusion of the Taos County rural workshop, the consortium has gathered over 1,800 total raw queries for analysis.",
    category: "Consortium News",
    content: "The Data Collection & Curation team (WS2) completed its sequence of in-person community validation workshops. Across D.C., Los Angeles, Baltimore, Tuskegee, Chicago, and Taos County, everyday users and domain experts drafted query chains using the 'Query Layering Method'. Over 1,052 queries scored above the 1.7 threshold and have been formatted into the training corpus.",
    localViz: "workshopMap"
  },
```

Leave `news-3` unchanged (no `localViz` field).

- [ ] **Step 4: Verify the build**

Run: `cd "/Users/newman/google reach/web" && npm run build`
Expected: succeeds — these are additive optional fields, so no existing code that constructs an `Institution` or `NewsItem` object breaks.

- [ ] **Step 5: Commit**

```bash
cd "/Users/newman/google reach"
git add web/app/mockData.ts
git commit -m "Add optional flourishId and localViz fields to data model"
```

---

### Task 3: Link homepage institution cards to detail pages

**Files:**
- Modify: `web/app/page.tsx:151-175` (institution grid card)

**Interfaces:**
- Consumes: route `/institutions/[slug]` (produced by Task 4). This task can be completed and committed before Task 4 exists — Next.js does not validate link targets at build time, and the route will exist once Task 4 lands later in this same plan.

- [ ] **Step 1: Wrap each institution card in a `Link`**

```tsx
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockInstitutions.map((inst) => (
                <div key={inst.id} className="p-5 rounded-2xl bg-cream-primary/30 hover:bg-cream-primary/70 border border-zinc-200/40 hover:border-maroon-primary/20 transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-lg bg-maroon-primary text-white font-extrabold text-xs flex items-center justify-center border border-maroon-primary/20">
                        {inst.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-sm">{inst.name}</h4>
                        <p className="text-[10px] text-zinc-500">{inst.location}</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-650 leading-relaxed mb-4">
                      {inst.bio}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {inst.workstreams.map((wId) => (
                      <span key={wId} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white text-maroon-primary border border-zinc-200">
                        {wId.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
```
becomes:
```tsx
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockInstitutions.map((inst) => (
                <Link
                  key={inst.id}
                  href={`/institutions/${inst.id}`}
                  className="p-5 rounded-2xl bg-cream-primary/30 hover:bg-cream-primary/70 border border-zinc-200/40 hover:border-maroon-primary/20 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-lg bg-maroon-primary text-white font-extrabold text-xs flex items-center justify-center border border-maroon-primary/20">
                        {inst.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-sm">{inst.name}</h4>
                        <p className="text-[10px] text-zinc-500">{inst.location}</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-650 leading-relaxed mb-4">
                      {inst.bio}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {inst.workstreams.map((wId) => (
                      <span key={wId} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white text-maroon-primary border border-zinc-200">
                        {wId.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
```

`Link` is already imported in this file (`import Link from "next/link";`) — no import change needed.

- [ ] **Step 2: Verify the build**

Run: `cd "/Users/newman/google reach/web" && npm run build`
Expected: succeeds. The `/institutions/[id]` targets will 404 until Task 4 lands — that's expected at this point in the plan.

- [ ] **Step 3: Commit**

```bash
cd "/Users/newman/google reach"
git add web/app/page.tsx
git commit -m "Link homepage institution cards to detail pages"
```

---

### Task 4: Build the institution detail page

**Files:**
- Create: `web/app/institutions/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Footer` (Task 1), `Institution.flourishId` / `NewsItem` unused here (Task 2), `mockInstitutions`, `mockWorkstreams`, `mockWorkshopMetrics` from `../../mockData`, `WorkshopMapLocal` from `../../components/LocalVisualizations`, `FlourishEmbed` from `../../components/FlourishEmbed`, `Navbar` from `../../components/Navbar`.
- Produces: route `/institutions/[slug]`, statically generated for all 12 institution ids.

- [ ] **Step 1: Create the directory and page file**

Run: `mkdir -p "/Users/newman/google reach/web/app/institutions/[slug]"`

Create `web/app/institutions/[slug]/page.tsx`:

```tsx
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
    (w) => w.location === institution.location
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
                ) : (
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
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer className="mt-16" />
    </div>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `cd "/Users/newman/google reach/web" && npm run build`
Expected: succeeds, and the build output lists 12 statically generated `/institutions/<id>` routes (one per entry in `mockInstitutions`).

- [ ] **Step 3: Manual visual check**

Run: `cd "/Users/newman/google reach/web" && npm run dev`

- Open `http://localhost:3000` and click the Morgan State University card (or navigate directly to `http://localhost:3000/institutions/morgan-state`). Confirm: profile card shows name/location/logo/workstream badges; stats row shows a workstream count AND a "Hosted a Validation Workshop" card with real numbers from the Baltimore, MD workshop row; narrative shows the real bio; workstream contribution cards list WS1/WS2/WS3 with real descriptions; the workshop map renders; the Flourish placeholder guide note renders (since `flourishId` is unset).
- Navigate to `http://localhost:3000/institutions/spelman` — confirm the stats row shows only the workstream-count card (no hosted-workshop card, since Atlanta, GA has no matching workshop row).
- Navigate to `http://localhost:3000/institutions/does-not-exist` — confirm Next's 404 page renders (via `notFound()`).

- [ ] **Step 4: Commit**

```bash
cd "/Users/newman/google reach"
git add "web/app/institutions"
git commit -m "Add institution detail page"
```

---

### Task 5: Restyle the `/news` feed and embed data visualizations in the modal

**Files:**
- Modify: `web/app/news/page.tsx` imports (~line 3-5), `web/app/news/page.tsx:96-127` (news list), `web/app/news/page.tsx:207-230` (modal)

**Interfaces:**
- Consumes: `WorkshopMapLocal`, `SurveyFindingsLocal`, `StudentFundingLocal`, `EvaluationGridLocal` from `../components/LocalVisualizations` (all pre-existing, no-prop components — same import already used in `web/app/page.tsx`). `NewsItem.localViz` (Task 2).

- [ ] **Step 1: Import the local visualization components**

```tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockNews, NewsItem } from "../mockData";
```
becomes:
```tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  WorkshopMapLocal,
  SurveyFindingsLocal,
  StudentFundingLocal,
  EvaluationGridLocal,
} from "../components/LocalVisualizations";
import { mockNews, NewsItem } from "../mockData";
```

(`Footer` import from Task 1 is already present — this step adds the `LocalVisualizations` import above it in the same block.)

- [ ] **Step 2: Replace the flat news list with a featured hero + grid**

```tsx
            {/* News list */}
            <div className="space-y-6">
              {filteredNews.map((item) => (
                <article 
                  key={item.id}
                  className="rounded-2xl bg-white border border-zinc-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-maroon-primary/5 text-maroon-primary border border-maroon-primary/10">
                        {item.category}
                      </span>
                      <time className="text-xs text-zinc-400 font-medium">{item.date}</time>
                    </div>
                    <h3 className="text-xl font-bold text-maroon-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setSelectedNews(item)}
                    className="text-xs font-bold text-maroon-primary hover:text-maroon-light transition-colors self-start flex items-center gap-1"
                  >
                    Read Full Details
                    <span>&rarr;</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
```
becomes:
```tsx
            {/* News list: featured hero + grid */}
            {filteredNews.length > 0 && (
              <>
                <button
                  onClick={() => setSelectedNews(filteredNews[0])}
                  className="w-full text-left rounded-3xl bg-maroon-primary p-8 sm:p-10 shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-bl-full pointer-events-none"></div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-white border border-white/20">
                      Featured &middot; {filteredNews[0].category}
                    </span>
                    <time className="text-xs text-white/70 font-medium">{filteredNews[0].date}</time>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                    {filteredNews[0].title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-2xl mb-4">
                    {filteredNews[0].excerpt}
                  </p>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    Read Full Details
                    <span>&rarr;</span>
                  </span>
                </button>

                {filteredNews.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNews.slice(1).map((item) => (
                      <article
                        key={item.id}
                        className="rounded-2xl bg-white border border-zinc-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-maroon-primary/5 text-maroon-primary border border-maroon-primary/10">
                              {item.category}
                            </span>
                            <time className="text-xs text-zinc-400 font-medium">{item.date}</time>
                          </div>
                          <h3 className="text-xl font-bold text-maroon-primary mb-2">
                            {item.title}
                          </h3>
                          <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                            {item.excerpt}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedNews(item)}
                          className="text-xs font-bold text-maroon-primary hover:text-maroon-light transition-colors self-start flex items-center gap-1"
                        >
                          Read Full Details
                          <span>&rarr;</span>
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
```

Note: `filteredNews[0]` is only accessed inside the `filteredNews.length > 0 &&` guard, so it's always defined there.

- [ ] **Step 3: Render the matching chart in the modal, and widen the modal to fit it**

```tsx
      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-2xl bg-white border border-zinc-200/60 max-w-2xl w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-xl font-bold"
            >
              &times;
            </button>
            <div className="flex gap-2 items-center mb-4">
              <span className="px-2.5 py-0.5 rounded bg-maroon-primary text-white text-[10px] font-bold">
                {selectedNews.category}
              </span>
              <span className="text-xs text-zinc-400">{selectedNews.date}</span>
            </div>
            <h3 className="text-2xl font-black text-maroon-primary mb-4">{selectedNews.title}</h3>
            <div className="h-px w-full bg-zinc-100 my-4"></div>
            <p className="text-zinc-650 text-sm leading-relaxed whitespace-pre-line">
              {selectedNews.content}
            </p>
          </div>
        </div>
      )}
```
becomes:
```tsx
      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-2xl bg-white border border-zinc-200/60 max-w-3xl w-full p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-xl font-bold"
            >
              &times;
            </button>
            <div className="flex gap-2 items-center mb-4">
              <span className="px-2.5 py-0.5 rounded bg-maroon-primary text-white text-[10px] font-bold">
                {selectedNews.category}
              </span>
              <span className="text-xs text-zinc-400">{selectedNews.date}</span>
            </div>
            <h3 className="text-2xl font-black text-maroon-primary mb-4">{selectedNews.title}</h3>
            <div className="h-px w-full bg-zinc-100 my-4"></div>
            <p className="text-zinc-650 text-sm leading-relaxed whitespace-pre-line">
              {selectedNews.content}
            </p>
            {selectedNews.localViz && (
              <div className="mt-6">
                {selectedNews.localViz === "workshopMap" && <WorkshopMapLocal />}
                {selectedNews.localViz === "survey" && <SurveyFindingsLocal />}
                {selectedNews.localViz === "funding" && <StudentFundingLocal />}
                {selectedNews.localViz === "matrix" && <EvaluationGridLocal />}
              </div>
            )}
          </div>
        </div>
      )}
```

- [ ] **Step 4: Verify the build**

Run: `cd "/Users/newman/google reach/web" && npm run build`
Expected: succeeds.

- [ ] **Step 5: Manual visual check**

Run: `cd "/Users/newman/google reach/web" && npm run dev`
Open `http://localhost:3000/news`:
- Confirm the "REACH Consortium Launches Student Funding Pipeline" article (or whichever is first after filtering) renders as the large maroon hero block, and the other two render in a two-column grid below it.
- Click "All" then each category filter — confirm the hero article updates to the first item of the filtered set, and the grid updates accordingly.
- Click into the Student Funding article — confirm the modal shows the `StudentFundingLocal` chart below the article text.
- Click into the Query Elicitation article — confirm the modal shows the `WorkshopMapLocal` chart.
- Click into the Human Annotation Protocol article — confirm no chart renders (it has no `localViz`).
- Confirm the Media Kit and Intake Outreach sidebar sections are unchanged.

- [ ] **Step 6: Commit**

```bash
cd "/Users/newman/google reach"
git add web/app/news/page.tsx
git commit -m "Upgrade /news feed to featured hero + grid layout with embedded charts"
```

---

### Task 6: Full-site verification pass

**Files:** none (verification only).

- [ ] **Step 1: Full production build**

Run: `cd "/Users/newman/google reach/web" && npm run build`
Expected: succeeds with all routes listed, including `/`, `/news`, and the 12 `/institutions/<id>` routes.

- [ ] **Step 2: Lint**

Run: `cd "/Users/newman/google reach/web" && npm run lint`
Expected: no errors.

- [ ] **Step 3: End-to-end manual walkthrough**

Run: `cd "/Users/newman/google reach/web" && npm run dev`

- Home page (`/`): confirm hero, milestones, workshop table, "REACH Data Visualization Center" (Local/Flourish toggle + 4 tabs), workstream cards, and "Reach News & Articles" preview all render exactly as before this plan (no regressions from the Footer extraction or Link change).
- Click through at least 3 institution cards from the homepage grid to their detail pages and back via "Back to Directory".
- Revisit `/news` and confirm the hero/grid/modal behavior from Task 5's manual check still holds together with everything else.

This task has no code changes and therefore no commit.
