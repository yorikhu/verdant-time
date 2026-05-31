/**
 * 本地存储工具函数
 */
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../../shared/constants';
import type { AppSettings } from '../../shared/types';

/**
 * 安全的 localStorage 操作
 */
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * 加载设置
 */
export function loadSettings(): AppSettings {
  const stored = safeStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (stored) {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }
  return { ...DEFAULT_SETTINGS };
}

/**
 * 保存设置
 */
export function saveSettings(settings: AppSettings): boolean {
  return safeStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

/**
 * 加载统计数据
 */
export function loadStats(): {
  today: { completedPomodoros: number; totalFocusMinutes: number; cycles: number };
  history: Array<{ date: string; completedPomodoros: number; totalFocusMinutes: number; cycles: number }>;
} {
  const stored = safeStorage.getItem(STORAGE_KEYS.STATS);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      // 检查是否是今天的数据
      const today = new Date().toISOString().split('T')[0];
      if (data.today && data.today.date === today) {
        return {
          today: {
            completedPomodoros: data.today.completedPomodoros || 0,
            totalFocusMinutes: data.today.totalFocusMinutes || 0,
            cycles: data.today.cycles || 0,
          },
          history: data.history || [],
        };
      }
      // 不是今天的数据，重置今日统计
      return {
        today: {
          completedPomodoros: 0,
          totalFocusMinutes: 0,
          cycles: 0,
        },
        history: data.history || [],
      };
    } catch {
      return {
        today: { completedPomodoros: 0, totalFocusMinutes: 0, cycles: 0 },
        history: [],
      };
    }
  }
  return {
    today: { completedPomodoros: 0, totalFocusMinutes: 0, cycles: 0 },
    history: [],
  };
}

/**
 * 保存统计数据
 */
export function saveStats(
  stats: {
    today: { completedPomodoros: number; totalFocusMinutes: number; cycles: number };
    history: Array<{ date: string; completedPomodoros: number; totalFocusMinutes: number; cycles: number }>;
  }
): boolean {
  return safeStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
}

/**
 * 加载计时器状态
 */
export function loadTimerState(): {
  mode: 'focus' | 'shortBreak' | 'longBreak';
  remaining: number;
  cycle: number;
} | null {
  const stored = safeStorage.getItem(STORAGE_KEYS.TIMER_STATE);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * 保存计时器状态
 */
export function saveTimerState(state: {
  mode: 'focus' | 'shortBreak' | 'longBreak';
  remaining: number;
  cycle: number;
}): boolean {
  return safeStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify(state));
}

/**
 * 清除计时器状态
 */
export function clearTimerState(): boolean {
  return safeStorage.removeItem(STORAGE_KEYS.TIMER_STATE);
}
