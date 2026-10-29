'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Progress } from '@/components/ui';
import { resultsService } from '@/lib/api';
import { DevelopmentMilestone } from '@/types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  CircleDashed,
} from 'lucide-react';

export default function StudentDevelopmentPlanPage() {
  const [milestones, setMilestones] = useState<DevelopmentMilestone[]>([]);

  useEffect(() => {
    resultsService.getDevelopmentPlan().then(setMilestones);
  }, []);

  const toggleStatus = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus =
            m.status === 'completed'
              ? 'planned'
              : m.status === 'in_progress'
              ? 'completed'
              : 'in_progress';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const progressPct = Math.round((completedCount / (milestones.length || 1)) * 100);

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Actionable Roadmap</Badge>
              <span className="text-xs text-slate-500">• 12-Month Trajectory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Personalized Development Roadmap
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Quarterly skill goals and academic milestones designed to build your competitive portfolio.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/reports/view/usr-student-1">
              <Button variant="outline" size="sm" className="font-semibold text-xs">
                <span>View in Report</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Roadmap Progress Strip */}
        <Card className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="text-xs font-bold text-slate-900">Roadmap Milestone Progress</span>
              <p className="text-[11px] text-slate-500">
                Click any milestone badge below to toggle your execution status.
              </p>
            </div>
            <Badge variant="purple">{completedCount} of {milestones.length} Milestones Achieved</Badge>
          </div>
          <Progress value={progressPct} indicatorColor="bg-gradient-to-r from-indigo-600 to-purple-600" />
        </Card>

        {/* Timeline View */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 md:before:left-6">
          {milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in_progress';

            return (
              <div key={milestone.id} className="relative flex items-start gap-4 sm:gap-6">
                {/* Timeline Node */}
                <button
                  type="button"
                  onClick={() => toggleStatus(milestone.id)}
                  className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all z-10 ${
                    isCompleted
                      ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : isInProgress
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-100'
                      : 'border-slate-300 bg-white text-slate-400 hover:border-slate-400'
                  }`}
                  title="Click to toggle status"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : isInProgress ? (
                    <Clock className="h-5 w-5 animate-spin" />
                  ) : (
                    <CircleDashed className="h-5 w-5" />
                  )}
                </button>

                {/* Milestone Content Card */}
                <Card className="flex-1 p-6 bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                        {milestone.month}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold text-slate-700">{milestone.skillGoal}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleStatus(milestone.id)}
                      className="cursor-pointer text-left"
                    >
                      {isCompleted ? (
                        <Badge variant="success">Completed</Badge>
                      ) : isInProgress ? (
                        <Badge variant="warning">In Progress</Badge>
                      ) : (
                        <Badge variant="default">Planned</Badge>
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Suggested Action:</strong>
                      <p className="text-slate-600 leading-relaxed">{milestone.suggestedAction}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <strong className="text-slate-900 block mb-0.5">Key Learning Checkpoint:</strong>
                      <p className="text-indigo-900 font-medium">{milestone.learningMilestone}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-slate-500">
                      <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Recommended Course: <strong className="text-slate-800">{milestone.recommendedCourse}</strong></span>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
