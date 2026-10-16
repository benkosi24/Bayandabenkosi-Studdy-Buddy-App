import React from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  isMobileView: boolean;
  onToggleView: () => void;
  currentTimeString?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  isMobileView,
  onToggleView,
  currentTimeString = '9:41',
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Viewport Mode Switcher Toolbar */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-4 px-2 py-2 bg-slate-800/60 border border-slate-700/60 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">StudyBuddy Mobile App</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-300">Design Thinking & Entrepreneurship Project</span>
        </div>

        <button
          onClick={onToggleView}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors cursor-pointer shadow-sm"
        >
          {isMobileView ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span>Expand to Full Workspace</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Simulate Mobile Phone (390px)</span>
            </>
          )}
        </button>
      </div>

      {/* Frame Container */}
      {isMobileView ? (
        <div className="relative mx-auto my-2 w-full max-w-[400px] h-[844px] bg-slate-950 border-[10px] border-slate-800 rounded-[50px] shadow-2xl shadow-black/80 overflow-hidden flex flex-col ring-1 ring-slate-700">
          {/* Dynamic Island / Speaker Notch */}
          <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-between px-7 pt-2 select-none pointer-events-none">
            <span className="text-[12px] font-semibold text-white font-mono">{currentTimeString}</span>
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700"></div>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Mobile Screen Content (Scrollable) */}
          <div className="flex-1 pt-11 pb-20 overflow-y-auto scrollbar-none bg-slate-900 text-slate-100 flex flex-col">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full z-50 pointer-events-none"></div>
        </div>
      ) : (
        <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden p-4 sm:p-6 min-h-[750px]">
          {children}
        </div>
      )}
    </div>
  );
};
