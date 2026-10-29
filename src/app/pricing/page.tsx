'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import { mockPricingTiers } from '@/lib/mock/data';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, XCircle, Info, Sparkles, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="purple">Proposed Pricing Plans</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Transparent, Value-Based Investment
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            All prices are based on official platform specifications. Demonstrative frontend mode: Real payments and checkouts are intentionally disabled.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/80 border border-slate-300 mt-4">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currency === 'INR' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Indian Rupee (₹ INR)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              US Dollar ($ USD)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockPricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`p-6 flex flex-col justify-between ${
                tier.highlighted
                  ? 'border-2 border-indigo-600 shadow-xl relative bg-white'
                  : 'border border-slate-200 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{tier.name}</span>
                  <Badge variant={tier.highlighted ? 'purple' : 'default'}>{tier.badge}</Badge>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    {currency === 'INR' ? formatCurrency(tier.priceINR, 'INR') : formatCurrency(tier.priceUSD, 'USD')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ {tier.unitText}</span>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{tier.description}</p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link href="/onboarding" className="block">
                  <Button
                    variant={tier.highlighted ? 'gradient' : 'outline'}
                    className="w-full text-xs font-bold"
                  >
                    {tier.ctaText}
                  </Button>
                </Link>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  Demo presentation mode
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Proposed disclaimer note */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-800">
          <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <strong>Demonstration Notice:</strong> Prices shown above (Institutional: ₹49/$1.99; Standard: ₹1,499/$39; Premium AI-DMIT: ₹3,499/$89) reflect proposed pricing parameters from platform documentation. Live payment processing and payment gateways are handled by secure backend microservices.
          </div>
        </div>
      </div>
    </div>
  );
}
