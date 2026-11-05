import { useRef, type ReactNode } from "react";
import { Link } from "../lib/router";
import { useScrollProgress } from "../lib/motion";

type Project = {
  n: string;
  name: string;
  cat: string;
  year: string;
  color: string;        // bg-* token
  ink: string;          // contrast text token, paper or ink
  outcome: string;
  challenge: string;
  approach: string;
  motion: string;
  system: string;
  impact: string;
  hero: "split" | "diagram" | "orbit" | "stack";
};

const projects: Project[] = [
  {
    n: "01", name: "MERIDIAN ATELIER", cat: "Brand · Ecommerce", year: "2025",
    color: "bg-signal", ink: "text-paper", outcome: "+184% conversion",
    challenge: "A heritage furniture house with an outdated catalog and zero editorial voice.",
    approach: "Magazine-grade layout system, cinematic product films, custom CMS.",
    motion: "Page transitions choreographed to product reveals.",
    system: "Headless commerce + custom CRM bridge for showroom leads.",
    impact: "184% conv. lift, 3.4x avg session.",
    hero: "split",
  },
  {
    n: "02", name: "NORTH FIELD CRM", cat: "System · Automation", year: "2024",
    color: "bg-electric", ink: "text-paper", outcome: "−62% manual ops",
    challenge: "Sales ops drowning in spreadsheets across three regions.",
    approach: "Unified data model. Role-based dashboards. Quiet UI.",
    motion: "Restrained — motion confirms, never decorates.",
    system: "Event-driven workflows, AI lead scoring, audit logs.",
    impact: "62% less manual work; payback in 11 weeks.",
    hero: "diagram",
  },
  {
    n: "03", name: "KAIRO STUDIO", cat: "Identity · Motion", year: "2024",
    color: "bg-acid", ink: "text-ink", outcome: "Awwwards SOTD",
    challenge: "An industrial design studio invisible online.",
    approach: "Editorial portfolio with sculptural motion language.",
    motion: "GSAP-driven mass and physics, never juice.",
    system: "Notion-driven CMS, automated case-study deploys.",
    impact: "SOTD + 9 inbound RFPs in 30 days.",
    hero: "orbit",
  },
  {
    n: "04", name: "HARBOR & CO.", cat: "Ecommerce · Brand", year: "2023",
    color: "bg-orange", ink: "text-ink", outcome: "+72% AOV",
    challenge: "DTC apparel brand stuck in a Shopify template.",
    approach: "Editorial storefront with seasonal lookbook engine.",
    motion: "Soft, fabric-like transitions; product tactile-ness.",
    system: "Custom subscriptions + warehouse webhooks.",
    impact: "72% AOV uplift, 41% repeat rate.",
    hero: "stack",
  },
];

