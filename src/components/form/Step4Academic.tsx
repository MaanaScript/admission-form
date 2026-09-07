"use client";

import React, { useEffect } from "react";
import { useAdmissionForm } from "@/context/FormContext";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Hash,
  Sparkles,
  Calculator,
  Percent,
} from "lucide-react";

interface Step4AcademicProps {
  errors?: Record<string, string>;
}

export function Step4Academic({ errors = {} }: Step4AcademicProps) {
  const { formData, updateFormData } = useAdmissionForm();
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  // Auto-focus and scroll to first input on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
        firstInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate Matric Percentage and Grade
  const calculateMatricPercent = (obt: string, total: string) => {
    const obtNum = parseFloat(obt);
    const totalNum = parseFloat(total);
    if (!isNaN(obtNum) && !isNaN(totalNum) && totalNum > 0 && obtNum <= totalNum) {
      return ((obtNum / totalNum) * 100).toFixed(2);
    }
    return "0";
  };

  // Calculate Inter Percentage and Grade
  const calculateInterPercent = (obt: string, total: string) => {
    const obtNum = parseFloat(obt);
    const totalNum = parseFloat(total);
    if (!isNaN(obtNum) && !isNaN(totalNum) && totalNum > 0 && obtNum <= totalNum) {
      return ((obtNum / totalNum) * 100).toFixed(2);
    }
    return "0";
  };

  const getGrade = (percentageStr: string) => {
    const pct = parseFloat(percentageStr);
    if (pct >= 80) return { grade: "A-1 (Outstanding)", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (pct >= 70) return { grade: "A (Excellent)", color: "text-blue-700 bg-blue-50 border-blue-200" };
    if (pct >= 60) return { grade: "B (Very Good)", color: "text-cyan-700 bg-cyan-50 border-cyan-200" };
    if (pct >= 50) return { grade: "C (Good)", color: "text-amber-700 bg-amber-50 border-amber-200" };
    if (pct >= 40) return { grade: "D (Pass)", color: "text-orange-700 bg-orange-50 border-orange-200" };
    if (pct > 0) return { grade: "E", color: "text-rose-700 bg-rose-50 border-rose-200" };
    return { grade: "Pending calculation", color: "text-slate-500 bg-slate-50 border-slate-200" };
  };

  // Auto-update percentages when marks change
  const handleMatricMarksChange = (obt: string, total: string) => {
    const pct = calculateMatricPercent(obt, total);
    updateFormData({
      matricObtMarks: obt,
      matricTotalMarks: total,
      matricPercentage: pct,
    });
  };

  const handleInterMarksChange = (obt: string, total: string) => {
    const pct = calculateInterPercent(obt, total);
    updateFormData({
      interObtMarks: obt,
      interTotalMarks: total,
      interPercentage: pct,
    });
  };

  // Calculate Weighted Merit (30% Matric + 70% Inter)
  const matricPct = parseFloat(formData.matricPercentage || "0");
  const interPct = parseFloat(formData.interPercentage || "0");
  const aggregateMerit = (matricPct > 0 && interPct > 0)
    ? ((matricPct * 0.3) + (interPct * 0.7)).toFixed(2)
    : matricPct > 0
    ? matricPct.toFixed(2)
    : "0.00";

  const boardOptions = [
    { value: "BISE Lahore", label: "BISE Lahore" },
    { value: "BISE Federal Islamabad", label: "BISE Federal (FBISE Islamabad)" },
    { value: "BISE Gujranwala", label: "BISE Gujranwala" },
    { value: "BISE Rawalpindi", label: "BISE Rawalpindi" },
    { value: "BISE Faisalabad", label: "BISE Faisalabad" },
    { value: "BISE Multan", label: "BISE Multan" },
    { value: "BISE Sahiwal", label: "BISE Sahiwal" },
    { value: "BISE Sargodha", label: "BISE Sargodha" },
    { value: "BISE Bahawalpur", label: "BISE Bahawalpur" },
    { value: "BISE DG Khan", label: "BISE D.G. Khan" },
    { value: "BISE Karachi", label: "BIEK / BSEK Karachi" },
    { value: "BISE Peshawar", label: "BISE Peshawar" },
    { value: "BISE Quetta", label: "BISE Quetta" },
    { value: "Cambridge / O-Level / A-Level", label: "Cambridge (O-Level / A-Level Equivalent)" },
    { value: "Other Board", label: "Other Technical Board / Institute" },
  ];

  const interGroupOptions = [
    { value: "Pre-Engineering", label: "F.Sc Pre-Engineering" },
    { value: "Pre-Medical", label: "F.Sc Pre-Medical" },
    { value: "ICS (Physics)", label: "ICS (Physics, Math, Computer)" },
    { value: "ICS (Stats)", label: "ICS (Stats, Math, Computer)" },
    { value: "ICS (Economics)", label: "ICS (Economics, Math, Computer)" },
    { value: "I.Com", label: "I.Com (Commerce)" },
    { value: "DAE (Diploma)", label: "DAE (Diploma of Associate Engineering)" },
    { value: "General Science", label: "F.A / General Science" },
    { value: "A-Level", label: "Cambridge A-Level" },
  ];

  const yearsList = Array.from({ length: 8 }, (_, i) => {
    const yr = (2026 - i).toString();
    return { value: yr, label: yr };
  });

  const matricGradeInfo = getGrade(formData.matricPercentage);
  const interGradeInfo = getGrade(formData.interPercentage);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Aggregate Score Live Bar */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold">Estimated Aggregate Merit</h4>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Formula: 30% SSC + 70% HSSC
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Automatically calculated based on your entered marks below.
            </p>
          </div>
        </div>

        <div className="text-right flex items-baseline gap-2 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/10">
          <span className="text-3xl font-extrabold text-white tracking-tight">{aggregateMerit}%</span>
          <span className="text-xs text-blue-200 font-medium">Merit Score</span>
        </div>
      </div>

      {/* SECTION 1: MATRICULATION / SSC */}
      <div className="p-6 rounded-3xl border border-slate-200/90 bg-slate-50/50 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Matriculation / O-Level / SSC Details</h4>
              <p className="text-[11px] text-slate-500">Secondary School Certificate records</p>
            </div>
          </div>

          {/* Matric Calculated Live Percentage */}
          {parseFloat(formData.matricPercentage || "0") > 0 && (
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${matricGradeInfo.color}`}>
                {formData.matricPercentage}% ({matricGradeInfo.grade})
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Select
            label="Examination Board"
            required
            options={boardOptions}
            value={formData.matricBoard}
            onChange={(e) => updateFormData({ matricBoard: e.target.value })}
            error={errors.matricBoard}
          />

          <Input
            ref={firstInputRef}
            id="matricRollNo"
            label="Matric Roll Number"
            required
            placeholder="e.g. 654321"
            icon={Hash}
            value={formData.matricRollNo}
            onChange={(e) => updateFormData({ matricRollNo: e.target.value })}
            error={errors.matricRollNo}
            validationType="numbers-only"
            maxLength={8}
            helperText="Digits only (Max 8 digits)"
          />

          <Select
            label="Passing Year"
            required
            options={yearsList}
            value={formData.matricYear}
            onChange={(e) => updateFormData({ matricYear: e.target.value })}
            error={errors.matricYear}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          <Input
            label="Total Marks (SSC)"
            required
            placeholder="1100"
            icon={Award}
            value={formData.matricTotalMarks}
            onChange={(e) => handleMatricMarksChange(formData.matricObtMarks, e.target.value)}
            error={errors.matricTotalMarks}
            validationType="numbers-only"
            maxLength={4}
          />

          <Input
            label="Obtained Marks (SSC)"
            required
            placeholder="e.g. 980"
            icon={Sparkles}
            value={formData.matricObtMarks}
            onChange={(e) => handleMatricMarksChange(e.target.value, formData.matricTotalMarks)}
            error={errors.matricObtMarks}
            validationType="numbers-only"
            maxLength={4}
          />

          <Input
            label="Percentage (Auto Calculated)"
            disabled
            value={formData.matricPercentage ? `${formData.matricPercentage}%` : "0%"}
            icon={Percent}
            className="bg-slate-100 font-bold text-blue-700 cursor-not-allowed"
          />
        </div>
      </div>

      {/* SECTION 2: INTERMEDIATE / HSSC / A-LEVEL */}
      <div className="p-6 rounded-3xl border border-slate-200/90 bg-slate-50/50 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Intermediate / HSSC / A-Level / DAE Details</h4>
              <p className="text-[11px] text-slate-500">Higher Secondary School Certificate records</p>
            </div>
          </div>

          {/* Inter Calculated Live Percentage */}
          {parseFloat(formData.interPercentage || "0") > 0 && (
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${interGradeInfo.color}`}>
                {formData.interPercentage}% ({interGradeInfo.grade})
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Select
            label="Examination Board / University"
            required
            options={boardOptions}
            value={formData.interBoard}
            onChange={(e) => updateFormData({ interBoard: e.target.value })}
            error={errors.interBoard}
          />

          <Select
            label="Discipline / Academic Group"
            required
            options={interGroupOptions}
            value={formData.interGroup}
            onChange={(e) => updateFormData({ interGroup: e.target.value })}
            error={errors.interGroup}
          />

          <Input
            label="Inter Roll Number"
            required
            placeholder="e.g. 987654"
            icon={Hash}
            value={formData.interRollNo}
            onChange={(e) => updateFormData({ interRollNo: e.target.value })}
            error={errors.interRollNo}
            validationType="numbers-only"
            maxLength={8}
            helperText="Digits only (Max 8 digits)"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 pt-2">
          <Select
            label="Passing Year"
            required
            options={yearsList}
            value={formData.interYear}
            onChange={(e) => updateFormData({ interYear: e.target.value })}
            error={errors.interYear}
          />

          <Input
            label="Total Marks (HSSC)"
            required
            placeholder="1100"
            icon={Award}
            value={formData.interTotalMarks}
            onChange={(e) => handleInterMarksChange(formData.interObtMarks, e.target.value)}
            error={errors.interTotalMarks}
            validationType="numbers-only"
            maxLength={4}
          />

          <Input
            label="Obtained Marks (HSSC)"
            required
            placeholder="e.g. 950"
            icon={Sparkles}
            value={formData.interObtMarks}
            onChange={(e) => handleInterMarksChange(e.target.value, formData.interTotalMarks)}
            error={errors.interObtMarks}
            validationType="numbers-only"
            maxLength={4}
          />

          <Input
            label="Percentage (Auto Calculated)"
            disabled
            value={formData.interPercentage ? `${formData.interPercentage}%` : "0%"}
            icon={Percent}
            className="bg-slate-100 font-bold text-indigo-700 cursor-not-allowed"
          />
        </div>
      </div>

    </div>
  );
}
