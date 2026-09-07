"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  GraduationCap,
  Laptop,
  Code2,
  BrainCircuit,
  Database,
  Briefcase,
  ShieldCheck,
  Calendar,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { DataTable, ApplicantRecord } from "@/components/admin/DataTable";
import { ApplicantInspectorModal } from "@/components/admin/ApplicantInspectorModal";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function AdminPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantRecord | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const { toast } = useToast();

  // Initial Sample Applicants List
  const [applicantsList, setApplicantsList] = useState<ApplicantRecord[]>([
    {
      id: "app-1",
      applicationNo: "ADM-2026-8455",
      fullName: "Muhammad Bilal",
      fatherName: "Bilal Ahmed",
      cnic: "35201-1234567-1",
      phone: "0300-1234567",
      email: "bilal@gmail.com",
      program: "BS Computer Science",
      shift: "Morning",
      matricPct: 90.0,
      interPct: 86.36,
      meritScore: 87.45,
      submissionDate: "27 Aug 2026",
      status: "APPROVED",
      adminRemarks: "Documents verified. Selected in 1st Merit List (BSCS).",
    },
    {
      id: "app-2",
      applicationNo: "ADM-2026-1042",
      fullName: "Ayesha Fatima",
      fatherName: "Tariq Mehmood",
      cnic: "35202-9876543-2",
      phone: "0321-9876543",
      email: "ayesha.fatima@yahoo.com",
      program: "BS Software Engineering",
      shift: "Morning",
      matricPct: 88.5,
      interPct: 82.4,
      meritScore: 84.23,
      submissionDate: "28 Aug 2026",
      status: "UNDER_REVIEW",
      adminRemarks: "Marksheets awaiting board online verification.",
    },
    {
      id: "app-3",
      applicationNo: "ADM-2026-3390",
      fullName: "Hamza Ali Khan",
      fatherName: "Ali Sher Khan",
      cnic: "35201-5566778-3",
      phone: "0333-5566778",
      email: "hamza.ali@gmail.com",
      program: "BS Artificial Intelligence",
      shift: "Morning",
      matricPct: 94.0,
      interPct: 91.5,
      meritScore: 92.25,
      submissionDate: "29 Aug 2026",
      status: "APPROVED",
      adminRemarks: "Top merit holder. Scholarship recommended.",
    },
    {
      id: "app-4",
      applicationNo: "ADM-2026-2115",
      fullName: "Zainab Raza",
      fatherName: "Raza Hassan",
      cnic: "35202-1122334-4",
      phone: "0302-1122334",
      email: "zainab.raza@outlook.com",
      program: "BS Data Science",
      shift: "Evening",
      matricPct: 82.0,
      interPct: 76.8,
      meritScore: 78.36,
      submissionDate: "30 Aug 2026",
      status: "PENDING",
      adminRemarks: "Application pending scrutiny committee assignment.",
    },
    {
      id: "app-5",
      applicationNo: "ADM-2026-4091",
      fullName: "Usman Ghani",
      fatherName: "Abdul Ghani",
      cnic: "35201-7788990-5",
      phone: "0345-7788990",
      email: "usman.ghani@gmail.com",
      program: "Bachelor of Business Administration",
      shift: "Morning",
      matricPct: 79.0,
      interPct: 72.0,
      meritScore: 74.1,
      submissionDate: "30 Aug 2026",
      status: "PENDING",
      adminRemarks: "Under initial document intake.",
    },
    {
      id: "app-6",
      applicationNo: "ADM-2026-5820",
      fullName: "Farhan Saeed",
      fatherName: "Saeed Anwar",
      cnic: "35202-4455667-6",
      phone: "0311-4455667",
      email: "farhan.saeed@gmail.com",
      program: "BS Computer Science",
      shift: "Evening",
      matricPct: 62.0,
      interPct: 48.5,
      meritScore: 52.55,
      submissionDate: "31 Aug 2026",
      status: "REJECTED",
      adminRemarks: "Ineligible: Intermediate marks below mandatory 50% cutoff.",
    },
    {
      id: "app-7",
      applicationNo: "ADM-2026-7731",
      fullName: "Sana Malik",
      fatherName: "Malik Jahangir",
      cnic: "35201-9988776-7",
      phone: "0305-9988776",
      email: "sana.malik@hotmail.com",
      program: "BS Software Engineering",
      shift: "Morning",
      matricPct: 91.0,
      interPct: 88.0,
      meritScore: 88.9,
      submissionDate: "31 Aug 2026",
      status: "APPROVED",
      adminRemarks: "Eligible for 1st merit list.",
    },
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Metrics Synchronized",
        message: "Application metrics have been updated with latest admissions database records.",
        type: "success",
      });
    }, 600);
  };

  const handleSelectApplicant = (app: ApplicantRecord) => {
    setSelectedApplicant(app);
    setIsInspectorOpen(true);
  };

  const handleUpdateStatus = (
    applicantId: string,
    newStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED",
    remarks: string
  ) => {
    setApplicantsList((prev) =>
      prev.map((app) =>
        app.id === applicantId
          ? {
              ...app,
              status: newStatus,
              adminRemarks: remarks,
            }
          : app
      )
    );

    const targetApp = applicantsList.find((a) => a.id === applicantId);
    toast({
      title: "Scrutiny Status Updated",
      message: `${targetApp?.fullName || "Applicant"} is now marked as "${newStatus}". Remarks saved.`,
      type: "success",
    });
  };

  // Dynamic KPI counts based on applicantsList
  const totalApproved = applicantsList.filter((a) => a.status === "APPROVED").length;
  const totalPending = applicantsList.filter((a) => a.status === "PENDING").length;
  const totalReview = applicantsList.filter((a) => a.status === "UNDER_REVIEW").length;
  const totalRejected = applicantsList.filter((a) => a.status === "REJECTED").length;

  const programBreakdown = [
    {
      code: "BSCS",
      name: "BS Computer Science",
      count: 480,
      totalSeats: 120,
      quotaPercent: 88,
      icon: Laptop,
      color: "bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      code: "BSSE",
      name: "BS Software Engineering",
      count: 365,
      totalSeats: 100,
      quotaPercent: 82,
      icon: Code2,
      color: "bg-indigo-600",
      textColor: "text-indigo-600",
    },
    {
      code: "BSAI",
      name: "BS Artificial Intelligence",
      count: 240,
      totalSeats: 60,
      quotaPercent: 92,
      icon: BrainCircuit,
      color: "bg-purple-600",
      textColor: "text-purple-600",
    },
    {
      code: "BSDS",
      name: "BS Data Science",
      count: 148,
      totalSeats: 60,
      quotaPercent: 65,
      icon: Database,
      color: "bg-emerald-600",
      textColor: "text-emerald-600",
    },
    {
      code: "BBA",
      name: "Bachelor of Business Admin",
      count: 195,
      totalSeats: 90,
      quotaPercent: 74,
      icon: Briefcase,
      color: "bg-amber-600",
      textColor: "text-amber-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* ADMIN PORTAL HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Admissions Directorate Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Fall 2026 Admissions Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time enrollment KPIs, applicant scrutiny records, and merit list processing.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              import("@/lib/exportUtils").then(({ exportMeritListToCSV }) => {
                exportMeritListToCSV(applicantsList, "Zynox_University_Fall_2026_Official_Merit_List.csv", true);
                toast({
                  title: "Official Merit List Exported",
                  message: "Downloaded official 1st Merit List ranked by aggregate score.",
                  type: "success",
                });
              });
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 shadow-2xs transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export Merit List (CSV)
          </button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            isLoading={isRefreshing}
            leftIcon={RefreshCw}
          >
            Refresh Data
          </Button>

          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all"
          >
            <GraduationCap className="w-4 h-4" />
            Open Public Form
          </Link>
        </div>
      </div>

      {/* 5-GRID KPI METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Received"
          value="1,428"
          subtitle="Registered Applicants"
          trend="+18% vs 2025"
          trendType="up"
          icon={Users}
          iconBgColor="bg-blue-50"
          iconTextColor="text-blue-600"
        />

        <StatsCard
          title="Pending Scrutiny"
          value={310 + totalPending}
          subtitle="Awaiting Verification"
          trend="Action Needed"
          trendType="neutral"
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />

        <StatsCard
          title="Approved / Merit"
          value={860 + totalApproved}
          subtitle="Eligible for Challan"
          trend="60.5% Selected"
          trendType="up"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />

        <StatsCard
          title="Under Review"
          value={185 + totalReview}
          subtitle="Documents Resubmission"
          trend="In Scrutiny"
          trendType="neutral"
          icon={AlertTriangle}
          iconBgColor="bg-purple-50"
          iconTextColor="text-purple-600"
        />

        <StatsCard
          title="Ineligible / Rejected"
          value={65 + totalRejected}
          subtitle="Below 50% SSC/HSSC"
          trend="4.6% Cutoff"
          trendType="down"
          icon={XCircle}
          iconBgColor="bg-rose-50"
          iconTextColor="text-rose-600"
        />
      </div>

      {/* APPLICATIONS DATA TABLE SECTION (SUB-PART 4.2 & 4.3) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Registered Student Applications
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any student row or &quot;Inspect&quot; to review profile, documents, and change merit status
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              {applicantsList.length} Active Records
            </span>
          </div>
        </div>

        {/* DataTable Component */}
        <DataTable
          applicants={applicantsList}
          onSelectApplicant={handleSelectApplicant}
        />
      </div>

      {/* PROGRAM-WISE DISTRIBUTION & ADMISSION ACTIVITY OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Program Breakdown Progress Bars */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Program-Wise Application Volume
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Total submissions and estimated quota demand across offered BS programs
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              5 BS Programs
            </span>
          </div>

          <div className="space-y-5">
            {programBreakdown.map((prog) => {
              const Icon = prog.icon;
              return (
                <div key={prog.code} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center ${prog.textColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">{prog.name}</span>
                        <span className="text-slate-400 font-mono ml-1.5">({prog.code})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-700">{prog.count} Applicants</span>
                      <span className="text-slate-400">/ {prog.totalSeats} Seats</span>
                      <span className="font-bold text-emerald-600 font-mono text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md">
                        {prog.quotaPercent}% Filled
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${prog.color} rounded-full transition-all duration-500`}
                      style={{ width: `${prog.quotaPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admission Summary & Key Deadlines Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-bold border border-white/10">
              <Calendar className="w-3.5 h-3.5" />
              Fall 2026 Scrutiny Schedule
            </div>

            <h3 className="text-xl font-extrabold tracking-tight">Admissions Timeline</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official timeline approved by Academic Council for 1st, 2nd, and 3rd merit list generation.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                <span className="text-slate-300">Application Deadline:</span>
                <strong className="text-white">30 Sept 2026</strong>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                <span className="text-slate-300">1st Merit List Display:</span>
                <strong className="text-emerald-400">05 Oct 2026</strong>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                <span className="text-slate-300">Fee Deposit Last Date:</span>
                <strong className="text-amber-300">10 Oct 2026</strong>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                <span className="text-slate-300">Classes Commencement:</span>
                <strong className="text-blue-300">20 Oct 2026</strong>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/track"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all"
            >
              <Search className="w-4 h-4" />
              Check Applicant Tracker
            </Link>
          </div>
        </div>

      </div>

      {/* FULL PROFILE INSPECTOR MODAL (SUB-PART 4.3) */}
      <ApplicantInspectorModal
        applicant={selectedApplicant}
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />

    </div>
  );
}
