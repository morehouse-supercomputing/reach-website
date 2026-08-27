export interface Institution {
  id: string;
  name: string;
  location: string;
  logo: string;
  bio: string;
  workstreams: string[];
  flourishId?: string; // live Flourish chart id; when unset, the institution page shows a placeholder guide
}

export interface Workstream {
  id: string;
  name: string;
  code: string;
  description: string;
  leadInstitution: string;
  coLeads: string[];
  subgroups?: { name: string; leads: string; mandate: string }[];
  institutions: string[];
}

export interface WorkshopMetrics {
  location: string;
  date: string;
  audience: string;
  rawQueries: string;
  validatedQueries: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: 'Press Release' | 'Consortium News' | 'Media Asset';
  content: string;
  localViz?: "workshopMap" | "survey" | "funding" | "matrix"; // renders the matching LocalVisualizations chart in the detail modal
}

export const mockInstitutions: Institution[] = [
  {
    id: "morehouse",
    name: "Morehouse College",
    location: "Atlanta, GA",
    logo: "MC",
    bio: "Morehouse College coordinates overall workstream efforts, leads Workstream 5 (Programmatic Development & Dissemination) alongside Google and Howard, and administers the REACH technical cloud infrastructure.",
    workstreams: ["ws1", "ws5"]
  },
  {
    id: "spelman",
    name: "Spelman College",
    location: "Atlanta, GA",
    logo: "SC",
    bio: "Spelman College co-leads Student Engagement (WS5 Subgroup C) and leads key Applied AI and AI Policy research initiatives across partner campuses.",
    workstreams: ["ws2", "ws4", "ws5"]
  },
  {
    id: "howard",
    name: "Howard University",
    location: "Washington, D.C.",
    logo: "HU",
    bio: "Howard University co-leads Workstream 5 (Coordination & Dissemination) and manages the administrative oversight for student pilot engagement funding.",
    workstreams: ["ws2", "ws3", "ws4", "ws5"]
  },
  {
    id: "hampton",
    name: "Hampton University",
    location: "Hampton, VA",
    logo: "HAMP",
    bio: "Hampton University co-leads WS5 Subgroup A (Internal Consortium Communication) and supports contentstrategy, systematic literature reviews, and validation workshops.",
    workstreams: ["ws1", "ws2", "ws5"]
  },
  {
    id: "xavier-la",
    name: "Xavier University of Louisiana",
    location: "New Orleans, LA",
    logo: "XULA",
    bio: "Xavier University co-leads WS5 Subgroup A (Internal Consortium Communication) and drives research in Content Strategy and Measurement & Methodology.",
    workstreams: ["ws2", "ws4", "ws5"]
  },
  {
    id: "morgan-state",
    name: "Morgan State University",
    location: "Baltimore, MD",
    logo: "MSU",
    bio: "Morgan State University serves as a key hub for Protocol Development, hosting major validation workshops and coordinating rater recruitment workflows.",
    workstreams: ["ws1", "ws2", "ws3"]
  },
  {
    id: "tuskegee",
    name: "Tuskegee University",
    location: "Tuskegee, AL",
    logo: "TU",
    bio: "Tuskegee University supports Data Platform development and protocol validation, hosting community data collection workshops in rural Alabama.",
    workstreams: ["ws2", "ws3"]
  },
  {
    id: "florida-am",
    name: "Florida A&M University",
    location: "Tallahassee, FL",
    logo: "FAMU",
    bio: "FAMU contributes to community consultation and AI safety research, actively participating in public outreach and student engagement initiatives.",
    workstreams: ["ws1", "ws5"]
  },
  {
    id: "nc-at",
    name: "North Carolina A&T State University",
    location: "Greensboro, NC",
    logo: "NCAT",
    bio: "NC A&T State University leads technical studies on measurement and methodology, providing key data models for evaluating model bias.",
    workstreams: ["ws2"]
  },
  {
    id: "pvamu",
    name: "Prairie View A&M University",
    location: "Prairie View, TX",
    logo: "PVAMU",
    bio: "Prairie View A&M University co-leads Protocol and Data Platform development, supporting community validation across southern regions.",
    workstreams: ["ws2"]
  },
  {
    id: "claflin",
    name: "Claflin University",
    location: "Orangeburg, SC",
    logo: "CLA",
    bio: "Claflin University supports content strategy, academic conference tracking, and community validation framework evaluations.",
    workstreams: ["ws1", "ws2"]
  },
  {
    id: "fisk",
    name: "Fisk University",
    location: "Nashville, TN",
    logo: "FU",
    bio: "Fisk University collaborates with workstreams to validate cultural heuristics and analyze regional socioeconomic factors in AI representation.",
    workstreams: ["ws1"]
  }
];

