import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: React.ReactNode;
}

export function Card({ className, title, subtitle, icon: Icon, badge, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm transition-all duration-200",
        className
      )}
      {...props}
    >
      {(title || subtitle || Icon || badge) && (
        <div className="flex items-start justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            {Icon && (
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
