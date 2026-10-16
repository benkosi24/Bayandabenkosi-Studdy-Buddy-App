import React, { useState, useEffect } from 'react';
import { TWO_MINUTE_PITCH_DECK, DESIGN_THINKING_STEPS } from '../../data/studyPresets';
import {
  Presentation,
  Play,
  Pause,
  RotateCcw,
  Clock,
  CheckCircle,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  Lightbulb,
} from 'lucide-react';

export const InvestorPitchDeck: React.FC = () => {
  const [viewMode, setViewMode] = useState<'pitch' | 'design_thinking' | 'competitors'>('pitch');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // 120-second (2-minute) pitch timer
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          const next = prev - 1;
          // Auto-sync slide based on 20s intervals (6 slides total)
          const newSlide = Math.min(5, Math.floor((120 - next) / 20));
          setCurrentSlideIndex(newSlide);
          return next;
        });
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(120);
    setCurrentSlideIndex(0);
  };

  const handleCopyFullScript = () => {
    const fullText = TWO_MINUTE_PITCH_DECK.map(
      (s) => `[SLIDE ${s.id}: ${s.title} (${s.timeSlot})]\n${s.spokenScript}\n`
    ).join('\n---\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const currentSlide = TWO_MINUTE_PITCH_DECK[currentSlideIndex];
  const timerMinutes = Math.floor(secondsRemaining / 60);
  const timerSeconds = secondsRemaining % 60;
  const elapsedSeconds = 120 - secondsRemaining;

  return (
    <div className="space-y-4 px-4 py-2">
      {/* Mode Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Entrepreneurship & Pitching
          </span>
          <h2 className="text-sm font-bold text-white">2-Minute Investor Pitch</h2>
        </div>

        <button
          onClick={handleCopyFullScript}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          {copiedScript ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied Script</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Script</span>
            </>
          )}
        </button>
      </div>

      {/* View Switcher Pills */}
      <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
        <button
          onClick={() => setViewMode('pitch')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            viewMode === 'pitch' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          2-Min Pitch Teleprompter
        </button>
        <button
          onClick={() => setViewMode('design_thinking')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            viewMode === 'design_thinking' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Design Thinking (5 Phases)
        </button>
        <button
          onClick={() => setViewMode('competitors')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            viewMode === 'competitors' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Competitive Moat
        </button>
      </div>

      {viewMode === 'pitch' && (
        <div className="space-y-4">
          {/* Pitch Teleprompter Timer Bar */}
          <div className="p-3 bg-slate-800/90 border border-slate-700/80 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center font-mono text-xs font-bold text-indigo-400 border border-indigo-500/30">
                {String(timerMinutes)}:{String(timerSeconds).padStart(2, '0')}
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Teleprompter Pace ({elapsedSeconds}s / 120s)
                </span>
                <span className="text-xs font-bold text-white">
                  Slide {currentSlideIndex + 1} of 6 · {currentSlide.timeSlot}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isTimerRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Start Pitch'}</span>
              </button>

              <button
                onClick={handleResetTimer}
                className="p-1.5 bg-slate-900 hover:bg-slate-700 text-slate-400 rounded-lg border border-slate-700"
                title="Reset pitch timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Slide Progress Dots */}
          <div className="flex items-center gap-1.5 justify-center py-1">
            {TWO_MINUTE_PITCH_DECK.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Go to slide ${s.id}`}
              />
            ))}
          </div>

          {/* Main Slide Card */}
          <div className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl space-y-4 shadow-xl">
            {/* Slide Header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-3">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase tracking-wider block">
                  Pitch Slide {currentSlide.id} · {currentSlide.timeSlot}
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">{currentSlide.title}</h3>
                <p className="text-[11px] text-slate-300 mt-1 italic">
                  "{currentSlide.tagline}"
                </p>
              </div>

              {currentSlide.metricHighlight && (
                <div className="p-2.5 bg-indigo-950/80 border border-indigo-500/40 rounded-xl text-center shrink-0 min-w-[90px]">
                  <span className="font-mono text-base font-black text-indigo-300 block">
                    {currentSlide.metricHighlight.value}
                  </span>
                  <span className="text-[9px] text-slate-400 block leading-tight">
                    {currentSlide.metricHighlight.label}
                  </span>
                </div>
              )}
            </div>

            {/* Slide Key Bullets */}
            <div className="space-y-1.5 text-xs text-slate-300">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                Visual Slide Bullets:
              </span>
              {currentSlide.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400">•</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Word-for-Word Spoken Teleprompter Script */}
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Spoken Teleprompter Script (Read aloud in {currentSlide.timeSlot}):</span>
              </div>
              <p className="text-slate-100 font-sans leading-relaxed text-xs sm:text-sm">
                {currentSlide.spokenScript}
              </p>
            </div>

            {/* Next / Prev Navigation */}
            <div className="flex items-center justify-between pt-1">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                disabled={currentSlideIndex === TWO_MINUTE_PITCH_DECK.length - 1}
                onClick={() =>
                  setCurrentSlideIndex((prev) => Math.min(TWO_MINUTE_PITCH_DECK.length - 1, prev + 1))
                }
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 disabled:opacity-40"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Design Thinking Tab */}
      {viewMode === 'design_thinking' && (
        <div className="space-y-3">
          <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-xs space-y-1">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Design Thinking Methodology Applied</span>
            </h3>
            <p className="text-slate-300 text-[11px]">
              How StudyBuddy was conceptualized, researched, and prototyped following the 5-stage human-centered design process.
            </p>
          </div>

          <div className="space-y-3">
            {DESIGN_THINKING_STEPS.map((step) => (
              <div
                key={step.phaseNumber}
                className="p-3.5 bg-slate-800/90 border border-slate-700/80 rounded-2xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center font-mono text-[11px]">
                      {step.phaseNumber}
                    </span>
                    <h4 className="font-bold text-white">{step.phaseName}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400">{step.tagline}</span>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong className="text-slate-200">Action: </strong>
                  {step.actionTaken}
                </p>

                <div className="p-2 bg-slate-900 rounded-lg space-y-1 text-[11px]">
                  <span className="font-semibold text-amber-300 block">Key Learnings & Findings:</span>
                  {step.findings.map((f, i) => (
                    <div key={i} className="text-slate-300">
                      • {f}
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-700/60 font-mono">
                  Artifact: {step.artifact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitors Tab */}
      {viewMode === 'competitors' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl space-y-1">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Competitive Moat & Advantage Matrix</span>
            </h3>
            <p className="text-slate-300 text-[11px]">
              Why StudyBuddy wins against legacy homework solvers and generic communication channels.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-700/80 rounded-2xl bg-slate-800/90">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="p-2.5">Feature / Dimension</th>
                  <th className="p-2.5 text-indigo-400 font-bold">StudyBuddy</th>
                  <th className="p-2.5">Chegg</th>
                  <th className="p-2.5">Discord</th>
                  <th className="p-2.5">Quizlet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-300">
                <tr>
                  <td className="p-2.5 font-medium text-white">Live Peer Study Rooms</td>
                  <td className="p-2.5 text-emerald-400 font-bold">✓ Synchronized</td>
                  <td className="p-2.5 text-slate-500">✗ None</td>
                  <td className="p-2.5 text-amber-400">△ Unstructured</td>
                  <td className="p-2.5 text-slate-500">✗ None</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">Reciprocal Tutoring ($0)</td>
                  <td className="p-2.5 text-emerald-400 font-bold">✓ TimeBank Credits</td>
                  <td className="p-2.5 text-rose-400">✗ $19/mo sub</td>
                  <td className="p-2.5 text-slate-500">✗ None</td>
                  <td className="p-2.5 text-slate-500">✗ None</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">Academic Integrity</td>
                  <td className="p-2.5 text-emerald-400 font-bold">✓ Active Recall & Mastery</td>
                  <td className="p-2.5 text-rose-400">✗ Cheating flags</td>
                  <td className="p-2.5 text-slate-500">✗ Unmoderated</td>
                  <td className="p-2.5 text-emerald-400">✓ Flashcards</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">Campus Spot Radar</td>
                  <td className="p-2.5 text-emerald-400 font-bold">✓ Real-time crowd sensor</td>
                  <td className="p-2.5 text-slate-500">✗ None</td>
                  <td className="p-2.5 text-slate-500">✗ None</td>
                  <td className="p-2.5 text-slate-500">✗ None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
