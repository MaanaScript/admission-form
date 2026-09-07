import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2, LucideIcon } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 active:scale-98 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 focus:ring-4 focus:ring-blue-500/20",
      secondary:
        "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10 focus:ring-4 focus:ring-slate-800/20",
      outline:
        "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs hover:border-slate-400 focus:ring-4 focus:ring-slate-200",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-2 focus:ring-slate-200",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 focus:ring-4 focus:ring-rose-500/20",
      success:
        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 focus:ring-4 focus:ring-emerald-500/20",
    }[variant];

    const sizeStyles = {
      sm: "text-xs px-3 py-2 rounded-lg gap-1.5",
      md: "text-sm px-5 py-2.5 rounded-xl gap-2",
      lg: "text-base px-7 py-3.5 rounded-2xl gap-2.5",
    }[size];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
            {children}
            {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
