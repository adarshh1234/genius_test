'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Button, Badge } from '@/components/ui';
import { Clock, LogIn, ArrowRight } from 'lucide-react';

export default function SessionExpiredPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-2xl text-center space-y-5">
          <div className="h-14 w-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Clock className="h-8 w-8" />
          </div>

          <Badge variant="warning">Session Timeout</Badge>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Session Expired</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            For participant security and child privacy compliance, inactive sessions automatically expire. Your assessment draft states have been saved.
          </p>

          <div className="pt-2">
            <Link href="/auth/login" className="block">
              <Button variant="gradient" className="w-full font-bold">
                <LogIn className="h-4 w-4 mr-2" />
                <span>Re-authenticate to Resume</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
