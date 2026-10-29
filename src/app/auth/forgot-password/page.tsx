'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Input } from '@/components/ui';
import { Brain, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
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
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reset your password</h1>
        <p className="text-xs text-slate-500">
          Enter your registered email address and we’ll send you recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-2xl">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Recovery Email Dispatched</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an account matches <strong>{email}</strong>, a secure one-time password reset link has been dispatched.
              </p>
              <div className="pt-2">
                <Link href="/auth/reset-password">
                  <Button variant="primary" size="sm" className="w-full">
                    Proceed to Reset Screen (Demo)
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="gradient" className="w-full font-bold h-11" isLoading={isLoading}>
                Send Password Reset Link
              </Button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link href="/auth/login" className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:underline">
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
