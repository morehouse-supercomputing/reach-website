export interface Researcher {
  id: string;
  prefix?: string;
  firstName: string;
  lastName: string;
  institution: string;
  workstream: string;
  role: string;
  bio: string;
  email: string;
  linkedin?: string;
  avatarColor: string; // Dynamic modern placeholder color
}

export const RESEARCHERS_DATA: Researcher[] = [
  {
    id: "1",
    prefix: "Dr.",
    firstName: "Ashley",
    lastName: "Scruse",
    institution: "Morehouse College",
    workstream: "WS5: Dissemination",
    role: "Principal Investigator & WS5 Lead",
    bio: "Leading the REACH consortium efforts at Morehouse, focusing on institutional synergy and AI research dissemination across partners.",
    email: "ashley.scruse@morehouse.edu",
    linkedin: "https://linkedin.com",
    avatarColor: "bg-primary text-on-primary",
  },
  {
    id: "2",
    firstName: "Kanayo",
    lastName: "Egwuekwe-Maxey",
    institution: "Morehouse College",
    workstream: "WS2: Applied AI",
    role: "Lead Data Modeler",
    bio: "Focuses on predictive modeling and relational database design for complex multi-institution demographic datasets.",
    email: "kanayo@morehouse.edu",
    linkedin: "https://linkedin.com",
    avatarColor: "bg-tertiary text-on-tertiary",
  },
  {
    id: "3",
    firstName: "De'Andre",
    lastName: "Randolph",
    institution: "Spelman College",
    workstream: "WS2: Applied AI",
    role: "Lead Visualization Engineer",
    bio: "Specializes in turning raw high-dimensional AI model outputs into intuitive, web-based geographic and institutional visual stories.",
    email: "deandre@spelman.edu",
    linkedin: "https://linkedin.com",
    avatarColor: "bg-secondary text-on-secondary",
  },
  {
    id: "4",
    firstName: "Chase",
    lastName: "Clayton",
    institution: "Howard University",
    workstream: "WS5: Dissemination",
    role: "Systems Architect & Developer",
    bio: "Architecting cloud systems, CI/CD pipelines, and secure data access infrastructure for the reach portal.",
    email: "chase@howard.edu",
    avatarColor: "bg-primary-container text-on-primary-container",
  },
  {
    id: "5",
    firstName: "Newman",
    lastName: "Robinson",
    institution: "Hampton University",
    workstream: "WS1: Foundational AI",
    role: "Data Collection Specialist",
    bio: "Conducts data ingestion protocols, data cleansing, and validation pipelines for AI training sets.",
    email: "wendell@hampton.edu",
    linkedin: "https://linkedin.com",
    avatarColor: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    id: "6",
    firstName: "James",
    lastName: "Moore IV",
    institution: "Tuskegee University",
    workstream: "WS4: AI Policy",
    role: "Policy Design Lead",
    bio: "Researching the ethical implications of foundational models, focusing on regulatory frameworks for minority-serving institutions.",
    email: "james@tuskegee.edu",
    avatarColor: "bg-secondary-container text-on-secondary-container",
  },
];

export const INSTITUTION_NAMES = [
  "Morehouse College",
  "Spelman College",
  "Howard University",
  "Hampton University",
  "Tuskegee University",
];

export const WORKSTREAMS = [
  "WS1: Foundational AI",
  "WS2: Applied AI",
  "WS4: AI Policy",
  "WS5: Dissemination",
];

