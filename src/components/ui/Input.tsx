"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
  validationType?: "text-only" | "numbers-only" | "alphanumeric" | "default";
  autoCapitalizeWords?: boolean;
}

// Capitalizes the first letter of each word
function toTitleCaseWords(str: string): string {
  return str.replace(/(^|\s)([a-z])/g, (_, space, char) => space + char.toUpperCase());
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      icon: Icon,
      helperText,
      id,
      required,
      validationType = "default",
      autoCapitalizeWords = false,
      onChange,
      maxLength,
      value,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      // 1. Text-Only Validation (Only English letters and single spaces allowed - no numbers or symbols)
      if (validationType === "text-only") {
        val = val.replace(/[^a-zA-Z\s]/g, "");
      }

      // 2. Numbers-Only Validation (Only 0-9 digits allowed)
      if (validationType === "numbers-only") {
        val = val.replace(/[^0-9]/g, "");
      }

      // 3. Auto-Capitalize First Letter of Each Word (e.g. "muhammad ali" -> "Muhammad Ali")
      if (autoCapitalizeWords) {
        val = toTitleCaseWords(val);
      }

      // 4. Enforce Max Length if provided
      if (maxLength && val.length > maxLength) {
        val = val.slice(0, maxLength);
      }

      e.target.value = val;

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
              {label} {required && <span className="text-rose-500 font-bold">*</span>}
            </label>
            {maxLength && typeof value === "string" && (
              <span className="text-[10px] text-slate-400 font-mono">
                {value.length}/{maxLength}
              </span>
            )}
          </div>
        )}

        <div className="relative rounded-xl shadow-2xs">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon className="w-4 h-4" />
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            required={required}
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
            className={cn(
              "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 outline-none",
              "focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15",
              Icon && "pl-10",
              error
                ? "border-rose-500 bg-rose-50/20 text-rose-900 focus:border-rose-600 focus:ring-rose-500/20"
                : "border-slate-300 hover:border-slate-400",
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 animate-fadeIn">
            <span>•</span> {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
