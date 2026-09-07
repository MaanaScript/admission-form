"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  FileText,
  ShieldCheck,
  Building2,
  Save,
  Printer,
  Sparkles,
} from "lucide-react";
import { ApplicantRecord } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ApplicantInspectorModalProps {
  applicant: ApplicantRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (
    applicantId: string,
    newStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED",
    remarks: string
  ) => void;
}

export function ApplicantInspectorModal({
  applicant,
  isOpen,
  onClose,
  onUpdateStatus,
}: ApplicantInspectorModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<
    "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  >("PENDING");
  const [remarks, setRemarks] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Sync state when applicant changes
  useEffect(() => {
    if (applicant) {
      setSelectedStatus(applicant.status);
      setRemarks(
        applicant.adminRemarks ||
          (applicant.status === "APPROVED"
            ? "Documents verified. Selected in 1st Merit List (Fall 2026)."
            : applicant.status === "REJECTED"
            ? "Ineligible: Intermediate marks below mandatory cutoff."
            : "Under scrutiny by admissions committee.")
      );
    }
  }, [applicant]);

  if (!isOpen || !applicant) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateStatus(applicant.id, selectedStatus, remarks);
      setIsSaving(false);
      onClose();
    }, 400);
  };

  const statusOptions: Array<{
    value: "APPROVED" | "UNDER_REVIEW" | "PENDING" | "REJECTED";
    label: string;
    description: string;
    icon: any;
    color: string;
    activeBorder: string;
    activeBg: string;
  }> = [
    {
      value: "APPROVED",
      label: "Approve / Merit Listed",
      description: "Eligible for semester fee challan issuance",
      icon: CheckCircle2,
      color: "text-emerald-600",
      activeBorder: "border-emerald-600 ring-2 ring-emerald-500/20",
      activeBg: "bg-emerald-50/70",
    },
    {
      value: "UNDER_REVIEW",
      label: "Under Review",
      description: "Documents need board re-scrutiny",
      icon: AlertTriangle,
      color: "text-purple-600",
      activeBorder: "border-purple-600 ring-2 ring-purple-500/20",
      activeBg: "bg-purple-50/70",
    },
    {
      value: "PENDING",
      label: "Pending Scrutiny",
      description: "Awaiting committee assignment",
      icon: Clock,
      color: "text-amber-600",
      activeBorder: "border-amber-600 ring-2 ring-amber-500/20",
      activeBg: "bg-amber-50/70",
    },
    {
      value: "REJECTED",
      label: "Reject / Ineligible",
      description: "Does not meet university criteria",
      icon: XCircle,
      color: "text-rose-600",
      activeBorder: "border-rose-600 ring-2 ring-rose-500/20",
      activeBg: "bg-rose-50/70",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      
      {/* MODAL CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col justify-between animate-scaleUp text-slate-900">
        
        {/* MODAL HEADER */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-mono font-bold text-xs">
                {applicant.applicationNo}
              </span>
              <StatusBadge status={applicant.status} />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {applicant.fullName}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              S/O {applicant.fatherName} | Submitted: {applicant.submissionDate}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* SECTION 1: APPLICANT DETAILS 4-GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <User className="w-3.5 h-3.5" />
                <span>CNIC / B-Form</span>
              </div>
              <p className="font-mono font-bold text-slate-900 text-sm">{applicant.cnic}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Phone className="w-3.5 h-3.5" />
                <span>Mobile (WhatsApp)</span>
              </div>
              <p className="font-mono font-bold text-slate-900 text-sm">{applicant.phone}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Mail className="w-3.5 h-3.5" />
                <span>Email Address</span>
              </div>
              <p className="font-medium text-slate-900 text-xs truncate">{applicant.email}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Program & Shift</span>
              </div>
              <p className="font-bold text-blue-700 text-xs">
                {applicant.program} ({applicant.shift})
              </p>
            </div>

          </div>

          {/* SECTION 2: ACADEMIC MERIT BREAKDOWN */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              Academic Merit Computation Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 block">Matric (SSC) 30% Weight</span>
                <p className="text-xl font-mono font-extrabold text-slate-900 mt-1">
                  {applicant.matricPct.toFixed(2)}%
                </p>
                <span className="text-[10px] text-slate-500">Weight Contribution: {(applicant.matricPct * 0.3).toFixed(2)}%</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 block">Inter (HSSC) 70% Weight</span>
                <p className="text-xl font-mono font-extrabold text-slate-900 mt-1">
                  {applicant.interPct.toFixed(2)}%
                </p>
                <span className="text-[10px] text-slate-500">Weight Contribution: {(applicant.interPct * 0.7).toFixed(2)}%</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                <span className="text-[11px] font-bold text-blue-700 uppercase block">Total Aggregate Merit</span>
                <p className="text-2xl font-mono font-extrabold text-blue-900 mt-1">
                  {applicant.meritScore.toFixed(2)}%
                </p>
                <span className="text-[10px] font-semibold text-blue-700">Official Directorate Formula</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: DOCUMENT SCRUTINY CHECKLIST */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Uploaded Documents Scrutiny
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              {[
                { title: "Passport Photo", status: "Verified" },
                { title: "Applicant CNIC", status: "Verified" },
                { title: "Guardian CNIC", status: "Verified" },
                { title: "Matric Marksheet", status: "Verified" },
                { title: "Inter Marksheet", status: applicant.status === "UNDER_REVIEW" ? "Awaiting Scrutiny" : "Verified" },
              ].map((doc, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                  <p className="font-semibold text-slate-700 text-[11px]">{doc.title}</p>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      doc.status === "Verified"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: DIRECTORATE STATUS UPDATER FORM */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Update Application Scrutiny Status</span>
            </div>

            {/* Status Selector Radio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {statusOptions.map((opt) => {
                const isSelected = selectedStatus === opt.value;
                const Icon = opt.icon;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(opt.value);
                      if (opt.value === "APPROVED") {
                        setRemarks(`Documents verified. Selected in 1st Merit List for ${applicant.program}.`);
                      } else if (opt.value === "REJECTED") {
                        setRemarks("Ineligible: Does not meet mandatory eligibility criteria.");
                      } else if (opt.value === "UNDER_REVIEW") {
                        setRemarks("Scrutiny committee requested original marksheet verification.");
                      }
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? `${opt.activeBorder} ${opt.activeBg} shadow-xs`
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${opt.color}`} />
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300"
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>

                    <div>
                      <p className="font-bold text-xs text-slate-900">{opt.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Official Remarks Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Official Directorate Scrutiny Remarks (Visible on Student Tracking Portal):
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks for the applicant..."
                className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 transition-all bg-white"
              />
            </div>

          </div>

        </div>

        {/* MODAL FOOTER ACTION BUTTONS */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-white/95 backdrop-blur-md">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={Save}
            className="shadow-md shadow-blue-600/20 w-full sm:w-auto"
          >
            Save Status & Scrutiny Remarks
          </Button>
        </div>

      </div>

    </div>
  );
}
