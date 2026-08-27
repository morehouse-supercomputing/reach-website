export type Person = { name: string; title: string; photo?: string };
export type WS = "WS1" | "WS2" | "WS3" | "WS4" | "WS5";

export type Institution = {
  slug: string;
  name: string;
  abbr: string;
  role: string;
  logo: string;
  location: string;
  people: Person[];
  workstreams: WS[]; // confirmed contributions only; empty = being confirmed
};

export const WS_META: Record<WS, { title: string; color: string; blurb: string }> = {
  WS1: { title: "Foundational AI", color: "var(--blue)", blurb: "Core methodology, taxonomy, and the measurement framework." },
  WS2: { title: "Applied AI", color: "var(--green)", blurb: "Community data collection via Amplify and regional workshops." },
  WS3: { title: "AI Safety", color: "var(--red)", blurb: "Hybrid annotation, auto-raters, and the Cultural Leaderboard." },
  WS4: { title: "AI Policy", color: "var(--amber)", blurb: "Responsible-use guidance and policy translation." },
  WS5: { title: "Dissemination", color: "var(--blue-d)", blurb: "Public communication and this platform." },
};

// Faculty rosters from the REACH consortium overview deck.
export const institutions: Institution[] = [
  {
    slug: "google-research",
    name: "Google Research",
    abbr: "G",
    role: "Consortium Co-Lead",
    logo: "/google-research-logo-t.png",
    location: "Mountain View, California",
    people: [
      { name: "James Manyika", title: "Senior Vice President, Research, Labs, Technology & Society" },
      { name: "Maya Kulycky", title: "Vice President, StratOps + Outreach, Research" },
      { name: "Marian Croak", title: "Vice President, Human Centered AI & Foundation ML Research" },
      { name: "Melonie Parker", title: "Vice President, Googler Engagement" },
      { name: "Maggie Johnson", title: "Vice President, Google.org" },
    ],
    workstreams: ["WS1", "WS2", "WS3", "WS4", "WS5"],
  },
  {
    slug: "morehouse",
    name: "Morehouse College",
    abbr: "MC",
    role: "Partner Institution",
    logo: "/morehouse-college-seal.svg",
    location: "Atlanta, Georgia",
    people: [
      { name: "Dr. Ashley Scruse", title: "Deputy Director, Morehouse Supercomputing Facility" },
      { name: "Dr. Kinnis Gosha", title: "Chair, Computer Science Department" },
      { name: "Dr. Sonya Dennis", title: "Assistant Professor, Computer Science" },
    ],
    workstreams: ["WS5"],
  },
  {
    slug: "clark-atlanta",
    name: "Clark Atlanta University",
    abbr: "CAU",
    role: "Partner Institution",
    logo: "/clark-atlanta-seal.svg",
    location: "Atlanta, Georgia",
    people: [
      { name: "Dr. Kishor Datta Gupta", title: "Assistant Professor, Cyber Physical Systems" },
      { name: "Dr. Roy George", title: "Professor & Chair, Cyber-Physical Systems" },
    ],
    workstreams: [],
  },
  {
    slug: "claflin",
    name: "Claflin University",
    abbr: "CU",
    role: "Partner Institution",
    logo: "/claflin-seal.png",
    location: "Orangeburg, South Carolina",
    people: [
      { name: "Dr. Candice Idlebird", title: "Chair, Social Sciences · Assistant Professor, Sociology" },
      { name: "Dr. Karina Liles", title: "Chair, Math + Computer Science" },
    ],
    workstreams: [],
  },
  {
    slug: "famu",
    name: "Florida A&M University",
    abbr: "FAMU",
    role: "Partner Institution",
    logo: "/famu-seal.png",
    location: "Tallahassee, Florida",
    people: [
      { name: "Dr. Carlos Theran", title: "Assistant Professor, Computer Science" },
      { name: "Dr. Phylicia Taylor", title: "Assistant Professor, Management" },
    ],
    workstreams: [],
  },
  {
    slug: "hampton",
    name: "Hampton University",
    abbr: "HU",
    role: "Partner Institution",
    logo: "/hampton-seal.png",
    location: "Hampton, Virginia",
    people: [
      { name: "Dr. Chutima Boonthum-Denecke", title: "Professor, Computer Science" },
      { name: "Dr. Janett Walters-Williams", title: "Associate Professor, Computer Science" },
      { name: "Luka Hamel-Serenity", title: "Instructor, Department of Architecture" },
    ],
    workstreams: [],
  },
  {
    slug: "howard",
    name: "Howard University",
    abbr: "HOW",
    role: "Partner Institution",
    logo: "/howard-university-logo.png",
    location: "Washington, D.C.",
    people: [
      { name: "Dr. Gloria Washington", title: "Researcher" },
      { name: "Dr. Lucretia Williams", title: "Researcher" },
      { name: "Pamela Clarke", title: "Senior Director, Research Development" },
      { name: "Dr. Talitha Washington", title: "Executive Director, Center for Applied Data Science and Analytics" },
    ],
    workstreams: [],
  },
  {
    slug: "morgan-state",
    name: "Morgan State University",
    abbr: "MSU",
    role: "Partner Institution",
    logo: "/morgan-state-university.png",
    location: "Baltimore, Maryland",
    people: [
      { name: "Dr. Jamell Dacon", title: "Assistant Professor, Computer Science" },
      { name: "Dr. Kofi Nyarko", title: "Director, Center for Equitable AI/ML Systems" },
      { name: "William Mapp", title: "AI Research Architect" },
    ],
    workstreams: [],
  },
  {
    slug: "nc-at",
    name: "North Carolina A&T State University",
    abbr: "A&T",
    role: "Partner Institution",
    logo: "/ncat-logo.svg",
    location: "Greensboro, North Carolina",
    people: [
      { name: "Dr. Abeer Hasan", title: "Associate Professor, Statistics" },
      { name: "Dr. Dongyang “Sunny” Deng", title: "Associate Professor, Environmental Health + Safety" },
      { name: "Dr. Geleana Alston", title: "Professor · Associate Dean for Research and Community Engagement" },
      { name: "Dr. Travonia Brown-Hughes", title: "Director, Outreach in Alzheimer’s Aging + Community Health" },
      { name: "Dr. Seongtae “Ty” Kim", title: "Associate Professor, Mathematics and Statistics" },
    ],
    workstreams: [],
  },
  {
    slug: "prairie-view",
    name: "Prairie View A&M University",
    abbr: "PV",
    role: "Partner Institution",
    logo: "/prairie-view-seal.svg",
    location: "Prairie View, Texas",
    people: [
      { name: "Dr. Erick Kitenge", title: "Associate Professor, Economics" },
      { name: "Dr. Lijun Qian", title: "Professor, Electrical + Computer Engineering" },
      { name: "Dr. Xishuang Dong", title: "Associate Professor, Electrical + Computer Engineering" },
    ],
    workstreams: [],
  },
  {
    slug: "spelman",
    name: "Spelman College",
    abbr: "SC",
    role: "Partner Institution",
    logo: "/spelman-college-logo.svg",
    location: "Atlanta, Georgia",
    people: [
      { name: "Jaycee Holmes", title: "Director, Spelman Innovation · Arthur M. Blank Innovation Lab" },
      { name: "Dr. Mark Lee", title: "Senior Vice President, Academic Affairs" },
    ],
    workstreams: [],
  },
  {
    slug: "tuskegee",
    name: "Tuskegee University",
    abbr: "TU",
    role: "Partner Institution",
    logo: "/tuskegee-university-seal.svg",
    location: "Tuskegee, Alabama",
    people: [
      { name: "Dr. Fan Wu", title: "Professor + Head, Computer Science Department" },
      { name: "Dr. Kushagra Kushagra", title: "Assistant Professor, Computer Science" },
      { name: "Dr. Mohammad Rahman", title: "Assistant Professor, Computer Science" },
    ],
    workstreams: [],
  },
  {
    slug: "xavier",
    name: "Xavier University of Louisiana",
    abbr: "XU",
    role: "Partner Institution",
    // The previous asset was Xavier University (Cincinnati), a different school.
    // Falls back to the XU monogram until XULA supplies its own mark.
    logo: "",
    location: "New Orleans, Louisiana",
    people: [
      { name: "Dr. Andrea Edwards", title: "Faculty + Chair, Computer Science" },
      { name: "Quincy Hodges", title: "Assistant Professor, Mass Communications" },
      { name: "Dr. James Dunson", title: "Associate Professor, Philosophy" },
    ],
    workstreams: [],
  },
];

