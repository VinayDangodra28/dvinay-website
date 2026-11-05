# dvinay.com

Swiss × Constructivism × Memphis portfolio — Vite + React + Tailwind v4. No TanStack, no motion library, no UI kit.

    npm install
    npm run dev      # develop
    npm run build    # type-check + production build -> dist/
    npm run preview

Dependencies: react, react-dom (runtime) and vite, tailwindcss, typescript (build only).

- `src/lib/router.tsx` — small History API router (Link, NavLink, navigate)
- `src/lib/motion.ts` — spring + scroll-progress hooks that replace `motion`
- `src/App.tsx` — route table, per-page title/meta, 404, error boundary

Hosting note: this is a single-page app, so configure your host to serve `index.html`
for unknown paths. `public/_redirects` already covers Netlify/Cloudflare Pages;
on Vercel add a rewrite to `/index.html`.
