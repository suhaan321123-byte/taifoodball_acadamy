// components/student-registration/CourseSelectionStep.jsx
"use client";

import {
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  Landmark,
  Loader2,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

/* ──────────────────────────────────────────────────────────────
 * Pricing helper — returns TAX-INCLUSIVE amounts so the UI can
 * display final numbers without a separate tax line.
 *
 * NOTE: registrationFee / securityDeposit fall back to
 * billingConfig whenever the plan-level value is 0 / missing —
 * because `plan.registrationFee = 0` is NOT nullish, `??` alone
 * would ignore the course-level 400.
 * ────────────────────────────────────────────────────────────── */
export function getPlanPricing(plan, course, recurring, durationCount) {
  const baseAmount = Math.max(0, Number(plan?.price || 0));
  const discountValue = Math.max(0, Number(plan?.discount?.value || 0));
  const discountAmount =
    String(plan?.discount?.unit || "percentage").toLowerCase() === "amount"
      ? Math.min(discountValue, baseAmount)
      : Math.min((baseAmount * discountValue) / 100, baseAmount);
  const discountedPrice = Math.max(baseAmount - discountAmount, 0);

  const billing = course?.billingConfig || {};

  const planRegistrationFee = Number(plan?.registrationFee);
  const registrationFee = Math.max(
    0,
    planRegistrationFee > 0 ? planRegistrationFee : Number(billing.registrationFee ?? 0),
  );

  const planSecurityDeposit = Number(plan?.securityDeposit);
  const securityDeposit = Math.max(
    0,
    planSecurityDeposit > 0 ? planSecurityDeposit : Number(billing.securityDeposit ?? 0),
  );

  const additionalCharges =
    Array.isArray(plan?.additionalCharges) && plan.additionalCharges.length
      ? plan.additionalCharges
      : Array.isArray(billing.additionalCharges)
        ? billing.additionalCharges
        : [];
  const additionalChargesTotal = additionalCharges.reduce(
    (sum, item) => sum + Math.max(0, Number(item?.amount || 0)),
    0,
  );

  const taxPercentage = Math.max(0, Number(plan?.taxPercentage ?? billing.taxPercentage ?? 0));
  const taxEnabled = taxPercentage > 0 || Boolean(plan?.taxEnabled || billing.taxEnabled);
  const taxableOneTime = registrationFee + additionalChargesTotal;
  const taxAmount = taxEnabled ? ((discountedPrice + taxableOneTime) * taxPercentage) / 100 : 0;
  const recurringAmount =
    discountedPrice + (taxEnabled ? (discountedPrice * taxPercentage) / 100 : 0);
  const firstPaymentAmount =
    recurringAmount +
    registrationFee +
    securityDeposit +
    additionalChargesTotal +
    (taxEnabled ? (taxableOneTime * taxPercentage) / 100 : 0);

  const cycles = recurring
    ? Math.max(1, Number.parseInt(durationCount || "1", 10) || 1)
    : String(plan?.paymentFrequency || "one-time").toLowerCase() === "one-time"
      ? 1
      : Math.max(1, Number(plan?.duration?.value || 1));

  return {
    baseAmount,
    discountAmount,
    registrationFee,
    securityDeposit,
    additionalCharges,
    additionalChargesTotal,
    taxAmount,
    taxPercentage,
    taxEnabled,
    recurringAmount,
    firstPaymentAmount,
    estimatedFee:
      recurringAmount * cycles +
      registrationFee +
      securityDeposit +
      additionalChargesTotal +
      (taxEnabled ? (taxableOneTime * taxPercentage) / 100 : 0),
    cycles,
  };
}

/* ──────────────────────────────────────────────────────────────
 * Small primitives
 * ────────────────────────────────────────────────────────────── */
function FieldError({ children }) {
  if (!children) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
      <span aria-hidden="true">!</span>
      {children}
    </p>
  );
}

function FeeLine({ label, value, positive = false, muted = false }) {
  return (
    <span className="flex items-center justify-between gap-3">
      <span className={muted ? "text-foreground/40" : "text-foreground/50"}>{label}</span>
      <span
        className={positive ? "text-neon" : muted ? "text-foreground/55" : "text-foreground/80"}
      >
        {value}
      </span>
    </span>
  );
}

