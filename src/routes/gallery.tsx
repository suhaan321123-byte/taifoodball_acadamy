import { createFileRoute } from "@tanstack/react-router";
import { galleryImages } from "@/data/academy";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Tai Football Academy Training & Matchdays" },
      {
        name: "description",
        content:
          "Photos from academy training sessions, matchdays and trophy nights at Tai Football Academy.",
      },
      { property: "og:title", content: "Gallery — Tai Football Academy" },
      {
        property: "og:description",
        content: "Training sessions, matchdays and trophy nights from inside the academy.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">Gallery</p>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            Inside the <span className="text-neon">floodlights</span>.
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <img
              key={image.alt}
              src={image.src}
              alt={image.alt}
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