export const mockWorkstreams: Workstream[] = [
  {
    id: "ws1",
    name: "Community Consultation & Topic Prioritization",
    code: "WS1",
    description: "Employs empirical and participatory methods to engage community members and technology/society experts to identify culturally significant aspects, sensitive topics, and socio-technical harms. Establishes the 'ground truth' taxonomy.",
    leadInstitution: "Google Leads (Christina Harrington, Darlene Neal, Courtney Heldreth, Andrew Smart)",
    coLeads: ["Reginald Ellis (FAMU)", "Luka Hamel-Serenity (Hampton)", "William Mapp (Morgan State)", "Phylicia Taylor (Claflin)", "Candice Idlebird (Claflin)"],
    institutions: ["Florida A&M University", "Hampton University", "Morgan State University", "Claflin University", "Fisk University"]
  },
  {
    id: "ws2",
    name: "Data Collection & Curation",
    code: "WS2",
    description: "Translates qualitative cultural insights into engineering data inputs, handling the middle tier of the core benchmark pipeline by generating high-quality human seed evaluation datasets and auto-rater training corpuses.",
    leadInstitution: "Google Leads & Partner Co-leads",
    coLeads: [
      "Quincy Hodges (Xavier) - Focus Area 1 (Content Strategy)",
      "Andrea Edwards (Xavier) - Focus Area 2 (Methodology)",
      "Erick Kitenge (PVAMU) & Kofi Nyarko (MSU) - Focus Area 3 (Protocol & Platform)"
    ],
    institutions: ["Xavier University", "Prairie View A&M", "Morgan State University", "Hampton University", "Tuskegee University", "NC A&T State University", "Claflin University"]
  },
  {
    id: "ws3",
    name: "Benchmark & Evaluation (Auto-Rater Development)",
    code: "WS3",
    description: "Develops the automated scoring system (auto-rater) and runs multi-turn evaluations using standard parameters (e.g., temperature 0.0, blind tests) to check AI model comprehension of local cultural nuances.",
    leadInstitution: "Howard University & Google Research",
    coLeads: ["Dr. Talitha Washington (Howard)", "Qazi Mamunur Rashid (Google)", "Darlene Neal (Google)"],
    institutions: ["Howard University", "Morgan State University", "Tuskegee University"]
  },
  {
    id: "ws4",
    name: "Research Socialization, Partnership & Model Enhancement",
    code: "WS4",
    description: "Serves as the outward-facing arm of REACH. Translates core datasets and evaluation findings into real-world impact by co-authoring public reports, workshop proposals (e.g., ACM CIKM), and civil society briefings.",
    leadInstitution: "Spelman College & Howard University",
    coLeads: ["Jamila Smith-Loud (Google)", "Janett Walters-Williams (Hampton)", "Xishuang D. (Howard)", "William Mapp (Morgan State)", "Chutima B. (Tuskegee)"],
    institutions: ["Spelman College", "Howard University", "Hampton University", "Morgan State University", "Tuskegee University", "Xavier University"]
  },
  {
    id: "ws5",
    name: "Programmatic Development, Coordination & Dissemination",
    code: "WS5",
    description: "Maintains internal consortium health, manages the $600k student research project program (disbursing $50k per university), and builds public platforms to share outcomes.",
    leadInstitution: "Morehouse College, Howard University, and Google",
    coLeads: ["Sharifa Vinson (Google Research PgM)", "Dr. Talitha Washington (Howard University)", "Dr. Kinnis Gosha (Morehouse College)"],
    subgroups: [
      { name: "Subgroup A: Internal Comms", leads: "Dr. Andrea Edwards (Xavier) & Dr. Luka Hamel-Serenity (Hampton)", mandate: "Cross-workstream synergy and 'Living Hub' repository maintenance." },
      { name: "Subgroup B: Campus Socialization", leads: "Rolling Faculty Leadership", mandate: "Academic strategies, curriculum integration, and campus Research Month showcases." },
      { name: "Subgroup C: Student Engagement", leads: "Dr. Ashley Scruse (Morehouse) & Jaycee Holmes (Spelman)", mandate: "Manages student research lifecycle, NDA execution, and technical AI mentorship." }
    ],
    institutions: ["Morehouse College", "Howard University", "Spelman College", "Hampton University", "Xavier University", "Florida A&M University"]
  }
];

export const mockWorkshopMetrics: WorkshopMetrics[] = [
  {
    location: "Washington, D.C.",
    date: "Feb 2–3",
    audience: "Initial Data Collection Pilot; validated taxonomy and Amplify tooling.",
    rawQueries: "122 queries",
    validatedQueries: "62 queries"
  },
  {
    location: "Los Angeles, CA",
    date: "Mar 11",
    audience: "56 participants (26 everyday users / 30 cultural domain experts); Google LAX office.",
    rawQueries: "471 queries",
    validatedQueries: "337 queries"
  },
  {
    location: "Baltimore, MD",
    date: "Mar 24",
    audience: "38 participants (24 everyday users / 14 domain experts); Morgan State University.",
    rawQueries: "366 queries",
    validatedQueries: "238 queries"
  },
  {
    location: "Tuskegee, AL",
    date: "Apr 17",
    audience: "32 participants (16 everyday users / 16 domain experts); Tuskegee University.",
    rawQueries: "347 queries",
    validatedQueries: "137 queries"
  },
  {
    location: "Chicago, IL",
    date: "Apr 22",
    audience: "55 participants (25 everyday users / 30 domain experts); focused on local sociopolitical topics.",
    rawQueries: "522 queries",
    validatedQueries: "278 queries"
  },
  {
    location: "Taos County, NM",
    date: "Jun 9",
    audience: "Final in-person rural/non-metropolitan session; captured strong Indigenous context.",
    rawQueries: "Data packaging in progress",
    validatedQueries: "TBD"
  }
];

export const mockNews: NewsItem[] = [
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
  {
    id: "news-3",
    title: "REACH Human Annotation Protocol Ready",
    date: "July 2026",
    excerpt: "Workstream 3 is ready to launch the 3-phase human annotation pilot to calibrate the auto-rater on August 10, 2026.",
    category: "Media Asset",
    content: "The official human annotation protocol has been released. The project will recruit 30 total annotators (3 domain experts and 3 local site experts per location) across 5 sites to rate model responses against 5 cultural dimensions (Framing, Representation, Boundaries, Appropriateness, and Language).Raters will receive $70 per hour for their contributions."
  }
];
