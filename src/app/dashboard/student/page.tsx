'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Progress, StatCard } from '@/components/ui';
import { authService, resultsService, assessmentService } from '@/lib/api';
import { User, ComprehensiveAssessmentResults, AssessmentModuleMeta } from '@/types';
import {
  Brain,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Boxes,
  Cpu,
  Fingerprint,
} from 'lucide-react';
import {
  InnateVsAcquiredChart,
  AptitudeBarChart,
  BigFiveRadar,
  HollandRIASECChart,
} from '@/components/charts/AssessmentCharts';

export default function StudentDashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [results, setResults] = useState<ComprehensiveAssessmentResults | null>(null);
  const [modules, setModules] = useState<AssessmentModuleMeta[]>([]);

  useEffect(() => {
    authService.getCurrentUser().then(setCurrentUser);
    resultsService.getComprehensiveResults().then(setResults);
    assessmentService.getModules().then(setModules);
  }, []);

  const completedModules = modules.filter((m) => m.status === 'completed').length;
  const totalModules = modules.length || 8;
  const progressPct = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Candidate Portal</Badge>
              <span className="text-xs text-slate-500">• Grade 10 • Academic Focus (16y)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, {currentUser?.name || 'Aarav Sharma'}!
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Delhi Public School, R.K. Puram • Testing Cohort Fall 2026
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/reports/view/usr-student-1">
              <Button variant="outline" size="sm" className="font-semibold text-xs">
                <FileText className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
                <span>Download Report</span>
              </Button>
            </Link>
            <Link href="/assessments">
              <Button variant="gradient" size="sm" className="font-bold text-xs shadow-sm">
                <span>Continue Assessment</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Battery Completion"
            value={`${completedModules} / ${totalModules}`}
            subtitle="7 of 8 modules finished"
            icon={<CheckCircle2 className="h-5 w-5 text-indigo-600" />}
            trend={{ value: `${progressPct}%`, isPositive: true }}
          />
          <StatCard
            title="Fluid Intelligence (Raven)"
            value="Score 128"
            subtitle="94th percentile national"
            icon={<Boxes className="h-5 w-5 text-purple-600" />}
            trend={{ value: 'Superior', isPositive: true }}
          />
          <StatCard
            title="Holland Interest Code"
            value="I - E - R"
            subtitle="Investigative-Enterprising"
            icon={<Compass className="h-5 w-5 text-blue-600" />}
          />
          <StatCard
            title="Top Career Fit"
            value="AI Architect"
            subtitle="96% algorithmic match"
            icon={<Sparkles className="h-5 w-5 text-emerald-600" />}
            trend={{ value: '300+ in database', isPositive: true }}
          />
        </div>

        {/* Assessment Progress Strip */}
        <Card className="p-5 bg-white border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-900">Psychometric Battery Progress</span>
              <p className="text-[11px] text-slate-500">
                Complete the optional DMIT scan or review finished modules.
              </p>
            </div>
            <Link href="/assessments">
              <span className="text-xs font-bold text-indigo-600 hover:underline">
                View All Modules ({completedModules}/{totalModules}) →
              </span>
            </Link>
          </div>
          <Progress value={progressPct} indicatorColor="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500" />
        </Card>

        {/* Visualizations Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Psychological & Aptitude Analytics</h2>
              <p className="text-xs text-slate-500">Live charts generated from typed assessment models</p>
            </div>
            <Link href="/dashboard/student/results">
              <Button variant="ghost" size="sm" className="text-xs font-semibold text-indigo-600">
                Detailed Analysis Breakdown →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InnateVsAcquiredChart data={results?.innateVsAcquired} />
            <AptitudeBarChart aptitude={results?.aptitude} />
            <BigFiveRadar ocean={results?.bigFive} />
            <HollandRIASECChart riasec={results?.riasec} />
          </div>
        </div>

        {/* Top Career Recommendations Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Top Suggested Career Matches</h2>
              <p className="text-xs text-slate-500">Cross-referenced against your cognitive strengths and vocational interests</p>
            </div>
            <Link href="/dashboard/student/careers">
              <Button variant="outline" size="sm" className="text-xs font-semibold">
                Explore All 300+ Careers →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results?.careerMatches.slice(0, 2).map((career) => (
              <Card key={career.id} className="p-6 bg-white border border-slate-200 hover:border-indigo-300 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">{career.category}</span>
                  <Badge variant="success">{career.matchPercentage}% Suggested Fit</Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{career.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{career.description}</p>
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700">Matching Strengths:</span>
                    <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-0.5 mt-1">
                      {career.matchingStrengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{career.averageSalaryIndia}</span>
                    <Link href="/dashboard/student/careers" className="text-indigo-600 font-bold hover:underline">
                      View Pathway & Prerequisites →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Development Plan Strip */}
        <Card className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <Badge variant="purple">12-Month Roadmap</Badge>
            <h3 className="text-xl font-bold">Your Actionable Growth Milestones</h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Step-by-step quarterly targets: Olympiad prep, university dossier building, and leadership skill sharpening.
            </p>
          </div>
          <Link href="/dashboard/student/development-plan">
            <Button variant="secondary" className="bg-white text-slate-950 font-bold text-xs whitespace-nowrap">
              <span>View Development Plan</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
