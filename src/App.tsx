import React, { useState } from 'react';
import { MobileFrame } from './components/study/MobileFrame';
import { StudyBottomNav, StudyTab } from './components/study/StudyBottomNav';
import { StudyHome } from './components/study/StudyHome';
import { StudyTimer } from './components/study/StudyTimer';
import { SkillSwapMarketplace } from './components/study/SkillSwapMarketplace';
import { AIFlashcardsStudio } from './components/study/AIFlashcardsStudio';
import { InvestorPitchDeck } from './components/study/InvestorPitchDeck';
import { EmailGenerator } from './components/EmailGenerator';
import { MeetingIntelligence } from './components/MeetingIntelligence';
import { TaskPlanner } from './components/TaskPlanner';
import { PromptLab } from './components/PromptLab';
import { ActivityLog } from './components/ActivityLog';
import { SavedArtifact, ActionItem } from './types';
import {
  Smartphone,
  Presentation,
  Lightbulb,
  Briefcase,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function App() {
  // Main Top Mode: 'study_app' | 'pitch' | 'workplace'
  const [mainMode, setMainMode] = useState<'study_app' | 'pitch' | 'workplace'>('study_app');

  // StudyBuddy Internal Mobile Tabs: 'home' | 'focus' | 'swap' | 'ai_coach' | 'pitch'
  const [studyTab, setStudyTab] = useState<StudyTab>('home');

  // Device view toggle (Mobile 390px phone frame vs full width)
  const [isMobileChassis, setIsMobileChassis] = useState<boolean>(true);

  // Workplace AI state (for seamless access to previous workplace suite)
  const [workplaceTab, setWorkplaceTab] = useState<'email' | 'meeting' | 'tasks' | 'prompt_lab' | 'history'>('email');
  const [savedArtifacts, setSavedArtifacts] = useState<SavedArtifact[]>([]);
  const [transferredMeetingTasks, setTransferredMeetingTasks] = useState<{
    tasks: ActionItem[];
    projectTitle: string;
  } | null>(null);

  const handleSaveArtifact = (artifact: SavedArtifact) => {
    setSavedArtifacts((prev) => [artifact, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setMainMode('study_app');
                  setStudyTab('home');
                }}
                className="text-left flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
                  SB
                </div>
                <div>
                  <span className="text-base font-bold text-white tracking-tight">StudyBuddy</span>
                  <span className="text-[10px] text-indigo-400 block font-mono">Mobile Learning Network</span>
                </div>
              </button>
            </div>

            {/* Navigation Switcher */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => {
                  setMainMode('study_app');
                  if (studyTab === 'pitch') setStudyTab('home');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  mainMode === 'study_app' && studyTab !== 'pitch'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile App</span>
                <span className="sm:hidden">App</span>
              </button>

              <button
                onClick={() => {
                  setMainMode('pitch');
                  setStudyTab('pitch');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  mainMode === 'pitch' || studyTab === 'pitch'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Presentation className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">2-Min Investor Pitch</span>
                <span className="sm:hidden">Pitch</span>
              </button>

              <button
                onClick={() => setMainMode('workplace')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  mainMode === 'workplace'
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Workplace AI Suite</span>
                <span className="md:hidden">Workplace</span>
              </button>
            </nav>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/images/avatar_student_sarah_1792137762620.jpg"
                alt="Student Profile"
                className="w-8 h-8 rounded-full object-cover border border-indigo-500/50"
              />
              <div className="hidden xl:block text-left text-xs">
                <span className="font-semibold text-slate-200 block">Sarah Jenkins</span>
                <span className="text-[10px] text-slate-400 font-mono">Stanford '27</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col items-center">
        {/* MODE 1: StudyBuddy Mobile Experience */}
        {mainMode === 'study_app' && studyTab !== 'pitch' && (
          <MobileFrame
            isMobileView={isMobileChassis}
            onToggleView={() => setIsMobileChassis(!isMobileChassis)}
          >
            {/* Screen Content based on bottom tab */}
            {studyTab === 'home' && (
              <StudyHome
                onSelectCircle={() => setStudyTab('focus')}
                onNavigateToTab={(tab) => setStudyTab(tab)}
              />
            )}

            {studyTab === 'focus' && <StudyTimer />}

            {studyTab === 'swap' && <SkillSwapMarketplace />}

            {studyTab === 'ai_coach' && <AIFlashcardsStudio />}

            {/* Bottom Navigation */}
            <StudyBottomNav
              activeTab={studyTab}
              onTabChange={(tab) => {
                if (tab === 'pitch') {
                  setMainMode('pitch');
                }
                setStudyTab(tab);
              }}
              isMobileView={isMobileChassis}
            />
          </MobileFrame>
        )}

        {/* MODE 2: 2-Minute Investor Pitch Studio */}
        {(mainMode === 'pitch' || studyTab === 'pitch') && (
          <div className="w-full max-w-4xl space-y-4">
            <InvestorPitchDeck />
          </div>
        )}

        {/* MODE 3: Workplace AI Suite */}
        {mainMode === 'workplace' && (
          <div className="w-full max-w-6xl space-y-4">
            {/* Secondary Workplace Nav */}
            <div className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-xs">
              <div className="flex items-center gap-1">
                {(['email', 'meeting', 'tasks', 'prompt_lab', 'history'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setWorkplaceTab(tab)}
                    className={`px-3 py-1.5 rounded-lg capitalize font-medium whitespace-nowrap transition-colors ${
                      workplaceTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'prompt_lab' ? 'Prompt Lab & Ethics' : tab}
                  </button>
                ))}
              </div>
            </div>

            {workplaceTab === 'email' && (
              <EmailGenerator
                onSaveArtifact={handleSaveArtifact}
                onAuditText={() => setWorkplaceTab('prompt_lab')}
              />
            )}

            {workplaceTab === 'meeting' && (
              <MeetingIntelligence
                onSaveArtifact={handleSaveArtifact}
                onTransferToPlanner={(tasks, projectTitle) => {
                  setTransferredMeetingTasks({ tasks, projectTitle });
                  setWorkplaceTab('tasks');
                }}
              />
            )}

            {workplaceTab === 'tasks' && (
              <TaskPlanner
                onSaveArtifact={handleSaveArtifact}
                incomingTasks={transferredMeetingTasks}
                onClearIncomingTasks={() => setTransferredMeetingTasks(null)}
              />
            )}

            {workplaceTab === 'prompt_lab' && <PromptLab />}

            {workplaceTab === 'history' && (
              <ActivityLog
                artifacts={savedArtifacts}
                onDeleteArtifact={(id) =>
                  setSavedArtifacts((prev) => prev.filter((a) => a.id !== id))
                }
                onClearAll={() => setSavedArtifacts([])}
              />
            )}
          </div>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-4 mt-auto text-xs text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>StudyBuddy Mobile · Design Thinking & Entrepreneurship Project</span>
          <span className="font-mono text-slate-500">
            Powered by Google Gemini 3.8 Flash & React 19
          </span>
        </div>
      </footer>
    </div>
  );
}
