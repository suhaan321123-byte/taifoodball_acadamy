import type { Metadata } from "next";
import PageContent from "@/components/pages/squad";

export const metadata: Metadata = {
  title: "First Team Squad | TAi Football Academy",

};

export default function Page() {
  return <PageContent />;
}