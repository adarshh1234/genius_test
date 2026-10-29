'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

// ==========================================
// INNATE VS ACQUIRED RADAR
// ==========================================
export function InnateVsAcquiredChart({
  data = { innateCognitive: 88, acquiredSkill: 84, behavioralAlignment: 90, emotionalResilience: 86 },
}: {
  data?: { innateCognitive: number; acquiredSkill: number; behavioralAlignment: number; emotionalResilience: number };
}) {
  const chartData = [
    { subject: 'Innate Cognitive', score: data.innateCognitive, fullMark: 100 },
    { subject: 'Acquired Skill', score: data.acquiredSkill, fullMark: 100 },
    { subject: 'Behavioral Fit', score: data.behavioralAlignment, fullMark: 100 },
    { subject: 'Emotional Resilience', score: data.emotionalResilience, fullMark: 100 },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Innate vs. Acquired Profile</CardTitle>
        <CardDescription>Synthesized balance across cognitive, crystallised, and behavioral domains.</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
            <Radar name="Profile Score" dataKey="score" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.45} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ==========================================
// APTITUDE BREAKDOWN BAR CHART
// ==========================================
export function AptitudeBarChart({
  aptitude = { numerical: 94, verbal: 86, abstract: 92, spatial: 88, mechanical: 85 },
}: {
  aptitude?: { numerical: number; verbal: number; abstract: number; spatial: number; mechanical: number };
}) {
  const chartData = [
    { name: 'Numerical', score: aptitude.numerical },
    { name: 'Verbal', score: aptitude.verbal },
    { name: 'Abstract', score: aptitude.abstract },
    { name: 'Spatial', score: aptitude.spatial },
    { name: 'Mechanical', score: aptitude.mechanical },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Multi-Aptitude Diagnostics</CardTitle>
        <CardDescription>Standardized percentiles across quantitative, verbal, and spatial reasoning.</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              formatter={(val: unknown) => [`${val}th Percentile`, 'Score']}
            />
            <Bar dataKey="score" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ==========================================
// BIG FIVE (OCEAN) RADAR
// ==========================================
export function BigFiveRadar({
  ocean = { openness: 88, conscientiousness: 82, extraversion: 68, agreeableness: 76, neuroticism: 28 },
}: {
  ocean?: { openness: number; conscientiousness: number; extraversion: number; agreeableness: number; neuroticism: number };
}) {
  const chartData = [
    { trait: 'Openness', score: ocean.openness },
    { trait: 'Conscientiousness', score: ocean.conscientiousness },
    { trait: 'Extraversion', score: ocean.extraversion },
    { trait: 'Agreeableness', score: ocean.agreeableness },
    { trait: 'Emotional Stability', score: 100 - ocean.neuroticism }, // Inverted for positive visualization
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Big Five Personality (OCEAN)</CardTitle>
        <CardDescription>Standardized behavioral tendencies across empirical five-factor model.</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="trait" tick={{ fill: '#475569', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
            <Radar name="OCEAN Score" dataKey="score" stroke="#9333ea" fill="#a855f7" fillOpacity={0.4} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ==========================================
// HOLLAND RIASEC CHART
// ==========================================
export function HollandRIASECChart({
  riasec = { realistic: 72, investigative: 95, artistic: 68, social: 54, enterprising: 78, conventional: 60 },
}: {
  riasec?: { realistic: number; investigative: number; artistic: number; social: number; enterprising: number; conventional: number };
}) {
  const chartData = [
    { type: 'Realistic (R)', score: riasec.realistic },
    { type: 'Investigative (I)', score: riasec.investigative },
    { type: 'Artistic (A)', score: riasec.artistic },
    { type: 'Social (S)', score: riasec.social },
    { type: 'Enterprising (E)', score: riasec.enterprising },
    { type: 'Conventional (C)', score: riasec.conventional },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Holland RIASEC Occupational Themes</CardTitle>
        <CardDescription>Primary intrinsic career interests. Highlighted code: I-E-R.</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="type" tick={{ fill: '#475569', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
            <Radar name="Interest Affinity" dataKey="score" stroke="#0ea5e9" fill="#38bdf8" fillOpacity={0.45} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ==========================================
// DISC QUADRANT VISUALIZER
// ==========================================
export function DISCQuadrantVisualizer({
  disc = { dominance: 74, influence: 68, steadiness: 62, conscientiousness: 86 },
}: {
  disc?: { dominance: number; influence: number; steadiness: number; conscientiousness: number };
}) {
  const quadrants = [
    { key: 'D', label: 'Dominance (D)', score: disc.dominance, color: 'bg-rose-500', text: 'Target-driven, decisive under pressure.' },
    { key: 'I', label: 'Influence (I)', score: disc.influence, color: 'bg-amber-500', text: 'Persuasive, communicative, inspiring.' },
    { key: 'S', label: 'Steadiness (S)', score: disc.steadiness, color: 'bg-emerald-500', text: 'Patient, dependable, team harmony.' },
    { key: 'C', label: 'Conscientiousness (C)', score: disc.conscientiousness, color: 'bg-blue-600', text: 'Rigorous, data-centric, high precision.' },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">DISC Behavioral Quadrants</CardTitle>
        <CardDescription>Primary work environment tendencies and communication style.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3.5">
        {quadrants.map((q) => (
          <div key={q.key} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>{q.label}</span>
              <span className="font-bold text-slate-900">{q.score}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className={`h-full rounded-full ${q.color}`} style={{ width: `${q.score}%` }} />
            </div>
            <p className="text-[11px] text-slate-500">{q.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
