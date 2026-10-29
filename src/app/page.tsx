'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@/components/ui';
import {
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  GraduationCap,
  Building2,
  Compass,
  ScanLine,
  ChevronRight,
  HelpCircle,
  Cpu,
  Boxes,
  Fingerprint,
  HeartHandshake,
  ShieldAlert,
  BarChart3,
  Award,
  Globe,
  Layers,
  Clock,
  FileText,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { mockPricingTiers, mockComprehensiveResults } from '@/lib/mock/data';
import {
  InnateVsAcquiredChart,
  AptitudeBarChart,
  BigFiveRadar,
  HollandRIASECChart,
} from '@/components/charts/AssessmentCharts';

export default function LandingPage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [activeBenefitTab, setActiveBenefitTab] = useState<'students' | 'parents' | 'schools' | 'counselors'>('students');
  const [activeAgeTab, setActiveAgeTab] = useState<'early' | 'academic' | 'career' | 'longevity'>('academic');

  const ageData = {
    early: {
      title: 'Ages 3–7: Early Stage Discovery',
      badge: 'Playful & Visual-First',
      desc: 'Nurture cognitive curiosity through gamified visual shapes, friendly animal characters (Pie the Owl), pattern sequences, and parent-guided prompts. Zero stress, 100% celebration.',
      highlights: ['Visual shape matching & spatial curiosity', 'Parent-guided observational input', 'Celebratory completion badge'],
      demoLink: '/assessments?tier=early',
    },
    academic: {
      title: 'Ages 8–18: Academic & Stream Guidance',
      badge: 'Stream & Course Selection',
      desc: 'Pinpoint cognitive strengths, abstract logical problem-solving, and subject affinities to guide high school stream selection (Science, Commerce, Arts) and collegiate preparation.',
      highlights: ['Raven Matrix non-verbal reasoning', 'Quantitative, verbal & spatial aptitude', 'Holland RIASEC academic alignment'],
      demoLink: '/assessments?tier=academic',
    },
    career: {
      title: 'Ages 19–55: Professional & Executive Transitions',
      badge: 'Strategic Career Optimization',
      desc: 'Identify leadership traits, behavioral quadrant (DISC), emotional intelligence, and work style to unlock high-impact career pivots, promotion pathways, and executive potential.',
      highlights: ['DISC communication and leadership style', 'Emotional EQ in organizational conflict', 'Targeted skill-gap roadmap for 300+ careers'],
      demoLink: '/assessments?tier=career',
    },
    longevity: {
      title: 'Ages 56–90: Lifelong Cognitive Vitality',
      badge: 'Cognitive Health & Engagement',
      desc: 'Designed with high contrast, larger typography, and simplified navigation. Measures cognitive vitality, memory patterns, and intellectual engagement for fulfilling post-career mastery.',
      highlights: ['High-contrast distraction-free interface', 'Fluid reasoning preservation insights', 'Meaningful mentorship & learning guidance'],
      demoLink: '/assessments?tier=longevity',
    },
  };

  const faqs = [
    {
      q: 'How does Genius Test differ from a standard online IQ test?',
      a: 'Unlike generic one-dimensional quizzes, Genius Test is an age-adaptive 7-dimensional psychometric suite combining Raven Progressive Matrices, multi-aptitude diagnostics, Big Five personality, DISC behavioral mapping, Holland RIASEC interests, and Emotional Intelligence (EQ). It triangulates innate potential with acquired skills to deliver actionable career and life roadmaps.',
    },
    {
      q: 'Is the DMIT (fingerprint) component mandatory?',
      a: 'No. The DMIT component is strictly optional. We provide an independent Non-DMIT Psychometric Track that is 100% complete and scientifically validated on its own. If you choose the optional DMIT track, dermatoglyphic ridge patterns are analyzed purely as supplementary observational screening.',
    },
    {
      q: 'How is user privacy and biometric safety protected?',
      a: 'GeniusPie follows strict zero-resale and child protection principles (FERPA & GDPR alignment). No raw biometric images are sold or shared with third parties. All assessments for minors require explicit parental or guardian verification.',
    },
    {
      q: 'Can schools and educational institutions conduct batch assessments?',
      a: 'Yes. Our Institutional Baseline track allows schools and colleges to administer large-scale cohort assessments with a dedicated Institution Admin dashboard, student roster management, CSV exports, and counselor assignment.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
                <span>Age-Adaptive Platform for Ages 3 to 90</span>
                <span className="text-slate-300">|</span>
                <span className="font-bold text-slate-700">by GeniusPie.com</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Discover Your True Potential Across{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                  Every Stage of Life
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                A multi-dimensional psychometric, cognitive aptitude, personality, and career discovery platform.
                Triangulating fluid intelligence, Big Five, DISC, and Holland RIASEC with an optional ethical AI-DMIT track.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/onboarding" className="w-full sm:w-auto">
                  <Button variant="gradient" size="lg" className="w-full sm:w-auto font-bold text-base shadow-lg shadow-indigo-600/20">
                    <span>Start Your Genius Test</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>

                <Link href="/reports/view/usr-student-1" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold text-slate-700">
                    <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>View Sample Report</span>
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">45,000+</p>
                  <p className="text-xs text-slate-500 font-medium">Standardized Norms</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-indigo-600">8 Dimensions</p>
                  <p className="text-xs text-slate-500 font-medium">Holistic Evaluation</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">300+ Careers</p>
                  <p className="text-xs text-slate-500 font-medium">Empirical Matching</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl" />
                <Card className="relative bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl p-6 rounded-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                        AS
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Aarav Sharma (16y)</h4>
                        <p className="text-xs text-slate-500">Grade 10 • Academic Focus</p>
                      </div>
                    </div>
                    <Badge variant="success">92nd Percentile</Badge>
                  </div>

                  <div className="py-4 space-y-3">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Overall Battery Completion</span>
                      <span className="text-indigo-600">7 of 8 Modules (88%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full w-[88%]" />
                    </div>

                    {/* Mini Result Chips */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Fluid IQ (Raven)</span>
                        <span className="text-sm font-black text-slate-900">Score 128</span>
                        <span className="text-[10px] text-emerald-600 font-semibold block">Superior</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Holland RIASEC</span>
                        <span className="text-sm font-black text-indigo-600">I-E-R Code</span>
                        <span className="text-[10px] text-slate-500 font-medium block">Investigative</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">DISC Profile</span>
                        <span className="text-sm font-black text-blue-600">Conscientious (C)</span>
                        <span className="text-[10px] text-slate-500 font-medium block">Precision-led</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Top Career Match</span>
                        <span className="text-sm font-black text-purple-600">AI Architect</span>
                        <span className="text-[10px] text-emerald-600 font-semibold block">96% Fit</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href="/dashboard/student" className="block">
                      <Button variant="soft" className="w-full text-xs font-semibold py-2.5">
                        <span>Explore Full Student Dashboard</span>
                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          HOW IT WORKS (4 STEPS)
          ========================================== */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="purple">Scientifically Grounded</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              How Genius Test Works
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              A systematic 4-phase framework translating multi-dimensional psychological evaluation into clear, actionable developmental steps.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Age-Adaptive Intake',
                desc: 'Intake wizard calibrates cognitive questions, visual complexity, and vocabulary tailored to user age (ages 3–7, 8–18, 19–55, or 56–90).',
                icon: <Users className="h-6 w-6 text-indigo-600" />,
              },
              {
                step: '02',
                title: 'Multi-Battery Assessment',
                desc: 'Engage with non-verbal Raven matrix questions, quantitative aptitude, Big Five (OCEAN), DISC behavioral styles, and EQ dilemmas.',
                icon: <Brain className="h-6 w-6 text-purple-600" />,
              },
              {
                step: '03',
                title: 'Synthesis & Triangulation',
                desc: 'Empirical scoring profiles weight innate cognitive capability with acquired skills, emotional stability, and optional DMIT ridge patterns.',
                icon: <Layers className="h-6 w-6 text-blue-600" />,
              },
              {
                step: '04',
                title: 'Career & Life Roadmap',
                desc: 'Access a 19-section executive report featuring 300+ career match alignments, course prerequisites, and a 12-month development roadmap.',
                icon: <Compass className="h-6 w-6 text-emerald-600" />,
              },
            ].map((s) => (
              <div key={s.step} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
                <span className="text-3xl font-black text-slate-300 block mb-2">{s.step}</span>
                <div className="mb-4">{s.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          8 ASSESSMENT CATEGORIES
          ========================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge variant="blue">Holistic Coverage</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-2">
                The 8 Assessment Dimensions
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Every dimension is measured through standardized psychometric formats or ethical observational screeners.
              </p>
            </div>
            <Link href="/assessments" className="mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="font-semibold text-xs">
                <span>View All 8 Modules</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Raven Fluid Intelligence', icon: <Boxes className="h-5 w-5 text-indigo-600" />, desc: '3x3 Visual matrix reasoning, non-verbal pattern deduction free of language or cultural bias.' },
              { title: 'Multi-Aptitude Battery', icon: <Cpu className="h-5 w-5 text-purple-600" />, desc: 'Numerical calculations, verbal analogy, abstract logic, spatial rotation, and mechanical intuition.' },
              { title: 'Big Five Personality', icon: <Fingerprint className="h-5 w-5 text-blue-600" />, desc: 'Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (OCEAN).' },
              { title: 'DISC Behavioral Quadrant', icon: <Compass className="h-5 w-5 text-amber-600" />, desc: 'Dominance, Influence, Steadiness, and Conscientiousness under work stress vs. normal states.' },
              { title: 'Holland RIASEC Interests', icon: <Sparkles className="h-5 w-5 text-rose-600" />, desc: 'Realistic, Investigative, Artistic, Social, Enterprising, and Conventional vocational themes.' },
              { title: 'Emotional Intelligence (EQ)', icon: <HeartHandshake className="h-5 w-5 text-pink-600" />, desc: 'Self-awareness, emotional regulation, empathy, and constructive interpersonal decision making.' },
              { title: 'Stress Resilience', icon: <ShieldAlert className="h-5 w-5 text-teal-600" />, desc: 'Decision-making under pressure, cognitive endurance, and healthy psychological coping mechanisms.' },
              { title: 'Optional AI-DMIT Component', icon: <ScanLine className="h-5 w-5 text-emerald-600" />, desc: 'Voluntary dermatoglyphic ridge pattern screening for innate learning style correlation.', isOptional: true },
            ].map((m, idx) => (
              <Card key={idx} className="p-5 hover:border-indigo-300 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100">{m.icon}</div>
                  {m.isOptional ? <Badge variant="warning">Optional</Badge> : <Badge variant="default">Core</Badge>}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{m.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          AGE-ADAPTIVE PATHWAYS
          ========================================== */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <Badge variant="purple">Adaptive Intelligence</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Tailored for Every Stage of Life (Ages 3–90)
            </h2>
            <p className="text-slate-600 text-sm">
              One size does not fit all. Genius Test dynamically shifts interface design, question formats, and recommendations based on the participant’s lifecycle phase.
            </p>
          </div>

          {/* Age Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {(['early', 'academic', 'career', 'longevity'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveAgeTab(key)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeAgeTab === key
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {key === 'early' && 'Ages 3–7 (Early Stage)'}
                {key === 'academic' && 'Ages 8–18 (Academic Focus)'}
                {key === 'career' && 'Ages 19–55 (Career Growth)'}
                {key === 'longevity' && 'Ages 56–90 (Lifelong Vitality)'}
              </button>
            ))}
          </div>

          {/* Active Age Content Card */}
          <Card className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-slate-50 to-indigo-50/30 border border-indigo-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
              <div>
                <Badge variant="purple" className="mb-2">{ageData[activeAgeTab].badge}</Badge>
                <h3 className="text-2xl font-bold text-slate-900">{ageData[activeAgeTab].title}</h3>
                <p className="text-sm text-slate-600 mt-2 max-w-xl">{ageData[activeAgeTab].desc}</p>
              </div>
              <Link href={ageData[activeAgeTab].demoLink}>
                <Button variant="primary" size="md">
                  <span>Experience This Tier</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {ageData[activeAgeTab].highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white p-4 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-xs font-medium text-slate-800">{h}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ==========================================
          NON-DMIT VS. OPTIONAL DMIT COMPARISON
          ========================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <Badge variant="blue">Rigor & Scientific Ethics</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Transparent Pathway Comparison
            </h2>
            <p className="text-slate-600 text-sm">
              We uphold uncompromising ethical standards. You decide whether to complete the pure psychometric assessment or opt into our supplementary AI-DMIT capture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Psychometric */}
            <Card className="p-6 bg-white border-2 border-slate-200 hover:border-indigo-400 transition-all">
              <Badge variant="default" className="mb-3">Standard Psychometric Track</Badge>
              <h3 className="text-xl font-bold text-slate-900 mb-2">100% Psychometric & Cognitive</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Ideal for participants seeking gold-standard academic and vocational psychometrics without any biometric data collection.
              </p>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Raven Progressive Matrices (Fluid Intelligence)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Multi-Aptitude Battery (Numerical, Verbal, Spatial)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Big Five (OCEAN) Personality & DISC Quadrant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Holland RIASEC Career Affinity & EQ Battery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Zero biometric scanning or camera requirement</span>
                </li>
              </ul>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link href="/onboarding?track=standard">
                  <Button variant="outline" className="w-full text-xs font-semibold">
                    Select Standard Track
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Premium Integrated AI-DMIT */}
            <Card className="p-6 bg-gradient-to-b from-indigo-50/50 to-white border-2 border-indigo-600 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="purple">Premium Integrated Track</Badge>
                <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                  Multi-Modal
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Integrated Psychometrics + AI-DMIT</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Combines complete psychometrics with optional dermatoglyphic observational correlation for multi-method concordance.
              </p>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Includes all 7 core psychometric batteries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Client-side guided 10-finger pattern capture</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Ridge density & ATD angle learning style analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Explicit separate consent with strict zero-resale privacy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>1-on-1 certified counselor debrief session</span>
                </li>
              </ul>
              <div className="mt-8 pt-4 border-t border-indigo-100">
                <Link href="/onboarding?track=premium_dmit">
                  <Button variant="gradient" className="w-full text-xs font-semibold">
                    Select Integrated Track
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ==========================================
          INTERACTIVE RESULTS PREVIEW
          ========================================== */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="purple">Actionable Analytics</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Sample Interactive Results Dashboard
            </h2>
            <p className="text-slate-600 text-sm">
              Here is how participant results are rendered in real-time using typed psychometric data models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InnateVsAcquiredChart data={mockComprehensiveResults.innateVsAcquired} />
            <AptitudeBarChart aptitude={mockComprehensiveResults.aptitude} />
            <BigFiveRadar ocean={mockComprehensiveResults.bigFive} />
            <HollandRIASECChart riasec={mockComprehensiveResults.riasec} />
          </div>

          <div className="text-center mt-10">
            <Link href="/dashboard/student/results">
              <Button variant="gradient" size="md" className="font-semibold text-xs">
                <span>View Full Interactive Analytics & Career Matches</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          STAKEHOLDER BENEFITS TABS
          ========================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <Badge variant="blue">Value for All</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Empowering Students, Parents, Schools & Counselors
            </h2>
          </div>

          <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {[
              { id: 'students', label: 'For Students', icon: <GraduationCap className="h-4 w-4" /> },
              { id: 'parents', label: 'For Parents', icon: <Users className="h-4 w-4" /> },
              { id: 'schools', label: 'For Schools & Colleges', icon: <Building2 className="h-4 w-4" /> },
              { id: 'counselors', label: 'For Counselors', icon: <Compass className="h-4 w-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveBenefitTab(tab.id as 'students' | 'parents' | 'schools' | 'counselors')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeBenefitTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            {activeBenefitTab === 'students' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Clarity for Academic & Career Crossroads</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Eliminate guesswork in course and career choices. Understand how your innate fluid problem-solving style connects directly to emerging global careers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Clear stream recommendations (Science, Commerce, Tech, Humanities)
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ 300+ career match database with Indian & global salary bands
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ 12-Month actionable skill development milestone roadmap
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Objective self-awareness of pressure handling and resilience
                  </div>
                </div>
              </div>
            )}

            {activeBenefitTab === 'parents' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Holistic Understanding of Your Child’s Blueprint</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid imposing mismatched career expectations. Discover your child’s natural learning styles, temperament, and emotional resilience to nurture them with empathy.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Child profile dashboard with multi-sibling switching
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Non-clinical parenting guidance tailored to DISC style
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Transparent parental consent & minor privacy protection
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Direct access to counselor debrief notes & milestones
                  </div>
                </div>
              </div>
            )}

            {activeBenefitTab === 'schools' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Institution-Wide Cognitive & Aptitude Profiling</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equip your educational institution with scalable cohort screening. Deliver institutional reports, measure student distribution, and support teachers in personalized pedagogy.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Affordable baseline cohort tier (₹49 / $1.99 per student)
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Batch enrollment & automated student card generation
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ CSV exports and institutional percentile analytics
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Seamless counselor workflow and assignment tools
                  </div>
                </div>
              </div>
            )}

            {activeBenefitTab === 'counselors' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Empirical Backing for Counseling Dialogues</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transform student advisory sessions with concrete psychometric evidence. Spend less time diagnosing and more time mentoring toward realistic pathways.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Assigned student roster with risk and progress filters
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Integrated private counselor note editor
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Standardized 19-section executive psychological report
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    ✓ Triangulated scoring configuration selection
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          TRANSPARENT PRICING SECTION
          ========================================== */}
      <section className="py-20 bg-white border-b border-slate-200/60" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <Badge variant="purple">Proposed Pricing Plans</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Accessible, Transparent Pricing
            </h2>
            <p className="text-slate-600 text-sm">
              Values based on specification documents. (Frontend demonstration: No live payments processed).
            </p>

            {/* Currency Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 mt-2">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  currency === 'INR' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                INR (₹) India
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  currency === 'USD' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                USD ($) International
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockPricingTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`p-6 flex flex-col justify-between ${
                  tier.highlighted
                    ? 'border-2 border-indigo-600 shadow-xl relative bg-white'
                    : 'border border-slate-200 bg-slate-50/50'
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
                    Proposed presentation pricing
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FAQ ACCORDION
          ========================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <Badge variant="default">Got Questions?</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Card key={i} className="p-5 bg-white border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>{f.q}</span>
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed pl-6">{f.a}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-xs text-slate-500">
              Have specific questions about school licensing or counselor onboarding?{' '}
              <Link href="/contact" className="text-indigo-600 font-bold hover:underline">
                Contact our advisory team.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          FINAL CTA BANNER
          ========================================== */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Discover Your Psychological & Career Blueprint?
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students, professionals, and institutions using Genius Test to navigate education and career choices with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/onboarding">
              <Button variant="secondary" size="lg" className="bg-white text-slate-950 hover:bg-slate-100 font-bold shadow-lg">
                <Sparkles className="h-4 w-4 text-indigo-600 mr-2" />
                <span>Start Your Genius Test</span>
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 font-semibold">
                <span>Learn How It Works</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
