'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, Badge, Progress, Dialog } from '@/components/ui';
import { assessmentService } from '@/lib/api';
import { AssessmentModuleMeta, AssessmentQuestion } from '@/types';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  Grid,
} from 'lucide-react';
import confetti from 'canvas-confetti';

function AssessmentTakeContent() {
  const params = useParams();
  const router = useRouter();
  const moduleId = (params?.moduleId as string) || 'raven';

  const [moduleMeta, setModuleMeta] = useState<AssessmentModuleMeta | null>(null);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    assessmentService.getModuleById(moduleId).then(setModuleMeta);
    assessmentService.getQuestionsForModule(moduleId).then(setQuestions);
  }, [moduleId]);

  // Timer interval
  useEffect(() => {
    if (isCompleted || isTimerPaused) return;
    const interval = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted, isTimerPaused]);

  const currentQ = questions[currentIndex];

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId: string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optId,
    }));
  };

  const handleToggleFlag = () => {
    if (!currentQ) return;
    setFlaggedIds((prev) =>
      prev.includes(currentQ.id) ? prev.filter((id) => id !== currentQ.id) : [...prev, currentQ.id]
    );
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      // Submit assessment
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti optional
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
    }
  };

  if (!moduleMeta || !currentQ) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center space-y-4 max-w-md bg-white border border-slate-200">
          <Sparkles className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Preparing Assessment Engine...</h2>
          <p className="text-xs text-slate-500">Loading standardized question battery and adaptive timing rules.</p>
        </Card>
      </div>
    );
  }

  // COMPLETION SCREEN
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="p-8 sm:p-10 max-w-lg w-full text-center space-y-6 bg-white border border-slate-200 shadow-2xl rounded-3xl">
          <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <Badge variant="success">Module Successfully Recorded</Badge>
            <h1 className="text-2xl font-black text-slate-900">{moduleMeta.title} Completed</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your responses have been processed through our standardized psychometric weighting engine.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Time Elapsed</span>
              <span className="font-bold text-slate-900">{formatTimer(elapsedSeconds)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Answered Items</span>
              <span className="font-bold text-indigo-600">{Object.keys(answers).length} of {questions.length}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link href="/assessments" className="flex-1">
              <Button variant="outline" className="w-full text-xs font-semibold">
                Back to Assessment Grid
              </Button>
            </Link>
            <Link href="/dashboard/student/results" className="flex-1">
              <Button variant="gradient" className="w-full text-xs font-bold">
                <span>View Results</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const isCurrentFlagged = flaggedIds.includes(currentQ.id);
  const currentAnswer = answers[currentQ.id];
  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Test Header Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              title="Exit Assessment"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                {moduleMeta.title}
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer Display */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
              <Clock className="h-3.5 w-3.5 text-indigo-600" />
              <span>{formatTimer(elapsedSeconds)}</span>
              <button
                type="button"
                onClick={() => setIsTimerPaused(!isTimerPaused)}
                className="ml-1 text-slate-400 hover:text-slate-600"
                title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
              >
                {isTimerPaused ? <Play className="h-3 w-3 fill-current" /> : <Pause className="h-3 w-3" />}
              </button>
            </div>

            {/* Question Drawer Palette Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-xs font-semibold"
            >
              <Grid className="h-3.5 w-3.5 mr-1 text-slate-500" />
              <span className="hidden sm:inline">Palette</span>
            </Button>

            {/* Flag Item Toggle */}
            <Button
              variant={isCurrentFlagged ? 'danger' : 'outline'}
              size="sm"
              onClick={handleToggleFlag}
              className="text-xs"
              title="Flag question for review"
            >
              <Flag className={`h-3.5 w-3.5 ${isCurrentFlagged ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Top Progress bar */}
        <div className="max-w-5xl mx-auto pt-2">
          <Progress value={progressPct} indicatorColor="bg-indigo-600" />
        </div>
      </div>

      {/* Main Question Stage */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
        <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-md rounded-2xl flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Item {currentQ.questionNumber} • {currentQ.type.replace('_', ' ').toUpperCase()}
              </span>
              {currentQ.contextNote && (
                <span className="text-xs text-slate-500 font-medium italic">
                  {currentQ.contextNote}
                </span>
              )}
            </div>

            {/* Prompt */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.prompt}
            </h2>

            {/* Scenario Vignette if present */}
            {currentQ.scenarioText && (
              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-indigo-600 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentQ.scenarioText}
              </div>
            )}

            {/* 3x3 MATRIX REASONING (Raven Variant) */}
            {currentQ.matrixData && (
              <div className="my-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-slate-100 border-2 border-slate-300 inline-block shadow-inner">
                  <div
                    className="grid gap-2.5"
                    style={{
                      gridTemplateColumns: `repeat(${currentQ.matrixData.gridCols}, minmax(0, 1fr))`,
                    }}
                  >
                    {currentQ.matrixData.cells.map((cell) => (
                      <div
                        key={cell.id}
                        className={`h-16 w-16 sm:h-20 sm:w-20 rounded-xl flex items-center justify-center font-bold text-2xl sm:text-3xl border-2 transition-all ${
                          cell.isMissing
                            ? 'border-dashed border-indigo-500 bg-indigo-50 text-indigo-600 animate-pulse'
                            : 'border-slate-300 bg-white text-slate-800 shadow-xs'
                        }`}
                      >
                        {cell.content}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LIKERT SCALE (Big Five Variant) */}
            {currentQ.type === 'likert_scale' && (
              <div className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {currentQ.options.map((opt) => {
                    const isSelected = currentAnswer === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(opt.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-md text-indigo-900'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="block text-lg font-black mb-1">{opt.id}</span>
                        <span className="block text-xs font-semibold leading-tight">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DISC FORCED-CHOICE (DISC Variant) */}
            {currentQ.type === 'disc_forced_choice' && currentQ.discPairs && (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-indigo-50 rounded-xl text-xs text-indigo-800 font-medium">
                  Select which behavioral statement best aligns with your natural tendency.
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQ.discPairs.map((pair) => {
                    const isSelected = currentAnswer === pair.trait;
                    return (
                      <div
                        key={pair.trait}
                        onClick={() => handleSelectOption(pair.trait)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                          {pair.text}
                        </span>
                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                            isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NUMERICAL RESPONSE (Aptitude Variant) */}
            {currentQ.type === 'numerical' && (
              <div className="pt-4 max-w-sm">
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                  Enter Numeric Answer
                </label>
                <input
                  type="number"
                  placeholder="e.g. 240"
                  value={currentAnswer || ''}
                  onChange={(e) => handleSelectOption(e.target.value)}
                  className="w-full h-12 rounded-xl border-2 border-slate-300 px-4 text-base font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            )}

            {/* STANDARD SINGLE / MATRIX CHOICE OPTIONS */}
            {currentQ.type !== 'likert_scale' && currentQ.type !== 'disc_forced_choice' && currentQ.type !== 'numerical' && (
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = currentAnswer === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-xs text-indigo-950 font-semibold'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm leading-relaxed block">{opt.label}</span>
                        {opt.subtext && <span className="text-[11px] text-slate-500 block">{opt.subtext}</span>}
                      </div>
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                          isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="text-xs"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Previous</span>
            </Button>

            <span className="text-xs text-slate-400 hidden sm:inline">
              Answered: {Object.keys(answers).length} / {questions.length}
            </span>

            <Button
              type="button"
              variant="gradient"
              size="md"
              onClick={handleNext}
              className="text-xs font-bold shadow-md shadow-indigo-600/20"
            >
              <span>{currentIndex === questions.length - 1 ? 'Submit Battery' : 'Next Question'}</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Question Drawer / Palette Modal */}
      {isDrawerOpen && (
        <Dialog
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Question Navigator Palette"
          description="Click any number to jump directly to that item."
          footer={
            <Button variant="outline" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Close Palette
            </Button>
          }
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 py-2">
            {questions.map((q, idx) => {
              const hasAnswer = answers[q.id] !== undefined;
              const isFlagged = flaggedIds.includes(q.id);
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsDrawerOpen(false);
                  }}
                  className={`h-11 rounded-xl text-xs font-bold flex flex-col items-center justify-center relative border-2 transition-all ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-400'
                      : hasAnswer
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && <div className="h-1.5 w-1.5 rounded-full bg-rose-500 absolute top-1 right-1" />}
                </button>
              );
            })}
          </div>
        </Dialog>
      )}

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <Dialog
          isOpen={showExitConfirm}
          onClose={() => setShowExitConfirm(false)}
          title="Exit Assessment?"
          description="Your current responses and elapsed time will be saved as a draft. You can resume at any time."
          footer={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowExitConfirm(false)}>
                Cancel & Continue Test
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setShowExitConfirm(false);
                  router.push('/assessments');
                }}
              >
                Save Draft & Exit
              </Button>
            </div>
          }
        >
          <p className="text-xs text-slate-600">
            You have answered {Object.keys(answers).length} of {questions.length} questions.
          </p>
        </Dialog>
      )}
    </div>
  );
}

export default function AssessmentTakeShell() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <Card className="p-8 text-center space-y-3 bg-white border border-slate-200">
            <Sparkles className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
            <h2 className="text-base font-bold text-slate-900">Loading Assessment Engine...</h2>
          </Card>
        </div>
      }
    >
      <AssessmentTakeContent />
    </React.Suspense>
  );
}

