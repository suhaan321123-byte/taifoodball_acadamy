import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-28 pt-24 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <img
              src={logo}
              alt="Tai Football Academy crest"
              width={48}
              height={48}
              className="size-12 object-contain"
            />
            <span className="font-display text-xl tracking-tighter uppercase">Tai Academy</span>
          </div>
          <p className="mb-8 max-w-sm leading-relaxed text-foreground/40">
            Elevating the standard of football training. Certified coaching, structured pathways and
            year-round scouting for committed young players.
          </p>
          <div className="flex gap-4">
            <span className="flex size-10 items-center justify-center rounded-full border border-border text-xs">
              𝕏
            </span>
            <span className="flex size-10 items-center justify-center rounded-full border border-border text-xs">
              IG
            </span>
            <span className="flex size-10 items-center justify-center rounded-full border border-border text-xs">
              YT
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="text-[10px] font-bold uppercase tracking-widest">Navigation</h5>
          <nav className="flex flex-col gap-2 text-sm text-foreground/40">
            <Link to="/courses" className="hover:text-neon">
              Programmes
            </Link>
            <Link to="/trainers" className="hover:text-neon">
              Coaching Staff
            </Link>
            <Link to="/gallery" className="hover:text-neon">
              Gallery
            </Link>
            <Link to="/news" className="hover:text-neon">
              Academy News
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h5 className="text-[10px] font-bold uppercase tracking-widest">Contact</h5>
          <p className="text-sm text-foreground/40">trials@taifootball.academy</p>
          <p className="text-sm font-bold uppercase text-foreground/40">+91 98200 41122</p>
          <p className="text-[10px] uppercase italic tracking-widest text-neon">
            Open for Registration
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-border px-6 pb-12 pt-12 md:flex-row">
        <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/20">
          © 2026 Tai Football Academy. All rights reserved.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-foreground/40">
          <span>Terms</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
