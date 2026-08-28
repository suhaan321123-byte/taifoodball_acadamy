import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Student Account — Tai Football Academy" },
      {
        name: "description",
        content:
          "Your academy dashboard: current programme, attendance, ranking and upcoming training sessions.",
      },
      { property: "og:title", content: "My Student Account — Tai Football Academy" },
      {
        property: "og:description",
        content: "Track your programme, attendance and upcoming academy sessions.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      void navigate({ to: "/auth", search: { mode: "login" } });
    }
  }, [loading, user, navigate]);

  const profileQuery = useQuery({
    queryKey: ["profile", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const sessionsQuery = useQuery({
    queryKey: ["training-sessions"],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("training_sessions")
        .select("*")
        .order("starts_at", { ascending: true })
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
  });

  const matchesQuery = useQuery({
    queryKey: ["matches"],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("kickoff_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const attendanceQuery = useQuery({
    queryKey: ["attendance", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("user_id", user!.id)
        .order("session_date", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data ?? [];
    },
  });

  const feesQuery = useQuery({
    queryKey: ["fees", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fees")
        .select("*")
        .eq("user_id", user!.id)
        .order("due_date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (loading || !user) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow">Loading your account…</p>
      </main>
    );
  }

  const profile = profileQuery.data;
  const displayName = profile?.full_name?.trim() || user.email?.split("@")[0] || "Student";
  const initials = displayName.slice(0, 2).toUpperCase();

  const attendance = attendanceQuery.data ?? [];
  const presentCount = attendance.filter((a) => a.status !== "absent").length;
  const attendanceRate =
    attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0;

  const fees = feesQuery.data ?? [];
  const pendingFees = fees.filter((f) => !f.paid);
  const pendingTotal = pendingFees.reduce((sum, f) => sum + Number(f.amount), 0);
  const currency = (value: number) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const matches = matchesQuery.data ?? [];
  const now = Date.now();
  const upcomingMatches = matches
    .filter((m) => new Date(m.kickoff_at).getTime() >= now)
    .sort((a, b) => new Date(a.kickoff_at).getTime() - new Date(b.kickoff_at).getTime());
  const pastMatches = matches.filter((m) => new Date(m.kickoff_at).getTime() < now);

  const statusStyles: Record<string, string> = {
    present: "bg-neon/15 text-neon",
    late: "bg-amber-400/15 text-amber-300",
    absent: "bg-red-500/15 text-red-400",
  };

  return (
    <main className="pb-24">
      <section className="border-b border-border py-14">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-neon font-display text-xl text-pitch">
              {initials}
            </span>
            <div>
              <h1 className="font-display text-3xl uppercase tracking-tight">{displayName}</h1>
              <p className="text-xs uppercase tracking-widest text-foreground/40">
                Academy ID: #TFA-{user.id.slice(0, 4).toUpperCase()}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              toast.success("Signed out");
              void navigate({ to: "/" });
            }}
            className="btn-ghost"
          >
            Sign out
          </button>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3">
          <div className="rounded-2xl border-l-4 border-neon bg-surface/50 p-8 lg:col-span-2">
            <p className="text-[10px] uppercase tracking-widest text-foreground/40">
              Current course
            </p>
            <p className="mt-1 font-display text-3xl uppercase tracking-tight">
              {profile?.program ?? "Foundation Technical"}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-foreground/40">
              {profile?.level ?? "Level 1"}
            </p>
            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full bg-neon transition-all"
                style={{ width: `${profile?.progress_percent ?? 0}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-widest text-foreground/40">
              {profile?.progress_percent ?? 0}% of term completed
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl bg-foreground/5 p-6 text-center">
              <span className="block font-display text-4xl">{attendanceRate}%</span>
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">
                Attendance
              </span>
            </div>
            <div className="rounded-2xl bg-foreground/5 p-6 text-center">
              <span className="block font-display text-4xl">{profile?.ranking ?? "—"}</span>
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">
                Ranking
              </span>
            </div>
            <div className="rounded-2xl bg-foreground/5 p-6 text-center">
              <span className="block font-display text-4xl">{profile?.sessions_attended ?? 0}</span>
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">
                Sessions
              </span>
            </div>
            <div
              className={`rounded-2xl p-6 text-center ${pendingTotal > 0 ? "bg-red-500/10" : "bg-foreground/5"}`}
            >
              <span className="block font-display text-3xl">{currency(pendingTotal)}</span>
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">
                Fees pending
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-tight">Matches</h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface/40">
              {matchesQuery.isLoading ? (
                <p className="p-6 text-sm text-foreground/40">Loading fixtures…</p>
              ) : matches.length === 0 ? (
                <p className="p-6 text-sm text-foreground/40">No fixtures published yet.</p>
              ) : (
                [...upcomingMatches, ...pastMatches].slice(0, 6).map((match) => (
                  <div
                    key={match.id}
                    className="flex flex-wrap items-center justify-between gap-3 p-5"
                  >
                    <div>
                      <p className="font-display text-xl uppercase tracking-tight">
                        {match.home_away === "home" ? "vs" : "@"} {match.opponent}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-foreground/40">
                        {match.competition} · {match.venue}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neon">
                        {new Date(match.kickoff_at).toLocaleString(undefined, {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-foreground/40">
                        {match.result ?? "Upcoming"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl uppercase tracking-tight">Attendance record</h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface/40">
              {attendanceQuery.isLoading ? (
                <p className="p-6 text-sm text-foreground/40">Loading attendance…</p>
              ) : attendance.length === 0 ? (
                <p className="p-6 text-sm text-foreground/40">No attendance recorded yet.</p>
              ) : (
                attendance.slice(0, 6).map((record) => (
                  <div key={record.id} className="flex items-center justify-between gap-3 p-5">
                    <div>
                      <p className="font-display text-xl uppercase tracking-tight">
                        {record.session_title}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-foreground/40">
                        {new Date(record.session_date).toLocaleDateString(undefined, {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${statusStyles[record.status] ?? "bg-foreground/10 text-foreground/60"}`}
                    >
                      {record.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl uppercase tracking-tight">Fees</h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface/40">
            {feesQuery.isLoading ? (
              <p className="p-6 text-sm text-foreground/40">Loading fee statement…</p>
            ) : fees.length === 0 ? (
              <p className="p-6 text-sm text-foreground/40">No invoices raised yet.</p>
            ) : (
              fees.map((fee) => (
                <div key={fee.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="font-display text-xl uppercase tracking-tight">
                      {fee.description}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-foreground/40">
                      Due{" "}
                      {new Date(fee.due_date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-2xl">{currency(Number(fee.amount))}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${fee.paid ? "bg-neon/15 text-neon" : "bg-red-500/15 text-red-400"}`}
                    >
                      {fee.paid ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          {pendingTotal > 0 && (
            <p className="mt-4 text-xs uppercase tracking-widest text-foreground/40">
              {pendingFees.length} pending invoice{pendingFees.length > 1 ? "s" : ""} ·{" "}
              {currency(pendingTotal)} outstanding
            </p>
          )}
        </div>
      </section>


      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl uppercase tracking-tight">Upcoming training</h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface/40">
            {sessionsQuery.isLoading ? (
              <p className="p-6 text-sm text-foreground/40">Loading timetable…</p>
            ) : (sessionsQuery.data ?? []).length === 0 ? (
              <p className="p-6 text-sm text-foreground/40">No sessions scheduled yet.</p>
            ) : (
              (sessionsQuery.data ?? []).map((session) => (
                <div
                  key={session.id}
                  className="flex flex-wrap items-center justify-between gap-2 p-5"
                >
                  <div>
                    <p className="font-display text-xl uppercase tracking-tight">{session.title}</p>
                    <p className="text-xs uppercase tracking-widest text-foreground/40">
                      {session.coach} · {session.location}
                    </p>
                  </div>
                  <p className="text-sm text-neon">
                    {new Date(session.starts_at).toLocaleString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            )}
          </div>

          <Link to="/contact" className="btn-neon mt-10">
            Enquire about programmes
          </Link>
        </div>
      </section>
    </main>
  );
}
