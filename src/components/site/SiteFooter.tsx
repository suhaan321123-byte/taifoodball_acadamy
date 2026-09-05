import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const logoSrc = typeof logo === "string" ? logo : (logo as unknown as { src: string }).src;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/20 pb-28 pt-20 lg:pb-12">
      <div className="absolute inset-x-0 top-0 h-px bg-neon/60" />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.1fr] lg:gap-20">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Tai Football Academy crest"
              width={48}
              height={48}
              className="size-12 object-contain"
            />
            <span className="font-display text-xl tracking-tighter uppercase">
              TAi FOOTBALLACADEMY
            </span>
          </div>
          <p className="mb-8 max-w-sm leading-relaxed text-foreground/55">
            Elevating the standard of football training. Certified coaching, structured pathways and
            year-round scouting for committed young players.
          </p>
          <div className="flex gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-border text-xs text-foreground/70 transition-colors hover:border-neon hover:text-neon">
              𝕏
            </span>
            <a
              href="https://www.instagram.com/tai_footballacademy/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Tai Football Academy on Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-border text-xs text-foreground/70 transition-colors hover:border-neon hover:text-neon"
            >
              IG
            </a>
            <span className="flex size-10 items-center justify-center rounded-full border border-border text-xs text-foreground/70 transition-colors hover:border-neon hover:text-neon">
              YT
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="text-[10px] font-bold uppercase tracking-widest">Navigation</h5>
          <div className="grid grid-cols-2 gap-6">
            <nav className="flex flex-col gap-2 text-sm text-foreground/60">
              <Link to="/" className="hover:text-neon">
                Home
              </Link>
              <Link to="/about" className="hover:text-neon">
                About
              </Link>
              <Link to="/squad" className="hover:text-neon">
                Squad
              </Link>
              <Link to="/contact" className="hover:text-neon">
                Enquire
              </Link>
              <Link to="/team" className="hover:text-neon">
                Our Team
              </Link>
              <Link to="/trainers" className="hover:text-neon">
                Trainers
              </Link>
              <Link to="/gallery" className="hover:text-neon">
                Gallery
              </Link>
              <Link to="/news" className="hover:text-neon">
                Academy News
              </Link>
            </nav>
            <div className="border-l border-border pl-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                Legal
              </p>
              <nav className="flex flex-col gap-2 text-sm text-foreground/60">
                <Link to="/terms" className="hover:text-neon">
                  Terms &amp; Conditions
                </Link>
                <Link to="/privacy" className="hover:text-neon">
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:border-l lg:border-border lg:pl-8">
          <h5 className="text-[10px] font-bold uppercase tracking-widest">Contact</h5>
          <div className="space-y-3 text-sm text-foreground/65">
            <a
              href="mailto:tfa099@gmail.com"
              className="flex items-center gap-3 transition-colors hover:text-neon"
            >
              <Mail className="size-4 text-neon" />
              tfa099@gmail.com
            </a>
            <a
              href="tel:+918157010114"
              className="flex items-center gap-3 transition-colors hover:text-neon"
            >
              <Phone className="size-4 text-neon" />
              +91 81570 10114
            </a>
            <a
              href="tel:+917594001414"
              className="flex items-center gap-3 transition-colors hover:text-neon"
            >
              <Phone className="size-4 text-neon" />
              +91 75940 01414
            </a>
            <p className="flex max-w-xs gap-3 leading-relaxed">
              <MapPin className="mt-0.5 size-4 shrink-0 text-neon" />
              <span>
                9/146, Pandikkak Building
                <br />
                Poonoor, Unnikulam, Balussery
                <br />
                Kozhikode (Calicut), Kerala - 673574, India
              </span>
            </p>
          </div>
          <p className="flex items-center gap-2 pt-2 text-[10px] font-bold uppercase italic tracking-widest text-neon">
            <span className="size-1.5 rounded-full bg-neon" />
            Open for Registration
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-border px-6 pb-12 pt-12 md:flex-row">
        <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/35">
          © 2026 TAi FOOTBALLACADEMY. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
