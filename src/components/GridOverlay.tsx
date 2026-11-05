import { useEffect, useState } from "react";

export function GridOverlay() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "g" || e.key === "G") setOn((v) => !v);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  if (!on) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[9000]">
      <div className="mx-auto h-full max-w-[1440px] px-6">
        <div className="grid h-full grid-cols-12 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full" style={{ background: "color-mix(in oklch, var(--electric) 10%, transparent)" }} />
          ))}
        </div>
      </div>
      <div className="absolute left-4 top-4 text-mono-label text-electric">GRID · 12 COL · PRESS G</div>
    </div>
  );
}
