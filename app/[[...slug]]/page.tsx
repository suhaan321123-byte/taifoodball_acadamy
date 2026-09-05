import type { Metadata } from "next";
import RouterApp from "../router-app";

const siteUrl = process.env["NEXT_PUBLIC_SITE_URL"];

type SeoEntry = {
  title: string;
  description: string;
  keywords: string[];
  noindex?: boolean;
};

const pageSeo: Record<string, SeoEntry> = {
  about: {
    title: "About TAi Football Academy | Player Development in Kerala",
    description:
      "Learn how TAi Football Academy develops complete footballers through technical mastery, tactical intelligence, physical resilience, discipline and certified coaching.",
    keywords: [
      "about football academy Kerala",
      "football player development Kozhikode",
      "youth football coaching Balussery",
      "TAi Football Academy coaching philosophy",
    ],
  },
  contact: {
    title: "Contact TAi Football Academy | Book a Football Trial",
    description:
      "Contact TAi Football Academy in Poonoor, Kozhikode to book a football trial, ask about training programs or speak with the admissions team.",
    keywords: [
      "contact football academy Kozhikode",
      "football trial Balussery",
      "TAi Football Academy phone",
      "football training enquiry Kerala",
    ],
  },
  gallery: {
    title: "Football Training Gallery | TAi Football Academy",
    description:
      "View training sessions, matchdays and academy moments from TAi Football Academy in Kerala.",
    keywords: [
      "football academy gallery Kerala",
      "football training photos Kozhikode",
      "TAi Football Academy photos",
    ],
  },
  news: {
    title: "Football Academy News | TAi Football Academy Kerala",
    description:
      "Read match results, coaching updates, academy announcements and football trial news from TAi Football Academy.",
    keywords: [
      "football academy news Kerala",
      "Kozhikode football news",
      "football trial announcements",
      "TAi Football Academy news",
    ],
  },
  privacy: {
    title: "Privacy Policy | TAi Football Academy",
    description:
      "Read the TAi Football Academy Privacy Policy covering personal information, payments, WhatsApp communication and data rights.",
    keywords: ["TAi Football Academy privacy policy", "football academy data privacy"],
  },
  squad: {
    title: "First Team Squad | TAi Football Academy Kerala",
    description:
      "Meet the current TAi Football Academy first team squad and explore the matchday 4-3-3 formation.",
    keywords: [
      "football academy squad Kerala",
      "youth football team Kozhikode",
      "TAi Football Academy players",
    ],
  },
  team: {
    title: "Our Team | TAi Football Academy Coaches and Staff",
    description:
      "Meet the founder, technical director and coaching team developing the next generation of football talent at TAi Football Academy.",
    keywords: [
      "football coaches Kozhikode",
      "football academy coaching staff Kerala",
      "TAi Football Academy team",
    ],
  },
  terms: {
    title: "Terms & Conditions | TAi Football Academy",
    description:
      "Read the terms governing TAi Football Academy registration, training programs, attendance, payments, refunds and website use.",
    keywords: ["TAi Football Academy terms", "football training terms and conditions"],
  },
  trainers: {
    title: "Football Coaches and Trainers | TAi Football Academy",
    description:
      "Meet the certified technical, tactical, performance and ball mastery coaches at TAi Football Academy in Kerala.",
    keywords: [
      "football trainers Kerala",
      "football coaching staff Kozhikode",
      "football academy coaches Balussery",
    ],
  },
  auth: {
    title: "Student Login | TAi Football Academy",
    description:
      "Sign in to the TAi Football Academy student portal to view training and progress.",
    keywords: [],
    noindex: true,
  },
  account: {
    title: "Student Account | TAi Football Academy",
    description: "View your TAi Football Academy training schedule, attendance and progress.",
    keywords: [],
    noindex: true,
  },
};

function createPageMetadata(path: string, seo: SeoEntry): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "en_IN",
      ...(siteUrl ? { url: `${siteUrl}/${path}` } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    ...(siteUrl
      ? {
          metadataBase: new URL(siteUrl),
          alternates: { canonical: `/${path}` },
        }
      : {}),
    ...(seo.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug?.length) {
    const path = slug.join("/");
    const seo = pageSeo[path];

    if (seo) {
      return createPageMetadata(path, seo);
    }

    return {};
  }

  return {
    title: "TAi Football Academy | Elite Football Training in Kerala",
    description:
      "TAi Football Academy develops confident, disciplined footballers through structured training, certified coaching, fitness development and competitive opportunities in Kerala.",
    keywords: [
      "football academy Kerala",
      "football training Kozhikode",
      "football coaching Balussery",
      "youth football academy",
      "TAi Football Academy",
    ],
    openGraph: {
      title: "TAi Football Academy | Elite Football Training in Kerala",
      description:
        "Structured football training, certified coaching and a clear pathway for committed young players.",
      type: "website",
      locale: "en_IN",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: "TAi Football Academy | Elite Football Training in Kerala",
      description:
        "Structured football training, certified coaching and a clear pathway for committed young players.",
    },
    ...(siteUrl
      ? {
          metadataBase: new URL(siteUrl),
          alternates: { canonical: "/" },
        }
      : {}),
  };
}

export default async function LegacyRoutePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "TAi Football Academy",
    description:
      "Football academy providing structured training, certified coaching and player development in Kerala.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9/146, Pandikkak Building",
      addressLocality: "Poonoor, Unnikulam, Balussery",
      addressRegion: "Kerala",
      postalCode: "673574",
      addressCountry: "IN",
    },
    telephone: ["+91 81570 10114", "+91 75940 01414"],
    email: "tfa099@gmail.com",
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  return (
    <>
      {!slug?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}
      <RouterApp />
    </>
  );
}
