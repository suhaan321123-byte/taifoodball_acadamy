import { BadgeCheck, CalendarDays, Check, ChevronDown, Clock3, CreditCard, Landmark, ShieldCheck, Sparkles, Tag } from "lucide-react";

const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export function getPlanPricing(plan, course, recurring, durationCount) {
  const baseAmount = Math.max(0, Number(plan?.price || 0));
  const discountValue = Math.max(0, Number(plan?.discount?.value || 0));
  const discountAmount = String(plan?.discount?.unit || "percentage").toLowerCase() === "amount"
    ? Math.min(discountValue, baseAmount)
    : Math.min((baseAmount * discountValue) / 100, baseAmount);
  const discountedPrice = Math.max(baseAmount - discountAmount, 0);
  const billing = course?.billingConfig || {};
  const registrationFee = Math.max(0, Number(plan?.registrationFee ?? billing.registrationFee ?? 0));
  const securityDeposit = Math.max(0, Number(plan?.securityDeposit ?? billing.securityDeposit ?? 0));
  const additionalCharges = Array.isArray(plan?.additionalCharges) && plan.additionalCharges.length
    ? plan.additionalCharges
    : Array.isArray(billing.additionalCharges) ? billing.additionalCharges : [];
  const additionalChargesTotal = additionalCharges.reduce((sum, item) => sum + Math.max(0, Number(item?.amount || 0)), 0);
  const taxPercentage = Math.max(0, Number(plan?.taxPercentage ?? billing.taxPercentage ?? 0));
  const taxEnabled = taxPercentage > 0 || Boolean(plan?.taxEnabled || billing.taxEnabled);
  const taxableOneTime = registrationFee + additionalChargesTotal;
  const taxAmount = taxEnabled ? ((discountedPrice + taxableOneTime) * taxPercentage) / 100 : 0;
  const recurringAmount = discountedPrice + (taxEnabled ? (discountedPrice * taxPercentage) / 100 : 0);
  const firstPaymentAmount = recurringAmount + registrationFee + securityDeposit + additionalChargesTotal + (taxEnabled ? (taxableOneTime * taxPercentage) / 100 : 0);
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
    recurringAmount,
    firstPaymentAmount,
    estimatedFee: recurringAmount * cycles + registrationFee + securityDeposit + additionalChargesTotal + (taxEnabled ? taxableOneTime * taxPercentage / 100 : 0),
    cycles,
  };
}

