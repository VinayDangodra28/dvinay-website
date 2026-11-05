import { Component, useEffect, type ComponentType, type ErrorInfo, type ReactNode } from "react";
import { Link, usePathname } from "./lib/router";
import { Nav } from "./components/Nav";
import { GeometryCursor } from "./components/GeometryCursor";
import { GridOverlay } from "./components/GridOverlay";
import { GeometryDock } from "./components/GeometryDock";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Lab from "./pages/Lab";
import Contact from "./pages/Contact";

type Meta = { title: string; description: string; ogTitle: string; ogDescription: string };

const routes: Record<string, { Page: ComponentType; meta: Meta }> = {
  "/": {
    Page: Home,
    meta: {
      title: "dvinay.com — Design · Develop · Automate",
      description: "Vinay — web developer designing digital experiences and building automated business systems.",
      ogTitle: "dvinay.com — Design · Develop · Automate",
      ogDescription: "A Swiss design exhibition that happens to showcase a web developer.",
    },
  },
  "/work": {
    Page: Work,
    meta: {
      title: "Work — dvinay.com",
      description: "Selected projects: editorial websites, ecommerce, CRMs, motion systems.",
      ogTitle: "Work — dvinay.com",
      ogDescription: "Selected projects from Vinay — design, development, automation.",
    },
  },
  "/about": {
    Page: About,
    meta: {
      title: "About — dvinay.com",
      description: "Designer, developer, automation builder. The story behind the systems.",
      ogTitle: "About — dvinay.com",
      ogDescription: "Designer, developer, automation builder.",
    },
  },
  "/lab": {
    Page: Lab,
    meta: {
      title: "Lab — dvinay.com",
      description: "Geometric chaos. Experiments, micro-games, unused ideas.",
      ogTitle: "Lab — dvinay.com",
      ogDescription: "Where the rules go to die. Pure experimentation.",
    },
  },
  "/contact": {
    Page: Contact,
    meta: {
      title: "Contact — dvinay.com",
      description: "Start a project. Email Vinay directly.",
      ogTitle: "Contact — dvinay.com",
      ogDescription: "Let's build something memorable.",
    },
  },
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-[120px] leading-none">404</h1>
        <p className="mt-4 text-mono-label text-gray">SHAPE NOT FOUND</p>
        <Link to="/" className="mt-6 inline-block bg-ink px-4 py-2 text-mono-label text-paper">RETURN HOME</Link>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error(error, info); }
  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <div className="max-w-md text-center">
          <h1 className="text-display text-3xl">Something broke the grid.</h1>
          <p className="mt-2 text-sm text-gray">Try again or head home.</p>
          <div className="mt-6 flex justify-center gap-2">
            <button onClick={() => this.setState({ error: null })} className="bg-ink px-4 py-2 text-mono-label text-paper">TRY AGAIN</button>
            <a href="/" className="border border-ink px-4 py-2 text-mono-label">HOME</a>
          </div>
        </div>
      </div>
    );
  }
}

export default function App() {
  const path = usePathname();
  const route = routes[path];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    if (!route) { document.title = "Not found — dvinay.com"; return; }
    const m = route.meta;
    document.title = m.title;
    setMeta("name", "description", m.description);
    setMeta("property", "og:title", m.ogTitle);
    setMeta("property", "og:description", m.ogDescription);
  }, [route]);

  const Page = route?.Page ?? NotFound;

  return (
    <>
      <GeometryCursor />
      <GridOverlay />
      <Nav />
      <main>
        <ErrorBoundary resetKey={path}>
          <Page />
        </ErrorBoundary>
      </main>
      <GeometryDock />
    </>
  );
}
