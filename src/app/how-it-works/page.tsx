'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import { Brain, Layers, CheckCircle2, ArrowRight, Compass, ShieldAlert, Cpu } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="blue">Methodology</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            How Genius Test Works
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, multi-layered framework combining standardized psychometrics with empirical triangulation to illuminate each participant’s true potential.
          </p>
        </div>

        {/* 4 Phases Detailed */}
        <div className="space-y-6">
          {[
            {
              num: 'Phase 1',
              title: 'Adaptive Intake & Age Calibration',
              desc: 'Upon registration, participants provide developmental context (age, academic history, interests). The assessment engine automatically adjusts question presentation: ages 3–7 receive playful visual shape matching with character guidance, ages 8–18 encounter stream-oriented logic puzzles, ages 19–55 experience executive work-scenario tests, and ages 56–90 benefit from high-contrast, larger-print cognitive vitality tasks.',
            },
            {
              num: 'Phase 2',
              title: 'Multi-Battery Psychometric Evaluation',
              desc: 'Participants complete 7 core questionnaire modules: Raven Matrix Reasoning (Fluid Intelligence), Multi-Aptitude Battery (Numerical, Verbal, Abstract, Spatial), Big Five Personality (OCEAN), DISC Behavioral Profile, Holland RIASEC Vocational Interests, Emotional Intelligence (EQ), and Stress Resilience.',
            },
            {
              num: 'Phase 3',
              title: 'Synthesis & Scoring Triangulation',
              desc: 'Scores are processed through standardized scoring profiles (such as Profile A and Profile B) that weight innate fluid problem-solving against crystallized skills, emotional stability, and vocational drive. If the participant opts into the voluntary AI-DMIT track, dermatoglyphic ridge patterns provide supplementary observational correlation.',
            },
            {
              num: 'Phase 4',
              title: 'Empirical Career & Developmental Mapping',
              desc: 'Our recommendation engine cross-references the student’s profile against 300+ career trajectories, analyzing skill requirements, educational pathways, and salary benchmarks. The outcome is a comprehensive 19-section report and 12-month development roadmap.',
            },
          ].map((phase, idx) => (
            <Card key={idx} className="p-6 md:p-8 bg-white border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-wider w-fit">
                  {phase.num}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{phase.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Ethical Disclaimer */}
        <Card className="p-6 bg-slate-900 text-slate-200 rounded-2xl">
          <h3 className="text-base font-bold text-white mb-2">Our Commitment to Non-Deterministic Guidance</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Genius Test scores represent current developmental markers and intrinsic affinities, not biological destinies. Human neuroplasticity, diligent effort, and inspirational mentorship can profoundly shape achievement. We use descriptive rather than prescriptive language throughout our reporting.
          </p>
        </Card>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link href="/onboarding">
            <Button variant="gradient" size="lg" className="font-bold">
              <span>Begin Your Assessment</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
