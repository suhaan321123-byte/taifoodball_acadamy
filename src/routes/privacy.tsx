import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Tai Football Academy" },
      {
        name: "description",
        content:
          "Learn how Tai Football Academy collects, uses, stores and protects personal information.",
      },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>We may collect information such as:</p>
        <ul>
          <li>Student/player name</li>
          <li>Parent or guardian name</li>
          <li>Date of birth or age</li>
          <li>Gender</li>
          <li>Mobile number</li>
          <li>Email address</li>
          <li>Residential address</li>
          <li>Emergency contact information</li>
          <li>Training or registration details</li>
          <li>Payment and transaction details</li>
          <li>Information voluntarily provided through forms, WhatsApp, phone calls, or email</li>
        </ul>
        <p>
          For students who are minors, registration and related information should be provided by or
          with the consent of a parent or legal guardian.
        </p>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>We may use the information collected to:</p>
        <ul>
          <li>Register students for football training programs</li>
          <li>Maintain student and training records</li>
          <li>Manage monthly training fees and other applicable payments</li>
          <li>Send payment confirmations and receipts</li>
          <li>Send fee reminders</li>
          <li>
            Communicate training schedules, announcements, cancellations, events, and important
            academy updates
          </li>
          <li>Respond to enquiries and support requests</li>
          <li>Improve our services and website</li>
          <li>Meet applicable legal, accounting, and regulatory requirements</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Payment Information",
    content: (
      <>
        <p>
          Our website may use a third-party payment gateway to collect training fees and other
          payments.
        </p>
        <p>
          Payment information required to process a transaction may be collected and processed
          directly by the payment gateway or other authorized payment service providers. TAi
          Football Academy does not intentionally store complete card numbers, CVV numbers, UPI
          PINs, or online banking passwords on its website.
        </p>
        <p>
          Payment transactions may be subject to the privacy policy and terms of the respective
          payment service provider.
        </p>
        <p>
          We may retain transaction references, payment status, amount, date, invoice or receipt
          details, and other information necessary for accounting and payment reconciliation.
        </p>
      </>
    ),
  },
  {
    title: "4. WhatsApp Business Communication",
    content: (
      <>
        <p>
          TAi Football Academy may use WhatsApp Business services to communicate with students,
          parents, guardians, and customers.
        </p>
        <p>
          If you provide your mobile number and consent to receive communications, we may send
          WhatsApp messages relating to:
        </p>
        <ul>
          <li>Registration confirmation</li>
          <li>Training schedules and changes</li>
          <li>Monthly fee reminders</li>
          <li>Payment confirmations</li>
          <li>Academy announcements</li>
          <li>Events, camps, trials, and other relevant updates</li>
          <li>Support and responses to your enquiries</li>
        </ul>
        <p>
          WhatsApp communications may be delivered using WhatsApp Business Platform/API and
          authorized technology service providers.
        </p>
        <p>
          You may request to stop non-essential WhatsApp communications at any time by contacting us
          or replying with an opt-out request such as &quot;STOP&quot;. Essential transactional or
          service-related communication may still be sent where permitted and necessary.
        </p>
      </>
    ),
  },
  {
    title: "5. Sharing of Information",
    content: (
      <p>
        We do not sell or rent personal information. We may share information with service providers
        only where reasonably necessary to operate our services, including payment processors,
        website/cloud hosting providers, messaging and WhatsApp service providers, and professional
        or regulatory service providers. We may also disclose information where required by
        applicable law or a lawful request from an authority.
      </p>
    ),
  },
  {
    title: "6. Data Security",
    content: (
      <p>
        We take reasonable administrative and technical measures to protect personal information
        against unauthorized access, loss, misuse, alteration, or disclosure. However, no
        internet-based system can guarantee absolute security.
      </p>
    ),
  },
  {
    title: "7. Data Retention",
    content: (
      <p>
        We retain personal and transaction information only for as long as reasonably necessary for
        academy operations, accounting, legal obligations, dispute resolution, and other legitimate
        purposes.
      </p>
    ),
  },
  {
    title: "8. Your Choices and Rights",
    content: (
      <p>
        Subject to applicable law, you may contact us to request access to, correction of, or
        deletion of personal information held by us. Parents or legal guardians may contact us
        regarding information associated with a minor registered with the academy.
      </p>
    ),
  },
  {
    title: "9. Third-Party Services",
    content: (
      <p>
        Our website may integrate third-party services such as payment gateways and WhatsApp. Those
        services may process information according to their own privacy policies and terms.
      </p>
    ),
  },
  {
    title: "10. Changes to This Privacy Policy",
    content: (
      <p>
        TAi Football Academy may update this Privacy Policy when our services, technology, or legal
        requirements change. The latest version will be published on our website with an updated
        effective date.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tighter lg:text-7xl">
            Privacy <span className="text-neon">Policy</span>.
          </h1>
          <p className="mt-6 text-sm text-foreground/50">Last Updated: 5 September 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-10 px-6 text-sm leading-relaxed text-foreground/65 [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2">
          <p>
            TAi Football Academy (&quot;TAi Football Academy&quot;, &quot;we&quot;, &quot;our&quot;,
            or &quot;us&quot;) respects the privacy of students, parents, guardians, and website
            visitors. This Privacy Policy explains how we collect, use, store, and protect personal
            information when you use our website, register for our football training programs, make
            payments, or communicate with us through WhatsApp or other channels.
          </p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
                {section.title}
              </h2>
              <div className="mt-4">{section.content}</div>
            </section>
          ))}
          <section>
            <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
              11. Contact Us
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
