'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Input } from '@/components/ui';
import { resultsService } from '@/lib/api';
import { CourseRecommendation } from '@/types';
import {
  BookOpen,
  Search,
  ExternalLink,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Star,
} from 'lucide-react';

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<CourseRecommendation[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    resultsService.getCourseRecommendations().then(setCourses);
  }, []);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.provider.toLowerCase().includes(search.toLowerCase()) ||
      c.skillCategory.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Skill Gap Bridging</Badge>
              <span className="text-xs text-slate-500">• Curated Online & Academic Courses</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Recommended Courses & Certifications
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Prerequisite learning tracks tailored to close identified development gaps for your top career matches.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/student/development-plan">
              <Button variant="outline" size="sm" className="font-semibold text-xs">
                <span>View 12-Month Plan</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses by title, provider, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <Card
              key={course.id}
              className="p-6 bg-white border border-slate-200 hover:border-indigo-400 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="purple">{course.skillCategory}</Badge>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h2 className="text-base font-bold text-slate-900 mb-1 leading-snug">{course.title}</h2>
                <span className="text-xs font-semibold text-indigo-600 block mb-3">{course.provider}</span>

                <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Level:</span>
                    <span className="font-semibold text-slate-800">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Prerequisites:</span>
                    <span className="font-medium text-slate-700 text-[11px] text-right max-w-[180px] truncate">
                      {course.prerequisites}
                    </span>
                  </div>
                  <div className="pt-2 p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-[11px] text-indigo-900">
                    <strong>Career Relevance:</strong> {course.careerRelevance}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">{course.priceINR}</span>
                  <span className="text-[10px] text-slate-400 block">or {course.priceUSD} USD</span>
                </div>
                {course.url && (
                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="text-xs font-semibold">
                      <span>Visit Course</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
