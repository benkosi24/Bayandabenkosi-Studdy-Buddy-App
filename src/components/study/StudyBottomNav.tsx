import React from 'react';
import { Home, Clock, Users, Sparkles, Presentation } from 'lucide-react';

export type StudyTab = 'home' | 'focus' | 'swap' | 'ai_coach' | 'pitch';

interface StudyBottomNavProps {
  activeTab: StudyTab;
  onTabChange: (tab: StudyTab) => void;
  isMobileView?: boolean;
}

export const StudyBottomNav: React.FC<StudyBottomNavProps> = ({
  activeTab,
  onTabChange,
  isMobileView = true,
}) => {
  return (
    <div
      className={`${
        isMobileView
          ? 'absolute bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800'
          : 'w-full mt-6 bg-slate-900 border border-slate-800 rounded-xl'
      } px-2 py-2 select-none`}
    >
      <div className="grid grid-cols-5 items-center justify-around">
        {/* Tab 1: Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] cursor-pointer ${
            activeTab === 'home' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Circles</span>
        </button>

        {/* Tab 2: Focus Sprint (Pomodoro) */}
        <button
          onClick={() => onTabChange('focus')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] cursor-pointer ${
            activeTab === 'focus' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Focus</span>
        </button>

        {/* Tab 3: Skill Swap (Marketplace) */}
        <button
          onClick={() => onTabChange('swap')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] cursor-pointer ${
            activeTab === 'swap' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">SkillSwap</span>
        </button>

        {/* Tab 4: AI Coach */}
        <button
          onClick={() => onTabChange('ai_coach')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] cursor-pointer ${
            activeTab === 'ai_coach' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">AI Coach</span>
        </button>

        {/* Tab 5: Pitch & Design Thinking */}
        <button
          onClick={() => onTabChange('pitch')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] cursor-pointer ${
            activeTab === 'pitch' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Presentation className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Pitch Deck</span>
        </button>
      </div>
    </div>
  );
};
