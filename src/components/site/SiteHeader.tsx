"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const logoSrc = typeof logo === "string" ? logo : (logo as unknown as { src: string }).src;

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/squad", label: "Squad" },
  { href: "/team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-pitch/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
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
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-widest text-foreground/70 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-neon"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={user ? "/student-dashboard" : "/auth"}
            className="hidden rounded-full border border-border px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:border-neon hover:text-neon sm:inline-flex"
          >
            {user ? "My Account" : "Student Login"}
          </a>
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
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl uppercase tracking-tight"
              >
                {link.label}
              </a>
            ))}
            <a
              href={user ? "/student-dashboard" : "/auth"}
              onClick={() => setOpen(false)}
              className="btn-neon mt-6"
            >
              {user ? "My Account" : "Student Login"}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
