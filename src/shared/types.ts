// 共享类型定义

// 计时器模式
export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

// 计时器状态
export interface TimerState {
  mode: TimerMode;
  duration: number;
  remaining: number;
  isRunning: boolean;
  isPaused: boolean;
  cycle: number;
}

// 应用设置
export interface AppSettings {
  // 时长设置（分钟）
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  // 长休息触发条件
  longBreakAfter: number;
  // 自动开始
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  // 声音设置
  soundEnabled: boolean;
  volume: number;
  // 主题设置
  selectedTheme: string;
  // 白噪音设置
  selectedNoise: string | null;
  noiseVolume: number;
}

// 每日统计
export interface DailyStats {
  date: string;
  completedPomodoros: number;
  totalFocusMinutes: number;
  cycles: number;
}

// 白噪音类型
export interface WhiteNoise {
  id: string;
  name: string;
  icon: string;
  src: string; // 音频文件路径
}

// 主题类型
export interface AppTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
}

// 语录类型
export interface Quote {
  text: string;
  author?: string;
  category: 'focus' | 'rest' | 'growth';
}

// IPC 通道类型
export type IPCChannel =
  | 'get-timer-state'
  | 'update-timer-state'
  | 'get-settings'
  | 'update-settings'
  | 'get-stats'
  | 'update-stats'
  | 'show-notification'
  | 'play-sound'
  | 'stop-sound';

// 通知类型
export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
}