export function researcherSlug(r: Pick<Researcher, "firstName" | "lastName">): string {
  return `${r.firstName}-${r.lastName}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function researcherBySlug(slug: string): Researcher | undefined {
  return RESEARCHERS_DATA.find((r) => researcherSlug(r) === slug);
}

// Ties each researcher's card/badge accent to their workstream, matching the
// Google-palette colors already used for the workstream cards on the homepage.
const WORKSTREAM_ACCENTS: Record<string, string> = {
  WS1: "#1a73e8",
  WS2: "#1e8e3e",
  WS3: "#d93025",
  WS4: "#f0a000",
  WS5: "#1257c0",
};

export function researcherAccent(r: Researcher): string {
  const key = r.workstream.split(":")[0].trim();
  return WORKSTREAM_ACCENTS[key] || "#1a73e8";
}

export interface Institution {
  /** Short URL-safe slug, e.g. "morehouse" — used for routing/anchors (/institutions#slug). */
  id: string;
  name: string;
  abbr: string;
  role: "Lead Institution" | "Partner Institution";
  city: string;
  state: string;
  founded: number;
  history: string;
  accentColor: string;
  /** Path under /public to the school's logo/seal. Falls back to initials if missing. */
  logo?: string;
}

// The 12 REACH consortium partners — the same set shown on the homepage's
// consortium marquee/bento grid, Morehouse (the lead institution) first.
// The /institutions page sorts this by name for its alphabetical scroll.
export const INSTITUTIONS_DATA: Institution[] = [
  {
    id: "morehouse",
    name: "Morehouse College",
    abbr: "MC",
    role: "Lead Institution",
    city: "Atlanta",
    state: "GA",
    founded: 1867,
    history:
      "Founded in 1867, Morehouse is the nation's only historically Black liberal arts college for men, known for producing generations of civic and academic leaders.",
    accentColor: "from-[#84142D] to-[#3D0D1B]",
    logo: "/morehouse-college-seal.svg",
  },
  {
    id: "clark-atlanta",
    name: "Clark Atlanta University",
    abbr: "CAU",
    role: "Partner Institution",
    city: "Atlanta",
    state: "GA",
    founded: 1988,
    history:
      "Formed in 1988 from the merger of Clark College and Atlanta University, CAU carries forward more than a century and a half of combined academic tradition.",
    accentColor: "from-[#C41230] to-[#1A1A1A]",
    logo: "/clark-atlanta-seal.svg",
  },
  {
    id: "claflin",
    name: "Claflin University",
    abbr: "CU",
    role: "Partner Institution",
    city: "Orangeburg",
    state: "SC",
    founded: 1869,
    history:
      "Founded in 1869, Claflin is the oldest historically Black college in South Carolina, known for strong STEM and honors programs on a close-knit Orangeburg campus.",
    accentColor: "from-[#CA3827] to-[#580F1A]",
    logo: "/claflin-seal.png",
  },
  {
    id: "famu",
    name: "Florida A&M University",
    abbr: "FAMU",
    role: "Partner Institution",
    city: "Tallahassee",
    state: "FL",
    founded: 1887,
    history:
      "Founded in 1887, FAMU is the nation's top-ranked public HBCU, with a long-standing reputation for producing leaders in pharmacy, journalism, and business.",
    accentColor: "from-[#FF7900] to-[#046A38]",
    logo: "/famu-seal.png",
  },
  {
    id: "hampton",
    name: "Hampton University",
    abbr: "HU",
    role: "Partner Institution",
    city: "Hampton",
    state: "VA",
    founded: 1868,
    history:
      "Founded in 1868, Hampton began as a school for formerly enslaved people and has grown into a comprehensive research university on Virginia's coast.",
    accentColor: "from-[#00539B] to-[#0A2F5C]",
    logo: "/hampton-seal.png",
  },
  {
    id: "howard",
    name: "Howard University",
    abbr: "HOW",
    role: "Partner Institution",
    city: "Washington",
    state: "DC",
    founded: 1867,
    history:
      "Founded in 1867 in the nation's capital, Howard is a research university spanning undergraduate, graduate, and professional programs across a wide range of disciplines.",
    accentColor: "from-[#003DA5] to-[#E4002B]",
    logo: "/howard-university-logo.png",
  },
  {
    id: "morgan-state",
    name: "Morgan State University",
    abbr: "MSU",
    role: "Partner Institution",
    city: "Baltimore",
    state: "MD",
    founded: 1867,
    history:
      "Founded in 1867, Morgan State grew from a Baltimore seminary into Maryland's preeminent public research HBCU, with nationally ranked engineering and journalism programs.",
    accentColor: "from-[#1B4383] to-[#F47937]",
    logo: "/morgan-state-university.png",
  },
  {
    id: "nc-at",
    name: "North Carolina A&T",
    abbr: "A&T",
    role: "Partner Institution",
    city: "Greensboro",
    state: "NC",
    founded: 1891,
    history:
      "Founded in 1891, NC A&T is the nation's largest HBCU by enrollment and a leading producer of Black engineering graduates.",
    accentColor: "from-[#003087] to-[#B3A369]",
    logo: "/ncat-logo.svg",
  },
  {
    id: "prairie-view",
    name: "Prairie View A&M",
    abbr: "PV",
    role: "Partner Institution",
    city: "Prairie View",
    state: "TX",
    founded: 1876,
    history:
      "Founded in 1876, Prairie View A&M is one of the oldest public institutions of higher education in Texas, with strong programs in engineering and nursing.",
    accentColor: "from-[#4B116F] to-[#F2A900]",
    logo: "/prairie-view-seal.svg",
  },
  {
    id: "spelman",
    name: "Spelman College",
    abbr: "SC",
    role: "Partner Institution",
    city: "Atlanta",
    state: "GA",
    founded: 1881,
    history:
      "Founded in 1881, Spelman is a historically Black liberal arts college for women and a leading producer of Black women who go on to earn doctorates in STEM.",
    accentColor: "from-[#00337F] to-[#001A44]",
    logo: "/spelman-college-logo.svg",
  },
  {
    id: "tuskegee",
    name: "Tuskegee University",
    abbr: "TU",
    role: "Partner Institution",
    city: "Tuskegee",
    state: "AL",
    founded: 1881,
    history:
      "Founded in 1881 by Booker T. Washington, Tuskegee built a legacy of applied science and engineering leadership, from George Washington Carver's research to the Tuskegee Airmen.",
    accentColor: "from-[#9E1B32] to-[#C5A059]",
    logo: "/tuskegee-university-seal.svg",
  },
  {
    id: "xavier",
    name: "Xavier University of Louisiana",
    abbr: "XU",
    role: "Partner Institution",
    city: "New Orleans",
    state: "LA",
    founded: 1925,
    history:
      "Founded in 1925, Xavier is the nation's only historically Black and Catholic university, and a top producer of Black students who go on to medical school.",
    accentColor: "from-[#00205B] to-[#C4B581]",
    logo: "/xavier-university-logo.png",
  },
];
