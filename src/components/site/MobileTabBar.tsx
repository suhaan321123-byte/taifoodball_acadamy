"use client";

import { Home, Newspaper, Shield, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function MobileTabBar() {
  const { user } = useAuth();

  const tabs = [
    { href: "/", label: "Home", icon: Home },
    { href: "/squad", label: "Squad", icon: Shield },
    { href: "/news", label: "News", icon: Newspaper },
    { href: user ? "/student-dashboard" : "/auth", label: "Account", icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 border-t border-border bg-pitch lg:hidden">
      <div className="grid w-full grid-cols-4">
        {tabs.map((tab) => (
          <a
            key={tab.label}
            href={tab.href}
            className="flex flex-col items-center justify-center gap-1 text-foreground/40"
          >
            <tab.icon className="size-5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{tab.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
