"use client";

import { ArrowLeft, Chrome, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { sendWebsiteEmailOtp, verifyWebsiteEmailOtp } from "@/api/auth/auth";
import { setCustomerToken, setStudentSession } from "@/utils/tokenKey";


export default function AuthPage() {
  const [authStep, setAuthStep] = useState<"buttons" | "email" | "emailOtp">("buttons");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const returnTo = "/student-dashboard";

  async function handleGoogleLogin() {
    setBusy(true);
    setError("");
    try {
      const backendUrl = process.env["NEXT_PUBLIC_BACKEND_URL"];
      if (!backendUrl) throw new Error("Backend URL is not configured.");
      const url = new URL("/auth/google/website/login/url", backendUrl);
      url.searchParams.set("origin", window.location.origin);
      url.searchParams.set("returnTo", returnTo);
      url.searchParams.set("loginType", "student");
      const response = await fetch(url);
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.message || "Failed to start Google login.");
      if (!result?.authUrl) throw new Error("The server did not return a Google sign-in URL.");
      window.location.assign(result.authUrl);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Google login failed.");
      setBusy(false);
    }
  }

  async function handleSendOtp() {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await sendWebsiteEmailOtp({
        email: normalizedEmail,
        origin: window.location.origin,
        returnTo,
        subdomain: window.location.hostname,
      });
      if (response?.success === false) throw new Error(response.message || "Failed to send code.");
      setOtp("");
      setAuthStep("emailOtp");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Failed to send email code.");
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyOtp() {
    const normalizedEmail = email.trim().toLowerCase();
    const code = otp.trim();
    if (!code) return setError("Enter the verification code sent to your email.");
    setBusy(true);
    setError("");
    try {
      const response = await verifyWebsiteEmailOtp({
        email: normalizedEmail,
        otp: code,
        origin: window.location.origin,
        returnTo,
        subdomain: window.location.hostname,
      });
      if (response?.success === false) throw new Error(response.message || "Email verification failed.");
      if (!response?.token) throw new Error("Login succeeded without returning an access token.");
      const session = {
        token: response.token,
        authMethod: "email",
        email: normalizedEmail,
        expiration: 240 * 60 * 60 * 1000,
        expiresAt: new Date(Date.now() + 240 * 60 * 60 * 1000).toISOString(),
        data: response.data || {},
      };
      setCustomerToken(response.token);
      setStudentSession(session);
      window.location.assign("/student-dashboard");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Email login failed.");
    } finally {
      setBusy(false);
    }
  }

  const errorBanner = error ? (
    <div role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-left text-sm text-red-300">
      {error}
    </div>
  ) : null;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="eyebrow">Student portal</p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-tighter">
        Student <span className="text-neon">login</span>.
      </h1>
      <p className="mt-4 text-sm text-foreground/55">
        Sign in to view your academy profile, course, attendance and fee information.
      </p>

      <div className="mt-8 space-y-4">
        {authStep === "buttons" ? (
          <>
            {errorBanner}
            <button type="button" onClick={handleGoogleLogin} disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-neon px-4 text-sm font-bold uppercase tracking-widest text-pitch disabled:opacity-60">
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Chrome className="size-4" />}
              {busy ? "Opening Google…" : "Login with Google"}
            </button>
            <button type="button" onClick={() => { setError(""); setAuthStep("email"); }} className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border px-4 text-sm font-bold uppercase tracking-widest hover:border-neon">
              <Mail className="size-4" /> Login with Email
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => { setError(""); setAuthStep(authStep === "emailOtp" ? "email" : "buttons"); }} className="flex items-center gap-2 text-sm text-foreground/60 hover:text-neon">
              <ArrowLeft className="size-4" /> Back
            </button>
            <h2 className="font-display text-2xl uppercase">{authStep === "email" ? "Login with email" : "Verify your email"}</h2>
            <p className="text-sm text-foreground/55">
              {authStep === "email" ? "We’ll send a one-time code to your inbox." : `Enter the code sent to ${email}.`}
            </p>
            {errorBanner}
            {authStep === "email" ? (
              <input type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} onKeyDown={(event) => event.key === "Enter" && void handleSendOtp()} placeholder="you@example.com" className="w-full rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm outline-none focus:border-neon" />
            ) : (
              <input inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => { setOtp(event.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} onKeyDown={(event) => event.key === "Enter" && void handleVerifyOtp()} placeholder="6-digit code" className="w-full rounded-xl border border-border bg-surface/40 px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-neon" />
            )}
            <button type="button" onClick={() => void (authStep === "email" ? handleSendOtp() : handleVerifyOtp())} disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-neon px-4 text-sm font-bold uppercase tracking-widest text-pitch disabled:opacity-60">
              {busy ? <Loader2 className="size-4 animate-spin" /> : null}
              {busy ? "Please wait…" : authStep === "email" ? "Send email code" : "Verify and login"}
            </button>
            {authStep === "emailOtp" ? <button type="button" onClick={() => void handleSendOtp()} disabled={busy} className="w-full text-sm text-neon hover:underline">Resend code</button> : null}
          </>
        )}
      </div>
    </main>
  );
}
