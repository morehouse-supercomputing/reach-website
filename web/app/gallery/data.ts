import { mockWorkshopMetrics } from "../mockData";

export type Album = {
  slug: string;
  title: string;
  meta: string;
  accent: string;
};

export type Shot = {
  id: string;
  album: string;
  /** Drop the file in web/public/gallery/ and put its path here. Empty renders a placeholder. */
  src: string;
  /** Shown under the photo and in the lightbox. Empty is fine. */
  caption: string;
  /** Grid emphasis. "wide" spans two columns, "tall" spans two rows. */
  size?: "wide" | "tall";
};

const GOOGLE = ["var(--blue)", "var(--red)", "var(--amber)", "var(--green)"];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[.,]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Albums track the workshops already listed on the site, so there is one source of truth.
export const albums: Album[] = [
  ...mockWorkshopMetrics.map((w, i) => ({
    slug: slugify(w.location),
    title: w.location,
    meta: w.date,
    accent: GOOGLE[i % GOOGLE.length],
  })),
  { slug: "consortium", title: "Consortium convenings", meta: "Ongoing", accent: "var(--blue-d)" },
];

// Rhythm for the wall: every fourth slot is wide, every seventh is tall.
const size = (n: number): Shot["size"] => (n % 7 === 6 ? "tall" : n % 4 === 3 ? "wide" : undefined);

const slots = (album: string, count: number): Shot[] =>
  Array.from({ length: count }, (_, n) => ({
    id: `${album}-${n + 1}`,
    album,
    src: "",
    caption: "",
    size: size(n),
  }));

export const shots: Shot[] = albums.flatMap((a) =>
  slots(a.slug, a.slug === "consortium" ? 6 : 5)
);

export const byAlbum = (slug: string) => albums.find((a) => a.slug === slug);
export const placedCount = () => shots.filter((s) => s.src).length;
