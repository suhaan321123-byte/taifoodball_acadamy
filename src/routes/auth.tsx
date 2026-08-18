import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Student Login — Tai Football Academy" },
      {
        name: "description",
        content:
          "Sign in to the Tai Football Academy student portal to view your training timetable, attendance and progress.",
      },
      { property: "og:title", content: "Student Login — Tai Football Academy" },
      {
        property: "og:description",
        content: "Access your academy timetable, attendance record and level progress.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    mode: search['mode'] === "signup" ? "signup" : "login",
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [busy, setBusy] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading && user) {
      void navigate({ to: "/account" });
    }
  }, [loading, user, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Account created. Welcome to the academy.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      void navigate({ to: "/account" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/account" });
  }

  return (
    <main className="mx-auto flex max-w-md flex-col justify-center px-6 py-20">
      <p className="eyebrow">Student portal</p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-tighter">
        {isSignup ? (
          <>
            Create your <span className="text-neon">account</span>.
          </>
        ) : (
          <>
            Student <span className="text-neon">login</span>.
          </>
        )}
      </h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        {isSignup ? (
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
              Full name
            </span>
            <input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon"
            />
          </label>
        ) : null}
        <label className="block">
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
            Email
          </span>
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon"
          />
        </label>
        <label className="block">
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
            Password
          </span>
          <input
            required
            type="password"
            minLength={6}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon"
          />
        </label>

        <button type="submit" disabled={busy} className="btn-neon w-full disabled:opacity-60">
          {busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="btn-ghost mt-4 w-full disabled:opacity-60"
      >
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => setIsSignup((value) => !value)}
        className="mt-8 text-xs uppercase tracking-widest text-foreground/50 hover:text-neon"
      >
        {isSignup ? "Already registered? Sign in" : "New student? Create an account"}
      </button>
    </main>
  );
}
