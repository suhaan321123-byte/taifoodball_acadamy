import { createFileRoute } from "@tanstack/react-router";
import { trainers } from "@/data/academy";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Coaching Staff — Tai Football Academy Trainers" },
      {
        name: "description",
        content:
          "Meet the certified coaching staff at Tai Football Academy: technical, tactical, performance and ball mastery specialists.",
      },
      { property: "og:title", content: "Coaching Staff — Tai Football Academy" },
      {
        property: "og:description",
        content: "Certified technical, performance and ball mastery coaches behind every session.",
      },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">Trainers</p>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            The <span className="text-neon">squad staff</span>.
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <div key={trainer.name} className="space-y-4">
              <div className="relative">
                <img
                  src={trainer.image}
                  alt={`${trainer.name}, ${trainer.role}`}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-lg object-cover"
                />
                <span className="absolute left-4 top-2 font-display text-6xl text-neon/40">
                  {trainer.number}
                </span>
              </div>
              <div>
                <h2 className="font-display text-xl uppercase tracking-tight">{trainer.name}</h2>
                <p className="text-xs uppercase tracking-widest text-foreground/40">
                  {trainer.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/50">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
