export interface StudyCircle {
  id: string;
  title: string;
  subject: string;
  courseCode: string;
  activeMembers: number;
  maxMembers: number;
  isLive: boolean;
  currentTopic: string;
  pomodoroState: 'focus' | 'break' | 'idle';
  minutesLeft: number;
  hostName: string;
  hostAvatar?: string;
  locationTag: string; // e.g., "Library 2nd Floor" or "Virtual Room 4"
}

export interface SkillSwapListing {
  id: string;
  studentName: string;
  major: string;
  year: string;
  avatarUrl?: string;
  offeringSubject: string;
  seekingSubject: string;
  rating: number;
  completedSwaps: number;
  bio: string;
  availability: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  mnemonicOrHint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface PitchSlide {
  id: number;
  title: string;
  timeSlot: string; // e.g. "0:00 - 0:20"
  tagline: string;
  keyPoints: string[];
  spokenScript: string;
  visualGraphic: string;
  metricHighlight?: {
    value: string;
    label: string;
  };
}

export interface DesignThinkingPhase {
  phaseNumber: number;
  phaseName: string;
  tagline: string;
  actionTaken: string;
  findings: string[];
  artifact: string;
}
