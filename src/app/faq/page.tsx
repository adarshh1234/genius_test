'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { HelpCircle, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const faqCategories = [
    {
      category: 'Assessment & Methodology',
      questions: [
        {
          q: 'What age groups does Genius Test support?',
          a: 'Genius Test is structured for four distinct cohorts: Ages 3–7 (Early Stage playful visuals), Ages 8–18 (Academic focus and stream selection), Ages 19–55 (Career growth, leadership, and transition), and Ages 56–90 (Lifelong cognitive vitality and high contrast).',
        },
        {
          q: 'How long does the complete assessment take?',
          a: 'The full 7-module standard psychometric suite takes approximately 60–90 minutes. However, participants can pause, save progress, and resume any module at their convenience.',
        },
        {
          q: 'What is Raven Matrix Reasoning?',
          a: 'Raven’s Progressive Matrices is the premier global instrument for measuring fluid intelligence—the ability to think abstractly, deduce rules, and solve novel problems without dependence on acquired cultural or linguistic knowledge.',
        },
      ],
    },
    {
      category: 'Optional DMIT & Biometrics',
      questions: [
        {
          q: 'Is the DMIT component scientifically mandatory?',
          a: 'No. The Non-DMIT Psychometric track is completely self-sufficient and scientifically validated. The DMIT module is an optional observational tool for users interested in developmental dermatoglyphic correlations.',
        },
        {
          q: 'Do you store or sell my fingerprint images?',
          a: 'Never. In the live production system, ridge features are processed via client-side/edge algorithms. Raw fingerprint scans are never sold, shared, or persisted on public servers.',
        },
      ],
    },
    {
      category: 'Schools, Counselors & Reports',
      questions: [
        {
          q: 'What format are the reports generated in?',
          a: 'Reports are rendered as an interactive, printable 19-section HTML document with dynamic charts. In a production backend, this is packaged as an encrypted PDF download.',
        },
        {
          q: 'Can counselors add customized clinical notes?',
          a: 'Yes. The counselor portal provides an integrated qualitative notes section that appears directly within Section 16 of the student’s final report.',
        },
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="purple">Frequently Asked Questions</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Everything You Need to Know
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Detailed answers regarding our assessment methods, age adaptation, and ethical data standards.
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.questions.map((item, qIdx) => (
                  <Card key={qIdx} className="p-5 bg-white border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2.5">
                      <HelpCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-6.5">
                      {item.a}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <p className="text-xs text-slate-500 mb-3">Still have questions?</p>
          <Link href="/contact">
            <Button variant="outline" size="md">
              <span>Contact Support</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
