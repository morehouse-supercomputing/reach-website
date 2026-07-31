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
    accentColor: "from-primary to-primary-container",
  },
  {
    id: "spelman-college",
    name: "Spelman College",
    city: "Atlanta",
    state: "GA",
    founded: 1881,
    history:
      "Founded in 1881, Spelman is a historically Black liberal arts college for women and a leading producer of Black women who go on to earn doctorates in STEM.",
    accentColor: "from-tertiary to-tertiary-container",
  },
  {
    id: "howard-university",
    name: "Howard University",
    city: "Washington",
    state: "DC",
    founded: 1867,
    history:
      "Founded in 1867 in the nation's capital, Howard is a research university spanning undergraduate, graduate, and professional programs across a wide range of disciplines.",
    accentColor: "from-secondary to-secondary-container",
  },
  {
    id: "hampton-university",
    name: "Hampton University",
    city: "Hampton",
    state: "VA",
    founded: 1868,
    history:
      "Founded in 1868, Hampton began as a school for formerly enslaved people and has grown into a comprehensive research university on Virginia's coast.",
    accentColor: "from-primary-container to-tertiary",
  },
  {
    id: "tuskegee-university",
    name: "Tuskegee University",
    city: "Tuskegee",
    state: "AL",
    founded: 1881,
    history:
      "Founded in 1881 by Booker T. Washington, Tuskegee built a legacy of applied science and engineering leadership, from George Washington Carver's research to the Tuskegee Airmen.",
    accentColor: "from-tertiary-container to-primary",
  },
];
