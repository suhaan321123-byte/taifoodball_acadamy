import { jsPDF } from "jspdf";

const formatDate = (value) => {
  if (!value) return "Not provided";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatMoney = (value) => `INR ${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export function downloadAdmissionFormPdf(details) {
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 17;
  const contentWidth = pageWidth - margin * 2;
  const ink = [19, 30, 26];
  const muted = [102, 112, 105];
  const neon = [193, 239, 82];
  let y = 0;

  const addHeader = (continued = false) => {
    pdf.setFillColor(...ink);
    pdf.rect(0, 0, pageWidth, continued ? 25 : 47, "F");
    pdf.setTextColor(...neon);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("TAI FOOTBALL ACADEMY", margin, 13);
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(continued ? 15 : 21);
    pdf.text(continued ? "ADMISSION FORM - CONTINUED" : "STUDENT ADMISSION FORM", margin, continued ? 21 : 27);
    if (!continued) {
      pdf.setTextColor(215, 222, 215);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.text("Official student registration record", margin, 35);
      pdf.setFillColor(...neon);
      pdf.roundedRect(pageWidth - margin - 39, 12, 39, 10, 3, 3, "F");
      pdf.setTextColor(...ink);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.text(details.paymentStatus || "REGISTRATION", pageWidth - margin - 19.5, 18.5, { align: "center" });
      pdf.setTextColor(215, 222, 215);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text(`Form ID: ${details.formId || "Pending"}`, pageWidth - margin - 39, 29, { align: "right" });
    }
    y = continued ? 34 : 56;
  };

  const ensureSpace = (height) => {
    if (y + height > pageHeight - 18) {
      pdf.addPage();
      addHeader(true);
    }
  };

  const section = (title) => {
    ensureSpace(14);
    pdf.setFillColor(242, 246, 237);
    pdf.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, "F");
    pdf.setTextColor(...ink);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text(title.toUpperCase(), margin + 3, y + 5.4);
    y += 12;
  };

  const row = (label, value, options = {}) => {
    const cleanValue = String(value || "Not provided");
    const valueLines = pdf.splitTextToSize(cleanValue, options.valueWidth || contentWidth * 0.64);
    const height = Math.max(7, valueLines.length * 4.5 + 2);
    ensureSpace(height);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(...muted);
    pdf.text(label, margin + 1, y + 3.2);
    pdf.setTextColor(...ink);
    pdf.setFont("helvetica", options.bold ? "bold" : "normal");
    pdf.text(valueLines, margin + contentWidth * 0.36, y + 3.2);
    y += height;
    pdf.setDrawColor(228, 233, 225);
    pdf.line(margin, y, pageWidth - margin, y);
  };

  addHeader();
  section("Student profile");
  row("Full name", details.name, { bold: true });
  row("Date of birth", formatDate(details.dateOfBirth));
  row("Gender", details.gender);
  row("Email", details.email);
  row("Mobile", `${details.countryCode || ""} ${details.contact || ""}`.trim());
  row("Address", details.address);

  section("Academy placement");
  row("Course", details.courseName, { bold: true });
  row("Package", details.planName);
  row("Training branch", details.branchName);
  row("Admission date", formatDate(details.admissionDate || details.startDate));
  row("Estimated duration", details.durationLabel);
  row("Registration ID", details.memberCode || details.formId || "Pending");

  section("Fees and payment");
  row("Package price", formatMoney(details.baseAmount));
  if (Number(details.discountAmount) > 0) row("Discount", `- ${formatMoney(details.discountAmount)}`);
  row("Registration fee", formatMoney(details.registrationFee));
  row("Security deposit", formatMoney(details.securityDeposit));
  (details.additionalCharges || []).forEach((charge) => row(charge.label || "Additional fee", formatMoney(charge.amount)));
  row("Tax", formatMoney(details.taxAmount));
  if (Number(details.recurringAmount) > 0) row("Recurring installment", formatMoney(details.recurringAmount));
  row("Estimated total", formatMoney(details.estimatedFee), { bold: true });
  row("Payment choice", details.paymentChoice === "pay_later" ? "Pay later at the academy" : "Online payment");
  row("Payment status", details.paymentStatus);

  section("Parent / guardian and emergency contact");
  row("Guardian name", details.guardianName);
  row("Guardian phone", details.guardianPhone);
  row("Relationship", details.guardianRelationship);
  row("Emergency contact", details.emergencyContactName);
  row("Emergency phone", details.emergencyContactPhone);
  row("Blood group", details.bloodGroup);
  if (details.notes) row("Additional notes", details.notes);

  ensureSpace(27);
  y += 5;
  pdf.setTextColor(...muted);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.text(
    "This form confirms receipt of the registration details shown above. Course placement and fee schedules are subject to academy confirmation.",
    margin,
    y,
    { maxWidth: contentWidth },
  );
  y += 15;
  pdf.setDrawColor(150, 160, 150);
  pdf.line(margin, y, margin + 54, y);
  pdf.line(pageWidth - margin - 54, y, pageWidth - margin, y);
  pdf.setFontSize(7);
  pdf.text("Parent / guardian signature", margin, y + 4);
  pdf.text("Academy representative", pageWidth - margin - 54, y + 4);

  const safeName = String(details.name || "student")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "student";
  pdf.save(`tai-academy-admission-${safeName}.pdf`);
}
