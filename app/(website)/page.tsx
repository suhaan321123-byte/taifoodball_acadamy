import type { Metadata } from "next";
import PageContent from "@/components/pages";
import { PublicAcademyContentProvider } from "@/context/PublicAcademyContentContext";
import { getServerPublicContent } from "@/lib/serverPublicContent";

export const metadata: Metadata = {
  title: "TAi Football Academy | Where Legends Are Born",
  description: "Certified football academy with elite coaching, structured training and a student portal.",
};

export default async function HomePage() {
  const content = await getServerPublicContent(["news", "gallery", "testimonials"]);
  return <PublicAcademyContentProvider value={content}><PageContent /></PublicAcademyContentProvider>;
}