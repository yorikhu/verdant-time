import type { TimerMode, TimerState, AppSettings } from '../../shared/types';

// 计时器存储状态（扩展自基础状态）
export interface TimerStore extends TimerState {
  // Actions
  setMode: (mode: TimerMode) => void;
  setDuration: (duration: number) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  tick: () => void;
  setCycle: (cycle: number) => void;
}

// 设置存储状态
export interface SettingsStore extends AppSettings {
  // Actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  setFocusDuration: (duration: number) => void;
  setShortBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
  setLongBreakAfter: (count: number) => void;
  setAutoStartBreaks: (enabled: boolean) => void;
  setAutoStartPomodoros: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setSelectedTheme: (theme: string) => void;
  setSelectedNoise: (noise: string | null) => void;
  setNoiseVolume: (volume: number) => void;
}

// 统计存储状态
export interface StatsStore {
  today: {
    completedPomodoros: number;
    totalFocusMinutes: number;
    cycles: number;
  };
  history: Array<{
    date: string;
    completedPomodoros: number;
    totalFocusMinutes: number;
    cycles: number;
  }>;

  // Actions
  completePomodoro: (minutes: number) => void;
  resetToday: () => void;
  loadHistory: () => void;
  saveHistory: () => void;
}

// 应用视图状态
export type AppView = 'timer' | 'shortBreak' | 'longBreak' | 'settings';

export interface ViewState {
  currentView: AppView;
  isSettingsOpen: boolean;
  setCurrentView: (view: AppView) => void;
  setSettingsOpen: (open: boolean) => void;
}
