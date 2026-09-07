"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, FileText, Search, ShieldAlert, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Apply for Admission", href: "/apply", icon: FileText },
    { name: "Track Application", href: "/track", icon: Search },
    { name: "Admin Portal", href: "/admin", icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Institute Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">CCBAT</span>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-600 truncate max-w-[280px]">
                  • Christian College Business Arts & Technology
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 shrink-0">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  Fall 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Online Admission & Enrollment Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-600/20 transition-all duration-150"
            >
              <FileText className="w-4 h-4" />
              Apply Online
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
