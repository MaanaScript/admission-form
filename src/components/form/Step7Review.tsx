"use client";

import React, { useState } from "react";
import { useAdmissionForm } from "@/context/FormContext";
import { Button } from "@/components/ui/Button";
import {
  User,
  Phone,
  Users,
  GraduationCap,
  BookOpen,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Edit3,
  ShieldCheck,
  CheckSquare,
  Square,
  Sparkles,
  Award,
  Send,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step7ReviewProps {
  onSubmit: () => void;
  isSubmitting?: boolean;
  errors?: Record<string, string>;
}

export function Step7Review({ onSubmit, isSubmitting = false, errors = {} }: Step7ReviewProps) {
  const { formData, updateFormData, setStep } = useAdmissionForm();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to workspace on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Aggregate Merit Calculation
  const matricPct = parseFloat(formData.matricPercentage || "0");
  const interPct = parseFloat(formData.interPercentage || "0");
  const aggregateMerit = (matricPct > 0 && interPct > 0)
    ? ((matricPct * 0.3) + (interPct * 0.7)).toFixed(2)
    : matricPct > 0
    ? matricPct.toFixed(2)
    : "0.00";

  return (
    <div ref={containerRef} className="space-y-8 animate-fadeIn">
      
      {/* Information Header */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
        <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Final Review & Verification:</span> Please carefully verify all the entered information across all steps before final submission. Click the <strong>&quot;Edit&quot;</strong> button on any section to make corrections.
        </div>
      </div>

      {/* SECTION 1: Personal Details Summary */}
      <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Personal Information</h4>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Step 1
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Full Name</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.fullName || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Father&apos;s Name</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.fatherName || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">CNIC / B-Form</p>
            <p className="font-mono font-bold text-slate-800 mt-0.5">{formData.cnic || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Date of Birth</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.dob || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Gender</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.gender || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Blood Group</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.bloodGroup || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Nationality</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.nationality || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Religion</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.religion || "—"}</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Contact & Address Summary */}
      <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Contact & Residential Details</h4>
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Step 2
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Email Address</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.email || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Mobile / WhatsApp</p>
            <p className="font-mono font-bold text-slate-800 mt-0.5">{formData.phone || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Emergency Phone</p>
            <p className="font-mono font-bold text-slate-800 mt-0.5">{formData.emergencyContact || "—"}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-slate-400 font-medium">Current Address</p>
            <p className="font-medium text-slate-800 mt-0.5">{formData.presentAddress || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">City & Province</p>
            <p className="font-bold text-slate-800 mt-0.5">
              {formData.city ? `${formData.city}, ${formData.province}` : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Guardian Details Summary */}
      <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Parent / Guardian Information</h4>
          </div>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Step 3
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Guardian Name</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.guardianName || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Relationship</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.guardianRelation || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Guardian CNIC</p>
            <p className="font-mono font-bold text-slate-800 mt-0.5">{formData.guardianCnic || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Guardian Mobile</p>
            <p className="font-mono font-bold text-slate-800 mt-0.5">{formData.guardianPhone || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Occupation</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.guardianOccupation || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Monthly Income</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.guardianIncome || "—"}</p>
          </div>
        </div>
      </div>

      {/* SECTION 4: Academic Records & Aggregate Merit */}
      <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Academic Records & Merit Calculation</h4>
          </div>
          <button
            type="button"
            onClick={() => setStep(4)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Step 4
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-2">
            <span className="font-bold text-slate-700 block">Matric (SSC) Qualification</span>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <p>Board: <strong className="text-slate-800">{formData.matricBoard}</strong></p>
              <p>Roll No: <strong className="text-slate-800 font-mono">{formData.matricRollNo || "—"}</strong></p>
              <p>Marks: <strong className="text-slate-800">{formData.matricObtMarks || "0"} / {formData.matricTotalMarks || "1100"}</strong></p>
              <p>Percentage: <strong className="text-blue-600 font-bold">{formData.matricPercentage || "0"}%</strong></p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-2">
            <span className="font-bold text-slate-700 block">Intermediate (HSSC) Qualification</span>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <p>Group: <strong className="text-slate-800">{formData.interGroup}</strong></p>
              <p>Roll No: <strong className="text-slate-800 font-mono">{formData.interRollNo || "—"}</strong></p>
              <p>Marks: <strong className="text-slate-800">{formData.interObtMarks || "0"} / {formData.interTotalMarks || "1100"}</strong></p>
              <p>Percentage: <strong className="text-indigo-600 font-bold">{formData.interPercentage || "0"}%</strong></p>
            </div>
          </div>
        </div>

        {/* Aggregate Merit Badge */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <span className="text-xs font-bold">Calculated Merit Aggregate (30% SSC + 70% HSSC)</span>
          <span className="text-base font-extrabold text-blue-200">{aggregateMerit}%</span>
        </div>
      </div>

      {/* SECTION 5: Program Selection */}
      <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Degree & Program Choice</h4>
          </div>
          <button
            type="button"
            onClick={() => setStep(5)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Step 5
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Degree Level</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.degreeLevel}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Primary Program (1st Choice)</p>
            <p className="font-bold text-blue-600 mt-0.5 text-sm">{formData.program || "—"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Shift Preference</p>
            <p className="font-bold text-slate-800 mt-0.5">{formData.shift} Session</p>
          </div>
        </div>
      </div>

      {/* SECTION 6: Attached Documents Summary */}
      <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Uploaded Documents Checklist</h4>
          </div>
          <button
            type="button"
            onClick={() => setStep(6)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Step 6
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {[
            { name: "Student Photo", key: "photoUrl" },
            { name: "Applicant CNIC", key: "cnicDocUrl" },
            { name: "Guardian CNIC", key: "guardianCnicDocUrl" },
            { name: "SSC Marksheet", key: "matricDocUrl" },
            { name: "HSSC Marksheet", key: "interDocUrl" },
          ].map((item) => {
            const hasDoc = Boolean(formData[item.key as keyof typeof formData]);
            return (
              <div
                key={item.key}
                className={cn(
                  "p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5",
                  hasDoc ? "bg-emerald-50/60 border-emerald-200 text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-400"
                )}
              >
                {hasDoc ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-slate-400" />
                )}
                <span className="text-[11px] font-bold">{item.name}</span>
                <span className="text-[10px]">{hasDoc ? "Attached" : "Not Attached"}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CODE OF CONDUCT & UNDERTAKING */}
      <div className="p-6 rounded-3xl border-2 border-blue-200 bg-blue-50/40 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-900">
          <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
          <div>
            <h4 className="text-sm font-bold">University Code of Conduct & Official Declaration</h4>
            <p className="text-xs text-blue-700">Please read and check both boxes to complete your submission.</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          
          {/* Checkbox 1: Terms */}
          <label
            onClick={() => updateFormData({ agreeTerms: !formData.agreeTerms })}
            className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-blue-100 shadow-2xs cursor-pointer select-none"
          >
            <div className="mt-0.5">
              {formData.agreeTerms ? (
                <CheckSquare className="w-5 h-5 text-blue-600" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong>Institutional Undertaking:</strong> I agree to abide by all the rules, discipline regulations, academic policies, and fee schedule prescribed by Zynox University.
            </div>
          </label>

          {/* Checkbox 2: Truthfulness */}
          <label
            onClick={() => updateFormData({ accuracyDeclaration: !formData.accuracyDeclaration })}
            className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-blue-100 shadow-2xs cursor-pointer select-none"
          >
            <div className="mt-0.5">
              {formData.accuracyDeclaration ? (
                <CheckSquare className="w-5 h-5 text-blue-600" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong>Accuracy Declaration:</strong> I solemnly affirm that all particulars filled in this form are correct. If any document is found forged or untrue, the university reserves the right to cancel my admission at any stage.
            </div>
          </label>

        </div>
      </div>

      {/* FINAL SUBMIT BUTTON */}
      <div className="pt-4 text-center">
        <Button
          type="button"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          onClick={onSubmit}
          className="w-full sm:w-auto px-12 py-4 text-base shadow-xl shadow-blue-600/30"
          rightIcon={Send}
        >
          Confirm & Final Submit Application
        </Button>
        <p className="text-xs text-slate-400 mt-2.5">
          Upon submitting, your unique Application ID and printable voucher will be generated instantly.
        </p>
      </div>

    </div>
  );
}
