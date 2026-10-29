'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Input, StatCard, Dialog } from '@/components/ui';
import { adminService } from '@/lib/api';
import { User, ScoringWeightsProfile } from '@/types';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  Boxes,
  HelpCircle,
  Sliders,
  Briefcase,
  BookOpen,
  FileText,
  CreditCard,
  BarChart3,
  History,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Save,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';

export default function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState<string>('scoring');
  const [users, setUsers] = useState<User[]>([]);
  const [scoringProfiles, setScoringProfiles] = useState<ScoringWeightsProfile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<'profile_a' | 'profile_b'>('profile_a');
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [metrics, setMetrics] = useState({
    totalStudents: 14820,
    completedAssessments: 11940,
    completionRate: 80.6,
    reportDownloads: 8430,
    activeInstitutions: 42,
  });

  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    adminService.getAllUsers().then(setUsers);
    adminService.getScoringWeights().then((profiles) => {
      setScoringProfiles(profiles);
      const active = profiles.find((p) => p.id === selectedProfileId) || profiles[0];
      if (active) {
        setWeights({ ...active.weights });
      }
    });
    adminService.getSystemMetrics().then(setMetrics);
  }, []);

  const handleSelectProfile = (id: 'profile_a' | 'profile_b') => {
    setSelectedProfileId(id);
    const prof = scoringProfiles.find((p) => p.id === id);
    if (prof) {
      setWeights({ ...prof.weights });
    }
  };

  const handleWeightChange = (key: string, val: number) => {
    setWeights((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const totalWeight = Object.values(weights).reduce((acc, v) => acc + (v || 0), 0);
  const is100Percent = totalWeight === 100;

  const handleSaveWeights = () => {
    if (!is100Percent) return;
    adminService.updateScoringWeights(selectedProfileId, weights);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // 21 Navigation Modules
  const adminModules = [
    { id: 'dashboard', label: '1. Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'users', label: '2. Users Roster', icon: <Users className="h-4 w-4" /> },
    { id: 'students', label: '3. Students Directory', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'institutions', label: '4. Institutions', icon: <Building2 className="h-4 w-4" /> },
    { id: 'assessments', label: '5. Assessment Modules', icon: <Boxes className="h-4 w-4" /> },
    { id: 'question_bank', label: '6. Question Bank', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'scoring', label: '7. Scoring Weights Config', icon: <Sliders className="h-4 w-4" /> },
    { id: 'careers', label: '8. Career Database (300+)', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'courses', label: '9. Course Catalog', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'reports', label: '10. Reports Management', icon: <FileText className="h-4 w-4" /> },
    { id: 'payments', label: '11. Subscriptions & Payments', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'analytics', label: '12. Cohort Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'audit', label: '13. Audit Logs', icon: <History className="h-4 w-4" /> },
    { id: 'settings', label: '14. System Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Badge variant="purple">Super Admin Control Plane</Badge>
          <span className="text-sm font-bold text-slate-200">GeniusPie.com Engine Administration</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>Global Production Cluster</span>
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin Navigation Sidebar (21 Modules) */}
          <div className="lg:col-span-3 space-y-2">
            <Card className="p-3 bg-white border border-slate-200 shadow-xs rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                Platform Admin Modules
              </span>
              {adminModules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeTab === mod.id
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {mod.icon}
                  <span className="truncate">{mod.label}</span>
                </button>
              ))}
            </Card>

            <Card className="p-4 bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="block text-amber-950 font-bold">Safe Client Mode:</strong>
              <p className="text-[11px] leading-relaxed">
                Frontend settings and weights are demonstrated client-side. Live production persistence uses isolated admin API microservices.
              </p>
            </Card>
          </div>

          {/* Main Module Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* KPI Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard title="Total Students" value={metrics.totalStudents.toLocaleString()} subtitle="Across all age tiers" />
              <StatCard title="Completed Tests" value={metrics.completedAssessments.toLocaleString()} subtitle="Certified evaluations" />
              <StatCard title="Completion Rate" value={`${metrics.completionRate}%`} subtitle="Benchmark target 80%" trend={{ value: '+2.4%', isPositive: true }} />
              <StatCard title="Partner Schools" value={metrics.activeInstitutions} subtitle="Institutional baseline" />
            </div>

            {/* TAB: SCORING WEIGHTS CONFIGURATOR (Core Requirement 19) */}
            {activeTab === 'scoring' && (
              <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-md rounded-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <Badge variant="purple">Empirical Weights</Badge>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      Scoring Weights & Composite Algorithm Configuration
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure how different psychometric components are triangulated. Total must equal precisely 100%.
                    </p>
                  </div>

                  {/* Profile Switcher */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectProfile('profile_a')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedProfileId === 'profile_a'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Profile A (Holistic)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectProfile('profile_b')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedProfileId === 'profile_b'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Profile B (Career Focus)
                    </button>
                  </div>
                </div>

                {/* Profile Description */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong>Selected Configuration:</strong>{' '}
                  {selectedProfileId === 'profile_a'
                    ? 'Profile A (Balanced Holistic Model): IQ 25%, Aptitude 20%, Personality 15%, EQ 15%, Stress 10%, Interests 10%, DMIT 5%.'
                    : 'Profile B (Behavioral-Aptitude Career Alignment): Raven 20%, Aptitude 25%, Holland 15%, Big Five 15%, DISC 10%, EQ 10%, DMIT 5%.'}
                </div>

                {/* Sliders Form */}
                <div className="space-y-4 pt-2">
                  {Object.entries(weights).map(([trait, weightVal]) => (
                    <div key={trait} className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{trait}</span>
                        <span className="text-indigo-600">{weightVal}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        value={weightVal}
                        onChange={(e) => handleWeightChange(trait, parseInt(e.target.value) || 0)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  ))}
                </div>

                {/* Validation Indicator */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                    is100Percent
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                      : 'bg-rose-50 border-rose-200 text-rose-800 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {is100Percent ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                    )}
                    <span>
                      Total Weight Sum: <strong>{totalWeight}%</strong>{' '}
                      {!is100Percent && '(Validation Error: Total weight sum must equal 100%)'}
                    </span>
                  </div>

                  <Button
                    variant="gradient"
                    size="sm"
                    disabled={!is100Percent}
                    onClick={handleSaveWeights}
                    className="font-bold text-xs"
                  >
                    <Save className="h-3.5 w-3.5 mr-1" />
                    <span>Save Configuration</span>
                  </Button>
                </div>

                {saveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Scoring Profile {selectedProfileId.toUpperCase()} updated successfully!</span>
                  </div>
                )}
              </Card>
            )}

            {/* TAB: USERS ROSTER */}
            {activeTab === 'users' && (
              <Card className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">User Management Directory</h2>
                    <p className="text-xs text-slate-500">Inspect registered students, parents, counselors, and institutions.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none"
                    />
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none"
                    >
                      <option value="all">All Roles</option>
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                      <option value="counselor">Counselor</option>
                      <option value="institution">Institution</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 uppercase text-[10px] font-bold text-slate-400">
                      <tr>
                        <th className="px-4 py-2.5">User</th>
                        <th className="px-4 py-2.5">Role</th>
                        <th className="px-4 py-2.5">Age / Cohort</th>
                        <th className="px-4 py-2.5">Institution</th>
                        <th className="px-4 py-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-900 block">{u.name}</span>
                            <span className="text-[11px] text-slate-400">{u.email}</span>
                          </td>
                          <td className="px-4 py-3 capitalize font-semibold">{u.role}</td>
                          <td className="px-4 py-3">{u.age ? `${u.age} yrs (${u.ageTier})` : '—'}</td>
                          <td className="px-4 py-3">{u.institutionName || 'Self-Registered'}</td>
                          <td className="px-4 py-3 text-right">
                            <Badge variant="success">Active</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* TAB: OTHER MODULES PLACEHOLDER */}
            {activeTab !== 'scoring' && activeTab !== 'users' && (
              <Card className="p-8 bg-white border border-slate-200 shadow-sm rounded-2xl text-center space-y-3">
                <Boxes className="h-10 w-10 text-indigo-600 mx-auto" />
                <h2 className="text-base font-bold text-slate-900 capitalize">
                  {activeTab.replace('_', ' ')} Management Module
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  This admin module is wired to the frontend service adapter. In demo mode, live metrics and configuration data are sourced from <code>src/lib/mock/data.ts</code>.
                </p>
                <div className="pt-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('scoring')}>
                    Go to Scoring Weights Form
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
