# REACH Website Plan

Our single source of truth for the summer. As we shape this document this week, it becomes the reference for everything we build.

## Week 1 is for planning

We ideate this week. The goal: by Thursday we have an agreed plan, and Monday we start building. No production code yet. This week is for thinking, investigating, and deciding together.

## How we work together

The pieces connect, so no one finalizes theirs alone:

```
Wendell finds/collects data  ->  Kanayo models it  ->  De'Andre visualizes it
                                                              |
                            Chase builds the site  <-  James designs it
```

## What we are building

A public site telling the REACH consortium story two ways:

- **By institution:** the 12 HBCU partners, who they are and what they contributed.
- **By workstream:** the five workstreams (WS1 Foundational AI, WS2 Applied AI, WS3 AI Safety, WS4 AI Policy, WS5 Dissemination), what each produced and which institutions drove them.

v1 is the consortium itself. The benchmark findings come later and plug into the same site, so no one is blocked waiting on data.

## Milestones

- **M0 Plan and set up** (this week): wireframes, data management plan, data collection plan, tools set up.
- **M1 Foundation** (pay Jul 6): site shell deployed, design system, database schema, intake sent, visualization prototyped.
- **M2 Build the consortium** (pay Jul 20): the 12 institutions and 5 workstreams live, map and profiles.
- **M3 Enrich and polish** (pay Aug 3): findings integrated, accessibility pass, performance, content complete.
- **M4 Launch and hand off** (pay Aug 24): production deploy, custom domain, docs, poster outlines.

## Role plans

Each of you owns a section. Edit it on a branch named `your-role/ideation`, open a Pull Request, and Dr. Scruse merges it.

### Newman, Data collection

This week, investigate before you collect:

1. Email Sharifa Vinson (sharifav@google.com, Google WS5 Lead) to find out what data already exists (cc me --ashley.scruse@morehouse.edu).
   1. Participants (and their institutions)
   2. Workstream group members
   3. Is there any results/data from other workstreams to show on the site
      1. whoever she can connect you with to get the information
   4. Is there a doc that has
2. Get access to what is there.
3. Collect what is missing (the 12 institution logos, headshots, bios).
4. Build an intake form only if the data does not exist.

Your notes:

### Kanayo, Data model

This week, draft how we structure institutions, workstreams, and the link between them. Decide where the data lives and where media lives.

Your notes:

- Cloud SQL
  - Dr. Scruse -- Setup the Cloud SQL access through the google clould project folder
- Cloud Storage Bucket
- Structure in draw SQL -- Schema

Needs for the website:

* Project Directory
* Profiles for 12 Schools
* Profiles each person

**INSTITUTIONS & WORKSTREAMS**

Institutions are our top-level org entities (publishers, partner orgs, internal desks) with each has an ID, name, and its own publishing permissions.

Workstreams are the pipelines that actually produce content (e.g. Investigations, Data Reports). Each Workstream belongs to one Institution, and each Institution can have many Workstreams. I'm keeping this 1-to-many for now instead of many-to-many for simplicity. If change is needed later on, we can reapproach this.

### De'Andre, Visualizations

This week, propose the visualizations (map of the 12 HBCUs, institution-by-workstream view, workstream outcomes) and list the data each one needs.

Your notes:

- We could create sections, in which we show how each HBCU contributed to the Reach project (simple description, photo, and how what they contributed to the project was significant).
- We could have visuals that outline what a workstream is, aswell as what schools were working on which workstream, and then outlining what each workstream planned to accomplish. For this, we would need to know what each HBCU contributed to their workstream, as well as potentially statements from the HBCU's about their time working on their stream.
- We could have graphs and charts that touch on why the project was needed, such as finding if theres stats on the amount of students that get racilaly profiled at institutions, or institutions that misuse culture as a way to "recruit" more students of color.
- Decide some interactive ways to tell the story
- What Google Cloud apps/software can we leverage to help make the story interactive?

### James, Wireframes and design

This week, sketch the key pages (home, institution profile, workstream page, explorer) and a design direction (Morehouse maroon and gold, WCAG AA).

Your notes:

- Figma (find out if Google has an equivalent)
- Google stitch <-- AI Agent that brings wireframes to life
- How do we honor every entities brand?

### Chase, Site architecture

This week, propose the routes and the stack (Next.js, TypeScript, Tailwind) and the deploy approach. Explore the Antigravity IDE so you can scaffold Monday.

Your notes:

- Decide the best tech stack
- Next.js is the team favorite

