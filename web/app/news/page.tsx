"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  WorkshopMapLocal,
  SurveyFindingsLocal,
  StudentFundingLocal,
  EvaluationGridLocal,
} from "../components/LocalVisualizations";
import { mockNews, NewsItem } from "../mockData";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const categories = ["All", "Press Release", "Consortium News", "Media Asset"];

  const filteredNews = selectedCategory === "All"
    ? mockNews
    : mockNews.filter((item) => item.category === selectedCategory);

  const emailTemplate = {
    to: "sharifav@google.com",
    cc: "ashley.scruse@morehouse.edu",
    subject: "REACH Consortium Website - Existing Data & Media Assets Inquiry",
    body: `Dear Sharifa,

I hope this email finds you well. 

I am Newman from the REACH Consortium web build team, leading the data collection efforts for our website launch. We are currently mapping out the site to showcase the achievements of our 12 HBCU partner institutions and 5 workstreams.

Could you please let us know what consortium data already exists and share access to directories containing:
1. Current list of participants and their associated institutions
2. Workstream group memberships/ rosters
3. Existing media assets (logos, leadership bios, headshots, or student profiles)
4. Any prior results or research data we can visualize on the site

If some of these assets are missing or if there is a primary contact we should connect with directly, please let us know.

Thank you for your guidance and support!

Best regards,
Newman
REACH Consortium Web Build Team`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-800 font-sans antialiased">
      {/* Navigation */}
      <Navbar />

      {/* Light Header matching the rest of the site */}
      <header className="relative bg-cream-primary border-b border-zinc-200/60 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <span className="inline-flex items-center gap-1 py-0.5 px-2.5 rounded-full text-[10px] font-bold bg-maroon-primary/10 text-maroon-primary border border-maroon-primary/20 w-fit mb-3">
            Workstream 5 Dissemination
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-maroon-primary">
            News & Communications Hub
          </h1>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base leading-relaxed">
            Updates from the REACH Consortium, press releases, media kits, and data collection outreach tools.
          </p>
        </div>
      </header>

      {/* Main Feed Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Feed Section (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-wrap gap-2 items-center justify-between border-b pb-4 border-zinc-200">
              <h2 className="text-2xl font-bold text-maroon-primary">Latest Updates</h2>
              
              {/* Category Filter */}
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-maroon-primary text-white"
                        : "bg-white border border-zinc-200 text-zinc-650 hover:bg-zinc-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* News list: featured hero + grid */}
            {filteredNews.length > 0 && (
              <>
                <button
                  onClick={() => setSelectedNews(filteredNews[0])}
                  className="w-full text-left rounded-3xl bg-maroon-primary p-8 sm:p-10 shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-bl-full pointer-events-none"></div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-white border border-white/20">
                      Featured &middot; {filteredNews[0].category}
                    </span>
                    <time className="text-xs text-white/70 font-medium">{filteredNews[0].date}</time>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                    {filteredNews[0].title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-2xl mb-4">
                    {filteredNews[0].excerpt}
                  </p>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    Read Full Details
                    <span>&rarr;</span>
                  </span>
                </button>

                {filteredNews.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNews.slice(1).map((item) => (
                      <article
                        key={item.id}
                        className="rounded-2xl bg-white border border-zinc-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-maroon-primary/5 text-maroon-primary border border-maroon-primary/10">
                              {item.category}
                            </span>
                            <time className="text-xs text-zinc-400 font-medium">{item.date}</time>
                          </div>
                          <h3 className="text-xl font-bold text-maroon-primary mb-2">
                            {item.title}
                          </h3>
                          <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                            {item.excerpt}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedNews(item)}
                          className="text-xs font-bold text-maroon-primary hover:text-maroon-light transition-colors self-start flex items-center gap-1"
                        >
                          Read Full Details
                          <span>&rarr;</span>
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Media Kit and Communication Tools Sidebar (1/3 width) */}
          <div className="space-y-8">
            
            {/* Download Media Kit */}
            <section className="rounded-2xl bg-white border border-zinc-200/60 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-maroon-primary/5 rounded-bl-full"></div>
              <h3 className="text-lg font-bold text-maroon-primary mb-4 flex items-center gap-2">
                <span>📁</span> Media Kit Assets
              </h3>
              <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                Brand resources and styles to maintain visual identity across all 12 consortium HBCU sites.
              </p>
              
              <div className="space-y-4">
                <div className="p-3 bg-cream-primary rounded-lg border border-zinc-200/50">
                  <span className="text-[10px] uppercase font-bold text-zinc-450">Maroon Code (Secondary)</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-4 w-4 rounded bg-maroon-primary inline-block"></span>
                    <span className="font-mono text-xs text-zinc-700">#7A1C2C</span>
                  </div>
                </div>

                <div className="p-3 bg-cream-primary rounded-lg border border-zinc-200/50">
                  <span className="text-[10px] uppercase font-bold text-zinc-450">Cream Code (Primary/Surface)</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-4 w-4 rounded bg-cream-primary inline-block border border-zinc-200"></span>
                    <span className="font-mono text-xs text-zinc-700">#FCFAF6</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Downloading Media Pack (ZIP)... (Mock action)")}
                  className="w-full py-2.5 px-4 bg-maroon-primary hover:bg-maroon-light text-white font-semibold text-xs rounded-lg transition-all shadow-sm text-center inline-block"
                >
                  Download Media Pack (.zip)
                </button>
              </div>
            </section>

            {/* Email Intake Tool */}
            <section className="rounded-2xl bg-white border border-zinc-200/60 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-maroon-primary mb-3 flex items-center gap-2">
                <span>✉️</span> Intake Outreach
              </h3>
              <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                Template email for Newman's assignment to query existing data assets from Google's WS5 Lead.
              </p>
              
              <div className="space-y-3">
                <div className="text-xs border rounded-lg bg-cream-primary p-3 max-h-48 overflow-y-auto font-mono text-zinc-650 whitespace-pre-wrap leading-relaxed border-zinc-200/50">
                  <strong>To:</strong> {emailTemplate.to}<br />
                  <strong>CC:</strong> {emailTemplate.cc}<br />
                  <strong>Subject:</strong> {emailTemplate.subject}<br /><br />
                  {emailTemplate.body}
                </div>
                
                <button
                  onClick={() => copyToClipboard(emailTemplate.body)}
                  className="w-full py-2.5 px-4 bg-maroon-primary hover:bg-maroon-light text-white font-semibold text-xs rounded-lg transition-all shadow-sm text-center flex items-center justify-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <span className="text-emerald-500">✓</span> Copied!
                    </>
                  ) : (
                    <>
                      <span>📋</span> Copy Email Template
                    </>
                  )}
                </button>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-2xl bg-white border border-zinc-200/60 max-w-3xl w-full p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-xl font-bold"
            >
              &times;
            </button>
            <div className="flex gap-2 items-center mb-4">
              <span className="px-2.5 py-0.5 rounded bg-maroon-primary text-white text-[10px] font-bold">
                {selectedNews.category}
              </span>
              <span className="text-xs text-zinc-400">{selectedNews.date}</span>
            </div>
            <h3 className="text-2xl font-black text-maroon-primary mb-4">{selectedNews.title}</h3>
            <div className="h-px w-full bg-zinc-100 my-4"></div>
            <p className="text-zinc-650 text-sm leading-relaxed whitespace-pre-line">
              {selectedNews.content}
            </p>
            {selectedNews.localViz && (
              <div className="mt-6">
                {selectedNews.localViz === "workshopMap" && <WorkshopMapLocal />}
                {selectedNews.localViz === "survey" && <SurveyFindingsLocal />}
                {selectedNews.localViz === "funding" && <StudentFundingLocal />}
                {selectedNews.localViz === "matrix" && <EvaluationGridLocal />}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer className="mt-16" />
    </div>
  );
}
