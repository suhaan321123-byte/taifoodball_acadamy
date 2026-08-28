import { Link } from "@tanstack/react-router";
import { Home, Newspaper, User, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function MobileTabBar() {
  const { user } = useAuth();

  const tabs = [
    { to: "/", label: "Home", icon: Home, exact: true },
    { to: "/team", label: "Our Team", icon: Users, exact: false },
    { to: "/news", label: "News", icon: Newspaper, exact: false },
    { to: user ? "/account" : "/auth", label: "Account", icon: User, exact: false },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 border-t border-border bg-pitch lg:hidden">
      <div className="grid w-full grid-cols-4">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.to}
            className="flex flex-col items-center justify-center gap-1 text-foreground/40"
            activeProps={{ className: "text-neon" }}
            activeOptions={{ exact: tab.exact }}
          >
            <tab.icon className="size-5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
