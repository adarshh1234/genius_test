'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api';
import { User, UserRole, AgeTier } from '@/types';
import {
  Sparkles,
  UserCheck,
  Eye,
  Type,
  ChevronRight,
  Info,
} from 'lucide-react';

export function DemoBanner() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [bannerCollapsed, setBannerCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    authService.getCurrentUser().then(setCurrentUser);
  }, []);

  const handleRoleChange = async (role: UserRole, ageTier?: AgeTier) => {
    const updated = await authService.switchDemoRole(role, ageTier);
    setCurrentUser(updated);

    if (role === 'student') router.push('/dashboard/student');
    else if (role === 'parent') router.push('/dashboard/parent');
    else if (role === 'counselor') router.push('/dashboard/counselor');
    else if (role === 'institution') router.push('/dashboard/institution');
    else if (role === 'superadmin') router.push('/dashboard/admin');
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (typeof document !== 'undefined') {
      if (next) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }
  };

  const toggleLargeFont = () => {
    const next = !largeFont;
    setLargeFont(next);
    if (typeof document !== 'undefined') {
      if (next) {
        document.documentElement.classList.add('text-lg');
      } else {
        document.documentElement.classList.remove('text-lg');
      }
    }
  };

  if (bannerCollapsed) {
    return (
      <button
        onClick={() => setBannerCollapsed(false)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Demo Controls</span>
      </button>
    );
  }

  return (
    <div className="bg-slate-900 border-b border-indigo-900/60 text-white px-3 py-2 text-xs z-50 relative shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30">
            <Info className="h-3 w-3" />
            Interactive Demo Mode
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Active: <strong className="text-white font-semibold">{currentUser?.name || 'Aarav Sharma'}</strong> (
            <span className="capitalize text-indigo-300">{currentUser?.role || 'student'}</span>)
          </span>
        </div>

        {/* Center: Quick Role Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="text-slate-400 text-[11px] mr-1 hidden md:inline">Switch Role:</span>
          <button
            onClick={() => handleRoleChange('student', 'academic')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              currentUser?.role === 'student' && currentUser?.ageTier !== 'early'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Student (16y)
          </button>
          <button
            onClick={() => handleRoleChange('student', 'early')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              currentUser?.ageTier === 'early'
                ? 'bg-pink-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Early Child (6y)
          </button>
          <button
            onClick={() => handleRoleChange('student', 'longevity')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              currentUser?.ageTier === 'longevity'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Senior (67y)
          </button>
          <button
            onClick={() => handleRoleChange('parent')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              currentUser?.role === 'parent'
                ? 'bg-purple-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Parent
          </button>
          <button
            onClick={() => handleRoleChange('counselor')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              currentUser?.role === 'counselor'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Counselor
          </button>
          <button
            onClick={() => handleRoleChange('institution')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              currentUser?.role === 'institution'
                ? 'bg-teal-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            School
          </button>
          <button
            onClick={() => handleRoleChange('superadmin')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              currentUser?.role === 'superadmin'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Super Admin
          </button>
        </div>

        {/* Right: Accessibility Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleHighContrast}
            title="Toggle High Contrast for Accessibility"
            className={`p-1.5 rounded-md border text-[11px] transition-colors flex items-center gap-1 ${
              highContrast ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold' : 'border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Eye className="h-3 w-3" />
            <span className="hidden sm:inline">Contrast</span>
          </button>
          <button
            onClick={toggleLargeFont}
            title="Toggle Larger Accessible Typography"
            className={`p-1.5 rounded-md border text-[11px] transition-colors flex items-center gap-1 ${
              largeFont ? 'border-indigo-400 bg-indigo-500 text-white font-bold' : 'border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Type className="h-3 w-3" />
            <span className="hidden sm:inline">Large Font</span>
          </button>
          <button
            onClick={() => setBannerCollapsed(true)}
            className="text-slate-400 hover:text-white p-1 text-[11px]"
            title="Collapse demo bar"
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  );
}
