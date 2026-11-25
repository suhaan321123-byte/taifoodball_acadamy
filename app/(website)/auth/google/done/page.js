"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudentAuthDataApi } from "@/api/businessWebsite/studentApi/studentApi";
import { setCustomerToken, setStudentSession } from "@/utils/tokenKey";

function decodeBase64UrlJson(value) {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const bytes = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

export default function GoogleAuthDonePage() {
  const router = useRouter();
  const [status, setStatus] = useState("Finishing Google sign-in…");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function completeSignIn() {
      try {
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const token = hash.get("accessToken");
        const encodedData = hash.get("data");
        const returnToParam = new URLSearchParams(window.location.search).get("returnTo");
        const returnTo = returnToParam?.startsWith("/") && !returnToParam.startsWith("//")
          ? returnToParam
          : "/student-dashboard";
        if (!token || !encodedData) throw new Error("Missing Google sign-in response.");

        const decoded = decodeBase64UrlJson(encodedData);
        if (decoded?.type !== "student") throw new Error("This Google account is not linked to a student profile.");
        setStatus("Loading your student profile…");

        const studentIds = (decoded?.students || []).map((student) => student._id).filter(Boolean);
        const response = await getStudentAuthDataApi({
          accountTypeId: decoded?.accountTypeId,
          token,
          studentIds,
        });
        if (response?.success === false) throw new Error(response?.message || "Could not load your student profile.");
        if (!response?.token) throw new Error("Student profile response did not include an access token.");

        const expiration = 240 * 60 * 60 * 1000;
        const students = response?.data?.students || (response?.data?._id ? [response.data] : []);
        const session = {
          token: response.token,
          authMethod: "google",
          expiration,
          expiresAt: new Date(Date.now() + expiration).toISOString(),
          data: response.data || {},
          selectedStudent: students[0] || null,
        };
        setCustomerToken(response.token);
        setStudentSession(session);
        if (active) router.replace(returnTo);
      } catch (cause) {
        if (!active) return;
        setError(cause instanceof Error ? cause.message : "Google sign-in failed.");
        setStatus("Could not complete sign-in.");
      }
    }
    void completeSignIn();
    return () => { active = false; };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-pitch px-6">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
        <h1 className="font-display text-3xl uppercase">{status}</h1>
        <p className="mt-3 text-sm text-foreground/55">Please wait while we securely load your academy account.</p>
        {error ? <div role="alert" className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">{error}<button type="button" onClick={() => router.replace("/auth")} className="mt-4 block w-full text-neon hover:underline">Return to student login</button></div> : null}
      </section>
    </main>
  );
}
