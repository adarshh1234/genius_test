'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Badge } from '@/components/ui';
import { authService } from '@/lib/api';
import { Brain, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student',
    age: 16,
    agreedToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) return;

    setIsLoading(true);
    await authService.register(formData);
    setIsLoading(false);
    router.push('/onboarding');
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: 'Empty', color: 'bg-slate-200', pct: 0 };
    if (pwd.length < 6) return { label: 'Weak', color: 'bg-rose-500', pct: 30 };
    if (pwd.length < 10) return { label: 'Fair', color: 'bg-amber-500', pct: 60 };
    return { label: 'Strong', color: 'bg-emerald-500', pct: 100 };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-xl font-black text-slate-900">Genius Test</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create your account</h1>
        <p className="text-xs text-slate-500">
          Join Genius Test for age-adaptive career discovery.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-2xl space-y-5">
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Aarav Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />

            <Input
              label="Email Address"
              type="email"
              required
              placeholder="aarav@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="student">Student / Assessment Candidate</option>
                <option value="parent">Parent / Legal Guardian</option>
                <option value="counselor">Career Counselor / Educator</option>
                <option value="institution">School / College Administrator</option>
              </select>
            </div>

            {formData.role === 'student' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Age of Participant
                </label>
                <input
                  type="number"
                  min={3}
                  max={90}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 16 })}
                  className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {formData.age <= 7 && '🌟 Early Stage (3-7y): Playful visual prompts & character guide.'}
                  {formData.age >= 8 && formData.age <= 18 && '🎓 Academic Stage (8-18y): Course and stream guidance.'}
                  {formData.age >= 19 && formData.age <= 55 && '💼 Career Growth (19-55y): Leadership, DISC & transitions.'}
                  {formData.age >= 56 && '🌿 Lifelong Vitality (56-90y): High-contrast, cognitive clarity.'}
                </span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
              {formData.password && (
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Password Strength:</span>
                    <span className="font-semibold">{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} rounded-full`} style={{ width: `${strength.pct}%` }} />
                  </div>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-600 leading-snug">
                I agree to the{' '}
                <Link href="/terms" className="text-indigo-600 font-semibold hover:underline">
                  Terms of Service
                </Link>{' '}
                and confirm compliance with our{' '}
                <Link href="/privacy" className="text-indigo-600 font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <Button
              type="submit"
              variant="gradient"
              className="w-full font-bold h-11"
              isLoading={isLoading}
              disabled={!formData.agreedToTerms}
            >
              <span>Continue to Onboarding</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold text-indigo-600 hover:underline">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
