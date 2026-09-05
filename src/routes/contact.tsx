import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Trials — Tai Football Academy" },
      {
        name: "description",
        content:
          "Book a trial session, ask about fees or visit the academy. Phone, email and ground address for Tai Football Academy.",
      },
      { property: "og:title", content: "Contact & Trials — Tai Football Academy" },
      {
        property: "og:description",
        content: "Book a trial session or enquire about our training programmes.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            Book a <span className="text-neon">trial</span>.
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[3fr_2fr]">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setSending(true);
              const form = event.currentTarget;
              setTimeout(() => {
                setSending(false);
                form.reset();
                toast.success("Enquiry sent. Our admissions team will call you within 24 hours.");
              }, 600);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                  Player name
                </span>
                <input
                  required
                  name="name"
                  className="mt-2 w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                  Age
                </span>
                <input
                  required
                  name="age"
                  type="number"
                  min={6}
                  max={30}
                  className="mt-2 w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                Phone
              </span>
              <input
                required
                name="phone"
                className="mt-2 w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                Email
              </span>
              <input
                required
                name="email"
                type="email"
                className="mt-2 w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                Message
              </span>
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon"
              />
            </label>
            <button type="submit" disabled={sending} className="btn-neon disabled:opacity-60">
              {sending ? "Sending…" : "Send enquiry"}
            </button>
          </form>

          <div className="space-y-8 rounded-lg border border-border bg-surface/40 p-8">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-tight">Academy ground</h2>
              <p className="mt-3 flex gap-3 text-sm text-foreground/60">
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
            <div className="space-y-3">
              <p className="flex gap-3 text-sm text-foreground/60">
                <Phone className="mt-0.5 size-4 shrink-0 text-neon" />
                +91 81570 10114
              </p>
              <p className="flex gap-3 text-sm text-foreground/60">
                <Phone className="mt-0.5 size-4 shrink-0 text-neon" />
                +91 75940 01414
              </p>
              <p className="flex gap-3 text-sm text-foreground/60">
                <Mail className="mt-0.5 size-4 shrink-0 text-neon" />
                tfa099@gmail.com
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                Training hours
              </h3>
              <p className="mt-2 text-sm text-foreground/60">Mon–Sat · 06:00–09:00, 16:00–20:00</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
