'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Progress, StatCard, Dialog, Input } from '@/components/ui';
import {
  Building2,
  Users,
  FileSpreadsheet,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

export default function InstitutionAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [isExportingCSV, setIsExportingCSV] = useState(false);

  const [batches, setBatches] = useState([
    { id: 'b-1', name: 'Grade 10 - Science & Tech Cohort', studentsCount: 160, completed: 142, counselor: 'Dr. M. Sundaram' },
    { id: 'b-2', name: 'Grade 11 - Commerce & Finance Cohort', studentsCount: 140, completed: 118, counselor: 'Prof. A. Kapoor' },
    { id: 'b-3', name: 'Grade 12 - Advanced Capstone Group', studentsCount: 150, completed: 120, counselor: 'Dr. M. Sundaram' },
  ]);

  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchCount, setNewBatchCount] = useState(50);

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    setBatches([
      ...batches,
      {
        id: `b-${Date.now()}`,
        name: newBatchName,
        studentsCount: newBatchCount,
        completed: 0,
        counselor: 'Dr. M. Sundaram',
      },
    ]);
    setShowBatchModal(false);
    setNewBatchName('');
  };

  const handleSimulateCSVExport = () => {
    setIsExportingCSV(true);
    setTimeout(() => {
      setIsExportingCSV(false);
      alert('Demo: Institution cohort psychometric results successfully exported to CSV!');
    }, 1000);
  };

  const totalStudents = batches.reduce((acc, b) => acc + b.studentsCount, 0);
  const totalCompleted = batches.reduce((acc, b) => acc + b.completed, 0);
  const overallRate = Math.round((totalCompleted / totalStudents) * 100);

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="teal">Institution Admin Portal</Badge>
              <span className="text-xs text-slate-500">• License: Institutional Baseline (₹49/student)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Delhi Public School, R.K. Puram
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Cohort Management, Batch Testing Allocations & Institutional Analytics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSimulateCSVExport}
              isLoading={isExportingCSV}
              className="text-xs font-semibold"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
              <span>Export Cohort CSV</span>
            </Button>

            <Button
              variant="gradient"
              size="sm"
              onClick={() => setShowBatchModal(true)}
              className="text-xs font-bold shadow-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              <span>Enroll New Batch</span>
            </Button>
          </div>
        </div>

        {/* Institution Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Enrolled Students"
            value={totalStudents}
            subtitle="Across 3 active grade batches"
            icon={<Users className="h-5 w-5 text-indigo-600" />}
          />
          <StatCard
            title="Completed Evaluations"
            value={totalCompleted}
            subtitle={`${overallRate}% of active roster`}
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
            trend={{ value: `${overallRate}%`, isPositive: true }}
          />
          <StatCard
            title="Assigned Counselors"
            value="4 Advisors"
            subtitle="Guidance and career counseling"
            icon={<GraduationCap className="h-5 w-5 text-purple-600" />}
          />
          <StatCard
            title="Institutional Tier"
            value="Baseline Track"
            subtitle="₹49 per student rate active"
            icon={<Building2 className="h-5 w-5 text-teal-600" />}
          />
        </div>

        {/* Cohort Batches Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Enrolled Student Cohort Batches</h2>
            <span className="text-xs text-slate-500">{batches.length} Registered Batches</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {batches.map((batch) => {
              const batchPct = Math.round((batch.completed / (batch.studentsCount || 1)) * 100);
              return (
                <Card key={batch.id} className="p-6 bg-white border border-slate-200 shadow-xs rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                      Batch ID: {batch.id.toUpperCase()}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{batch.name}</h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Lead Counselor: <strong className="text-slate-700">{batch.counselor}</strong>
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Testing Completion</span>
                        <span>{batch.completed} / {batch.studentsCount} ({batchPct}%)</span>
                      </div>
                      <Progress value={batchPct} indicatorColor="bg-indigo-600" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Institutional Baseline</span>
                    <Link href="/dashboard/counselor">
                      <span className="font-bold text-indigo-600 hover:underline">
                        View Student Roster →
                      </span>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Enroll Batch Modal */}
        {showBatchModal && (
          <Dialog
            isOpen={showBatchModal}
            onClose={() => setShowBatchModal(false)}
            title="Enroll New Student Batch"
            description="Assign assessment batteries to a class or school section."
            footer={
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowBatchModal(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" size="sm" onClick={handleCreateBatch} className="font-bold">
                  Create & Allocate Codes
                </Button>
              </div>
            }
          >
            <form onSubmit={handleCreateBatch} className="space-y-4 py-2">
              <Input
                label="Cohort Batch Name"
                required
                placeholder="e.g. Grade 10 - Section C (Robotics & Computing)"
                value={newBatchName}
                onChange={(e) => setNewBatchName(e.target.value)}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Student Capacity / Seat Allocation
                </label>
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={newBatchCount}
                  onChange={(e) => setNewBatchCount(parseInt(e.target.value) || 30)}
                  className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800">Pricing Breakdown:</span>
                <p>Allocating {newBatchCount} candidate seats at ₹49/student = ₹{(newBatchCount * 49).toLocaleString('en-IN')}</p>
              </div>
            </form>
          </Dialog>
        )}
      </div>
    </div>
  );
}
