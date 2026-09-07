import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, LucideIcon } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: LucideIcon;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder = "Select an option", icon: Icon, helperText, id, required, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700">
            {label} {required && <span className="text-rose-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative rounded-xl shadow-2xs">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon className="w-4 h-4" />
            </div>
          )}

          <select
            id={selectId}
            ref={ref}
            required={required}
            className={cn(
              "w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all duration-150 outline-none cursor-pointer pr-10",
              "focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15",
              Icon && "pl-10",
              error
                ? "border-rose-500 bg-rose-50/20 text-rose-900 focus:border-rose-600 focus:ring-rose-500/20"
                : "border-slate-300 hover:border-slate-400",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-slate-400">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} className="text-slate-900">
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = "Select";
