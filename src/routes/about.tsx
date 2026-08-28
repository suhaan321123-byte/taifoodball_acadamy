import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImage from "@/assets/IMG-20240122-WA0035.jpg.jpeg";
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
    title: "Our Vision",
    body: "To become a leading centre for youth football development, producing skilled, disciplined, and confident players who can compete at higher levels.",
  },
  {
    title: "Our Mission",
    body: "To provide quality football education and meaningful competitive opportunities while developing players with the skills, mindset, and values required to succeed.",
  },
];

function AboutPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">About us</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            Developing players <span className="text-neon">with purpose</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/60">
            TAi Football Academy was founded in 2016 with a clear vision to develop young
            footballers through quality coaching, discipline, teamwork, and a genuine passion for
            the game.
            <br />
            <br />
            We believe football is more than just a sport. It is a journey that builds confidence,
            character, leadership, fitness, and lifelong values.
            <br />
            <br />
            From grassroots development to competitive football, TAi Football Academy provides young
            players with the right environment to learn, improve, compete, and dream bigger.
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
