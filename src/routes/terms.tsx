import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Tai Football Academy" },
      {
        name: "description",
        content:
          "Read the terms governing Tai Football Academy training, registration, payments, and website use.",
      },
    ],
  }),
  component: TermsPage,
});

const sections = [
  [
    "1. Football Training Services",
    "TAi Football Academy provides football coaching and training programs for enrolled players. Training schedules, batches, coaches, venues, program structure, and session timings may be changed when reasonably necessary due to operational requirements, weather, ground availability, tournaments, public holidays, or other circumstances. We will make reasonable efforts to communicate significant schedule changes to registered students or their parents/guardians.",
  ],
  [
    "2. Registration",
    "Students must provide accurate and complete information during registration. Parents or guardians are responsible for providing correct information when registering a minor. TAi Football Academy may request additional information reasonably required for registration, safety, communication, or academy administration.",
  ],
  [
    "3. Monthly Training Fees",
    "Training fees are charged on a monthly basis unless otherwise specified for a particular program. The applicable fee will be communicated during registration or displayed on the website. Students or their parents/guardians are responsible for paying fees within the applicable payment period. Continued non-payment may result in temporary suspension of training access until outstanding fees are resolved.",
  ],
  [
    "4. Online Payments",
    "Payments may be made through the payment methods available on our website or through other payment methods authorized by TAi Football Academy. Online payments are processed through third-party payment service providers. A payment should be considered successfully completed only after successful confirmation from the payment service/provider or TAi Football Academy. If an amount is debited but the payment is shown as failed or pending, please contact us with the transaction reference so that we can verify the transaction.",
  ],
  [
    "5. Refunds and Cancellations",
    "Monthly training fees already paid are generally non-refundable once the applicable training period has commenced, except where TAi Football Academy approves a refund or where otherwise required by applicable law. If a duplicate payment or incorrect payment is confirmed, please contact us. Eligible refunds will be processed to the original payment method or another mutually agreed method, subject to payment-provider processing timelines. Any separate camp, tournament, trial, event, merchandise, or special program may have its own cancellation and refund conditions, which will be communicated at the time of registration or purchase.",
  ],
  [
    "6. Attendance",
    "Students are expected to attend training sessions according to their assigned schedule. Fees are not automatically reduced or refunded for sessions missed by a student unless otherwise agreed by the academy.",
  ],
  [
    "7. Player Conduct",
    "Players are expected to maintain appropriate discipline and respectful behaviour toward coaches, staff, teammates, opponents, and other individuals. TAi Football Academy reserves the right to take appropriate action in cases of serious misconduct, unsafe behaviour, repeated violations of academy rules, or conduct that negatively affects other participants.",
  ],
  [
    "8. Health and Safety",
    "Parents/guardians and adult players are responsible for informing the academy about relevant medical conditions, injuries, allergies, or other circumstances that may affect safe participation in football training. Football and physical training involve inherent risks of injury. Students must follow reasonable safety instructions provided by coaches and academy staff. Where appropriate, students should seek medical advice before participating in strenuous physical activity.",
  ],
  [
    "9. WhatsApp and Electronic Communications",
    "By providing a mobile number and opting in to receive communications, students, parents, or guardians may receive service-related communications through WhatsApp, SMS, phone, or other supported channels. These communications may include registration information, schedules, payment reminders, receipts, academy notices, and other relevant updates. Recipients may request to stop non-essential promotional communications at any time.",
  ],
  [
    "10. Website Usage",
    "Users must not misuse the website, attempt unauthorized access, interfere with website operation, submit fraudulent information, or use the website for unlawful purposes. Website content, branding, graphics, and other academy materials may not be copied or commercially reused without authorization where they are protected by applicable intellectual property rights.",
  ],
  [
    "11. Service Changes",
    "TAi Football Academy may modify training programs, schedules, fees, website features, or these Terms & Conditions when reasonably required. Material changes affecting registered students will be communicated where appropriate.",
  ],
  [
    "12. Limitation of Liability",
    "To the extent permitted by applicable law, TAi Football Academy will not be responsible for losses caused by circumstances reasonably outside its control, including interruptions to third-party payment, telecommunications, internet, or messaging services. Nothing in these Terms is intended to exclude or restrict rights or liabilities that cannot legally be excluded.",
  ],
  [
    "13. Governing Law",
    "These Terms & Conditions are governed by the applicable laws of India. Any dispute will be subject to the jurisdiction of the competent courts applicable to TAi Football Academy's location in Kerala, subject to applicable consumer protection and other mandatory laws.",
  ],
] as const;

function TermsPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            Terms <span className="text-neon">&amp; Conditions</span>.
          </h1>
          <p className="mt-6 text-sm text-foreground/50">Last Updated: 5 September 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-10 px-6 text-sm leading-relaxed text-foreground/65 [&_p+p]:mt-4">
          <p>
            Welcome to TAi Football Academy. These Terms &amp; Conditions govern registration,
            participation in our football training programs, website usage, payments, and related
            services.
          </p>
          <p>
            By registering with TAi Football Academy, making a payment, or using our website and
            services, you acknowledge these Terms &amp; Conditions.
          </p>
          <p>
            For students who are minors, registration and acceptance of applicable terms must be
            completed by or with the authorization of a parent or legal guardian.
          </p>
          {sections.map(([title, content]) => (
            <section key={title}>
              <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-4">{content}</p>
            </section>
          ))}
          <section>
            <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
              14. Contact Us
            </h2>
            <div className="mt-4 space-y-1">
              <p>
                <strong className="text-foreground">TAi Football Academy</strong>
                <br />
                9/146, Pandikkak Building
                <br />
                Poonoor, Unnikulam, Balussery
                <br />
                Kozhikode (Calicut), Kerala - 673574
                <br />
                India
              </p>
              <p>
                <strong className="text-foreground">Email:</strong>{" "}
                <a className="text-neon hover:underline" href="mailto:tfa099@gmail.com">
                  tfa099@gmail.com
                </a>
                <br />
                <strong className="text-foreground">Phone:</strong> +91 81570 10114
                <br />
                <strong className="text-foreground">Phone:</strong> +91 75940 01414
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
