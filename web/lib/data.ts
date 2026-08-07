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
    lastName: "Smith",
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
    lastName: "Jackson",
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
    lastName: "Carter",
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

export interface Institution {
  id: string;
  name: string;
  city: string;
  state: string;
  founded: number;
  history: string;
  accentColor: string;
  /** Path under /public to the school's logo PNG. Falls back to initials if missing. */
  logo?: string;
}

export const INSTITUTIONS_DATA: Institution[] = [
  {
    id: "morehouse-college",
    name: "Morehouse College",
    city: "Atlanta",
    state: "GA",
    founded: 1867,
    history:
      "Founded in 1867, Morehouse is the nation's only historically Black liberal arts college for men, known for producing generations of civic and academic leaders.",
    accentColor: "from-[#84142D] to-[#3D0D1B]",
    logo: "/logos/morehouse-college.png",
  },
  {
    id: "spelman-college",
    name: "Spelman College",
    city: "Atlanta",
    state: "GA",
    founded: 1881,
    history:
      "Founded in 1881, Spelman is a historically Black liberal arts college for women and a leading producer of Black women who go on to earn doctorates in STEM.",
    accentColor: "from-[#00337F] to-[#001A44]",
    logo: "/logos/spelman-college.png",
  },
  {
    id: "howard-university",
    name: "Howard University",
    city: "Washington",
    state: "DC",
    founded: 1867,
    history:
      "Founded in 1867 in the nation's capital, Howard is a research university spanning undergraduate, graduate, and professional programs across a wide range of disciplines.",
    accentColor: "from-[#003DA5] to-[#E4002B]",
    logo: "/logos/howard-university.png",
  },
  {
    id: "hampton-university",
    name: "Hampton University",
    city: "Hampton",
    state: "VA",
    founded: 1868,
    history:
      "Founded in 1868, Hampton began as a school for formerly enslaved people and has grown into a comprehensive research university on Virginia's coast.",
    accentColor: "from-[#00539B] to-[#0A2F5C]",
    logo: "/logos/hampton-university.png",
  },
  {
    id: "tuskegee-university",
    name: "Tuskegee University",
    city: "Tuskegee",
    state: "AL",
    founded: 1881,
    history:
      "Founded in 1881 by Booker T. Washington, Tuskegee built a legacy of applied science and engineering leadership, from George Washington Carver's research to the Tuskegee Airmen.",
    accentColor: "from-[#9E1B32] to-[#C5A059]",
    logo: "/logos/tuskegee-university.png",
  },
  {
    id: "florida-am-university",
    name: "Florida A&M University",
    city: "Tallahassee",
    state: "FL",
    founded: 1887,
    history:
      "Founded in 1887, FAMU is the nation's top-ranked public HBCU, with a long-standing reputation for producing leaders in pharmacy, journalism, and business.",
    accentColor: "from-[#FF7900] to-[#046A38]",
    logo: "/logos/florida-am-university.png",
  },
  {
    id: "north-carolina-at",
    name: "North Carolina A&T State University",
    city: "Greensboro",
    state: "NC",
    founded: 1891,
    history:
      "Founded in 1891, NC A&T is the nation's largest HBCU by enrollment and a leading producer of Black engineering graduates.",
    accentColor: "from-[#003087] to-[#B3A369]",
    logo: "/logos/north-carolina-at.png",
  },
  {
    id: "xavier-university-of-louisiana",
    name: "Xavier University of Louisiana",
    city: "New Orleans",
    state: "LA",
    founded: 1925,
    history:
      "Founded in 1925, Xavier is the nation's only historically Black and Catholic university, and a top producer of Black students who go on to medical school.",
    accentColor: "from-[#00205B] to-[#C4B581]",
    logo: "/logos/xavier-university-of-louisiana.png",
  },
  {
    id: "clark-atlanta-university",
    name: "Clark Atlanta University",
    city: "Atlanta",
    state: "GA",
    founded: 1988,
    history:
      "Formed in 1988 from the merger of Clark College and Atlanta University, CAU carries forward more than a century and a half of combined academic tradition.",
    accentColor: "from-[#C41230] to-[#1A1A1A]",
    logo: "/logos/clark-atlanta-university.png",
  },
  {
    id: "alabama-state-university",
    name: "Alabama State University",
    city: "Montgomery",
    state: "AL",
    founded: 1867,
    history:
      "Founded in 1867, Alabama State University has grown from a teacher's college into a comprehensive research university at the heart of the civil rights movement.",
    accentColor: "from-[#111111] to-[#C5A059]",
    logo: "/logos/alabama-state-university.png",
  },
  {
    id: "prairie-view-am-university",
    name: "Prairie View A&M University",
    city: "Prairie View",
    state: "TX",
    founded: 1876,
    history:
      "Founded in 1876, Prairie View A&M is one of the oldest public institutions of higher education in Texas, with strong programs in engineering and nursing.",
    accentColor: "from-[#4B116F] to-[#F2A900]",
    logo: "/logos/prairie-view-am-university.png",
  },
  {
    id: "southern-university",
    name: "Southern University",
    city: "Baton Rouge",
    state: "LA",
    founded: 1880,
    history:
      "Founded in 1880, Southern University is the flagship of the nation's only historically Black university system, anchoring Baton Rouge's Scotlandville community.",
    accentColor: "from-[#0033A0] to-[#F2A900]",
    logo: "/logos/southern-university.png",
  },
];
