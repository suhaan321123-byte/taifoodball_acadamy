import { createFileRoute } from "@tanstack/react-router";
import avatar from "@/assets/avatar.png";
import ajayShankar from "@/assets/ourteam/ajayshankar.jpeg";
import akshayKv from "@/assets/ourteam/akshay kv.jpeg";
import farzin from "@/assets/ourteam/farzin.jpeg";
import sinanPp from "@/assets/ourteam/sinan pp.jpeg";

type TeamMember = {
  name: string;
  image: string;
  role: string;
};

const founder: TeamMember = {
  name: "Rizwan",
  image: avatar,
  role: "Founder",
};

const technicalDirector: TeamMember = {
  name: "Adv. Shahabaz Ahamed",
  image: avatar,
  role: "Technical Director",
};

const trainers: TeamMember[] = [
  { name: "Sinan PP", image: sinanPp, role: "Trainer" },
  { name: "Akshy KV", image: akshayKv, role: "Trainer" },
  { name: "Ajay", image: ajayShankar, role: "Trainer" },
  { name: "Farzin", image: farzin, role: "Trainer" },
  { name: "Dfinu", image: avatar, role: "Trainer" },
  { name: "Jithu", image: avatar, role: "Trainer" },
  { name: "Akshy", image: avatar, role: "Trainer" },
  { name: "Abhi", image: avatar, role: "Trainer" },
  { name: "Ansif", image: avatar, role: "Trainer" },
  { name: "Alfas", image: avatar, role: "Trainer" },
];

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Tai Football Academy" },
      {
        name: "description",
        content:
          "Meet the founder, technical director and trainers behind Tai Football Academy.",
      },
      { property: "og:title", content: "Our Team — Tai Football Academy" },
      {
        property: "og:description",
        content: "The people building the next generation of football talent.",
      },
    ],
  }),
  component: TeamPage,
});

function TeamMemberCard({ member, priority = false }: { member: TeamMember; priority?: boolean }) {
  return (
    <article className="space-y-4">
      <img
        src={member.image}
        alt={`${member.name}, ${member.role}`}
        width={768}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        className="aspect-[3/4] w-full max-w-[240px] rounded-lg border border-border object-cover"
      />
      <div>
        <h3 className="font-display text-xl uppercase tracking-tight">{member.name}</h3>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neon">
          {member.role}
        </p>
      </div>
    </article>
  );
}

function TeamPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">Our Team</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            The people behind <span className="text-neon">the game.</span>
          </h1>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-6 lg:gap-12">
            <div>
              <h2 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-neon">
                Founder
              </h2>
              <div className="max-w-xs">
                <TeamMemberCard member={founder} priority />
              </div>
            </div>
            <div>
              <h2 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-neon">
                Technical Director
              </h2>
              <div className="max-w-xs">
                <TeamMemberCard member={technicalDirector} priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-neon">
            Trainers
          </h2>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((trainer) => (
              <TeamMemberCard key={trainer.name} member={trainer} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
