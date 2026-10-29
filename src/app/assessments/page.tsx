'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Progress } from '@/components/ui';
import { assessmentService } from '@/lib/api';
import { AssessmentModuleMeta, AssessmentStatus } from '@/types';
import {
  Boxes,
  Cpu,
  Fingerprint,
  Compass,
  Sparkles,
  HeartHandshake,
  ShieldAlert,
  ScanLine,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
} from 'lucide-react';

export default function AssessmentCatalogPage() {
  const [modules, setModules] = useState<AssessmentModuleMeta[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    assessmentService.getModules().then(setModules);
  }, []);

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

  const statusBadge = (status: AssessmentStatus) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'not_started':
        return <Badge variant="default">Not Started</Badge>;
      case 'unavailable':
        return <Badge variant="outline">Unavailable</Badge>;
    }
  };

  const filtered = modules.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || m.status === selectedStatus;
    return matchesCat && matchesStatus;
  });

  const completedCount = modules.filter((m) => m.status === 'completed').length;
  const overallPct = Math.round((completedCount / (modules.length || 1)) * 100);

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Overall Battery Progress Card */}
        <div className="space-y-3">
          <Badge variant="purple">Assessment Battery</Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Assessment Selection Dashboard
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Complete the core psychometric modules to generate your comprehensive multi-dimensional psychological profile and career matches.
          </p>
        </div>

        {/* Progress Summary Card */}
        <Card className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Overall Battery Status
              </span>
              <span className="text-xl font-bold text-slate-900">
                {completedCount} of {modules.length} Modules Completed ({overallPct}%)
              </span>
            </div>
            {overallPct >= 75 && (
              <Link href="/dashboard/student/results">
                <Button variant="gradient" size="sm" className="font-bold">
                  <span>View Synthesized Results</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            )}
          </div>
          <div className="pt-4">
            <Progress value={overallPct} indicatorColor="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500" />
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['all', 'cognitive', 'personality', 'behavioral', 'interests', 'emotional', 'biometric'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="not_started">Not Started</option>
            </select>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((module) => {
            const isDmit = module.id === 'dmit';
            const targetUrl = isDmit ? '/assessments/dmit' : `/assessments/take/${module.id}`;

            return (
              <Card
                key={module.id}
                className="p-6 bg-white border border-slate-200 hover:border-indigo-400 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      {iconMap[module.iconName]}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {module.isOptional && <Badge variant="purple">Optional</Badge>}
                      {statusBadge(module.status)}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{module.title}</h3>
                  <p className="text-xs font-semibold text-indigo-600 mb-2">{module.shortDesc}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                    {module.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      ~{module.estimatedMinutes} mins
                    </span>
                    <span>{module.questionCount} Questions</span>
                  </div>

                  {module.progressPercent > 0 && module.status !== 'completed' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Progress</span>
                        <span>{module.progressPercent}%</span>
                      </div>
                      <Progress value={module.progressPercent} />
                    </div>
                  )}

                  <Link href={targetUrl} className="block">
                    <Button
                      variant={module.status === 'completed' ? 'outline' : 'primary'}
                      size="sm"
                      className="w-full text-xs font-bold"
                    >
                      {module.status === 'completed' ? (
                        <>
                          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                          <span>Review Responses</span>
                        </>
                      ) : module.status === 'in_progress' ? (
                        <>
                          <Play className="h-3.5 w-3.5 mr-1.5 fill-current" />
                          <span>Resume Assessment</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 mr-1.5 fill-current" />
                          <span>Start Assessment</span>
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
