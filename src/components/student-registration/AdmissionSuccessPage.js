"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck, CalendarDays, Check, CircleDollarSign, Download, FileBadge, Loader2, ShieldCheck } from "lucide-react";

const formatMoney = (value) => `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "To be confirmed";

export default function AdmissionSuccessPage({
  form,
  student,
  subscription,
  course,
  plan,
  pricing,
  branchName,
  branchAddress,
  paymentChoice,
  paymentStatus,
  paymentVerified,
  paymentGatewayUnavailable,
  onGoToPortal,
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const studentName = student?.name || form.name || "Student";
  const formId = student?.memberCode || subscription?.subscriptionID || subscription?._id || "Pending";

  async function downloadForm() {
    setDownloading(true);
    setDownloadError("");
    try {
      const { downloadAdmissionFormPdf } = await import("../../utils/admissionFormPdf");
      downloadAdmissionFormPdf({
        formId,
        memberCode: student?.memberCode,
        name: studentName,
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        email: form.email,
        contact: form.contact,
        countryCode: form.countryCode,
        address: form.address,
        courseName: course?.title,
        planName: plan?.title,
        branchName,
        branchAddress,
        admissionDate: form.admissionDate || form.startDate,
        startDate: form.startDate,
        durationLabel: `${pricing?.cycles || form.estimatedDurationCount || 1} ${pricing?.cycles === 1 ? "installment" : "installments"}`,
        baseAmount: pricing?.baseAmount,
        discountAmount: pricing?.discountAmount,
        registrationFee: pricing?.registrationFee,
        securityDeposit: pricing?.securityDeposit,
        additionalCharges: pricing?.additionalCharges,
        taxAmount: pricing?.taxAmount,
        recurringAmount: pricing?.recurringAmount,
        estimatedFee: pricing?.estimatedFee,
        paymentChoice,
        paymentStatus,
        guardianName: form.guardianName,
        guardianPhone: form.guardianPhone,
        guardianRelationship: form.guardianRelationship,
        emergencyContactName: form.emergencyContactName,
        emergencyContactPhone: form.emergencyContactPhone,
        bloodGroup: form.bloodGroup,
        notes: form.notes,
      });
    } catch (cause) {
      setDownloadError(cause instanceof Error ? cause.message : "The admission form could not be created. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="relative min-h-[78vh] overflow-hidden bg-background px-5 py-10 text-foreground sm:px-8 sm:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-neon/[0.07] blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-[28px] border border-neon/20 bg-gradient-to-br from-neon/[0.11] via-surface/70 to-pitch p-6 shadow-2xl sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neon"><BadgeCheck size={14} /> Admission submitted</span>
              <h1 className="mt-5 max-w-2xl font-display text-2xl uppercase leading-[0.98] tracking-tight sm:text-6xl">Welcome to the <span className="text-neon">academy</span>, {studentName.split(" ")[0]}.</h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-foreground/60">Your registration is saved. Keep this admission summary for your records and download a copy of your completed form.</p>
            </div>
            <div className="grid size-24 place-items-center justify-self-start rounded-full border border-neon/25 bg-neon/10 md:size-28 md:justify-self-end"><span className="grid size-16 place-items-center rounded-full bg-neon text-pitch md:size-[76px]"><Check className="size-9" strokeWidth={3} /></span></div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-2xl border border-border bg-surface/35 p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
              <div><p className="eyebrow">Your registration record</p><h2 className="mt-1 font-display text-2xl uppercase">{studentName}</h2><p className="mt-1 text-xs text-foreground/45">{form.email}</p></div>
              <div className="rounded-xl border border-border bg-background/50 px-3 py-2 text-right"><p className="text-[9px] uppercase tracking-widest text-foreground/40">Admission ID</p><p className="mt-1 max-w-40 break-all font-mono text-xs">{formId}</p></div>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2">
              <SummaryRow label="Programme" value={course?.title || "Selected programme"} />
              <SummaryRow label={plan?.title ? "Package" : "Billing"} value={plan?.title || "Recurring course"} />
              <SummaryRow label="Training branch" value={branchName || "Selected branch"} />
              <SummaryRow label="Admission date" value={formatDate(form.admissionDate || form.startDate)} />
              <SummaryRow label="Student email" value={form.email} />
              <SummaryRow label="Contact number" value={`${form.countryCode || ""} ${form.contact || ""}`.trim()} />
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-surface/35 p-5 sm:p-7">
            <p className="eyebrow">Fee summary</p>
            <h2 className="mt-1 font-display text-2xl uppercase">{formatMoney(pricing?.estimatedFee)}</h2>
            <p className="mt-1 text-xs text-foreground/45">Estimated package total</p>
            <div className="mt-5 space-y-3 border-t border-border pt-4 text-xs">
              <FeeRow label="Programme fee" value={formatMoney(pricing?.baseAmount)} />
              {pricing?.discountAmount > 0 ? <FeeRow label="Discount" value={`−${formatMoney(pricing.discountAmount)}`} positive /> : null}
              {pricing?.registrationFee > 0 ? <FeeRow label="Registration fee" value={formatMoney(pricing.registrationFee)} /> : null}
              {pricing?.securityDeposit > 0 ? <FeeRow label="Security deposit" value={formatMoney(pricing.securityDeposit)} /> : null}
              {pricing?.additionalCharges?.map((charge, index) => <FeeRow key={`${charge.label}-${index}`} label={charge.label || "Additional fee"} value={formatMoney(charge.amount)} />)}
              {pricing?.taxAmount > 0 ? <FeeRow label="Tax" value={formatMoney(pricing.taxAmount)} /> : null}
            </div>
            <div className="mt-5 rounded-xl border border-neon/20 bg-neon/[0.06] p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold"><CircleDollarSign size={15} className="text-neon" />{paymentChoice === "pay_later" ? "Pay later at the academy" : paymentGatewayUnavailable ? "Online payment is unavailable" : paymentVerified ? "Payment verified" : "Payment status"}</div>
              <p className="mt-1.5 text-[11px] leading-5 text-foreground/50">{paymentGatewayUnavailable ? "Your admission is saved. The academy will help you complete payment." : paymentChoice === "pay_later" ? "Your registration is saved. Please settle the fee with the academy before training begins." : paymentStatus}</p>
            </div>
          </aside>
        </section>

        <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-surface/35 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neon/10 text-neon"><FileBadge size={19} /></span><div><h2 className="font-display text-xl uppercase">Keep your admission form</h2><p className="mt-1 text-xs leading-5 text-foreground/45">Download a PDF copy with the details you provided and your fee summary.</p></div></div>
          <button type="button" onClick={downloadForm} disabled={downloading} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-neon px-6 text-xs font-bold uppercase tracking-widest text-pitch transition hover:bg-neon/90 disabled:cursor-wait disabled:opacity-60">{downloading ? <Loader2 className="size-4 animate-spin" /> : <Download size={16} />}{downloading ? "Preparing PDF…" : "Download admission PDF"}</button>
        </section>
        {downloadError ? <p role="alert" className="mt-3 text-sm text-red-300">{downloadError}</p> : null}

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-xs text-foreground/45"><ShieldCheck size={15} className="text-neon" />A confirmation has been sent to {form.email || "your email"}.</p>
          <button type="button" onClick={onGoToPortal} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neon hover:text-neon/80">Continue to student portal <ArrowRight size={15} /></button>
        </div>
      </div>
    </main>
  );
}

function SummaryRow({ label, value }) {
  return <div className="border-b border-border/70 py-3.5"><p className="text-[9px] font-semibold uppercase tracking-widest text-foreground/40">{label}</p><p className="mt-1 break-words text-sm">{value || "Not provided"}</p></div>;
}

function FeeRow({ label, value, positive }) {
  return <div className="flex justify-between gap-3"><span className="text-foreground/50">{label}</span><span className={positive ? "text-neon" : "text-foreground/80"}>{value}</span></div>;
}
