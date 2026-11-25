import type { Metadata } from "next";
import PageContent from "@/components/pages/gallery";
import { PublicAcademyContentProvider } from "@/context/PublicAcademyContentContext";
import { getServerPublicContent } from "@/lib/serverPublicContent";

export const metadata: Metadata = { title: "Gallery | TAi Football Academy" };

export default async function GalleryPage() {
  const content = await getServerPublicContent(["gallery"]);
  return <PublicAcademyContentProvider value={content}><PageContent /></PublicAcademyContentProvider>;
}