export default function Work() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-ink/10 bg-paper">
        <div className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full border border-ink/15 spin-slow" />
        <div className="mx-auto max-w-[1440px] px-6 py-24">
          <p className="text-mono-label text-gray">INDEX / 2023–2025</p>
          <h1 className="text-display mt-6" style={{ fontSize: "clamp(80px, 16vw, 260px)", lineHeight: 0.85 }}>
            THE <span className="text-signal">WORK</span>.
          </h1>
          <div className="mt-8 grid grid-cols-12 gap-4 border-t border-ink pt-6 text-mono-label">
            <span className="col-span-2">{projects.length} PROJECTS</span>
            <span className="col-span-2 text-gray">4 INDUSTRIES</span>
            <span className="col-span-2 text-gray">3 CONTINENTS</span>
            <span className="col-span-6 text-right text-gray">SCROLL TO READ →</span>
          </div>
        </div>
      </section>

      {projects.map((p) => (
        <ProjectBlock key={p.n} project={p} />
      ))}

      <section className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-[1440px] px-6">
          <p className="text-mono-label text-paper/60">NEXT</p>
          <Link to="/contact" className="text-display mt-4 block hover:text-acid" style={{ fontSize: "clamp(56px, 10vw, 160px)", lineHeight: 0.85 }}>
            START A PROJECT →
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProjectBlock({ project: p }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, (p) => {
    if (hero.current) hero.current.style.transform = `translate3d(0, ${40 - 80 * p}px, 0)`;
  });

  return (
    <article ref={ref} className="relative border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-5">
            <p className="text-mono-label text-gray">PROJECT {p.n} · {p.year}</p>
            <h2 className="text-display mt-4" style={{ fontSize: "clamp(48px, 8vw, 128px)", lineHeight: 0.85 }}>{p.name}</h2>
            <p className="text-mono-label mt-4">{p.cat}</p>
          </div>
          <div ref={hero} className="col-span-12 md:col-span-7 will-change-transform">
            <HeroComposition project={p} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 border-t border-ink pt-10">
          {[
            ["CHALLENGE", p.challenge],
            ["APPROACH", p.approach],
            ["MOTION", p.motion],
            ["SYSTEM", p.system],
            ["OUTCOME", p.impact],
          ].map(([k, v]) => (
            <div key={k} className="col-span-12 md:col-span-4">
              <p className="text-mono-label text-gray">{k}</p>
              <p className="text-display mt-3 text-2xl leading-snug">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ───────── Unique editorial heroes per project ───────── */

function HeroFrame({ children, label, outcome, ink }: { children: ReactNode; label: string; outcome: string; ink: string }) {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden border border-ink">
      {children}
      <span className={`absolute left-6 top-6 z-10 text-mono-label ${ink}`}>{label}</span>
      <span className={`absolute right-6 top-6 z-10 text-mono-label ${ink}`}>{outcome}</span>
      <span className="absolute bottom-0 left-0 h-[6px] w-full bg-ink" />
    </div>
  );
}

function HeroComposition({ project: p }: { project: Project }) {
  if (p.hero === "split") {
    // Editorial split: massive numeral + vertical band + cropped circle stamp
    return (
      <HeroFrame label={`№ ${p.n}`} outcome={p.outcome} ink={p.ink}>
        <div className={`absolute inset-0 ${p.color}`} />
        <div className="absolute left-0 top-0 h-full w-1/2 bg-paper" />
        <span
          className={`absolute -left-4 top-1/2 -translate-y-1/2 text-display ${p.ink === "text-paper" ? "text-ink" : "text-ink"}`}
          style={{ fontSize: "min(40vw, 360px)", lineHeight: 0.78, letterSpacing: "-0.08em" }}
        >
          {p.n}
        </span>
        <span className="absolute right-10 top-10 h-32 w-32 rounded-full border-[6px] border-paper mix-blend-difference" />
        <span className="absolute bottom-10 right-10 h-1 w-40 bg-paper mix-blend-difference" />
        <h3 className={`absolute bottom-10 left-10 right-1/3 text-display ${p.ink}`} style={{ fontSize: "clamp(28px, 3.4vw, 48px)", lineHeight: 0.9 }}>
          {p.name}
        </h3>
      </HeroFrame>
    );
  }

  if (p.hero === "diagram") {
    // System diagram: nodes connected on a grid — CRM language
    return (
      <HeroFrame label="SYS / FLOW" outcome={p.outcome} ink={p.ink}>
        <div className={`absolute inset-0 ${p.color}`} />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* connecting svg */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 400" preserveAspectRatio="none">
          <path d="M60 320 L180 180 L320 240 L440 100" stroke="var(--paper)" strokeWidth="2" fill="none" strokeDasharray="6 6" />
        </svg>
        {[
          { x: 60, y: 320, shape: "circle" },
          { x: 180, y: 180, shape: "square" },
          { x: 320, y: 240, shape: "circle" },
          { x: 440, y: 100, shape: "square" },
        ].map((n, i) => (
          <span
            key={i}
            className="absolute h-5 w-5 bg-paper"
            style={{
              left: `${(n.x / 500) * 100}%`,
              top: `${(n.y / 400) * 100}%`,
              transform: "translate(-50%, -50%)",
              borderRadius: n.shape === "circle" ? "9999px" : "0",
            }}
          />
        ))}
        <span className="absolute right-10 top-1/2 h-40 w-40 -translate-y-1/2 bg-acid mix-blend-difference" />
        <h3 className={`absolute bottom-10 left-10 text-display ${p.ink}`} style={{ fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 0.9 }}>
          {p.name}
        </h3>
      </HeroFrame>
    );
  }

  if (p.hero === "orbit") {
    // Sculptural orbit: concentric rings + drifting square — motion studio language
    return (
      <HeroFrame label="MOTION / STUDY" outcome={p.outcome} ink={p.ink}>
        <div className={`absolute inset-0 ${p.color}`} />
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-ink/50"
            style={{
              width: `${30 + i * 18}%`,
              height: `${30 + i * 18}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
        <span className="absolute right-12 top-12 h-24 w-24 rotate-12 bg-ink" />
        <span className="absolute bottom-14 left-12 h-16 w-16 rounded-full bg-signal" />
        <span className="absolute right-1/4 bottom-1/3 h-1 w-32 -rotate-12 bg-ink" />
        <h3 className={`absolute bottom-10 left-10 right-10 text-display ${p.ink}`} style={{ fontSize: "clamp(28px, 3.4vw, 48px)", lineHeight: 0.9 }}>
          {p.name}
        </h3>
      </HeroFrame>
    );
  }

  // "stack" — magazine cover lockup for DTC apparel
  return (
    <HeroFrame label={`SS / ${p.year}`} outcome={p.outcome} ink={p.ink}>
      <div className={`absolute inset-0 ${p.color}`} />
      {/* horizontal bands */}
      <span className="absolute left-0 right-0 top-1/3 h-px bg-ink/40" />
      <span className="absolute left-0 right-0 top-2/3 h-px bg-ink/40" />
      <span className="absolute left-1/2 top-0 h-full w-px bg-ink/40" />
      {/* large circle stamp */}
      <span className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full border-[10px] border-ink" />
      {/* vertical lockup */}
      <span className={`absolute left-8 top-8 origin-top-left -rotate-90 translate-y-32 text-mono-label ${p.ink}`}>
        ISSUE №{p.n} · LOOKBOOK
      </span>
      <h3 className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-display ${p.ink}`} style={{ fontSize: "clamp(36px, 5vw, 84px)", lineHeight: 0.85, letterSpacing: "-0.04em" }}>
        {p.name.split(" ").map((w, i) => (
          <span key={i} className="block">{w}</span>
        ))}
      </h3>
      <span className={`absolute bottom-8 right-8 text-mono-label ${p.ink}`}>★ EDITORIAL</span>
    </HeroFrame>
  );
}
