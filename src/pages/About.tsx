import { Link } from "../lib/router";

export default function About() {
  const timeline = [
    ["2018", "Designer", "Started in print + identity. Swiss obsession begins."],
    ["2020", "Developer", "Shipped first production React app. Stopped sleeping."],
    ["2022", "Automation builder", "Built a CRM that replaced a 6-figure SaaS stack."],
    ["2023", "Agency collaborator", "Embedded with 4 studios across IN, DE, US."],
    ["2025", "Educator", "Teaching what took me a decade to learn."],
  ];
  const principles = [
    ["GOOD DESIGN", "Systems first. Decoration last. Or never."],
    ["USEFUL MOTION", "Motion explains the model. It does not perform."],
    ["PRACTICAL AUTOMATION", "If a human does it twice, software should do it forever."],
    ["ATTENTION TO DETAIL", "The last 5% is the work."],
  ];
  const tools = ["FIGMA", "REACT", "TYPESCRIPT", "GSAP", "THREE.JS", "SUPABASE", "POSTGRES", "ZAPIER", "MAKE", "OPENAI", "FRAMER", "WEBFLOW"];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-ink/10 bg-paper">
        <div className="pointer-events-none absolute -left-24 -top-10 h-[420px] w-[420px] bg-acid" />
        <div className="pointer-events-none absolute right-10 top-40 h-32 w-32 rounded-full border-2 border-ink" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-24">
          <p className="text-mono-label text-gray">ABOUT / WHO</p>
          <h1 className="text-display mt-6" style={{ fontSize: "clamp(64px, 12vw, 200px)", lineHeight: 0.85 }}>
            I MAKE THE<br />INVISIBLE<br /><span className="text-signal">OBVIOUS.</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-4 px-6 py-24">
          <p className="text-mono-label col-span-12 text-gray md:col-span-3">INTRO / 001</p>
          <div className="text-display col-span-12 text-3xl leading-snug md:col-span-9 md:text-5xl">
            I'm Vinay. I design web experiences that look like they belong in a magazine and run like
            internal infrastructure. I treat motion as grammar, not garnish. I build systems that
            quietly automate the boring parts of a business so people can do the parts that matter.
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24">
          <p className="text-mono-label text-gray">TIMELINE / 002</p>
          <ul className="mt-10 divide-y divide-ink">
            {timeline.map(([y, role, note], i) => (
              <li key={y} className="grid grid-cols-12 items-baseline gap-4 py-6">
                <span className="text-display col-span-3 text-2xl text-gray md:col-span-2 md:text-4xl">{y}</span>
                <span className="text-display col-span-9 leading-none md:col-span-4" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>{role}</span>
                <span className="text-mono-label col-span-12 text-gray md:col-span-6">{note}</span>
                {i === 2 && <span className="col-span-12 mt-2 inline-block h-1 w-16 bg-signal md:col-span-2" />}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-ink/10 bg-ink py-24 text-paper">
        <div className="mx-auto max-w-[1440px] px-6">
          <p className="text-mono-label text-paper/60">PRINCIPLES / 003</p>
          <div className="mt-10 grid grid-cols-12 gap-6">
            {principles.map(([k, v], i) => (
              <div key={k} className="col-span-12 border-t border-paper/30 pt-6 md:col-span-6">
                <div className="flex items-center gap-3 text-mono-label text-paper/60">
                  <span className={`block h-3 w-3 ${["bg-signal", "bg-electric", "bg-acid", "bg-orange"][i]}`} />
                  PRINCIPLE 0{i + 1}
                </div>
                <h3 className="text-display mt-4 text-3xl md:text-5xl">{k}</h3>
                <p className="mt-3 max-w-md text-gray">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24">
          <p className="text-mono-label text-gray">TOOLS / 004</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {tools.map((t, i) => (
              <span key={t} className={`border border-ink px-4 py-2 text-mono-label ${i % 7 === 0 ? "bg-ink text-paper" : ""}`}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <Link to="/contact" className="text-display block hover:text-signal" style={{ fontSize: "clamp(56px, 10vw, 160px)", lineHeight: 0.85 }}>
            WORK WITH ME →
          </Link>
        </div>
      </section>
    </div>
  );
}
