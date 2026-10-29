'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Progress } from '@/components/ui';
import { resultsService } from '@/lib/api';
import { ComprehensiveAssessmentResults } from '@/types';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Brain,
  ShieldCheck,
  Compass,
  ArrowRight,
  Boxes,
  Cpu,
  Fingerprint,
  HeartHandshake,
  ShieldAlert,
} from 'lucide-react';
import {
  InnateVsAcquiredChart,
  AptitudeBarChart,
  BigFiveRadar,
  HollandRIASECChart,
  DISCQuadrantVisualizer,
} from '@/components/charts/AssessmentCharts';

export default function StudentResultsPage() {
  const [results, setResults] = useState<ComprehensiveAssessmentResults | null>(null);

  useEffect(() => {
    resultsService.getComprehensiveResults().then(setResults);
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center space-y-3 bg-white border border-slate-200">
          <Sparkles className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
          <h2 className="text-base font-bold text-slate-900">Synthesizing Psychometric Profile...</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Unified Psychometric Profile</Badge>
              <span className="text-xs text-slate-500">• Profile A Holistic Model</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Assessment Results & Psychometric Synthesis
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Candidate: {results.studentName} • Evaluation Date: {results.dateGenerated}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/reports/view/usr-student-1">
              <Button variant="gradient" size="sm" className="font-bold text-xs shadow-sm">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                <span>View Full 19-Section Report</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Executive Summary Card */}
        <Card className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Executive Synthesis</span>
              <h2 className="text-lg font-bold text-slate-900">Cognitive & Behavioral Blueprint</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Data Completeness</span>
                <span className="text-sm font-bold text-indigo-600">{results.completenessPercentage}% Complete</span>
              </div>
              <Badge variant="success">92nd Percentile</Badge>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Aarav demonstrates superior non-verbal fluid intelligence (Raven Score 128, 94th percentile), supported by high quantitative aptitude (94th percentile) and abstract pattern deduction. His personality aligns strongly with Investigative and Enterprising pursuits (Holland RIASEC code: I-E-R), characterized by high intellectual curiosity (Openness: 88%) and meticulous execution discipline (Conscientiousness: 82%). Emotional regulation under academic stress is robust (Low Burnout Risk).
          </p>

          {/* Strengths & Development Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Key Identified Strengths
              </span>
              <ul className="text-xs text-emerald-800 space-y-1 pl-5 list-disc">
                {results.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Key Development Areas
              </span>
              <ul className="text-xs text-amber-800 space-y-1 pl-5 list-disc">
                {results.developmentAreas.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Visual Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InnateVsAcquiredChart data={results.innateVsAcquired} />
          <AptitudeBarChart aptitude={results.aptitude} />
          <BigFiveRadar ocean={results.bigFive} />
          <DISCQuadrantVisualizer disc={results.disc} />
          <HollandRIASECChart riasec={results.riasec} />

          {/* Emotional Intelligence & Stress Summary Card */}
          <Card className="p-6 bg-white border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">Emotional Intelligence & Stress Agility</h3>
                <Badge variant="purple">EQ Score: {results.eq.overallScore}/100</Badge>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Measures self-regulation, situational empathy, and cognitive endurance under high stakes.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Self-Awareness & Regulation</span>
                    <span>{results.eq.selfRegulation}%</span>
                  </div>
                  <Progress value={results.eq.selfRegulation} indicatorColor="bg-indigo-600" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Interpersonal Empathy</span>
                    <span>{results.eq.empathy}%</span>
                  </div>
                  <Progress value={results.eq.empathy} indicatorColor="bg-purple-600" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Decision Under Pressure</span>
                    <span>{results.stressResilience.decisionUnderStress}%</span>
                  </div>
                  <Progress value={results.stressResilience.decisionUnderStress} indicatorColor="bg-emerald-600" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Burnout Vulnerability:</span>
              <Badge variant="success">{results.stressResilience.burnoutRisk} Risk Profile</Badge>
            </div>
          </Card>
        </div>

        {/* Bottom CTA to Career Discovery */}
        <div className="text-center pt-4">
          <Link href="/dashboard/student/careers">
            <Button variant="gradient" size="lg" className="font-bold">
              <span>Explore Suggested Career Matches ({results.careerMatches.length})</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