function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400"><span aria-hidden="true">!</span>{children}</p>;
}

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
  const plans = Array.isArray(selectedCourse?.subscriptionPlans) ? selectedCourse.subscriptionPlans : [];

  return (
    <section className="space-y-7 sm:space-y-9">
      <div>
        <p className="eyebrow">Step 02 · choose your programme</p>
        <h1 className="mt-2 font-display text-3xl uppercase tracking-tight sm:text-4xl">Build your training plan</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/55">Choose the academy branch and programme, then compare every package fee before you continue.</p>
      </div>

      {Object.keys(errors).length > 0 ? (
        <div role="alert" className="rounded-2xl border border-red-500/35 bg-red-500/10 p-4 text-sm text-red-300">
          <p className="font-semibold">A couple of details need your attention</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-red-200/80">{Object.values(errors).map((error, index) => <li key={`${error}-${index}`}>{error}</li>)}</ul>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block" data-field="branchIds">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground/65">Training branch <span className="text-neon">*</span></span>
          <span className="relative block">
            <select value={form.branchIds || ""} onChange={(event) => updateForm("branchIds", event.target.value)} className={`h-12 w-full appearance-none rounded-xl border bg-surface/40 px-4 pr-10 text-sm outline-none transition focus:border-neon ${errors.branchIds ? "border-red-500" : "border-border"}`}>
              <option value="">Choose your branch</option>
              {branches.map((branch) => <option key={branch._id} value={branch._id}>{branch.name}{branch.code ? ` · ${branch.code}` : ""}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
          </span>
          <FieldError>{errors.branchIds}</FieldError>
        </label>

        <label className="block" data-field="courseId">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground/65">Programme <span className="text-neon">*</span></span>
          <span className="relative block">
            <select value={form.courseId || ""} disabled={loadingData} onChange={(event) => {
              const course = courses.find((item) => String(item._id) === event.target.value) || null;
              setSelectedCourse(course);
              updateForm("courseId", event.target.value);
              const defaultPlan = course?.subscriptionPlans?.[0];
              updateForm("planId", String(defaultPlan?._id || ""));
              updateForm("estimatedDurationCount", String(defaultPlan?.duration?.value || 1));
            }} className={`h-12 w-full appearance-none rounded-xl border bg-surface/40 px-4 pr-10 text-sm outline-none transition focus:border-neon disabled:opacity-60 ${errors.courseId ? "border-red-500" : "border-border"}`}>
              <option value="">{loadingData ? "Loading programmes…" : "Choose your programme"}</option>
              {courses.map((course) => <option key={course._id} value={course._id}>{course.title}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
          </span>
          <FieldError>{errors.courseId}</FieldError>
        </label>
      </div>

      {loadingData ? (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/30 p-5 text-sm text-foreground/55"><span className="size-5 animate-spin rounded-full border-2 border-neon/25 border-t-neon" />Loading academy programmes and packages…</div>
      ) : null}

      {selectedCourse ? (
        <div className="space-y-5" data-field="planId">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">{selectedCourse.title}</p>
              <h2 className="mt-1 font-display text-2xl uppercase sm:text-3xl">Choose your package</h2>
            </div>
            <span className="rounded-full border border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-foreground/50">{plans.length} {plans.length === 1 ? "option" : "options"}</span>
          </div>

          {plans.length ? (
            <div role="radiogroup" aria-label="Training packages" className="grid gap-4 lg:grid-cols-2">
              {plans.map((plan) => {
                const pricing = getPlanPricing(plan, selectedCourse, isRecurringCourse, form.estimatedDurationCount);
                const active = String(plan._id) === String(form.planId);
                return (
                  <button key={plan._id} type="button" role="radio" aria-checked={active} onClick={() => {
                    updateForm("planId", String(plan._id));
                    updateForm("estimatedDurationCount", String(plan?.duration?.value || 1));
                  }} className={`group relative rounded-2xl border p-5 text-left transition-all sm:p-6 ${active ? "border-neon bg-neon/[0.07] shadow-[0_0_0_1px_rgba(193,239,82,0.18)]" : "border-border bg-surface/25 hover:border-foreground/30 hover:bg-surface/45"}`}>
                    {active ? <span className="absolute right-4 top-4 grid size-7 place-items-center rounded-full bg-neon text-pitch"><Check size={16} strokeWidth={3} /></span> : null}
                    {plan.badge?.show && plan.badge?.text ? <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-neon/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-neon"><Sparkles size={11} />{plan.badge.text}</span> : null}
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">{plan.billingType || (isRecurringCourse ? "Academy membership" : "Training package")}</span>
                    <span className="mt-1 block pr-8 font-display text-2xl uppercase tracking-tight">{plan.title || "Training package"}</span>
                    {plan.description ? <span className="mt-2 block max-w-sm text-xs leading-5 text-foreground/50">{plan.description}</span> : null}

                    <span className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="font-display text-3xl">{money(pricing.recurringAmount)}</span>
                      <span className="text-xs text-foreground/45">{isRecurringCourse ? "/ installment" : "package fee"}</span>
                      {pricing.discountAmount > 0 ? <span className="text-xs text-foreground/35 line-through">{money(pricing.baseAmount)}</span> : null}
                    </span>

                    <span className="mt-5 block border-t border-border/70 pt-4">
                      <span className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/55"><CreditCard size={13} className="text-neon" /> Fee breakdown</span>
                      <span className="space-y-2 text-xs">
                        <FeeLine label="Programme fee" value={money(pricing.baseAmount)} />
                        {pricing.discountAmount > 0 ? <FeeLine label="Package discount" value={`−${money(pricing.discountAmount)}`} positive /> : null}
                        {pricing.registrationFee > 0 ? <FeeLine label="Registration fee" value={money(pricing.registrationFee)} /> : null}
                        {pricing.securityDeposit > 0 ? <FeeLine label="Security deposit" value={money(pricing.securityDeposit)} /> : null}
                        {pricing.additionalCharges.map((charge, index) => <FeeLine key={`${charge.label}-${index}`} label={charge.label || "Additional fee"} value={money(charge.amount)} />)}
                        {pricing.taxAmount > 0 ? <FeeLine label={`Tax${Number(plan.taxPercentage || selectedCourse.billingConfig?.taxPercentage) ? ` (${Number(plan.taxPercentage || selectedCourse.billingConfig?.taxPercentage)}%)` : ""}`} value={money(pricing.taxAmount)} /> : null}
                      </span>
                    </span>

                    <span className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-background/70 px-3.5 py-3">
                      <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/55"><CalendarDays size={13} /> Estimated total</span>
                      <span className="font-display text-lg">{money(pricing.estimatedFee)}</span>
                    </span>
                    {isRecurringCourse ? <span className="mt-2 flex items-center gap-1.5 text-[10px] text-foreground/40"><Clock3 size={12} />Estimate uses {pricing.cycles} {pricing.cycles === 1 ? "installment" : "installments"}</span> : null}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-200/80">This programme does not have any packages available right now. Please contact the academy for help.</div>
          )}
          <FieldError>{errors.planId}</FieldError>
        </div>
      ) : null}

      {selectedPlan ? (
        <div className="space-y-4 rounded-2xl border border-border bg-surface/30 p-5 sm:p-6">
          <div>
            <p className="eyebrow">Payment preference</p>
            <h2 className="mt-1 font-display text-2xl uppercase">How would you like to pay?</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <PaymentChoice active={(form.paymentOption || "online") === "online"} onClick={() => updateForm("paymentOption", "online")} icon={CreditCard} title="Pay online" description="Secure checkout after you submit." />
            <PaymentChoice active={form.paymentOption === "pay_later"} onClick={() => updateForm("paymentOption", "pay_later")} icon={Landmark} title="Pay later" description="Complete admission now and settle fees at the academy." />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background/55 px-4 py-3.5">
            <div className="flex items-start gap-2.5"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-neon" /><div><p className="text-xs font-semibold">{form.paymentOption === "pay_later" ? "No online charge today" : "First payment due today"}</p><p className="mt-1 text-[10px] text-foreground/45">{form.paymentOption === "pay_later" ? "Your fee schedule will be confirmed by the academy." : "Final amount is confirmed by the academy payment schedule."}</p></div></div>
            <span className="font-display text-xl">{money(form.paymentOption === "pay_later" ? 0 : pricingSummary?.firstPaymentAmount)}</span>
          </div>
          <p className="flex items-start gap-2 text-[10px] leading-4 text-foreground/40"><BadgeCheck size={13} className="mt-0.5 shrink-0 text-neon/70" />Your package selection and fee breakdown will be included in your admission confirmation.</p>
        </div>
      ) : null}
    </section>
  );
}

function FeeLine({ label, value, positive = false }) {
  return <span className="flex items-center justify-between gap-3"><span className="text-foreground/50">{label}</span><span className={positive ? "text-neon" : "text-foreground/75"}>{value}</span></span>;
}

function PaymentChoice({ active, onClick, icon: Icon, title, description }) {
  return <button type="button" aria-pressed={active} onClick={onClick} className={`flex min-h-20 items-start gap-3 rounded-xl border p-4 text-left transition ${active ? "border-neon bg-neon/[0.07]" : "border-border bg-background/45 hover:border-foreground/30"}`}>
    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${active ? "bg-neon text-pitch" : "bg-surface text-foreground/55"}`}><Icon size={17} /></span>
    <span className="min-w-0"><span className="block text-sm font-semibold">{title}</span><span className="mt-1 block text-[11px] leading-4 text-foreground/45">{description}</span></span>
    <span className={`ml-auto mt-1 size-4 shrink-0 rounded-full border p-[3px] ${active ? "border-neon" : "border-foreground/25"}`}>{active ? <span className="block size-full rounded-full bg-neon" /> : null}</span>
  </button>;
}
