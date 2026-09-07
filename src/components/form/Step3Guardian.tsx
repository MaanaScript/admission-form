"use client";

import React from "react";
import { useAdmissionForm } from "@/context/FormContext";
import { Input } from "@/components/ui/Input";
import { FormattedInput } from "@/components/ui/FormattedInput";
import { Select } from "@/components/ui/Select";
import { RadioCardGroup } from "@/components/ui/RadioCard";
import {
  Users,
  Briefcase,
  Building2,
  Wallet,
  ShieldAlert,
  UserCheck,
  HeartHandshake,
  User,
} from "lucide-react";

interface Step3GuardianProps {
  errors?: Record<string, string>;
}

export function Step3Guardian({ errors = {} }: Step3GuardianProps) {
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

  const relationOptions = [
    { value: "Father", label: "Father", description: "Biological Father", icon: UserCheck },
    { value: "Mother", label: "Mother", description: "Biological Mother", icon: UserCheck },
    { value: "Brother", label: "Brother / Sibling", description: "Elder Sibling", icon: UserCheck },
    { value: "Uncle", label: "Uncle / Relative", description: "Family Relative", icon: UserCheck },
    { value: "Legal Guardian", label: "Legal Guardian", description: "Official Court Guardian", icon: HeartHandshake },
    { value: "Self", label: "Self / Independent", description: "Self-Sponsored Student", icon: UserCheck },
  ];

  const occupationOptions = [
    { value: "Government Employee", label: "Government / Public Sector Employee" },
    { value: "Private Sector Employee", label: "Private Sector / Corporate Employee" },
    { value: "Businessman / Entrepreneur", label: "Business Owner / Entrepreneur" },
    { value: "Doctor / Healthcare Professional", label: "Doctor / Healthcare Professional" },
    { value: "Engineer / IT Specialist", label: "Engineer / IT Specialist" },
    { value: "Teacher / Academician", label: "Teacher / Professor / Academician" },
    { value: "Armed Forces / Police", label: "Armed Forces / Defence / Police" },
    { value: "Agriculturist / Landlord", label: "Agriculturist / Farming" },
    { value: "Retired", label: "Retired" },
    { value: "Other", label: "Other Occupation" },
  ];

  const incomeOptions = [
    { value: "Below PKR 50,000", label: "Below PKR 50,000 / Month" },
    { value: "PKR 50,000 - 100,000", label: "PKR 50,000 - PKR 100,000 / Month" },
    { value: "PKR 100,000 - 200,000", label: "PKR 100,000 - PKR 200,000 / Month" },
    { value: "PKR 200,000 - 500,000", label: "PKR 200,000 - PKR 500,000 / Month" },
    { value: "Above PKR 500,000", label: "Above PKR 500,000 / Month" },
  ];

  const handleRelationChange = (val: string) => {
    if (val === "Father") {
      updateFormData({
        guardianRelation: val,
        guardianName: formData.fatherName || formData.guardianName,
      });
    } else if (val === "Self") {
      updateFormData({
        guardianRelation: val,
        guardianName: formData.fullName || formData.guardianName,
        guardianCnic: formData.cnic || formData.guardianCnic,
        guardianPhone: formData.phone || formData.guardianPhone,
      });
    } else {
      updateFormData({ guardianRelation: val });
    }
  };

  const isFatherMismatch =
    formData.guardianRelation === "Father" &&
    Boolean(formData.fatherName.trim()) &&
    Boolean(formData.guardianName.trim()) &&
    formData.guardianName.trim().toLowerCase() !== formData.fatherName.trim().toLowerCase();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Student Identity Reference (Fetched via Live State from Step 1) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 text-xs text-blue-900 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
            1
          </div>
          <div>
            <p className="font-bold text-slate-900">
              Applicant Profile (From Step 1): <span className="text-blue-700">{formData.fullName || "Student Name"}</span>
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Father Name: <strong>{formData.fatherName || "Not specified yet"}</strong> | CNIC: <strong>{formData.cnic || "N/A"}</strong>
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full shrink-0">
          ✓ Synced from Step 1
        </span>
      </div>

      {/* Information Banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Guardian & Financial Sponsorship:</span> Please specify the legal guardian who will be responsible for your academic affairs and fee sponsorship during your degree program.
        </div>
      </div>

      {/* Relationship Selector */}
      <div>
        <RadioCardGroup
          name="guardianRelation"
          label="Relationship with Applicant"
          required
          columns={3}
          options={relationOptions}
          selectedValue={formData.guardianRelation}
          onChange={handleRelationChange}
          error={errors.guardianRelation}
        />
      </div>

      {/* Guardian Primary Details */}
      <div className="space-y-4 pt-2">
        {isFatherMismatch && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            <span>
              ⚠️ Name mismatch with Step 1 Father Name (<strong>{formData.fatherName}</strong>).
            </span>
            <button
              type="button"
              onClick={() => updateFormData({ guardianName: formData.fatherName })}
              className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded-lg text-[11px] hover:bg-rose-700 cursor-pointer"
            >
              Sync Father Name
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Guardian Full Name */}
          <Input
            ref={firstInputRef}
            id="guardianName"
            label="Guardian's Full Name"
            required
            placeholder="e.g. Muhammad Tariq"
            icon={Users}
            value={formData.guardianName}
            onChange={(e) => updateFormData({ guardianName: e.target.value })}
            error={errors.guardianName}
            validationType="text-only"
            autoCapitalizeWords={true}
            maxLength={50}
            helperText={
              formData.guardianRelation === "Father"
                ? `Auto-synced with Father Name from Step 1 (${formData.fatherName || ""})`
                : "Only letters allowed. First letters auto-capitalized."
            }
          />

          {/* Guardian CNIC */}
          <FormattedInput
            label="Guardian CNIC Number"
            required
            maskType="cnic"
            value={formData.guardianCnic}
            onChange={(val) => updateFormData({ guardianCnic: val })}
            error={errors.guardianCnic}
            helperText="13 digits with auto hyphens"
          />

          {/* Guardian Mobile Number */}
          <FormattedInput
            label="Guardian Mobile / WhatsApp"
            required
            maskType="phone"
            value={formData.guardianPhone}
            onChange={(val) => updateFormData({ guardianPhone: val })}
            error={errors.guardianPhone}
            helperText="Active contact number of guardian"
          />

        </div>
      </div>

      {/* Professional & Financial Background */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Professional & Financial Background
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Occupation */}
          <Select
            label="Guardian's Occupation"
            required
            placeholder="Select Profession / Occupation"
            icon={Briefcase}
            options={occupationOptions}
            value={formData.guardianOccupation}
            onChange={(e) => updateFormData({ guardianOccupation: e.target.value })}
            error={errors.guardianOccupation}
          />

          {/* Monthly Household Income */}
          <Select
            label="Monthly Household Income"
            required
            placeholder="Select Monthly Income Bracket"
            icon={Wallet}
            options={incomeOptions}
            value={formData.guardianIncome}
            onChange={(e) => updateFormData({ guardianIncome: e.target.value })}
            error={errors.guardianIncome}
            helperText="Used for need-based scholarship evaluation"
          />

        </div>

        {/* Workplace / Business Address */}
        <div className="pt-2">
          <Input
            id="guardianAddress"
            label="Guardian's Workplace / Business Address"
            required
            placeholder="e.g. Office #102, Plaza 4, Gulberg Commercial, Lahore"
            icon={Building2}
            value={formData.guardianAddress}
            onChange={(e) => updateFormData({ guardianAddress: e.target.value })}
            error={errors.guardianAddress}
            helperText="Office address or workplace location of guardian"
          />
        </div>

      </div>

    </div>
  );
}