function PaymentChoice({ active, onClick, icon: Icon, title, description }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-20 items-start gap-3 rounded-xl border p-4 text-left transition ${
        active
          ? "border-neon bg-neon/[0.07]"
          : "border-border bg-background/45 hover:border-foreground/30"
      }`}
    >
      <span
        className={`grid size-9 shrink-0 place-items-center rounded-lg ${
          active ? "bg-neon text-pitch" : "bg-surface text-foreground/55"
        }`}
      >
        <Icon size={17} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-1 block text-[11px] leading-4 text-foreground/45">{description}</span>
      </span>
      <span
        className={`ml-auto mt-1 size-4 shrink-0 rounded-full border p-[3px] ${
          active ? "border-neon" : "border-foreground/25"
        }`}
      >
        {active ? <span className="block size-full rounded-full bg-neon" /> : null}
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Course card — clickable, expands when selected.
 * No installment input — cycles are derived automatically from
 * plan.duration.value (or the billingConfig recurring cycle).
 * ────────────────────────────────────────────────────────────── */
function CourseCard({ course, active, onSelect, form, errors }) {
  const plan = course?.subscriptionPlans?.[0] || null;
  const recurring =
    String(course?.billingConfig?.feeModel || "")
      .trim()
      .toLowerCase() === "recurring";

  // Auto-derived cycle count — never user-editable.
  const autoCycles = Math.max(1, Number(plan?.duration?.value || 1) || 1);

  const pricing = getPlanPricing(plan, course, recurring, String(autoCycles));

  const cycleUnit = recurring ? `/${String(plan?.duration?.unit || "cycle").toLowerCase()}` : "";

  return (
    <article
      onClick={() => {
        if (!active) onSelect(course);
      }}
      role="radio"
      aria-checked={active}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!active) onSelect(course);
        }
      }}
      className={`relative cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-all sm:p-6 ${
        active
          ? "border-neon bg-neon/[0.06] shadow-[0_0_0_1px_rgba(193,239,82,0.18)]"
          : "border-border bg-surface/25 hover:border-foreground/30 hover:bg-surface/45"
      }`}
    >
      {/* Selected check */}
      {active ? (
        <span className="absolute right-4 top-4 grid size-7 place-items-center rounded-full bg-neon text-pitch">
          <Check size={16} strokeWidth={3} />
        </span>
      ) : null}

      {/* Title + description */}
      <h2 className="pr-8 font-display text-xl uppercase tracking-tight sm:text-xl">
        {course.title}
      </h2>
      {course.description ? (
        <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/55">{course.description}</p>
      ) : null}

      {/* ── Expanded details (only when active) ───────────────── */}
      <>
        {/* Fee breakdown */}
        <div className="mt-6 border-t border-border/70 pt-4">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/55">
            <CreditCard size={13} className="text-neon" />
            Fee breakdown
          </p>
          <div className="space-y-2 text-xs">
            {/* Course fee — tax-inclusive recurring amount */}
            <FeeLine label="Course fee" value={`${money(pricing.recurringAmount)}${cycleUnit}`} />

            {/* Package discount */}
            {pricing.discountAmount > 0 ? (
              <FeeLine
                label="Package discount"
                value={`−${money(pricing.discountAmount)}`}
                positive
              />
            ) : null}

            {/* Registration fee (now correctly picks up billingConfig 400) */}
            {pricing.registrationFee > 0 ? (
              <FeeLine label="Registration fee" value={money(pricing.registrationFee)} />
            ) : null}

            {pricing.securityDeposit > 0 ? (
              <FeeLine label="Security deposit" value={money(pricing.securityDeposit)} />
            ) : null}

            {pricing.additionalCharges.map((charge, index) => (
              <FeeLine
                key={`${charge.label}-${index}`}
                label={charge.label || "Additional fee"}
                value={money(charge.amount)}
              />
            ))}

            {/* Tax line intentionally omitted — baked into amounts above. */}
          </div>
        </div>

        {/* Total — no installment input, cycles auto-derived */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-background/70  py-3">
          <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/55">
            {recurring ? <>Total</> : <>Total payable</>}
          </span>
          <span className="font-display text-lg">{money(pricing.estimatedFee)}</span>
        </div>

        <FieldError>{errors.planId}</FieldError>
      </>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Main component
 * ────────────────────────────────────────────────────────────── */
export default function CourseSelectionStep({
  form,
  updateForm,
  branches = [],
  courses = [],
  selectedCourse,
  setSelectedCourse,
  selectedPlan,
  pricingSummary,
  isRecurringCourse = false,
  loadingData = false,
  errors = {},
}) {
  const autoPlan = selectedCourse?.subscriptionPlans?.[0] || null;
  const effectivePlan = selectedPlan || autoPlan;

  // Auto-derived installment count for the payment summary block.
  const autoCycles = Math.max(1, Number(effectivePlan?.duration?.value || 1) || 1);

  const pricing =
    pricingSummary ||
    getPlanPricing(effectivePlan, selectedCourse, isRecurringCourse, String(autoCycles));

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    updateForm("courseId", String(course?._id || ""));
    const defaultPlan = course?.subscriptionPlans?.[0];
    updateForm("planId", String(defaultPlan?._id || ""));
    // Auto-derive — user never edits this.
    updateForm("estimatedDurationCount", String(defaultPlan?.duration?.value || 1));
  };

  return (
    <section className="space-y-7 sm:space-y-9">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div>
        <p className="eyebrow">Step 02 · choose your programme</p>
      </div>

      {Object.keys(errors).length > 0 ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-500/35 bg-red-500/10 p-4 text-sm text-red-300"
        >
          <p className="font-semibold">A couple of details need your attention</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-red-200/80">
            {Object.values(errors).map((error, index) => (
              <li key={`${error}-${index}`}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* ── Branch picker ──────────────────────────────────────── */}
      <label className="block" data-field="branchIds">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground/65">
          Training branch <span className="text-neon">*</span>
        </span>
        <span className="relative block">
          <select
            value={form.branchIds || ""}
            onChange={(event) => updateForm("branchIds", event.target.value)}
            className={`h-12 w-full appearance-none rounded-xl border bg-surface/40 px-4 pr-10 text-sm outline-none transition focus:border-neon ${
              errors.branchIds ? "border-red-500" : "border-border"
            }`}
          >
            <option value="">Choose your branch</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.name}
                {branch.code ? ` · ${branch.code}` : ""}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
        </span>
        <FieldError>{errors.branchIds}</FieldError>
      </label>

      {/* ── Loading ────────────────────────────────────────────── */}
      {loadingData ? (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/30 p-5 text-sm text-foreground/55">
          <Loader2 className="size-5 animate-spin text-neon" />
          Loading academy programmes…
        </div>
      ) : null}

      {/* ── Course cards ───────────────────────────────────────── */}
      {!loadingData && courses.length > 0 ? (
        <div
          role="radiogroup"
          aria-label="Programmes"
          className="grid gap-4 lg:grid-cols-2"
          data-field="courseId"
        >
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              active={String(course._id) === String(form.courseId)}
              onSelect={handleCourseSelect}
              form={form}
              errors={errors}
            />
          ))}
        </div>
      ) : null}

      {!loadingData && courses.length === 0 ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-200/80">
          No programmes are available right now. Please contact the academy.
        </div>
      ) : null}

      <FieldError>{errors.courseId}</FieldError>

      {/* ── Payment preference ────────────────────────────────── */}
      {selectedCourse && effectivePlan ? (
        <div className="space-y-4 rounded-2xl border border-border bg-surface/30 p-5 sm:p-6">
          <div>
            <h2 className="mt-1 font-display text-2xl uppercase">How would you like to pay?</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <PaymentChoice
              active={(form.paymentOption || "online") === "online"}
              onClick={() => updateForm("paymentOption", "online")}
              icon={CreditCard}
              title="Pay online"
              description="Secure checkout after you submit."
            />
            <PaymentChoice
              active={form.paymentOption === "pay_later"}
              onClick={() => updateForm("paymentOption", "pay_later")}
              icon={Landmark}
              title="Pay later"
              description="Complete admission now and settle fees at the academy."
            />
          </div>


          <p className="flex items-start gap-2 text-[10px] leading-4 text-foreground/40">
            <BadgeCheck size={13} className="mt-0.5 shrink-0 text-neon/70" />
            Your programme selection and fee breakdown will be included in your admission
            confirmation.
          </p>
        </div>
      ) : null}
    </section>
  );
}
