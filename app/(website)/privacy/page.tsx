import type { Metadata } from "next";
import PageContent from "@/components/pages/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy | TAi Football Academy",

};

export default function Page() {
  return <PageContent />;
}