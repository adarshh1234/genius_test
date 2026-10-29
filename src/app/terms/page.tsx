'use client';

import React from 'react';
import { Card, Badge } from '@/components/ui';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="purple">Legal Agreement</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Terms and Conditions
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Please read these terms carefully before accessing Genius Test by GeniusPie.com.
          </p>
        </div>

        <Card className="p-8 bg-white border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Genius Test, you agree to comply with and be bound by these Terms and Conditions and our Privacy Policy. If you are under the age of 18, your parent or legal guardian must review and agree to these Terms on your behalf.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">2. Nature of Guidance Services</h2>
            <p>
              Genius Test is an educational exploration, career matching, and psychometric feedback platform. The assessments, recommendations, and report outputs provide probabilistic indicators for personal growth and exploratory discussion. GeniusPie.com makes no warranties regarding guaranteed academic admissions or specific job placements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">3. Intellectual Property</h2>
            <p>
              All psychometric questions, visual matrices, scoring algorithms, software code, visual designs, and reports are proprietary property of GeniusPie.com. Unauthorized scraping, replication, or distribution of assessment items is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">4. Limitation of Liability</h2>
            <p>
              Under no circumstances shall GeniusPie.com or its affiliates be liable for direct, indirect, incidental, or consequential damages resulting from choices, career decisions, or educational investments made based on platform outputs.
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
}
