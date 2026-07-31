interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
}

// Chips stay low-contrast per DESIGN.md — differentiate posts by label, not hue
const CHIP_STYLE = "bg-secondary-container text-on-secondary-container";

const POSTS: Post[] = [
  {
    id: "1",
    title: "Researcher directory is live",
    date: "2026-07-30",
    excerpt:
      "The consortium directory now lists every researcher across the 12 partner institutions, searchable by name, school, role, and workstream.",
    tag: "Site Update",
  },
  {
    id: "2",
    title: "Institutions page added",
    date: "2026-07-30",
    excerpt:
      "A new page traces each partner institution's history alongside the scholars representing them on REACH.",
    tag: "Site Update",
  },
  {
    id: "3",
    title: "Data model drafted for institutions and workstreams",
    date: "2026-07-06",
    excerpt:
      "The relational schema behind the consortium's data — institutions, workstreams, contributors, and content — took its first shape this milestone.",
    tag: "Data",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-on-background transition-colors duration-300">
      <header className="relative overflow-hidden bg-gradient-to-b from-surface-container/60 to-transparent py-16 px-4 md:px-10 border-b border-outline-variant/60">
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-headline-md bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4">
            Updates
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            New additions and changes to the REACH consortium site.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-4 md:px-10 flex flex-col gap-6">
        {POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-300 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-label-xs px-2.5 py-1 rounded-full ${CHIP_STYLE}`}>
                {post.tag}
              </span>
              <time className="text-xs text-outline">{post.date}</time>
            </div>
            <h2 className="text-headline-md mb-2 text-on-surface">{post.title}</h2>
            <p className="text-body-md text-on-surface-variant">
              {post.excerpt}
            </p>
          </article>
        ))}
      </main>
    </div>
  );
}
