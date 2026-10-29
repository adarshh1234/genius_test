'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Input, Dialog } from '@/components/ui';
import {
  Compass,
  Search,
  Filter,
  FileText,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

interface AssignedStudent {
  id: string;
  name: string;
  grade: string;
  assessmentStatus: 'Completed' | 'In Progress' | 'Not Started';
  fluidIQScore: number;
  riasecCode: string;
  topCareer: string;
  burnoutRisk: 'Low' | 'Moderate' | 'Elevated';
  counselorNotes: string;
}

export default function CounselorDashboardPage() {
  const [students, setStudents] = useState<AssignedStudent[]>([
    {
      id: 'std-1',
      name: 'Aarav Sharma',
      grade: 'Grade 10',
      assessmentStatus: 'Completed',
      fluidIQScore: 128,
      riasecCode: 'I-E-R',
      topCareer: 'AI Systems Architect',
      burnoutRisk: 'Low',
      counselorNotes: 'Aarav displays remarkable intellectual clarity, high mental stamina, and an organic passion for deep problem-solving. Recommended to focus on elite STEM academic tracks. Priority should be given to nurturing public articulation through student leadership positions.',
    },
    {
      id: 'std-2',
      name: 'Ananya Patel',
      grade: 'Grade 11',
      assessmentStatus: 'In Progress',
      fluidIQScore: 114,
      riasecCode: 'A-S-E',
      topCareer: 'Digital Product Designer',
      burnoutRisk: 'Moderate',
      counselorNotes: 'High creative and social interest. Experiencing slight stress with mathematics coursework; recommended exploratory design internships.',
    },
    {
      id: 'std-3',
      name: 'Rohan Verma',
      grade: 'Grade 12',
      assessmentStatus: 'Completed',
      fluidIQScore: 132,
      riasecCode: 'I-C-R',
      topCareer: 'Quantitative Financial Analyst',
      burnoutRisk: 'Low',
      counselorNotes: 'Targeting premier engineering & mathematical finance degrees. Profile is fully balanced.',
    },
    {
      id: 'std-4',
      name: 'Priya Iyer',
      grade: 'Grade 9',
      assessmentStatus: 'Not Started',
      fluidIQScore: 0,
      riasecCode: 'Pending',
      topCareer: 'Pending Assessment',
      burnoutRisk: 'Low',
      counselorNotes: 'Awaiting parent consent verification from father.',
    },
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeStudent, setActiveStudent] = useState<AssignedStudent | null>(null);
  const [editedNotes, setEditedNotes] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  const openStudentNotes = (student: AssignedStudent) => {
    setActiveStudent(student);
    setEditedNotes(student.counselorNotes);
    setIsNoteSaved(false);
  };

  const handleSaveNotes = () => {
    if (!activeStudent) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === activeStudent.id ? { ...s, counselorNotes: editedNotes } : s))
    );
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const filtered = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.grade.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === 'All' || s.assessmentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue">Counselor Suite</Badge>
              <span className="text-xs text-slate-500">• Lead Counselor: Dr. Meenakshi Sundaram</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Assigned Student Roster & Advisory Notes
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review standardized results, add private qualitative counseling notes, and track advising milestones.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search students by name or grade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">All Assessment Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
        </div>

        {/* Student Roster Table */}
        <Card className="overflow-hidden bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase text-[10px] font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Candidate Name</th>
                  <th className="px-6 py-3.5">Grade</th>
                  <th className="px-6 py-3.5">Battery Status</th>
                  <th className="px-6 py-3.5">Fluid IQ / Score</th>
                  <th className="px-6 py-3.5">Holland Code</th>
                  <th className="px-6 py-3.5">Top Suggested Career</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{s.name}</td>
                    <td className="px-6 py-4 text-slate-600">{s.grade}</td>
                    <td className="px-6 py-4">
                      {s.assessmentStatus === 'Completed' ? (
                        <Badge variant="success">Completed</Badge>
                      ) : s.assessmentStatus === 'In Progress' ? (
                        <Badge variant="warning">In Progress</Badge>
                      ) : (
                        <Badge variant="default">Not Started</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {s.fluidIQScore > 0 ? (
                        <span className="font-bold text-indigo-700">{s.fluidIQScore} (Superior)</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold text-slate-700">{s.riasecCode}</td>
                    <td className="px-6 py-4 text-slate-800">{s.topCareer}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openStudentNotes(s)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        Notes
                      </button>
                      {s.assessmentStatus === 'Completed' && (
                        <Link href="/reports/view/usr-student-1">
                          <button className="px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors">
                            Report
                          </button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Private Counselor Notes Modal */}
        {activeStudent && (
          <Dialog
            isOpen={!!activeStudent}
            onClose={() => setActiveStudent(null)}
            title={`Counselor Advisory Notes: ${activeStudent.name}`}
            description="These observations will be embedded into Section 16 of the official psychological report."
            footer={
              <div className="flex items-center gap-2">
                {isNoteSaved && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Notes Saved!
                  </span>
                )}
                <Button variant="outline" size="sm" onClick={() => setActiveStudent(null)}>
                  Close
                </Button>
                <Button variant="gradient" size="sm" onClick={handleSaveNotes} className="font-bold">
                  <Save className="h-3.5 w-3.5 mr-1" />
                  <span>Save to Report</span>
                </Button>
              </div>
            }
          >
            <div className="space-y-4 py-2 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Candidate</span>
                  <span className="font-bold text-slate-900">{activeStudent.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Holland RIASEC</span>
                  <span className="font-semibold text-indigo-700">{activeStudent.riasecCode}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Burnout Risk</span>
                  <span className="font-semibold text-emerald-600">{activeStudent.burnoutRisk}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Clinical & Qualitative Guidance Notes
                </label>
                <textarea
                  rows={6}
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 leading-relaxed"
                  placeholder="Enter specific recommendations, subject advice, and counseling insights..."
                />
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}
