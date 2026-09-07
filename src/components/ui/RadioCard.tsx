"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, LucideIcon } from "lucide-react";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

export interface RadioCardProps {
  name?: string;
  label?: string;
  options: RadioOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 2 | 3 | 4;
  required?: boolean;
}

export function RadioCardGroup({
  label,
  options,
  selectedValue,
  onChange,
  error,
  columns = 2,
  required,
}: RadioCardProps) {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[columns];

  return (
    <div className="w-full space-y-2">
      {label && (
        <span className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </span>
      )}

      <div className={cn("grid gap-3", colClass)}>
        {options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          const Icon = opt.icon;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "relative flex items-center gap-3 p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-150 select-none w-full",
                isSelected
                  ? "border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-500/20 shadow-xs"
                  : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50/70"
              )}
            >
              {Icon && (
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{opt.label}</p>
                {opt.description && (
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{opt.description}</p>
                )}
              </div>

              {isSelected && (
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
          <span>•</span> {error}
        </p>
      )}
    </div>
  );
}
