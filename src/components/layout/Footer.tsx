'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Genius Test
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering individuals from age 3 to 90 through age-adaptive intelligence, multi-aptitude, personality, and career discovery. Developed by GeniusPie.com.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>ISO & FERPA Compliant Data Principles • No Biometric Resale</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Assessments</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/assessments" className="hover:text-indigo-400 transition-colors">
                  Fluid Intelligence (Raven)
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-indigo-400 transition-colors">
                  Multi-Aptitude Battery
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-indigo-400 transition-colors">
                  Big Five (OCEAN)
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-indigo-400 transition-colors">
                  DISC Behavioral Matrix
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-indigo-400 transition-colors">
                  Holland RIASEC Interests
                </Link>
              </li>
              <li>
                <Link href="/assessments/dmit" className="hover:text-indigo-400 transition-colors">
                  Optional AI-DMIT Capture
                </Link>
              </li>
            </ul>
          </div>

          {/* Stakeholders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard/student" className="hover:text-indigo-400 transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/parents" className="hover:text-indigo-400 transition-colors">
                  Parent Guidance & Consent
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-indigo-400 transition-colors">
                  Schools & Institutions
                </Link>
              </li>
              <li>
                <Link href="/dashboard/counselor" className="hover:text-indigo-400 transition-colors">
                  Counselor Suite
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-indigo-400 transition-colors">
                  Super Admin Console
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-400 transition-colors">
                  Pricing & Cohort Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Transparency</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Genius Test
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-indigo-400 transition-colors">
                  Scientific Methodology
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-indigo-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy & Minor Safety
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-2">
          <p>
            <strong className="text-slate-300">Methodological & Ethical Transparency Notice:</strong> Genius Test by GeniusPie.com provides psychometric, behavioral, and occupational interest triangulation to assist with educational planning and career exploration. It is designed for guidance and self-discovery and does not constitute a deterministic medical, psychiatric, or clinical diagnosis. The optional DMIT (Dermatoglyphics Multiple Intelligence Test) module is an observational screening tool based on developmental dermatoglyphic correlations; participation is voluntary and requires explicit consent. Raw biometric data is never sold, shared, or persisted on public servers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-slate-500">
            <p>© 2026 GeniusPie.com. All rights reserved. Genius Test™.</p>
            <p className="flex items-center gap-1 mt-2 sm:mt-0">
              Built with precision for human potential <Sparkles className="h-3 w-3 text-indigo-400" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
