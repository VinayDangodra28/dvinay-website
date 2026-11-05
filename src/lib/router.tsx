import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from "react";

const NAV_EVENT = "app:navigate";

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(NAV_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(NAV_EVENT, cb);
  };
}

const normalize = (p: string) => p.replace(/\/+$/, "") || "/";

export function usePathname() {
  return useSyncExternalStore(
    subscribe,
    () => normalize(window.location.pathname),
    () => "/",
  );
}

export function navigate(to: string) {
  if (normalize(to) === normalize(window.location.pathname)) {
    window.scrollTo(0, 0);
    return;
  }
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event(NAV_EVENT));
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented || e.button !== 0 ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      rest.target === "_blank"
    ) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handle} {...rest} />;
}

/** Link that swaps classes when its route is active. */
export function NavLink({
  to, exact, activeClassName = "", inactiveClassName = "", className = "", ...rest
}: LinkProps & { exact?: boolean; activeClassName?: string; inactiveClassName?: string }) {
  const path = usePathname();
  const active = exact ? path === to : path === to || path.startsWith(to + "/");
  return <Link to={to} className={`${className} ${active ? activeClassName : inactiveClassName}`} {...rest} />;
}
