'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Badge } from '@/components/ui';
import {
  Brain,
  Menu,
  X,
  Compass,
  GraduationCap,
  Users,
  Building2,
  Sparkles,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Assessments', href: '/assessments' },
    { label: 'Career Discovery', href: '/career-discovery' },
    { label: 'For Parents', href: '/parents' },
    { label: 'For Schools', href: '/schools' },
    { label: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25 group-hover:scale-105 transition-transform">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Genius Test
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-600 -mt-1">
              by GeniusPie.com
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-indigo-600 ${
                  isActive ? 'text-indigo-600 font-bold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dashboards Quick Link */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Explore Roles</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in"
                onMouseLeave={() => setRoleDropdownOpen(false)}
              >
                <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Role View
                </div>
                <Link
                  href="/dashboard/student"
                  onClick={() => setRoleDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <GraduationCap className="h-4 w-4 text-indigo-600" />
                  <span>Student Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/parent"
                  onClick={() => setRoleDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                >
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Parent Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/counselor"
                  onClick={() => setRoleDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Compass className="h-4 w-4 text-blue-600" />
                  <span>Counselor Portal</span>
                </Link>
                <Link
                  href="/dashboard/institution"
                  onClick={() => setRoleDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Building2 className="h-4 w-4 text-emerald-600" />
                  <span>Institution Admin</span>
                </Link>
                <Link
                  href="/dashboard/admin"
                  onClick={() => setRoleDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                  <span>Super Admin Panel</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="font-semibold text-slate-700">
              Sign In
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button variant="gradient" size="sm" className="font-semibold shadow-xs">
              <Sparkles className="h-4 w-4" />
              <span>Start Your Genius Test</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/onboarding">
            <Button variant="primary" size="sm" className="text-xs">
              Start Test
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="gradient" className="w-full justify-center">
                Start Your Genius Test
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
