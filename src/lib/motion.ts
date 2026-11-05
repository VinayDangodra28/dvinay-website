import { useCallback, useEffect, useRef, type RefObject } from "react";

type SpringConfig = { stiffness: number; damping: number };

/**
 * Minimal 2D spring (mass = 1). Returns setTarget(x, y); onFrame(x, y) is called
 * every animation frame while the spring moves, so callers write transforms
 * straight to the DOM without re-rendering React.
 */
export function useSpring2D(cfg: SpringConfig, onFrame: (x: number, y: number) => void) {
  const frame = useRef(onFrame);
  const conf = useRef(cfg);
  const s = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, raf: 0, last: 0 });

  useEffect(() => {
    frame.current = onFrame;
    conf.current = cfg;
  });

  const step = useCallback((t: number) => {
    const st = s.current;
    const { stiffness, damping } = conf.current;
    const dt = Math.min((t - st.last) / 1000, 1 / 30);
    st.last = t;
    const sub = 1 / 120;
    for (let n = Math.max(1, Math.ceil(dt / sub)); n > 0; n--) {
      st.vx += (stiffness * (st.tx - st.x) - damping * st.vx) * sub;
      st.vy += (stiffness * (st.ty - st.y) - damping * st.vy) * sub;
      st.x += st.vx * sub;
      st.y += st.vy * sub;
    }
    const rest =
      Math.abs(st.vx) < 0.01 && Math.abs(st.vy) < 0.01 &&
      Math.abs(st.tx - st.x) < 0.01 && Math.abs(st.ty - st.y) < 0.01;
    if (rest) {
      st.x = st.tx; st.y = st.ty; st.vx = st.vy = 0; st.raf = 0;
    } else {
      st.raf = requestAnimationFrame(step);
    }
    frame.current(st.x, st.y);
  }, []);

  const setTarget = useCallback((x: number, y: number) => {
    const st = s.current;
    st.tx = x; st.ty = y;
    if (!st.raf) {
      st.last = performance.now();
      st.raf = requestAnimationFrame(step);
    }
  }, [step]);

  useEffect(() => {
    const st = s.current;
    frame.current(st.x, st.y);
    return () => {
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    };
  }, []);

  return setTarget;
}

/** Linear map with clamping (same as motion's useTransform with input/output ranges). */
export function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (v - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

/** 0 → 1 as the element travels from entering the viewport bottom to leaving the top. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, onChange: (p: number) => void) {
  const cb = useRef(onChange);
  useEffect(() => { cb.current = onChange; });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      cb.current(Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))));
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
    };
  }, [ref]);
}
