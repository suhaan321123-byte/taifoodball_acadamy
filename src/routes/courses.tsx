import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { courses } from "@/data/academy";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Training Courses & Fees — Tai Football Academy" },
      {
        name: "description",
        content:
          "Three structured football training levels from foundation technical work to the elite pro pathway, with fees, ages and weekly session counts.",
      },
      { property: "og:title", content: "Training Courses — Tai Football Academy" },
      {
        property: "og:description",
        content:
          "Foundation, Advanced Tactical and Elite Pro Pathway programmes with transparent monthly fees.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">Courses</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            Three levels. <span className="text-neon">One pathway.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/60">
            Every student is placed by assessment, not age alone. Progression between levels is
            reviewed each term against technical, tactical and physical benchmarks.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.title}
              className="flex flex-col rounded-lg border border-border bg-surface/40 p-8"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-neon">
                {course.level}
              </span>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-tight">
                {course.title}
              </h2>
              <p className="mt-2 text-[11px] uppercase tracking-widest text-foreground/40">
                {course.duration}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-foreground/50">
                {course.description}
              </p>
              <ul className="mt-6 space-y-3">
                {course.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground/70">
                    <Check className="mt-0.5 size-4 shrink-0 text-neon" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-display text-3xl">{course.price}</p>
              <Link to="/contact" className="btn-neon mt-6">
                Enquire
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
