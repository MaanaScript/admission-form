import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconBgColor?: string;
  iconTextColor?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  trendType = "up",
  icon: Icon,
  iconBgColor = "bg-blue-50",
  iconTextColor = "text-blue-600",
}: StatsCardProps) {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-extrabold font-mono text-slate-900 tracking-tight">{value}</h3>
        </div>

        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs", iconBgColor, iconTextColor)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
          {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px]",
                trendType === "up"
                  ? "text-emerald-700 bg-emerald-50"
                  : trendType === "down"
                  ? "text-rose-700 bg-rose-50"
                  : "text-slate-600 bg-slate-100"
              )}
            >
              {trendType === "up" ? (
                <TrendingUp className="w-3 h-3 text-emerald-600" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-600" />
              )}
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
