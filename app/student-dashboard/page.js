import StudentDashboard from "../../src/components/student-dashboard/StudentDashboard";
import StudentPortalShell from "./StudentPortalShell";

export const metadata = {
  title: "Student Dashboard | TAi Football Academy",
  robots: { index: false, follow: false },
};

export default function StudentDashboardPage() {
  return <StudentPortalShell><StudentDashboard /></StudentPortalShell>;
}
