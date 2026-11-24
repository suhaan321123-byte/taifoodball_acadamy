"use client";

import { useEffect, useMemo, useState } from "react";
import { Award, BookOpen, CalendarDays, CreditCard, LogOut, UserRound } from "lucide-react";
import {
  getStudentAttendanceApi,
  getStudentCertificatesApi,
  getStudentCoursesApi,
  getStudentFeeCollectionsApi,
} from "@/api/businessWebsite/studentApi/studentApi";
import { useAuth } from "@/hooks/useAuth";
import { clearStudentSession, setStudentSession } from "@/utils/tokenKey";

const unwrapList = (response, keys) => {
  for (const key of keys) if (Array.isArray(response?.[key])) return response[key];
  return [];
};

export default function StudentDashboard() {
  const { session, loading } = useAuth();
  const students = useMemo(() => {
    const data = session?.data;
    if (Array.isArray(data?.students)) return data.students.filter(Boolean);
    if (data?.student) return [data.student];
    if (Array.isArray(data)) return data.filter(Boolean);
    return data?._id ? [data] : [];
  }, [session]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const selectedStudent = students.find((student) => student._id === selectedStudentId)
    || session?.selectedStudent
    || students[0]
    || session?.data;
  const [dashboard, setDashboard] = useState({ courses: [], attendance: null, fees: null, certificates: [] });
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !session?.token) window.location.assign("/auth");
  }, [loading, session]);

  useEffect(() => {
    if (!selectedStudent?._id) {
      setBusy(false);
      return;
    }
    let active = true;
    setBusy(true);
    setError("");
    const studentId = selectedStudent._id;
    Promise.allSettled([
      getStudentCoursesApi({ studentId }),
      getStudentAttendanceApi({ studentId, month: "", status: "all" }),
      getStudentFeeCollectionsApi({ studentId, month: "", status: "all" }),
      getStudentCertificatesApi({ studentId }),
    ]).then((results) => {
      if (!active) return;
      const [courses, attendance, fees, certificates] = results;
      setDashboard({
        courses: courses.status === "fulfilled" ? unwrapList(courses.value, ["courses", "rows", "data"]) : [],
        attendance: attendance.status === "fulfilled" ? attendance.value : null,
        fees: fees.status === "fulfilled" ? fees.value : null,
        certificates: certificates.status === "fulfilled" ? unwrapList(certificates.value, ["certificates", "rows", "data"]) : [],
      });
      if (results.every((result) => result.status === "rejected")) {
        setError("We couldn’t load your student information. Please try again.");
      }
      setBusy(false);
    });
    return () => { active = false; };
  }, [selectedStudent?._id]);

  const attendanceStats = dashboard.attendance?.stats || {};
  const feeRows = unwrapList(dashboard.fees, ["rows", "fees", "collections", "data"]);
  const totalDue = dashboard.fees?.stats?.totalDueAmount ?? feeRows.reduce((sum, item) => sum + Number(item?.dueAmount || 0), 0);
  const branches = (selectedStudent?.branchIds || []).map((branch) => typeof branch === "object" ? branch.name : branch).filter(Boolean);

  if (loading || (!session && !error)) {
    return <main className="mx-auto max-w-6xl px-6 py-24"><p className="eyebrow">Loading student portal…</p></main>;
  }
  if (!session?.token) return <main className="mx-auto max-w-6xl px-6 py-24"><p className="eyebrow">Redirecting to student login…</p></main>;

  return (
    <main className="min-h-[70vh] bg-background px-5 py-10 text-foreground sm:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-border pb-7">
          <div className="flex items-center gap-4">
            {selectedStudent?.image ? <img src={selectedStudent.image} alt="" className="size-14 rounded-full object-cover" /> : <span className="grid size-14 place-items-center rounded-full bg-neon/15 text-neon"><UserRound /></span>}
            <div>
              <p className="eyebrow">Student portal</p>
              <h1 className="mt-1 font-display text-3xl uppercase">{selectedStudent?.name || "Student account"}</h1>
              <p className="mt-1 text-xs text-foreground/45">{selectedStudent?.memberCode || selectedStudent?.email || "Your academy profile"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {students.length > 1 ? <select value={selectedStudent?._id || ""} onChange={(event) => {
              const nextStudent = students.find((student) => student._id === event.target.value);
              setSelectedStudentId(event.target.value);
              if (nextStudent && session) setStudentSession({ ...session, selectedStudent: nextStudent });
            }} className="rounded-full border border-border bg-pitch px-4 py-2 text-sm">
              {students.map((student) => <option key={student._id} value={student._id}>{student.name}</option>)}
            </select> : null}
            <button type="button" onClick={() => { clearStudentSession(); window.location.assign("/"); }} className="btn-ghost inline-flex items-center gap-2"><LogOut size={15} /> Sign out</button>
          </div>
        </header>

        {error ? <div role="alert" className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">{error}</div> : null}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard icon={BookOpen} label="Courses" value={busy ? "…" : dashboard.courses.length} />
          <SummaryCard icon={CalendarDays} label="Present days" value={busy ? "…" : attendanceStats.presentDays ?? "—"} />
          <SummaryCard icon={CreditCard} label="Fees due" value={busy ? "…" : `₹${Number(totalDue).toLocaleString("en-IN")}`} />
          <SummaryCard icon={Award} label="Certificates" value={busy ? "…" : dashboard.certificates.length} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="font-display text-2xl uppercase">Profile</h2>
            <dl className="mt-5 divide-y divide-border">
              <ProfileRow label="Email" value={selectedStudent?.email} />
              <ProfileRow label="Phone" value={`${selectedStudent?.countryCode || ""} ${selectedStudent?.contact || ""}`.trim()} />
              <ProfileRow label="Branch" value={branches.join(", ")} />
              <ProfileRow label="Status" value={selectedStudent?.status} />
              <ProfileRow label="Admission date" value={selectedStudent?.educationProfile?.admissionDate ? new Date(selectedStudent.educationProfile.admissionDate).toLocaleDateString("en-IN") : ""} />
            </dl>
          </div>
          <div className="rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="font-display text-2xl uppercase">My courses</h2>
            {busy ? <p className="mt-5 text-sm text-foreground/45">Loading your courses…</p> : dashboard.courses.length ? <div className="mt-4 divide-y divide-border">{dashboard.courses.map((course, index) => <div key={course._id || course.id || index} className="py-4"><p className="font-semibold">{course.title || course.courseName || course.name || "Course subscription"}</p><p className="mt-1 text-xs text-foreground/45">{course.status || course.subscriptionStatus || "Enrolled"}</p></div>)}</div> : <p className="mt-5 text-sm text-foreground/45">No courses are linked to this student yet.</p>}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <DataList title="Attendance" busy={busy} rows={unwrapList(dashboard.attendance, ["rows", "attendance", "records", "data"])} empty="No attendance records yet." render={(row) => <><span>{row.date || row.sessionDate || row.session_title || "Training session"}</span><span className="text-foreground/50">{row.status || "Recorded"}</span></>} />
          <DataList title="Fee records" busy={busy} rows={feeRows} empty="No fee records yet." render={(row) => <><span>{row.description || row.title || row.month || "Fee"}</span><span className="text-foreground/50">₹{Number(row.dueAmount ?? row.amount ?? 0).toLocaleString("en-IN")}</span></>} />
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return <div className="rounded-2xl border border-border bg-surface/40 p-5"><Icon className="size-5 text-neon" /><p className="mt-4 font-display text-3xl">{value}</p><p className="text-[10px] uppercase tracking-widest text-foreground/45">{label}</p></div>;
}

function ProfileRow({ label, value }) {
  if (!value) return null;
  return <div className="flex justify-between gap-4 py-3 text-sm"><dt className="text-foreground/45">{label}</dt><dd className="text-right">{value}</dd></div>;
}

function DataList({ title, busy, rows, empty, render }) {
  return <div className="rounded-2xl border border-border bg-surface/40 p-6"><h2 className="font-display text-2xl uppercase">{title}</h2>{busy ? <p className="mt-5 text-sm text-foreground/45">Loading…</p> : rows.length ? <div className="mt-4 divide-y divide-border">{rows.slice(0, 6).map((row, index) => <div key={row._id || row.id || index} className="flex justify-between gap-4 py-3 text-sm">{render(row)}</div>)}</div> : <p className="mt-5 text-sm text-foreground/45">{empty}</p>}</div>;
}
