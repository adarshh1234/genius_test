'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Progress } from '@/components/ui';
import {
  ScanLine,
  Camera,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  Sliders,
  Check,
} from 'lucide-react';

interface FingerItem {
  id: string;
  hand: 'left' | 'right';
  name: string;
  code: string;
  status: 'pending' | 'captured' | 'analyzing';
  pattern?: 'Whorl' | 'Ulnar Loop' | 'Radial Loop' | 'Arch';
  qualityScore?: number;
  ridgeDensity?: number;
}

export default function DmitBiometricPage() {
  const [consentGranted, setConsentGranted] = useState(false);
  const [selectedHand, setSelectedHand] = useState<'left' | 'right'>('left');
  const [activeFingerId, setActiveFingerId] = useState<string>('L1');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isSimulatingProcessing, setIsSimulatingProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [fingers, setFingers] = useState<FingerItem[]>([
    { id: 'L1', hand: 'left', name: 'Thumb', code: 'L1', status: 'captured', pattern: 'Whorl', qualityScore: 94, ridgeDensity: 19 },
    { id: 'L2', hand: 'left', name: 'Index', code: 'L2', status: 'captured', pattern: 'Radial Loop', qualityScore: 88, ridgeDensity: 18 },
    { id: 'L3', hand: 'left', name: 'Middle', code: 'L3', status: 'pending' },
    { id: 'L4', hand: 'left', name: 'Ring', code: 'L4', status: 'pending' },
    { id: 'L5', hand: 'left', name: 'Little', code: 'L5', status: 'pending' },
    { id: 'R1', hand: 'right', name: 'Thumb', code: 'R1', status: 'captured', pattern: 'Whorl', qualityScore: 96, ridgeDensity: 20 },
    { id: 'R2', hand: 'right', name: 'Index', code: 'R2', status: 'captured', pattern: 'Whorl', qualityScore: 92, ridgeDensity: 19 },
    { id: 'R3', hand: 'right', name: 'Middle', code: 'R3', status: 'pending' },
    { id: 'R4', hand: 'right', name: 'Ring', code: 'R4', status: 'pending' },
    { id: 'R5', hand: 'right', name: 'Little', code: 'R5', status: 'pending' },
  ]);

  // Request camera or fallback simulator
  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } else {
        setCameraActive(true); // Fallback to simulation preview
      }
    } catch {
      // Permission denied or virtual environment
      setCameraActive(true); // Graceful simulation fallback
    }
  };

  const handleCapture = () => {
    setIsSimulatingProcessing(true);

    setTimeout(() => {
      setFingers((prev) =>
        prev.map((f) =>
          f.id === activeFingerId
            ? {
                ...f,
                status: 'captured',
                pattern: 'Whorl',
                qualityScore: 92,
                ridgeDensity: 19,
              }
            : f
        )
      );
      setIsSimulatingProcessing(false);

      // Auto advance to next pending finger
      const nextPending = fingers.find((f) => f.id !== activeFingerId && f.status === 'pending');
      if (nextPending) {
        setActiveFingerId(nextPending.id);
        setSelectedHand(nextPending.hand);
      }
    }, 1200);
  };

  const currentFinger = fingers.find((f) => f.id === activeFingerId);
  const handFingers = fingers.filter((f) => f.hand === selectedHand);
  const capturedCount = fingers.filter((f) => f.status === 'captured').length;
  const totalFingers = fingers.length;

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Mandatory Ethics Disclaimer */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="purple">Supplementary Module</Badge>
            <span className="text-xs font-semibold text-slate-500">• 100% Voluntary & Optional</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Optional AI-DMIT Biometric Capture Interface
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Dermatoglyphics Multiple Intelligence Test (DMIT) observational screening. Used strictly for multi-method correlation with core psychometrics.
          </p>
        </div>

        {/* Ethical Notice Alert */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-900 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-indigo-950">
            <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>Ethical Transparency & Non-Determinism Disclaimer</span>
          </div>
          <p className="leading-relaxed text-indigo-800">
            DMIT is an observational developmental screening technique. Scientific consensus confirms that dermal ridge patterns do NOT deterministically predict intelligence or career destiny. All patterns are processed locally; raw fingerprint scans are never sold, published, or stored on public servers.
          </p>
        </div>

        {/* CONSENT GATE IF NOT GRANTED */}
        {!consentGranted ? (
          <Card className="p-8 bg-white border border-slate-200 shadow-md text-center space-y-6 max-w-2xl mx-auto rounded-3xl">
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <ScanLine className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Separate Voluntary Biometric Consent</h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
                Before activating your camera to scan ridge patterns, please confirm your informed consent. You can skip this module entirely without penalty; your standard psychometric report remains 100% complete.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/assessments">
                <Button variant="outline" size="md">
                  Skip & Return to Assessments
                </Button>
              </Link>
              <Button
                variant="gradient"
                size="md"
                onClick={() => {
                  setConsentGranted(true);
                  handleStartCamera();
                }}
                className="font-bold shadow-md"
              >
                <span>Accept Voluntary Consent & Open Camera</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        ) : (
          /* ACTIVE CAPTURE WORKFLOW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Hands & Finger Selection */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 bg-white border border-slate-200 shadow-xs rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">Fingerprint Queue ({capturedCount}/{totalFingers})</h2>
                  <Badge variant="purple">{Math.round((capturedCount / totalFingers) * 100)}% Complete</Badge>
                </div>

                {/* Hand Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setSelectedHand('left')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      selectedHand === 'left' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Left Hand (L1 - L5)
                  </button>
                  <button
                    onClick={() => setSelectedHand('right')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      selectedHand === 'right' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Right Hand (R1 - R5)
                  </button>
                </div>

                {/* 5 Finger Items for Active Hand */}
                <div className="space-y-2 pt-2">
                  {handFingers.map((f) => {
                    const isActive = f.id === activeFingerId;
                    const isCaptured = f.status === 'captured';

                    return (
                      <div
                        key={f.id}
                        onClick={() => setActiveFingerId(f.id)}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isActive
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isCaptured ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {f.code}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{f.name}</span>
                            <span className="text-[10px] text-slate-500 block">
                              {isCaptured ? `${f.pattern} • Quality: ${f.qualityScore}%` : 'Pending capture'}
                            </span>
                          </div>
                        </div>

                        {isCaptured ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-amber-400" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Quality Standards Card */}
              <Card className="p-4 bg-slate-100/80 border border-slate-200 text-xs text-slate-600 space-y-2">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-indigo-600" />
                  Capture Guidelines
                </span>
                <p className="leading-relaxed text-[11px]">
                  Position fingertip firmly centered within the oval guide under bright, non-glare lighting. Ensure the delta triradius points are clearly visible.
                </p>
              </Card>
            </div>

            {/* Right Column: Live Camera Simulator & Processing */}
            <div className="lg:col-span-7">
              <Card className="p-6 bg-white border border-slate-200 shadow-md rounded-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Scanning: {currentFinger?.name} ({currentFinger?.code})
                    </h3>
                    <p className="text-xs text-slate-500">Live optical inspection & pattern classification</p>
                  </div>
                  {currentFinger?.status === 'captured' && (
                    <Badge variant="success">Pattern Confirmed</Badge>
                  )}
                </div>

                {/* Viewfinder Canvas / Camera Feed */}
                <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center overflow-hidden border-2 border-slate-800">
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                  {/* Fingerprint Oval Reticle */}
                  <div
                    className={`relative z-10 h-44 w-32 rounded-[50%] border-2 transition-all flex flex-col items-center justify-center ${
                      isSimulatingProcessing
                        ? 'border-indigo-400 shadow-lg shadow-indigo-500/50 bg-indigo-950/40'
                        : currentFinger?.status === 'captured'
                        ? 'border-emerald-400 shadow-lg shadow-emerald-500/30 bg-emerald-950/20'
                        : 'border-white/60 shadow-md bg-white/5'
                    }`}
                  >
                    <ScanLine
                      className={`h-16 w-16 transition-all ${
                        isSimulatingProcessing
                          ? 'text-indigo-400 animate-bounce'
                          : currentFinger?.status === 'captured'
                          ? 'text-emerald-400'
                          : 'text-white/40'
                      }`}
                    />
                    <span className="text-[10px] text-white/80 font-mono font-bold mt-2">
                      {isSimulatingProcessing
                        ? 'CLASSIFYING...'
                        : currentFinger?.status === 'captured'
                        ? currentFinger.pattern?.toUpperCase()
                        : 'ALIGN FINGERTIP'}
                    </span>
                  </div>

                  {/* Lighting Quality Indicators */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                    <span>Lighting: Optimal (96%)</span>
                    <span>Contrast: High (91%)</span>
                    <span>Ridge Focus: Sharp</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button
                      variant="gradient"
                      size="lg"
                      className="flex-1 font-bold shadow-md"
                      onClick={handleCapture}
                      isLoading={isSimulatingProcessing}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      <span>{currentFinger?.status === 'captured' ? 'Retake Capture' : 'Capture & Classify'}</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        const nextPending = fingers.find((f) => f.status === 'pending');
                        if (nextPending) {
                          setActiveFingerId(nextPending.id);
                          setSelectedHand(nextPending.hand);
                        }
                      }}
                      className="text-xs"
                    >
                      <span>Skip Finger</span>
                    </Button>
                  </div>

                  {capturedCount >= 4 && (
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs text-slate-600">
                        {capturedCount} of 10 patterns recorded. Sufficient for triangulation!
                      </div>
                      <Link href="/dashboard/student/results">
                        <Button variant="primary" size="sm" className="font-bold">
                          <span>Finalize & View Triangulated Report</span>
                          <ArrowRight className="h-4 w-4 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
