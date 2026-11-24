"use client";

import { SiteHeader } from "../../src/components/site/SiteHeader";
import { SiteFooter } from "../../src/components/site/SiteFooter";
import { MobileTabBar } from "../../src/components/site/MobileTabBar";

export default function StudentPortalShell({ children }) {
  return (
    <div className="min-h-screen bg-pitch text-foreground">
      <SiteHeader />
      {children}
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}
