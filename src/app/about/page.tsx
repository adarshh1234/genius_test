'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import { Brain, ShieldCheck, Target, HeartHandshake, Sparkles, ArrowRight, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="purple">Our Mission</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            About Genius Test by GeniusPie
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pioneering age-adaptive, multi-dimensional cognitive, personality, and vocational alignment for every phase of human development.
          </p>
        </div>

        {/* Story & Vision */}
        <Card className="p-8 bg-white border border-slate-200">
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900">Why Genius Test Exists</h2>
            <p>
              Traditional career counseling and IQ tests frequently rely on outdated, one-dimensional rubrics. A single test score taken at age 15 cannot capture the richness of fluid problem-solving, behavioral work style, emotional stability under deadline pressure, and deep intrinsic interests.
            </p>
            <p>
              <strong>Genius Test by GeniusPie.com</strong> was engineered to bridge this gap. Designed to serve participants from age 3 to 90, our platform synthesizes established psychometric instruments—including Raven Progressive Matrices, the Big Five (OCEAN) personality model, DISC behavioral quadrants, and Holland RIASEC career themes—into a unified diagnostic framework.
            </p>
          </div>
        </Card>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white border border-slate-200">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 w-fit mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Scientific Integrity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We separate empirical psychometrics from unverified claims. We never present deterministic predictions or treat personality as an unchangeable fate.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-slate-200">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-600 w-fit mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Actionable Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every score translates directly into real educational courses, career opportunities, and a concrete 12-month developmental roadmap.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-slate-200">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit mb-4">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Child & Minor Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explicit parental consent is enforced for participants under 18. We maintain a strict zero-resale policy for participant data and biometrics.
            </p>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-6">
          <Link href="/onboarding">
            <Button variant="gradient" size="lg" className="font-bold">
              <span>Start Your Genius Test</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
