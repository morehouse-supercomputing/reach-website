# Data Model (Kanayo)

Your job this week: draft how we structure the consortium data, for discussion. You are modeling three things and the links between them.

## The three entities

- **Institutions** (the 12 HBCUs)
- **Workstreams** (the five: WS1 to WS5)
- **The link between them** (which institutions worked in which workstream, and what came out of it)

## Questions to answer here

- What fields describe an **institution**? (name, location, lat/long, logo, website, leads, ...)
- What fields describe a **workstream**? (name, focus, outcomes, lead institutions, ...)
- How do we represent an institution's **participation** in a workstream and its outcomes?
- Where does the data live for now? (structured files in the repo, or Firestore) Where does media live? (Cloud Storage bucket)

Coordinate with De'Andre (his visualizations decide what fields matter) and Wendell (he collects what you model).

_(Edit this on a branch named `backend/ideation`, open a Pull Request, and watch it go live here.)_
