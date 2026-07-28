"use client";

import { useState } from "react";
import { mockWorkshopMetrics } from "../mockData";

// --- 1. WORKSHOP MAP ---
export function WorkshopMapLocal() {
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);

  // Pixel-exact coordinates derived from the SVG path data (959x593 viewBox).
  // Each city's position was extracted from the state path start points and
  // known geographic offsets within each state, then converted to percentages
  // as (pixelX / 959 * 100) and (pixelY / 593 * 100).
  const nodes = [
    { name: "Los Angeles, CA",    x: "9.6%",  y: "62.4%", raw: 471, val: 337, date: "Mar 11" },   // SVG ~92, 370
    { name: "Taos County, NM",    x: "31.3%", y: "58.2%", raw: "Forthcoming", val: "TBD", date: "Jun 9" },  // SVG ~300, 345
    { name: "Chicago, IL",        x: "64.6%", y: "43.8%", raw: 522, val: 278, date: "Apr 22" },   // SVG ~620, 260
    { name: "Tuskegee, AL",       x: "68.8%", y: "70.8%", raw: 347, val: 137, date: "Apr 17" },   // SVG ~660, 420
    { name: "Washington, D.C.",   x: "83.8%", y: "42.7%", raw: 122, val: 62, date: "Feb 2-3" },   // SVG ~804, 253
    { name: "Baltimore, MD",      x: "84.5%", y: "41.7%", raw: 366, val: 238, date: "Mar 24" }    // SVG ~810, 247
  ];

  return (
    <div className="relative w-full bg-zinc-50 rounded-2xl border border-zinc-200/50 flex flex-col justify-between p-6 overflow-hidden">
      <div>
        <h4 className="text-sm font-bold text-maroon-primary">Geographic Footprint & Query Capture</h4>
        <p className="text-[11px] text-zinc-500">Hover over active roundtable nodes to inspect query metrics.</p>
      </div>

      {/* Map container — no padding so absolute % coords map 1:1 to the SVG */}
      <div className="relative w-full max-w-[700px] aspect-[959/593] mx-auto mt-6 bg-white rounded-xl border border-zinc-200/40 shadow-inner overflow-hidden">
        <img 
          src="/usa-map.svg" 
          alt="United States Outline Map" 
          className="absolute inset-0 w-full h-full object-fill opacity-25 select-none pointer-events-none filter grayscale"
        />

        {/* Pulsing Nodes */}
        {nodes.map((node, idx) => (
          <div
            key={idx}
            style={{ left: node.x, top: node.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <span className="absolute -left-2.5 -top-2.5 inline-flex h-5 w-5 rounded-full bg-maroon-primary/20 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-maroon-primary border border-white shadow-sm"></span>
            
            {/* City label */}
            <span className="absolute left-3 top-[-8px] hidden sm:inline-block bg-white px-2 py-0.5 rounded border text-[9px] font-bold text-zinc-700 whitespace-nowrap shadow-sm group-hover:border-maroon-primary">
              {node.name.split(",")[0]}
            </span>
          </div>
        ))}

        {/* Hover Tooltip */}
        {hoveredNode && (
          <div className="absolute top-2 right-2 bg-white p-4 rounded-xl border border-maroon-primary/30 shadow-lg max-w-xs z-20 text-xs animate-fadeIn">
            <h5 className="font-bold text-maroon-primary border-b pb-1 mb-2">{hoveredNode.name}</h5>
            <div className="space-y-1 text-zinc-600">
              <p><strong>Date:</strong> {hoveredNode.date}, 2026</p>
              <p><strong>Raw Queries:</strong> <span className="font-mono">{hoveredNode.raw}</span></p>
              <p><strong>Validated (Score ≥ 1.7):</strong> <span className="font-mono text-maroon-primary font-bold">{hoveredNode.val}</span></p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-[10px] text-zinc-400 border-t pt-3 mt-6">
        <span>Map nodes reflect validated research cohorts.</span>
        <span>Total: ~1,828 Raw / 1,052 Validated Queries</span>
      </div>
    </div>
  );
}

// --- 2. SURVEY FINDINGS ---
export function SurveyFindingsLocal() {
  const sensitivities = [
    { label: "Race / Color representation sensitivity", pct: 84.7, cat: "Demographics" },
    { label: "Ethnicity / Tribe representation sensitivity", pct: 82.2, cat: "Demographics" },
    { label: "Religion & Spiritual representation sensitivity", pct: 82.1, cat: "Demographics" },
    { label: "Communications & Public Discourse vulnerability", pct: 51.8, cat: "Domains" },
    { label: "Health & Medical information vulnerability", pct: 47.4, cat: "Domains" },
    { label: "Education & Learning materials vulnerability", pct: 46.7, cat: "Domains" }
  ];

  return (
    <div className="w-full bg-zinc-50 rounded-2xl border border-zinc-200/50 p-6 flex flex-col justify-between min-h-[400px]">
      <div>
        <h4 className="text-sm font-bold text-maroon-primary">REACH Survey Sensitivity Domains</h4>
        <p className="text-[11px] text-zinc-500 mb-6">Percentage of respondents ranking categories as highly sensitive to AI bias/harms.</p>
      </div>

      <div className="space-y-5">
        {sensitivities.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-700">{item.label}</span>
              <span className="text-maroon-primary font-mono font-bold">{item.pct}%</span>
            </div>
            <div className="h-3 w-full bg-zinc-200 rounded-full overflow-hidden border border-zinc-300/10">
              <div 
                style={{ width: `${item.pct}%` }}
                className={`h-full rounded-full transition-all duration-1000 ${
                  item.pct > 80 ? "bg-maroon-primary" : "bg-maroon-light/70"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[10px] text-zinc-450 border-t pt-4 mt-6">
        Based on N &gt; 1,000 completed multiracial survey submissions overseen by WS1.
      </div>
    </div>
  );
}

// --- 3. STUDENT FUNDING ---
export function StudentFundingLocal() {
  const stats = [
    { value: "$600,000", label: "Collective Research Budget", detail: "$50,000 allocated per partner school" },
    { value: "$25.00/hr", label: "Standardized Student Pay", detail: "Assuming 200 hours over 10-week summer" },
    { value: "33 Projects", label: "Faculty Research Submissions", detail: "Across the 12 active partner nodes" },
    { value: "100+", label: "Research Opportunities Created", detail: "Stipends disbursed through WS5" }
  ];

  const highlights = [
    { label: "Fully Remote/Accessible", pct: 73 },
    { label: "Cross-Institutional Collaboration", pct: 68 }
  ];

  return (
    <div className="w-full bg-zinc-50 rounded-2xl border border-zinc-200/50 p-6 flex flex-col justify-between min-h-[400px]">
      <div>
        <h4 className="text-sm font-bold text-maroon-primary">Student Research Pipeline Performance</h4>
        <p className="text-[11px] text-zinc-500 mb-6">Overview of funding, stipends, and participant metrics administered by WS5.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-4 bg-white rounded-xl border border-zinc-200/60 shadow-sm">
            <span className="text-xl sm:text-2xl font-black text-maroon-primary block">{stat.value}</span>
            <span className="text-xs font-bold text-zinc-800 block mt-1">{stat.label}</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">{stat.detail}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 border-t pt-6">
        {highlights.map((h, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-700">{h.label}</span>
              <span className="text-maroon-primary">{h.pct}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
              <div 
                style={{ width: `${h.pct}%` }}
                className="h-full bg-maroon-primary rounded-full"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 4. CULTURAL TOPICS GRID ---
export function EvaluationGridLocal() {
  const [selectedCell, setSelectedCell] = useState<any | null>(null);

  const domains = [
    { id: "1", name: "Entertainment & Media", desc: "Creative storytelling, narrative arcs, and escaping monolithic depictions." },
    { id: "2", name: "Health & Well-being", desc: "Traditional medicine systems, systemic disparities, and healthcare accessibility." },
    { id: "3", name: "Education & Learning", desc: "Socio-political context in classrooms, curriculum transmission, historical omissions." },
    { id: "4", name: "Communications", desc: "Dialects protection, public discourse safety, town-hall messaging." }
  ];

  const heuristics = [
    { id: "A", name: "Historical Framing", lens: "Contextualization of systemic issues vs. ahistorical presentation." },
    { id: "B", name: "Shared Moments", lens: "Community rituals, celebrations, and regional customs." },
    { id: "C", name: "Sacred & Sensitive", lens: "Protecting spiritual beliefs, practices, and community taboos." },
    { id: "D", name: "Authenticity & Tropes", lens: "Avoiding over-generalization and harmful caricature patterns." },
    { id: "E", name: "Cultural Expression", lens: "Socio-lects (AAVE, slang), artistic references, and clothing symbols." }
  ];

  const handleCellClick = (d: any, h: any) => {
    setSelectedCell({
      domainName: d.name,
      heuristicName: h.name,
      description: `Evaluates how AI models process ${d.name.toLowerCase()} through the lens of ${h.name.toLowerCase()} (${h.lens.toLowerCase()}).`,
      examplePrompt: `Domain: ${d.name}\nHeuristic: ${h.name}\nEvaluation focus: Analyzing potential bias and alignment.`
    });
  };

  return (
    <div className="w-full bg-zinc-50 rounded-2xl border border-zinc-200/50 p-6 flex flex-col justify-between min-h-[400px]">
      <div>
        <h4 className="text-sm font-bold text-maroon-primary font-sans">Cultural Evaluation Matrix</h4>
        <p className="text-[11px] text-zinc-500 mb-6">Click any intersection block to inspect the automatic evaluation lens.</p>
      </div>

      <div className="grid grid-cols-5 gap-2 my-2 overflow-x-auto min-w-[320px]">
        {/* Simple layout grid */}
        {domains.map((d) => (
          <div key={d.id} className="contents">
            {heuristics.map((h) => (
              <button
                key={`${d.id}-${h.id}`}
                onClick={() => handleCellClick(d, h)}
                className="p-3 bg-white hover:bg-cream-primary hover:border-maroon-primary/45 rounded-xl border border-zinc-200/60 transition-all text-left flex flex-col justify-between shadow-sm min-h-[76px]"
              >
                <span className="font-mono text-[9px] font-bold text-maroon-primary">{d.id}{h.id}</span>
                <span className="text-[10px] text-zinc-700 font-medium leading-tight truncate w-full">{h.name.split(" ")[0]} x {d.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Selected Cell Detail Box */}
      {selectedCell ? (
        <div className="p-4 bg-white rounded-xl border border-maroon-primary/25 text-xs animate-fadeIn mt-4">
          <h5 className="font-bold text-maroon-primary">{selectedCell.heuristicName} x {selectedCell.domainName}</h5>
          <p className="text-zinc-650 mt-1">{selectedCell.description}</p>
          <pre className="mt-3 p-2.5 bg-zinc-50 rounded border border-zinc-150 font-mono text-[10px] text-zinc-750 whitespace-pre-wrap leading-relaxed">
            {selectedCell.examplePrompt}
          </pre>
        </div>
      ) : (
        <div className="p-4 bg-white rounded-xl border border-dashed text-center text-xs text-zinc-400 mt-4">
          Select an intersection cell above to display the evaluation details.
        </div>
      )}
    </div>
  );
}
