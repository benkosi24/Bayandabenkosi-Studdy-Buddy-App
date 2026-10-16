import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Users,
  CheckCircle,
  Coffee,
  Sparkles,
} from 'lucide-react';

export const StudyTimer: React.FC = () => {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(2);
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'whitenoise'>('none');

  // Web Audio Context reference for synthetic ambient sounds
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Timer interval effect
  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      if (mode === 'focus') {
        setCompletedSessions((prev) => prev + 1);
        setMode('break');
        setSecondsLeft(5 * 60);
      } else {
        setMode('focus');
        setSecondsLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, mode]);

  // Synthetic Web Audio Ambient Sound Generator (100% reliable, zero external files)
  const toggleAmbientSound = (type: 'none' | 'rain' | 'whitenoise') => {
    try {
      if (noiseNodeRef.current) {
        noiseNodeRef.current.disconnect();
        noiseNodeRef.current = null;
      }

      if (type === 'none') {
        setAmbientSound('none');
        return;
      }

      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      if (type === 'whitenoise') {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      } else {
        // Soft pink/brown rain filter simulation
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

      whiteNoise.connect(gainNode);
      gainNode.connect(ctx.destination);
      whiteNoise.start();

      noiseNodeRef.current = gainNode;
      setAmbientSound(type);
    } catch (e) {
      console.warn('Audio synthesis not supported or blocked by user gesture', e);
      setAmbientSound('none');
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = mode === 'focus' ? ((25 * 60 - secondsLeft) / (25 * 60)) * 100 : ((5 * 60 - secondsLeft) / (5 * 60)) * 100;

  return (
    <div className="space-y-4 px-4 py-2">
      {/* Header Mode Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Group Pomodoro Sprint
          </span>
          <h2 className="text-sm font-bold text-white">Calculus II Focus Room</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-slate-300">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <span>6 Active</span>
        </div>
      </div>

      {/* Mode Switcher Pill */}
      <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
        <button
          onClick={() => {
            setMode('focus');
            setSecondsLeft(25 * 60);
            setIsRunning(false);
          }}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            mode === 'focus' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          25m Focus Sprint
        </button>
        <button
          onClick={() => {
            setMode('break');
            setSecondsLeft(5 * 60);
            setIsRunning(false);
          }}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            mode === 'break' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          5m Rest Break
        </button>
      </div>

      {/* Main Timer Display */}
      <div className="relative p-8 bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 rounded-3xl text-center space-y-4 shadow-xl">
        {/* Circular Progress Indicator */}
        <div className="w-48 h-48 mx-auto relative flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="84"
              className="stroke-slate-700/50"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="84"
              className={mode === 'focus' ? 'stroke-indigo-500' : 'stroke-emerald-400'}
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 84}
              strokeDashoffset={2 * Math.PI * 84 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>

          {/* Time digits */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono tabular-nums text-4xl sm:text-5xl font-black text-white tracking-tight">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase mt-1">
              {mode === 'focus' ? 'Deep Work Focus' : 'Take a Breath'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={handleReset}
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
              mode === 'focus' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          {/* Ambient Sound Trigger */}
          <button
            onClick={() => {
              if (ambientSound === 'none') toggleAmbientSound('rain');
              else if (ambientSound === 'rain') toggleAmbientSound('whitenoise');
              else toggleAmbientSound('none');
            }}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              ambientSound !== 'none'
                ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle synthetic ambient sound"
          >
            {ambientSound === 'none' ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {ambientSound !== 'none' && (
          <p className="text-[10px] text-indigo-300 font-mono">
            ♪ Ambient Sound Active: {ambientSound === 'rain' ? 'Gentle Rain' : 'White Noise'}
          </p>
        )}
      </div>

      {/* Group Peer Accountability Cards */}
      <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white">Study Circle Peers in Room (6)</span>
          <span className="text-[10px] text-emerald-400 font-mono">Synchronized Silent Focus</span>
        </div>

        <div className="space-y-1.5">
          {[
            { name: 'Sarah J. (Host)', status: 'Taylor Series #12', active: true },
            { name: 'Marcus Chen', status: 'Integration by Parts', active: true },
            { name: 'Elena R.', status: 'Physics Problem Set', active: true },
          ].map((peer, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-slate-900/60 rounded-lg text-[11px]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="font-medium text-slate-200">{peer.name}</span>
              </div>
              <span className="text-slate-400 font-mono text-[10px]">{peer.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
