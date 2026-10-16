import React, { useState } from 'react';
import { Flashcard } from '../../types/study';
import {
  Sparkles,
  BookOpen,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  RotateCw,
  Lightbulb,
  Award,
} from 'lucide-react';

export const AIFlashcardsStudio: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'flashcards' | 'feynman'>('flashcards');

  // Flashcards State
  const [topic, setTopic] = useState('Calculus II: Integration by Parts & Taylor Series');
  const [notes, setNotes] = useState(
    'Formula: integral of u dv = u*v - integral of v du. Use LIATE rule for choosing u: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential. Taylor series centered at a: sum f^(n)(a)/n! * (x-a)^n.'
  );
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([
    {
      id: 'fc_1',
      front: 'What does the LIATE rule dictate when choosing "u" in Integration by Parts?',
      back: 'Priority hierarchy: Logarithmic, Inverse trigonometric, Algebraic, Trigonometric, Exponential. Pick the function appearing highest on the list as u.',
      mnemonicOrHint: 'Remember: LIATE stands for Log, InvTrig, Alg, Trig, Exp.',
      difficulty: 'Medium',
    },
    {
      id: 'fc_2',
      front: 'What is the general formula for the Taylor Series of f(x) centered at a?',
      back: 'Sum from n=0 to infinity of [f^(n)(a) / n!] * (x - a)^n',
      mnemonicOrHint: 'Remember n! (factorial) is always in the denominator.',
      difficulty: 'Hard',
    },
    {
      id: 'fc_3',
      front: 'When does a Maclaurin series differ from a standard Taylor series?',
      back: 'A Maclaurin series is simply a Taylor series specifically centered at a = 0.',
      mnemonicOrHint: 'M = 0 (Maclaurin zeroes in on 0).',
      difficulty: 'Easy',
    },
  ]);
  const [summary, setSummary] = useState(
    'Core techniques for decomposing product integrals and approximating non-linear functions as polynomials.'
  );
  const [examTips, setExamTips] = useState<string[]>([
    'Always differentiate u and integrate dv before substituting into uv - ∫v du.',
    'Common mistake: forgetting the negative sign in the integral when integrating sin(x) to -cos(x).',
  ]);

  // Active Card Interaction State
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  // Feynman Explainer State
  const [feynmanConcept, setFeynmanConcept] = useState('Photosynthesis');
  const [feynmanLoading, setFeynmanLoading] = useState(false);
  const [feynmanResult, setFeynmanResult] = useState<any>({
    title: 'Photosynthesis',
    eli5Analogy: 'Think of plant leaves as tiny solar-powered cookie bakeries: sunlight is the oven electricity, carbon dioxide from the air is the flour, and water from the soil is the milk—baking sugary food for the plant and blowing clean oxygen out the bakery chimney.',
    stepByStepBreakdown: [
      'Light Reactions: Solar panels (chlorophyll) capture sunlight photons and split water molecules, generating chemical batteries (ATP and NADPH).',
      'Calvin Cycle: The bakery uses those batteries to capture carbon dioxide gas and assemble it into glucose sugar cubes.',
    ],
    realWorldExample: 'Every breath of oxygen you take right now was puffed out by a plant leaf or ocean phytoplankton during this exact cycle!',
    quickCheckQuestion: 'What are the two raw input ingredients a plant uses along with sunlight?',
    quickCheckAnswer: 'Water (H2O) and Carbon Dioxide (CO2).',
  });

  const handleGenerateCards = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/study/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, notes, count: 4 }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCards(json.data.flashcards);
        setSummary(json.data.conceptSummary);
        setExamTips(json.data.examProTips);
        setActiveCardIndex(0);
        setIsFlipped(false);
        setKnownCount(0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleExplainFeynman = async () => {
    if (!feynmanConcept.trim()) return;
    setFeynmanLoading(true);
    try {
      const res = await fetch('/api/study/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept: feynmanConcept }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setFeynmanResult(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFeynmanLoading(false);
    }
  };

  const handleCardFeedback = (knewIt: boolean) => {
    if (knewIt) setKnownCount((prev) => prev + 1);
    setIsFlipped(false);
    if (activeCardIndex < cards.length - 1) {
      setActiveCardIndex((prev) => prev + 1);
    } else {
      setActiveCardIndex(0);
    }
  };

  const currentCard = cards[activeCardIndex] || cards[0];

  return (
    <div className="space-y-4 px-4 py-2">
      {/* Subtab Switcher */}
      <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
        <button
          onClick={() => setActiveSubTab('flashcards')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'flashcards' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Active Recall Flashcards
        </button>
        <button
          onClick={() => setActiveSubTab('feynman')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'feynman' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Feynman Concept Explainer
        </button>
      </div>

      {activeSubTab === 'flashcards' && (
        <div className="space-y-4">
          {/* Card Input & Generator Accordion */}
          <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl space-y-2.5 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Topic or Course Material</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Organic Chemistry: SN1 vs SN2"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Paste Lecture Notes / Equations
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Paste key formulas, definitions, or exam guidelines..."
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono"
              />
            </div>

            <button
              onClick={handleGenerateCards}
              disabled={loading}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 text-xs shadow-md"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Retrieval Deck...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate AI Active-Recall Deck</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Flashcard Simulator */}
          {cards.length > 0 && currentCard && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">
                  Card {activeCardIndex + 1} of {cards.length}
                </span>
                <span className="font-mono text-emerald-400">
                  Mastered: {knownCount}/{cards.length}
                </span>
              </div>

              {/* 3D Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[200px] p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl shadow-xl flex flex-col justify-between cursor-pointer select-none transition-all hover:border-indigo-500/70"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                    {isFlipped ? 'Answer & Explanation' : 'Active Recall Question'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      currentCard.difficulty === 'Hard'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : currentCard.difficulty === 'Medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {currentCard.difficulty}
                  </span>
                </div>

                <div className="my-auto py-3 text-center">
                  <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </p>

                  {isFlipped && currentCard.mnemonicOrHint && (
                    <div className="mt-3 p-2 bg-slate-950/70 rounded-lg text-[11px] text-amber-300 font-mono inline-block border border-amber-500/30">
                      💡 Mnemonic: {currentCard.mnemonicOrHint}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                  <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Tap card to flip</span>
                </div>
              </div>

              {/* Recall Assessment Buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleCardFeedback(false)}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-amber-300 border border-amber-500/30 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Still Learning
                </button>
                <button
                  onClick={() => handleCardFeedback(true)}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-colors cursor-pointer shadow-md"
                >
                  I Knew This! ✓
                </button>
              </div>
            </div>
          )}

          {/* Exam Pro Tips */}
          {examTips.length > 0 && (
            <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>High-Yield Exam Pro-Tips</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                {examTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Feynman Concept Explainer Subtab */}
      {activeSubTab === 'feynman' && (
        <div className="space-y-4">
          <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl space-y-2.5 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                What concept do you want explained simply?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={feynmanConcept}
                  onChange={(e) => setFeynmanConcept(e.target.value)}
                  placeholder="e.g. Eigenvectors, Opportunity Cost, Recursion..."
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                />
                <button
                  onClick={handleExplainFeynman}
                  disabled={feynmanLoading}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {feynmanLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Explain'}
                </button>
              </div>
            </div>
          </div>

          {feynmanResult && (
            <div className="p-4 bg-slate-800/90 border border-slate-700/80 rounded-2xl space-y-3 text-xs shadow-lg">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
                  Feynman Breakdown
                </span>
                <h3 className="text-sm font-bold text-white">{feynmanResult.title}</h3>
              </div>

              {/* 5th-Grade Metaphor */}
              <div className="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-xl space-y-1">
                <span className="font-semibold text-indigo-300 text-[11px] block">
                  🌟 The Simple Everyday Metaphor:
                </span>
                <p className="text-slate-100 leading-relaxed text-xs">
                  {feynmanResult.eli5Analogy}
                </p>
              </div>

              {/* Step by step */}
              <div className="space-y-1.5">
                <span className="font-semibold text-white text-[11px] block">
                  How It Works (Step-by-Step):
                </span>
                {feynmanResult.stepByStepBreakdown.map((step: string, i: number) => (
                  <div key={i} className="p-2 bg-slate-900 rounded-lg text-slate-300 text-[11px]">
                    {i + 1}. {step}
                  </div>
                ))}
              </div>

              {/* Self Test */}
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700 space-y-1">
                <span className="font-semibold text-emerald-400 text-[11px] block">
                  Quick 10-Second Self-Test:
                </span>
                <p className="text-slate-200 text-xs">{feynmanResult.quickCheckQuestion}</p>
                <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                  <strong>Answer: </strong>
                  {feynmanResult.quickCheckAnswer}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
