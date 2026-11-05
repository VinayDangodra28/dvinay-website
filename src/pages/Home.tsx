import { useEffect, useRef, useState } from "react";
import { Link } from "../lib/router";
import { useSpring2D } from "../lib/motion";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Arrival />
      <DesignDevelopAutomate />
      <Capabilities />
      <SelectedWork />
      <Systems />
      <Playground />
      <Content />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </div>
  );
}

/* ───────── 01 ARRIVAL ───────── */
function Arrival() {
  const wrap = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const r = wrap.current?.getBoundingClientRect();
      if (!r) return;
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      setT({ x, y });
    };
    const el = wrap.current;
    el?.addEventListener("mousemove", h);
    return () => el?.removeEventListener("mousemove", h);
  }, []);

  return (
    <section ref={wrap} className="relative min-h-[92vh] border-b border-ink/10 bg-paper">
      {/* oversized cropped geometry */}
      <div
        className="absolute -left-40 top-1/3 h-[640px] w-[640px] rounded-full border border-ink/20 spin-slow"
        style={{ transform: `translate(${t.x * 30}px, ${t.y * 30}px)` }}
      />
      <div
        className="absolute -right-28 -top-20 h-[420px] w-[420px] bg-acid"
        style={{ transform: `translate(${t.x * -20}px, ${t.y * -20}px) rotate(8deg)` }}
      />
      <div
        className="absolute bottom-10 right-1/4 h-[3px] w-[60vw] origin-left rotate-[-18deg] bg-signal"
        style={{ transform: `rotate(-18deg) translateX(${t.x * 40}px)` }}
      />

      <div className="relative mx-auto grid min-h-[92vh] max-w-[1440px] grid-cols-12 gap-4 px-6 pt-24">
        <div className="col-span-12 flex items-end justify-between md:col-span-4">
          <div>
            <p className="text-mono-label text-gray">001 / ARRIVAL</p>
            <p className="mt-3 text-mono-label">
              WEB DEVELOPER<br />DESIGNER OF DIGITAL<br />EXPERIENCES
            </p>
          </div>
        </div>
        <div className="col-span-12 self-end md:col-span-8">
          <h1
            className="text-display select-none leading-[0.78] tracking-[-0.06em]"
            style={{
              fontSize: "clamp(120px, 22vw, 360px)",
              transform: `translate(${t.x * -10}px, ${t.y * -10}px)`,
            }}
          >
            VIN<span className="text-signal">A</span>Y
          </h1>
          <div className="mt-6 flex items-center justify-between border-t border-ink pt-4">
            <p className="text-mono-label">SCROLL ↓</p>
            <p className="text-mono-label text-gray">EST. 2018 · IND</p>
            <p className="text-mono-label">○ □ ╱</p>
          </div>
        </div>
      </div>

      {/* marquee bottom */}
      <div className="relative overflow-hidden border-y border-ink bg-ink py-3 text-paper">
        <div className="marquee-track flex whitespace-nowrap text-display text-[40px] leading-none">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-8 px-4">
              {"DESIGN · DEVELOP · AUTOMATE · DESIGN · DEVELOP · AUTOMATE · DESIGN · DEVELOP · AUTOMATE · "
                .split(" · ")
                .map((w, i) => (
                  <span key={i} className="flex items-center gap-8">
                    <span>{w}</span>
                    <span className="inline-block h-3 w-3 rounded-full bg-signal" />
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 02 DDA ───────── */
function DesignDevelopAutomate() {
  const blocks: Array<{ word: string; accent: string; sub: string; chips: string[] }> = [
    { word: "DESIGN", accent: "bg-signal", sub: "Visual systems, identity, editorial layouts.", chips: ["Brand", "UI", "Editorial", "Posters"] },
    { word: "DEVELOP", accent: "bg-electric", sub: "Production websites, components, motion.", chips: ["React", "TS", "GSAP", "Three"] },
    { word: "AUTOMATE", accent: "bg-acid", sub: "CRMs, pipelines, internal tools.", chips: ["APIs", "Workflows", "AI", "Ops"] },
  ];
  return (
    <section className="relative border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24">
        <p className="text-mono-label text-gray">002 / CAPABILITY THESIS</p>
        <div className="mt-10 divide-y divide-ink/15">
          {blocks.map((b, i) => (
            <div key={b.word} className="group relative grid grid-cols-12 items-center gap-4 py-10">
              <div className="col-span-2 text-mono-label text-gray">0{i + 1}</div>
              <h2 className="text-display col-span-7 leading-[0.85]" style={{ fontSize: "clamp(72px, 12vw, 200px)" }}>
                {b.word}
              </h2>
              <div className="col-span-3 space-y-3">
                <span className={`inline-block h-3 w-3 ${b.accent}`} />
                <p className="text-sm text-gray">{b.sub}</p>
                <div className="flex flex-wrap gap-1">
                  {b.chips.map((c) => (
                    <span key={c} className="border border-ink/20 px-2 py-1 text-mono-label">{c}</span>
                  ))}
                </div>
              </div>
              <span className={`pointer-events-none absolute right-0 top-1/2 h-[200px] w-[200px] -translate-y-1/2 translate-x-3/4 ${b.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} style={{ borderRadius: i === 0 ? "9999px" : "0" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 03 CAPABILITIES ───────── */
function Capabilities() {
  const skills = ["CUSTOM WEBSITES", "ECOMMERCE", "CRM SYSTEMS", "AUTOMATION", "APIs", "SEO", "ANIMATIONS"];
  const accents = ["text-signal", "text-electric", "text-orange", "text-ink", "text-signal", "text-electric", "text-ink"];
  return (
    <section className="relative border-b border-ink/10 bg-paper">
      {/* cropped square */}
      <div className="pointer-events-none absolute -left-52 top-40 h-[420px] w-[420px] border border-ink/15" />
      <div className="mx-auto max-w-[1440px] px-6 py-24">
        <div className="flex items-baseline justify-between">
          <p className="text-mono-label text-gray">003 / CAPABILITIES</p>
          <p className="text-mono-label">HOVER TO ACTIVATE →</p>
        </div>
        <ul className="mt-10 divide-y divide-ink">
          {skills.map((s, i) => (
            <li key={s} className="group relative flex items-center justify-between py-6 transition-colors hover:bg-ink hover:text-paper">
              <div className="flex items-center gap-6">
                <span className="text-mono-label opacity-50">0{i + 1}</span>
                <h3 className={`text-display leading-none transition-transform duration-300 group-hover:translate-x-3 ${accents[i]} group-hover:text-paper`} style={{ fontSize: "clamp(40px, 7vw, 110px)" }}>
                  {s}
                </h3>
              </div>
              <div className="flex items-center gap-3 pr-2">
                <span className="block h-4 w-4 rotate-45 bg-acid opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="block h-4 w-4 rounded-full bg-signal opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="block h-1 w-10 bg-electric opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── 04 SELECTED WORK ───────── */
function SelectedWork() {
  const projects = [
    { n: "01", name: "MERIDIAN ATELIER", cat: "Brand · Ecommerce", year: "2025", color: "bg-signal", outcome: "+184% conv.", desc: "A luxury furniture house rebuilt around editorial storytelling and a custom CMS." },
    { n: "02", name: "NORTH FIELD CRM", cat: "System · Automation", year: "2024", color: "bg-electric", outcome: "−62% manual ops", desc: "An internal CRM that quietly runs a 40-person sales team and three regional warehouses." },
    { n: "03", name: "KAIRO STUDIO", cat: "Identity · Motion", year: "2024", color: "bg-acid", outcome: "Awwwards SOTD", desc: "A motion-led portfolio for a Berlin-based industrial design studio." },
  ];
  return (
    <section className="relative border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24">
        <div className="flex items-end justify-between">
          <p className="text-mono-label text-gray">004 / SELECTED WORK</p>
          <Link to="/work" className="text-mono-label underline underline-offset-4">VIEW INDEX →</Link>
        </div>
        <div className="mt-12 space-y-24">
          {projects.map((p, i) => (
            <article key={p.n} data-project data-cursor="square" className="grid grid-cols-12 items-end gap-4">
              <div className={`col-span-12 md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[5/4] w-full overflow-hidden border border-ink bg-paper">
                  {/* composed editorial visual */}
                  <div className={`absolute inset-0 ${p.color}`} />
                  <div className="absolute -right-16 -top-16 h-[260px] w-[260px] rounded-full bg-paper mix-blend-difference" />
                  <div className="absolute bottom-0 left-0 h-[6px] w-full bg-ink" />
                  <div className="absolute left-6 top-6 text-mono-label text-paper mix-blend-difference">{p.cat}</div>
                  <h3 className="absolute bottom-8 left-6 right-6 text-display text-paper mix-blend-difference" style={{ fontSize: "clamp(40px, 6vw, 96px)" }}>{p.name}</h3>
                </div>
              </div>
              <div className="col-span-12 space-y-4 md:col-span-5">
                <div className="flex items-center gap-3 text-mono-label">
                  <span>PROJECT {p.n}</span>
                  <span className="h-px w-8 bg-ink" />
                  <span>{p.year}</span>
                </div>
                <h4 className="text-display text-3xl leading-tight">{p.name}</h4>
                <p className="max-w-md text-sm leading-relaxed text-gray">{p.desc}</p>
                <div className="flex items-center justify-between border-t border-ink pt-4">
                  <span className="text-mono-label">{p.outcome}</span>
                  <Link to="/work" className="text-mono-label">CASE STUDY →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 05 SYSTEMS ───────── */
function Systems() {
  const nodes = ["VISITOR", "LEAD", "CRM", "AUTOMATION", "CUSTOMER"];
  return (
    <section className="relative border-b border-ink/10 bg-ink py-24 text-paper">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full border border-paper/15" />
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="text-mono-label text-paper/60">005 / SYSTEMS</p>
        <h2 className="text-display mt-4 max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 128px)" }}>
          Websites are <span className="text-acid">only</span><br />the beginning.
        </h2>

        <div className="relative mt-16 grid grid-cols-5 gap-4">
          {nodes.map((n, i) => (
            <div key={n} className="relative">
              <div className="flex items-center gap-2 text-mono-label text-paper/60">
                <span className="ticker-dot inline-block h-2 w-2 rounded-full bg-acid" style={{ animationDelay: `${i * 0.18}s` }} />
                NODE 0{i + 1}
              </div>
              <div className="mt-3 aspect-square border border-paper/30 p-4">
                <div className={`h-full w-full ${i === 0 ? "rounded-full bg-paper/10" : i === 4 ? "bg-acid" : "border border-paper/40"}`} />
              </div>
              <p className="text-display mt-3 text-xl">{n}</p>
            </div>
          ))}
          {/* connecting line */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <line x1="50" y1="100" x2="950" y2="100" stroke="currentColor" className="text-paper/30" strokeDasharray="4 6" />
          </svg>
        </div>

        <p className="mt-12 max-w-xl text-sm text-paper/70">
          I build websites that aren't endpoints — they're the front door to systems that
          collect, qualify, route, and convert. Design becomes infrastructure.
        </p>
      </div>
    </section>
  );
}

/* ───────── 06 PLAYGROUND ───────── */
function Playground() {
  const ref = useRef<HTMLElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const red = useRef<HTMLDivElement>(null);
  const tri = useRef<HTMLDivElement>(null);
  const blue = useRef<HTMLDivElement>(null);

  const setTarget = useSpring2D({ damping: 30, stiffness: 200 }, (x, y) => {
    if (text.current) text.current.style.transform = `translate3d(${-x / 5}px, ${-y / 5}px, 0)`;
    if (red.current) red.current.style.transform = `translate3d(${x / 2}px, ${y / 2}px, 0)`;
    if (tri.current) tri.current.style.transform = `translate3d(${-x}px, ${y / 1.5}px, 0)`;
    if (blue.current) blue.current.style.transform = `translate3d(${x / 1.5}px, ${-y}px, 0)`;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setTarget(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [setTarget]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-paper"
      data-cursor="circle"
    >
      <h3 className="absolute left-4 top-32 border-b border-ink/20 pb-4 font-sans text-sm uppercase tracking-widest opacity-50 md:left-8 xl:left-12">
        Playground
      </h3>

      <div className="flex h-full w-full items-center justify-center">
        <div
          ref={text}
          className="pointer-events-none z-10 select-none text-center font-display text-[10vw] font-bold uppercase leading-none mix-blend-exclusion text-white"
        >
          INTERACT
        </div>
      </div>

      <div
        ref={red}
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal mix-blend-multiply"
      />

      <div
        ref={tri}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-acid mix-blend-multiply"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
      />

      <div
        ref={blue}
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 bg-electric mix-blend-multiply"
      />
    </section>
  );
}

/* ───────── 07 CONTENT ───────── */
function Content() {
  const items = [
    { tag: "INSTAGRAM", title: "How a Swiss grid stops being a cage.", date: "MAY 12" },
    { tag: "LINKEDIN", title: "I rebuilt a CRM in 11 days. Here's the architecture.", date: "APR 30" },
    { tag: "THOUGHT", title: "Motion is a sentence, not a flourish.", date: "APR 12" },
    { tag: "TUTORIAL", title: "Animating SVG paths with intent (not vibes).", date: "MAR 28" },
  ];
  return (
    <section className="relative border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24">
        <p className="text-mono-label text-gray">007 / FIELD NOTES</p>
        <h2 className="text-display mt-4" style={{ fontSize: "clamp(40px, 6vw, 96px)" }}>
          Written, drawn, shipped.
        </h2>
        <div className="mt-10 grid grid-cols-12 gap-4">
          {items.map((it, i) => (
            <article key={i} className="col-span-12 border-t border-ink py-6 md:col-span-6">
              <div className="flex items-center justify-between text-mono-label">
                <span>{it.tag}</span>
                <span className="text-gray">{it.date}</span>
              </div>
              <h3 className="text-display mt-4 text-3xl leading-tight md:text-4xl">{it.title}</h3>
              <div className="mt-4 flex items-center gap-3 text-mono-label">
                <span className={`block h-3 w-3 ${i % 2 ? "rounded-full bg-electric" : "bg-signal"}`} />
                READ →
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 08 TESTIMONIALS ───────── */
function Testimonials() {
  const quotes = [
    { q: "Vinay sees the system before he draws the screen. That's why his work compounds.", a: "— A. MEHTA, FOUNDER, NORTH FIELD" },
    { q: "Half designer, half engineer, fully obsessed.", a: "— J. KIM, CD, KAIRO STUDIO" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const c = quotes[i];
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-paper py-32">
      <div className="pointer-events-none absolute -left-60 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-acid" />
      <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 border-2 border-ink rotate-12" />
      <div className="mx-auto max-w-[1240px] px-6">
        <p className="text-mono-label text-gray">008 / TESTIMONY</p>
        <blockquote className="text-display mt-8" style={{ fontSize: "clamp(36px, 5.5vw, 92px)", lineHeight: 0.95 }}>
          “{c.q}”
        </blockquote>
        <div className="mt-10 flex items-center justify-between border-t border-ink pt-4">
          <p className="text-mono-label">{c.a}</p>
          <div className="flex gap-1">
            {quotes.map((_, k) => (
              <button key={k} onClick={() => setI(k)} className={`h-2 w-8 ${k === i ? "bg-ink" : "bg-ink/20"}`} aria-label={`Quote ${k + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── 09 CONTACT CTA ───────── */
function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-paper">
      {/* climax geometry */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[420px] w-[420px] rounded-full bg-signal" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] bg-electric" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] bg-acid" />
      <div className="relative mx-auto max-w-[1440px] px-6">
        <p className="text-mono-label text-paper/60">009 / CONTACT</p>
        <h2 className="text-display mt-6" style={{ fontSize: "clamp(64px, 13vw, 220px)", lineHeight: 0.85 }}>
          LET'S BUILD<br />
          SOMETHING<br />
          <span className="text-acid">MEMORABLE.</span>
        </h2>
        <div className="mt-12 grid grid-cols-12 gap-4 border-t border-paper/30 pt-6">
          <div className="col-span-6 md:col-span-3">
            <p className="text-mono-label text-paper/60">EMAIL</p>
            <a href="mailto:hi@dvinay.com" className="mt-2 block text-lg">hi@dvinay.com</a>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-mono-label text-paper/60">AVAILABILITY</p>
            <p className="mt-2 text-lg">Q3 — 2 slots open</p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-mono-label text-paper/60">SOCIAL</p>
            <p className="mt-2 text-lg">IG · LI · GH</p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <Link to="/contact" className="mt-4 inline-block bg-paper px-6 py-4 text-mono-label text-ink">START A PROJECT →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-paper py-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 text-mono-label text-gray">
        <span>© DVINAY · 2026</span>
        <span>BUILT WITH OBSESSION · INDIA</span>
        <span>○ □ ╱</span>
      </div>
    </footer>
  );
}
