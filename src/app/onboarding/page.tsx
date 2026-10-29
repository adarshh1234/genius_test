'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Badge, Progress } from '@/components/ui';
import { onboardingService } from '@/lib/api';
import { StudentProfileData } from '@/types';
import { calculateAge, getAgeTier } from '@/lib/utils';
import {
  User,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Heart,
  Save,
  HelpCircle,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState<StudentProfileData>({
    fullName: 'Aarav Sharma',
    dob: '2010-04-15',
    gender: 'Male',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    language: 'English',
    schoolCollege: 'Delhi Public School, R.K. Puram',
    gradeYear: 'Grade 10',
    currentCourse: 'Secondary Education (CBSE)',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Applications', 'English'],
    academicPerformance: 'Top 10% (Above 90%)',
    previousQualifications: 'Class 9 Distinction',
    interests: ['Artificial Intelligence', 'Competitive Mathematics', 'Robotics', 'Chess'],
    activities: ['Debate Club', 'Science Olympiad', 'Badminton'],
    careerGoals: 'AI Systems Architect or Quantitative Researcher',
    guardianName: 'Rajesh Sharma',
    guardianEmail: 'rajesh.sharma@example.com',
    guardianPhone: '+91 98765 43210',
    guardianRelationship: 'Father',
    generalConsent: true,
    parentConsentForMinor: true,
    optionalDmitConsent: false,
    selectedTrack: 'standard',
  });

  const calculatedAge = calculateAge(formData.dob);
  const isMinor = calculatedAge < 18;
  const detectedTier = getAgeTier(calculatedAge);

  useEffect(() => {
    onboardingService.getDraft().then((draft) => {
      if (draft) {
        setFormData((prev) => ({ ...prev, ...draft }));
      }
    });
  }, []);

  const handleNext = () => {
    onboardingService.saveDraft(formData);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onboardingService.submitOnboarding(formData).then(() => {
        router.push('/assessments');
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepsMeta = [
    { num: 1, title: 'Personal Profile' },
    { num: 2, title: 'Academics' },
    { num: 3, title: 'Interests & Goals' },
    { num: 4, title: 'Parent/Guardian' },
    { num: 5, title: 'Consent & Privacy' },
    { num: 6, title: 'Track Readiness' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header & Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Step {currentStep} of {totalSteps}: {stepsMeta[currentStep - 1].title}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {Math.round((currentStep / totalSteps) * 100)}% Completed
            </span>
          </div>

          <Progress value={(currentStep / totalSteps) * 100} indicatorColor="bg-gradient-to-r from-indigo-600 to-purple-600" />

          {/* Stepper Dots */}
          <div className="grid grid-cols-6 gap-2 pt-2">
            {stepsMeta.map((s) => (
              <div
                key={s.num}
                className={`text-[10px] text-center font-bold pb-1 border-b-2 transition-colors ${
                  s.num === currentStep
                    ? 'border-indigo-600 text-indigo-600'
                    : s.num < currentStep
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-slate-200 text-slate-400'
                }`}
              >
                {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-xl rounded-2xl">
          {/* STEP 1: PERSONAL PROFILE */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900">Step 1: Participant Identity</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Accurate age calculation allows the engine to calibrate appropriate question formats.
                </p>
              </div>

              <Input
                label="Full Name"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                  <span className="text-[11px] text-indigo-600 font-semibold mt-1 block">
                    Calculated Age: {calculateAge(formData.dob)} years • Tier: {detectedTier.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Gender Identity
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
                <Input
                  label="State / Province"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Preferred Testing Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: ACADEMIC INFORMATION */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900">Step 2: Educational Context</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Helps contextualize aptitude benchmarks against peer norms.
                </p>
              </div>

              <Input
                label="Current School, College or University"
                value={formData.schoolCollege}
                onChange={(e) => setFormData({ ...formData, schoolCollege: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Current Grade or Collegiate Year"
                  value={formData.gradeYear}
                  onChange={(e) => setFormData({ ...formData, gradeYear: e.target.value })}
                />
                <Input
                  label="Program or Academic Stream"
                  value={formData.currentCourse}
                  onChange={(e) => setFormData({ ...formData, currentCourse: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Self-Reported Performance Band
                  </label>
                  <select
                    value={formData.academicPerformance}
                    onChange={(e) => setFormData({ ...formData, academicPerformance: e.target.value })}
                    className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  >
                    <option>Top 10% (Above 90% / GPA 3.8+)</option>
                    <option>Top 25% (80% - 90% / GPA 3.5+)</option>
                    <option>Average (65% - 80% / GPA 3.0+)</option>
                    <option>Developing / Non-Traditional Track</option>
                  </select>
                </div>

                <Input
                  label="Previous Qualification / Honors"
                  value={formData.previousQualifications}
                  onChange={(e) => setFormData({ ...formData, previousQualifications: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 3: INTERESTS & GOALS */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900">Step 3: Aspirations & Activities</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Intrinsic interests feed directly into the Holland RIASEC comparison engine.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Core Passions & Intellectual Interests
                </label>
                <input
                  type="text"
                  placeholder="e.g. Artificial Intelligence, Neuroscience, Creative Writing, Economics"
                  value={formData.interests.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interests: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Extracurricular Activities & Hobbies
                </label>
                <input
                  type="text"
                  placeholder="e.g. Science Olympiad, Robotics, Debate, Football"
                  value={formData.activities.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      activities: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <Input
                label="Existing Career Goals or Hypotheses"
                placeholder="What careers or disciplines are you currently curious about?"
                value={formData.careerGoals}
                onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
              />
            </div>
          )}

          {/* STEP 4: PARENT / GUARDIAN */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Step 4: Parent / Guardian Verification</h2>
                  {isMinor ? <Badge variant="warning">Required for Minors (&lt;18y)</Badge> : <Badge variant="default">Optional for Adults</Badge>}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {isMinor
                    ? 'Because the candidate is under 18, parental contact details are legally required.'
                    : 'Candidate is an adult (18+); guardian information is optional.'}
                </p>
              </div>

              <Input
                label="Guardian Full Name"
                required={isMinor}
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Guardian Email"
                  type="email"
                  required={isMinor}
                  value={formData.guardianEmail}
                  onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                />
                <Input
                  label="Guardian Phone"
                  required={isMinor}
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Relationship to Candidate
                </label>
                <select
                  value={formData.guardianRelationship}
                  onChange={(e) => setFormData({ ...formData, guardianRelationship: e.target.value })}
                  className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                >
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Legal Guardian</option>
                  <option>School Counselor Representative</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: CONSENT & ETHICAL PRIVACY */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900">Step 5: Informed Consent & Ethics</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Clear, independent consent declarations ensuring full transparency.
                </p>
              </div>

              <div className="space-y-4">
                {/* General Consent */}
                <Card className="p-4 bg-slate-50 border border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.generalConsent}
                      onChange={(e) => setFormData({ ...formData, generalConsent: e.target.checked })}
                      className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="text-xs text-slate-700 space-y-1">
                      <span className="font-bold block text-slate-900">General Psychometric Assessment Consent</span>
                      <p className="text-slate-600 leading-relaxed">
                        I authorize Genius Test by GeniusPie.com to administer standard cognitive, aptitude, personality, and career interest questionnaires and generate advisory reports for personal educational planning.
                      </p>
                    </div>
                  </label>
                </Card>

                {/* Parent Consent (if minor) */}
                {isMinor && (
                  <Card className="p-4 bg-amber-50/60 border border-amber-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.parentConsentForMinor}
                        onChange={(e) => setFormData({ ...formData, parentConsentForMinor: e.target.checked })}
                        className="mt-1 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                      />
                      <div className="text-xs text-slate-700 space-y-1">
                        <span className="font-bold block text-amber-900">Parent / Guardian Minor Authorization</span>
                        <p className="text-amber-800 leading-relaxed">
                          As the parent or legal guardian, I explicitly authorize my minor child to participate in the assessment, receive counseling recommendations, and have access provided through the Parent Dashboard.
                        </p>
                      </div>
                    </label>
                  </Card>
                )}

                {/* Separate Optional DMIT Consent */}
                <Card className="p-4 bg-purple-50/60 border border-purple-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.optionalDmitConsent}
                      onChange={(e) => setFormData({ ...formData, optionalDmitConsent: e.target.checked })}
                      className="mt-1 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-purple-900">Optional AI-DMIT Biometric Consent</span>
                        <Badge variant="purple">Optional</Badge>
                      </div>
                      <p className="text-purple-800 leading-relaxed">
                        I understand that DMIT is an observational dermatoglyphic screening tool. Participation is completely voluntary. I consent to client-side camera pattern analysis. No raw biometric images will be shared or sold.
                      </p>
                    </div>
                  </label>
                </Card>
              </div>
            </div>
          )}

          {/* STEP 6: ASSESSMENT READINESS */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900">Step 6: Assessment Readiness</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Review your profile summary and confirm your selected assessment track.
                </p>
              </div>

              {/* Review Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Candidate</span>
                  <span className="font-semibold text-slate-900">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Age / Cohort</span>
                  <span className="font-semibold text-indigo-600">
                    {calculateAge(formData.dob)}y ({detectedTier})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Academic Stage</span>
                  <span className="font-semibold text-slate-900">{formData.gradeYear}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">DMIT Track</span>
                  <span className="font-semibold text-purple-600">
                    {formData.optionalDmitConsent ? 'Enabled' : 'Standard (Non-DMIT)'}
                  </span>
                </div>
              </div>

              {/* Track Selection Confirmation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div
                  onClick={() => setFormData({ ...formData, selectedTrack: 'standard' })}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.selectedTrack === 'standard'
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900">Standard Psychometric Track</span>
                    {formData.selectedTrack === 'standard' && <CheckCircle2 className="h-4 w-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Full 7-module battery: Raven Fluid IQ, Aptitude, Big Five, DISC, RIASEC, EQ, Stress.
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, selectedTrack: 'premium_dmit', optionalDmitConsent: true })}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.selectedTrack === 'premium_dmit'
                      ? 'border-purple-600 bg-purple-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900">Integrated AI-DMIT Track</span>
                    {formData.selectedTrack === 'premium_dmit' && <CheckCircle2 className="h-4 w-4 text-purple-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Includes 7 core batteries + guided 10-finger observational ridge pattern scan.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Ready to start! You can pause, save draft, and resume any battery at any time.</span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" size="sm" onClick={handlePrev}>
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                <span>Previous Step</span>
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  onboardingService.saveDraft(formData);
                  alert('Draft state saved locally.');
                }}
              >
                <Save className="h-3.5 w-3.5 mr-1 text-slate-400" />
                <span>Save Draft</span>
              </Button>

              <Button type="button" variant="gradient" size="md" onClick={handleNext} className="font-bold">
                <span>{currentStep === totalSteps ? 'Launch Assessment' : 'Next Step'}</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
