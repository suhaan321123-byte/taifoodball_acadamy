import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Student Dashboard — Tai Football Academy" }, { name: "robots", content: "noindex" }] }),
  component: AccountRedirect,
});

function AccountRedirect() {
  useEffect(() => {
    window.location.replace("/student-dashboard");
  }, []);
  return <main className="mx-auto max-w-6xl px-6 py-24"><p className="eyebrow">Opening your student dashboard…</p></main>;
}
