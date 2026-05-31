import type { AppTheme, WhiteNoise, Quote } from './types';

// 默认设置
export const DEFAULT_SETTINGS = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakAfter: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  volume: 0.7,
  selectedTheme: 'spring-strawberry',
  selectedNoise: null,
  noiseVolume: 0.5,
} as const;

// 主题配置
export const THEMES: Record<string, AppTheme> = {
  'spring-strawberry': {
    id: 'spring-strawberry',
    name: '春日草莓',
    colors: {
      primary: '#e6f7e6',
      secondary: '#4caf50',
      accent: '#8bc34a',
      background: '#e6f7e6',
      surface: '#ffffff',
      text: '#333333',
      textSecondary: '#666666',
    },
  },
  'ocean-breeze': {
    id: 'ocean-breeze',
    name: '海洋微风',
    colors: {
      primary: '#e0f2fe',
      secondary: '#0891b2',
      accent: '#06b6d4',
      background: '#e0f2fe',
      surface: '#ffffff',
      text: '#333333',
      textSecondary: '#666666',
    },
  },
  'sunset-glow': {
    id: 'sunset-glow',
    name: '日落余晖',
    colors: {
      primary: '#fef3c7',
      secondary: '#c2410c',
      accent: '#ea580c',
      background: '#fef3c7',
      surface: '#ffffff',
      text: '#333333',
      textSecondary: '#666666',
    },
  },
  'night-sky': {
    id: 'night-sky',
    name: '静谧夜空',
    colors: {
      primary: '#1e1b4b',
      secondary: '#6366f1',
      accent: '#8b5cf6',
      background: '#1e1b4b',
      surface: '#312e81',
      text: '#e0e7ff',
      textSecondary: '#a5b4fc',
    },
  },
};

// 白噪音配置
export const WHITE_NOISES: WhiteNoise[] = [
  { id: 'forest', name: '林间风声', icon: '🌲', src: '' },
  { id: 'rain', name: '细雨淅沥', icon: '🌧️', src: '' },
  { id: 'ocean', name: '海浪声', icon: '🌊', src: '' },
  { id: 'fire', name: '炉火噼啪', icon: '🔥', src: '' },
  { id: 'cafe', name: '咖啡馆', icon: '☕', src: '' },
  { id: 'night', name: '夜晚虫鸣', icon: '🦗', src: '' },
];

// 鸡汤语录
export const QUOTES: Quote[] = [
  { text: '慢速努力，像植物一样静静生长。', category: 'growth' },
  { text: '专注当下，时间会给你答案。', category: 'focus' },
  { text: '每一段专注的时光，都是成长的养分。', category: 'focus' },
  { text: '休息是为了走得更远。', category: 'rest' },
  { text: '像种子一样，在沉默中积蓄力量。', category: 'growth' },
  { text: '专注是一种选择，也是一种习惯。', category: 'focus' },
  { text: '给自己一点时间，感受生命的节奏。', category: 'rest' },
  { text: '成长不在于速度，而在于持续。', category: 'growth' },
  { text: '用心感受每一刻，时间会更有意义。', category: 'focus' },
  { text: '像树一样，扎根当下，向上生长。', category: 'growth' },
  { text: '暂停不是停止，是为了更好地出发。', category: 'rest' },
  { text: '专注的力量，源于内心的宁静。', category: 'focus' },
];

// 存储键名
export const STORAGE_KEYS = {
  SETTINGS: 'verdant-settings',
  STATS: 'verdant-stats',
  TIMER_STATE: 'verdant-timer-state',
} as const;

// 模式显示名称
export const MODE_NAMES = {
  focus: '专注',
  shortBreak: '小憩',
  longBreak: '长休',
} as const;

// 每日目标（番茄数）
export const DAILY_GOAL = 8;
