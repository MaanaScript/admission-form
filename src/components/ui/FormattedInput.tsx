"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, CreditCard, Phone } from "lucide-react";

export interface FormattedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  maskType: "cnic" | "phone";
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export const FormattedInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  ({ className, label, error, maskType, helperText, value = "", onChange, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const formatCNIC = (raw: string) => {
      // Keep only digits, max 13 digits
      const digits = raw.replace(/\D/g, "").slice(0, 13);
      if (digits.length <= 5) return digits;
      if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
      return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
    };

    const formatPhone = (raw: string) => {
      // Keep only digits, max 11 digits (03001234567)
      const digits = raw.replace(/\D/g, "").slice(0, 11);
      if (digits.length <= 4) return digits;
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawVal = e.target.value;
      const formatted = maskType === "cnic" ? formatCNIC(rawVal) : formatPhone(rawVal);
      if (onChange) {
        onChange(formatted);
      }
    };

    const Icon: LucideIcon = maskType === "cnic" ? CreditCard : Phone;
    const placeholder = maskType === "cnic" ? "35201-1234567-1" : "0300-1234567";

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
            {label} {required && <span className="text-rose-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative rounded-xl shadow-2xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>

          <input
            id={inputId}
            type="text"
            ref={ref}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={cn(
              "w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 text-sm font-mono text-slate-900 placeholder:text-slate-400 transition-all duration-150 outline-none",
              "focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15",
              error
                ? "border-rose-500 bg-rose-50/20 text-rose-900 focus:border-rose-600 focus:ring-rose-500/20"
                : "border-slate-300 hover:border-slate-400",
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
            <span>•</span> {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

FormattedInput.displayName = "FormattedInput";
