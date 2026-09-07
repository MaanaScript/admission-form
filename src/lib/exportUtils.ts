import { ApplicantRecord } from "@/components/admin/DataTable";

/**
 * Converts an array of ApplicantRecord objects to a clean CSV string
 * and triggers a browser download.
 */
export function exportMeritListToCSV(
  applicants: ApplicantRecord[],
  filename: string = "CCBAT_Merit_List_Fall_2026.csv",
  onlyApproved: boolean = false
) {
  const recordsToExport = onlyApproved
    ? applicants.filter((a) => a.status === "APPROVED")
    : applicants;

  // Sort by Merit Score descending for official merit ranking
  const sortedRecords = [...recordsToExport].sort(
    (a, b) => b.meritScore - a.meritScore
  );

  const headers = [
    "Merit Rank",
    "Application Number",
    "Candidate Name",
    "Father Name",
    "CNIC",
    "Contact Number",
    "Email",
    "Degree Program",
    "Shift",
    "Matric Percentage (%)",
    "Inter Percentage (%)",
    "Aggregate Merit Score (%)",
    "Admission Status",
    "Submission Date",
    "Directorate Remarks",
  ];

  const csvRows = sortedRecords.map((app, index) => {
    const rank = index + 1;
    const clean = (str: string | number | undefined) =>
      `"${String(str || "").replace(/"/g, '""')}"`;

    return [
      rank,
      clean(app.applicationNo),
      clean(app.fullName),
      clean(app.fatherName),
      clean(app.cnic),
      clean(app.phone),
      clean(app.email),
      clean(app.program),
      clean(app.shift),
      clean(app.matricPct.toFixed(2)),
      clean(app.interPct.toFixed(2)),
      clean(app.meritScore.toFixed(2)),
      clean(app.status),
      clean(app.submissionDate),
      clean(app.adminRemarks),
    ].join(",");
  });

  const csvContent = [headers.join(","), ...csvRows].join("\r\n");

  // Create Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
