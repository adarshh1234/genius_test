'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Card, Badge, Input } from '@/components/ui';
import { mockComprehensiveResults } from '@/lib/mock/data';
import { Search, Compass, Sparkles, ArrowRight, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

export default function CareerDiscoveryPublicPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Advanced Computing & AI', 'Finance & Mathematical Modeling', 'Bioengineering & Healthcare', 'Sustainability & Green Tech'];

  const careers = mockComprehensiveResults.careerMatches.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="purple">Vocation & Future of Work</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Career Discovery Engine
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Exploring 300+ emerging global careers mapped to your cognitive strengths, personality traits, and deep occupational interests.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search careers by title, skill, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
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

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careers.map((career) => (
            <Card key={career.id} className="p-6 bg-white border border-slate-200 hover:border-indigo-400 transition-all shadow-xs">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">{career.category}</span>
                <Badge variant="success">{career.matchPercentage}% Suggested Fit</Badge>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mb-2">{career.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{career.description}</p>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Required Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {career.requiredSkills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500">
                  <div>
                    <span className="block font-semibold text-slate-700">Salary Range (India):</span>
                    <span>{career.averageSalaryIndia}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-700">Salary Range (Global):</span>
                    <span>{career.averageSalaryGlobal}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {career.growthOutlook}
                  </span>
                  <Link href={`/dashboard/student/careers`} className="font-bold text-indigo-600 hover:underline">
                    View Pathway Details →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link href="/onboarding">
            <Button variant="gradient" size="lg" className="font-bold">
              <span>Find Your Personalized Matches</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
