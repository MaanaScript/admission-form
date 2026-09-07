"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  Award,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { exportMeritListToCSV } from "@/lib/exportUtils";

export interface ApplicantRecord {
  id: string;
  applicationNo: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  phone: string;
  email: string;
  program: string;
  shift: string;
  matricPct: number;
  interPct: number;
  meritScore: number;
  submissionDate: string;
  status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  adminRemarks?: string;
}

interface DataTableProps {
  applicants: ApplicantRecord[];
  onSelectApplicant: (applicant: ApplicantRecord) => void;
}

export function DataTable({ applicants, onSelectApplicant }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [programFilter, setProgramFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"merit_desc" | "merit_asc" | "date_desc">("merit_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { toast } = useToast();

  const handleCopyAppNo = (appNo: string) => {
    navigator.clipboard.writeText(appNo);
    toast({
      title: "Copied to Clipboard",
      message: `${appNo} copied.`,
      type: "info",
    });
  };

  // Filter and Sort Logic
  const filteredApplicants = useMemo(() => {
    return applicants
      .filter((app) => {
        const matchesQuery =
          app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.cnic.includes(searchQuery) ||
          app.applicationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.phone.includes(searchQuery);

        const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
        const matchesProgram = programFilter === "ALL" || app.program.includes(programFilter);

        return matchesQuery && matchesStatus && matchesProgram;
      })
      .sort((a, b) => {
        if (sortBy === "merit_desc") return b.meritScore - a.meritScore;
        if (sortBy === "merit_asc") return a.meritScore - b.meritScore;
        return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      });
  }, [applicants, searchQuery, statusFilter, programFilter, sortBy]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage) || 1;
  const currentApplicants = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredApplicants.slice(start, start + itemsPerPage);
  }, [filteredApplicants, currentPage, itemsPerPage]);

  const handleExportFiltered = () => {
    exportMeritListToCSV(
      filteredApplicants,
      "CCBAT_Filtered_Merit_List_Fall_2026.csv",
      false
    );
    toast({
      title: "Merit List Exported",
      message: `Downloaded CSV containing ${filteredApplicants.length} applicant records.`,
      type: "success",
    });
  };

  const handleExportApproved = () => {
    const approvedCount = applicants.filter((a) => a.status === "APPROVED").length;
    exportMeritListToCSV(
      applicants,
      "CCBAT_Official_1st_Merit_List_Fall_2026.csv",
      true
    );
    toast({
      title: "Official 1st Merit List Exported",
      message: `Downloaded CSV with ${approvedCount} merit-listed students ranked by aggregate %.`,
      type: "success",
    });
  };

  return (
    <div className="space-y-6">
      
      {/* FILTER & SEARCH TOOLBAR */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search Name, CNIC, App #..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 transition-all"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Scrutiny</option>
              <option value="APPROVED">Approved / Merit Listed</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="REJECTED">Ineligible / Rejected</option>
            </select>
          </div>

          {/* Program Filter Dropdown */}
          <div className="relative">
            <select
              value={programFilter}
              onChange={(e) => {
                setProgramFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 cursor-pointer"
            >
              <option value="ALL">All Programs</option>
              <option value="Computer Science">BS Computer Science</option>
              <option value="Software Engineering">BS Software Engineering</option>
              <option value="Artificial Intelligence">BS Artificial Intelligence</option>
              <option value="Data Science">BS Data Science</option>
              <option value="Business Administration">BBA</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 cursor-pointer"
            >
              <option value="merit_desc">Sort: Highest Merit % First</option>
              <option value="merit_asc">Sort: Lowest Merit % First</option>
              <option value="date_desc">Sort: Latest Submissions First</option>
            </select>
          </div>

        </div>

        {/* Filter Results Counter & Export Actions Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span>
              Showing <strong className="text-slate-800">{currentApplicants.length}</strong> of{" "}
              <strong className="text-slate-800">{filteredApplicants.length}</strong> applicants
            </span>

            {(searchQuery || statusFilter !== "ALL" || programFilter !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("ALL");
                  setProgramFilter("ALL");
                  setCurrentPage(1);
                }}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold cursor-pointer underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* CSV Export Buttons (Sub-part 4.4) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportApproved}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 transition-colors cursor-pointer text-xs"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Export 1st Merit List (CSV)
            </button>

            <button
              type="button"
              onClick={handleExportFiltered}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer text-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export Current View
            </button>
          </div>
        </div>
      </div>

      {/* DATA TABLE CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-5">Application ID</th>
                <th className="py-4 px-5">Student & Father Name</th>
                <th className="py-4 px-5">CNIC</th>
                <th className="py-4 px-5">Applied Program</th>
                <th className="py-4 px-5 text-center">Merit %</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {currentApplicants.length > 0 ? (
                currentApplicants.map((app) => {
                  const isTopMerit = app.meritScore >= 85;
                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => onSelectApplicant(app)}
                    >
                      {/* Application No */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-blue-700">
                          <span>{app.applicationNo}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyAppNo(app.applicationNo);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition-opacity p-1"
                            title="Copy ID"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">{app.submissionDate}</span>
                      </td>

                      {/* Name */}
                      <td className="py-4 px-5">
                        <p className="font-bold text-slate-900 text-sm">{app.fullName}</p>
                        <p className="text-[11px] text-slate-500 font-medium">s/o {app.fatherName}</p>
                      </td>

                      {/* CNIC */}
                      <td className="py-4 px-5 font-mono text-slate-600 font-medium">
                        {app.cnic}
                      </td>

                      {/* Program */}
                      <td className="py-4 px-5">
                        <span className="font-semibold text-slate-800 block">{app.program}</span>
                        <span className="text-[10px] text-slate-500">{app.shift} Session</span>
                      </td>

                      {/* Merit Score */}
                      <td className="py-4 px-5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 font-extrabold font-mono px-2.5 py-1 rounded-xl text-xs ${
                            isTopMerit
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : app.meritScore >= 70
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          <Award className="w-3 h-3" />
                          {app.meritScore.toFixed(2)}%
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <StatusBadge status={app.status} />
                      </td>

                      {/* Action */}
                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectApplicant(app);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                    No applicant records match your search query or filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
            <span>
              Page <strong className="text-slate-800">{currentPage}</strong> of{" "}
              <strong className="text-slate-800">{totalPages}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-2 rounded-xl bg-white border border-slate-300 disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-2 rounded-xl bg-white border border-slate-300 disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
