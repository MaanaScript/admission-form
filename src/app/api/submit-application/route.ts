import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateAdmissionEmailHtml } from "@/lib/emailTemplates";
import { FormDataType } from "@/types/form";

function parseDataUrlAttachment(dataUrl: string, baseFilename: string) {
  if (!dataUrl || !dataUrl.startsWith("data:")) return null;
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;

  const mime = match[1];
  const base64Data = match[2];
  let ext = "png";
  if (mime.includes("pdf")) ext = "pdf";
  else if (mime.includes("jpeg") || mime.includes("jpg")) ext = "jpg";
  else if (mime.includes("webp")) ext = "webp";
  else if (mime.includes("png")) ext = "png";

  return {
    filename: `${baseFilename}.${ext}`,
    content: base64Data,
    encoding: "base64",
    contentType: mime,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, appNo }: { formData: FormDataType; appNo: string } = body;

    if (!formData || !appNo) {
      return NextResponse.json(
        { success: false, message: "Missing application data or application reference number." },
        { status: 400 }
      );
    }

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASSWORD?.replace(/\s+/g, "");
    const receiverEmail = process.env.ADMIN_RECEIVER_EMAIL || smtpEmail;

    // Check if SMTP credentials are configured
    if (!smtpEmail || !smtpPass || smtpEmail === "your_email@gmail.com") {
      console.warn("SMTP credentials not configured in .env.local. Email dispatch skipped in mock mode.");
      return NextResponse.json({
        success: true,
        mockMode: true,
        appNo,
        message: "Application recorded. (Configure SMTP_EMAIL & SMTP_PASSWORD in .env.local to receive live emails).",
      });
    }

    // Configure Nodemailer Transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpEmail,
        pass: smtpPass,
      },
    });

    const htmlContent = generateAdmissionEmailHtml(formData, appNo);

    // Prepare ALL 5 uploaded attachments (Photo, Applicant CNIC, Guardian CNIC, Matric, Inter)
    const attachments: Array<{ filename: string; content: string; encoding: string; contentType?: string }> = [];
    const cleanName = (formData.fullName || "Applicant").replace(/[^a-zA-Z0-9]/g, "_");

    // 1. Student Photo
    const photoAttachment = parseDataUrlAttachment(formData.photoUrl, `${cleanName}_01_Photo`);
    if (photoAttachment) attachments.push(photoAttachment);

    // 2. Applicant CNIC
    const cnicAttachment = parseDataUrlAttachment(formData.cnicDocUrl, `${cleanName}_02_Applicant_CNIC`);
    if (cnicAttachment) attachments.push(cnicAttachment);

    // 3. Guardian CNIC
    const guardianCnicAttachment = parseDataUrlAttachment(formData.guardianCnicDocUrl, `${cleanName}_03_Guardian_CNIC`);
    if (guardianCnicAttachment) attachments.push(guardianCnicAttachment);

    // 4. Matric Marksheet
    const matricAttachment = parseDataUrlAttachment(formData.matricDocUrl, `${cleanName}_04_Matric_Marksheet`);
    if (matricAttachment) attachments.push(matricAttachment);

    // 5. Inter Marksheet
    const interAttachment = parseDataUrlAttachment(formData.interDocUrl, `${cleanName}_05_Inter_Marksheet`);
    if (interAttachment) attachments.push(interAttachment);

    // Send the email to the admin/college address with all attachments
    const mailOptions = {
      from: `"Zynox Admissions" <${smtpEmail}>`,
      to: receiverEmail,
      subject: `🎓 New Admission Form: ${appNo} - ${formData.fullName} (${formData.program})`,
      html: htmlContent,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Admission Email successfully delivered with ${attachments.length} attachment(s):`, info.messageId);

    return NextResponse.json({
      success: true,
      appNo,
      messageId: info.messageId,
      attachmentsCount: attachments.length,
      message: `Application submitted and official email dispatched with ${attachments.length} attachments to ${receiverEmail}`,
    });
  } catch (error: any) {
    console.error("Failed to send admission email:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An unexpected error occurred while delivering email notification.",
      },
      { status: 500 }
    );
  }
}
