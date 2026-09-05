import { createFileRoute, Link } from "@tanstack/react-router";
import Image from "next/image";
import heroBanner from "@/assets/herobanner.png";
import gainSponsor from "@/assets/gain.jpg";
import terraSponsor from "@/assets/terra.jpg";
import galleryImage1 from "@/assets/gallery/IMG-20240120-WA0010.jpg.jpeg";
import galleryImage2 from "@/assets/gallery/IMG-20240122-WA0035.jpg.jpeg";
import galleryImage3 from "@/assets/gallery/IMG-20250405-WA0008.jpg.jpeg";
import galleryImage4 from "@/assets/gallery/IMG-20250415-WA0022.jpg.jpeg";
import galleryImage5 from "@/assets/gallery/IMG_20240826_223150_399.webp";
import galleryImage6 from "@/assets/gallery/IMG_20240908_134256_631.webp";
import { certifications, news } from "@/data/academy";

type ImportedImage = string | { src: string };

function getImageSrc(image: ImportedImage): string {
  return typeof image === "string" ? image : image.src;
}

const galleryImages = [
  { src: getImageSrc(galleryImage1), alt: "Young players training on the pitch" },
  { src: getImageSrc(galleryImage2), alt: "Football academy training session" },
  { src: getImageSrc(galleryImage3), alt: "Players competing in an academy match" },
  { src: getImageSrc(galleryImage4), alt: "Team football action" },
  { src: getImageSrc(galleryImage5), alt: "Academy players during practice" },
  { src: getImageSrc(galleryImage6), alt: "Players developing their football skills" },
];

