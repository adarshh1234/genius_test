'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Button, Badge } from '@/components/ui';
import { ShieldAlert, ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-2xl text-center space-y-5">
          <div className="h-14 w-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <Badge variant="danger">Role Permission Required</Badge>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Access Restricted</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your current authenticated profile does not possess the requisite institutional or administrative permissions to access this route.
          </p>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-left text-xs text-slate-700 space-y-1">
            <span className="font-semibold block">Need demo access?</span>
            <p className="text-slate-500">
              Use the top <strong>Demo Controls bar</strong> to instantly switch your active role to Super Admin, School Admin, or Counselor.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Home className="h-4 w-4 mr-1.5" />
                <span>Return Home</span>
              </Button>
            </Link>
            <Link href="/dashboard/student" className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                <span>Student Portal</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
