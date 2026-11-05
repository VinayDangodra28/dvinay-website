import { Link } from "../lib/router";

export function GeometryDock() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 border border-ink/15 bg-paper/80 px-2 py-2 backdrop-blur-md">
        <Link to="/" data-cursor="circle" className="group flex h-10 w-10 items-center justify-center hover:bg-ink hover:text-paper" aria-label="Home">
          <span className="block h-4 w-4 rounded-full border-[1.5px] border-current" />
        </Link>
        <Link to="/work" data-cursor="square" className="group flex h-10 w-10 items-center justify-center hover:bg-ink hover:text-paper" aria-label="Work">
          <span className="block h-4 w-4 border-[1.5px] border-current" />
        </Link>
        <Link to="/lab" data-cursor="diagonal" className="group flex h-10 w-10 items-center justify-center hover:bg-signal hover:text-paper" aria-label="Lab">
          <span className="block h-[1.5px] w-5 rotate-[-45deg] bg-current" />
        </Link>
        <div className="mx-1 h-6 w-px bg-ink/15" />
        <Link to="/about" className="px-2 text-mono-label">ABOUT</Link>
        <Link to="/contact" className="bg-ink px-3 py-2 text-mono-label text-paper">CONTACT</Link>
      </div>
    </div>
  );
}
