import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImage from "@/assets/about.jpg";
import { certifications } from "@/data/academy";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tai Football Academy — Our Coaching Philosophy" },
      {
        name: "description",
        content:
          "Founded to develop complete footballers: technical mastery, tactical intelligence and physical resilience, backed by certified coaching staff.",
      },
      { property: "og:title", content: "About Tai Football Academy" },
      {
        property: "og:description",
        content:
          "Our philosophy, facilities and certifications — how Tai Football Academy develops complete footballers.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    title: "Technical First",
    body: "Every session starts with the ball. Repetition under pressure builds a first touch that holds up in real matches.",
  },
  {
    title: "Tactical Intelligence",
    body: "Players learn to read space, not memorise patterns. Weekly video review turns instinct into understanding.",
  },
  {
    title: "Physical Resilience",
    body: "Age-appropriate strength, conditioning and recovery programmes designed by our performance staff.",
  },
];

function AboutPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">About the academy</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            Built for players who <span className="text-neon">refuse average</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/60">
            Tai Football Academy was founded in 2018 with one goal: give committed young players the
            same structured development a professional club environment provides. Today we train over
            three hundred students across three levels, with certified coaches and year-round
            scouting exposure.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <img
            src={aboutImage}
            alt="Academy training session at dusk on a floodlit pitch"
            width={1200}
            height={900}
            loading="lazy"
            className="w-full rounded-lg object-cover"
          />
          <div className="space-y-8">
            {pillars.map((pillar, index) => (
              <div key={pillar.title} className="border-l-4 border-neon pl-6">
                <span className="font-display text-3xl text-neon/30">0{index + 1}</span>
                <h2 className="mt-1 font-display text-2xl uppercase tracking-tight">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/50">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-4">
            {[
              { value: "300+", label: "Active students" },
              { value: "12", label: "Certified coaches" },
              { value: "08", label: "Years running" },
              { value: "24", label: "Pro trials earned" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="block font-display text-5xl text-neon">{stat.value}</span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-foreground/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-4xl uppercase tracking-tighter">Certified By</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {certifications.map((item) => (
              <span
                key={item}
                className="rounded border border-border px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-foreground/60"
              >
                {item}
              </span>
            ))}
          </div>
          <Link to="/contact" className="btn-neon mt-12">
            Book a trial
          </Link>
        </div>
      </section>
    </main>
  );
}
