import Link from "next/link";
import {
  FileText,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const steps = [
    {
      step: "01",
      title: "Fill Application",
      desc: "Complete the 7-step online form with your personal, guardian & academic details.",
    },
    {
      step: "02",
      title: "Upload Documents",
      desc: "Upload scanned copies of CNIC, recent photograph, and Matric/Inter marksheets.",
    },
    {
      step: "03",
      title: "Download Voucher",
      desc: "Get your instant printable admission slip and application reference number.",
    },
    {
      step: "04",
      title: "Track Status",
      desc: "Check merit list status and verification updates in real-time on the tracking portal.",
    },
  ];

  const programs = [
    { code: "BSCS", name: "BS Computer Science", duration: "4 Years / 8 Semesters", seats: "120 Seats" },
    { code: "BSSE", name: "BS Software Engineering", duration: "4 Years / 8 Semesters", seats: "100 Seats" },
    { code: "BSAI", name: "BS Artificial Intelligence", duration: "4 Years / 8 Semesters", seats: "60 Seats" },
    { code: "BBA", name: "Bachelor of Business Admin", duration: "4 Years / 8 Semesters", seats: "90 Seats" },
    { code: "BSAF", name: "BS Accounting & Finance", duration: "4 Years / 8 Semesters", seats: "80 Seats" },
    { code: "BSDS", name: "BS Data Science", duration: "4 Years / 8 Semesters", seats: "60 Seats" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/70 via-slate-50 to-slate-50">
        {/* Background decorative blur shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-40">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Admission Open Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Fall 2026 Admissions are Now Open
              <Sparkles className="w-4 h-4 text-blue-600 ml-1" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Begin Your Future at <br />
              <span className="gradient-text">Zynox University</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Step into world-class academia. Apply online in minutes through our secure, multi-step digital admission portal with instant tracking and merit verification.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/apply#fullName"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-lg shadow-blue-600/30 transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                Start Admission Application
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/track"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-all duration-200"
              >
                <Search className="w-5 h-5 text-slate-500" />
                Track Submitted Form
              </Link>
            </div>

            {/* Quick Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-10 max-w-2xl mx-auto text-left">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Last Date to Apply</p>
                  <p className="text-sm font-bold text-slate-900">30 Sept 2026</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Merit Scholarships</p>
                  <p className="text-sm font-bold text-slate-900">Up to 100%</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Accreditation</p>
                  <p className="text-sm font-bold text-slate-900">HEC & NCEAC</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW THE APPLICATION WORKS (4-STEP PROCESS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Simple & Fast</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">How to Complete Your Admission</p>
          <p className="text-sm text-slate-500">
            Our step-by-step wizard guides you effortlessly through each section.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERED PROGRAMS SECTION */}
      <section id="programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Academic Excellence</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Offered BS Programs — Fall 2026</h2>
              <p className="text-sm text-slate-300">
                Choose your field of passion and apply for morning or evening sessions.
              </p>
            </div>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-md shadow-blue-600/30 transition-all shrink-0 w-fit"
            >
              Choose Program & Apply
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((prog, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/60 transition-all duration-200 flex flex-col justify-between gap-3"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2 py-1 rounded-md border border-blue-800/50">
                    {prog.code}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">{prog.name}</h3>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-700/60">
                  <span>{prog.duration}</span>
                  <span className="text-emerald-400 font-medium">{prog.seats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
