import { useEffect, useState } from "react";

type Mode = "circle" | "square" | "diagonal";

export function GeometryCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState<Mode>("circle");
  const [down, setDown] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const ctx = el.closest<HTMLElement>("[data-cursor]");
      const c = ctx?.dataset.cursor as Mode | undefined;
      if (c === "square" || c === "diagonal" || c === "circle") setMode(c);
      else if (el.closest("a, button")) setMode("diagonal");
      else if (el.closest("[data-project]")) setMode("square");
      else setMode("circle");
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", d);
    window.addEventListener("mouseup", u);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", d);
      window.removeEventListener("mouseup", u);
    };
  }, []);

  const size = down ? 26 : 34;
  const common = {
    position: "fixed" as const,
    left: pos.x,
    top: pos.y,
    width: size,
    height: size,
    transform: `translate(-50%, -50%) ${mode === "diagonal" ? "rotate(-45deg)" : ""}`,
    pointerEvents: "none" as const,
    zIndex: 9999,
    mixBlendMode: "difference" as const,
    transition: "width 200ms ease, height 200ms ease, border-radius 200ms ease, transform 80ms linear",
  };

  if (mode === "circle") {
    return <div style={{ ...common, borderRadius: "9999px", border: "1.5px solid #fff" }} />;
  }
  if (mode === "square") {
    return <div style={{ ...common, border: "1.5px solid #fff" }} />;
  }
  return (
    <div
      style={{
        ...common,
        height: 2,
        background: "#fff",
        border: "none",
      }}
    />
  );
}
