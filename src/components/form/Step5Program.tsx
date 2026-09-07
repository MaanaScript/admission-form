"use client";

import React from "react";
import { useAdmissionForm } from "@/context/FormContext";
import { Select } from "@/components/ui/Select";
import { RadioCardGroup } from "@/components/ui/RadioCard";
import {
  BookOpen,
  GraduationCap,
  Sun,
  Moon,
  Laptop,
  Code2,
  BrainCircuit,
  Database,
  Briefcase,
  Coins,
  ShieldAlert,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step5ProgramProps {
  errors?: Record<string, string>;
}

export function Step5Program({ errors = {} }: Step5ProgramProps) {
  const { formData, updateFormData } = useAdmissionForm();
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

  const degreeLevelOptions = [
    { value: "Undergraduate (BS - 4 Years)", label: "Undergraduate Programs (BS / BBA - 4 Years, 8 Semesters)" },
    { value: "Associate Degree (ADP - 2 Years)", label: "Associate Degree Programs (ADP - 2 Years, 4 Semesters)" },
    { value: "Postgraduate (MS / MPhil - 2 Years)", label: "Graduate Programs (MS / M.Phil - 2 Years, 4 Semesters)" },
  ];

  const availablePrograms = [
    {
      code: "BSCS",
      name: "BS Computer Science",
      dept: "Faculty of Computing & IT",
      desc: "Accredited by NCEAC. Core computing, algorithms, AI & software development.",
      icon: Laptop,
      badge: "Highest Demand",
    },
    {
      code: "BSSE",
      name: "BS Software Engineering",
      dept: "Faculty of Computing & IT",
      desc: "Software architecture, agile engineering, cloud systems & mobile app development.",
      icon: Code2,
      badge: "Top Rated",
    },
    {
      code: "BSAI",
      name: "BS Artificial Intelligence",
      dept: "Faculty of Computing & IT",
      desc: "Machine learning, neural networks, deep learning, computer vision & robotics.",
      icon: BrainCircuit,
      badge: "Emerging Tech",
    },
    {
      code: "BSDS",
      name: "BS Data Science",
      dept: "Faculty of Computing & IT",
      desc: "Big data analytics, statistical modeling, data engineering & business intelligence.",
      icon: Database,
      badge: "High Growth",
    },
    {
      code: "BBA",
      name: "Bachelor of Business Administration",
      dept: "Faculty of Management Sciences",
      desc: "Marketing, management, supply chain, entrepreneurship & strategic leadership.",
      icon: Briefcase,
      badge: "Accredited",
    },
    {
      code: "BSAF",
      name: "BS Accounting & Finance",
      dept: "Faculty of Management Sciences",
      desc: "Financial analytics, corporate accounting, investment banking & audit.",
      icon: Coins,
      badge: "ACCA Exemptions",
    },
  ];

  const secondaryProgramOptions = [
    { value: "BS Software Engineering", label: "BS Software Engineering (Faculty of Computing)" },
    { value: "BS Computer Science", label: "BS Computer Science (Faculty of Computing)" },
    { value: "BS Artificial Intelligence", label: "BS Artificial Intelligence (Faculty of Computing)" },
    { value: "BS Data Science", label: "BS Data Science (Faculty of Computing)" },
    { value: "BBA (Hons)", label: "Bachelor of Business Administration (BBA)" },
    { value: "BS Accounting & Finance", label: "BS Accounting & Finance" },
    { value: "BS Information Technology", label: "BS Information Technology (BSIT)" },
  ];

  const shiftOptions = [
    {
      value: "Morning",
      label: "Morning Session",
      description: "08:30 AM to 01:30 PM (Regular Merit)",
      icon: Sun,
    },
    {
      value: "Evening",
      label: "Evening / Self-Support",
      description: "02:00 PM to 07:00 PM (Flexible Timing)",
      icon: Moon,
    },
  ];

  const referralOptions = [
    { value: "University Website / Search", label: "Zynox University Official Website" },
    { value: "Social Media", label: "Social Media (Instagram / Facebook / LinkedIn / YouTube)" },
    { value: "Alumni / Senior Students", label: "Alumni or Current University Students" },
    { value: "Newspaper / Print Ad", label: "National Newspaper / Billboard Ad" },
    { value: "Education Expo / Seminar", label: "Education Expo / College Career Seminar" },
    { value: "Friends & Family", label: "Friends & Family Recommendation" },
  ];

  return (
    <div ref={containerRef} className="space-y-8 animate-fadeIn">
      
      {/* Information Banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Merit Priority Selection:</span> You are selecting your primary degree choice for the <strong>Fall 2026 Admissions</strong>. Merit lists will be compiled according to your 1st preference first.
        </div>
      </div>

      {/* Degree Level Selector */}
      <div className="space-y-2">
        <Select
          label="Degree Level"
          required
          icon={GraduationCap}
          options={degreeLevelOptions}
          value={formData.degreeLevel}
          onChange={(e) => updateFormData({ degreeLevel: e.target.value })}
          error={errors.degreeLevel}
          helperText="Select the academic degree tier you are applying for"
        />
      </div>

      {/* Primary Program of Choice (Interactive Cards) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-700">
            Primary Choice of Program (1st Preference) <span className="text-rose-500 font-bold">*</span>
          </label>
          <span className="text-xs text-blue-600 font-medium">Click on a degree card to select</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availablePrograms.map((prog) => {
            const isSelected = formData.program === prog.name;
            const Icon = prog.icon;

            return (
              <div
                key={prog.code}
                onClick={() => updateFormData({ program: prog.name })}
                className={cn(
                  "relative p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between gap-4",
                  isSelected
                    ? "border-blue-600 bg-blue-50/70 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20"
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                          {prog.code}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          {prog.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{prog.name}</h4>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                  )}
                </div>

                <div>
                  <p className="text-xs text-slate-500 leading-relaxed">{prog.desc}</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-2">{prog.dept}</p>
                </div>
              </div>
            );
          })}
        </div>

        {errors.program && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 pt-1">
            <span>•</span> {errors.program}
          </p>
        )}
      </div>

      {/* Secondary Preference & Shift Selection */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Secondary Alternative Program */}
          <Select
            id="secondaryProgram"
            label="Secondary Choice of Program (2nd Preference)"
            required
            placeholder="Select 2nd Preference Program"
            icon={BookOpen}
            options={secondaryProgramOptions}
            value={formData.secondaryProgram}
            onChange={(e) => updateFormData({ secondaryProgram: e.target.value })}
            error={errors.secondaryProgram}
            helperText="Alternative consideration if primary merit quota is filled"
          />

          {/* Referral Source */}
          <Select
            id="referralSource"
            label="How did you learn about Zynox University?"
            required
            placeholder="Select Source"
            icon={Info}
            options={referralOptions}
            value={formData.referralSource || referralOptions[0].value}
            onChange={(e) => updateFormData({ referralSource: e.target.value })}
            error={errors.referralSource}
            helperText="Helps our admissions office improve student outreach"
          />

        </div>

        {/* Shift Preference (Morning / Evening) */}
        <div>
          <RadioCardGroup
            name="shift"
            label="Academic Shift Preference"
            required
            columns={2}
            options={shiftOptions}
            selectedValue={formData.shift}
            onChange={(val) => updateFormData({ shift: val as "Morning" | "Evening" })}
            error={errors.shift}
          />
        </div>

      </div>

    </div>
  );
}
