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

function safeSaveToStorage(
  data: FormDataType,
  step: number,
  completed: number[],
  savedTime: string
) {
  try {
    const payload = {
      formData: data,
      currentStep: step,
      completedSteps: completed,
      lastSavedAt: savedTime,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // If quota exceeded due to large documents, preserve all text fields safely
    try {
      const lightweightData = {
        ...data,
        photoUrl: data.photoUrl?.length > 300000 ? "" : data.photoUrl,
        cnicDocUrl: data.cnicDocUrl?.length > 300000 ? "" : data.cnicDocUrl,
        guardianCnicDocUrl: data.guardianCnicDocUrl?.length > 300000 ? "" : data.guardianCnicDocUrl,
        matricDocUrl: data.matricDocUrl?.length > 300000 ? "" : data.matricDocUrl,
        interDocUrl: data.interDocUrl?.length > 300000 ? "" : data.interDocUrl,
      };
      const fallbackPayload = {
        formData: lightweightData,
        currentStep: step,
        completedSteps: completed,
        lastSavedAt: savedTime,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallbackPayload));
    } catch {
      // Ignore
    }
  }
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { toast } = useToast();

  // Automatically restore full draft and step position on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          if (parsed.formData) {
            setFormData((prev) => ({ ...prev, ...parsed.formData }));
            if (
              typeof parsed.currentStep === "number" &&
              parsed.currentStep >= 1 &&
              parsed.currentStep <= FORM_STEPS.length
            ) {
              setCurrentStep(parsed.currentStep);
            }
            if (Array.isArray(parsed.completedSteps)) {
              setCompletedSteps(parsed.completedSteps);
            }
            if (parsed.lastSavedAt) {
              setLastSavedAt(parsed.lastSavedAt);
            }
            setHasDraft(true);
          } else {
            // Legacy raw formData payload
            setFormData((prev) => ({ ...prev, ...parsed }));
            setHasDraft(true);
          }
        }
      }
    } catch {
      // Ignore localStorage read errors in SSR/private browsing
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Update specific fields in form state and auto-save
  const updateFormData = useCallback(
    (fields: Partial<FormDataType>) => {
      setFormData((prev) => {
        const updated = { ...prev, ...fields };
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setLastSavedAt(now);
        setHasDraft(true);
        safeSaveToStorage(updated, currentStep, completedSteps, now);
        return updated;
      });
    },
    [currentStep, completedSteps]
  );

  // Manual save trigger with feedback toast
  const saveDraftManually = useCallback(() => {
    try {
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setLastSavedAt(now);
      setHasDraft(true);
      safeSaveToStorage(formData, currentStep, completedSteps, now);
      toast({
        title: "Draft Saved Successfully",
        message: `Your application draft was saved at ${now}. You can resume anytime from Step ${currentStep}.`,
        type: "success",
      });
    } catch {
      toast({
        title: "Could Not Save Draft",
        message: "Browser storage is full or restricted.",
        type: "error",
      });
    }
  }, [formData, currentStep, completedSteps, toast]);

  // Load existing draft explicitly
  const loadDraftFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) {
          setFormData(parsed.formData);
          if (parsed.currentStep) setCurrentStep(parsed.currentStep);
          if (parsed.completedSteps) setCompletedSteps(parsed.completedSteps);
        } else {
          setFormData(parsed);
        }
        toast({
          title: "Draft Restored",
          message: "Your previously entered details and progress have been loaded.",
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

  // Move forward to next step and persist new step
  const nextStep = useCallback(() => {
    if (currentStep < FORM_STEPS.length) {
      const next = currentStep + 1;
      const newCompleted = completedSteps.includes(currentStep)
        ? completedSteps
        : [...completedSteps, currentStep];
      setCompletedSteps(newCompleted);
      setCurrentStep(next);
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      safeSaveToStorage(formData, next, newCompleted, now);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return true;
    }
    return false;
  }, [currentStep, completedSteps, formData]);

  // Move back to previous step and persist
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      safeSaveToStorage(formData, prev, completedSteps, now);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, completedSteps, formData]);

  // Go to specific step and persist
  const setStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= FORM_STEPS.length) {
        setCurrentStep(step);
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        safeSaveToStorage(formData, step, completedSteps, now);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [completedSteps, formData]
  );

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
