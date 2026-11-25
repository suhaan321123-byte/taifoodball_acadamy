import type { Metadata } from "next";
import PageContent from "@/components/pages/team";

export const metadata: Metadata = {
  title: "Our Team | TAi Football Academy",

};

export default function Page() {
  return <PageContent />;
}