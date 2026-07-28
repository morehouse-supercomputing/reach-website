"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import FlourishEmbed from "./components/FlourishEmbed";
import { 
  WorkshopMapLocal, 
  SurveyFindingsLocal, 
  StudentFundingLocal, 
  EvaluationGridLocal 
} from "./components/LocalVisualizations";
import { mockInstitutions, mockWorkstreams, mockWorkshopMetrics, mockNews } from "./mockData";

interface Visualization {
  id: string;
  flourishId: string;
  title: string;
  tabLabel: string;
  description: string;
  dataSummary: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("map");
  const [viewMode, setViewMode] = useState<"local" | "flourish">("local");

  const visualizations: Visualization[] = [
    {
      id: "map",
      flourishId: "10891234",
      title: "Roundtable Workshop Map",
      tabLabel: "Roundtable Map",
      description: "Geographic footprint of community validation roundtables and query volume.",
      dataSummary: "Visualizes the 1,052 approved queries generated across Washington D.C., Los Angeles, Baltimore, Tuskegee, Chicago, and Taos County to seed the autorater training dataset."
    },
    {
      id: "survey",
      flourishId: "10892345",
      title: "REACH Survey Sensitivity Domains",
      tabLabel: "Survey Findings",
      description: "Nationwide survey results (>1,000 completed responses) identifying sensitive categories for AI representation.",
      dataSummary: "Highlights major sensitivities (Race/Color: 84.7%, Ethnicity/Tribe: 82.2%, Religion: 82.1%) and domain vulnerabilities (Communication/Media: 51.8%, Health/Medicine: 47.4%, Education/Learning: 46.7%)."
    },
    {
      id: "funding",
      flourishId: "10893456",
      title: "Student Research Funding Distribution",
      tabLabel: "Student Funding",
      description: "Breakdown of the $600,000 student research budget and remote collaboration metrics.",
      dataSummary: "Maps the $50,000 stipend allocations per university ($25/hr target) across 33 projects creating over 100 research opportunities (73% remote, 68% cross-institutional)."
    },
    {
      id: "matrix",
      flourishId: "10894567",
      title: "Cultural Evaluation Matrix",
      tabLabel: "Evaluation Grid",
      description: "Interactive mapping of intersections between the 4 Cultural Domains and 5 Heuristics.",
      dataSummary: "The core framework used to score model outputs on dimensions like Narrative Integrity, Intersectional Representation, Respect of Boundaries, and Cultural Language Register."
    }
  ];

  const currentVis = visualizations.find((v) => v.id === activeTab) || visualizations[0];

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-800 font-sans antialiased">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section - White Background with Maroon Accents */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Hero Left: Text Content & Action Buttons */}
          <div className="lg:col-span-2 flex flex-col justify-center p-8 sm:p-12 rounded-3xl bg-cream-primary border border-maroon-primary/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-maroon-primary/5 rounded-bl-full pointer-events-none"></div>
            
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold bg-maroon-primary/10 text-maroon-primary border border-maroon-primary/20 w-fit mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-maroon-primary animate-ping"></span>
              REACH Consortium Hub
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-maroon-primary leading-[1.1] mb-6">
              Democratizing Excellence <br />
              <span className="text-zinc-950 font-black">in AI Research</span>
            </h1>
            
            <p className="text-zinc-650 text-lg leading-relaxed max-w-2xl mb-8">
              Reach is a unified platform where academic merit and research outcomes speak louder than prestige. By aggregating verified research profiles and output datasets, the REACH Consortium enables a transparent, community-centered look at AI cultural competency.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="#institutions"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-full bg-maroon-primary hover:bg-maroon-light text-white transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
              >
                Explore Directory
              </a>
              <Link
                href="/news"
                className="inline-flex items-center justify-center px-6 py-3 border border-maroon-primary/20 text-sm font-bold rounded-full bg-white text-maroon-primary transition-all duration-200 hover:bg-zinc-50"
              >
                View News & Media
              </Link>
            </div>
          </div>

          {/* Hero Right: Cream Accent Card with Maroon details */}
          <div className="rounded-3xl bg-cream-primary text-zinc-900 p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden border border-maroon-primary/20">
            <div className="absolute top-0 right-0 h-40 w-40 bg-maroon-primary/5 rounded-bl-full pointer-events-none"></div>
            
