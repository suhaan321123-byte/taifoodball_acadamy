import type { Metadata } from "next";
import PageContent from "@/components/pages/news";
import { PublicAcademyContentProvider } from "@/context/PublicAcademyContentContext";
import { getServerPublicContent } from "@/lib/serverPublicContent";

export const metadata: Metadata = { title: "Academy News | TAi Football Academy" };

export default async function NewsPage() {
  const content = await getServerPublicContent(["news"]);
  return <PublicAcademyContentProvider value={content}><PageContent /></PublicAcademyContentProvider>;
}