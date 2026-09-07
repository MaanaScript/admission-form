"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormProvider, useAdmissionForm } from "@/context/FormContext";
import { FormStepper } from "@/components/form/FormStepper";
import { Step1Personal } from "@/components/form/Step1Personal";
import { Step2Contact } from "@/components/form/Step2Contact";
import { Step3Guardian } from "@/components/form/Step3Guardian";
import { Step4Academic } from "@/components/form/Step4Academic";
import { Step5Program } from "@/components/form/Step5Program";
import { Step6Documents } from "@/components/form/Step6Documents";
import { Step7Review } from "@/components/form/Step7Review";
import { AdmissionSlip } from "@/components/slip/AdmissionSlip";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  RotateCcw,
  Sparkles,
  Info,
  Clock,
  CheckCircle2,
  Printer,
  Search,
  Download,
  GraduationCap,
} from "lucide-react";
import { FORM_STEPS } from "@/types/form";

import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
  validateStep6,
  validateStep7,
} from "@/lib/validation";

function validateCurrentStep(step: number, data: any): { isValid: boolean; errors: Record<string, string> } {
  switch (step) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
      return validateStep3(data);
    case 4:
      return validateStep4(data);
    case 5:
      return validateStep5(data);
    case 6:
      return validateStep6(data);
    case 7:
      return validateStep7(data);
    default:
      return { isValid: true, errors: {} };
  }
}

