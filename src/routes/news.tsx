import { createFileRoute } from "@tanstack/react-router";
import { news } from "@/data/academy";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Sports News — Tai Football Academy" },
      {
        name: "description",
        content:
          "Academy results, coaching appointments and trial announcements from Tai Football Academy.",
      },
      { property: "og:title", content: "Sports News — Tai Football Academy" },
      {
        property: "og:description",
        content: "Match results, coaching news and trial announcements from the academy.",
      },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">Sports news</p>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            Pitch <span className="text-neon">news</span>.
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl space-y-16 px-6">
          {news.map((item) => (
            <article key={item.slug} className="grid gap-8 lg:grid-cols-[2fr_3fr]">
              <img
                src={item.image}
                alt={item.title}
                width={1024}
                height={640}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-lg object-cover"
              />
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neon">
                    {item.category}
                  </span>
                  <time className="text-[10px] uppercase tracking-widest text-foreground/40">
                    {item.date}
                  </time>
                </div>
                <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-tight">
                  {item.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {item.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-foreground/60">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
