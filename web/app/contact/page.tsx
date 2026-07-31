interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
}

const EMAILS: ContactChannel[] = [
  {
    id: "general",
    label: "General Inquiries",
    value: "hello@reachconsortium.org",
    href: "mailto:hello@reachconsortium.org",
  },
  {
    id: "press",
    label: "Press",
    value: "press@reachconsortium.org",
    href: "mailto:press@reachconsortium.org",
  },
  {
    id: "partnerships",
    label: "Partnerships",
    value: "partnerships@reachconsortium.org",
    href: "mailto:partnerships@reachconsortium.org",
  },
];

const SOCIALS: ContactChannel[] = [
  {
    id: "x",
    label: "X (Twitter)",
    value: "@reachconsortium",
    href: "https://x.com/reachconsortium",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "/company/reach-consortium",
    href: "https://linkedin.com/company/reach-consortium",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@reach.consortium",
    href: "https://instagram.com/reach.consortium",
  },
  {
    id: "github",
    label: "GitHub",
    value: "@reach-consortium",
    href: "https://github.com/reach-consortium",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-on-background transition-colors duration-300">
      <header className="relative overflow-hidden bg-gradient-to-b from-surface-container/60 to-transparent py-16 px-4 md:px-10 border-b border-outline-variant/60">
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-headline-md bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Reach the REACH consortium team. The channels below are placeholders — real accounts are coming soon.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-4 md:px-10 flex flex-col gap-10">
        <section>
          <h2 className="text-label-xs text-outline mb-4">Email</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EMAILS.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-elevation-1 hover:shadow-elevation-2 hover:border-primary transition-all duration-300 transform hover:-translate-y-0.5 p-5 flex flex-col gap-1"
              >
                <span className="text-label-sm text-on-surface-variant">{channel.label}</span>
                <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors break-all">
                  {channel.value}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-label-xs text-outline mb-4">Social</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOCIALS.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-elevation-1 hover:shadow-elevation-2 hover:border-primary transition-all duration-300 transform hover:-translate-y-0.5 p-5 flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm text-on-surface-variant">{channel.label}</span>
                  <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                    {channel.value}
                  </span>
                </div>
                <svg
                  className="h-4 w-4 text-outline group-hover:text-primary transition-colors shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
