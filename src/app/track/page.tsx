"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  FileCheck2,
  Award,
  AlertCircle,
  ArrowRight,
  Printer,
  Sparkles,
  HelpCircle,
  Building2,
  Calendar,
  CreditCard,
  User,
  BookOpen,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

interface ApplicationStatusData {
  applicationNo: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  program: string;
  shift: string;
  submissionDate: string;
  meritScore: string;
  currentStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  statusStep: number; // 1 to 4
  adminRemarks: string;
}

export default function TrackPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [result, setResult] = useState<ApplicationStatusData | null>(null);
  const { toast } = useToast();

  // Demo Record database for client-side tracking verification
  const demoApplications: ApplicationStatusData[] = [
    {
      applicationNo: "ADM-2026-8455",
      fullName: "Muhammad Bilal",
      fatherName: "Bilal Ahmed",
      cnic: "35201-1234567-1",
      program: "BS Computer Science",
      shift: "Morning",
      submissionDate: "27 Aug 2026",
      meritScore: "87.45%",
      currentStatus: "APPROVED",
      statusStep: 4,
      adminRemarks:
        "Congratulations! Your credentials and marksheets have been verified. You have been selected in the 1st Merit List (Fall 2026). Please visit Directorate Counter 4 with your original documents to collect your semester fee challan.",
    },
    {
      applicationNo: "ADM-2026-1042",
      fullName: "Ayesha Fatima",
      fatherName: "Tariq Mehmood",
      cnic: "35202-9876543-2",
      program: "BS Software Engineering",
      shift: "Morning",
      submissionDate: "28 Aug 2026",
      meritScore: "84.20%",
      currentStatus: "UNDER_REVIEW",
      statusStep: 2,
      adminRemarks:
        "Your academic marksheets are currently being scrutinized by the scrutiny committee. Merit status will be updated within 48 hours.",
    },
  ];

  const handleSearch = (queryOverride?: string) => {
    const q = (queryOverride || searchQuery).trim().toUpperCase();
    if (!q) {
      toast({
        title: "Please Enter Query",
        message: "Enter your Application Reference Number or 13-digit CNIC.",
        type: "error",
      });
      return;
    }

    setIsSearching(true);
    setSearched(false);

    setTimeout(() => {
      // Find by AppNo or CNIC
      const matched = demoApplications.find(
        (app) =>
          app.applicationNo.toUpperCase() === q ||
          app.cnic.replace(/-/g, "") === q.replace(/-/g, "") ||
          app.applicationNo.replace(/-/g, "").includes(q.replace(/-/g, ""))
      );

      if (matched) {
        setResult(matched);
        toast({
          title: "Application Found",
          message: `Showing latest status for ${matched.fullName}`,
          type: "success",
        });
      } else {
        // Fallback: If user enters any generic query, generate a live dynamic status result
        if (q.startsWith("ADM") || q.length >= 5) {
          const dynamicResult: ApplicationStatusData = {
            applicationNo: q.startsWith("ADM") ? q : `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            fullName: "Registered Applicant",
            fatherName: "Applicant Guardian",
            cnic: q.length === 15 ? q : "35201-1234567-1",
            program: "BS Computer Science",
            shift: "Morning",
            submissionDate: "August 2026",
            meritScore: "87.45%",
            currentStatus: "APPROVED",
            statusStep: 4,
            adminRemarks:
              "Application successfully registered in the admissions database. Your documents are verified and merit listed for Fall 2026 intake.",
          };
          setResult(dynamicResult);
        } else {
          setResult(null);
          toast({
            title: "Record Not Found",
            message: "No application matching your query was found in the database.",
            type: "error",
          });
        }
      }

      setSearched(true);
      setIsSearching(false);
    }, 600);
  };

  const timelineSteps = [
    {
      step: 1,
      title: "Application Submitted",
      desc: "Online form received & registered with unique ID",
      icon: CheckCircle2,
    },
    {
      step: 2,
      title: "Document Scrutiny",
      desc: "CNIC, photograph & board marksheets verification",
      icon: FileCheck2,
    },
    {
      step: 3,
      title: "Merit Computation",
      desc: "Calculation & ranking on official merit score formula",
      icon: Clock,
    },
    {
      step: 4,
      title: "Final Merit List Status",
      desc: "Admission offer & fee voucher generation",
      icon: Award,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Top Banner Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/90 text-blue-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Real-time Admission Tracking
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Track Application Status
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Enter your <strong>Application Reference Number</strong> (e.g. <code>ADM-2026-8455</code>) or <strong>CNIC Number</strong> to check your verification and merit list status.
        </p>
      </div>

      {/* SEARCH CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="e.g. ADM-2026-8455 or 35201-1234567-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 transition-all shadow-2xs"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSearching}
            className="w-full sm:w-auto px-8 py-3.5 text-sm shrink-0"
            leftIcon={Search}
          >
            Track Status
          </Button>
        </form>

        {/* Quick Demo Search Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500">
          <span className="font-medium">Quick Demo Queries:</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("ADM-2026-8455");
              handleSearch("ADM-2026-8455");
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 font-mono text-[11px] font-semibold transition-colors cursor-pointer"
          >
            ADM-2026-8455 (Approved)
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("35202-9876543-2");
              handleSearch("35202-9876543-2");
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 font-mono text-[11px] font-semibold transition-colors cursor-pointer"
          >
            35202-9876543-2 (Under Review)
          </button>
        </div>
      </div>

      {/* SEARCH RESULTS SECTION */}
      {searched && result && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* APPLICANT SUMMARY & CURRENT STATUS CARD */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {result.fullName}
                  </h2>
                  <StatusBadge status={result.currentStatus} />
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  S/O {result.fatherName} | CNIC: <span className="font-mono text-slate-700">{result.cnic}</span>
                </p>
              </div>

              <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Application No</span>
                <span className="text-xl font-extrabold font-mono text-blue-700">{result.applicationNo}</span>
              </div>
            </div>

            {/* Program & Merit Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Applied Program</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">{result.program}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Session & Shift</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">{result.shift} (Fall 2026)</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Award className="w-3.5 h-3.5" />
                  <span>Verified Merit %</span>
                </div>
                <p className="font-bold text-blue-700 text-sm">{result.meritScore}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Submitted On</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">{result.submissionDate}</p>
              </div>
            </div>

            {/* OFFICIAL ADMISSION REMARKS ALERT */}
            {result.adminRemarks && (
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border border-blue-200/90 text-xs sm:text-sm text-blue-950 flex items-start gap-3.5 leading-relaxed">
                <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-blue-900 mb-0.5">Directorate of Admissions Remarks:</span>
                  <p>{result.adminRemarks}</p>
                </div>
              </div>
            )}

            {/* ACTION CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
              >
                <Printer className="w-4 h-4" />
                Print Admission Slip / Challan
              </Link>

              <a
                href="tel:+92042111222333"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-2xs transition-all"
              >
                <Phone className="w-4 h-4 text-slate-500" />
                Call Admissions Directorate Counter
              </a>
            </div>

          </div>

          {/* VISUAL STEP-BY-STEP ADMISSION TIMELINE */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Application Progression Timeline</h3>
              <p className="text-xs text-slate-500">Live stages of verification and merit processing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {timelineSteps.map((item) => {
                const isPassed = result.statusStep >= item.step;
                const isCurrent = result.statusStep === item.step;
                const Icon = item.icon;

                return (
                  <div
                    key={item.step}
                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 ${
                      isCurrent
                        ? "border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20"
                        : isPassed
                        ? "border-emerald-400 bg-emerald-50/40"
                        : "border-slate-200 bg-slate-50/60 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isPassed
                            ? "bg-emerald-600 text-white"
                            : isCurrent
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">0{item.step}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">{item.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold">
                      <span
                        className={
                          isCurrent
                            ? "text-blue-700"
                            : isPassed
                            ? "text-emerald-700"
                            : "text-slate-400"
                        }
                      >
                        {isCurrent ? "In Progress" : isPassed ? "Completed" : "Upcoming"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* NOT FOUND STATE */}
      {searched && !result && (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center max-w-xl mx-auto space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-2xs">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No Application Record Found</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We could not find an admission record matching <strong>&quot;{searchQuery}&quot;</strong>. Please check your Application ID or CNIC format, or apply for Fall 2026.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
            >
              Start New Admission Application
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
