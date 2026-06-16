# data/ — data model and collected data

The consortium data: the 12 institutions, the 5 workstreams, and the links between them (which institutions worked in which workstream, and what came out of it).

**Owner:** Kanayo (data model and schema). De'Andre consumes it for visualizations; Wendell's collection fills it.

```
data/
├── schema/         the data model (how institutions, workstreams, and participation are structured)
└── institutions/   collected institution and workstream data files
```

No benchmark data, credentials, or `.env` files here. Data files that hold real collected content are fine; secrets are not. See CONTRIBUTING.md.
