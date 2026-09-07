"use client";

import React from "react";
import { Check, User, Mail, Users, GraduationCap, BookOpen, UploadCloud, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FORM_STEPS } from "@/types/form";

interface FormStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  completedSteps: number[];
}

export function FormStepper({ currentStep, onStepClick, completedSteps }: FormStepperProps) {
  const stepIcons = [
    User,
    Mail,
    Users,
    GraduationCap,
    BookOpen,
    UploadCloud,
    ShieldCheck,
  ];

  const progressPercent = Math.round(((currentStep - 1) / (FORM_STEPS.length - 1)) * 100);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
      
      {/* Mobile View: Compact Progress Bar */}
      <div className="block lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {currentStep}
            </span>
            <div>
              <p className="text-xs text-slate-500 font-medium">Step {currentStep} of {FORM_STEPS.length}</p>
              <h3 className="text-sm font-bold text-slate-900">{FORM_STEPS[currentStep - 1].title}</h3>
            </div>
          </div>
          <span className="text-xs font-bold font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            {progressPercent}% Completed
          </span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Desktop View: Interactive Full Stepper */}
      <div className="hidden lg:block">
        <div className="relative flex items-center justify-between">
          
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-100 z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep - 1) / (FORM_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stepper Items */}
          {FORM_STEPS.map((step, idx) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            const Icon = stepIcons[idx];

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepClick && onStepClick(step.id)}
                className="relative z-10 flex flex-col items-center group transition-all duration-150 outline-none cursor-pointer"
              >
                {/* Step Circle Badge */}
                <div
                  className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-200 border-2 shadow-2xs group-hover:scale-105",
                    isCompleted && !isCurrent
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-500/20"
                      : isCurrent
                      ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-500/20 shadow-md shadow-blue-500/30 scale-105"
                      : "bg-white border-slate-200 text-slate-400 group-hover:border-blue-400 group-hover:text-blue-600"
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Step Labels */}
                <div className="text-center mt-2.5">
                  <p
                    className={cn(
                      "text-xs font-bold tracking-tight transition-colors",
                      isCurrent ? "text-blue-600" : isCompleted ? "text-slate-800" : "text-slate-400"
                    )}
                  >
                    {step.shortTitle}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium hidden xl:block">
                    Step {step.id}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
