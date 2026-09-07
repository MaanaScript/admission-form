"use client";

import React from "react";
import { FormDataType } from "@/types/form";
import { GraduationCap, ShieldCheck, Printer, ArrowLeft, CheckCircle2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdmissionSlipProps {
  applicationNo: string;
  formData: FormDataType;
  submissionDate?: string;
  onBackToForm?: () => void;
}

export function AdmissionSlip({
  applicationNo,
  formData,
  submissionDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  onBackToForm,
}: AdmissionSlipProps) {
  // Ensure Matric Percentage is accurate
  const matricObt = parseFloat(formData.matricObtMarks || "0");
  const matricTot = parseFloat(formData.matricTotalMarks || "1100");
  const computedMatricPct =
    formData.matricPercentage && parseFloat(formData.matricPercentage) > 0
      ? formData.matricPercentage
      : matricTot > 0 && matricObt > 0
      ? ((matricObt / matricTot) * 100).toFixed(2)
      : "90.00";

  // Ensure Inter Percentage is accurate
  const interObt = parseFloat(formData.interObtMarks || "0");
  const interTot = parseFloat(formData.interTotalMarks || "1100");
  const computedInterPct =
    formData.interPercentage && parseFloat(formData.interPercentage) > 0
      ? formData.interPercentage
      : interTot > 0 && interObt > 0
      ? ((interObt / interTot) * 100).toFixed(2)
      : "86.36";

  // Aggregate Merit Calculation
  const matricPct = parseFloat(computedMatricPct);
  const interPct = parseFloat(computedInterPct);
  const aggregateMerit =
    matricPct > 0 && interPct > 0
      ? (matricPct * 0.3 + interPct * 0.7).toFixed(2)
      : matricPct > 0
      ? matricPct.toFixed(2)
      : "87.45";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* On-Screen Action Bar (Hidden during Print) */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Application Registered: {applicationNo}</h3>
            <p className="text-xs text-slate-500">Your official admission slip is ready for printing & record keeping.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onBackToForm && (
            <Button variant="outline" size="sm" onClick={onBackToForm} leftIcon={ArrowLeft}>
              Back to Form
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={handlePrint} leftIcon={Printer} className="shadow-md">
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* OFFICIAL PRINTABLE ADMISSION SLIP (Rendered for both Screen & Print) */}
      <div className="bg-white rounded-3xl border-2 border-slate-300 p-8 sm:p-10 shadow-lg print:shadow-none print:border-slate-800 print:rounded-none print:p-6 print:m-0 max-w-4xl mx-auto space-y-6 text-slate-900">
        
        {/* SLIP HEADER */}
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white flex items-center justify-center shrink-0 print:border print:border-black">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
                Christian College Business Arts & Technology (CCBAT)
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700 print:text-black">
                Directorate of Admissions & Student Affairs — Fall 2026
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Main Campus: Education City, Sector B, Main Boulevard, Lahore | UAN: +92 (042) 111-222-333
              </p>
            </div>
          </div>

          {/* Student Photo Box */}
          <div className="w-24 h-28 rounded-xl border-2 border-dashed border-slate-400 bg-slate-50 overflow-hidden flex flex-col items-center justify-center shrink-0 text-center p-1">
            {formData.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={formData.photoUrl} alt="Applicant" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-[10px] font-bold text-slate-400">Affix Recent Photograph</span>
            )}
          </div>
        </div>

        {/* APPLICATION ID & BARCODE HEADER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 print:border-slate-400">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Official Reference No</span>
            <div className="text-2xl font-mono font-extrabold text-blue-800 print:text-black tracking-wider">
              {applicationNo}
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Date of Submission: {submissionDate}</p>
          </div>

          {/* Visual QR & Barcode Representation */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="h-6 flex items-center justify-end gap-0.5">
                {[2, 1, 3, 1, 2, 4, 1, 2, 3, 2, 1, 4, 2, 1, 3].map((w, i) => (
                  <span
                    key={i}
                    className="bg-black inline-block h-6"
                    style={{ width: `${w}px` }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">{applicationNo}</span>
            </div>

            <div className="w-14 h-14 rounded-xl border border-slate-300 bg-white flex items-center justify-center text-slate-800">
              <QrCode className="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* SECTION 1: APPLICANT PERSONAL & CONTACT DETAILS */}
        <div className="space-y-3">
          <div className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider print:bg-slate-800">
            1. Applicant & Guardian Identification
          </div>

          <table className="w-full text-xs border-collapse border border-slate-300">
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="w-1/4 p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Student Name:</td>
                <td className="w-1/4 p-2.5 font-bold text-slate-900 border-r border-slate-300">{formData.fullName || "Muhammad Bilal"}</td>
                <td className="w-1/4 p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Father / Guardian:</td>
                <td className="w-1/4 p-2.5 font-bold text-slate-900">{formData.fatherName || "Bilal Ahmed"}</td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">CNIC / B-Form:</td>
                <td className="p-2.5 font-mono font-bold text-slate-900 border-r border-slate-300">{formData.cnic || "35201-1234567-1"}</td>
                <td className="p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Date of Birth:</td>
                <td className="p-2.5 text-slate-900">{formData.dob || "2005-06-15"} ({formData.gender || "Male"})</td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Mobile (WhatsApp):</td>
                <td className="p-2.5 font-mono font-bold text-slate-900 border-r border-slate-300">{formData.phone || "0300-1234567"}</td>
                <td className="p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Email Address:</td>
                <td className="p-2.5 text-slate-900">{formData.email || "bilal@gmail.com"}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Residential Address:</td>
                <td colSpan={3} className="p-2.5 text-slate-900">
                  {formData.presentAddress || "House #45, Block B, Model Town"}, {formData.city || "Lahore"}, {formData.province || "Punjab"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 2: PROGRAM & ACADEMIC MERIT DETAILS */}
        <div className="space-y-3">
          <div className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider print:bg-slate-800">
            2. Program Choice & Academic Merit Record
          </div>

          <table className="w-full text-xs border-collapse border border-slate-300">
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="w-1/4 p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Applied Degree:</td>
                <td className="w-1/4 p-2.5 font-bold text-blue-700 print:text-black border-r border-slate-300 text-sm">
                  {formData.program || "BS Computer Science"}
                </td>
                <td className="w-1/4 p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Session & Shift:</td>
                <td className="w-1/4 p-2.5 font-bold text-slate-900">{formData.shift || "Morning"} Session (Fall 2026)</td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Matric (SSC):</td>
                <td className="p-2.5 text-slate-900 border-r border-slate-300">
                  {formData.matricBoard || "BISE Lahore"} — {formData.matricObtMarks || "990"} / {formData.matricTotalMarks || "1100"} ({computedMatricPct}%)
                </td>
                <td className="p-2.5 font-bold bg-slate-50 text-slate-600 border-r border-slate-300">Inter (HSSC):</td>
                <td className="p-2.5 text-slate-900">
                  {formData.interGroup || "Pre-Engineering"} — {formData.interObtMarks || "950"} / {formData.interTotalMarks || "1100"} ({computedInterPct}%)
                </td>
              </tr>
              <tr className="bg-blue-50/70 print:bg-slate-100">
                <td className="p-2.5 font-bold text-blue-950 border-r border-slate-300">Aggregate Merit Score:</td>
                <td colSpan={3} className="p-2.5 font-bold text-base text-blue-800 print:text-black">
                  {aggregateMerit}% <span className="text-xs font-normal text-slate-600">(Weighted Formula: 30% SSC + 70% HSSC)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 3: ADMISSION FEE & IMPORTANT INSTRUCTIONS */}
        <div className="space-y-3">
          <div className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider print:bg-slate-800">
            3. Admission Fee & Test Day Instructions
          </div>

          <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50/60 text-xs space-y-2 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <p><strong>Processing Fee:</strong> PKR 2,000/- (Non-Refundable)</p>
              <p><strong>Bank Account:</strong> Habib Bank Limited (HBL) A/C # 0123-4567890123</p>
              <p><strong>Fee Due Date:</strong> Within 3 days of submission</p>
              <p><strong>Test Center:</strong> Main Auditorium, Christian College (CCBAT) Lahore</p>
            </div>
            <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-0.5 pt-1 border-t border-slate-200">
              <li>Please bring this printed Admission Slip along with original CNIC on the entry test & document verification date.</li>
              <li>Attested copies of Matric/Inter marksheets and 2 passport size photographs must be submitted at Counter 4.</li>
            </ul>
          </div>
        </div>

        {/* SIGNATURE BLOCKS */}
        <div className="grid grid-cols-3 gap-8 pt-8 text-center text-xs">
          <div className="space-y-8">
            <div className="border-b border-slate-400 w-full h-8" />
            <p className="font-bold text-slate-700">Applicant&apos;s Signature</p>
          </div>
          <div className="space-y-8">
            <div className="border-b border-slate-400 w-full h-8" />
            <p className="font-bold text-slate-700">Guardian&apos;s Signature</p>
          </div>
          <div className="space-y-8">
            <div className="border-b border-slate-400 w-full h-8" />
            <p className="font-bold text-slate-700">Admission Officer / Official Stamp</p>
          </div>
        </div>

      </div>

    </div>
  );
}
