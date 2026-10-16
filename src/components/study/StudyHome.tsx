import React, { useState } from 'react';
import { StudyCircle } from '../../types/study';
import { INITIAL_STUDY_CIRCLES } from '../../data/studyPresets';
import {
  Flame,
  Users,
  Clock,
  MapPin,
  Sparkles,
  BookOpen,
  ArrowRight,
  Plus,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface StudyHomeProps {
  onSelectCircle: (circle: StudyCircle) => void;
  onNavigateToTab: (tab: any) => void;
}

export const StudyHome: React.FC<StudyHomeProps> = ({
  onSelectCircle,
  onNavigateToTab,
}) => {
  const [circles, setCircles] = useState<StudyCircle[]>(INITIAL_STUDY_CIRCLES);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [joinedCircleId, setJoinedCircleId] = useState<string | null>(null);

  const filteredCircles = circles.filter(
    (c) => selectedSubjectFilter === 'all' || c.subject.toLowerCase() === selectedSubjectFilter.toLowerCase()
  );

  const handleJoin = (circle: StudyCircle) => {
    setJoinedCircleId(circle.id);
    setTimeout(() => {
      onSelectCircle(circle);
    }, 400);
  };

  return (
    <div className="space-y-4 px-4 py-2">
      {/* Top Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/src/assets/images/avatar_student_sarah_1792137762620.jpg"
            alt="Student Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
          />
          <div>
            <h2 className="text-xs text-slate-400">Welcome back,</h2>
            <h1 className="text-sm font-bold text-white">Sarah Jenkins</h1>
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-950/60 border border-amber-500/40 rounded-xl text-amber-300">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <div className="text-left font-mono">
            <span className="text-xs font-bold tabular-nums">5 Days</span>
          </div>
        </div>
      </div>

      {/* Hero Collaborative Learning Card */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
        <img
          src="/src/assets/images/study_students_hero_1792137763517.jpg"
          alt="Collaborative Study"
          className="w-full h-36 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 flex flex-col justify-end">
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Community Peer Learning
          </span>
          <h2 className="text-sm font-bold text-white leading-tight mt-0.5">
            Never Study in Isolation Again
          </h2>
          <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
            Join 18 peers currently in silent focus sprints across your campus and local library.
          </p>
        </div>
      </div>

      {/* Quick Launch Action Pills */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          onClick={() => onNavigateToTab('focus')}
          className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-left transition-colors flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Pomodoro Sprint</span>
            </div>
            <p className="text-[10px] text-slate-400">25m focus + audio</p>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
        </button>

        <button
          onClick={() => onNavigateToTab('swap')}
          className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-left transition-colors flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>Skill Swap Board</span>
            </div>
            <p className="text-[10px] text-slate-400">Trade zero-cash tutoring</p>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
        </button>
      </div>

      {/* Live Study Circles Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Live Study Circles ({filteredCircles.length})
            </h3>
          </div>
          <button
            onClick={() => onNavigateToTab('focus')}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Create Circle +
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'mathematics', 'computer science', 'chemistry', 'economics'].map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubjectFilter(subj)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg capitalize whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubjectFilter === subj
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {subj === 'all' ? 'All Subjects' : subj}
            </button>
          ))}
        </div>

        {/* Circles Feed */}
        <div className="space-y-2.5">
          {filteredCircles.map((circle) => {
            const isJoined = joinedCircleId === circle.id;
            return (
              <div
                key={circle.id}
                className="p-3 bg-slate-800/90 border border-slate-700/80 rounded-xl space-y-2 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-semibold block">
                      {circle.courseCode} · {circle.subject}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {circle.title}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[10px] font-mono text-slate-300 tabular-nums shrink-0">
                    {circle.activeMembers}/{circle.maxMembers} peers
                  </span>
                </div>

                <div className="p-2 bg-slate-900/70 rounded-lg text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Focus:</span>
                    <span className="text-indigo-300 font-mono text-[10px]">
                      {circle.pomodoroState === 'focus' ? `⏱ ${circle.minutesLeft}m left in sprint` : '☕ 3m Break'}
                    </span>
                  </div>
                  <p className="text-slate-200 truncate">{circle.currentTopic}</p>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{circle.locationTag}</span>
                  </div>

                  <button
                    onClick={() => handleJoin(circle)}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>Joined!</span>
                      </>
                    ) : (
                      <>
                        <span>Join Room</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus Quiet Spot Busyness Radar */}
      <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Campus Study Spot Radar</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Live Crowd Sensor</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
            <div className="flex justify-between font-medium text-slate-200">
              <span>Main Library (Floor 3)</span>
              <span className="text-emerald-400 font-mono">Silent</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[10px]">
              <span>42% Occupied</span>
              <span>⚡ 450 Mbps</span>
            </div>
          </div>

          <div className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
            <div className="flex justify-between font-medium text-slate-200">
              <span>Student Union Cafe</span>
              <span className="text-amber-400 font-mono">Buzzing</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[10px]">
              <span>85% Occupied</span>
              <span>⚡ 210 Mbps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
