'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { Brain, MailCheck, RotateCcw } from 'lucide-react';

export default function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleInput = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      router.push('/onboarding');
    }, 800);
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
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Verify your email</h1>
        <p className="text-xs text-slate-500">
          We’ve dispatched a 6-digit verification code to your email.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-2xl space-y-6">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-between gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`code-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInput(idx, e.target.value)}
                  className="h-12 w-12 text-center text-lg font-bold rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              ))}
            </div>

            <Button type="submit" variant="gradient" className="w-full font-bold h-11" isLoading={isVerifying}>
              Confirm Verification
            </Button>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
            <span>Didn’t receive a code?</span>
            <button
              type="button"
              className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
              onClick={() => alert('Demo: Verification code resent to inbox.')}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Resend Code</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