export const monogram = (abbr: string, color = "#1a73e8") =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><circle cx='150' cy='150' r='128' fill='none' stroke='${color}' stroke-width='4' opacity='0.45'/><text x='150' y='190' text-anchor='middle' font-family='Georgia, serif' font-size='96' font-weight='700' fill='${color}'>${abbr}</text></svg>`
  );

export const bySlug = (slug: string) => institutions.find((i) => i.slug === slug);
export const initials = (name: string) =>
  name
    .replace(/^Dr\.\s+/i, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// School accent colors (approximate institutional colors) for the chroma grid.
export const accents: Record<string, string> = {
  "google-research": "#4285f4",
  morehouse: "#840029",
  "clark-atlanta": "#9E1B32",
  claflin: "#F37021",
  famu: "#006747",
  hampton: "#0067AC",
  howard: "#003A63",
  "morgan-state": "#1B4383",
  "nc-at": "#FDB927",
  "prairie-view": "#4F2D7F",
  spelman: "#7EBCE6",
  tuskegee: "#8A2432",
  xavier: "#0C2340",
};

// REACH Website Summer Build Cohort (students)
export type Student = {
  slug: string;
  name: string;
  role: string;
  institution: string;
  github?: string;
  photo?: string;
  accent: string;
  bio: string;
  focus: string[];
};

export const students: Student[] = [
  {
    slug: "deandre-randolph",
    name: "De'Andre Randolph",
    role: "Data Visualization & Research Lead",
    institution: "Morehouse College",
    github: "https://github.com/DreRandolph",
    accent: "#1a73e8",
    bio: "Builds the interactive dashboards and visualizations that make the REACH cultural competency benchmark legible, turning multi-institution evaluation data into a story anyone can read.",
    focus: ["Data visualization", "Benchmark dashboards", "Consortium mapping"],
  },
  {
    slug: "kanayo-egwuekwe-maxey",
    name: "Kanayo Egwuekwe-Maxey",
    role: "Back-End Developer",
    institution: "Morehouse College",
    github: "https://github.com/kkemaxey",
    accent: "#1e8e3e",
    bio: "Designs the data model and backend for the REACH platform: how the consortium's institutions, workstreams, and findings are structured, stored, and served.",
    focus: ["Data modeling", "Cloud SQL & Storage", "APIs"],
  },
  {
    slug: "wendell-robinson",
    name: "Wendell Robinson",
    role: "Marketing & Communications Lead",
    institution: "Morehouse College",
    github: "https://github.com/wnrob",
    accent: "#d93025",
    bio: "Owns the story: gathering the consortium's institutional content, writing the narrative, and building the pages that tell the world what REACH is.",
    focus: ["Content & narrative", "Partner outreach", "Institution pages"],
  },
  {
    slug: "james-moore",
    name: "James Moore IV",
    role: "UX/UI Designer",
    institution: "Morehouse College",
    github: "https://github.com/jlmiv924",
    accent: "#f9ab00",
    bio: "Designs the REACH visual language: wireframes, page templates, and the design system that keeps the platform legible and accessible for every audience.",
    focus: ["Wireframes", "Design systems", "Accessibility"],
  },
  {
    slug: "chase-clayton",
    name: "Chase Clayton",
    role: "Front-End Developer",
    institution: "Clark Atlanta University",
    github: "https://github.com/chaseclayton1",
    accent: "#1257c0",
    bio: "Builds the site itself: the Next.js application, routing, and deployment pipeline that carries the consortium's work to the public.",
    focus: ["Next.js", "Deployment", "Site architecture"],
  },
];

export const personSlug = (name: string) =>
  name
    .replace(/^Dr\.\s+/i, "")
    .toLowerCase()
    .replace(/[’'".]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export type AnyPerson = {
  slug: string;
  name: string;
  title: string;
  institution: string;
  kind: "student" | "faculty";
  github?: string;
  accent: string;
  bio?: string;
  focus?: string[];
};

export const allPeople: AnyPerson[] = [
  ...students.map((s) => ({
    slug: s.slug,
    name: s.name,
    title: s.role,
    institution: s.institution,
    kind: "student" as const,
    github: s.github,
    accent: s.accent,
    bio: s.bio,
    focus: s.focus,
  })),
  ...institutions.flatMap((i) =>
    i.people.map((p) => ({
      slug: personSlug(p.name),
      name: p.name,
      title: p.title,
      institution: i.name,
      kind: "faculty" as const,
      accent: accents[i.slug] || "#1a73e8",
    }))
  ),
].filter((p, idx, arr) => arr.findIndex((q) => q.slug === p.slug) === idx);

export const personBySlug = (slug: string) => allPeople.find((p) => p.slug === slug);
export const institutionByName = (name: string) => institutions.find((i) => i.name === name);
