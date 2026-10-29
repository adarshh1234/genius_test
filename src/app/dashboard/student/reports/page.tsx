'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Dialog } from '@/components/ui';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Printer,
  ShieldCheck,
} from 'lucide-react';

export default function StudentReportsCatalogPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState(false);

  const reports = [
    {
      id: 'rep-aarav-final',
      title: 'Comprehensive 19-Section Psychological & Career Blueprint',
      version: 'v2.4 (Profile A Model)',
      generatedDate: 'October 24, 2026',
      status: 'Ready',
      pages: 14,
      isPrimary: true,
    },
    {
      id: 'rep-aarav-baseline',
      title: 'Raven Fluid Intelligence & Aptitude Summary Card',
      version: 'v1.0 (Interim)',
      generatedDate: 'October 22, 2026',
      status: 'Archived',
      pages: 4,
      isPrimary: false,
    },
  ];

  const handleSimulateDownload = (id: string) => {
    setDownloadingId(id);
    setDownloadError(false);

    setTimeout(() => {
      setDownloadingId(null);
      // Trigger native print dialog for clean PDF generation
      window.open(`/reports/view/${id}?print=true`, '_blank');
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Official Dossiers</Badge>
              <span className="text-xs text-slate-500">• Printable & Encrypted PDF Format</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Assessment Reports & Certifications
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Access and download official 19-section psychological analysis and career roadmap documents.
            </p>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="space-y-4">
          {reports.map((rep) => (
            <Card key={rep.id} className="p-6 bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">{rep.title}</h2>
                      {rep.isPrimary && <Badge variant="success">Latest</Badge>}
                    </div>
                    <p className="text-xs text-slate-500">
                      Version: {rep.version} • Generated on {rep.generatedDate} • {rep.pages} Pages
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Certified Psychometric Normalization Sample (N=45,000+)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link href={`/reports/view/${rep.id}`}>
                    <Button variant="outline" size="sm" className="text-xs font-semibold">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      <span>Preview HTML</span>
                    </Button>
                  </Link>

                  <Button
                    variant="gradient"
                    size="sm"
                    className="text-xs font-bold shadow-sm"
                    onClick={() => handleSimulateDownload(rep.id)}
                    isLoading={downloadingId === rep.id}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Print Guidance Card */}
        <Card className="p-5 bg-indigo-50/60 border border-indigo-100 rounded-2xl text-xs text-indigo-900 flex items-start gap-3">
          <Printer className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <strong className="block text-indigo-950 font-bold">Print & Export Optimization Notice</strong>
            <p className="leading-relaxed">
              When downloading or printing, select <strong>Save as PDF</strong> in your browser’s print dialog. The document is pre-styled with dedicated print media queries (`@media print`) ensuring zero header/navigation clutter and clean page breaks across all 19 analysis sections.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
