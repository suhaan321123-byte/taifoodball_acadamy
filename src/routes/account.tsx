import { createFileRoute } from "@tanstack/react-router";
import StudentDashboard from "@/components/student-dashboard/StudentDashboard";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Student Dashboard — Tai Football Academy" }, { name: "robots", content: "noindex" }] }),
  component: StudentDashboard,
});
