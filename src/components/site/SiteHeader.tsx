import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const logoSrc = typeof logo === "string" ? logo : (logo as unknown as { src: string }).src;

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/squad", label: "Squad" },
  { to: "/team", label: "Our Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-pitch/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoSrc}
            alt="Tai Football Academy crest"
            width={44}
            height={44}
            className="size-11 object-contain"
          />
          <span className="font-display text-xl leading-none tracking-tighter">
            <span className="block">TAi FOOTBALL</span>
            <span className="block text-sm tracking-[0.4em]">ACADEMY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-widest text-foreground/70 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-neon"
              activeProps={{ className: "text-neon" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to={user ? "/account" : "/auth"}
            className="hidden rounded-full border border-border px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:border-neon hover:text-neon sm:inline-flex"
          >
            {user ? "My Account" : "Student Login"}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 items-center justify-center lg:hidden"
          >
            {open ? <X className="size-6 text-neon" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-pitch px-6 pb-6 lg:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl uppercase tracking-tight"
                activeProps={{ className: "text-neon" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={user ? "/account" : "/auth"}
              onClick={() => setOpen(false)}
              className="btn-neon mt-6"
            >
              {user ? "My Account" : "Student Login"}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
