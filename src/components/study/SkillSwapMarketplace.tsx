import React, { useState } from 'react';
import { SkillSwapListing } from '../../types/study';
import { INITIAL_SKILL_SWAPS } from '../../data/studyPresets';
import {
  Users,
  Search,
  Star,
  Repeat,
  CheckCircle2,
  Calendar,
  Sparkles,
  Plus,
} from 'lucide-react';

export const SkillSwapMarketplace: React.FC = () => {
  const [swaps, setSwaps] = useState<SkillSwapListing[]>(INITIAL_SKILL_SWAPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedId, setRequestedId] = useState<string | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // New Listing Form State
  const [newOffering, setNewOffering] = useState('');
  const [newSeeking, setNewSeeking] = useState('');
  const [newMajor, setNewMajor] = useState('');

  const filteredSwaps = swaps.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.offeringSubject.toLowerCase().includes(q) ||
      s.seekingSubject.toLowerCase().includes(q) ||
      s.studentName.toLowerCase().includes(q) ||
      s.major.toLowerCase().includes(q)
    );
  });

  const handleRequestSwap = (id: string) => {
    setRequestedId(id);
    setTimeout(() => {
      setRequestedId(null);
    }, 2500);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffering || !newSeeking) return;

    const newEntry: SkillSwapListing = {
      id: `swap_${Date.now()}`,
      studentName: 'Sarah Jenkins (You)',
      major: newMajor || 'Data Science',
      year: 'Junior',
      avatarUrl: '/src/assets/images/avatar_student_sarah_1792137762620.jpg',
      offeringSubject: newOffering,
      seekingSubject: newSeeking,
      rating: 5.0,
      completedSwaps: 0,
      bio: 'Excited to trade skills and learn together!',
      availability: 'Flexible on weekends & evenings',
    };

    setSwaps([newEntry, ...swaps]);
    setNewOffering('');
    setNewSeeking('');
    setShowOfferModal(false);
  };

  return (
    <div className="space-y-4 px-4 py-2">
      {/* Header & Value Proposition */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Zero-Cash Reciprocal Learning
          </span>
          <h2 className="text-sm font-bold text-white">Skill-Swap Marketplace</h2>
        </div>
        <button
          onClick={() => setShowOfferModal(true)}
          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Offer Skill</span>
        </button>
      </div>

      {/* Info Banner */}
      <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs space-y-1 text-emerald-200">
        <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
          <Repeat className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>How It Works: 1 Hour Taught = 1 Hour Learned</span>
        </div>
        <p className="text-[11px] text-emerald-300/80 leading-relaxed">
          No credit cards or $60/hr tutor fees. Teach a classmate a subject you excel in, and earn
          learning credits to receive 1-on-1 tutoring in the subjects you find tough.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by course (e.g. Calculus, Python, Chem)..."
          className="w-full pl-8 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Swaps Feed */}
      <div className="space-y-3">
        {filteredSwaps.map((item) => {
          const isRequested = requestedId === item.id;
          return (
            <div
              key={item.id}
              className="p-3.5 bg-slate-800/90 border border-slate-700/80 rounded-2xl space-y-3 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-xs border border-slate-600 shrink-0">
                    {item.studentName[0]}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-tight">
                      {item.studentName}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {item.major} · {item.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-slate-500">({item.completedSwaps})</span>
                </div>
              </div>

              {/* Offer & Seek Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 font-semibold block">
                    Offers Tutoring In:
                  </span>
                  <p className="text-slate-200 font-medium">{item.offeringSubject}</p>
                </div>

                <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-indigo-400 font-semibold block">
                    Seeking Help With:
                  </span>
                  <p className="text-slate-200 font-medium">{item.seekingSubject}</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 italic">"{item.bio}"</p>

              <div className="flex items-center justify-between pt-1 border-t border-slate-700/60 text-[10px] text-slate-400">
                <span>Available: {item.availability}</span>

                <button
                  onClick={() => handleRequestSwap(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                    isRequested
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {isRequested ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Request Sent!</span>
                    </>
                  ) : (
                    <>
                      <Repeat className="w-3.5 h-3.5" />
                      <span>Request 1-Hr Swap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Offering Skill */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-4 space-y-3 text-xs shadow-2xl">
            <h3 className="text-sm font-bold text-white">Post Your Skill-Swap Offer</h3>
            <p className="text-slate-400 text-[11px]">
              List what subject you can help peers with and what topic you want in return.
            </p>

            <form onSubmit={handleCreateOffer} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Major / Focus</label>
                <input
                  type="text"
                  value={newMajor}
                  onChange={(e) => setNewMajor(e.target.value)}
                  placeholder="e.g. Mechanical Engineering"
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  What Can You Teach / Tutor?
                </label>
                <input
                  type="text"
                  required
                  value={newOffering}
                  onChange={(e) => setNewOffering(e.target.value)}
                  placeholder="e.g. Physics I, MATLAB, Python"
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  What Subject Do You Need Help With?
                </label>
                <input
                  type="text"
                  required
                  value={newSeeking}
                  onChange={(e) => setNewSeeking(e.target.value)}
                  placeholder="e.g. Spanish Conversation, Calculus II"
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