function ApplyFormContent() {
  const {
    formData,
    currentStep,
    completedSteps,
    setStep,
    nextStep,
    prevStep,
    saveDraftManually,
    resetForm,
    hasDraft,
    loadDraftFromStorage,
    lastSavedAt,
  } = useAdmissionForm();

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedAppNo, setSubmittedAppNo] = useState<string | null>(null);
  const { toast } = useToast();

  const currentStepMeta = FORM_STEPS[currentStep - 1];

  const handleNext = () => {
    // Validate current step before proceeding to next step
    const { isValid, errors } = validateCurrentStep(currentStep, formData);

    if (!isValid) {
      setStepErrors(errors);
      const firstErrorKey = Object.keys(errors)[0];
      toast({
        title: "Required Field Missing",
        message: errors[firstErrorKey] || "Please fill in the highlighted field to continue.",
        type: "error",
      });

      // Pinpoint and scroll smoothly to the EXACT missing input field
      setTimeout(() => {
        const el =
          document.getElementById(firstErrorKey) ||
          document.querySelector(`[name="${firstErrorKey}"]`) ||
          document.querySelector(`[data-field="${firstErrorKey}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          if ("focus" in el && typeof (el as any).focus === "function") {
            (el as any).focus();
          }
        }
      }, 80);
      return;
    }

    setStepErrors({});
    nextStep();
  };

  const handleStepClick = (targetStep: number) => {
    // Allow going back to previous steps anytime
    if (targetStep <= currentStep) {
      setStepErrors({});
      setStep(targetStep);
      return;
    }

    // When jumping forward, ensure current step is complete and valid
    const { isValid, errors } = validateCurrentStep(currentStep, formData);
    if (!isValid) {
      setStepErrors(errors);
      const firstErrorKey = Object.keys(errors)[0];
      toast({
        title: "Complete Current Step",
        message: errors[firstErrorKey] || `Please fill out Step ${currentStep} first.`,
        type: "error",
      });

      setTimeout(() => {
        const el =
          document.getElementById(firstErrorKey) ||
          document.querySelector(`[name="${firstErrorKey}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          if ("focus" in el && typeof (el as any).focus === "function") {
            (el as any).focus();
          }
        }
      }, 80);
      return;
    }

    setStepErrors({});
    setStep(targetStep);
  };

  const handlePrev = () => {
    setStepErrors({});
    prevStep();
  };

  // Final Form Submission Action
  const handleFinalSubmit = async () => {
    // Validate Step 7 declaration checkboxes
    const { isValid, errors } = validateStep7(formData);
    if (!isValid) {
      setStepErrors(errors);
      toast({
        title: "Declaration Undertaking Required",
        message: "Please accept the university rules and accuracy declarations before submitting.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate unique App ID: ADM-2026-XXXX
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const appNo = `ADM-2026-${randomDigits}`;

      // Call Backend API Route to process and send Email Notification
      const res = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          appNo,
        }),
      });

      const result = await res.json();

      setSubmittedAppNo(appNo);
      toast({
        title: "Application Submitted Successfully!",
        message: result.mockMode
          ? `Application registered (${appNo}). Email notification configured.`
          : `Your admission form has been registered and official email dispatched (${appNo})!`,
        type: "success",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast({
        title: "Submission Error",
        message: "Failed to submit application. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If application is submitted, show the Official Printable Admission Slip
  if (submittedAppNo) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
        <AdmissionSlip
          applicationNo={submittedAppNo}
          formData={formData}
          onBackToForm={() => {
            setSubmittedAppNo(null);
            setStep(1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Fall 2026 Admissions
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Online Student Admission Application
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Please fill out all 7 steps accurately. Your progress is automatically saved to this device.
          </p>
        </div>

        {/* Action Controls (Save Draft / Reset) */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {lastSavedAt && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Auto-saved: {lastSavedAt}</span>
            </div>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={saveDraftManually}
            leftIcon={Save}
          >
            Save Draft
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetForm}
            leftIcon={RotateCcw}
            className="text-rose-600 hover:bg-rose-50"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Restore Draft Banner (if available and step 1) */}
      {hasDraft && currentStep === 1 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-blue-900 shadow-2xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold">Unfinished application draft detected!</p>
              <p className="text-xs text-blue-700">Would you like to resume your previously saved details?</p>
            </div>
          </div>
          <Button size="sm" variant="primary" onClick={loadDraftFromStorage}>
            Restore Draft
          </Button>
        </div>
      )}

      {/* Stepper Progress Bar */}
      <FormStepper
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      {/* Form Step Workspace */}
      <div className="space-y-6">
        <Card
          title={`Step ${currentStep}: ${currentStepMeta.title}`}
          subtitle={currentStepMeta.description}
          badge={
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              Step {currentStep} of {FORM_STEPS.length}
            </span>
          }
        >
          {/* STEP 1: Personal Details */}
          {currentStep === 1 && <Step1Personal errors={stepErrors} />}

          {/* STEP 2: Contact & Address Details */}
          {currentStep === 2 && <Step2Contact errors={stepErrors} />}

          {/* STEP 3: Guardian / Parent Details */}
          {currentStep === 3 && <Step3Guardian errors={stepErrors} />}

          {/* STEP 4: Academic Records */}
          {currentStep === 4 && <Step4Academic errors={stepErrors} />}

          {/* STEP 5: Degree & Program Selection */}
          {currentStep === 5 && <Step5Program errors={stepErrors} />}

          {/* STEP 6: Documents Upload */}
          {currentStep === 6 && <Step6Documents errors={stepErrors} />}

          {/* STEP 7: Review & Final Submit */}
          {currentStep === 7 && (
            <Step7Review
              onSubmit={handleFinalSubmit}
              isSubmitting={isSubmitting}
              errors={stepErrors}
            />
          )}
        </Card>

        {/* Step Navigation Controls (Hidden on Step 7 since Step 7 has its own big Submit CTA) */}
        {currentStep < 7 && (
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handlePrev}
              disabled={currentStep === 1}
              leftIcon={ArrowLeft}
            >
              Previous Step
            </Button>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                rightIcon={ArrowRight}
              >
                Continue to Step {currentStep + 1}
              </Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default function ApplyPage() {
  return (
    <FormProvider>
      <ApplyFormContent />
    </FormProvider>
  );
}
