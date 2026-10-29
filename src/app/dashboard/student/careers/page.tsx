'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Input, Dialog } from '@/components/ui';
import { resultsService } from '@/lib/api';
import { CareerMatch } from '@/types';
import {
  Search,
  Compass,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function StudentCareerDiscoveryPage() {
  const [careers, setCareers] = useState<CareerMatch[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCareerModal, setActiveCareerModal] = useState<CareerMatch | null>(null);

  useEffect(() => {
    resultsService.getCareerMatches().then(setCareers);
  }, []);

  const categories = [
    'All',
    'Advanced Computing & AI',
    'Finance & Mathematical Modeling',
    'Bioengineering & Healthcare',
    'Sustainability & Green Tech',
  ];

  const filtered = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.requiredSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Vocational Synthesis</Badge>
              <span className="text-xs text-slate-500">• 300+ Career Database</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Personalized Career Recommendations
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Probabilistic matching based on your Holland RIASEC code (I-E-R), fluid reasoning, and multi-aptitude profile.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/student/courses">
              <Button variant="outline" size="sm" className="font-semibold text-xs">
                <span>View Recommended Courses</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search careers by title, skill, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Careers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((career) => (
            <Card
              key={career.id}
              className="p-6 bg-white border border-slate-200 hover:border-indigo-400 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    {career.category}
                  </span>
                  <Badge variant="success">{career.matchPercentage}% Suggested Fit</Badge>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-2">{career.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{career.description}</p>

                {/* Matching Strengths */}
                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      Matching Profile Strengths:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.matchingStrengths.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800 block mb-1">Required Skill Stack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-700 block">Salary (India):</span>
                      <span>{career.averageSalaryIndia}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 block">Growth Outlook:</span>
                      <span className="text-emerald-600 font-semibold">{career.growthOutlook}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Probabilistic guidance match</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveCareerModal(career)}
                  className="text-xs font-semibold"
                >
                  View Complete Pathway →
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Detailed Career Modal */}
        {activeCareerModal && (
          <Dialog
            isOpen={!!activeCareerModal}
            onClose={() => setActiveCareerModal(null)}
            title={activeCareerModal.title}
            description={activeCareerModal.category}
            footer={
              <Button variant="primary" size="sm" onClick={() => setActiveCareerModal(null)}>
                Close Details
              </Button>
            }
          >
            <div className="space-y-4 text-xs text-slate-700">
              <p className="leading-relaxed">{activeCareerModal.description}</p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Recommended Academic Pathway:</span>
                <p className="text-slate-600">{activeCareerModal.educationPathway}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block">Identified Skill Gaps to Bridge:</span>
                <ul className="list-disc pl-4 text-amber-800 space-y-0.5">
                  {activeCareerModal.potentialGaps.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Related Adjacent Careers:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCareerModal.relatedCareers.map((rc, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium">
                      {rc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}
