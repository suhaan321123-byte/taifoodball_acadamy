import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileTabBar } from "@/components/site/MobileTabBar";

export default function WebsiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-pitch text-foreground">
      <SiteHeader />
      {children}
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}