import { jsPDF } from "jspdf";
import logoAsset from "@/assets/logo.png";

const formatDate = (value) => {
  if (!value) return "Not provided";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatMoney = (value) =>
  `INR ${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

async function loadLogoData() {
  const image = new Image();
  image.src = typeof logoAsset === "string" ? logoAsset : logoAsset.src;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create canvas context for logo");
  ctx.drawImage(image, 0, 0);
  return canvas.toDataURL("image/png");
}

export async function downloadAdmissionFormPdf(details) {
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const logoData = await loadLogoData();

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 17;
  const contentWidth = pageWidth - margin * 2;

  // Print-safe palette (all dark ink on white)
  const ink = [17, 24, 20];
  const body = [40, 48, 44];
  const muted = [110, 118, 112];
  const ruleLight = [220, 224, 220];
  const ruleMid = [160, 166, 160];

  let y = 0;

  // ---- FIRST-PAGE HEADER (print friendly, no background fill) ----
  const addFirstPageHeader = () => {
    const logoSize = 16;
    const logoX = margin;
    const logoY = 16;
    const textX = logoX + logoSize + 5; // beside logo

    // Logo
    pdf.addImage(logoData, "PNG", logoX, logoY, logoSize, logoSize);

    // Academy name (top of text block, aligned with logo top)
    pdf.setTextColor(...ink);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("TAI FOOTBALL ACADEMY", textX, logoY + 4);

    // Address block right under the academy name
    pdf.setTextColor(...muted);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.text(
      [
        "Pandikkal Building",
        "Poonoor, Kozhikode",
        "Kerala - 673574, India",
        "+91 8157010114",
      ],
      textX,
      logoY + 9,
      { lineHeightFactor: 1.45 },
    );

    // Created date (right side, same line as academy name)
    pdf.setTextColor(...muted);
    pdf.setFontSize(7.5);
    pdf.text(`Created: ${formatDate(new Date())}`, pageWidth - margin, logoY + 4, {
      align: "right",
    });

    // Separator rule BELOW the header block — does not touch the date text
    const headerBottom = logoY + logoSize + 8; // 16 + 16 + 4 = 36
    pdf.setDrawColor(...ruleMid);
    pdf.setLineWidth(0.4);
    pdf.line(margin, headerBottom, pageWidth - margin, headerBottom);

    // Document title (smaller, sits under the rule)
    pdf.setTextColor(...ink);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("STUDENT ADMISSION FORM", margin, headerBottom + 9);

    y = headerBottom + 12; // start content well below title
  };

  // ---- CONTINUATION PAGES: no header ----
  const startContinuationPage = () => {
    pdf.addPage();
    y = margin + 5;
  };

  const ensureSpace = (height) => {
    if (y + height > pageHeight - 18) {
      startContinuationPage();
    }
  };

  const section = (title) => {
    ensureSpace(14);
    pdf.setDrawColor(...ruleLight);
    pdf.setFillColor(244, 246, 243);
    pdf.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, "FD");
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

    pdf.setTextColor(...body);
    pdf.setFont("helvetica", options.bold ? "bold" : "normal");
    pdf.text(valueLines, margin + contentWidth * 0.36, y + 3.2);

    y += height;
    pdf.setDrawColor(...ruleLight);
    pdf.setLineWidth(0.2);
    pdf.line(margin, y, pageWidth - margin, y);
  };

  // ---- BUILD DOCUMENT ----
  addFirstPageHeader();

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
  row("Registration ID", details.memberCode || details.formId || "Pending");

  section("Parent / guardian and emergency contact");
  row("Guardian name", details.guardianName);
  row("Guardian phone", details.guardianPhone);
  row("Relationship", details.guardianRelationship);
  row("Emergency contact", details.emergencyContactName);
  row("Emergency phone", details.emergencyContactPhone);
  row("Blood group", details.bloodGroup);

  const feeRows = [
    ["Course fee", details.baseAmount],
    ["Discount", Number(details.discountAmount) > 0 ? -Number(details.discountAmount) : 0],
    ["Registration fee", details.registrationFee],
    ["Security deposit", details.securityDeposit],
    ...(details.additionalCharges || []).map((charge) => [
      charge.label || "Additional fee",
      charge.amount,
    ]),
    ["Tax", details.taxAmount],
    // ["Recurring installment", details.recurringAmount],
    ["Estimated total", details.estimatedFee],
  ].filter(([, amount]) => Math.abs(Number(amount)) > 0);

  if (feeRows.length) {
    section("Fees and payment");
    feeRows.forEach(([label, amount]) =>
      row(
        label,
        label === "Discount"
          ? `- ${formatMoney(Math.abs(amount))}`
          : formatMoney(amount),
        { bold: label === "Estimated total" },
      ),
    );
    row(
      "Payment choice",
      details.paymentChoice === "pay_later"
        ? "Pay later at the academy"
        : "Online payment",
    );
    row("Payment status", details.paymentStatus);
  }

  // Footer / signatures
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
  pdf.setDrawColor(...ruleMid);
  pdf.setLineWidth(0.3);
  pdf.line(margin, y, margin + 54, y);
  pdf.line(pageWidth - margin - 54, y, pageWidth - margin, y);
  pdf.setFontSize(7);
  pdf.setTextColor(...muted);
  pdf.text("Parent / guardian signature", margin, y + 4);
  pdf.text("Academy representative", pageWidth - margin - 54, y + 4);

  const safeName =
    String(details.name || "student")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "student";

  pdf.save(`tai-academy-admission-${safeName}.pdf`);
}