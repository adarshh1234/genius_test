'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, Badge, Progress } from '@/components/ui';
import { resultsService } from '@/lib/api';
import { ComprehensiveAssessmentResults } from '@/types';
import {
  Printer,
  Download,
  ArrowLeft,
  CheckCircle2,
  Brain,
  ShieldCheck,
  Compass,
  Boxes,
  Cpu,
  Fingerprint,
  HeartHandshake,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import {
  InnateVsAcquiredChart,
  AptitudeBarChart,
  BigFiveRadar,
  HollandRIASECChart,
  DISCQuadrantVisualizer,
} from '@/components/charts/AssessmentCharts';

function ComprehensiveReportViewerContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const reportId = params?.id as string;
  const shouldAutoPrint = searchParams?.get('print') === 'true';

  const [results, setResults] = useState<ComprehensiveAssessmentResults | null>(null);

  useEffect(() => {
    resultsService.getComprehensiveResults().then((res) => {
      setResults(res);
      if (shouldAutoPrint && typeof window !== 'undefined') {
        setTimeout(() => {
          window.print();
        }, 800);
      }
    });
  }, [shouldAutoPrint]);

  if (!results) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center space-y-3 bg-white border border-slate-200">
          <Sparkles className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
          <h2 className="text-base font-bold text-slate-900">Rendering Official 19-Section Dossier...</h2>
        </Card>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-6 sm:py-10 text-slate-900">
      {/* Top Floating Action Bar (Hidden during print) */}
      <div className="no-print max-w-5xl mx-auto px-4 mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-16 z-30">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/student/reports">
            <Button variant="ghost" size="sm" className="text-xs">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span>Back to Reports</span>
            </Button>
          </Link>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            Official Psychological & Career Dossier • Version: 2.4
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs font-semibold">
            <Printer className="h-3.5 w-3.5 mr-1.5" />
            <span>Print Report</span>
          </Button>

          <Button variant="gradient" size="sm" onClick={handlePrint} className="text-xs font-bold shadow-xs">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            <span>Save as PDF</span>
          </Button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div className="print-container max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 bg-white border border-slate-200/80 shadow-xl rounded-3xl space-y-12">
        {/* Cover / Title Header */}
        <div className="border-b-2 border-slate-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">Genius Test</span>
              <span className="text-xs font-bold uppercase text-indigo-600">by GeniusPie.com</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Comprehensive Psychological & Career Dossier
            </h1>
            <p className="text-xs text-slate-500">
              Standardized Multi-Dimensional Evaluation (Normative Sample N=45,000+)
            </p>
          </div>

          <div className="text-left md:text-right text-xs space-y-1">
            <Badge variant="purple">Official Report ID: #GT-2026-8941</Badge>
            <p className="font-semibold text-slate-700">Date Issued: {results.dateGenerated}</p>
            <p className="text-slate-500">Scoring Profile: Model A (Balanced Holistic)</p>
          </div>
        </div>

        {/* SECTION 1: STUDENT PROFILE */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 1: Student Demographic Profile
            </h2>
            <Badge variant="default">Verified Record</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Candidate Name</span>
              <span className="font-bold text-slate-900 text-sm">{results.studentName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Age / Cohort Tier</span>
              <span className="font-semibold text-slate-800">16 Years (Academic Focus)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Academic Level</span>
              <span className="font-semibold text-slate-800">Grade 10 (Secondary)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Institution</span>
              <span className="font-semibold text-slate-800">Delhi Public School, R.K. Puram</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: EXECUTIVE SUMMARY */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 2: Executive Summary & Composite Indices
            </h2>
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-700">
            <p>
              Aarav Sharma demonstrates a superior cognitive fluid reasoning capacity (Raven Score 128, 94th percentile national), placing his inductive problem-solving in the top tier of his age cohort. His multi-aptitude battery demonstrates pronounced quantitative logic (94th percentile) and abstract pattern deduction (92nd percentile).
            </p>
            <p>
              In vocational temperament, Aarav displays strong investigative and enterprising traits (Holland RIASEC code: I-E-R), characterized by an appetite for theoretical intellectual challenges (Openness: 88%) paired with structured conscientiousness (82%). Under pressure, he displays low neuroticism and steady emotional regulation.
            </p>
          </div>
        </section>

        {/* SECTION 3: INNATE ABILITIES DASHBOARD */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 3: Innate Abilities Dashboard
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InnateVsAcquiredChart data={results.innateVsAcquired} />
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Innate Cognitive Quotient (88/100):</span>
                <p className="text-slate-600">High neurocognitive fluid capacity for discovering novel rules and structural relationships without prior instruction.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Acquired Crystallized Competency (84/100):</span>
                <p className="text-slate-600">Demonstrated proficiency across learned algebraic mathematics, verbal comprehension, and mechanical logic.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTELLIGENCE PROFILE (RAVEN / FLUID) */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 4: Fluid Intelligence Profile (Raven Matrices)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Raw Scaled Score</span>
              <span className="text-2xl font-black text-slate-900">{results.fluidIntelligence.score}</span>
              <span className="text-[10px] text-slate-500 block">Out of {results.fluidIntelligence.maxScore} Max</span>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
              <span className="text-[10px] text-indigo-600 font-bold uppercase block">National Percentile</span>
              <span className="text-2xl font-black text-indigo-700">{results.fluidIntelligence.percentile}th %ile</span>
              <span className="text-[10px] text-indigo-600 block">Superior Classification</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Qualitative Band</span>
              <span className="text-base font-bold text-slate-900 mt-1 block">{results.fluidIntelligence.classification}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">Inductive Excellence</span>
            </div>
          </div>
        </section>

        {/* SECTION 5: APTITUDE ANALYSIS */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 5: Multi-Aptitude Analysis
            </h2>
          </div>
          <AptitudeBarChart aptitude={results.aptitude} />
        </section>

        {/* SECTION 6: BIG FIVE (OCEAN) */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 6: Personality Analysis (Big Five OCEAN)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <BigFiveRadar ocean={results.bigFive} />
            <div className="space-y-2 text-xs text-slate-700">
              <p><strong>Openness (88%):</strong> Strong affinity for speculative conceptualization and non-traditional theories.</p>
              <p><strong>Conscientiousness (82%):</strong> Rigorous project planning, systematic attention to detail, and deadline fidelity.</p>
              <p><strong>Extraversion (68%):</strong> Collaborative in technical group breakouts; reflective in large crowds.</p>
              <p><strong>Agreeableness (76%):</strong> Cooperative, respectful consensus-seeker in team environments.</p>
              <p><strong>Neuroticism (28%):</strong> Low anxiety vulnerability; emotionally resilient when facing setbacks.</p>
            </div>
          </div>
        </section>

        {/* SECTION 7: DISC PROFILE */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 7: DISC Behavioral Profile
            </h2>
          </div>
          <DISCQuadrantVisualizer disc={results.disc} />
        </section>

        {/* SECTION 8: HOLLAND RIASEC */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 8: Holland RIASEC Career Interest Taxonomy
            </h2>
          </div>
          <HollandRIASECChart riasec={results.riasec} />
        </section>

        {/* SECTION 9 & 10: EQ AND STRESS */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 9 & 10: Emotional Intelligence (EQ) & Stress Resilience
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">Emotional Intelligence: {results.eq.overallScore}/100</h3>
              <p className="text-slate-600">High emotional self-awareness (88%) and empathetic listening (80%) allow constructive navigation of team conflict.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">Stress Stamina: {results.stressResilience.overallScore}/100</h3>
              <p className="text-slate-600">Low burnout risk with high analytical composure during sudden schedule changes or exam pressure.</p>
            </div>
          </div>
        </section>

        {/* SECTION 11 & 12: CAREER FIT & TOP MATCHES */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 11 & 12: Career Fit Synthesis & Top Matches
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.careerMatches.map((career) => (
              <div key={career.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900 text-sm">{career.title}</span>
                  <Badge variant="success">{career.matchPercentage}% Fit</Badge>
                </div>
                <p className="text-slate-600">{career.description}</p>
                <div className="pt-1 text-[11px] text-slate-500">
                  <strong>Pathway:</strong> {career.educationPathway}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 13: COURSE RECOMMENDATIONS */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 13: Recommended Courses & Prerequisites
            </h2>
          </div>
          <div className="space-y-2 text-xs">
            {results.courses.map((c) => (
              <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">{c.title}</span>
                  <span className="text-slate-500">{c.provider} • {c.level} • {c.duration}</span>
                </div>
                <Badge variant="purple">{c.priceINR}</Badge>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 14 & 15: SKILL GAP & 12-MONTH PLAN */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 14 & 15: Skill-Gap Matrix & 12-Month Development Plan
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {results.developmentPlan.map((d) => (
              <div key={d.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase block">{d.month}</span>
                <span className="font-bold text-slate-900 block">{d.skillGoal}</span>
                <p className="text-slate-600 leading-snug">{d.suggestedAction}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 16: COUNSELOR NOTES */}
        <section className="space-y-3">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 16: Counselor Clinical Observations
            </h2>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 leading-relaxed">
            <p><strong>Signed by:</strong> Dr. Meenakshi Sundaram (Lead Certified Guidance Counselor)</p>
            <p className="mt-2 italic">“{results.counselorNotes}”</p>
          </div>
        </section>

        {/* SECTION 17: METHODOLOGY */}
        <section className="space-y-2 text-xs text-slate-600">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 17: Methodology & Psychometric Standardization
            </h2>
          </div>
          <p className="leading-relaxed">{results.methodologyNotes}</p>
        </section>

        {/* SECTION 18: SCORING VERSION */}
        <section className="space-y-2 text-xs text-slate-600">
          <div className="border-b border-slate-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700">
              Section 18: Scoring Algorithm & Profile Version
            </h2>
          </div>
          <p>
            Profile A (Holistic Model v2.4): IQ 25%, Aptitude 20%, Big Five 15%, EQ 15%, Stress 10%, Interests 10%, DMIT 5%. Total Normalized Sum: 100%.
          </p>
        </section>

        {/* SECTION 19: LIMITATIONS & DISCLAIMER */}
        <section className="space-y-2 text-xs text-slate-500 pt-4 border-t-2 border-slate-900">
          <div className="border-b border-slate-200 pb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Section 19: Ethical Limitations & Non-Deterministic Disclaimer
            </h2>
          </div>
          <p className="leading-relaxed">
            This dossier is generated by Genius Test by GeniusPie.com solely for guidance, self-discovery, and educational decision support. It does not constitute a medical, clinical, or psychiatric diagnosis. Cognitive abilities and career success are heavily influenced by neuroplasticity, ongoing education, and perseverance. Biometric DMIT indicators are supplementary observational markers. GeniusPie.com adheres to strict zero-resale minor privacy policies.
          </p>
          <div className="pt-2 text-[10px] text-slate-400 flex justify-between">
            <span>© 2026 GeniusPie.com. Genius Test™ Certified Report.</span>
            <span>Document Checksum: SHA256-8A39B0</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ComprehensiveReportViewer() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <Card className="p-8 text-center space-y-3 bg-white border border-slate-200">
            <Sparkles className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
            <h2 className="text-base font-bold text-slate-900">Rendering Report Dossier...</h2>
          </Card>
        </div>
      }
    >
      <ComprehensiveReportViewerContent />
    </React.Suspense>
  );
}
