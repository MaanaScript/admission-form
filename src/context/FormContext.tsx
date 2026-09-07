"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { FormDataType, initialFormData, FORM_STEPS } from "@/types/form";
import { useToast } from "@/components/ui/Toast";

const LOCAL_STORAGE_KEY = "ccbat_admission_draft_v1";

interface FormContextType {
  formData: FormDataType;
  updateFormData: (fields: Partial<FormDataType>) => void;
  currentStep: number;
  completedSteps: number[];
  setStep: (step: number) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  saveDraftManually: () => void;
  resetForm: () => void;
  hasDraft: boolean;
  loadDraftFromStorage: () => void;
  lastSavedAt: string | null;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if a saved draft exists on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setHasDraft(true);
      }
    } catch {
      // Ignore localStorage read errors in SSR/private browsing
    }
  }, []);

  // Update specific fields in form state and auto-save
  const updateFormData = useCallback((fields: Partial<FormDataType>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setLastSavedAt(now);
        setHasDraft(true);
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  }, []);

  // Manual save trigger with feedback toast
  const saveDraftManually = useCallback(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setLastSavedAt(now);
      setHasDraft(true);
      toast({
        title: "Draft Saved Successfully",
        message: `Your application draft was saved at ${now}. You can resume anytime.`,
        type: "success",
      });
    } catch {
      toast({
        title: "Could Not Save Draft",
        message: "Browser storage is full or restricted.",
        type: "error",
      });
    }
  }, [formData, toast]);

  // Load existing draft
  const loadDraftFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        toast({
          title: "Draft Restored",
          message: "Your previously entered details have been loaded.",
          type: "info",
        });
      }
    } catch {
      // Ignore
    }
  }, [toast]);

  // Reset form to blank defaults
  const resetForm = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setFormData(initialFormData);
    setCurrentStep(1);
    setCompletedSteps([]);
    setHasDraft(false);
    setLastSavedAt(null);
    toast({
      title: "Form Cleared",
      message: "All fields have been reset to blank.",
      type: "info",
    });
  }, [toast]);

  // Move forward to next step
  const nextStep = useCallback(() => {
    if (currentStep < FORM_STEPS.length) {
      setCompletedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return true;
    }
    return false;
  }, [currentStep]);

  // Move back to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  // Go to specific step
  const setStep = useCallback((step: number) => {
    if (step >= 1 && step <= FORM_STEPS.length) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useAdmissionForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useAdmissionForm must be used within a FormProvider");
  }
  return context;
}
