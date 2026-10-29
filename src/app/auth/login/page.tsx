'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Badge } from '@/components/ui';
import { authService } from '@/lib/api';
import { UserRole } from '@/types';
import { Brain, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await authService.login(email, password);
      setIsLoading(false);
      // Route based on role
      if (res.user.role === 'student') router.push('/dashboard/student');
      else if (res.user.role === 'parent') router.push('/dashboard/parent');
      else if (res.user.role === 'counselor') router.push('/dashboard/counselor');
      else if (res.user.role === 'institution') router.push('/dashboard/institution');
      else if (res.user.role === 'superadmin') router.push('/dashboard/admin');
    } catch {
      setIsLoading(false);
      setError('Unable to authenticate. Please check your credentials.');
    }
  };

  const fillQuickDemo = async (role: UserRole, demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demoPassword123!');
    setIsLoading(true);
    const res = await authService.switchDemoRole(role);
    setIsLoading(false);
    if (role === 'student') router.push('/dashboard/student');
    else if (role === 'parent') router.push('/dashboard/parent');
    else if (role === 'counselor') router.push('/dashboard/counselor');
    else if (role === 'institution') router.push('/dashboard/institution');
    else if (role === 'superadmin') router.push('/dashboard/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-xl font-black text-slate-900">Genius Test</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sign in to your account</h1>
        <p className="text-xs text-slate-500">
          Enter your credentials or use the quick demo role buttons below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-2xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="aarav.sharma@example.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-xs text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="gradient" className="w-full font-bold h-11" isLoading={isLoading}>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          {/* Quick Demo Switcher Buttons */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5 text-center">
              Quick Demo Role Sign-In
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillQuickDemo('student', 'aarav.sharma@example.edu')}
                className="p-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-left font-semibold transition-colors"
              >
                👤 Student (16y)
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('parent', 'rajesh.sharma@example.com')}
                className="p-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-left font-semibold transition-colors"
              >
                👨‍👩‍👧 Parent Portal
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('counselor', 'm.sundaram@counseling.org')}
                className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-left font-semibold transition-colors"
              >
                🧭 Counselor
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('institution', 'admin@dpsrkpuram.edu')}
                className="p-2 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 text-left font-semibold transition-colors"
              >
                🏫 School Admin
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('superadmin', 'superadmin@geniuspie.com')}
                className="col-span-2 p-2 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 text-center font-bold transition-colors"
              >
                ⚡ Super Admin (21 Modules)
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2">
            Don’t have an account?{' '}
            <Link href="/auth/register" className="font-bold text-indigo-600 hover:underline">
              Register now
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
