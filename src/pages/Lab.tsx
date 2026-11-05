import { useEffect, useRef } from "react";
import { mapRange, useSpring2D } from "../lib/motion";

export default function Lab() {
  const ref = useRef<HTMLElement>(null);
  const h1A = useRef<HTMLHeadingElement>(null);
  const h1B = useRef<HTMLHeadingElement>(null);
  const red = useRef<HTMLDivElement>(null);
  const orange = useRef<HTMLDivElement>(null);
  const lime = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLDivElement>(null);

  const setTarget = useSpring2D({ damping: 10, stiffness: 50 }, (x, y) => {
    const rotationA = mapRange(x, 0, 2000, 0, 720);
    const rotationB = mapRange(y, 0, 1000, 0, -720);
    const scaleChaos = mapRange(x, 0, 2000, 0.5, 2);
    const scaleInverse = 3 - scaleChaos;
    if (h1A.current) h1A.current.style.transform = `rotate(${rotationA}deg) scale(${scaleChaos})`;
    if (h1B.current) h1B.current.style.transform = `rotate(${rotationB}deg) scale(${scaleInverse})`;
    if (red.current) red.current.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`;
    if (orange.current) orange.current.style.transform = `translate3d(${-x * 0.3}px, ${y * 0.8}px, 0) rotate(${rotationA}deg)`;
    if (lime.current) lime.current.style.transform = `translate3d(${x * 0.8}px, ${-y * 0.5}px, 0) rotate(${rotationB}deg)`;
    if (ink.current) ink.current.style.transform = `translate3d(${-x * 0.6}px, ${-y * 0.6}px, 0)`;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => setTarget(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [setTarget]);

  return (
    <div className="relative">
      <main
        ref={ref}
        data-cursor="diagonal"
        className="relative min-h-screen w-full overflow-hidden bg-electric"
      >
        {/* Memphis dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(var(--acid) 2px, transparent 2px)", backgroundSize: "40px 40px" }}
        />

        {/* Chaotic typography */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center mix-blend-exclusion">
          <h1
            ref={h1A}
            style={{ fontSize: "20vw", lineHeight: 0.85 }}
            className="text-display font-bold uppercase tracking-tighter text-signal will-change-transform"
          >
            LAB
          </h1>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center mix-blend-overlay">
          <h1
            ref={h1B}
            style={{ fontSize: "20vw", lineHeight: 0.85 }}
            className="text-display font-bold uppercase tracking-tighter text-acid will-change-transform"
          >
            CHAOS
          </h1>
        </div>

        {/* Roving Memphis shapes */}
        <div
          ref={red}
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-signal mix-blend-screen will-change-transform"
        />
        <div
          ref={orange}
          className="absolute left-2/3 top-1/2 h-96 w-96 bg-orange mix-blend-hard-light will-change-transform"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        <div
          ref={lime}
          className="absolute left-1/3 top-3/4 h-72 w-72 border-8 border-acid mix-blend-color-dodge will-change-transform"
        />
        <div
          ref={ink}
          className="absolute right-1/4 top-1/4 h-48 w-48 bg-ink mix-blend-difference will-change-transform"
        />

        <div className="absolute bottom-8 left-8 z-30 text-display text-acid opacity-70 mix-blend-difference">
          Abandon structure. Move cursor.
        </div>
        <p className="absolute left-8 top-8 z-30 text-mono-label text-paper">LAB / WHERE RULES GO TO DIE</p>
      </main>

      {/* Experiment cards */}
      <section className="relative bg-paper py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="grid grid-cols-12 gap-4">
            {[
              { t: "Magnetic typography", c: "bg-acid", r: "rotate-2" },
              { t: "Self-drawing posters", c: "bg-signal", r: "-rotate-3" },
              { t: "GSAP physics dolls", c: "bg-electric text-paper", r: "rotate-1" },
              { t: "Voice-reactive grids", c: "bg-orange", r: "-rotate-2" },
              { t: "ASCII rain machine", c: "bg-ink text-paper", r: "rotate-6" },
              { t: "Micro-games (lol)", c: "bg-paper border-2 border-ink", r: "-rotate-1" },
            ].map((e, i) => (
              <div
                key={i}
                className={`col-span-12 md:col-span-4 ${e.c} ${e.r} p-8 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]`}
              >
                <p className="text-mono-label opacity-70">EXP / {String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-display mt-6 text-3xl leading-tight">{e.t}</h3>
                <p className="mt-6 text-mono-label">SOON ↗</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink py-32 text-paper">
        <div className="mx-auto max-w-[1440px] px-6">
          <p className="text-mono-label text-paper/60">PS</p>
          <p className="text-display mt-4 max-w-3xl" style={{ fontSize: "clamp(32px, 5vw, 72px)", lineHeight: 0.95 }}>
            The Lab is where I think out loud. <span className="text-acid">Nothing here is finished.</span> That's the point.
          </p>
        </div>
      </section>
    </div>
  );
}
