"use client";

import React, { useEffect } from "react";
import { useAdmissionForm } from "@/context/FormContext";
import { Input } from "@/components/ui/Input";
import { FormattedInput } from "@/components/ui/FormattedInput";
import { Select } from "@/components/ui/Select";
import {
  Mail,
  Phone,
  PhoneCall,
  MapPin,
  Building,
  Home,
  CheckSquare,
  Square,
  Compass,
} from "lucide-react";

interface Step2ContactProps {
  errors?: Record<string, string>;
}

export function Step2Contact({ errors = {} }: Step2ContactProps) {
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

  // If "Same as Present" is checked, keep permanentAddress in sync with presentAddress
  const handleSameAsPresentToggle = () => {
    const nextState = !formData.sameAsPresent;
    updateFormData({
      sameAsPresent: nextState,
      permanentAddress: nextState ? formData.presentAddress : formData.permanentAddress,
    });
  };

  const handlePresentAddressChange = (val: string) => {
    updateFormData({
      presentAddress: val,
      ...(formData.sameAsPresent ? { permanentAddress: val } : {}),
    });
  };

  const provinceOptions = [
    { value: "Punjab", label: "Punjab" },
    { value: "Sindh", label: "Sindh" },
    { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa (KPK)" },
    { value: "Balochistan", label: "Balochistan" },
    { value: "Islamabad Capital Territory", label: "Islamabad (ICT)" },
    { value: "Azad Jammu & Kashmir", label: "Azad Jammu & Kashmir (AJK)" },
    { value: "Gilgit-Baltistan", label: "Gilgit-Baltistan (GB)" },
  ];

  const cityOptions = [
    { value: "Lahore", label: "Lahore" },
    { value: "Karachi", label: "Karachi" },
    { value: "Islamabad", label: "Islamabad" },
    { value: "Rawalpindi", label: "Rawalpindi" },
    { value: "Faisalabad", label: "Faisalabad" },
    { value: "Multan", label: "Multan" },
    { value: "Peshawar", label: "Peshawar" },
    { value: "Quetta", label: "Quetta" },
    { value: "Gujranwala", label: "Gujranwala" },
    { value: "Sialkot", label: "Sialkot" },
    { value: "Bahawalpur", label: "Bahawalpur" },
    { value: "Sargodha", label: "Sargodha" },
    { value: "Abbottabad", label: "Abbottabad" },
    { value: "Other", label: "Other City" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Information Banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 leading-relaxed">
        <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Contact Communication Notice:</span> Admission merit lists, interview schedules, and official offer letters will be dispatched to your provided <strong>Email</strong> and <strong>Mobile Number (SMS / WhatsApp)</strong>.
        </div>
      </div>

      {/* Primary Contact Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Email Address */}
          <Input
            ref={firstInputRef}
            id="email"
            label="Email Address"
            required
            type="email"
            placeholder="student@example.com"
            icon={Mail}
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            error={errors.email}
            helperText="All official communication will be sent here"
          />

          {/* Mobile / WhatsApp Number */}
          <FormattedInput
            label="Mobile / WhatsApp Number"
            required
            maskType="phone"
            value={formData.phone}
            onChange={(val) => updateFormData({ phone: val })}
            error={errors.phone}
            helperText="Primary contact for SMS notifications"
          />

          {/* Emergency Contact Number */}
          <FormattedInput
            label="Emergency Contact Phone"
            required
            maskType="phone"
            value={formData.emergencyContact}
            onChange={(val) => updateFormData({ emergencyContact: val })}
            error={errors.emergencyContact}
            helperText="Alternate contact (Parent/Guardian)"
          />

        </div>
      </div>

      {/* Address & Residential Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Residential & Domicile Address</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Current / Present Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Current Residential Address <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <textarea
                rows={3}
                maxLength={150}
                placeholder="House #, Street / Block, Area, Colony..."
                value={formData.presentAddress}
                onChange={(e) => handlePresentAddressChange(e.target.value)}
                className={`w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 outline-none resize-none focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 ${
                  errors.presentAddress ? "border-rose-500 bg-rose-50/20" : "border-slate-300 hover:border-slate-400"
                }`}
              />
            </div>
            {errors.presentAddress && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                <span>•</span> {errors.presentAddress}
              </p>
            )}
          </div>

          {/* Permanent Address */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Permanent Address <span className="text-rose-500 font-bold">*</span>
              </label>

              {/* Same as Present Toggle */}
              <button
                type="button"
                onClick={handleSameAsPresentToggle}
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:text-blue-700 select-none cursor-pointer"
              >
                {formData.sameAsPresent ? (
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                Same as Present
              </button>
            </div>

            <div className="relative">
              <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                <Home className="w-4 h-4" />
              </div>
              <textarea
                rows={3}
                maxLength={150}
                disabled={formData.sameAsPresent}
                placeholder="Permanent home address as per CNIC / Domicile..."
                value={formData.permanentAddress}
                onChange={(e) => updateFormData({ permanentAddress: e.target.value })}
                className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 outline-none resize-none focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 ${
                  formData.sameAsPresent ? "bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed" : "bg-white border-slate-300 hover:border-slate-400"
                } ${errors.permanentAddress ? "border-rose-500 bg-rose-50/20" : ""}`}
              />
            </div>
            {errors.permanentAddress && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                <span>•</span> {errors.permanentAddress}
              </p>
            )}
          </div>

        </div>

        {/* City, Province, Postal Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          
          <Select
            label="City"
            required
            placeholder="Select City"
            icon={Building}
            options={cityOptions}
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            error={errors.city}
          />

          <Select
            label="Province / Region"
            required
            placeholder="Select Province"
            icon={Compass}
            options={provinceOptions}
            value={formData.province}
            onChange={(e) => updateFormData({ province: e.target.value })}
            error={errors.province}
          />

          <Input
            id="postalCode"
            label="Postal Code (ZIP)"
            required
            placeholder="e.g. 54000"
            value={formData.postalCode}
            onChange={(e) => updateFormData({ postalCode: e.target.value })}
            error={errors.postalCode}
            validationType="numbers-only"
            maxLength={5}
            helperText="5-digit postal code (e.g. 54000)"
          />

        </div>
      </div>

    </div>
  );
}
