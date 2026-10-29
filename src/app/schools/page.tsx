'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import { Building2, Users, FileSpreadsheet, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForSchoolsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="blue">Institutions & Academies</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            For Schools & Educational Institutions
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Deploy scalable, standardized cognitive and aptitude profiling across entire student cohorts with dedicated institutional admin controls.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white border border-slate-200">
            <Users className="h-6 w-6 text-indigo-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">Cohort-Wide Screening</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload batch student lists and administer simultaneous assessments with automated student access credentials.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-slate-200">
            <FileSpreadsheet className="h-6 w-6 text-purple-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">CSV Analytics & Exports</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export comprehensive cohort statistics, percentile distributions, and aptitude benchmarks into Excel/CSV.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-slate-200">
            <Building2 className="h-6 w-6 text-emerald-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">Counselor Allocation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assign students directly to internal school guidance counselors with private advisory notes.
            </p>
          </Card>
        </div>

        {/* Institutional Baseline Tier Banner */}
        <Card className="p-8 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <Badge variant="purple">Institutional Baseline Tier</Badge>
              <h3 className="text-2xl font-bold">₹49 per student / $1.99</h3>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                Cost-effective baseline cognitive screening tailored for schools administering large cohorts of 100+ students.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard/institution">
                <Button variant="secondary" className="bg-white text-slate-950 font-bold text-xs">
                  View Institution Admin Portal
                </Button>
              </Link>
              <Link href="/contact?subject=School%20Licensing">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 text-xs">
                  Request Pilot Trial
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
