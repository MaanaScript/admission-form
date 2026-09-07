import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Institute Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg text-white">Zynox University</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering future leaders through quality education, modern research facilities, and industry-aligned academic programs.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              HEC Recognized Institution
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Admissions</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/apply" className="hover:text-blue-400 transition-colors">
                  Online Admission Form
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-blue-400 transition-colors">
                  Check Application Status
                </Link>
              </li>
              <li>
                <Link href="/#eligibility" className="hover:text-blue-400 transition-colors">
                  Eligibility Criteria & Fees
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-blue-400 transition-colors">
                  Offered Undergraduate Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Admission Helpdesk */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Contact Helpdesk</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+92 (042) 111-222-333</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>admissions@zynox.edu.pk</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon - Fri: 8:30 AM to 4:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Main Campus</h4>
            <p className="text-xs text-slate-400 flex items-start gap-2.5 leading-relaxed">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Sector B, Education City, Main Boulevard, Lahore, Pakistan.
              </span>
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400">
              <strong>Need Help?</strong> Visit the Admission Directorate Counter 4 for on-spot guidance and fee voucher queries.
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Zynox University Admissions Directorate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Admission</Link>
            <Link href="/admin" className="hover:text-blue-400 font-medium">Faculty / Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
