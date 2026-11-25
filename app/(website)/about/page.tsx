import type { Metadata } from "next";
import PageContent from "@/components/pages/about";

export const metadata: Metadata = {
  title: "About TAi Football Academy | Coaching Philosophy",

};

export default function Page() {
  return <PageContent />;
}