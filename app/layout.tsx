import type { Metadata } from "next";
import "../src/styles.css";

export const metadata: Metadata = {
  title: "Tai Football Academy - Where Legends Are Born",
  description:
    "Certified football academy with elite coaching, structured training levels, sports news and a student portal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}