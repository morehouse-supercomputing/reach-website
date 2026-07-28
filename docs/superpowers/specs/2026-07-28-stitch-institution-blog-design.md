# Institution Profile Pages & Blog Upgrade

Date: 2026-07-28
Author: Wendell Robinson (Marketing & Comms Lead), with Claude
Status: Approved

## Background

James (UX/UI) generated a 4-screen concept in Google Stitch ("reach_premium": home, blog, researcher_profile, institution_profile) as design exploration. The mockup uses a blue Material-You palette and placeholder content unrelated to REACH's actual model (a fictional individual-researcher directory: "Dr. Helena Vance", fake citation counts, "Join Network" / "Sign In" — REACH is a public dissemination site for a 12-HBCU + Google GenAI research consortium organized by institution and workstream, not an individual-researcher marketplace).

Decision: adapt the Stitch layouts into the live site in the existing maroon/cream REACH brand, using only real data already in `web/app/mockData.ts` (12 institutions, 5 workstreams, 6 workshop-metric rows, 3 news items). No fabricated stats, bios, or contact info. The `researcher_profile` screen's *content* (individual researcher directory) is out of scope — REACH has no such data model — but its *layout ideas* (sticky profile card, stat row, narrative section, related-content cards) are reused for the institution profile page instead.

## Scope

In scope:
1. New institution detail page at `/institutions/[slug]`.
2. Visual upgrade of the existing `/news` page's article feed (hero + grid), keeping its existing sidebar tools and modal-detail mechanism.
3. Real-data visualizations ("flourish data representations") on both: institution pages and applicable blog articles.
4. Small refactor: extract the footer (duplicated verbatim in `page.tsx` and `news/page.tsx`) into a shared `Footer` component, since a third copy would otherwise appear on institution pages.

Out of scope:
- Individual researcher/team-member directory pages (no data model for this yet).
- Home page rewrite (current homepage is complete and on-brand; not touched).
- Any new backend, database, or CMS — everything stays in `mockData.ts` as static TypeScript data, consistent with the rest of the site's current M1-stage approach.
- Fabricated per-institution stats (citation counts, funding numbers, etc.) not backed by existing data.

## Data model changes (`web/app/mockData.ts`)

```ts
export interface Institution {
  // ...existing fields unchanged...
  flourishId?: string; // optional live Flourish chart id, shown when set
}

export interface NewsItem {
  // ...existing fields unchanged...
  localViz?: "workshopMap" | "survey" | "funding" | "matrix";
}
```

- `flourishId` is left unset for all 12 institutions initially (no per-institution live charts exist yet). When unset, the institution page shows the same "Flourish Integration Guide" placeholder note pattern already used on the homepage.
- `localViz` is set for two of the three existing news items, matching their actual content to an existing chart component in `LocalVisualizations.tsx`:
  - `news-1` ("REACH Consortium Launches Student Funding Pipeline") → `"funding"` (→ `StudentFundingLocal`)
  - `news-2` ("Consortium Finalizes Query Elicitation Phase") → `"workshopMap"` (→ `WorkshopMapLocal`)
  - `news-3` ("REACH Human Annotation Protocol Ready") → left unset; no existing chart matches its content well enough to justify forcing one.

## New route: `web/app/institutions/[slug]/page.tsx`

- Statically generated: `generateStaticParams()` returns all `mockInstitutions[].id` values. Unknown slugs → Next's default 404 (`notFound()`).
- Layout: sticky left profile card (name, location, logo-initials badge, workstream-code badges, "Back to Directory" link to `/#institutions`) + right content column, mirroring the Stitch `researcher_profile` two-column structure but restyled to maroon/cream with `rounded-3xl` cards matching the rest of the site (not the Stitch `rounded-xl` Material style).
- Right column sections, top to bottom:
  1. **Stats row** — real, derived only: count of workstreams the institution belongs to; and, only when the institution's `location` city matches a `mockWorkshopMetrics[].location`, a "Hosted a Validation Workshop" card showing that row's real raw/validated query counts. No invented metrics.
  2. **Research Narrative** — renders the institution's existing `bio` field verbatim.
  3. **Workstream Contributions** — one card per workstream id in `institution.workstreams`, pulling `code`, `name`, and `description` from `mockWorkstreams`, linking to `/#workstreams` on the homepage.
  4. **Consortium Data** — always renders `WorkshopMapLocal` (existing component, real data) with a one-line callout if this institution hosted a workshop; below it, renders `FlourishEmbed` when `flourishId` is set, otherwise the placeholder guide note (same copy pattern as homepage's existing "💡 Flourish Integration Guide" block).
- Uses the shared `Footer` component (see below) and existing `Navbar`.

## Homepage change

- In `page.tsx`, the institution grid cards (`mockInstitutions.map(...)`, currently plain `<div>`s under `#institutions`) become `<Link href={`/institutions/${inst.id}`}>` wrapping the same card content, with a hover affordance consistent with existing hover states elsewhere on the page.

## `/news` page changes

- **Featured hero article:** the first article in `filteredNews` (post category-filter) renders as a large maroon/cream hero block — title, excerpt, category badge, date — replacing the plain card treatment for that one item, adapted from the Stitch blog hero-article pattern (no background photo — none of REACH's news items have associated images, and none should be invented).
- **Remaining articles:** switch from the current single-column stacked list to a responsive grid (`grid-cols-1 md:grid-cols-2`), reusing the existing card markup/styling, just re-flowed.
- **Sidebar (Media Kit, Intake Outreach tools):** unchanged — these are functional team tools, not blog content, and stay exactly as they are today.
- **Detail modal:** unchanged trigger/mechanism; when the selected article has `localViz` set, the modal renders the corresponding component from `LocalVisualizations.tsx` beneath the article body.

## Shared refactor

- Extract the footer markup (identical in `page.tsx` and `news/page.tsx` today) into `web/app/components/Footer.tsx`. All three pages (`page.tsx`, `news/page.tsx`, new `institutions/[slug]/page.tsx`) import and render it. Pure extraction — no visual or behavioral change.

## Testing / validation plan

- `npm run build` in `web/` must succeed (validates all 12 static institution routes generate without error, and TypeScript types check).
- Manual check in dev server (`npm run dev`):
  - Click through from homepage institution grid → at least 3 institution pages (one that hosted a workshop, e.g. Morgan State/Baltimore; one that didn't, e.g. Spelman) to confirm the conditional workshop-stat card and Flourish-placeholder both render correctly.
  - `/news`: confirm hero article renders, grid layout for remaining articles, category filter still works, and the two articles with `localViz` show their chart in the modal while the third does not.
  - Confirm existing homepage sections (hero, milestones, workshop table, visualization center, workstreams, news preview) are visually unaffected.
- No automated test suite currently exists in `web/`; this matches the existing project's testing posture (none), so no new test infra is introduced.

## Open questions

None outstanding — all scope decisions were confirmed with Wendell during design.
