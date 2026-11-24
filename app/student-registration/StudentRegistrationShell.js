"use client";

import { SiteHeader } from "../../src/components/site/SiteHeader";
import { SiteFooter } from "../../src/components/site/SiteFooter";

export default function StudentRegistrationShell({ children }) {
  return (
    <div className="min-h-screen bg-pitch text-foreground">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
