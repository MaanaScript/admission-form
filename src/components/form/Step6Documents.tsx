"use client";

import React, { useRef, useState } from "react";
import { useAdmissionForm } from "@/context/FormContext";
import { useToast } from "@/components/ui/Toast";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  AlertCircle,
  Eye,
  X,
  Download,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step6DocumentsProps {
  errors?: Record<string, string>;
}

interface UploadCardProps {
  title: string;
  description: string;
  required?: boolean;
  docKey: "photoUrl" | "cnicDocUrl" | "guardianCnicDocUrl" | "matricDocUrl" | "interDocUrl";
  accept: string;
  error?: string;
  onView: (title: string, url: string) => void;
}

export function Step6Documents({ errors = {} }: Step6DocumentsProps) {
  const { formData, updateFormData } = useAdmissionForm();
  const { toast } = useToast();
  const [viewingDoc, setViewingDoc] = useState<{ title: string; url: string } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to workspace on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    docKey: "photoUrl" | "cnicDocUrl" | "guardianCnicDocUrl" | "matricDocUrl" | "interDocUrl"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        message: `${file.name} exceeds 3MB limit. Please upload a compressed file.`,
        type: "error",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateFormData({ [docKey]: reader.result });
        toast({
          title: "Document Uploaded",
          message: `${file.name} has been attached successfully.`,
          type: "success",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeDoc = (docKey: "photoUrl" | "cnicDocUrl" | "guardianCnicDocUrl" | "matricDocUrl" | "interDocUrl") => {
    updateFormData({ [docKey]: "" });
    toast({
      title: "Document Removed",
      message: "You can upload a replacement file.",
      type: "info",
    });
  };

  const UploadCard = ({
    title,
    description,
    required = true,
    docKey,
    accept,
    error,
    onView,
  }: UploadCardProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileData = formData[docKey];
    const isUploaded = Boolean(fileData && fileData.length > 0);

    return (
      <div
        className={cn(
          "p-5 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between h-[180px] w-full",
          isUploaded
            ? "border-emerald-500/80 bg-emerald-50/40 shadow-xs"
            : error
            ? "border-rose-400 bg-rose-50/30"
            : "border-slate-200/90 bg-white hover:border-slate-300"
        )}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                isUploaded
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-blue-50 text-blue-600"
              )}
            >
              {isUploaded ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{title}</h4>
                {required && <span className="text-rose-500 font-bold text-xs shrink-0">*</span>}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">{description}</p>
            </div>
          </div>

          {isUploaded && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
              Uploaded
            </span>
          )}
        </div>

        {/* Action Toolbar */}
        <div className="pt-2">
          <input
            type="file"
            ref={fileInputRef}
            accept={accept}
            onChange={(e) => handleFileUpload(e, docKey)}
            className="hidden"
          />

          {isUploaded ? (
            <div className="flex items-center gap-2">
              {/* View Document Button */}
              <button
                type="button"
                onClick={() => onView(title, fileData)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                View Document
              </button>

              {/* Replace Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                title="Replace with new file"
              >
                Replace
              </button>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeDoc(docKey)}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-100/70 border border-rose-200 bg-white transition-colors cursor-pointer"
                title="Delete document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-100/60 text-blue-700 text-xs font-bold transition-all cursor-pointer select-none"
            >
              <UploadCloud className="w-4 h-4" />
              Upload Document (Max 3MB)
            </button>
          )}

          {error && (
            <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1 truncate">
              <AlertCircle className="w-3 h-3 shrink-0" /> {error}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="space-y-8 animate-fadeIn">
      
      {/* Information Banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">Document Upload Guidelines:</span> All uploaded files must be clearly readable. Supported file formats: <strong>JPG, PNG, or PDF</strong> (Maximum size: <strong>3MB per file</strong>). Photographs must have a plain white or light-blue background.
        </div>
      </div>

      {/* 5 Equal Uniform Cards in Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* 1. Student Passport Photo */}
        <UploadCard
          title="Student Photograph"
          description="Recent passport-sized photo with white / blue background (JPG/PNG)"
          docKey="photoUrl"
          accept="image/jpeg,image/png,image/webp"
          error={errors.photoUrl}
          onView={(t, url) => setViewingDoc({ title: t, url })}
        />

        {/* 2. Applicant CNIC / B-Form */}
        <UploadCard
          title="Applicant CNIC / B-Form Copy"
          description="Clear front & back image or PDF copy of student CNIC or B-Form"
          docKey="cnicDocUrl"
          accept="image/jpeg,image/png,application/pdf"
          error={errors.cnicDocUrl}
          onView={(t, url) => setViewingDoc({ title: t, url })}
        />

        {/* 3. Guardian CNIC */}
        <UploadCard
          title="Father / Guardian CNIC Copy"
          description="Front and back copy of Father / Guardian's National ID Card"
          docKey="guardianCnicDocUrl"
          accept="image/jpeg,image/png,application/pdf"
          error={errors.guardianCnicDocUrl}
          onView={(t, url) => setViewingDoc({ title: t, url })}
        />

        {/* 4. Matriculation Marksheet */}
        <UploadCard
          title="Matric (SSC) Marksheet"
          description="Official board result card or degree certificate showing total marks"
          docKey="matricDocUrl"
          accept="image/jpeg,image/png,application/pdf"
          error={errors.matricDocUrl}
          onView={(t, url) => setViewingDoc({ title: t, url })}
        />

        {/* 5. Intermediate Marksheet */}
        <UploadCard
          title="Inter (HSSC) / Hope Certificate"
          description="Official F.Sc / ICS marksheet or Hope Certificate from College"
          docKey="interDocUrl"
          accept="image/jpeg,image/png,application/pdf"
          error={errors.interDocUrl}
          onView={(t, url) => setViewingDoc({ title: t, url })}
        />

      </div>

      {/* LIGHTBOX DOCUMENT VIEWER MODAL */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{viewingDoc.title}</h3>
                  <p className="text-[11px] text-slate-500">Document Preview</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="p-2 rounded-xl bg-slate-200/70 hover:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image/Document Display */}
            <div className="p-6 bg-slate-100 flex items-center justify-center max-h-[65vh] overflow-auto">
              {viewingDoc.url.startsWith("data:image") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={viewingDoc.url}
                  alt={viewingDoc.title}
                  className="max-h-[55vh] max-w-full rounded-2xl shadow-md object-contain border border-slate-200 bg-white"
                />
              ) : (
                <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <FileText className="w-12 h-12 text-blue-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-800">{viewingDoc.title} Attached</p>
                  <a
                    href={viewingDoc.url}
                    download={`${viewingDoc.title}.pdf`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Attached File
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
              <span className="text-xs text-slate-500">Zynox University Document Verification</span>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
