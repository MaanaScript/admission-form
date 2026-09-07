import { FormDataType } from "@/types/form";

export function generateAdmissionEmailHtml(data: FormDataType, appNo: string): string {
  // Calculate Merit
  const matricPct = parseFloat(data.matricPercentage || "0");
  const interPct = parseFloat(data.interPercentage || "0");
  const aggregateMerit =
    matricPct > 0 && interPct > 0
      ? (matricPct * 0.3 + interPct * 0.7).toFixed(2)
      : matricPct > 0
      ? matricPct.toFixed(2)
      : "0.00";

  const submittedAt = new Date().toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Admission Application - Zynox University</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      color: #1e293b;
    }
    .container {
      max-width: 680px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
      color: #ffffff;
      padding: 32px 28px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .header p {
      margin: 6px 0 0 0;
      font-size: 13px;
      color: #bfdbfe;
    }
    .app-badge {
      display: inline-block;
      margin-top: 14px;
      background-color: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 28px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #1e40af;
      margin: 24px 0 12px 0;
      padding-bottom: 6px;
      border-bottom: 2px solid #e2e8f0;
    }
    .grid-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    .grid-table td {
      padding: 9px 12px;
      font-size: 13px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: top;
    }
    .grid-table .label {
      font-weight: 600;
      color: #64748b;
      width: 38%;
      background-color: #f8fafc;
    }
    .grid-table .val {
      font-weight: 700;
      color: #0f172a;
      width: 62%;
    }
    .merit-box {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      border-radius: 12px;
      padding: 18px 22px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .merit-score {
      font-size: 28px;
      font-weight: 800;
      color: #38bdf8;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 28px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
    .btn {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- HEADER -->
    <div class="header">
      <h1>Zynox University</h1>
      <p>Directorate of Admissions & Student Affairs — Fall 2026</p>
      <div class="app-badge">Application Ref: ${appNo}</div>
    </div>

    <!-- CONTENT -->
    <div class="content">
      
      <p style="font-size: 14px; margin-top: 0; line-height: 1.6; color: #334155;">
        A new online admission application has been successfully submitted on the Zynox University Admissions Portal. Complete applicant profile and academic records are detailed below:
      </p>

      <!-- MERIT BANNER -->
      <table style="width: 100%; background-color: #0f172a; border-radius: 12px; margin: 18px 0; color: #ffffff;">
        <tr>
          <td style="padding: 16px 20px;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 700;">
              Selected Degree Program
            </div>
            <div style="font-size: 16px; font-weight: 800; color: #ffffff; margin-top: 2px;">
              ${data.program} (${data.shift || "Morning"} Shift)
            </div>
            <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
              ${data.degreeLevel}
            </div>
          </td>
          <td style="padding: 16px 20px; text-align: right;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 700;">
              Aggregate Merit (30% + 70%)
            </div>
            <div style="font-size: 26px; font-weight: 900; color: #38bdf8;">
              ${aggregateMerit}%
            </div>
          </td>
        </tr>
      </table>

      <!-- 1. PERSONAL INFORMATION -->
      <div class="section-title">1. Student Personal Information</div>
      <table class="grid-table">
        <tr>
          <td class="label">Full Name</td>
          <td class="val">${data.fullName}</td>
        </tr>
        <tr>
          <td class="label">Father's Name</td>
          <td class="val">${data.fatherName}</td>
        </tr>
        <tr>
          <td class="label">CNIC / B-Form No</td>
          <td class="val">${data.cnic}</td>
        </tr>
        <tr>
          <td class="label">Date of Birth</td>
          <td class="val">${data.dob}</td>
        </tr>
        <tr>
          <td class="label">Gender</td>
          <td class="val">${data.gender}</td>
        </tr>
        <tr>
          <td class="label">Blood Group</td>
          <td class="val">${data.bloodGroup || "Not Specified"}</td>
        </tr>
        <tr>
          <td class="label">Nationality / Religion</td>
          <td class="val">${data.nationality} / ${data.religion}</td>
        </tr>
      </table>

      <!-- 2. CONTACT & RESIDENCE -->
      <div class="section-title">2. Contact & Address Details</div>
      <table class="grid-table">
        <tr>
          <td class="label">Email Address</td>
          <td class="val"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="label">Mobile / WhatsApp</td>
          <td class="val">${data.phone}</td>
        </tr>
        <tr>
          <td class="label">Emergency Contact</td>
          <td class="val">${data.emergencyContact}</td>
        </tr>
        <tr>
          <td class="label">Present Address</td>
          <td class="val">${data.presentAddress}</td>
        </tr>
        <tr>
          <td class="label">Permanent Address</td>
          <td class="val">${data.sameAsPresent ? "Same as Present Address" : data.permanentAddress}</td>
        </tr>
        <tr>
          <td class="label">City / Province</td>
          <td class="val">${data.city}, ${data.province}</td>
        </tr>
      </table>

      <!-- 3. GUARDIAN DETAILS -->
      <div class="section-title">3. Parent / Guardian & Sponsorship</div>
      <table class="grid-table">
        <tr>
          <td class="label">Guardian Name</td>
          <td class="val">${data.guardianName}</td>
        </tr>
        <tr>
          <td class="label">Relationship</td>
          <td class="val">${data.guardianRelation}</td>
        </tr>
        <tr>
          <td class="label">Guardian CNIC</td>
          <td class="val">${data.guardianCnic}</td>
        </tr>
        <tr>
          <td class="label">Guardian Mobile</td>
          <td class="val">${data.guardianPhone}</td>
        </tr>
        <tr>
          <td class="label">Occupation / Profession</td>
          <td class="val">${data.guardianOccupation || "Not Specified"}</td>
        </tr>
        <tr>
          <td class="label">Monthly Household Income</td>
          <td class="val">${data.guardianIncome || "Not Specified"}</td>
        </tr>
      </table>

      <!-- 4. ACADEMIC RECORDS -->
      <div class="section-title">4. Academic Records & Marks Breakdown</div>
      <table class="grid-table">
        <tr>
          <td class="label">Matriculation (SSC)</td>
          <td class="val">
            <strong>${data.matricObtMarks} / ${data.matricTotalMarks}</strong> (${data.matricPercentage}%)<br>
            <span style="font-size: 11px; color: #64748b;">Roll No: ${data.matricRollNo} | Year: ${data.matricYear} | Board: ${data.matricBoard}</span>
          </td>
        </tr>
        <tr>
          <td class="label">Intermediate (HSSC)</td>
          <td class="val">
            <strong>${data.interObtMarks} / ${data.interTotalMarks}</strong> (${data.interPercentage}%)<br>
            <span style="font-size: 11px; color: #64748b;">Roll No: ${data.interRollNo} | Year: ${data.interYear} | Group: ${data.interGroup} | Board: ${data.interBoard}</span>
          </td>
        </tr>
        <tr>
          <td class="label">Weightage Computation</td>
          <td class="val" style="color: #0369a1;">
            SSC Weightage (30%): <strong>${((matricPct * 0.3) || 0).toFixed(2)}%</strong><br>
            HSSC Weightage (70%): <strong>${((interPct * 0.7) || 0).toFixed(2)}%</strong>
          </td>
        </tr>
      </table>

      <!-- 5. PROGRAM PREFERENCE & REFERRAL -->
      <div class="section-title">5. Degree Choices & Outreach</div>
      <table class="grid-table">
        <tr>
          <td class="label">1st Preference Program</td>
          <td class="val" style="color: #1d4ed8; font-weight: 800;">${data.program} (${data.shift})</td>
        </tr>
        <tr>
          <td class="label">2nd Preference Program</td>
          <td class="val">${data.secondaryProgram || "None"}</td>
        </tr>
        <tr>
          <td class="label">Referral Source</td>
          <td class="val">${data.referralSource || "Official Website"}</td>
        </tr>
      </table>

      <!-- 6. ATTACHMENTS SUMMARY -->
      <div class="section-title">6. Uploaded Documents</div>
      <table class="grid-table">
        <tr>
          <td class="label">Student Photograph</td>
          <td class="val">${data.photoUrl ? "✅ Attached (Embedded)" : "⚠️ Not Provided"}</td>
        </tr>
        <tr>
          <td class="label">Student CNIC Copy</td>
          <td class="val">${data.cnicDocUrl ? "✅ Attached" : "⚠️ Not Provided"}</td>
        </tr>
        <tr>
          <td class="label">Guardian CNIC Copy</td>
          <td class="val">${data.guardianCnicDocUrl ? "✅ Attached" : "⚠️ Not Provided"}</td>
        </tr>
        <tr>
          <td class="label">Matric Marksheet</td>
          <td class="val">${data.matricDocUrl ? "✅ Attached" : "⚠️ Not Provided"}</td>
        </tr>
        <tr>
          <td class="label">Inter Marksheet / Hope Cert</td>
          <td class="val">${data.interDocUrl ? "✅ Attached" : "⚠️ Not Provided"}</td>
        </tr>
      </table>

      <!-- SUBMISSION TIMESTAMP -->
      <p style="font-size: 12px; color: #94a3b8; text-align: right; margin-top: 20px;">
        Application Registered At: <strong>${submittedAt}</strong>
      </p>

    </div>

    <!-- FOOTER -->
    <div class="footer">
      <p style="margin: 0; font-weight: 700; color: #334155;">Zynox University Admissions Directorate</p>
      <p style="margin: 4px 0 0 0;">Sector H-9, Islamabad / Canal Road, Lahore, Pakistan | admissions@zynox.edu.pk</p>
      <p style="margin: 8px 0 0 0; font-size: 11px; color: #94a3b8;">This is an automated institutional notification generated upon online admission form submission.</p>
    </div>

  </div>
</body>
</html>
  `.trim();
}
