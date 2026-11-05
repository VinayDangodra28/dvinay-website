import { Link, NavLink } from "../lib/router";

const items = [
  { to: "/", label: "HOME", n: "01" },
  { to: "/work", label: "WORK", n: "02" },
  { to: "/about", label: "ABOUT", n: "03" },
  { to: "/lab", label: "LAB", n: "04" },
  { to: "/contact", label: "CONTACT", n: "05" },
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="relative block h-6 w-6">
            <span className="absolute inset-0 rounded-full border-[1.5px] border-ink" />
            <span className="absolute inset-[6px] bg-signal" />
          </span>
          <span className="text-display text-[18px]">dvinay<span className="text-signal">.</span>com</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              exact={i.to === "/"}
              activeClassName="text-ink"
              inactiveClassName="text-gray hover:text-ink"
              className="text-mono-label transition-colors"
            >
              <span className="mr-1 opacity-50">{i.n}</span>{i.label}
            </NavLink>
          ))}
        </nav>
        <div className="text-mono-label text-gray hidden md:block">
          PRESS <span className="bg-ink px-1.5 py-0.5 text-paper">G</span> FOR GRID
        </div>
      </div>
    </header>
  );
}
