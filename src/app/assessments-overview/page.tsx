'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import { mockAssessmentModules } from '@/lib/mock/data';
import { Boxes, Cpu, Fingerprint, Compass, Sparkles, HeartHandshake, ShieldAlert, ScanLine, ArrowRight } from 'lucide-react';

export default function AssessmentsOverviewPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Boxes: <Boxes className="h-6 w-6 text-indigo-600" />,
    Cpu: <Cpu className="h-6 w-6 text-purple-600" />,
    Fingerprint: <Fingerprint className="h-6 w-6 text-blue-600" />,
    Compass: <Compass className="h-6 w-6 text-amber-600" />,
    Sparkles: <Sparkles className="h-6 w-6 text-rose-600" />,
    HeartHandshake: <HeartHandshake className="h-6 w-6 text-pink-600" />,
    ShieldAlert: <ShieldAlert className="h-6 w-6 text-teal-600" />,
    ScanLine: <ScanLine className="h-6 w-6 text-emerald-600" />,
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="purple">Assessment Catalog</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Assessment Modules Overview
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Detailed breakdown of our 7 standardized questionnaire batteries and the optional AI-DMIT biometric module.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockAssessmentModules.map((module) => (
            <Card key={module.id} className="p-6 bg-white border border-slate-200 hover:border-indigo-300 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100">{iconMap[module.iconName]}</div>
                {module.isOptional ? <Badge variant="warning">Optional Module</Badge> : <Badge variant="default">Core Battery</Badge>}
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">{module.title}</h2>
              <p className="text-xs font-semibold text-indigo-600 mb-2">{module.shortDesc}</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{module.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span>{module.questionCount} Questions</span>
                <span>~{module.estimatedMinutes} Mins Duration</span>
                <Link href={`/assessments/take/${module.id}`}>
                  <span className="font-semibold text-indigo-600 hover:underline">Preview Questions →</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center pt-6">
          <Link href="/assessments">
            <Button variant="gradient" size="lg" className="font-bold">
              <span>Go to Assessment Dashboard</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
