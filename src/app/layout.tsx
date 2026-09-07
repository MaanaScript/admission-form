import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Zynox University — Online Student Admission Portal 2026",
  description: "Apply online for Undergraduate and Graduate Degree Programs Fall 2026 at Zynox University. Easy 7-step admission form with real-time status tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        <ToastProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
