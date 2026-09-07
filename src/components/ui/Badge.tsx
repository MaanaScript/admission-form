import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "default", size = "md", children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-800 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  }[variant];

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 font-semibold",
    md: "text-xs px-2.5 py-1 font-semibold",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border shadow-2xs",
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase();
  if (normalized === "APPROVED") {
    return (
      <Badge variant="success">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Approved
      </Badge>
    );
  }
  if (normalized === "REJECTED") {
    return (
      <Badge variant="danger">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        Rejected
      </Badge>
    );
  }
  if (normalized === "UNDER_REVIEW") {
    return (
      <Badge variant="info">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        Under Review
      </Badge>
    );
  }
  return (
    <Badge variant="warning">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
      Pending
    </Badge>
  );
}
