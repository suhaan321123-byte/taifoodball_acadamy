import type { Metadata } from "next";
import PageContent from "@/components/pages/auth";

export const metadata: Metadata = {
  title: "Student Login | TAi Football Academy",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PageContent />;
}