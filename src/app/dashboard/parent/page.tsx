'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Progress, Dialog } from '@/components/ui';
import {
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  HeartHandshake,
  Lock,
  Compass,
  AlertCircle,
} from 'lucide-react';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  batteryStatus: string;
  completedCount: number;
  totalModules: number;
  topCareer: string;
  matchScore: number;
  generalConsent: boolean;
  dmitConsent: boolean;
}

export default function ParentDashboardPage() {
  const [children, setChildren] = useState<ChildProfile[]>([
    {
      id: 'child-1',
      name: 'Aarav Sharma',
      age: 16,
      grade: 'Grade 10 (Secondary)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      batteryStatus: 'In Progress (7/8)',
      completedCount: 7,
      totalModules: 8,
      topCareer: 'AI Systems Architect',
      matchScore: 96,
      generalConsent: true,
      dmitConsent: true,
    },
    {
      id: 'child-2',
      name: 'Ananya Sharma',
      age: 9,
      grade: 'Grade 4 (Primary)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      batteryStatus: 'Early Discovery Started (2/4)',
      completedCount: 2,
      totalModules: 4,
      topCareer: 'Environmental Science Explorations',
      matchScore: 89,
      generalConsent: true,
      dmitConsent: false,
    },
  ]);

  const [activeChildId, setActiveChildId] = useState<string>('child-1');
  const [showConsentModal, setShowConsentModal] = useState(false);

  const selectedChild = children.find((c) => c.id === activeChildId) || children[0];

  const toggleConsent = (type: 'general' | 'dmit') => {
    setChildren((prev) =>
      prev.map((c) => {
        if (c.id === selectedChild.id) {
          return {
            ...c,
            generalConsent: type === 'general' ? !c.generalConsent : c.generalConsent,
            dmitConsent: type === 'dmit' ? !c.dmitConsent : c.dmitConsent,
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Parent / Guardian Suite</Badge>
              <span className="text-xs text-slate-500">• Multi-Child Oversight</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Parent & Guardian Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Monitor your children’s cognitive milestones, career discovery, and privacy permissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConsentModal(true)}
              className="text-xs font-semibold"
            >
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
              <span>Manage Consent & Privacy</span>
            </Button>
          </div>
        </div>

        {/* Multi-Child Selector Tabs */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {children.map((child) => {
            const isSelected = child.id === activeChildId;
            return (
              <Card
                key={child.id}
                onClick={() => setActiveChildId(child.id)}
                className={`p-4 cursor-pointer transition-all flex items-center gap-3.5 min-w-[260px] ${
                  isSelected
                    ? 'border-2 border-indigo-600 bg-white shadow-md'
                    : 'border border-slate-200 bg-slate-50/60 hover:bg-white'
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                  {child.name.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{child.name}</span>
                    {isSelected && <Badge variant="purple">Active</Badge>}
                  </div>
                  <span className="text-xs text-slate-500 block">
                    {child.age} yrs • {child.grade}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selected Child Progress & Status */}
        <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Child Profile
              </span>
              <h2 className="text-xl font-bold text-slate-900">{selectedChild.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cohort: {selectedChild.grade} • Assessment Status: {selectedChild.batteryStatus}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/reports/view/usr-student-1">
                <Button variant="outline" size="sm" className="text-xs font-semibold">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  <span>View Official Report</span>
                </Button>
              </Link>
              <Link href="/assessments">
                <Button variant="gradient" size="sm" className="text-xs font-bold">
                  <span>Resume Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Metrics for Child */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Battery Progress</span>
              <span className="text-lg font-bold text-slate-900">
                {selectedChild.completedCount} of {selectedChild.totalModules} Completed
              </span>
              <div className="mt-2">
                <Progress
                  value={(selectedChild.completedCount / selectedChild.totalModules) * 100}
                  indicatorColor="bg-indigo-600"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Top Suggested Fit</span>
              <span className="text-base font-bold text-indigo-700 truncate block">{selectedChild.topCareer}</span>
              <span className="text-xs text-emerald-600 font-semibold block mt-1">
                {selectedChild.matchScore}% Algorithmic Alignment
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Consent Compliance</span>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Parent Verified (FERPA Safe)</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                DMIT: {selectedChild.dmitConsent ? 'Authorized' : 'Standard Psychometrics Only'}
              </span>
            </div>
          </div>

          {/* Parenting Guidance Note */}
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-purple-900 space-y-1">
            <strong className="block text-purple-950 font-bold">Nurturing Strategy for {selectedChild.name}</strong>
            <p className="leading-relaxed">
              Based on {selectedChild.name}’s high Conscientiousness (82%) and Investigative drive, encourage self-directed science projects without micro-managing schedules. When giving feedback, focus on praising effort and intellectual risk-taking rather than perfect scores.
            </p>
          </div>
        </Card>

        {/* Consent Modal */}
        {showConsentModal && (
          <Dialog
            isOpen={showConsentModal}
            onClose={() => setShowConsentModal(false)}
            title={`Consent & Privacy Settings for ${selectedChild.name}`}
            description="Manage parental authorization controls and biometric participation."
            footer={
              <Button variant="primary" size="sm" onClick={() => setShowConsentModal(false)}>
                Save Preferences
              </Button>
            }
          >
            <div className="space-y-4 py-2 text-xs text-slate-700">
              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedChild.generalConsent}
                  onChange={() => toggleConsent('general')}
                  className="mt-0.5 rounded text-indigo-600"
                />
                <div>
                  <strong className="text-slate-900 block">General Psychometric Testing Authorization</strong>
                  <span className="text-slate-500">Allows child to participate in cognitive, aptitude, and interest questionnaires.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedChild.dmitConsent}
                  onChange={() => toggleConsent('dmit')}
                  className="mt-0.5 rounded text-purple-600"
                />
                <div>
                  <strong className="text-slate-900 block">Optional AI-DMIT Biometric Scan Authorization</strong>
                  <span className="text-slate-500">Allows observational fingerprint ridge scanning. Can be toggled off at any time.</span>
                </div>
              </label>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}