const testimonials = [
  {
    name: "Rishan",
    quote:
      "ഇവിടത്തെ ഓരോ ട്രെയിനിംഗ് സെഷനും ഞാൻ നന്നായി എൻജോയ് ചെയ്യുന്നു. പുതിയ സ്കിൽസും ഫിറ്റ്നസ് ട്രെയിനിംഗും കിട്ടുന്നുണ്ട്. കോച്ചുമാർ എപ്പോഴും നല്ല രീതിയിൽ മോട്ടിവേറ്റ് ചെയ്യും.",
  },
  {
    name: "Nihal",
    quote:
      "The training is very systematic. We practice passing, shooting, dribbling and fitness. I can really see improvement in my game.",
  },
  {
    name: "Shamil",
    quote:
      "Training here is challenging but fun. I have improved my stamina, ball control and confidence.",
  },
  {
    name: "Arjun",
    quote:
      "Good academy for anyone who seriously wants to improve in football. Coaches explain things clearly and give us enough practice.",
  },
  {
    name: "Rayan",
    quote:
      "ഇവിടെ ട്രെയിനിംഗിന് വരാൻ എനിക്ക് വളരെ ഇഷ്ടമാണ്. നല്ല ഫ്രണ്ട്ലി അന്തരീക്ഷമാണ്. ഫ്രണ്ട്സിനൊപ്പം എൻജോയ് ചെയ്തുകൊണ്ട് ഫുട്ബോൾ പഠിക്കാനും കഴിയുന്നു.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tai Football Academy — Where Legends Are Born" },
      {
        name: "description",
        content:
          "Certified football academy with elite coaching, structured training levels, sports news and a student portal for attendance and progress.",
      },
      { property: "og:title", content: "Tai Football Academy — Where Legends Are Born" },
      {
        property: "og:description",
        content:
          "Professional training, tactical intelligence and peak conditioning for committed young footballers.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden lg:h-[90vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBanner}
            alt="Tai Football Academy youth players sprinting with the ball at sunset"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pitch via-pitch/60 to-pitch/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <span className="mb-6 inline-block bg-neon px-3 py-1 text-xs font-bold uppercase italic tracking-tighter text-pitch">
              Elite Academy
            </span>
            <h1 className="mb-8 font-display text-6xl uppercase leading-[0.85] tracking-tighter sm:text-7xl lg:text-9xl">
              Where <span className="text-neon">Legends</span> <br />
              Are Born.
            </h1>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-foreground/60">
              Professional training, tactical intelligence, and peak physical conditioning.
              Certified pathways to serious football careers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-neon">
                Join Academy
              </Link>
              <Link to="/contact" className="btn-ghost">
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-[10px] uppercase tracking-[0.4em] text-foreground/40">
            Affiliated &amp; Certified By
          </p>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {certifications.map((item) => (
              <span
                key={item}
                className="rounded border border-border px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground/50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl uppercase tracking-tighter sm:text-5xl">
              Pitch News
            </h2>
            <Link
              to="/news"
              className="border-b border-neon pb-1 text-xs font-bold uppercase tracking-widest text-neon"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {news.slice(0, 2).map((item) => (
              <article key={item.slug} className="group">
                <img
                  src={getImageSrc(item.image as ImportedImage)}
                  alt={item.title}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="mb-6 aspect-[16/10] w-full rounded-lg object-cover"
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neon">
                  {item.category}
                </span>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-tight transition-colors group-hover:text-neon">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/50">{item.excerpt}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/50 p-8">
          <div className="mb-8 flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-neon font-bold text-pitch">
              TF
            </span>
            <div>
              <h4 className="font-display uppercase tracking-tight">Student Portal</h4>
              <p className="text-xs text-foreground/40">Attendance · Progress · Timetable</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border-l-4 border-neon bg-pitch p-4">
              <p className="mb-1 text-[10px] uppercase text-foreground/40">Track your course</p>
              <p className="font-display uppercase tracking-wide">Level progress &amp; ranking</p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                <div className="h-full w-[65%] bg-neon" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-foreground/5 p-4 text-center">
                <span className="block font-display text-2xl">14</span>
                <span className="text-[9px] uppercase tracking-widest text-foreground/40">
                  Sessions
                </span>
              </div>
              <div className="rounded-xl bg-foreground/5 p-4 text-center">
                <span className="block font-display text-2xl">A+</span>
                <span className="text-[9px] uppercase tracking-widest text-foreground/40">
                  Ranking
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                Upcoming Training
              </p>
              <div className="flex items-center justify-between border-b border-border py-2 text-sm">
                <span>Free Kick Mastery</span>
                <span className="text-foreground/40">16:00</span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-2 text-sm">
                <span>Stamina Testing</span>
                <span className="text-foreground/40">Mon, 09:00</span>
              </div>
            </div>

            <Link
              to="/auth"
              search={{ mode: "login" }}
              className="block w-full rounded-lg bg-foreground/10 py-3 text-center text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-neon hover:text-pitch"
            >
              Enter Student Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/20 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 font-display text-4xl uppercase tracking-tighter sm:text-5xl">
            Sponsors
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex aspect-[3/1] items-center justify-center rounded-lg border border-border bg-background p-8">
              <img
                src={getImageSrc(gainSponsor)}
                alt="Gain sponsor"
                width={1200}
                height={400}
                loading="lazy"
                className="max-h-full w-full object-contain"
              />
            </div>
            <div className="flex aspect-[3/1] items-center justify-center rounded-lg border border-border bg-background p-8">
              <img
                src={getImageSrc(terraSponsor)}
                alt="Terra sponsor"
                width={1200}
                height={400}
                loading="lazy"
                className="max-h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="overflow-hidden border-t border-border py-16"
        aria-label="Academy gallery"
      >
        <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-6 px-6">
          <div>
            <p className="eyebrow">From the pitch</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-tighter sm:text-5xl">
              Academy in <span className="text-neon">motion</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="hidden border-b border-neon pb-1 text-xs font-bold uppercase tracking-widest text-neon sm:block"
          >
            View gallery
          </Link>
        </div>

        <div className="image-marquee" aria-hidden="true">
          <div className="image-marquee__track">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="image-marquee__card overflow-hidden rounded-lg border border-border bg-surface/40"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={640}
                  height={480}
                  sizes="(max-width: 768px) 80vw, 320px"
                  className="size-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 px-6 text-center sm:hidden">
          <Link
            to="/gallery"
            className="border-b border-neon pb-1 text-xs font-bold uppercase tracking-widest text-neon"
          >
            View gallery
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-surface/20 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow">Player perspective</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-tighter sm:text-5xl">
              What our students <span className="text-neon">say</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex min-h-52 flex-col justify-between rounded-lg border border-border bg-background/70 p-6"
              >
                <blockquote className="text-sm leading-relaxed text-foreground/70">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-4 text-xs font-bold uppercase tracking-widest text-neon">
                  {testimonial.name} <span className="text-foreground/40">- Student</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
