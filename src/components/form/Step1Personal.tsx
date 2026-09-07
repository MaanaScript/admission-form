"use client";

import React from "react";
import { useAdmissionForm } from "@/context/FormContext";
import { Input } from "@/components/ui/Input";
import { FormattedInput } from "@/components/ui/FormattedInput";
import { Select } from "@/components/ui/Select";
import { RadioCardGroup } from "@/components/ui/RadioCard";
import {
  User,
  Users,
  Calendar,
  HeartPulse,
  Globe2,
  BookMarked,
  Sparkles,
  Smile,
  ShieldCheck,
} from "lucide-react";

interface Step1PersonalProps {
  errors?: Record<string, string>;
}

export function Step1Personal({ errors = {} }: Step1PersonalProps) {
  const { formData, updateFormData } = useAdmissionForm();
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  // Automatically scroll and focus on Full Name input on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
        nameInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const bloodGroupOptions = [
    { value: "A+", label: "A Positive (A+)" },
    { value: "A-", label: "A Negative (A-)" },
    { value: "B+", label: "B Positive (B+)" },
    { value: "B-", label: "B Negative (B-)" },
    { value: "O+", label: "O Positive (O+)" },
    { value: "O-", label: "O Negative (O-)" },
    { value: "AB+", label: "AB Positive (AB+)" },
    { value: "AB-", label: "AB Negative (AB-)" },
  ];

  const nationalityOptions = [
    { value: "Pakistani", label: "Pakistani (National)" },
    { value: "Overseas Pakistani", label: "Overseas Pakistani (Dual National)" },
    { value: "Foreign National", label: "Foreign National / International" },
  ];

  const religionOptions = [
    { value: "Islam", label: "Islam" },
    { value: "Christianity", label: "Christianity" },
    { value: "Hinduism", label: "Hinduism" },
    { value: "Sikhism", label: "Sikhism" },
    { value: "Other", label: "Other / Minority" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male", description: "Male Applicant", icon: Smile },
    { value: "Female", label: "Female", description: "Female Applicant", icon: Smile },
    { value: "Other", label: "Other", description: "Other Gender", icon: Smile },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Informational Guidance Banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Important Instruction:</span> Please enter your Full Name, Father&apos;s Name, and Date of Birth exactly as mentioned on your <strong>Matriculation (SSC) Certificate</strong> and CNIC / B-Form.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Full Name */}
        <Input
          ref={nameInputRef}
          id="fullName"
          label="Full Name (Student Name)"
          required
          placeholder="e.g. Muhammad Ali"
          icon={User}
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          error={errors.fullName}
          validationType="text-only"
          autoCapitalizeWords={true}
          maxLength={50}
          helperText="Only letters allowed. First letters auto-capitalized (Max 50 chars)."
        />

        {/* Father / Guardian Name */}
        <Input
          label="Father's / Guardian's Full Name"
          required
          placeholder="e.g. Muhammad Tariq"
          icon={Users}
          value={formData.fatherName}
          onChange={(e) => updateFormData({ fatherName: e.target.value })}
          error={errors.fatherName}
          validationType="text-only"
          autoCapitalizeWords={true}
          maxLength={50}
          helperText="Only letters allowed. First letters auto-capitalized (Max 50 chars)."
        />

        {/* CNIC / B-Form Number (Auto-formatted) */}
        <FormattedInput
          label="CNIC / B-Form Number"
          required
          maskType="cnic"
          value={formData.cnic}
          onChange={(val) => updateFormData({ cnic: val })}
          error={errors.cnic}
          helperText="13 digits with auto hyphens (e.g. 35201-1234567-1)"
        />

        {/* Date of Birth */}
        <Input
          label="Date of Birth"
          required
          type="date"
          icon={Calendar}
          value={formData.dob}
          onChange={(e) => updateFormData({ dob: e.target.value })}
          error={errors.dob}
          helperText="Must match your official birth record / CNIC"
        />

      </div>

      {/* Gender Radio Card Selector */}
      <div className="pt-2">
        <RadioCardGroup
          name="gender"
          label="Gender"
          required
          columns={3}
          options={genderOptions}
          selectedValue={formData.gender}
          onChange={(val) => updateFormData({ gender: val as "Male" | "Female" | "Other" })}
          error={errors.gender}
        />
      </div>

      {/* Additional Demographics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
        
        {/* Blood Group */}
        <Select
          id="bloodGroup"
          label="Blood Group"
          required
          placeholder="Choose Blood Group"
          icon={HeartPulse}
          options={bloodGroupOptions}
          value={formData.bloodGroup}
          onChange={(e) => updateFormData({ bloodGroup: e.target.value })}
          error={errors.bloodGroup}
        />

        {/* Nationality */}
        <Select
          id="nationality"
          label="Nationality"
          required
          placeholder="Select Nationality"
          icon={Globe2}
          options={nationalityOptions}
          value={formData.nationality}
          onChange={(e) => updateFormData({ nationality: e.target.value })}
          error={errors.nationality}
        />

        {/* Religion */}
        <Select
          id="religion"
          label="Religion"
          required
          placeholder="Select Religion"
          icon={BookMarked}
          options={religionOptions}
          value={formData.religion}
          onChange={(e) => updateFormData({ religion: e.target.value })}
          error={errors.religion}
        />

      </div>

    </div>
  );
}
