'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import { Users, ShieldCheck, Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForParentsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="purple">Parental Guidance</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Empowering Parents & Guardians
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Understand your child’s innate learning styles, cognitive strengths, and emotional resilience without imposing mismatched expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Age 3–7: Early Discovery</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Watch your child explore engaging visual puzzles alongside friendly mascot guidance. Parents participate as observers, learning how their child processes colors, shapes, and spatial sequences.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Zero exam anxiety or time pressure</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Celebratory completion stickers and encouraging feedback</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-white border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Age 8–18: Academic Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Help your teenager choose high school streams (PCM, PCB, Commerce, Arts) based on standardized multi-aptitude diagnostics and Holland vocational themes rather than peer pressure.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Objective evidence for stream & college discussions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>12-Month actionable skill roadmap</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Parental Consent & Privacy Card */}
        <Card className="p-8 bg-indigo-900 text-white rounded-3xl">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0" />
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Uncompromising Safety for Minors</h3>
              <p className="text-xs text-indigo-200 leading-relaxed">
                We enforce mandatory parental or guardian consent for all participants under the age of 18. Parents have complete transparency and control over their child’s assessment data, report downloads, and optional DMIT participation. Raw biometric images are never sold or retained on public servers.
              </p>
              <div className="pt-2">
                <Link href="/dashboard/parent">
                  <Button variant="secondary" className="bg-white text-slate-950 font-bold text-xs">
                    Access Parent Portal Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
