'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui';
import { Brain, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-xl font-black text-slate-900">Genius Test</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Set new password</h1>
        <p className="text-xs text-slate-500">Please choose a secure new password for your account.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-2xl">
          {isSuccess ? (
            <div className="text-center space-y-3 py-4">
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Password Updated!</h3>
              <p className="text-xs text-slate-600">Redirecting you to login...</p>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {error && <div className="text-xs font-semibold text-rose-600">{error}</div>}
              <Input
                label="New Password"
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Confirm New Password"
                type="password"
                required
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" variant="gradient" className="w-full font-bold h-11">
                Save & Update Password
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