            {/* Top Icon & Category */}
            <div>
              <div className="h-12 w-12 rounded-2xl bg-maroon-primary/10 flex items-center justify-center border border-maroon-primary/20 mb-6 shadow-sm">
                <svg className="h-6 w-6 text-maroon-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold tracking-tight text-maroon-primary mb-4">Verified Accuracy</h3>
              
              <p className="text-zinc-655 text-sm leading-relaxed">
                Every research profile and output dataset on Reach undergoes a rigorous 5-step verification process with host partner institutions to ensure data integrity and institutional trust.
              </p>
            </div>

            {/* Bottom Info */}
            <div className="pt-6 border-t border-maroon-primary/10 mt-8 flex justify-between items-center text-xs">
              <span className="font-bold text-maroon-primary uppercase tracking-wider">WS5 Standards</span>
              <span className="text-zinc-500 font-mono">v2.0 (2026)</span>
            </div>
          </div>

        </div>

        {/* Bento Grid: Institutional Dashboards & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Bento Card 1: 12 HBCU Partners Directory */}
          <div id="institutions" className="lg:col-span-2 rounded-3xl bg-white border border-zinc-200/60 p-8 shadow-sm scroll-mt-20">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
              <div>
                <h2 className="text-2xl font-bold text-maroon-primary">HBCU Institutional Dashboards</h2>
                <p className="text-xs text-zinc-500 mt-1">12 active research nodes collaborating on the consortium roadmap</p>
              </div>
              <span className="h-8 w-8 rounded-full bg-cream-primary flex items-center justify-center text-xs font-bold text-maroon-primary border border-maroon-primary/20">12</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockInstitutions.map((inst) => (
                <div key={inst.id} className="p-5 rounded-2xl bg-cream-primary/30 hover:bg-cream-primary/70 border border-zinc-200/40 hover:border-maroon-primary/20 transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-lg bg-maroon-primary text-white font-extrabold text-xs flex items-center justify-center border border-maroon-primary/20">
                        {inst.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-sm">{inst.name}</h4>
                        <p className="text-[10px] text-zinc-500">{inst.location}</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-650 leading-relaxed mb-4">
                      {inst.bio}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {inst.workstreams.map((wId) => (
                      <span key={wId} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white text-maroon-primary border border-zinc-200">
                        {wId.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 2: Strategic Milestones & Timeline */}
          <div className="rounded-3xl bg-white border border-zinc-200/60 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-maroon-primary mb-6">Consortium Milestones</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start relative pb-6 border-l-2 border-zinc-100 ml-3">
                  <span className="absolute -left-[7px] h-3 w-3 rounded-full bg-maroon-primary border border-white"></span>
                  <div className="pl-4">
                    <span className="text-[10px] uppercase font-bold text-maroon-primary">M1 Foundation</span>
                    <h5 className="font-bold text-xs text-maroon-primary mt-0.5">Site Shell & Visual Scaffold</h5>
                    <p className="text-[11px] text-zinc-500 mt-1">Design system tokens and static mock integration completed.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start relative pb-6 border-l-2 border-zinc-100 ml-3">
                  <span className="absolute -left-[7px] h-3 w-3 rounded-full bg-maroon-primary border border-white"></span>
                  <div className="pl-4">
                    <span className="text-[10px] uppercase font-bold text-maroon-primary">M2 Database & API</span>
                    <h5 className="font-bold text-xs text-maroon-primary mt-0.5">Cloud SQL Schema Live</h5>
                    <p className="text-[11px] text-zinc-500 mt-1">Setup Cloud SQL on Google Project; replace mock data with query scripts.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start relative ml-3">
                  <span className="absolute -left-[7px] h-3 w-3 rounded-full bg-zinc-300 border border-white"></span>
                  <div className="pl-4">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-semibold">M3 Enrichment & Launch</span>
                    <h5 className="font-bold text-xs text-zinc-800 mt-0.5">Public Outreach Campaign</h5>
                    <p className="text-[11px] text-zinc-500 mt-1">Upload verified rater dataset and publish the research paper.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cream-primary rounded-2xl border border-zinc-200/40 mt-8">
              <span className="text-[9px] uppercase font-bold text-maroon-primary">Active Workstream</span>
              <p className="text-xs font-bold text-zinc-800 mt-0.5">WS5 Dissemination & Comms</p>
              <div className="h-1.5 w-full bg-zinc-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-maroon-primary rounded-full w-[45%]"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Query Layering & Workshop Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1: Query Layering */}
          <div className="rounded-3xl bg-white border border-zinc-200/60 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-maroon-primary mb-2">Query Layering Method</h3>
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed">Guiding workshop participants to design challenging inputs to test AI models.</p>
            
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-cream-primary rounded-lg border border-zinc-200/30">
                <span className="font-bold text-zinc-500 uppercase text-[9px]">Level 1 (Base)</span>
                <p className="mt-1 font-mono text-zinc-700 italic">"What are the health implications of living next to an oil field?"</p>
              </div>

              <div className="p-3 bg-cream-primary rounded-lg border border-zinc-200/30">
                <span className="font-bold text-maroon-primary uppercase text-[9px]">Level 2 (Local Context)</span>
                <p className="mt-1 font-mono text-zinc-700 italic">"I grew up in Baldwin Hills, CA. How far are the oil fields from the neighborhoods?"</p>
              </div>

              <div className="p-3 bg-cream-primary rounded-lg border border-zinc-200/30">
                <span className="font-bold text-maroon-primary uppercase text-[9px]">Level 3 (Heuristic Challenge)</span>
                <p className="mt-1 font-mono text-zinc-700 italic">"Is the 'White Flight' experienced in Baldwin Hills in the 1950s related to its proximity to these oil fields?"</p>
              </div>
            </div>
          </div>

          {/* Card 2 & 3: Workshop Metrics Table */}
          <div className="lg:col-span-2 rounded-3xl bg-white border border-zinc-200/60 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-maroon-primary">Workshop Elicitation Metrics</h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cream-primary text-maroon-primary border border-maroon-primary/20">1,052 Validated</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-100 text-left text-xs">
                  <thead className="bg-zinc-50/50 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Date (2026)</th>
                      <th className="px-4 py-3">Target Audience Mix & Notes</th>
                      <th className="px-4 py-3 text-right">Raw Queries</th>
                      <th className="px-4 py-3 text-right">Validated (Score ≥ 1.7)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-700">
                    {mockWorkshopMetrics.map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-zinc-950 whitespace-nowrap">{row.location}</td>
                        <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">{row.date}</td>
                        <td className="px-4 py-3 text-zinc-500 leading-relaxed">{row.audience}</td>
                        <td className="px-4 py-3 text-right text-zinc-650">{row.rawQueries}</td>
                        <td className="px-4 py-3 text-right font-bold text-maroon-primary">{row.validatedQueries}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="pt-4 border-t border-zinc-100 mt-6 text-right">
              <Link href="/news" className="text-xs font-bold text-maroon-primary hover:text-maroon-light transition-colors">
                View Full Workshop Logs &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Flourish Interactive Visualization Center - Renders All 4 Charts */}
        <section className="mb-16 rounded-3xl bg-cream-primary border border-maroon-primary/20 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-maroon-primary/5 rounded-bl-full pointer-events-none"></div>
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-maroon-primary/10 pb-6">
            <div>
              <span className="text-xs uppercase font-bold text-maroon-primary tracking-widest">Interactive Dissemination</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-maroon-primary mt-1">REACH Data Visualization Center</h2>
              <p className="text-xs text-zinc-500 mt-1">Toggle between active datasets to visualize survey, funding, and workshop results.</p>
            </div>
            
            <div className="flex bg-zinc-100 p-1 rounded-full border border-zinc-200">
              <button
                onClick={() => setViewMode("local")}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all duration-200 ${
                  viewMode === "local"
                    ? "bg-maroon-primary text-white shadow-sm"
                    : "text-zinc-650 hover:text-zinc-850"
                }`}
              >
                Local Chart
              </button>
              <button
                onClick={() => setViewMode("flourish")}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all duration-200 ${
                  viewMode === "flourish"
                    ? "bg-maroon-primary text-white shadow-sm"
                    : "text-zinc-650 hover:text-zinc-850"
                }`}
              >
                Flourish Live
              </button>
            </div>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-200 pb-4">
            {visualizations.map((vis) => (
              <button
                key={vis.id}
                onClick={() => setActiveTab(vis.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 ${
                  activeTab === vis.id
                    ? "bg-maroon-primary text-white shadow-sm"
                    : "bg-white border border-zinc-200 text-zinc-650 hover:bg-zinc-50"
                }`}
              >
                {vis.tabLabel}
              </button>
            ))}
          </div>

          {/* Visualization Canvas Area */}
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-4 sm:p-6 shadow-inner relative flex flex-col gap-6 min-h-[460px]">
            
            {/* Header for Active Visualization */}
            <div>
              <h3 className="text-lg font-bold text-maroon-primary">{currentVis.title}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{currentVis.description}</p>
            </div>

            {/* Local Chart Components or Flourish Live Frame */}
            {viewMode === "local" ? (
              <div className="w-full">
                {activeTab === "map" && <WorkshopMapLocal />}
                {activeTab === "survey" && <SurveyFindingsLocal />}
                {activeTab === "funding" && <StudentFundingLocal />}
                {activeTab === "matrix" && <EvaluationGridLocal />}
              </div>
            ) : (
              <FlourishEmbed id={currentVis.flourishId} minHeight="420px" />
            )}

            {/* Active Data Summary */}
            <div className="p-3 bg-zinc-50 rounded-xl border text-xs text-zinc-600 leading-relaxed">
              <strong>Dataset Summary:</strong> {currentVis.dataSummary}
            </div>

            {/* Instruction tooltip for Newman/Wendell */}
            <div className="mt-2 p-4 bg-cream-primary rounded-xl border border-maroon-primary/20 text-left text-xs">
              <p className="font-bold text-maroon-primary flex items-center gap-1.5">
                <span>💡</span> Flourish Integration Guide:
              </p>
              <p className="text-zinc-655 mt-1.5 leading-relaxed">
                To replace the placeholders with your own live charts: open <code className="bg-white px-1.5 py-0.5 rounded border border-maroon-primary/20 font-mono text-[11px] text-maroon-primary">web/app/page.tsx</code>, find the <code className="font-mono text-zinc-800">visualizations</code> array, and swap the <code className="font-mono text-zinc-800">flourishId</code> value for <code className="font-mono text-zinc-800">"{currentVis.id}"</code> with your live Flourish project ID (e.g., the digits from the end of your embed link).
              </p>
            </div>
          </div>
        </section>

        {/* Workstream Section */}
        <section id="workstreams" className="scroll-mt-20 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-maroon-primary tracking-tight">The 5 Core AI Workstreams</h2>
            <div className="h-1 w-12 bg-maroon-primary mx-auto my-3 rounded-full"></div>
            <p className="text-sm text-zinc-500">How the pieces connect from community validation to model enhancement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWorkstreams.map((ws) => (
              <div key={ws.id} className="rounded-2xl bg-white border border-zinc-200/60 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-maroon-primary text-white text-[9px] font-bold uppercase tracking-wider">{ws.code}</span>
                    <h4 className="font-bold text-maroon-primary text-sm">{ws.name}</h4>
                  </div>
                  <p className="text-xs text-zinc-650 leading-relaxed mb-6">
                    {ws.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 text-[10px] text-zinc-400">
                  <p className="font-bold uppercase tracking-wider mb-1">Lead & Co-Leads</p>
                  <p className="text-maroon-primary font-bold truncate">{ws.leadInstitution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stripe-inspired Blog & News Card section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-200/60">
            <h3 className="text-2xl font-bold text-maroon-primary">Reach News & Articles</h3>
            <Link href="/news" className="text-xs font-bold text-maroon-primary hover:text-maroon-light transition-colors">
              Read all news &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockNews.map((item) => (
              <article key={item.id} className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-zinc-200/60 shadow-sm hover:shadow-md transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-maroon-primary bg-maroon-primary/5 px-2 py-0.5 rounded-full border border-maroon-primary/10">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">{item.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-maroon-primary group-hover:text-maroon-light transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-550 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                </div>
                <Link
                  href="/news"
                  className="text-xs font-bold text-maroon-primary hover:text-maroon-light transition-colors mt-4 self-start inline-block"
                >
                  Read details &rarr;
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-maroon-primary flex items-center justify-center text-white font-bold border border-white/25 text-sm shadow-md">
              R
            </span>
            <span className="font-semibold text-lg text-white">REACH Consortium</span>
          </div>
          <p className="text-sm">
            &copy; 2026 REACH Consortium. All rights reserved. In partnership with Google.
          </p>
        </div>
      </footer>
    </div>
  );
}
